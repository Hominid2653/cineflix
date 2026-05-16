import { createClient } from "@/lib/supabase/server";
import {
  getTitleById,
  getSimilarTitlesById,
  getMediaTitle,
} from "@/lib/tmdb";
import type { Movie, UserProfile, WatchProgress, WatchlistItem } from "@/types/movie";

type Claims = {
  sub?: string;
  id?: string;
  email?: string;
};

type MediaType = "movie" | "tv";

type WatchlistRow = {
  tmdb_id: number;
  media_type: MediaType;
  added_at: string;
};

type WatchProgressRow = {
  tmdb_id: number;
  media_type: MediaType;
  progress_seconds: number;
  duration_seconds: number | null;
  updated_at: string;
};

function getUserIdFromClaims(claims: Claims | undefined) {
  return claims?.sub || claims?.id || null;
}

async function getUserContext() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = (data?.claims as Claims | undefined) || undefined;
  const userId = getUserIdFromClaims(claims);

  if (error || !userId) {
    return null;
  }

  return { supabase, userId, claims };
}

async function hydrateMovie(row: WatchlistRow) {
  const movie = await getTitleById(row.tmdb_id, row.media_type);
  return {
    ...movie,
    media_type: row.media_type,
    addedAt: row.added_at,
  } satisfies WatchlistItem;
}

async function hydrateProgress(row: WatchProgressRow) {
  const movie = await getTitleById(row.tmdb_id, row.media_type);
  const runtimeMinutes = movie.runtime ?? movie.episode_run_time?.[0] ?? null;
  const progress =
    row.duration_seconds && row.duration_seconds > 0
      ? Math.min(100, Math.round((row.progress_seconds / row.duration_seconds) * 100))
      : 0;

  return {
    movieId: row.tmdb_id,
    mediaType: row.media_type,
    title: getMediaTitle(movie),
    posterPath: movie.poster_path ?? null,
    backdropPath: movie.backdrop_path ?? null,
    progress,
    runtimeMinutes: runtimeMinutes ?? undefined,
    updatedAt: row.updated_at,
  } satisfies WatchProgress;
}

export async function getCurrentUser() {
  const context = await getUserContext();
  if (!context) return null;

  return {
    userId: context.userId,
    email: context.claims?.email || null,
  };
}

export async function getUserLibrary() {
  const context = await getUserContext();
  if (!context) {
    return null;
  }

  const { supabase, userId, claims } = context;

  const [profileResult, watchlistResult, progressResult, historyCountResult, interactionCountResult] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("id, username, avatar_url, role, created_at")
        .eq("id", userId)
        .maybeSingle(),
      supabase
        .from("watchlist")
        .select("tmdb_id, media_type, added_at")
        .eq("user_id", userId)
        .order("added_at", { ascending: false })
        .limit(12),
      supabase
        .from("watch_progress")
        .select("tmdb_id, media_type, progress_seconds, duration_seconds, updated_at")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false })
        .limit(12),
      supabase.from("watch_history").select("id", { count: "exact", head: true }).eq("user_id", userId),
      supabase.from("movie_interactions").select("id", { count: "exact", head: true }).eq("user_id", userId),
    ]);

  const watchlistRows = ((watchlistResult.data || []) as WatchlistRow[]).filter(Boolean);
  const progressRows = ((progressResult.data || []) as WatchProgressRow[]).filter(Boolean);

  const [watchlist, progress] = await Promise.all([
    Promise.all(watchlistRows.map((row) => hydrateMovie(row))),
    Promise.all(progressRows.map((row) => hydrateProgress(row))).then((items) =>
      items.filter((item) => item.progress > 0 && item.progress < 100),
    ),
  ]);

  const profile = profileResult.data
    ? ({
        id: profileResult.data.id,
        full_name: profileResult.data.username || claims?.email?.split("@")[0] || "Viewer",
        avatar_url: profileResult.data.avatar_url,
        role: profileResult.data.role,
      } satisfies UserProfile)
    : ({
        id: userId,
        full_name: claims?.email?.split("@")[0] || "Viewer",
        avatar_url: null,
        role: "user",
      } satisfies UserProfile);

  return {
    profile,
    watchlist,
    continueWatching: progress,
    stats: {
      watchHistoryCount: historyCountResult.count ?? 0,
      watchlistCount: watchlistResult.count ?? watchlist.length,
      activeProgressCount: progress.length,
      interactionsCount: interactionCountResult.count ?? 0,
    },
  };
}

export async function getWatchlistItems() {
  const library = await getUserLibrary();
  return library?.watchlist || [];
}

export async function getContinueWatchingItems() {
  const library = await getUserLibrary();
  return library?.continueWatching || [];
}

export async function getWatchlistStatus(tmdbId: number, mediaType: MediaType) {
  const context = await getUserContext();
  if (!context) return false;

  const { data } = await context.supabase
    .from("watchlist")
    .select("id")
    .eq("user_id", context.userId)
    .eq("tmdb_id", tmdbId)
    .eq("media_type", mediaType)
    .maybeSingle();

  return Boolean(data);
}

export async function getRelatedLibraryTitles(movie: Movie, mediaType: MediaType) {
  const [watchlistStatus, similarTitles] = await Promise.all([
    getWatchlistStatus(movie.id, mediaType),
    getSimilarTitlesById(movie.id, mediaType),
  ]);

  return { watchlistStatus, similarTitles };
}

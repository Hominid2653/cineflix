"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type MediaType = "movie" | "tv";

async function requireUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims as { sub?: string; id?: string } | undefined;
  const userId = claims?.sub || claims?.id;

  if (error || !userId) {
    redirect("/auth/login");
  }

  return { supabase, userId };
}

export async function toggleWatchlistAction(formData: FormData) {
  const tmdbId = Number(formData.get("tmdbId"));
  const mediaType = (formData.get("mediaType") as MediaType) || "movie";
  const returnTo = String(formData.get("returnTo") || "/watchlist");

  if (!Number.isFinite(tmdbId)) {
    redirect(returnTo);
  }

  const { supabase, userId } = await requireUser();

  const existing = await supabase
    .from("watchlist")
    .select("id")
    .eq("user_id", userId)
    .eq("tmdb_id", tmdbId)
    .eq("media_type", mediaType)
    .maybeSingle();

  if (existing.data?.id) {
    await supabase.from("watchlist").delete().eq("id", existing.data.id);
  } else {
    await supabase.from("watchlist").insert({
      user_id: userId,
      tmdb_id: tmdbId,
      media_type: mediaType,
    });
  }

  revalidatePath("/");
  revalidatePath("/search");
  revalidatePath("/watchlist");
  revalidatePath(returnTo);
  redirect(returnTo);
}

export async function markWatchedAction(formData: FormData) {
  const tmdbId = Number(formData.get("tmdbId"));
  const mediaType = (formData.get("mediaType") as MediaType) || "movie";
  const returnTo = String(formData.get("returnTo") || "/");
  const durationSeconds = Number(formData.get("durationSeconds") || 0);

  if (!Number.isFinite(tmdbId)) {
    redirect(returnTo);
  }

  const { supabase, userId } = await requireUser();

  await supabase.from("watch_history").insert({
    user_id: userId,
    tmdb_id: tmdbId,
    media_type: mediaType,
  });

  const existing = await supabase
    .from("watch_progress")
    .select("id")
    .eq("user_id", userId)
    .eq("tmdb_id", tmdbId)
    .eq("media_type", mediaType)
    .maybeSingle();

  const payload = {
    user_id: userId,
    tmdb_id: tmdbId,
    media_type: mediaType,
    progress_seconds: durationSeconds || 1,
    duration_seconds: durationSeconds || null,
  };

  if (existing.data?.id) {
    await supabase.from("watch_progress").update(payload).eq("id", existing.data.id);
  } else {
    await supabase.from("watch_progress").insert(payload);
  }

  revalidatePath("/");
  revalidatePath("/profile");
  revalidatePath("/watchlist");
  revalidatePath(returnTo);
  redirect(returnTo);
}

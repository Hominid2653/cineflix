import type { Movie, MovieCredits, MovieGenre } from "@/types/movie";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
const TMDB_API_KEY = process.env.TMDB_API_KEY?.trim();
const TMDB_API_READ_ACCESS_TOKEN = process.env.TMDB_API_READ_ACCESS_TOKEN?.trim();
const TMDB_LANGUAGE = "en-US";

const fallbackGenres: MovieGenre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
];

const fallbackMovies: Movie[] = [
  {
    id: 101,
    title: "Signal Run",
    overview: "A rogue data courier races to expose a hidden streaming empire.",
    backdrop_path: null,
    poster_path: null,
    release_date: "2025-02-14",
    vote_average: 8.3,
    genre_ids: [28, 878],
    genres: [fallbackGenres[0], fallbackGenres[4]],
    runtime: 124,
    tagline: "The signal is already moving.",
    original_language: "en",
  },
  {
    id: 102,
    title: "Midnight Harbor",
    overview: "A family drama unfolds around a city cinema that never closes.",
    backdrop_path: null,
    poster_path: null,
    release_date: "2024-11-01",
    vote_average: 7.8,
    genre_ids: [18],
    genres: [fallbackGenres[2]],
    runtime: 118,
    tagline: "Every screen has a memory.",
    original_language: "en",
  },
  {
    id: 103,
    title: "Frostline",
    overview: "A rescue team crosses a frozen frontier to find a lost crew.",
    backdrop_path: null,
    poster_path: null,
    release_date: "2024-08-09",
    vote_average: 7.4,
    genre_ids: [12, 28],
    genres: [fallbackGenres[1], fallbackGenres[0]],
    runtime: 132,
    tagline: "One mission. Whiteout conditions.",
    original_language: "en",
  },
  {
    id: 104,
    title: "After Hours Code",
    overview: "A studio engineer discovers a recommendation engine with a mind of its own.",
    backdrop_path: null,
    poster_path: null,
    release_date: "2025-05-01",
    vote_average: 8.0,
    genre_ids: [878, 18],
    genres: [fallbackGenres[4], fallbackGenres[2]],
    runtime: 109,
    tagline: "Some systems learn too fast.",
    original_language: "en",
  },
];

const fallbackCredits: MovieCredits = {
  cast: [
    { id: 1, name: "Ava Stone", character: "Mara Vale" },
    { id: 2, name: "Noah Carter", character: "Eli Ward" },
    { id: 3, name: "Iris Bloom", character: "Detective Sato" },
    { id: 4, name: "Jonas Reed", character: "Director" },
  ],
  crew: [],
};

function buildUrl(path: string, params: Record<string, string | number | undefined> = {}) {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });
  if (TMDB_API_KEY) {
    url.searchParams.set("api_key", TMDB_API_KEY);
  }
  return url;
}

type TmdbRequestOptions = {
  headers?: HeadersInit;
};

async function fetchTmdb<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
  options: TmdbRequestOptions = {},
) {
  if (!TMDB_API_KEY && !TMDB_API_READ_ACCESS_TOKEN) return null;

  try {
    const response = await fetch(buildUrl(path, params), {
      headers: {
        Accept: "application/json",
        ...(TMDB_API_READ_ACCESS_TOKEN
          ? { Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}` }
          : {}),
        ...options.headers,
      },
      next: { revalidate: 900 },
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function imageUrl(path?: string | null, size: "w342" | "w500" | "w780" | "original" = "w500") {
  return path ? `${TMDB_IMAGE_BASE}/${size}${path}` : null;
}

export function posterUrl(path?: string | null) {
  return imageUrl(path, "w500");
}

export function backdropUrl(path?: string | null) {
  return imageUrl(path, "w780");
}

export function profileUrl(path?: string | null) {
  return imageUrl(path, "w342");
}

export function hasTmdbConfig() {
  return Boolean(TMDB_API_KEY || TMDB_API_READ_ACCESS_TOKEN);
}

function normalizeGenres(genres: MovieGenre[] | undefined, genreIds: number[] | undefined) {
  if (genres?.length) return genres;
  return (genreIds || [])
    .map((id) => fallbackGenres.find((genre) => genre.id === id))
    .filter(Boolean) as MovieGenre[];
}

async function tmdbList<T>(path: string, params: Record<string, string | number | undefined> = {}) {
  const data = await fetchTmdb<{ results: T[] }>(path, {
    language: TMDB_LANGUAGE,
    ...params,
  });
  return data?.results || [];
}

export async function getTrendingMovies(mediaType: "movie" | "tv" = "movie") {
  const results = await tmdbList<Movie>(`/trending/${mediaType}/day`);
  return results.length ? results : fallbackMovies;
}

export async function getPopularMovies(mediaType: "movie" | "tv" = "movie") {
  const results = await tmdbList<Movie>(`/${mediaType}/popular`);
  return results.length ? results : fallbackMovies;
}

export async function getTopRatedMovies(mediaType: "movie" | "tv" = "movie") {
  const results = await tmdbList<Movie>(`/${mediaType}/top_rated`);
  return results.length ? results : fallbackMovies;
}

export async function searchTitles(query: string) {
  if (!query.trim()) return fallbackMovies;

  const [movieResults, tvResults] = await Promise.all([
    tmdbList<Movie>("/search/movie", { query }),
    tmdbList<Movie>("/search/tv", { query }),
  ]);

  const results = [...movieResults, ...tvResults].slice(0, 20);
  return results.length ? results : fallbackMovies;
}

export async function getMovieById(id: number) {
  const movie = await fetchTmdb<Movie>(`/movie/${id}`);
  return movie || fallbackMovies.find((item) => item.id === id) || { ...fallbackMovies[0], id };
}

export async function getTitleById(id: number, mediaType: "movie" | "tv" = "movie") {
  const title = await fetchTmdb<Movie>(`/${mediaType}/${id}`);
  return title || fallbackMovies.find((item) => item.id === id) || { ...fallbackMovies[0], id };
}

export async function getMovieCreditsById(id: number) {
  const credits = await fetchTmdb<MovieCredits>(`/movie/${id}/credits`, {
    language: TMDB_LANGUAGE,
  });
  return credits || fallbackCredits;
}

export async function getTitleCreditsById(id: number, mediaType: "movie" | "tv" = "movie") {
  const credits = await fetchTmdb<MovieCredits>(`/${mediaType}/${id}/credits`, {
    language: TMDB_LANGUAGE,
  });
  return credits || fallbackCredits;
}

export async function getSimilarMoviesById(id: number) {
  const results = await tmdbList<Movie>(`/movie/${id}/similar`);
  return results.length ? results : fallbackMovies.filter((movie) => movie.id !== id);
}

export async function getSimilarTitlesById(id: number, mediaType: "movie" | "tv" = "movie") {
  const results = await tmdbList<Movie>(`/${mediaType}/${id}/similar`);
  return results.length ? results : fallbackMovies.filter((movie) => movie.id !== id);
}

export async function discoverMovies(params: Record<string, string | number | undefined> = {}) {
  const results = await tmdbList<Movie>("/discover/movie", params);
  return results.length ? results : fallbackMovies;
}

export async function getGenres(mediaType: "movie" | "tv" = "movie") {
  const data = await fetchTmdb<{ genres: MovieGenre[] }>(`/genre/${mediaType}/list`, {
    language: TMDB_LANGUAGE,
  });
  return data?.genres?.length ? data.genres : fallbackGenres;
}

export async function findGenreByName(name: string, mediaType: "movie" | "tv" = "movie") {
  const genres = await getGenres(mediaType);
  return genres.find((genre) => genre.name.toLowerCase() === name.toLowerCase());
}

export function getMovieGenres(movie: Movie) {
  return normalizeGenres(movie.genres, movie.genre_ids);
}

export function getMediaTitle(movie: Movie) {
  return movie.title || movie.name || "Untitled";
}

export function getReleaseYear(movie: Movie) {
  const date = movie.release_date || movie.first_air_date;
  return date ? new Date(date).getFullYear().toString() : "TBA";
}

export function getVoteAverage(movie: Movie) {
  return typeof movie.vote_average === "number" ? movie.vote_average.toFixed(1) : "N/A";
}

export function getRuntime(movie: Movie) {
  const runtime = movie.runtime ?? movie.episode_run_time?.[0];
  if (!runtime) return "Runtime unknown";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export { fallbackMovies, fallbackGenres };

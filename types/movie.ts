export type MovieGenre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  genre_ids?: number[];
  genres?: MovieGenre[];
  runtime?: number | null;
  status?: string;
  tagline?: string;
  original_language?: string;
  media_type?: "movie" | "tv";
  popularity?: number;
  adult?: boolean;
};

export type CastMember = {
  id: number;
  name: string;
  character?: string;
  profile_path?: string | null;
  order?: number;
  known_for_department?: string;
};

export type MovieCredits = {
  cast: CastMember[];
  crew: CastMember[];
};

export type WatchProgress = {
  movieId: number;
  title: string;
  posterPath?: string | null;
  backdropPath?: string | null;
  progress: number;
  runtimeMinutes?: number;
  updatedAt?: string;
};

export type WatchlistItem = Movie & {
  addedAt?: string;
};

export type AdminStat = {
  label: string;
  value: string;
  change?: string;
};

export type AdminReport = {
  id: number;
  title: string;
  reason: string;
  status: "Open" | "Investigating" | "Closed";
  reportedAt: string;
};

export type UserProfile = {
  id: string;
  email?: string;
  full_name?: string;
  role?: "user" | "admin";
  avatar_url?: string | null;
};

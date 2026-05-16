export type Profile = {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string | null;
  role?: "user" | "admin";
};

export type SessionUser = {
  id: string;
  email?: string;
};

export type GenreAffinity = {
  genreId: number;
  genreName: string;
  score: number;
};

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Movie } from "@/types/movie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function movieTitle(movie: Pick<Movie, "title" | "name">) {
  return movie.title || movie.name || "Untitled";
}

export function movieYear(movie: Pick<Movie, "release_date" | "first_air_date">) {
  const date = movie.release_date || movie.first_air_date;
  return date ? new Date(date).getFullYear().toString() : "TBA";
}

export function formatRuntime(runtime?: number | null) {
  if (!runtime) return "Runtime unknown";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export function formatVote(vote?: number) {
  return typeof vote === "number" ? vote.toFixed(1) : "N/A";
}

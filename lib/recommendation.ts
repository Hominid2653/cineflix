import type { Movie } from "@/types/movie";
import { discoverMovies } from "@/lib/tmdb";

type RecommendationInput = {
  preferredGenreIds?: number[];
  excludeIds?: number[];
  limit?: number;
};

export async function getRecommendedMovies({
  preferredGenreIds = [],
  excludeIds = [],
  limit = 12,
}: RecommendationInput = {}): Promise<Movie[]> {
  const genres = preferredGenreIds.slice(0, 3);
  const results = genres.length
    ? await discoverMovies({ withGenres: genres.join(",") })
    : await discoverMovies();

  return results.filter((movie) => !excludeIds.includes(movie.id)).slice(0, limit);
}

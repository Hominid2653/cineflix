import MovieRow from "../MovieRow";
import type { Movie } from "@/types/movie";

type SimilarMoviesProps = {
  movies: Movie[];
};

export function SimilarMovies({ movies }: SimilarMoviesProps) {
  return <MovieRow title="Similar titles" description="More movies and shows with a similar vibe." movies={movies} />;
}

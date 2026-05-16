import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getMovieGenres, getReleaseYear, getVoteAverage, getRuntime } from "@/lib/tmdb";
import type { Movie } from "@/types/movie";

type MovieDetailsProps = {
  movie: Movie;
};

export function MovieDetails({ movie }: MovieDetailsProps) {
  const genres = getMovieGenres(movie);

  return (
    <Card className="border-white/10 bg-white/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-white">Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="flex items-center justify-between border border-white/10 px-3 py-2">
            <span className="text-slate-400">Year</span>
            <span className="text-white">{getReleaseYear(movie)}</span>
          </div>
          <div className="flex items-center justify-between border border-white/10 px-3 py-2">
            <span className="text-slate-400">Rating</span>
            <span className="text-white">{getVoteAverage(movie)}</span>
          </div>
          <div className="flex items-center justify-between border border-white/10 px-3 py-2">
            <span className="text-slate-400">Runtime</span>
            <span className="text-white">{getRuntime(movie)}</span>
          </div>
          <div className="flex items-center justify-between border border-white/10 px-3 py-2">
            <span className="text-slate-400">Language</span>
            <span className="text-white">{movie.original_language?.toUpperCase() || "EN"}</span>
          </div>
        </div>
        {movie.status ? (
          <p className="text-sm text-slate-300">
            Status: <span className="font-medium text-white">{movie.status}</span>
          </p>
        ) : null}
        {movie.number_of_seasons || movie.number_of_episodes ? (
          <p className="text-sm text-slate-300">
            {movie.number_of_seasons ? `${movie.number_of_seasons} seasons` : null}
            {movie.number_of_seasons && movie.number_of_episodes ? " • " : ""}
            {movie.number_of_episodes ? `${movie.number_of_episodes} episodes` : null}
          </p>
        ) : null}
        {movie.tagline ? <p className="italic text-slate-300">&quot;{movie.tagline}&quot;</p> : null}
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Badge key={genre.id} variant="secondary" className="bg-white/10 text-slate-100">
              {genre.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

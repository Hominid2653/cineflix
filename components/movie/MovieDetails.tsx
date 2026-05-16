import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatRuntime } from "@/lib/utils";
import { getMovieGenres, getReleaseYear, getVoteAverage } from "@/lib/tmdb";
import type { Movie } from "@/types/movie";

type MovieDetailsProps = {
  movie: Movie;
};

export function MovieDetails({ movie }: MovieDetailsProps) {
  const genres = getMovieGenres(movie);

  return (
    <Card className="border-white/10 bg-white/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white">Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Year</p>
            <p className="mt-1 font-medium text-white">{getReleaseYear(movie)}</p>
          </div>
          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Rating</p>
            <p className="mt-1 font-medium text-white">{getVoteAverage(movie)}</p>
          </div>
          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Runtime</p>
            <p className="mt-1 font-medium text-white">{formatRuntime(movie.runtime)}</p>
          </div>
          <div className="rounded-xl bg-black/20 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Language</p>
            <p className="mt-1 font-medium text-white">{movie.original_language?.toUpperCase() || "EN"}</p>
          </div>
        </div>
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

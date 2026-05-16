import Image from "next/image";
import Link from "next/link";
import { Play, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { backdropUrl, getMediaTitle, getMovieGenres, getReleaseYear } from "@/lib/tmdb";
import type { Movie } from "@/types/movie";

type MovieHeroProps = {
  movie: Movie;
};

export function MovieHero({ movie }: MovieHeroProps) {
  const title = getMediaTitle(movie);
  const backdrop = backdropUrl(movie.backdrop_path);

  return (
    <section className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40">
      <div className="relative min-h-[28rem] px-6 py-10 sm:px-10 lg:px-14">
        {backdrop ? (
          <Image src={backdrop} alt={title} fill priority sizes="100vw" className="object-cover opacity-30" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.2),transparent_30%),linear-gradient(180deg,#111827,#020617)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        <div className="relative z-10 flex min-h-[28rem] items-end">
          <div className="max-w-3xl space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white/10 text-white">Movie</Badge>
              <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-200">
                {getReleaseYear(movie)}
              </Badge>
              {getMovieGenres(movie).slice(0, 3).map((genre) => (
                <Badge key={genre.id} variant="secondary" className="bg-white/10 text-slate-200">
                  {genre.name}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">{movie.overview}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href={`/watch/${movie.id}`}>
                  <Play className="h-4 w-4 fill-current" />
                  Play
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/watchlist">
                  <Plus className="h-4 w-4" />
                  Save
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

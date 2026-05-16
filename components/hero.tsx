import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { backdropUrl, getMediaTitle, getReleaseYear } from "@/lib/tmdb";
import type { Movie } from "@/types/movie";
import { SearchBar } from "./SearchBar";

type HeroProps = {
  movie?: Movie;
};

export function Hero({ movie }: HeroProps) {
  const title = movie ? getMediaTitle(movie) : "CineFlix";
  const backdrop = backdropUrl(movie?.backdrop_path);

  return (
    <section className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/80">
      <div className="relative min-h-[32rem] px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        {backdrop ? (
          <Image
            src={backdrop}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.25),transparent_30%),radial-gradient(circle_at_right,rgba(34,211,238,0.18),transparent_24%),linear-gradient(180deg,#111827,#020617)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
        <div className="relative z-10 flex min-h-[32rem] flex-col justify-end gap-6">
          <div className="max-w-3xl space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-white/10 text-xs uppercase tracking-[0.25em] text-white/90">
                Featured
              </Badge>
              {movie ? (
                <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-200">
                  {getReleaseYear(movie)}
                </Badge>
              ) : null}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              {movie?.overview ||
                "Browse trending titles, track what you are watching, and jump into playback with a clean cinematic interface."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href={movie ? `/watch/${movie.id}` : "/search"}>
                  <Play className="h-4 w-4 fill-current" />
                  Watch now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/search">
                  Browse library
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="max-w-xl">
            <SearchBar placeholder="Search movies, shows, actors..." />
          </div>
        </div>
      </div>
    </section>
  );
}

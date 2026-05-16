import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Button } from "./ui/button";
import { backdropUrl, getMediaTitle } from "@/lib/tmdb";
import type { Movie } from "@/types/movie";

type HeroProps = {
  movie?: Movie;
};

export function Hero({ movie }: HeroProps) {
  const title = movie ? getMediaTitle(movie) : "CineFlix";
  const backdrop = backdropUrl(movie?.backdrop_path);

  return (
    <section className="overflow-hidden border border-white/10 bg-white/5">
      <div className="grid gap-0 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="relative min-h-[24rem] border-b border-white/10 p-6 sm:p-8 lg:min-h-[28rem]">
          {backdrop ? (
            <Image src={backdrop} alt={title} fill priority sizes="100vw" className="object-cover opacity-20" />
          ) : null}
          <div className="absolute inset-0 bg-slate-950/90" />
          <div className="relative z-10 flex h-full items-end">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Featured title</p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="max-w-xl text-sm leading-6 text-slate-300">
                {movie?.overview ||
                  "Browse the catalog, open a title, and play it from one simple view."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="sm" className="gap-2">
                  <Link href={movie ? `/watch/${movie.id}` : "/search"}>
                    <Play className="h-4 w-4 fill-current" />
                    Play
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-white/10 bg-transparent text-white hover:bg-white/5">
                  <Link href="/search">Browse</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 p-6 sm:p-8 lg:border-t-0 lg:border-l">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Quick search</p>
            <p className="text-sm text-slate-300">
              Use search to jump straight into a movie or series.
            </p>
            <Link
              href="/search"
              className="inline-flex rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
            >
              Open search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { Badge } from "../ui/badge";
import { backdropUrl, getMediaTitle, getMovieGenres, getReleaseYear } from "@/lib/tmdb";
import type { Movie } from "@/types/movie";
import { TitleActions } from "./TitleActions";

type MovieHeroProps = {
  movie: Movie;
  mediaType: "movie" | "tv";
  inWatchlist?: boolean;
};

export function MovieHero({ movie, mediaType, inWatchlist = false }: MovieHeroProps) {
  const title = getMediaTitle(movie);
  const backdrop = backdropUrl(movie.backdrop_path);

  return (
    <section className="border border-white/10 bg-white/5">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[22rem] border-b border-white/10 bg-slate-950 lg:min-h-[26rem] lg:border-b-0 lg:border-r">
          {backdrop ? (
            <Image src={backdrop} alt={title} fill priority sizes="100vw" className="object-cover opacity-25" />
          ) : null}
          <div className="absolute inset-0 bg-slate-950/90" />
          <div className="relative z-10 flex h-full items-end p-6 sm:p-8">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white/5 text-white">{mediaType === "tv" ? "Series" : "Movie"}</Badge>
                <Badge variant="secondary" className="bg-white/5 text-slate-200">
                  {getReleaseYear(movie)}
                </Badge>
              </div>
              <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                {title}
              </h1>
            </div>
          </div>
        </div>
        <div className="space-y-5 p-6 sm:p-8">
          <p className="max-w-2xl text-sm leading-6 text-slate-300">{movie.overview}</p>
          <div className="flex flex-wrap gap-2">
            {getMovieGenres(movie).slice(0, 3).map((genre) => (
              <Badge key={genre.id} variant="secondary" className="bg-white/5 text-slate-200">
                {genre.name}
              </Badge>
            ))}
          </div>
          <TitleActions
            movie={movie}
            mediaType={mediaType}
            inWatchlist={inWatchlist}
            returnTo={`/movie/${movie.id}?type=${mediaType}`}
          />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { getMediaTitle, getReleaseYear, posterUrl } from "@/lib/tmdb";
import type { Movie } from "@/types/movie";

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const title = getMediaTitle(movie);
  const poster = posterUrl(movie.poster_path);
  const mediaType = movie.media_type || (movie.name ? "tv" : "movie");

  return (
    <Link
      href={`/movie/${movie.id}?type=${mediaType}`}
      className="group block w-[9rem] shrink-0 sm:w-[10rem]"
      aria-label={title}
    >
      <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 transition group-hover:border-white/20">
        <div className="relative aspect-[2/3]">
          {poster ? (
            <Image
              src={poster}
              alt={title}
              fill
              sizes="168px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-end bg-slate-900 p-3">
              <span className="text-xl font-medium text-white/80">
                {title.slice(0, 1)}
              </span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <Badge variant="secondary" className="mb-1 bg-black/40 text-[9px] uppercase tracking-[0.15em] text-white">
              {getReleaseYear(movie)}
            </Badge>
            <p className="line-clamp-2 text-xs font-medium text-white">{title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

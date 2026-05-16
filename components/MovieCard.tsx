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

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group block w-[10.5rem] shrink-0"
      aria-label={title}
    >
      <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 shadow-lg shadow-black/20 transition duration-300 group-hover:-translate-y-1 group-hover:border-primary/40">
        <div className="relative aspect-[2/3]">
          {poster ? (
            <Image
              src={poster}
              alt={title}
              fill
              sizes="168px"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-end bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_52%),linear-gradient(180deg,#1f2937,#0f172a)] p-4">
              <span className="text-2xl font-semibold tracking-tight text-white/90">
                {title.slice(0, 1)}
              </span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-3">
            <Badge variant="secondary" className="mb-2 bg-black/50 text-[10px] uppercase tracking-[0.2em] text-white">
              {getReleaseYear(movie)}
            </Badge>
            <p className="line-clamp-2 text-sm font-medium text-white">{title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

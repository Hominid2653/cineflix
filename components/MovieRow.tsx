import Link from "next/link";
import MovieCard from "./MovieCard";
import type { Movie } from "@/types/movie";
import { ArrowRight } from "lucide-react";

type MovieRowProps = {
  title: string;
  movies: Movie[];
  description?: string;
  href?: string;
};

export default function MovieRow({ title, movies, description, href }: MovieRowProps) {
  if (!movies.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
          {description ? <p className="max-w-2xl text-sm text-slate-400">{description}</p> : null}
        </div>
        {href ? (
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

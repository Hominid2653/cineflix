import Link from "next/link";
import { fallbackGenres } from "@/lib/tmdb";
import { Button } from "./ui/button";

type GenrePillsProps = {
  activeGenre?: string;
};

export function GenrePills({ activeGenre }: GenrePillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {fallbackGenres.map((genre) => {
        const active = activeGenre?.toLowerCase() === genre.name.toLowerCase();

        return (
          <Button
            key={genre.id}
            asChild
            size="sm"
            variant={active ? "default" : "outline"}
            className={active ? "" : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"}
          >
            <Link href={`/search?genre=${encodeURIComponent(genre.name)}`}>{genre.name}</Link>
          </Button>
        );
      })}
    </div>
  );
}

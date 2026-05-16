import Link from "next/link";
import { getGenres } from "@/lib/tmdb";
import { Button } from "./ui/button";

type GenrePillsProps = {
  activeGenre?: string;
};

export async function GenrePills({ activeGenre }: GenrePillsProps) {
  const genres = await getGenres();

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => {
        const active = activeGenre?.toLowerCase() === genre.name.toLowerCase();

        return (
          <Button
            key={genre.id}
            asChild
            size="sm"
            variant={active ? "default" : "outline"}
            className={active ? "" : "border-white/10 bg-transparent text-slate-300 hover:bg-white/5"}
          >
            <Link href={`/search?genre=${encodeURIComponent(genre.name)}`}>{genre.name}</Link>
          </Button>
        );
      })}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { WatchProgress } from "@/types/movie";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { posterUrl } from "@/lib/tmdb";

type ContinueWatchingProps = {
  items: WatchProgress[];
};

export function ContinueWatching({ items }: ContinueWatchingProps) {
  if (!items.length) {
    return (
      <Card className="border-white/10 bg-white/5 p-6">
        <p className="text-sm text-slate-300">Nothing in progress yet. Start a film and it will appear here.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const poster = posterUrl(item.posterPath);

        return (
          <Card key={item.movieId} className="overflow-hidden border-white/10 bg-white/5">
            <div className="flex gap-4 p-4">
              <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-800">
                {poster ? (
                  <Image src={poster} alt={item.title} fill sizes="64px" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-400">
                    {item.title.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-3">
                <div>
                  <h3 className="truncate text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400">{item.progress}% watched</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${item.progress}%` }} />
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild size="sm">
                    <Link href={`/watch/${item.movieId}`}>
                      <Play className="h-4 w-4 fill-current" />
                      Resume
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

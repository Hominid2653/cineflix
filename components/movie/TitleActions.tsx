import Link from "next/link";
import { Bookmark, CheckCircle2, Play } from "lucide-react";
import { Button } from "../ui/button";
import { toggleWatchlistAction, markWatchedAction } from "@/app/actions";
import type { Movie } from "@/types/movie";

type TitleActionsProps = {
  movie: Movie;
  mediaType: "movie" | "tv";
  inWatchlist?: boolean;
  showMarkWatched?: boolean;
  returnTo: string;
};

export function TitleActions({
  movie,
  mediaType,
  inWatchlist = false,
  showMarkWatched = false,
  returnTo,
}: TitleActionsProps) {
  const runtimeMinutes = movie.runtime ?? movie.episode_run_time?.[0] ?? 0;
  const durationSeconds = runtimeMinutes * 60;

  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild size="lg" className="gap-2">
        <Link href={`/watch/${movie.id}?type=${mediaType}`}>
          <Play className="h-4 w-4 fill-current" />
          Play
        </Link>
      </Button>

      <form action={toggleWatchlistAction}>
        <input type="hidden" name="tmdbId" value={movie.id} />
        <input type="hidden" name="mediaType" value={mediaType} />
        <input type="hidden" name="returnTo" value={returnTo} />
        <Button
          type="submit"
          size="lg"
          variant="outline"
          className="gap-2 border-white/15 bg-white/5 text-white hover:bg-white/10"
        >
          <Bookmark className="h-4 w-4" />
          {inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        </Button>
      </form>

      {showMarkWatched ? (
        <form action={markWatchedAction}>
          <input type="hidden" name="tmdbId" value={movie.id} />
          <input type="hidden" name="mediaType" value={mediaType} />
          <input type="hidden" name="durationSeconds" value={durationSeconds} />
          <input type="hidden" name="returnTo" value={returnTo} />
          <Button
            type="submit"
            size="lg"
            variant="secondary"
            className="gap-2 bg-white/10 text-white hover:bg-white/15"
          >
            <CheckCircle2 className="h-4 w-4" />
            Mark watched
          </Button>
        </form>
      ) : null}
    </div>
  );
}

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { MovieDetails } from "@/components/movie/MovieDetails";
import { SimilarMovies } from "@/components/movie/SimilarMovies";
import { TitleActions } from "@/components/movie/TitleActions";
import { getTitleById, getSimilarTitlesById } from "@/lib/tmdb";
import { getWatchlistStatus } from "@/lib/db";

type WatchPageProps = {
  params: {
    id: string;
  };
  searchParams?: {
    type?: "movie" | "tv";
  };
};

export default async function WatchPage({ params, searchParams }: WatchPageProps) {
  const { id } = await Promise.resolve(params);
  const type = searchParams?.type === "tv" ? "tv" : "movie";
  const movieId = Number(id);
  const movie = await getTitleById(movieId, type);
  const similar = await getSimilarTitlesById(movieId, type);
  const inWatchlist = await getWatchlistStatus(movieId, type);

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <VideoPlayer tmdbId={movieId} title={movie.title || movie.name || "Playback"} mediaType={type} />
        <TitleActions
          movie={movie}
          mediaType={type}
          inWatchlist={inWatchlist}
          showMarkWatched
          returnTo={`/watch/${movie.id}?type=${type}`}
        />
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <MovieDetails movie={movie} />
          <SimilarMovies movies={similar.slice(0, 6)} />
        </div>
      </div>
      <Footer />
    </main>
  );
}

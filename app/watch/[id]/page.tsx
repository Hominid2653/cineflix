import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { MovieDetails } from "@/components/movie/MovieDetails";
import { SimilarMovies } from "@/components/movie/SimilarMovies";
import { getMovieById, getSimilarMoviesById } from "@/lib/tmdb";

type WatchPageProps = {
  params: {
    id: string;
  };
};

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await Promise.resolve(params);
  const movieId = Number(id);
  const movie = await getMovieById(movieId);
  const similar = await getSimilarMoviesById(movieId);

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <VideoPlayer tmdbId={movieId} title={movie.title || movie.name || "Playback"} />
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <MovieDetails movie={movie} />
          <SimilarMovies movies={similar.slice(0, 6)} />
        </div>
      </div>
      <Footer />
    </main>
  );
}

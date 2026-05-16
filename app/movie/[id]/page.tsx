import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MovieHero } from "@/components/movie/MovieHero";
import { MovieDetails } from "@/components/movie/MovieDetails";
import { CastList } from "@/components/movie/CastList";
import { SimilarMovies } from "@/components/movie/SimilarMovies";
import { getMovieById, getMovieCreditsById, getSimilarMoviesById } from "@/lib/tmdb";

type MoviePageProps = {
  params: {
    id: string;
  };
};

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await Promise.resolve(params);
  const movieId = Number(id);
  const movie = await getMovieById(movieId);
  const credits = await getMovieCreditsById(movieId);
  const similar = await getSimilarMoviesById(movieId);

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <MovieHero movie={movie} />
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <MovieDetails movie={movie} />
            <CastList cast={credits.cast.slice(0, 8)} />
          </div>
          <div className="space-y-6">
            <SimilarMovies movies={similar.slice(0, 10)} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

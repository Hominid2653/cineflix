import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MovieHero } from "@/components/movie/MovieHero";
import { MovieDetails } from "@/components/movie/MovieDetails";
import { CastList } from "@/components/movie/CastList";
import { SimilarMovies } from "@/components/movie/SimilarMovies";
import { getTitleById, getTitleCreditsById, getSimilarTitlesById } from "@/lib/tmdb";
import { getWatchlistStatus } from "@/lib/db";

type MoviePageProps = {
  params: {
    id: string;
  };
  searchParams?: {
    type?: "movie" | "tv";
  };
};

export default async function MoviePage({ params, searchParams }: MoviePageProps) {
  const { id } = await Promise.resolve(params);
  const type = searchParams?.type === "tv" ? "tv" : "movie";
  const movieId = Number(id);
  const movie = await getTitleById(movieId, type);
  const credits = await getTitleCreditsById(movieId, type);
  const similar = await getSimilarTitlesById(movieId, type);
  const inWatchlist = await getWatchlistStatus(movieId, type);

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <MovieHero movie={movie} mediaType={type} inWatchlist={inWatchlist} />
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

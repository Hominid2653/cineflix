import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/hero";
import MovieRow from "@/components/MovieRow";
import { ContinueWatching } from "@/components/ContinueWatching";
import { getPopularMovies, getTopRatedMovies, getTrendingMovies, fallbackMovies } from "@/lib/tmdb";
import { getContinueWatchingItems } from "@/lib/db";

export default async function Home() {
  const [trending, popular, topRated] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
  ]);
  const continueWatching = await getContinueWatchingItems();

  const featured = trending[0] || fallbackMovies[0];

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <Hero movie={featured} />

        <section className="space-y-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Continue watching</p>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Pick up where you left off</h2>
          </div>
          <ContinueWatching items={continueWatching} />
        </section>

        <MovieRow
          title="Trending now"
          movies={trending}
          href="/search"
        />
        <MovieRow
          title="Popular picks"
          movies={popular}
          href="/search"
        />
        <MovieRow
          title="Top rated"
          movies={topRated}
          href="/search"
        />
      </div>
      <Footer />
    </main>
  );
}

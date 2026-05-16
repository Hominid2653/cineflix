import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/hero";
import MovieRow from "@/components/MovieRow";
import { GenrePills } from "@/components/GenrePills";
import { ContinueWatching } from "@/components/ContinueWatching";
import { getPopularMovies, getTopRatedMovies, getTrendingMovies, fallbackMovies } from "@/lib/tmdb";

const continueWatching = [
  {
    movieId: 101,
    title: "Signal Run",
    posterPath: null,
    progress: 68,
  },
  {
    movieId: 104,
    title: "After Hours Code",
    posterPath: null,
    progress: 41,
  },
  {
    movieId: 102,
    title: "Midnight Harbor",
    posterPath: null,
    progress: 82,
  },
];

export default async function Home() {
  const [trending, popular, topRated] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
  ]);

  const featured = trending[0] || fallbackMovies[0];

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-8 lg:px-8">
        <Hero movie={featured} />

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Explore</p>
              <h2 className="text-2xl font-semibold tracking-tight text-white">Browse by genre</h2>
            </div>
            <GenrePills />
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Continue watching</p>
            <h2 className="text-2xl font-semibold tracking-tight text-white">Pick up where you left off</h2>
          </div>
          <ContinueWatching items={continueWatching} />
        </section>

        <MovieRow
          title="Trending now"
          description="Fresh recommendations from the TMDB trending feed."
          movies={trending}
          href="/search"
        />
        <MovieRow
          title="Popular picks"
          description="The titles people are opening the most right now."
          movies={popular}
          href="/search"
        />
        <MovieRow
          title="Top rated"
          description="Audience favorites with the strongest ratings."
          movies={topRated}
          href="/search"
        />
      </div>
      <Footer />
    </main>
  );
}

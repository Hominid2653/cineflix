import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContinueWatching } from "@/components/ContinueWatching";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MovieRow from "@/components/MovieRow";
import { fallbackMovies, getPopularMovies } from "@/lib/tmdb";

const progress = [
  { movieId: 101, title: "Signal Run", progress: 68, posterPath: null },
  { movieId: 102, title: "Midnight Harbor", progress: 82, posterPath: null },
];

export default async function ProfilePage() {
  const recommendations = await getPopularMovies();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <section className="grid gap-4 md:grid-cols-3">
          <Card className="border-white/10 bg-white/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">Watch time</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-white">42h 18m</CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">Favorites</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-white">18</CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">Continue watching</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-white">{progress.length}</CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Continue watching</p>
          <ContinueWatching items={progress} />
        </section>

        <MovieRow
          title="Recommended for you"
          description="Popular titles to keep your watchlist moving."
          movies={recommendations.length ? recommendations : fallbackMovies}
        />
      </div>
      <Footer />
    </main>
  );
}

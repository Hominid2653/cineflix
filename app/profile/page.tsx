import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContinueWatching } from "@/components/ContinueWatching";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import MovieRow from "@/components/MovieRow";
import { fallbackMovies, getPopularMovies } from "@/lib/tmdb";
import { getUserLibrary } from "@/lib/db";

export default async function ProfilePage() {
  const library = await getUserLibrary();
  const recommendations = await getPopularMovies();
  const continueWatching = library?.continueWatching || [];
  const watchlist = library?.watchlist || [];
  const stats = library?.stats;
  const profile = library?.profile;

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Profile</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            {profile?.full_name || "Viewer"}
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Your saved titles, watch progress, and activity summary from Supabase.
          </p>
        </section>
        <section className="grid gap-4 md:grid-cols-3">
          <Card className="border-white/10 bg-white/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">Watch time</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-white">
              {stats ? `${stats.watchHistoryCount} plays` : "0"}
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">Favorites</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-white">
              {stats ? stats.interactionsCount : 0}
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">Continue watching</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-white">{continueWatching.length}</CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Continue watching</p>
          <ContinueWatching items={continueWatching} />
        </section>

        <section className="space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Watchlist</p>
          {watchlist.length ? (
            <MovieRow
              title="Saved titles"
              description="Movies and series pulled from your Supabase watchlist."
              movies={watchlist}
            />
          ) : (
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-white">No saved titles yet</CardTitle>
                <CardDescription className="text-slate-400">
                  Add a movie or series from its detail page to build your watchlist.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
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

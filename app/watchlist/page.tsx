import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import MovieRow from "@/components/MovieRow";
import { getWatchlistItems } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function WatchlistPage() {
  const watchlist = await getWatchlistItems();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Watchlist</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Saved for later</h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Keep track of titles you want to watch next. This is wired to your Supabase watchlist.
          </p>
        </section>
        {watchlist.length ? (
          <MovieRow title="Saved titles" movies={watchlist} />
        ) : (
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-white">Nothing saved yet</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Open any movie or series and use the watchlist button to save it here.
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </main>
  );
}

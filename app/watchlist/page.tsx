import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import MovieRow from "@/components/MovieRow";
import { fallbackMovies } from "@/lib/tmdb";

export default function WatchlistPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Watchlist</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Saved for later</h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Keep track of titles you want to watch next. This section is wired for watchlist data once Supabase is connected.
          </p>
        </section>
        <MovieRow title="Saved titles" movies={fallbackMovies} />
      </div>
      <Footer />
    </main>
  );
}

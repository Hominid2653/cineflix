import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import MovieRow from "@/components/MovieRow";
import { SearchBar } from "@/components/SearchBar";
import { GenrePills } from "@/components/GenrePills";
import { fallbackGenres, discoverMovies, searchTitles, getTrendingMovies } from "@/lib/tmdb";

type SearchPageProps = {
  searchParams?: {
    q?: string;
    genre?: string;
  };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await Promise.resolve(searchParams || {});
  const query = params.q?.trim() || "";
  const genre = params.genre?.trim() || "";
  const genreId = fallbackGenres.find((item) => item.name.toLowerCase() === genre.toLowerCase())?.id;

  const results = query
    ? await searchTitles(query)
    : genreId
      ? await discoverMovies({ with_genres: genreId })
      : await getTrendingMovies();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
        <section className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Search</p>
            <h1 className="text-3xl font-semibold tracking-tight text-white">Find something to play next</h1>
          </div>
          <SearchBar defaultValue={query} placeholder="Search titles, shows, people..." />
          <GenrePills activeGenre={genre || undefined} />
        </section>

        <MovieRow
          title={query ? `Results for "${query}"` : genre ? `${genre} movies` : "Trending movies"}
          description="Use the search bar or genre filters to narrow the catalog."
          movies={results}
        />
      </div>
      <Footer />
    </main>
  );
}

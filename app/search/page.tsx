import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import MovieRow from "@/components/MovieRow";
import { SearchBar } from "@/components/SearchBar";
import { GenrePills } from "@/components/GenrePills";
import { discoverMovies, searchTitles, getTrendingMovies, findGenreByName } from "@/lib/tmdb";

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
  const genreId = (await findGenreByName(genre))?.id;

  const results = query
    ? await searchTitles(query)
    : genreId
      ? await discoverMovies({ with_genres: genreId, sort_by: "popularity.desc" })
      : await getTrendingMovies();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className="space-y-3">
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

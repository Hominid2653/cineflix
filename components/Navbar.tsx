import { Suspense } from "react";
import Link from "next/link";
import { Film, Search, Clapperboard } from "lucide-react";
import { Button } from "./ui/button";
import { AuthButton } from "./auth-button";
import { SearchBar } from "./SearchBar";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-wide text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Film className="h-4 w-4" />
          </span>
          CineFlix
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" className="text-slate-300 hover:bg-white/5 hover:text-white">
            <Link href="/search">
              <Search className="h-4 w-4" />
              Discover
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-slate-300 hover:bg-white/5 hover:text-white">
            <Link href="/watchlist">
              <Clapperboard className="h-4 w-4" />
              Watchlist
            </Link>
          </Button>
        </nav>
        <div className="hidden flex-1 lg:block">
          <SearchBar placeholder="Search titles, people, genres..." />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:block">
            <Suspense
              fallback={
                <div className="h-9 w-40 rounded-full border border-white/10 bg-white/5" />
              }
            >
              <AuthButton />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}

import { Suspense } from "react";
import Link from "next/link";
import { Film, Search, Clapperboard } from "lucide-react";
import { Button } from "./ui/button";
import { AuthButton } from "./auth-button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white">
            <Film className="h-4 w-4" />
          </span>
          CineFlix
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          <Button asChild variant="ghost" size="sm" className="text-slate-300 hover:bg-white/5 hover:text-white">
            <Link href="/search">
              <Search className="h-4 w-4" />
              Discover
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-slate-300 hover:bg-white/5 hover:text-white">
            <Link href="/watchlist">
              <Clapperboard className="h-4 w-4" />
              Watchlist
            </Link>
          </Button>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Suspense
            fallback={<div className="h-8 w-24 rounded-md border border-white/10 bg-white/5" />}
          >
            <AuthButton />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-white">CineFlix</p>
          <p className="max-w-xl">
            Movie discovery, playback, watch history, and recommendations in one focused streaming workspace.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/search" className="transition hover:text-white">
            Search
          </Link>
          <Link href="/watchlist" className="transition hover:text-white">
            Watchlist
          </Link>
          <Link href="/profile" className="transition hover:text-white">
            Profile
          </Link>
        </div>
      </div>
    </footer>
  );
}

"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type SearchBarProps = {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

export function SearchBar({
  placeholder = "Search titles...",
  defaultValue = "",
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search");
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 shadow-lg shadow-black/20 backdrop-blur">
        <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            className="h-9 border-0 bg-transparent px-0 text-sm text-white placeholder:text-slate-500 focus-visible:ring-0"
          />
        </div>
        <Button type="submit" size="sm" className="rounded-full px-4">
          Search
        </Button>
      </div>
    </form>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5">
        <div className="h-[28rem] animate-pulse bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,255,255,0.12),rgba(255,255,255,0.04))] bg-[length:200%_100%]" />
      </div>
      <div className="space-y-4">
        <div className="h-6 w-48 rounded-full bg-white/10 animate-pulse" />
        <div className="h-4 w-80 rounded-full bg-white/10 animate-pulse" />
        <div className="flex gap-3">
          <div className="h-10 w-32 rounded-full bg-white/10 animate-pulse" />
          <div className="h-10 w-36 rounded-full bg-white/10 animate-pulse" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-72 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="h-full animate-pulse rounded-lg bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,255,255,0.12),rgba(255,255,255,0.04))] bg-[length:200%_100%]" />
          </div>
        ))}
      </div>
    </div>
  );
}

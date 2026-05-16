import Image from "next/image";
import { profileUrl } from "@/lib/tmdb";
import type { CastMember } from "@/types/movie";

type CastListProps = {
  cast: CastMember[];
};

export function CastList({ cast }: CastListProps) {
  if (!cast.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-white">Cast</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {cast.map((member) => {
          const image = profileUrl(member.profile_path);

          return (
            <article key={member.id} className="w-32 shrink-0 space-y-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-slate-800">
                {image ? (
                  <Image src={image} alt={member.name} fill sizes="128px" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[linear-gradient(180deg,#1f2937,#0f172a)] text-sm font-semibold text-slate-300">
                    {member.name.slice(0, 1)}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{member.name}</p>
                <p className="text-xs text-slate-400">{member.character || member.known_for_department || "Cast"}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

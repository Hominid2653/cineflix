"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Play } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ServerSelector, type StreamServer } from "./ServerSelector";

type VideoPlayerProps = {
  tmdbId: number;
  title: string;
};

const defaultServers: StreamServer[] = [
  { id: "vidsrc", label: "VidSrc", url: "https://vidsrc.to/embed/movie/" },
  { id: "vidsrc2", label: "VidSrc X", url: "https://vidsrc.xyz/embed/movie/" },
  { id: "embedsu", label: "EmbedSu", url: "https://embed.su/embed/movie/" },
];

export function VideoPlayer({ tmdbId, title }: VideoPlayerProps) {
  const servers = useMemo(() => defaultServers, []);
  const [activeServerId, setActiveServerId] = useState(servers[0].id);

  const activeServer = servers.find((server) => server.id === activeServerId) ?? servers[0];
  const embedUrl = `${activeServer.url}${tmdbId}`;

  return (
    <Card className="border-white/10 bg-black/40">
      <CardContent className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Streaming player</p>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          </div>
          <ServerSelector servers={servers} activeServerId={activeServerId} onSelect={setActiveServerId} />
        </div>

        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
          <iframe
            key={embedUrl}
            src={embedUrl}
            title={`${title} player`}
            className="h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            If one embed source stalls, switch servers and continue watching without losing your place.
          </p>
        </div>

        <Button asChild size="sm" variant="outline" className="border-white/10 bg-white/5 text-slate-100 hover:bg-white/10">
          <a href={embedUrl} target="_blank" rel="noreferrer">
            <Play className="h-4 w-4 fill-current" />
            Open player
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

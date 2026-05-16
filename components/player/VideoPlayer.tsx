"use client";

import { useMemo, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ServerSelector, type StreamServer } from "./ServerSelector";

type VideoPlayerProps = {
  tmdbId: number;
  title: string;
  mediaType?: "movie" | "tv";
};

const defaultServers: StreamServer[] = [
  { id: "vidsrc", label: "VidSrc", url: "https://vidsrc.to/embed/movie/" },
  { id: "vidsrc2", label: "VidSrc X", url: "https://vidsrc.xyz/embed/movie/" },
  { id: "embedsu", label: "EmbedSu", url: "https://embed.su/embed/movie/" },
];

export function VideoPlayer({ tmdbId, title, mediaType = "movie" }: VideoPlayerProps) {
  const servers = useMemo(() => defaultServers, []);
  const [activeServerId, setActiveServerId] = useState(servers[0].id);

  const activeServer = servers.find((server) => server.id === activeServerId) ?? servers[0];
  const normalizedUrl = activeServer.url.replace("/movie/", `/${mediaType}/`);
  const finalUrl = `${normalizedUrl}${tmdbId}`;

  return (
    <Card className="border-white/10 bg-white/5">
      <CardContent className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-medium text-white">{title}</h2>
          <ServerSelector servers={servers} activeServerId={activeServerId} onSelect={setActiveServerId} />
        </div>

        <div className="relative aspect-video overflow-hidden border border-white/10 bg-black">
          <iframe
            key={finalUrl}
            src={finalUrl}
            title={`${title} player`}
            className="h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>

        <Button asChild size="sm" variant="outline" className="border-white/10 bg-white/5 text-slate-100 hover:bg-white/10">
          <a href={finalUrl} target="_blank" rel="noreferrer">
            <Play className="h-4 w-4 fill-current" />
            Open player
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

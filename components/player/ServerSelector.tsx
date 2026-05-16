"use client";

import { Button } from "../ui/button";

export type StreamServer = {
  id: string;
  label: string;
  url: string;
};

type ServerSelectorProps = {
  servers: StreamServer[];
  activeServerId: string;
  onSelect: (serverId: string) => void;
};

export function ServerSelector({ servers, activeServerId, onSelect }: ServerSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {servers.map((server) => {
        const active = server.id === activeServerId;

        return (
          <Button
            key={server.id}
            type="button"
            size="sm"
            variant={active ? "default" : "outline"}
            className={active ? "" : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"}
            onClick={() => onSelect(server.id)}
          >
            {server.label}
          </Button>
        );
      })}
    </div>
  );
}

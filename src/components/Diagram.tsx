export function Diagram({ kind }: { kind: "orchestration" | "pipeline" | "storage" }) {
  const configs = {
    orchestration: {
      title: "GenBlaze orchestration",
      nodes: [
        { label: "Router", sub: "cost + quality" },
        { label: "Reasoning", sub: "GPT-class" },
        { label: "Writing", sub: "specialist" },
        { label: "Imagery", sub: "diffusion" },
      ],
    },
    pipeline: {
      title: "URL → Campaign pipeline",
      nodes: [
        { label: "Ingest", sub: "product URL" },
        { label: "Extract", sub: "brand + assets" },
        { label: "Generate", sub: "copy + creative" },
        { label: "Deliver", sub: "channel-ready" },
      ],
    },
    storage: {
      title: "Backblaze B2 lifecycle",
      nodes: [
        { label: "Upload", sub: "signed PUT" },
        { label: "Cache", sub: "edge warm" },
        { label: "Archive", sub: "cold tier" },
        { label: "Expire", sub: "policy" },
      ],
    },
  };
  const cfg = configs[kind];

  return (
    <figure className="my-12">
      <div className="relative glass-strong rounded-2xl p-8 overflow-hidden">
        <div className="absolute inset-0 ambient-orange opacity-40 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#FFDAB9]/80 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFDAB9] animate-pulse-glow" />
            {cfg.title}
          </div>
          <div className="grid gap-3 sm:grid-cols-4 items-stretch relative">
            {cfg.nodes.map((n, i) => (
              <div key={n.label} className="relative">
                <div className="glass rounded-xl p-4 h-full">
                  <div className="text-xs text-muted-foreground">Step {i + 1}</div>
                  <div className="text-display text-lg font-semibold mt-1">{n.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{n.sub}</div>
                </div>
                {i < cfg.nodes.length - 1 && (
                  <div className="hidden sm:block absolute top-1/2 -right-2 -translate-y-1/2 text-[#FFDAB9]/60 text-lg">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-center text-muted-foreground">
        {cfg.title} — simplified for illustration
      </figcaption>
    </figure>
  );
}

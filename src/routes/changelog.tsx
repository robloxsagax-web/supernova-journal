import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog · Supernova Journal" },
      { name: "description", content: "Product updates and improvements from the Supernova team. Shipping weekly." },
      { property: "og:title", content: "Changelog · Supernova Journal" },
      { property: "og:description", content: "Product updates and improvements from the Supernova team. Shipping weekly." },
    ],
  }),
  component: ChangelogPage,
});

type Entry = {
  date: string;
  version: string;
  title: string;
  tag: "New" | "Improved" | "Fixed" | "Announcement";
  items: string[];
};

const ENTRIES: Entry[] = [
  {
    date: "Nov 15, 2026",
    version: "1.9.0",
    title: "Multi-channel campaign export",
    tag: "New",
    items: [
      "Export a single campaign to Meta, LinkedIn, Google, and TikTok in one click",
      "Automatic aspect-ratio and copy-length adaptation per channel",
      "Live preview of every ad variant before you ship",
    ],
  },
  {
    date: "Nov 08, 2026",
    version: "1.8.4",
    title: "GenBlaze routing v2",
    tag: "Improved",
    items: [
      "Router now factors in real-time model latency, not just cost",
      "Median campaign generation is 34% faster on complex briefs",
      "New fallback graph reduces stuck runs to near zero",
    ],
  },
  {
    date: "Oct 30, 2026",
    version: "1.8.0",
    title: "Video pipeline goes live",
    tag: "New",
    items: [
      "Generate short-form video from any product URL",
      "Backblaze B2 lifecycle tuned for hot / cold video assets",
      "Streaming preview appears within the first 3 seconds of render",
    ],
  },
  {
    date: "Oct 18, 2026",
    version: "1.7.2",
    title: "Editor stability & keyboard shortcuts",
    tag: "Fixed",
    items: [
      "Fixed a rare crash when editing brand voice mid-generation",
      "New ⌘K palette across the app",
      "Undo history now spans the full session",
    ],
  },
  {
    date: "Sep 01, 2026",
    version: "1.0.0",
    title: "Supernova is publicly available",
    tag: "Announcement",
    items: [
      "The AI marketing agent, opened to teams everywhere",
      "GenBlaze orchestration engine in general availability",
      "Storage powered by Backblaze B2",
    ],
  },
];

const TAG_STYLE: Record<Entry["tag"], string> = {
  New: "bg-[#8B5A2B]/30 border-[#8B5A2B]/50 text-[#FFDAB9]",
  Improved: "bg-[#5C3317]/30 border-[#8B5A2B]/40 text-[#FFDAB9]/90",
  Fixed: "bg-white/[0.04] border-border text-muted-foreground",
  Announcement: "bg-[#FFDAB9]/10 border-[#FFDAB9]/30 text-[#FFDAB9]",
};

function ChangelogPage() {
  return (
    <div className="relative min-h-screen">
      <Nav />
      <section className="relative pt-40 pb-12 overflow-hidden">
        <div className="absolute inset-0 ambient-orange pointer-events-none" />
        <div className="relative mx-auto max-w-[880px] px-6 text-center animate-rise">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFDAB9] animate-pulse-glow" />
            Shipping weekly
          </div>
          <h1 className="text-display mt-8 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1]">
            Changelog
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Every improvement to Supernova, in reverse chronological order. Written by the team that built them.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[880px] px-6 pb-24">
        <ol className="relative border-l border-border pl-8 space-y-12">
          {ENTRIES.map((e, i) => (
            <li key={e.version} className="relative animate-lift-in" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="absolute -left-[37px] top-2 grid place-items-center h-3.5 w-3.5 rounded-full bg-[#09090B] border border-[#8B5A2B]/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFDAB9] animate-pulse-glow" />
              </span>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-muted-foreground">{e.date}</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-[#FFDAB9]/80 font-mono">v{e.version}</span>
                <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.18em] border ${TAG_STYLE[e.tag]}`}>
                  {e.tag}
                </span>
              </div>
              <h2 className="text-display text-2xl md:text-3xl font-semibold mt-3">{e.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {e.items.map((item, k) => (
                  <li key={k} className="flex gap-3 text-[15px] leading-[1.7] text-foreground/85">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#FFDAB9]/70 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </main>
      <Footer />
    </div>
  );
}

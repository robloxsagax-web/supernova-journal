import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { ARTICLES, CATEGORIES, popularArticles, type Category } from "@/data/articles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Supernova Journal — AI Marketing Insights | Supernova" },
      { name: "description", content: "The Supernova blog. Editorial insights on AI marketing, engineering, and the systems changing how modern teams ship campaigns." },
      { property: "og:title", content: "Supernova Journal — AI Marketing Insights | Supernova" },
      { property: "og:description", content: "Editorial insights on AI marketing, engineering, and the systems changing how modern teams ship campaigns." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogHome,
});

function BlogHome() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<Category | "All">("All");
  const searchRef = useRef<HTMLInputElement | null>(null);

  const featured = ARTICLES.find((a) => a.featured)!;
  const rest = ARTICLES.filter((a) => a !== featured);
  const popular = useMemo(() => popularArticles(4), []);

  // Cmd/Ctrl+K to focus search, Esc to clear
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === searchRef.current) {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    return rest.filter((a) => {
      const catMatch = activeCat === "All" || a.category === activeCat;
      const q = query.trim().toLowerCase();
      const qMatch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return catMatch && qMatch;
    });
  }, [rest, query, activeCat]);

  const large = filtered.filter((a) => a.size === "large").slice(0, 2);
  const medium = filtered.filter((a) => a.size === "medium");
  const small = filtered.filter((a) => a.size === "small" || !a.size);

  const showBaseline = activeCat === "All" && !query;

  return (
    <div className="relative min-h-screen">
      <Nav />
      <Hero />
      <main className="mx-auto max-w-[1280px] px-6">
        {/* Featured */}
        <section className="animate-rise">
          {showBaseline && <ArticleCard article={featured} variant="hero" />}
        </section>

        {/* Popular Reads Rail — subtle, only on baseline view */}
        {showBaseline && <PopularRail articles={popular} />}

        {/* Categories + search */}
        <section className="mt-16 flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
          <div className="flex flex-wrap gap-2">
            {(["All", ...CATEGORIES] as const).map((c) => {
              const active = activeCat === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCat(c as Category | "All")}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-500 ${
                    active
                      ? "chip-active"
                      : "border border-border text-muted-foreground hover:text-foreground hover:border-border-strong hover:bg-white/[0.03]"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div className="relative w-full lg:w-96 group">
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, authors, topics…"
              className="w-full glass input-glow rounded-full pl-11 pr-24 py-3 text-sm placeholder:text-muted-foreground focus:outline-none transition-all"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">⌕</span>
            {query ? (
              <button
                onClick={() => { setQuery(""); searchRef.current?.focus(); }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-7 w-7 rounded-full text-muted-foreground hover:text-[#FFDAB9] hover:bg-white/[0.06] transition-colors"
              >
                ✕
              </button>
            ) : (
              <kbd className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-1 rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground bg-white/[0.03]">
                ⌘K
              </kbd>
            )}
          </div>
        </section>

        {/* Filter meta */}
        {!showBaseline && (
          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground animate-lift-in">
            <span className="text-[#FFDAB9]">{filtered.length}</span>
            <span>result{filtered.length === 1 ? "" : "s"}</span>
            {query && <span className="italic">for "{query}"</span>}
            <button
              onClick={() => { setQuery(""); setActiveCat("All"); }}
              className="ml-auto text-muted-foreground hover:text-[#FFDAB9] transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Editorial grid */}
        <section className="mt-8">
          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-16 text-center animate-lift-in">
              <div className="mx-auto h-14 w-14 rounded-full grid place-items-center bg-gradient-to-br from-[#8B5A2B]/40 to-[#5C3317]/40 border border-[#8B5A2B]/40 text-[#FFDAB9] text-xl">
                ⌕
              </div>
              <p className="text-display text-2xl mt-5">No stories match</p>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                Try a different keyword, or clear the filters to see the full journal.
              </p>
              <button
                onClick={() => { setQuery(""); setActiveCat("All"); }}
                className="mt-6 inline-flex px-5 py-2 rounded-full text-xs font-medium text-[#FFDAB9] border border-[#8B5A2B]/60 bg-gradient-to-b from-[#8B5A2B]/30 to-[#5C3317]/30 hover:from-[#8B5A2B]/50 hover:to-[#5C3317]/50 transition-all"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {large.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {large.map((a) => <div key={a.slug} className="animate-lift-in"><ArticleCard article={a} variant="large" /></div>)}
                </div>
              )}
              {medium.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {medium.map((a) => <div key={a.slug} className="animate-lift-in"><ArticleCard article={a} variant="medium" /></div>)}
                </div>
              )}
              {small.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {small.map((a) => <div key={a.slug} className="animate-lift-in"><ArticleCard article={a} variant="small" /></div>)}
                </div>
              )}
            </div>
          )}
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

function PopularRail({ articles }: { articles: ReturnType<typeof popularArticles> }) {
  return (
    <section className="mt-20">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#FFDAB9]/80">Popular This Month</div>
          <h2 className="text-display text-2xl md:text-3xl font-semibold mt-2">Most read on Supernova</h2>
        </div>
        <span className="hidden md:block text-xs text-muted-foreground">Curated by reads · updated weekly</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {articles.map((a, i) => (
          <Link
            key={a.slug}
            to="/blog/$slug"
            params={{ slug: a.slug }}
            preload="intent"
            className="group relative glass rounded-2xl p-5 flex gap-4 transition-all duration-500 hover:-translate-y-1 hover:border-[#8B5A2B]/40 hover:shadow-[0_16px_50px_-30px_rgba(255,218,185,0.4)]"
          >
            <div className="text-display text-3xl font-semibold text-[#FFDAB9]/80 leading-none w-6 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{a.category}</div>
              <h3 className="text-display text-[15px] font-semibold leading-snug mt-1.5 line-clamp-2 transition-colors group-hover:text-[#FFDAB9]">
                {a.title}
              </h3>
              <div className="mt-3 text-[11px] text-muted-foreground">
                {a.reads?.toLocaleString()} reads · {a.readingTime}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      <div className="absolute inset-0 ambient-orange pointer-events-none" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#FFDAB9]/40 animate-float"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              animationDelay: `${(i % 6) * 0.6}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground animate-rise">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFDAB9] animate-pulse-glow" />
          Supernova Journal · Written by the team
        </div>
        <h1 className="text-display mt-8 text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.98] animate-rise" style={{ animationDelay: "0.1s" }}>
          Ideas, Engineering
          <br />
          <span className="text-shimmer">& AI Marketing</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed animate-rise" style={{ animationDelay: "0.2s" }}>
          Explore how modern AI workflows, intelligent automation, and creative systems are changing the future of digital marketing.
        </p>

        {/* Floating cards decoration */}
        <div className="pointer-events-none absolute left-8 top-56 hidden xl:block animate-float">
          <div className="glass rounded-2xl p-4 w-52 rotate-[-6deg]">
            <div className="h-16 rounded-lg bg-gradient-to-br from-[#8B5A2B] to-[#5C3317]" />
            <div className="mt-3 h-2 w-3/4 rounded bg-white/10" />
            <div className="mt-2 h-2 w-1/2 rounded bg-white/10" />
          </div>
        </div>
        <div className="pointer-events-none absolute right-10 top-72 hidden xl:block animate-float-alt">
          <div className="glass rounded-2xl p-4 w-56 rotate-[5deg]">
            <div className="h-16 rounded-lg bg-gradient-to-br from-[#FFDAB9] to-[#8B5A2B]" />
            <div className="mt-3 h-2 w-2/3 rounded bg-white/10" />
            <div className="mt-2 h-2 w-1/2 rounded bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mt-32">
      <div className={`relative overflow-hidden rounded-3xl glass-strong p-10 md:p-16 transition-all duration-700 ${focused ? "shadow-[0_0_120px_-30px_rgba(255,218,185,0.5)] border-[#8B5A2B]/50" : ""}`}>
        <div className="absolute inset-0 ambient-orange opacity-60 pointer-events-none" />
        {/* Subtle drifting particles, revealed on focus */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${focused ? "opacity-100" : "opacity-30"}`}>
          {[...Array(14)].map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-[#FFDAB9]/60 animate-drift"
              style={{
                top: `${(i * 47) % 100}%`,
                left: `${(i * 31) % 100}%`,
                animationDelay: `${(i % 5) * 0.7}s`,
                animationDuration: `${5 + (i % 4)}s`,
              }}
            />
          ))}
        </div>
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#FFDAB9]/90">
              Newsletter
            </div>
            <h2 className="text-display mt-5 text-4xl md:text-5xl font-semibold leading-tight">
              Stay Ahead of AI Marketing
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Get engineering insights, product updates, and AI marketing strategies directly from the Supernova team.
            </p>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="flex-1 glass input-glow rounded-full px-5 py-3.5 text-sm placeholder:text-muted-foreground focus:outline-none transition-all"
            />
            <button
              type="submit"
              className="group relative overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium text-[#FFDAB9] border border-[#8B5A2B]/60 bg-gradient-to-b from-[#8B5A2B]/40 to-[#5C3317]/40 hover:from-[#8B5A2B]/70 hover:to-[#5C3317]/70 transition-all shadow-[0_0_32px_-8px_rgba(255,218,185,0.5)] hover:shadow-[0_0_56px_-8px_rgba(255,218,185,0.85)] hover:-translate-y-0.5"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                {submitted ? "Subscribed ✓" : "Subscribe"}
                {!submitted && <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>}
              </span>
              <span aria-hidden className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#FFDAB9]/20 to-transparent" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

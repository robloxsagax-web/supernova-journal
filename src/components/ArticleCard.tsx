import type { Article } from "@/data/articles";
import { Link } from "@tanstack/react-router";
import { useRef, type MouseEvent } from "react";

export function CoverArt({
  hue,
  label,
  image,
  className = "",
}: {
  hue: string;
  label: string;
  image?: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {image ? (
        <>
          <img
            src={image}
            alt={label}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06] will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#5C3317]/20 via-transparent to-[#8B5A2B]/10 mix-blend-overlay" />
        </>
      ) : (
        <>
          <div className={`absolute inset-0 bg-gradient-to-br ${hue}`} />
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/80 via-transparent to-transparent" />
        </>
      )}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FFDAB9] animate-pulse-glow" />
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#FFDAB9] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {label}
        </span>
      </div>
    </div>
  );
}

/* Spotlight following cursor for large / hero cards */
function useSpotlight() {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return { ref, onMouseMove: onMove };
}

export function ArticleCard({
  article,
  variant = "medium",
}: {
  article: Article;
  variant?: "hero" | "large" | "medium" | "small";
}) {
  const spotlight = useSpotlight();

  if (variant === "hero") {
    return (
      <Link
        ref={spotlight.ref}
        onMouseMove={spotlight.onMouseMove}
        to="/blog/$slug"
        params={{ slug: article.slug }}
        preload="intent"
        className="group relative block overflow-hidden rounded-3xl glass-strong spotlight reflect-sweep transition-all duration-500 hover:border-[#8B5A2B]/60 hover:shadow-[0_20px_80px_-30px_rgba(255,218,185,0.35)]"
      >
        <div className="grid md:grid-cols-[1.15fr_1fr] relative z-[2]">
          <CoverArt
            hue={article.cover.hue}
            label={article.cover.label}
            image={article.cover.image}
            className="aspect-[16/11] md:aspect-auto md:min-h-[520px]"
          />
          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-[#5C3317]/40 border border-[#8B5A2B]/40 text-[#FFDAB9]">
                  {article.category}
                </span>
                <span className="text-muted-foreground">Featured</span>
              </div>
              <h2 className="text-display mt-6 text-[clamp(2rem,3.6vw,3.4rem)] font-semibold leading-[1.02] transition-transform duration-500 group-hover:-translate-y-0.5">
                {article.title}
              </h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
                {article.subtitle}
              </p>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full grid place-items-center text-[11px] font-medium bg-gradient-to-br from-[#8B5A2B] to-[#5C3317] text-[#FFDAB9]">
                {article.author.initials}
              </div>
              <div className="text-sm">
                <div className="text-foreground font-medium">{article.author.name}</div>
                <div className="text-muted-foreground">
                  {article.date} · {article.readingTime}
                </div>
              </div>
              <span
                aria-hidden
                className="ml-auto grid place-items-center h-10 w-10 rounded-full border border-[#8B5A2B]/40 text-[#FFDAB9] transition-all duration-500 group-hover:translate-x-1 group-hover:bg-[#8B5A2B]/30 group-hover:border-[#FFDAB9]/50 group-hover:shadow-[0_0_24px_-4px_rgba(255,218,185,0.7)]"
              >
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  const heights: Record<string, string> = {
    large: "aspect-[16/11]",
    medium: "aspect-[4/3]",
    small: "aspect-[5/3]",
  };

  const useSpot = variant === "large";

  return (
    <Link
      ref={useSpot ? spotlight.ref : undefined}
      onMouseMove={useSpot ? spotlight.onMouseMove : undefined}
      to="/blog/$slug"
      params={{ slug: article.slug }}
      preload="intent"
      className={`group relative flex flex-col overflow-hidden rounded-2xl glass transition-all duration-500 hover:-translate-y-1.5 hover:border-[#8B5A2B]/40 hover:shadow-[0_20px_60px_-30px_rgba(255,218,185,0.35)] will-change-transform ${useSpot ? "spotlight" : ""}`}
    >
      <CoverArt
        hue={article.cover.hue}
        label={article.cover.label}
        image={article.cover.image}
        className={heights[variant]}
      />
      <div className="relative z-[2] flex-1 p-6 flex flex-col">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-[#FFDAB9]/90 uppercase tracking-[0.18em]">{article.category}</span>
        </div>
        <h3
          className={`text-display mt-3 font-semibold leading-[1.1] transition-transform duration-500 group-hover:-translate-y-0.5 ${variant === "large" ? "text-2xl md:text-3xl" : variant === "medium" ? "text-xl" : "text-lg"}`}
        >
          {article.title}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-6 pt-5 border-t border-border flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{article.author.name}</span>
          <span>·</span>
          <span>{article.readingTime}</span>
          <span className="ml-auto text-[#FFDAB9] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ArticleCard, CoverArt } from "@/components/ArticleCard";
import { Diagram } from "@/components/Diagram";
import { getArticle, relatedArticles, authorProfile, type Article, type ArticleBlock } from "@/data/articles";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found · Supernova Journal" }, { name: "robots", content: "noindex" }] };
    }
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title} · Supernova Journal` },
        { name: "description", content: a.subtitle },
        { property: "og:title", content: `${a.title} · Supernova Journal` },
        { property: "og:description", content: a.subtitle },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-center px-6">
      <div>
        <p className="text-display text-6xl">404</p>
        <p className="text-muted-foreground mt-2">This article doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex text-[#FFDAB9] hover:underline">← Back to journal</Link>
      </div>
    </div>
  ),
});

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };
  const author = authorProfile(article.author.name);
  const [progress, setProgress] = useState(0);
  const related = useMemo(() => relatedArticles(article.slug, article.category, 3), [article.slug, article.category]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toc = article.content
    .map((b: ArticleBlock, i: number) => (b.type === "h2" ? { id: `h-${i}`, text: b.text } : null))
    .filter((x): x is { id: string; text: string } => x !== null);

  return (
    <div className="relative min-h-screen">
      {/* Ultra-thin reading progress bar with orange glow */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
        <div
          className="h-full progress-glow transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <Nav />

      {/* Hero */}
      <header className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 ambient-orange opacity-70 pointer-events-none" />
        <div className="mx-auto max-w-[880px] px-6 relative animate-rise">
          <Link to="/" className="text-xs text-muted-foreground hover:text-[#FFDAB9] link-underline inline-block">← Back to Journal</Link>
          <div className="mt-6 flex items-center gap-3 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-[#5C3317]/40 border border-[#8B5A2B]/40 text-[#FFDAB9]">
              {article.category}
            </span>
            <span className="text-muted-foreground">{article.date}</span>
            <span className="text-muted-foreground/50">·</span>
            <span className="group inline-flex items-center gap-1.5 text-muted-foreground cursor-default transition-colors hover:text-[#FFDAB9]">
              <span className="inline-block h-1 w-1 rounded-full bg-[#FFDAB9]/70 transition-all duration-500 group-hover:w-4 group-hover:bg-[#FFDAB9]" />
              {article.readingTime}
            </span>
          </div>
          <h1 className="text-display mt-6 text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.02]">
            {article.title}
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-muted-foreground leading-snug">
            {article.subtitle}
          </p>
          <div className="mt-10 flex items-center gap-4">
            <AuthorAvatar author={author} size={44} />
            <div className="text-sm">
              <div className="text-foreground font-medium">{author.name}</div>
              <div className="text-muted-foreground">{author.role}</div>
            </div>
            <div className="ml-auto flex gap-2">
              {["𝕏", "in", "↗"].map((s) => (
                <button key={s} className="h-9 w-9 grid place-items-center rounded-full glass text-sm text-muted-foreground hover:text-[#FFDAB9] hover:border-[#8B5A2B]/50 hover:-translate-y-0.5 transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-[880px] px-6">
        <CoverArt hue={article.cover.hue} label={article.cover.label} image={article.cover.image} className="aspect-[16/9] rounded-3xl" />
        <figcaption className="mt-3 text-xs text-center text-muted-foreground italic">
          {article.cover.label} · illustrated by the Supernova design team
        </figcaption>
      </div>

      {/* Body + TOC */}
      <div className="relative mx-auto max-w-[1180px] px-6 mt-16 grid gap-12 lg:grid-cols-[1fr_240px]">
        <article className="prose-editorial max-w-[720px] mx-auto lg:mx-0 w-full">
          {article.content.map((block: ArticleBlock, i: number) => (
            <BlockRenderer key={i} block={block} id={block.type === "h2" ? `h-${i}` : undefined} />
          ))}

          {/* Author bio */}
          {author.bio && (
            <aside className="mt-20 glass-strong rounded-2xl p-6 md:p-8 flex gap-5 items-start">
              <AuthorAvatar author={author} size={64} />
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#FFDAB9]/80">Written by</div>
                <div className="text-display text-xl font-semibold mt-1">{author.name}</div>
                <div className="text-sm text-muted-foreground">{author.role} · Supernova</div>
                {author.expertise && (
                  <div className="mt-2 text-xs text-[#FFDAB9]/70">{author.expertise}</div>
                )}
                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{author.bio}</p>
              </div>
            </aside>
          )}
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4">On this page</div>
            <ul className="space-y-3">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="text-sm text-muted-foreground hover:text-[#FFDAB9] transition-colors leading-snug block link-underline">
                    {t.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Related — floating premium previews */}
      <section className="mx-auto max-w-[1280px] px-6 mt-32">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-[#FFDAB9]/80">Keep reading</div>
            <h2 className="text-display text-3xl md:text-4xl font-semibold mt-2">More from Supernova</h2>
          </div>
          <Link to="/" className="text-sm text-[#FFDAB9] hover:underline link-underline">All articles →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((a) => <ArticleCard key={a.slug} article={a} variant="small" />)}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function AuthorAvatar({ author, size = 44 }: { author: { initials: string; gradient: string; name: string }; size?: number }) {
  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 bg-gradient-to-br ${author.gradient} ring-1 ring-[#8B5A2B]/40`}
      style={{ height: size, width: size }}
      aria-label={author.name}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),transparent_55%)]" />
      <div className="absolute inset-0 grid place-items-center text-[#09090B] font-semibold" style={{ fontSize: size * 0.32 }}>
        {author.initials}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
    </div>
  );
}

function BlockRenderer({ block, id }: { block: ArticleBlock; id?: string }) {
  switch (block.type) {
    case "p":
      return <p className="text-[18px] leading-[1.85] text-foreground/85 my-7 tracking-[-0.005em]">{block.text}</p>;
    case "h2":
      return (
        <h2 id={id} className="text-display text-3xl md:text-4xl font-semibold mt-20 mb-5 scroll-mt-32">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="text-display text-xl md:text-2xl font-semibold mt-12 mb-3">{block.text}</h3>;
    case "quote":
      return (
        <blockquote className="my-12 relative pl-8 md:pl-12">
          <span aria-hidden className="absolute left-0 top-0 text-display text-6xl leading-none text-[#8B5A2B]/70 select-none">"</span>
          <p className="text-display text-2xl md:text-[28px] font-medium leading-[1.35] text-[#FFDAB9]">
            {block.text}
          </p>
          {block.cite && <cite className="mt-4 not-italic text-sm text-muted-foreground block">— {block.cite}</cite>}
        </blockquote>
      );
    case "code":
      return (
        <div className="my-10 glass-strong rounded-2xl overflow-hidden shadow-[0_20px_60px_-40px_rgba(255,218,185,0.4)]">
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-border text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#5C3317]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#8B5A2B]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFDAB9]/70" />
              <span className="ml-3 text-muted-foreground uppercase tracking-widest">{block.lang}</span>
            </div>
            <span className="text-[#FFDAB9]/60">GenBlaze</span>
          </div>
          <pre className="p-6 text-[13.5px] leading-[1.75] overflow-x-auto text-foreground/90 font-mono">
            <code>{block.code}</code>
          </pre>
        </div>
      );
    case "diagram":
      return <Diagram kind={block.kind} />;
    case "callout":
      return (
        <div className="my-10 relative overflow-hidden rounded-2xl glass p-6 border-l-2 border-[#FFDAB9]/50">
          <div className="absolute inset-0 ambient-orange opacity-30 pointer-events-none" />
          <div className="relative">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#FFDAB9]/90">
              {block.tone === "insight" ? "Insight" : "Note"}
            </div>
            <div className="text-display text-lg font-semibold mt-1.5">{block.title}</div>
            <p className="mt-2 text-[15px] leading-[1.7] text-foreground/85">{block.text}</p>
          </div>
        </div>
      );
    case "list":
      return (
        <ul className="my-7 space-y-3.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[18px] leading-[1.75] text-foreground/85">
              <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#FFDAB9] shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
  }
}

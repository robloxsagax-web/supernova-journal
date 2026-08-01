import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function makeStubRoute(title: string, subtitle: string) {
  return function StubPage() {
    return (
      <div className="relative min-h-screen">
        <Nav />
        <section className="relative pt-40 pb-32 overflow-hidden">
          <div className="absolute inset-0 ambient-orange pointer-events-none" />
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div className="relative mx-auto max-w-[880px] px-6 text-center animate-rise">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFDAB9] animate-pulse-glow" />
              Coming soon
            </div>
            <h1 className="text-display mt-8 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1]">
              {title}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
            <div className="mt-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[#FFDAB9] border border-[#8B5A2B]/60 bg-gradient-to-b from-[#8B5A2B]/40 to-[#5C3317]/40 hover:from-[#8B5A2B]/60 hover:to-[#5C3317]/60 transition-all shadow-[0_0_32px_-8px_rgba(255,218,185,0.5)]"
              >
                Read the journal →
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  };
}

// re-export for typing in stub route files
export { createFileRoute };

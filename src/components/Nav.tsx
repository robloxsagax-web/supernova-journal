import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SupernovaLogo } from "@/components/branding";
import { SUPERNOVA_AUTH_URL } from "@/lib/constants";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Product", to: "/product" },
  { label: "Pricing", to: "/pricing" },
  { label: "Changelog", to: "/changelog" },
  { label: "About", to: "/about" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong" : "border border-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5 group">
            <SupernovaLogo size={28} />
            <span className="text-display text-[19px] font-semibold tracking-tight">
              Supernova
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="px-3.5 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/[0.04]"
                activeProps={{ className: "text-[#FFDAB9]" }}
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SUPERNOVA_AUTH_URL}
              className="hidden sm:inline-flex px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </a>
            <a
              href={SUPERNOVA_AUTH_URL}
              className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#FFDAB9] rounded-xl border border-[#8B5A2B]/50 bg-gradient-to-b from-[#8B5A2B]/30 to-[#5C3317]/30 hover:from-[#8B5A2B]/50 hover:to-[#5C3317]/50 transition-all shadow-[0_0_24px_-8px_rgba(255,218,185,0.4)] hover:shadow-[0_0_40px_-6px_rgba(255,218,185,0.7)]"
            >
              Start Free
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

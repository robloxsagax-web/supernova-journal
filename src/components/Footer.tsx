import { Link } from "@tanstack/react-router";
import { SupernovaLogo } from "@/components/branding";

export function Footer() {
  const columns = [
    { title: "Product", items: [
      { label: "Overview", to: "/product" as const },
      { label: "Pricing", to: "/pricing" as const },
      { label: "Changelog", to: "/changelog" as const },
      { label: "Roadmap", to: "/product" as const },
    ]},
    { title: "Company", items: [
      { label: "About", to: "/about" as const },
      { label: "Blog", to: "/" as const },
      { label: "Careers", to: "/about" as const },
      { label: "Contact", to: "/about" as const },
    ]},
    { title: "Resources", items: [
      { label: "Docs", to: "/product" as const },
      { label: "GenBlaze", to: "/product" as const },
      { label: "Backblaze B2", to: "/product" as const },
      { label: "Status", to: "/changelog" as const },
    ]},
  ];

  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <SupernovaLogo size={28} />
              <span className="text-display text-[19px] font-semibold">Supernova</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              The AI marketing agent. Powered by GenBlaze orchestration. Storage by Backblaze B2.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.items.map((i) => (
                  <li key={i.label}>
                    <Link
                      to={i.to}
                      className="text-sm text-muted-foreground hover:text-[#FFDAB9] transition-colors link-underline inline-block"
                    >
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Supernova, Inc. All rights reserved.</p>
          <p>Built by people who believe marketing should move at the speed of ideas.</p>
        </div>
      </div>
    </footer>
  );
}

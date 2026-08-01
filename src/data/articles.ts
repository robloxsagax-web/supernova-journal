// Local images from /public folder
const LOCAL_SHOTS = [
  "/Screenshot 2026-07-20 2.00.33 AM.png",
  "/Screenshot 2026-07-20 2.00.46 AM.png",
  "/Screenshot 2026-07-20 2.00.59 AM.png",
  "/Screenshot 2026-07-20 2.01.09 AM.png",
  "/Screenshot 2026-07-20 2.01.18 AM.png",
  "/Screenshot 2026-07-20 2.01.40 AM.png",
  "/Screenshot 2026-07-20 2.01.49 AM.png",
  "/Screenshot 2026-07-20 2.02.00 AM.png",
  "/Screenshot 2026-07-20 2.02.32 AM.png",
  "/Screenshot 2026-07-20 2.02.40 AM.png",
  "/Screenshot 2026-07-20 2.02.51 AM.png",
  "/Screenshot 2026-07-20 2.03.00 AM.png",
  "/Screenshot 2026-07-20 2.03.07 AM.png",
  "/Screenshot 2026-07-20 2.03.18 AM.png",
  "/Screenshot 2026-07-20 2.03.30 AM.png",
  "/Screenshot 2026-07-20 2.03.40 AM.png",
];

// Shuffle array using Fisher-Yates algorithm for random assignment
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const SHOTS = shuffleArray(LOCAL_SHOTS);

export type Article = {
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  author: { name: string; role: string; initials: string };
  date: string;
  readingTime: string;
  cover: { hue: string; label: string; image?: string };
  featured?: boolean;
  size?: "hero" | "large" | "medium" | "small";
  excerpt: string;
  reads?: number;
  content: ArticleBlock[];
};

export type Category =
  | "AI Marketing"
  | "Engineering"
  | "Product Updates"
  | "Market Intelligence"
  | "Tutorials"
  | "Case Studies"
  | "GenBlaze"
  | "Backblaze B2"
  | "Announcements";

export const CATEGORIES: Category[] = [
  "AI Marketing",
  "Engineering",
  "Product Updates",
  "Market Intelligence",
  "Tutorials",
  "Case Studies",
  "GenBlaze",
  "Backblaze B2",
  "Announcements",
];

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "code"; lang: string; code: string }
  | { type: "diagram"; kind: "orchestration" | "pipeline" | "storage" }
  | { type: "callout"; tone?: "note" | "insight"; title: string; text: string }
  | { type: "list"; items: string[] };

/* ---- Authors ---- */

export type AuthorProfile = {
  name: string;
  role: string;
  initials: string;
  expertise: string;
  bio: string;
  /* deterministic gradient for the illustrated avatar */
  gradient: string;
};

export const AUTHORS: Record<string, AuthorProfile> = {
  "Ines Marchetti": {
    name: "Ines Marchetti",
    role: "Founding Engineer",
    initials: "IM",
    expertise: "Distributed systems · Model orchestration",
    bio: "Ines leads the systems team at Supernova. Previously infra at Stripe. She writes about how to make stochastic systems feel deterministic.",
    gradient: "from-[#FFDAB9] via-[#8B5A2B] to-[#5C3317]",
  },
  "Kai Nakamura": {
    name: "Kai Nakamura",
    role: "Head of Design",
    initials: "KN",
    expertise: "Interface design · Motion systems",
    bio: "Kai shapes the visual and motion language of Supernova. He believes the best interfaces are the ones you stop noticing.",
    gradient: "from-[#8B5A2B] via-[#5C3317] to-[#09090B]",
  },
  "Priya Rao": {
    name: "Priya Rao",
    role: "Product Lead",
    initials: "PR",
    expertise: "AI marketing strategy · Growth systems",
    bio: "Priya runs product at Supernova. She's spent a decade building the tools marketing teams reach for first.",
    gradient: "from-[#5C3317] via-[#8B5A2B] to-[#FFDAB9]",
  },
  "Diego Alvarez": {
    name: "Diego Alvarez",
    role: "Infrastructure",
    initials: "DA",
    expertise: "Object storage · Edge caching",
    bio: "Diego keeps every generated asset a millisecond away. Prior: storage engineering at Backblaze.",
    gradient: "from-[#8B5A2B] to-[#FFDAB9]",
  },
  "Nora Beckett": {
    name: "Nora Beckett",
    role: "Video Systems",
    initials: "NB",
    expertise: "Real-time media · Perception & latency",
    bio: "Nora builds the video pipeline behind Supernova. She thinks about latency as a design problem, not just an engineering one.",
    gradient: "from-[#5C3317] via-[#FFDAB9] to-[#8B5A2B]",
  },
  "The Supernova Team": {
    name: "The Supernova Team",
    role: "Announcements",
    initials: "SN",
    expertise: "The team behind Supernova",
    bio: "News, launches, and milestones — straight from the team building Supernova.",
    gradient: "from-[#FFDAB9] to-[#5C3317]",
  },
};

type DiagramKind = "orchestration" | "pipeline" | "storage";
const commonContent = (topic: string, kind: DiagramKind): ArticleBlock[] => [
  { type: "p", text: `In this piece, we walk through how Supernova approaches ${topic}—from the design principles that shape the product to the engineering decisions that make it feel instantaneous.` },
  { type: "h2", text: "The problem with today's marketing stacks" },
  { type: "p", text: "Marketing teams juggle dozens of tools. Copy lives in one system, creative in another, analytics in a third. AI was supposed to fix that. Instead, it added another tab. We built Supernova around a different idea: one agent, one surface, one campaign—end to end." },
  { type: "quote", text: "The best AI products don't add work. They remove it.", cite: "Supernova design principles" },
  { type: "h2", text: "How Supernova thinks about orchestration" },
  { type: "p", text: "Supernova is an AI marketing agent. Under the hood, it's powered by GenBlaze—our multi-model orchestration engine that routes each subtask to the right model at the right cost. Storage sits on Backblaze B2, giving us predictable performance for millions of generated assets." },
  { type: "diagram", kind },
  { type: "callout", tone: "insight", title: "Why this matters", text: "Every additional tool a marketer opens is a tax on momentum. Collapsing the surface is worth more than any individual feature." },
  { type: "h3", text: "What this unlocks" },
  { type: "list", items: [
    "Turn any product URL into a complete campaign in under two minutes",
    "Route reasoning, writing, and imagery to specialized models",
    "Store every asset with lifecycle policies tuned per campaign",
    "Ship variants across channels without leaving the surface",
  ]},
  { type: "h2", text: "Engineering the feel of instant" },
  { type: "p", text: "The interface is only half the story. Everything from streaming responses to prewarming media pipelines is designed to keep the user inside a single flow. When latency is unavoidable, we replace it with motion that communicates progress instead of hiding it." },
  { type: "code", lang: "ts", code: `// Streaming a campaign step through GenBlaze\nconst stream = await genblaze.run({\n  task: "hero_headline",\n  model: "auto",           // routed by cost + quality target\n  context: { product, tone },\n});\n\nfor await (const chunk of stream) {\n  ui.append(chunk);\n}` },
  { type: "h2", text: "What's next" },
  { type: "p", text: "We're just getting started. The team is shipping weekly—expect deeper integrations, richer creative tooling, and a growing library of playbooks distilled from tens of thousands of live campaigns." },
];

export const ARTICLES: Article[] = [
  {
    slug: "product-url-to-campaign",
    title: "How We Turn Any Product URL Into a Complete Marketing Campaign",
    subtitle: "Inside the architecture behind Supernova's AI orchestration engine.",
    category: "Engineering",
    author: { name: "Ines Marchetti", role: "Founding Engineer", initials: "IM" },
    date: "Nov 12, 2026",
    readingTime: "9 min read",
    cover: { hue: "from-[#8B5A2B] via-[#5C3317] to-[#09090B]", label: "Orchestration" },
    featured: true,
    size: "hero",
    reads: 24800,
    excerpt: "A deep look at the pipeline that transforms a single link into headlines, imagery, video, and channel-ready copy—orchestrated by GenBlaze, stored on Backblaze B2.",
    content: commonContent("URL-to-campaign orchestration", "pipeline"),
  },
  {
    slug: "designing-ai-marketing-agent",
    title: "Behind Supernova: Designing an AI Marketing Agent",
    subtitle: "The product principles behind an agent people actually want to use.",
    category: "Product Updates",
    author: { name: "Kai Nakamura", role: "Head of Design", initials: "KN" },
    date: "Nov 08, 2026",
    readingTime: "7 min read",
    cover: { hue: "from-[#FFDAB9] via-[#8B5A2B] to-[#09090B]", label: "Design" },
    size: "large",
    reads: 19200,
    excerpt: "Design principles, motion language, and the interface decisions that make Supernova feel more like a colleague than a tool.",
    content: commonContent("agent-first product design", "orchestration"),
  },
  {
    slug: "workflows-not-prompts",
    title: "Why AI Needs Better Workflows, Not Bigger Prompts",
    subtitle: "The prompt is the wrong unit of thought.",
    category: "AI Marketing",
    author: { name: "Priya Rao", role: "Product Lead", initials: "PR" },
    date: "Nov 04, 2026",
    readingTime: "6 min read",
    cover: { hue: "from-[#5C3317] via-[#09090B] to-[#8B5A2B]", label: "Essay" },
    size: "medium",
    reads: 17400,
    excerpt: "Prompt engineering hit a ceiling. Workflow engineering is where the next order-of-magnitude gains live.",
    content: commonContent("workflow-first AI", "orchestration"),
  },
  {
    slug: "inside-genblaze",
    title: "Inside GenBlaze: Multi-Model AI Orchestration",
    subtitle: "How we route every subtask to the right model, at the right cost.",
    category: "GenBlaze",
    author: { name: "Ines Marchetti", role: "Founding Engineer", initials: "IM" },
    date: "Oct 30, 2026",
    readingTime: "11 min read",
    cover: { hue: "from-[#8B5A2B] to-[#09090B]", label: "GenBlaze" },
    size: "large",
    reads: 22600,
    excerpt: "A technical tour of the orchestration engine that powers Supernova—router, budget planner, and fallback graph.",
    content: commonContent("GenBlaze multi-model routing", "orchestration"),
  },
  {
    slug: "backblaze-b2-powers-campaigns",
    title: "How Backblaze B2 Powers Every Campaign",
    subtitle: "Why we picked B2 for millions of generated assets.",
    category: "Backblaze B2",
    author: { name: "Diego Alvarez", role: "Infrastructure", initials: "DA" },
    date: "Oct 24, 2026",
    readingTime: "8 min read",
    cover: { hue: "from-[#FFDAB9] to-[#5C3317]", label: "Storage" },
    size: "medium",
    reads: 15100,
    excerpt: "Predictable pricing, S3-compatible tooling, and the lifecycle policies that keep our storage layer boring in the best way.",
    content: commonContent("Backblaze B2 storage architecture", "storage"),
  },
  {
    slug: "ai-video-pipeline",
    title: "Building an AI Video Pipeline That Feels Instant",
    subtitle: "Streaming, prewarming, and the perception of speed.",
    category: "Engineering",
    author: { name: "Nora Beckett", role: "Video Systems", initials: "NB" },
    date: "Oct 18, 2026",
    readingTime: "10 min read",
    cover: { hue: "from-[#5C3317] via-[#8B5A2B] to-[#FFDAB9]", label: "Video" },
    size: "medium",
    reads: 13800,
    excerpt: "How we cut perceived render time to near-zero by treating latency as a design problem, not just an engineering one.",
    content: commonContent("real-time AI video", "pipeline"),
  },
  {
    slug: "future-of-ai-advertising",
    title: "The Future of AI Advertising",
    subtitle: "What changes when creativity is no longer the bottleneck.",
    category: "Market Intelligence",
    author: { name: "Priya Rao", role: "Product Lead", initials: "PR" },
    date: "Oct 12, 2026",
    readingTime: "12 min read",
    cover: { hue: "from-[#09090B] via-[#5C3317] to-[#8B5A2B]", label: "Essay" },
    size: "small",
    reads: 11400,
    excerpt: "A field guide to the next decade of AI-native advertising—from agents that buy media to briefs that write themselves.",
    content: commonContent("AI-native advertising", "orchestration"),
  },
  {
    slug: "url-to-campaign-in-two-minutes",
    title: "From URL to Campaign in Under Two Minutes",
    subtitle: "A live walkthrough of the Supernova pipeline.",
    category: "Tutorials",
    author: { name: "Kai Nakamura", role: "Head of Design", initials: "KN" },
    date: "Oct 06, 2026",
    readingTime: "5 min read",
    cover: { hue: "from-[#8B5A2B] to-[#FFDAB9]", label: "Tutorial" },
    size: "small",
    reads: 9600,
    excerpt: "Paste a link. Get a full campaign. Here's what happens in the 90 seconds in between.",
    content: commonContent("live campaign generation", "pipeline"),
  },
  {
    slug: "engineering-a-production-platform",
    title: "Engineering a Production-Ready AI Platform",
    subtitle: "Reliability primitives for a world of stochastic systems.",
    category: "Engineering",
    author: { name: "Ines Marchetti", role: "Founding Engineer", initials: "IM" },
    date: "Sep 28, 2026",
    readingTime: "13 min read",
    cover: { hue: "from-[#5C3317] to-[#09090B]", label: "Platform" },
    size: "small",
    reads: 8200,
    excerpt: "Retries, budgets, evals, and the graph that keeps a fleet of models honest in production.",
    content: commonContent("production AI reliability", "orchestration"),
  },
  {
    slug: "interfaces-that-feel-like-2030",
    title: "Designing Interfaces That Feel Like 2030",
    subtitle: "Motion, surface, and the return of restraint.",
    category: "Product Updates",
    author: { name: "Kai Nakamura", role: "Head of Design", initials: "KN" },
    date: "Sep 20, 2026",
    readingTime: "6 min read",
    cover: { hue: "from-[#FFDAB9] via-[#8B5A2B] to-[#5C3317]", label: "Design" },
    size: "small",
    reads: 7100,
    excerpt: "The interface language we use across Supernova, and why less chrome makes AI feel more capable.",
    content: commonContent("2030 interface language", "orchestration"),
  },
  {
    slug: "lessons-10000-campaigns",
    title: "AI Marketing Lessons from 10,000 Campaigns",
    subtitle: "Patterns that emerged after a year of live production.",
    category: "Case Studies",
    author: { name: "Priya Rao", role: "Product Lead", initials: "PR" },
    date: "Sep 12, 2026",
    readingTime: "9 min read",
    cover: { hue: "from-[#8B5A2B] via-[#5C3317] to-[#FFDAB9]", label: "Case Study" },
    size: "small",
    reads: 12900,
    excerpt: "What we learned from ten thousand real campaigns—about hooks, imagery, and the shape of a great CTA.",
    content: commonContent("large-scale campaign patterns", "pipeline"),
  },
  {
    slug: "supernova-series-a",
    title: "Announcing Supernova",
    subtitle: "The AI marketing agent, now available to teams everywhere.",
    category: "Announcements",
    author: { name: "The Supernova Team", role: "", initials: "SN" },
    date: "Sep 01, 2026",
    readingTime: "3 min read",
    cover: { hue: "from-[#FFDAB9] to-[#09090B]", label: "News" },
    size: "small",
    reads: 31500,
    excerpt: "Today we're opening Supernova to every team that wants to move faster without giving up craft.",
    content: commonContent("the Supernova launch", "orchestration"),
  },
];

ARTICLES.forEach((a, i) => { a.cover.image = SHOTS[i % SHOTS.length]; });

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function relatedArticles(slug: string, category: Category, n = 3): Article[] {
  return ARTICLES.filter((a) => a.slug !== slug)
    .sort((a, b) => (a.category === category ? -1 : 1) - (b.category === category ? -1 : 1))
    .slice(0, n);
}

export function popularArticles(n = 4): Article[] {
  return [...ARTICLES]
    .sort((a, b) => (b.reads ?? 0) - (a.reads ?? 0))
    .slice(0, n);
}

export function authorProfile(name: string): AuthorProfile {
  return (
    AUTHORS[name] ?? {
      name,
      role: "",
      initials: name.slice(0, 2).toUpperCase(),
      expertise: "",
      bio: "",
      gradient: "from-[#8B5A2B] to-[#5C3317]",
    }
  );
}

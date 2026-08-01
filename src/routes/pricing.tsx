import { createFileRoute } from "@tanstack/react-router";
import { makeStubRoute } from "@/components/StubPage";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing · Supernova Journal" },
      { name: "description", content: "Simple, transparent pricing for teams that want to move faster with AI-powered marketing." },
    ],
  }),
  component: makeStubRoute(
    "Pricing, without the friction",
    "We're finalizing plans that scale from solo operators to global brands. Sign up for the newsletter and we'll tell you the moment it's live.",
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { makeStubRoute } from "@/components/StubPage";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Product · Supernova Journal" },
      { name: "description", content: "Supernova is the AI marketing agent. Turn any product URL into a complete campaign in under two minutes." },
    ],
  }),
  component: makeStubRoute(
    "The AI Marketing Agent",
    "The full Supernova product tour is landing soon. In the meantime, our journal is the best window into how we think and what we're shipping.",
  ),
});

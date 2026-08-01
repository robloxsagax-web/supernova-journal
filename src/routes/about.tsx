import { createFileRoute } from "@tanstack/react-router";
import { makeStubRoute } from "@/components/StubPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Supernova Journal" },
      { name: "description", content: "Supernova is a small team building the AI marketing agent, powered by GenBlaze orchestration and Backblaze B2 storage." },
    ],
  }),
  component: makeStubRoute(
    "We build the AI we wanted to use",
    "Supernova is a small, senior team of engineers, designers, and marketers. We're building the AI marketing agent we wished existed—crafted, considered, and fast.",
  ),
});

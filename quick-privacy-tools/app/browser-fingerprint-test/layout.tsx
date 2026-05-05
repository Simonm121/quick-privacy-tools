import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Browser Fingerprint Test",
  description:
    "See what your browser reveals about your device, settings, and environment with a simple fingerprint test.",
  path: "/browser-fingerprint-test",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

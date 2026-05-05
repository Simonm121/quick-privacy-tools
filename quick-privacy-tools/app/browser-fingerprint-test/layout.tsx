import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Browser Fingerprint Test",
  description:
    "Free online browser fingerprint test to see what your browser, device, and settings reveal to websites.",
  path: "/browser-fingerprint-test",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

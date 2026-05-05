import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "IP Location Checker",
  description:
    "Find your approximate IP location, internet provider, and connection details with a quick browser-based check.",
  path: "/ip-location-checker",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

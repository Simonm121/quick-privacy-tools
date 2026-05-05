import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "IP Location Checker",
  description:
    "Free online IP location checker to see your approximate country, region, city, and internet provider.",
  path: "/ip-location-checker",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

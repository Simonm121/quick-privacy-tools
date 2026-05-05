import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Username Generator",
  description:
    "Free online username generator for quick username ideas for accounts, games, and online profiles.",
  path: "/username-generator",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

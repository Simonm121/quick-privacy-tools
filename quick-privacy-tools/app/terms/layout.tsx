import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Terms",
  description:
    "Read the terms for using Quick Privacy Tools and the basic limits and responsibilities associated with the site.",
  path: "/terms",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

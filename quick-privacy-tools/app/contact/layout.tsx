import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact Quick Privacy Tools with questions, suggestions, or problems related to the site and its tools.",
  path: "/contact",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

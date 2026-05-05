import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "DNS Lookup",
  description:
    "Check A, MX, TXT, NS, and CNAME records to inspect how a domain is configured.",
  path: "/dns-lookup",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

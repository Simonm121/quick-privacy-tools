import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Whois Lookup",
  description:
    "Look up domain registration details, ownership information, and basic record data with a quick Whois search.",
  path: "/whois-lookup",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

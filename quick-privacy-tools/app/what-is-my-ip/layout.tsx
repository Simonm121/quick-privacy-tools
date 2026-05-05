import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "What Is My IP Address",
  description:
    "Free online IP checker to see your public IP address and understand what websites can detect about your connection.",
  path: "/what-is-my-ip",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

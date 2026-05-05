import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "What Is My IP Address",
  description:
    "Check your public IP address instantly and see what websites can detect about your internet connection.",
  path: "/what-is-my-ip",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

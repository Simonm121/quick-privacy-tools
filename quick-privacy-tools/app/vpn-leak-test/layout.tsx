import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "VPN Leak Test",
  description:
    "Free online VPN check to see the visible IP address, approximate location, and ISP your connection currently exposes.",
  path: "/vpn-leak-test",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

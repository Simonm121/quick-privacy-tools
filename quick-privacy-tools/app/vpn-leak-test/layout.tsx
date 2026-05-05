import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "VPN Leak Test",
  description:
    "Test for IP, DNS, and WebRTC leaks to see whether your VPN is hiding your real connection details.",
  path: "/vpn-leak-test",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

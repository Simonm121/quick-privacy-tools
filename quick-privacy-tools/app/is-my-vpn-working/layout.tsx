import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Is My VPN Working",
  description:
    "Check whether your VPN appears to be masking your real IP address and connection location.",
  path: "/is-my-vpn-working",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

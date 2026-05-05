import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "What Is My IP Address and Location",
  description:
    "See your public IP address and approximate location together in one quick privacy-focused check.",
  path: "/what-is-my-ip-address-and-location",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

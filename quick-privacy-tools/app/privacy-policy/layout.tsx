import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Read the Quick Privacy Tools privacy policy, including how the site handles browser-based tools, analytics, and data use.",
  path: "/privacy-policy",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

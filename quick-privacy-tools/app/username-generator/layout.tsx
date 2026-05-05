import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Username Generator",
  description:
    "Generate simple, clean username ideas quickly for social accounts, logins, and online profiles.",
  path: "/username-generator",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Email Breach Check Guide",
  description:
    "Validate an email address format and follow a privacy-safe next step for a real breach lookup.",
  path: "/email-breach-checker",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

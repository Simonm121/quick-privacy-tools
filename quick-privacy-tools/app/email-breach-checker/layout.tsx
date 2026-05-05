import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Email Breach Checker",
  description:
    "Check whether an email address is ready for a breach lookup and learn safe next steps if exposure is a concern.",
  path: "/email-breach-checker",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Password Generator",
  description:
    "Generate strong passwords instantly in your browser with a fast, simple, privacy-friendly password tool.",
  path: "/password-generator",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

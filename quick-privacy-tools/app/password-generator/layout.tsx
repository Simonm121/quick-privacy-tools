import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Password Generator",
  description:
    "Free online password generator that creates strong random passwords locally in your browser.",
  path: "/password-generator",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

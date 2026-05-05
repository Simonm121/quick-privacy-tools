import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Password Strength Checker",
  description:
    "Free online password strength checker to see whether a password looks weak or strong.",
  path: "/password-checker",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

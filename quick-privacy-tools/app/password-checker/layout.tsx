import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Password Strength Checker",
  description:
    "Check whether a password looks weak or strong and get a quick sense of its overall security.",
  path: "/password-checker",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

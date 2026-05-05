import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "What Is My IP Location",
  description:
    "Free online check to see the approximate location linked to your public IP address and what that location can reveal.",
  path: "/what-is-my-ip-location",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

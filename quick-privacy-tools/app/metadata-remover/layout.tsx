import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Metadata Remover",
  description:
    "Remove hidden image metadata before sharing files and reduce the amount of personal information attached to them.",
  path: "/metadata-remover",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

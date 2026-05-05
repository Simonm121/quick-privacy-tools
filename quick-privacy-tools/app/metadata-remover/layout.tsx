import type { ReactNode } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  title: "Metadata Remover",
  description:
    "Free online metadata remover to clean hidden image data before sharing photos and files.",
  path: "/metadata-remover",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}

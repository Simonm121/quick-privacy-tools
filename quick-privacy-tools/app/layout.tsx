import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
export const metadata: Metadata = {
  title: { default: "Quick Privacy Tools — Free Privacy, IP & Security Tools", template: "%s | Quick Privacy Tools" },
  description: "Free privacy tools that run instantly in your browser.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><Nav />{children}</body></html>;
}

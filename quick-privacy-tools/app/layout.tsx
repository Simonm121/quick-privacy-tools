import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "../components/Footer";
import CookieBanner from "@/components/CookieBanner";
import AnalyticsLoader from "@/components/AnalyticsLoader";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.quickprivacytools.com"),
  title: {
    default: "Quick Privacy Tools — Free Online Privacy & Security Tools",
    template: "%s | Quick Privacy Tools",
  },
  description:
    "Free online privacy and security tools including IP checker, VPN leak test, browser fingerprint test, password tools, DNS lookup and Whois lookup.",
  keywords: [
    "privacy tools",
    "what is my IP",
    "IP checker",
    "VPN leak test",
    "browser fingerprint test",
    "password generator",
    "password strength checker",
    "DNS lookup",
    "Whois lookup",
    "online security tools",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="Y6z-8ccv0vQdPuPiTiMw0HegVEbIU79tc7uLoJSqLLc"
        />
      </head>

      <body>
        <AnalyticsLoader />
        <Nav />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}

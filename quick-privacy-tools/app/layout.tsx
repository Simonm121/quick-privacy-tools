import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "../components/Footer";
import Script from "next/script";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B8QH1JC9JV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B8QH1JC9JV');
          `}
        </Script>
      </head>

      <body>
        <Nav />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "../components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Quick Privacy Tools — Free Privacy, IP & Security Tools",
    template: "%s | Quick Privacy Tools",
  },
  description: "Free privacy tools that run instantly in your browser.",
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
      </body>
    </html>
  );
}

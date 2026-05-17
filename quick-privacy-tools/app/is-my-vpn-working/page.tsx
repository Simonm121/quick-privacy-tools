import IsMyVpnWorkingClient from "@/components/IsMyVpnWorkingClient";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  absoluteTitle: "Is My VPN Working? | How To Check Your VPN Properly",
  description:
    "Learn how to check whether your VPN is hiding your real IP address and location, what results to expect, and what to do if your normal connection is still visible.",
  path: "/is-my-vpn-working",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the fastest way to check if my VPN is working?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Run the VPN Leak Test while your VPN is connected and compare the visible IP address, location, and ISP with what you expect from your VPN server.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my VPN location look different from the server I picked?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "IP location databases are approximate, so a VPN server may appear in a nearby city or region even when the VPN is working normally.",
      },
    },
    {
      "@type": "Question",
      name: "If my VPN changes my IP, is that enough?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is a good sign, but not the full picture. A stronger check can also include DNS and WebRTC testing, which Quick Privacy Tools does not yet run on this page.",
      },
    },
    {
      "@type": "Question",
      name: "What should I do if my real ISP still appears?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reconnect your VPN, switch servers, and test again. If your real ISP still appears, the VPN may not be routing your traffic the way you expect.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <IsMyVpnWorkingClient />
    </>
  );
}

import VpnLeakTestClient from "@/components/VpnLeakTestClient";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  absoluteTitle: "VPN Leak Test | Check Your Visible IP, ISP & Location",
  description:
    "Check the public IP address, approximate location, and ISP your VPN currently exposes. Use the result to compare your VPN server with the connection websites can see.",
  path: "/vpn-leak-test",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does this VPN leak test check?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This VPN leak test checks the public IP address, approximate location, and ISP or network owner that your browser currently exposes.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know if my VPN is working?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Turn on your VPN and refresh the test. If the visible IP address, location, and ISP match your VPN server rather than your normal connection, your basic IP masking is likely working.",
      },
    },
    {
      "@type": "Question",
      name: "Does this page test DNS leaks or WebRTC leaks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This version checks visible IP, approximate location, and ISP only. It does not currently run DNS leak or WebRTC leak checks.",
      },
    },
    {
      "@type": "Question",
      name: "What should I do if my real location or ISP appears?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Make sure your VPN is connected, try another VPN server, refresh the page, and compare the result with your normal IP address. If your real ISP still appears, your VPN may not be active or may not be routing traffic correctly.",
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
      <VpnLeakTestClient />
    </>
  );
}

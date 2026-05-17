import VpnLeakTestClient from "@/components/VpnLeakTestClient";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  absoluteTitle: "VPN Leak Test | Check Your Visible IP, ISP, Location & WebRTC",
  description:
    "Check the public IP address, approximate location, ISP, and WebRTC addresses your VPN currently exposes. Use the result to compare your VPN server with the connection websites can see.",
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
        text: "This VPN leak test checks the public IP address, approximate location, ISP or network owner, and WebRTC candidate addresses that your browser currently exposes.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know if my VPN is working?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Turn on your VPN and refresh the test. If the visible IP address, location, and WebRTC public address match your VPN server rather than your normal connection, your setup is in better shape.",
      },
    },
    {
      "@type": "Question",
      name: "What if WebRTC shows a different public IP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That is a stronger sign of a leak. Reconnect the VPN, switch servers or protocols, and check whether your browser has WebRTC protections enabled.",
      },
    },
    {
      "@type": "Question",
      name: "Does this page run a DNS leak test too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not yet. This page checks visible IP details and WebRTC exposure, but DNS leak testing is still a separate follow-up improvement.",
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

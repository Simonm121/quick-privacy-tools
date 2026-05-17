import VpnLeakTestClient from "@/components/VpnLeakTestClient";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  absoluteTitle: "VPN Leak Test | Check Your IP, DNS & WebRTC Leaks",
  description:
    "Check the public IP address, approximate location, ISP, DNS resolvers, and WebRTC addresses your VPN currently exposes. Use the result to compare your VPN server with the connection websites can see.",
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
        text: "This VPN leak test checks the public IP address, approximate location, ISP or network owner, DNS resolvers, and WebRTC candidate addresses that your browser currently exposes.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know if my VPN is working?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Turn on your VPN and refresh the test. If the visible IP address, DNS pattern, and WebRTC public address line up with your VPN server rather than your normal connection, your setup is in better shape.",
      },
    },
    {
      "@type": "Question",
      name: "What does a DNS warning mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A DNS warning usually means the DNS resolvers reported by the test do not cleanly match the same network as the visible connection. That can be a sign that DNS requests are bypassing the VPN or using an unexpected resolver.",
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

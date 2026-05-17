"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Info, ToolShell } from "@/components/ui";

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
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const hasResult = !loading && data?.ip;

  return (
    <ToolShell
      title="VPN Leak Test"
      icon="🛡️"
      intro="Check the IP address, approximate location, and ISP your VPN currently exposes."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-5 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-100">
        This page sends a request directly from your browser to ipapi.co so it
        can show the visible IP address, approximate location, and ISP your VPN
        currently exposes. Quick Privacy Tools does not store the result. This
        version does not yet run DNS leak or WebRTC leak tests.
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Info label="IP Address" value={loading ? "Loading..." : data?.ip || "Error"} />
        <Info label="Country" value={data?.country_name || "-"} />
        <Info label="Region" value={data?.region || "-"} />
        <Info label="City" value={data?.city || "-"} />
        <Info label="ISP" value={data?.org || "-"} />
      </div>

      <section className="mt-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-bold text-white">What your result means</h2>

        {loading ? (
          <p className="mt-3 text-slate-300">
            Loading your visible IP details. Once the result appears, compare it
            with the VPN server location you expected to use.
          </p>
        ) : hasResult ? (
          <div className="mt-3 space-y-3 text-slate-300">
            <p>
              Websites can currently see the IP address shown above. If your VPN
              is switched on, this should usually match your VPN server rather
              than your home, office, mobile network, or normal internet provider.
            </p>
            <p>
              If the country, city, or ISP looks like your real connection, turn
              your VPN off and on again, choose another VPN server, then refresh
              this page to compare the result.
            </p>
          </div>
        ) : (
          <p className="mt-3 text-slate-300">
            The visible IP check could not load. Check your connection, turn off
            any blocking extension that may stop the request, and refresh the
            page.
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
            href="/what-is-my-ip"
          >
            Compare with What Is My IP
          </Link>
          <Link
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            href="/is-my-vpn-working"
          >
            Read: Is my VPN working?
          </Link>
        </div>
      </section>

      <section className="mt-10 space-y-4 text-slate-300">
        <h2 className="text-2xl font-bold text-white">
          What is a VPN leak test?
        </h2>

        <p>
          A VPN leak test helps you check whether websites can still see your
          real IP address, location, or internet provider while your VPN is
          connected.
        </p>

        <h2 className="text-2xl font-bold text-white">
          How to use this VPN check
        </h2>

        <p>
          Turn on your VPN, refresh this page, and check whether the IP address,
          country, city, and ISP match your VPN server rather than your normal
          internet connection.
        </p>

        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-emerald-50">
          <h2 className="text-2xl font-bold text-white">
            Quick VPN fix checklist
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-emerald-50/90">
            <li>Connect to your VPN before running the test.</li>
            <li>Refresh this page after changing VPN servers.</li>
            <li>Check whether the ISP is your VPN provider, not your normal network.</li>
            <li>Compare this result with your normal IP address when the VPN is off.</li>
            <li>Use a reputable VPN with a kill switch if your real IP keeps appearing.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-white">
          What should I look for?
        </h2>

        <p>
          If your VPN is working correctly, the visible IP address and location
          should usually be different from your real home or work connection. If
          your real ISP or location appears, your VPN may not be active or may
          be leaking information.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Does this test check DNS or WebRTC leaks?
        </h2>

        <p>
          No. This version only checks your visible IP address, approximate
          location, and ISP. A future upgrade can add WebRTC and DNS leak checks
          for deeper VPN testing.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Does this page use an outside service?
        </h2>

        <p>
          Yes. This page uses ipapi.co so it can show the same kind of location
          details many websites can see.
        </p>

        <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-6 text-yellow-50">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200">
            Future affiliate placement
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Need a safer VPN setup?
          </h2>
          <p className="mt-3 text-yellow-50/90">
            If your real IP address, location, or ISP still appears while your
            VPN is connected, review your VPN settings before trusting it for
            privacy-sensitive browsing. This is the right place for a future VPN
            recommendation or comparison module, with a clear affiliate
            disclosure, once the page has been reviewed.
          </p>
          <p className="mt-3 text-sm text-yellow-100/80">
            Disclosure placeholder: future VPN recommendations may contain
            affiliate links. The test result above should stay independent and
            should not be changed by any affiliate partnership.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Related IP and privacy tools
          </h2>

          <p className="mt-3">
            Use these tools to compare your public IP address, check your
            approximate IP location, and review what your browser may reveal.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/what-is-my-ip"
            >
              What Is My IP Address
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/ip-location-checker"
            >
              IP Location Checker
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/browser-fingerprint-test"
            >
              Browser Fingerprint Test
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/dns-lookup"
            >
              DNS Lookup
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">VPN leak test FAQ</h2>

          <div className="mt-5 space-y-5">
            <div>
              <h3 className="font-semibold text-white">
                What does this VPN leak test check?
              </h3>
              <p className="mt-1">
                It checks the public IP address, approximate location, and ISP or
                network owner that your browser currently exposes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">
                How do I know if my VPN is working?
              </h3>
              <p className="mt-1">
                Turn on your VPN and refresh the test. If the visible IP address,
                location, and ISP match your VPN server rather than your normal
                connection, your basic IP masking is likely working.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Why does my VPN location look slightly wrong?
              </h3>
              <p className="mt-1">
                IP location databases are approximate. A VPN server may appear in
                a nearby city or region even when the VPN is working normally.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">
                What if my real ISP appears?
              </h3>
              <p className="mt-1">
                Your VPN may not be connected, the app may not be routing traffic
                correctly, or the request may be bypassing the VPN. Reconnect,
                choose another server, and test again.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ToolShell>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Info, ToolShell } from "@/components/ui";

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

  return (
    <ToolShell
      title="VPN Leak Test"
      icon="🛡️"
      intro="Check the IP address, approximate location, and ISP your VPN currently exposes."
    >
      <div className="mb-5 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-100">
        This version checks your visible IP address, approximate location, and
        ISP using ipapi.co. It does not yet run DNS leak or WebRTC leak tests.
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Info label="IP Address" value={loading ? "Loading..." : data?.ip || "Error"} />
        <Info label="Country" value={data?.country_name || "-"} />
        <Info label="Region" value={data?.region || "-"} />
        <Info label="City" value={data?.city || "-"} />
        <Info label="ISP" value={data?.org || "-"} />
      </div>

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
          Yes. This page requests IP and location data from ipapi.co so it can
          show you the same kind of location details many websites can see.
          Quick Privacy Tools does not store your result.
        </p>

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
      </section>
    </ToolShell>
  );
}

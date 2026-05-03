"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Info, ToolShell } from "@/components/ui";

export default function Page() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screen: `${window.screen.width} x ${window.screen.height}`,
    };

    setData(info);
  }, []);

  return (
    <ToolShell
      title="Browser Fingerprint Test"
      icon="🧪"
      intro="See common browser and device details that websites can use to identify or segment visitors."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Info label="User Agent" value={data?.userAgent || "Loading..."} />
        <Info label="Platform" value={data?.platform || "-"} />
        <Info label="Language" value={data?.language || "-"} />
        <Info label="Screen Size" value={data?.screen || "-"} />
      </div>

      <section className="mt-10 space-y-4 text-slate-300">
        <h2 className="text-2xl font-bold text-white">
          What is a browser fingerprint?
        </h2>

        <p>
          A browser fingerprint is a collection of details about your browser,
          device, screen, language, and settings. Websites can combine these
          signals to recognise or group visitors, even without traditional
          cookies.
        </p>

        <h2 className="text-2xl font-bold text-white">
          What information can websites see?
        </h2>

        <p>
          Websites may be able to see your browser type, operating system,
          screen size, language, device platform, timezone, installed features,
          and other browser signals. The more unique these details are, the
          easier it may be to identify your browser.
        </p>

        <h2 className="text-2xl font-bold text-white">
          How can I reduce browser fingerprinting?
        </h2>

        <p>
          You can reduce fingerprinting by using privacy-focused browsers,
          blocking unnecessary scripts, keeping browser settings common rather
          than highly customised, and using trusted privacy extensions carefully.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Related privacy tools
          </h2>

          <p className="mt-3">
            Use these tools to compare your browser fingerprint with your public
            IP address, location, and VPN connection details.
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
              href="/vpn-leak-test"
            >
              VPN Leak Test
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/metadata-remover"
            >
              Metadata Remover
            </Link>
          </div>
        </div>
      </section>
    </ToolShell>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Info, ToolShell } from "@/components/ui";

export default function Page() {
  const [ip, setIp] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setIp(data.ip);
        setLoading(false);
      })
      .catch(() => {
        setIp("Unable to fetch IP");
        setLoading(false);
      });
  }, []);

  return (
    <ToolShell
      title="What Is My IP Address"
      icon="🌐"
      intro="Check your public IP address instantly and see what websites can detect when you connect online."
    >
      <div className="mb-5 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-100">
        This page sends a request directly from your browser to ipify.org so it
        can show the public IP address websites see. Quick Privacy Tools does
        not store the result.
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Info label="Your IP Address" value={ip} />
        <Info label="Status" value={loading ? "Loading..." : "Live"} />
      </div>

      <section className="mt-10 space-y-4 text-slate-300">
        <h2 className="text-2xl font-bold text-white">
          What is my IP address?
        </h2>

        <p>
          Your IP address is the public address websites see when your device
          connects to the internet. It can reveal basic information such as your
          network, internet provider, and approximate location.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Why check your IP address?
        </h2>

        <p>
          Checking your IP address is useful when testing a VPN, troubleshooting
          a connection, checking your public network identity, or confirming
          whether your real IP address is hidden.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Is my IP address stored?
        </h2>

        <p>
          Quick Privacy Tools does not store your IP address. This page simply
          displays your current public IP address.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Related privacy tools
          </h2>

          <p className="mt-3">
            After checking your IP address, you can use these tools to learn
            more about your connection and online privacy.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
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

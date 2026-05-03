"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Info, ToolShell } from "@/components/ui";

export default function Page() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState("");

  async function lookupDomain() {
    const cleanDomain = domain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0];

    if (!cleanDomain.includes(".")) {
      setStatus("Please enter a valid domain, for example: example.com");
      setData(null);
      return;
    }

    setStatus("Checking domain...");
    setData(null);

    try {
      const response = await fetch(`https://rdap.org/domain/${cleanDomain}`);
      const result = await response.json();

      if (!response.ok) {
        setStatus("No registration data found for this domain.");
        return;
      }

      setData(result);
      setStatus("Lookup complete.");
    } catch {
      setStatus("Unable to complete lookup. Please try again.");
      setData(null);
    }
  }

  const registrar =
    data?.entities
      ?.find((entity: any) => entity.roles?.includes("registrar"))
      ?.vcardArray?.[1]?.find((item: any) => item[0] === "fn")?.[3] || "-";

  const created =
    data?.events?.find((event: any) => event.eventAction === "registration")
      ?.eventDate || "-";

  const updated =
    data?.events?.find((event: any) => event.eventAction === "last changed")
      ?.eventDate || "-";

  const expires =
    data?.events?.find((event: any) => event.eventAction === "expiration")
      ?.eventDate || "-";

  return (
    <ToolShell
      title="Whois Lookup"
      icon="🔍"
      intro="Check public domain registration information using RDAP."
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-blue-400"
        />

        <Button onClick={lookupDomain}>Lookup Domain</Button>
      </div>

      {status && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-slate-200">
          {status}
        </div>
      )}

      {data && (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <Info label="Domain" value={data.ldhName || data.handle || "-"} />
          <Info label="Registrar" value={registrar} />
          <Info label="Created" value={created} />
          <Info label="Updated" value={updated} />
          <Info label="Expires" value={expires} />
          <Info label="RDAP Source" value="rdap.org" />
        </div>
      )}

      <section className="mt-10 space-y-4 text-slate-300">
        <h2 className="text-2xl font-bold text-white">
          Free Whois Lookup Tool
        </h2>

        <p>
          Use this Whois lookup tool to check public domain registration details
          for a website. Enter a domain name such as example.com to look up
          available RDAP registration information.
        </p>

        <h2 className="text-2xl font-bold text-white">
          What does a Whois lookup show?
        </h2>

        <p>
          A Whois or RDAP lookup can show information such as the domain name,
          registrar, registration date, last updated date, and expiry date. The
          exact details depend on the domain registry and privacy settings.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Why check domain registration details?
        </h2>

        <p>
          Checking domain registration information can help you understand when a
          domain was created, which registrar manages it, and whether the domain
          appears active or close to expiry.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Why is some Whois information hidden?
        </h2>

        <p>
          Many domain owners use privacy protection, and some registries limit
          the personal information shown publicly. This means a Whois lookup may
          show registrar and registration dates without showing personal contact
          details.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Related domain and privacy tools
          </h2>

          <p className="mt-3">
            Use these tools to check DNS records, review your public IP address,
            and understand what websites may see when you connect online.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/dns-lookup"
            >
              DNS Lookup
            </Link>

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
          </div>
        </div>
      </section>
    </ToolShell>
  );
}

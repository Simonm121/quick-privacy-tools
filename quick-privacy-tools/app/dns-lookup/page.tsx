"use client";

import { useState } from "react";
import { Button, Info, ToolShell } from "@/components/ui";

type DnsRecord = { name?: string; data?: string };

export default function Page() {
  const [domain, setDomain] = useState("example.com");
  const [type, setType] = useState("A");
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [loading, setLoading] = useState(false);

  async function lookup() {
    setLoading(true);

    try {
      const response = await fetch(
        `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${encodeURIComponent(type)}`
      );

      const data = await response.json();

      setRecords(
        data.Answer?.length
          ? data.Answer
          : [{ name: domain, data: "No records found." }]
      );
    } catch {
      setRecords([{ name: domain, data: "Lookup failed." }]);
    }

    setLoading(false);
  }

  return (
    <ToolShell
      title="DNS Lookup"
      icon="📡"
      intro="Check DNS records such as A, MX, TXT, NS and CNAME for any domain."
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-blue-400"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white"
        >
          {["A", "AAAA", "MX", "TXT", "NS", "CNAME"].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <Button onClick={lookup} disabled={loading}>
          {loading ? "Looking..." : "Lookup"}
        </Button>
      </div>

      <div className="mt-5 grid gap-3">
        {records.map((record, i) => (
          <Info
            key={i}
            label={record.name || domain}
            value={record.data || JSON.stringify(record)}
          />
        ))}
      </div>

      <section className="mt-10 space-y-4 text-slate-300">
        <h2 className="text-2xl font-bold text-white">
          What is a DNS lookup?
        </h2>

        <p>
          A DNS lookup shows the records associated with a domain name. These
          records tell the internet how to route traffic, handle email, and
          verify domain ownership.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Common DNS record types
        </h2>

        <p>
          A records map a domain to an IP address, MX records handle email
          delivery, TXT records store verification data, and NS records define
          name servers.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Why use a DNS lookup tool?
        </h2>

        <p>
          DNS lookups are useful for troubleshooting website issues, verifying
          domain settings, and checking whether DNS changes have propagated
          correctly.
        </p>
      </section>
    </ToolShell>
  );
}

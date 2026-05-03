"use client";

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
    data?.entities?.find((entity: any) =>
      entity.roles?.includes("registrar")
    )?.vcardArray?.[1]?.find((item: any) => item[0] === "fn")?.[3] || "-";

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
    </ToolShell>
  );
}

"use client";

import { useState } from "react";
import { Info, ToolShell } from "@/components/ui";

export default function Page() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    if (!domain) return;

    setLoading(true);

    try {
      const res = await fetch(`https://api.api-ninjas.com/v1/whois?domain=${domain}`, {
        headers: {
          "X-Api-Key": "YOUR_API_KEY_HERE",
        },
      });

      const result = await res.json();
      setData(result);
    } catch {
      setData(null);
    }

    setLoading(false);
  };

  return (
    <ToolShell
      title="Whois Lookup"
      icon="🔍"
      intro="Enter a domain to check basic registration details."
    >
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="px-3 py-2 rounded bg-slate-800 text-white w-full"
        />
        <button
          onClick={lookup}
          className="bg-blue-600 px-4 py-2 rounded text-white"
        >
          Search
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Info label="Domain" value={data?.domain_name || "-"} />
        <Info label="Registrar" value={data?.registrar || "-"} />
        <Info label="Creation Date" value={data?.creation_date || "-"} />
        <Info label="Expiry Date" value={data?.expiration_date || "-"} />
      </div>

      {loading && <p className="mt-4 text-sm text-slate-400">Loading...</p>}
    </ToolShell>
  );
}

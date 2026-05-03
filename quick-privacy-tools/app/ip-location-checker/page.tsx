"use client";

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
      title="IP Location Checker"
      icon="📍"
      intro="Find your IP location, country, region and internet provider instantly."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Info label="IP Address" value={loading ? "Loading..." : data?.ip || "Error"} />
        <Info label="Country" value={data?.country_name || "-"} />
        <Info label="Region" value={data?.region || "-"} />
        <Info label="City" value={data?.city || "-"} />
        <Info label="ISP" value={data?.org || "-"} />
      </div>

      <section className="mt-10 space-y-4 text-slate-300">
        <h2 className="text-2xl font-bold text-white">What is an IP location?</h2>
        <p>
          Your IP location is an approximate geographic location linked to your internet connection.
          It usually shows your country, region, and city based on your internet provider.
        </p>

        <h2 className="text-2xl font-bold text-white">How accurate is IP location?</h2>
        <p>
          IP location is not exact. It can often identify your country and region correctly,
          but city-level accuracy may vary depending on your ISP and network setup.
        </p>

        <h2 className="text-2xl font-bold text-white">Why check your IP location?</h2>
        <p>
          Checking your IP location helps verify VPN connections, troubleshoot network issues,
          and understand what location websites detect when you browse online.
        </p>
      </section>
    </ToolShell>
  );
}

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
      title="VPN Leak Test"
      icon="🛡️"
      intro="Check whether your visible IP address and location match your expected VPN location."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Info label="IP Address" value={loading ? "Loading..." : data?.ip || "Error"} />
        <Info label="Country" value={data?.country_name || "-"} />
        <Info label="Region" value={data?.region || "-"} />
        <Info label="City" value={data?.city || "-"} />
        <Info label="ISP" value={data?.org || "-"} />
      </div>

      <section className="mt-10 space-y-4 text-slate-300">
        <h2 className="text-2xl font-bold text-white">What is a VPN leak test?</h2>
        <p>
          A VPN leak test helps you check whether websites can still see your real IP address,
          location, or internet provider while your VPN is connected.
        </p>

        <h2 className="text-2xl font-bold text-white">How to use this VPN leak test</h2>
        <p>
          Turn on your VPN, refresh this page, and check whether the IP address, country,
          city, and ISP match your VPN server rather than your normal internet connection.
        </p>

        <h2 className="text-2xl font-bold text-white">What should I look for?</h2>
        <p>
          If your VPN is working correctly, the visible IP address and location should usually
          be different from your real home or work connection. If your real ISP or location appears,
          your VPN may not be active or may be leaking information.
        </p>
      </section>
    </ToolShell>
  );
}

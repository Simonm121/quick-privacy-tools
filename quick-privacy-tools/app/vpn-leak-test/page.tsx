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
      intro="Check if your IP and location match your expected VPN location."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Info label="IP Address" value={loading ? "Loading..." : data?.ip || "Error"} />
        <Info label="Country" value={data?.country_name || "-"} />
        <Info label="Region" value={data?.region || "-"} />
        <Info label="City" value={data?.city || "-"} />
        <Info label="ISP" value={data?.org || "-"} />
      </div>
    </ToolShell>
  );
}

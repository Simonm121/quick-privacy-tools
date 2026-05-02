"use client";
import { useEffect, useState } from "react";
import { Info, ToolShell } from "@/components/ui";

export default function Page() {
  const [rows, setRows] = useState<Array<[string, string]>>([]);

  useEffect(() => {
    setRows([
      ["Status", "Basic version ready"],
      ["Tool", "IP Location Checker"],
      ["Upgrade", "Connect a production API or advanced browser test later"],
    ]);
  }, []);

  return (
    <ToolShell title="IP Location Checker" icon="📍" intro="Check approximate IP location, country, region and network details.">
      <div className="grid gap-3 md:grid-cols-2">
        {rows.map(([label, value]) => <Info key={label} label={label} value={value} />)}
      </div>
    </ToolShell>
  );
}

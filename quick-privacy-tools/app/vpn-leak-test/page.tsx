"use client";
import { useEffect, useState } from "react";
import { Info, ToolShell } from "@/components/ui";

export default function Page() {
  const [rows, setRows] = useState<Array<[string, string]>>([]);

  useEffect(() => {
    setRows([
      ["Status", "Basic version ready"],
      ["Tool", "VPN Leak Test"],
      ["Upgrade", "Connect a production API or advanced browser test later"],
    ]);
  }, []);

  return (
    <ToolShell title="VPN Leak Test" icon="🛡️" intro="Check whether your visible IP matches what you expect when using a VPN.">
      <div className="grid gap-3 md:grid-cols-2">
        {rows.map(([label, value]) => <Info key={label} label={label} value={value} />)}
      </div>
    </ToolShell>
  );
}

"use client";
import { useEffect, useState } from "react";
import { Info, ToolShell } from "@/components/ui";

export default function Page() {
  const [rows, setRows] = useState<Array<[string, string]>>([]);

  useEffect(() => {
    setRows([
      ["Status", "Basic version ready"],
      ["Tool", "Browser Fingerprint Test"],
      ["Upgrade", "Connect a production API or advanced browser test later"],
    ]);
  }, []);

  return (
    <ToolShell title="Browser Fingerprint Test" icon="🧪" intro="See common browser and device signals that websites can use to identify or segment visitors.">
      <div className="grid gap-3 md:grid-cols-2">
        {rows.map(([label, value]) => <Info key={label} label={label} value={value} />)}
      </div>
    </ToolShell>
  );
}

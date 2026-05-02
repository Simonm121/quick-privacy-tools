"use client";
import { useEffect, useState } from "react";
import { Info, ToolShell } from "@/components/ui";

export default function Page() {
  const [rows, setRows] = useState<Array<[string, string]>>([]);

  useEffect(() => {
    setRows([
      ["Status", "Basic version ready"],
      ["Tool", "What Is My IP Address"],
      ["Upgrade", "Connect a production API or advanced browser test later"],
    ]);
  }, []);

  return (
    <ToolShell title="What Is My IP Address" icon="🌐" intro="See your public IP address and browser details instantly.">
      <div className="grid gap-3 md:grid-cols-2">
        {rows.map(([label, value]) => <Info key={label} label={label} value={value} />)}
      </div>
    </ToolShell>
  );
}

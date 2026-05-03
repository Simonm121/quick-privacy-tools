"use client";

import { useEffect, useState } from "react";
import { Info, ToolShell } from "@/components/ui";

export default function Page() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screen: `${window.screen.width} x ${window.screen.height}`,
    };

    setData(info);
  }, []);

  return (
    <ToolShell
      title="Browser Fingerprint Test"
      icon="🧪"
      intro="See what your browser reveals about you."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Info label="User Agent" value={data?.userAgent || "Loading..."} />
        <Info label="Platform" value={data?.platform || "-"} />
        <Info label="Language" value={data?.language || "-"} />
        <Info label="Screen Size" value={data?.screen || "-"} />
      </div>
    </ToolShell>
  );
}

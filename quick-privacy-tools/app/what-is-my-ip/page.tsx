"use client";

import { useEffect, useState } from "react";
import { Info, ToolShell } from "@/components/ui";

export default function Page() {
  const [ip, setIp] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setIp(data.ip);
        setLoading(false);
      })
      .catch(() => {
        setIp("Unable to fetch IP");
        setLoading(false);
      });
  }, []);

  return (
    <ToolShell
      title="What Is My IP Address"
      icon="🌐"
      intro="See your public IP address instantly."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Info label="Your IP Address" value={ip} />
        <Info label="Status" value={loading ? "Loading..." : "Live"} />
      </div>
    </ToolShell>
  );
}

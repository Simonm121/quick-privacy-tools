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
      intro="See common browser and device details that websites can use to identify or segment visitors."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Info label="User Agent" value={data?.userAgent || "Loading..."} />
        <Info label="Platform" value={data?.platform || "-"} />
        <Info label="Language" value={data?.language || "-"} />
        <Info label="Screen Size" value={data?.screen || "-"} />
      </div>

      <section className="mt-10 space-y-4 text-slate-300">
        <h2 className="text-2xl font-bold text-white">
          What is a browser fingerprint?
        </h2>

        <p>
          A browser fingerprint is a collection of details about your browser,
          device, screen, language, and settings. Websites can combine these
          signals to recognise or group visitors, even without traditional
          cookies.
        </p>

        <h2 className="text-2xl font-bold text-white">
          What information can websites see?
        </h2>

        <p>
          Websites may be able to see your browser type, operating system,
          screen size, language, device platform, timezone, installed features,
          and other browser signals. The more unique these details are, the
          easier it may be to identify your browser.
        </p>

        <h2 className="text-2xl font-bold text-white">
          How can I reduce browser fingerprinting?
        </h2>

        <p>
          You can reduce fingerprinting by using privacy-focused browsers,
          blocking unnecessary scripts, keeping browser settings common rather
          than highly customised, and using trusted privacy extensions carefully.
        </p>
      </section>
    </ToolShell>
  );
}

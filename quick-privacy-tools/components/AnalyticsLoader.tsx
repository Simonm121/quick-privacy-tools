"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie-consent";
const ANALYTICS_ID = "G-B8QH1JC9JV";

type ConsentChoice = "accepted" | "rejected" | null;

function readConsent(): ConsentChoice {
  if (typeof window === "undefined") {
    return null;
  }

  const choice = window.localStorage.getItem(CONSENT_KEY);

  return choice === "accepted" || choice === "rejected" ? choice : null;
}

export default function AnalyticsLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setEnabled(readConsent() === "accepted");
    };

    syncConsent();
    window.addEventListener("cookie-consent-updated", syncConsent);
    window.addEventListener("storage", syncConsent);

    return () => {
      window.removeEventListener("cookie-consent-updated", syncConsent);
      window.removeEventListener("storage", syncConsent);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ANALYTICS_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

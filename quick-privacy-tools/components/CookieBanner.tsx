"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie-consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem(CONSENT_KEY);
    if (!choice) {
      setShow(true);
    }
  }, []);

  const saveChoice = (choice: "accepted" | "rejected") => {
    localStorage.setItem(CONSENT_KEY, choice);
    window.dispatchEvent(new Event("cookie-consent-updated"));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full px-4 pb-4">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-300">
            We only use basic analytics if you accept. See our{" "}
            <Link href="/privacy-policy" className="text-blue-300 underline hover:text-blue-200">
              privacy policy
            </Link>{" "}
            for details.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => saveChoice("rejected")}
              className="rounded-md border border-white/20 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              Reject
            </button>

            <button
              onClick={() => saveChoice("accepted")}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

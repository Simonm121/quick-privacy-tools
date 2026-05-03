"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem("cookie-consent");
    if (!choice) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 px-4 pb-4">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-lg backdrop-blur">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <p className="text-sm text-slate-300">
            We use basic analytics to understand how people use this site and improve it.
          </p>

          <div className="flex gap-3">
            <button
              onClick={reject}
              className="rounded-md border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10 transition"
            >
              Reject
            </button>

            <button
              onClick={accept}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
            >
              Accept
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
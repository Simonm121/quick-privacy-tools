"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Info, ToolShell } from "@/components/ui";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type LookupResult = {
  ip?: string;
  country_name?: string;
  region?: string;
  city?: string;
  org?: string;
};

function trackEvent(eventName: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export default function VpnLeakTestClient() {
  const [data, setData] = useState<LookupResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [resultState, setResultState] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((result: LookupResult) => {
        if (cancelled) {
          return;
        }

        const nextState = result?.ip ? "success" : "error";

        setData(result);
        setLoading(false);
        setResultState(nextState);
        trackEvent("vpn_leak_test_result", {
          result_state: nextState,
          checks_available: "ip_location_isp_only",
        });
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setLoading(false);
        setResultState("error");
        trackEvent("vpn_leak_test_result", {
          result_state: "error",
          checks_available: "ip_location_isp_only",
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function trackLinkClick(linkName: string, linkSection: string, linkTarget: string) {
    trackEvent("vpn_leak_test_click", {
      link_name: linkName,
      link_section: linkSection,
      link_target: linkTarget,
    });
  }

  const hasResult = !loading && !!data?.ip;

  return (
    <ToolShell
      title="VPN Leak Test"
      icon="🛡️"
      intro="Check the IP address, approximate location, and ISP your VPN currently exposes."
    >
      <div className="mb-5 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-100">
        This page sends a request directly from your browser to ipapi.co so it
        can show the visible IP address, approximate location, and ISP your VPN
        currently exposes. Quick Privacy Tools does not store the result. This
        version does not yet run DNS leak or WebRTC leak tests.
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Info label="IP Address" value={loading ? "Loading..." : data?.ip || "Error"} />
        <Info label="Country" value={data?.country_name || "-"} />
        <Info label="Region" value={data?.region || "-"} />
        <Info label="City" value={data?.city || "-"} />
        <Info label="ISP" value={data?.org || "-"} />
      </div>

      <section className="mt-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
              loading
                ? "bg-white/10 text-slate-300"
                : hasResult
                  ? "bg-emerald-500/15 text-emerald-200"
                  : "bg-rose-500/15 text-rose-200"
            }`}
          >
            {loading ? "Checking" : hasResult ? "Result ready" : "Check failed"}
          </span>
          <span className="text-sm text-slate-400">
            Current checks: IP address, approximate location, ISP
          </span>
        </div>

        <h2 className="mt-4 text-2xl font-bold text-white">What your result means</h2>

        {loading ? (
          <p className="mt-3 text-slate-300">
            Loading your visible IP details. Once the result appears, compare it
            with the VPN server location you expected to use.
          </p>
        ) : hasResult ? (
          <div className="mt-3 space-y-3 text-slate-300">
            <p>
              Websites can currently see the IP address shown above. If your VPN
              is switched on, this should usually match your VPN server rather
              than your home, office, mobile network, or normal internet provider.
            </p>
            <p>
              This page cannot label the result as a full pass or fail because it
              does not know which VPN server you intended to use. Treat it as a
              comparison check: if the country, city, or ISP looks like your real
              connection, review your VPN setup and test again.
            </p>
          </div>
        ) : (
          <p className="mt-3 text-slate-300">
            The visible IP check could not load. Check your connection, turn off
            any blocking extension that may stop the request, and refresh the
            page.
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              trackEvent("vpn_leak_test_refresh", { source: "result_block" });
              window.location.reload();
            }}
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Refresh VPN Test
          </button>
          <Link
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            href="/what-is-my-ip"
            onClick={() =>
              trackLinkClick("compare_with_what_is_my_ip", "result_block", "/what-is-my-ip")
            }
          >
            Compare with What Is My IP
          </Link>
          <Link
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            href="/is-my-vpn-working"
            onClick={() =>
              trackLinkClick("read_is_my_vpn_working", "result_block", "/is-my-vpn-working")
            }
          >
            Read: Is my VPN working?
          </Link>
        </div>
      </section>

      <section className="mt-10 space-y-6 text-slate-300">
        <div>
          <h2 className="text-2xl font-bold text-white">What this VPN leak test checks</h2>
          <p className="mt-3">
            This version checks the public IP address, approximate location, and
            ISP or network owner that websites can see from your browser right now.
            That makes it useful for quickly checking whether your VPN is masking
            your normal connection at a basic level.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">What this version does not check yet</h2>
          <p className="mt-3">
            It does not currently run DNS leak or WebRTC leak checks. That means
            it can tell you what visible IP and network details are exposed, but
            it cannot confirm every possible way a browser or device might reveal
            extra information.
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-emerald-50">
          <h2 className="text-2xl font-bold text-white">Quick fix checklist</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-emerald-50/90">
            <li>Connect to your VPN before running the test.</li>
            <li>Refresh the page after changing VPN servers or protocols.</li>
            <li>Check whether the ISP looks like your VPN provider rather than your normal network.</li>
            <li>Turn the VPN off and compare the result with your normal IP address.</li>
            <li>If the result still looks wrong, reconnect and try another server.</li>
            <li>Only after that, consider switching to a VPN with stronger leak protection.</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">
            Best next step if the result looks wrong
          </div>
          <h2 className="mt-3 text-2xl font-bold text-white">Recommendation slot prepared for an approved VPN partner</h2>
          <p className="mt-3">
            If your real IP address, location, or ISP still appears while your VPN
            is connected, a stronger VPN setup may be the fastest fix. This module
            is intentionally structured as a future recommendation area, but no live
            affiliate link has been added yet.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-200">
            <span className="rounded-full bg-white/10 px-3 py-2">Leak protection</span>
            <span className="rounded-full bg-white/10 px-3 py-2">Ease of use</span>
            <span className="rounded-full bg-white/10 px-3 py-2">Privacy tool bundle</span>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <h3 className="text-lg font-bold text-white">Primary VPN recommendation placeholder</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Reserved for the main leak-protection recommendation once Simon approves a real partner link.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <h3 className="text-lg font-bold text-white">Fallback comparison placeholder</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Reserved for a secondary option after enough click data exists to justify a comparison module.
              </p>
            </div>
          </div>
          <p id="affiliate-disclosure" className="mt-4 text-sm text-slate-400">
            Disclosure placeholder: future VPN recommendations on this page may include affiliate links. The result shown by the tool should remain independent of any commercial relationship.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">How to use this VPN check</h2>
          <p className="mt-3">
            Turn on your VPN, refresh this page, and check whether the IP address,
            country, city, and ISP match your VPN server rather than your normal
            internet connection.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">What should you look for?</h2>
          <p className="mt-3">
            If your VPN is working correctly, the visible IP address and location
            should usually be different from your real home or work connection. If
            your real ISP or location appears, your VPN may not be active or may
            be leaking information.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">Does this page use an outside service?</h2>
          <p className="mt-3">
            Yes. This page uses ipapi.co so it can show the same kind of location
            details many websites can see.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">Related IP and privacy tools</h2>
          <p className="mt-3">
            Use these tools to compare your public IP address, check your
            approximate IP location, and review what else your browser or files may reveal.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/what-is-my-ip"
              onClick={() => trackLinkClick("what_is_my_ip", "related_tools", "/what-is-my-ip")}
            >
              What Is My IP Address
            </Link>
            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/ip-location-checker"
              onClick={() => trackLinkClick("ip_location_checker", "related_tools", "/ip-location-checker")}
            >
              IP Location Checker
            </Link>
            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/browser-fingerprint-test"
              onClick={() => trackLinkClick("browser_fingerprint_test", "related_tools", "/browser-fingerprint-test")}
            >
              Browser Fingerprint Test
            </Link>
            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/dns-lookup"
              onClick={() => trackLinkClick("dns_lookup", "related_tools", "/dns-lookup")}
            >
              DNS Lookup
            </Link>
            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/metadata-remover"
              onClick={() => trackLinkClick("metadata_remover", "related_tools", "/metadata-remover")}
            >
              Metadata Remover
            </Link>
            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/email-breach-checker"
              onClick={() => trackLinkClick("email_breach_check_guide", "related_tools", "/email-breach-checker")}
            >
              Email Breach Check Guide
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">Avoid fake VPN offers and risky downloads</h2>
          <p className="mt-3">
            If you land on a suspicious VPN download page, browser extension page,
            or offer that feels off, double-check it before installing anything.
            ScamCheckTool can help you review suspicious sites and claims.
          </p>
          <a
            href="https://www.scamchecktool.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackLinkClick("scamchecktool", "vpn_scams_section", "https://www.scamchecktool.com")
            }
            className="mt-5 inline-block rounded-2xl bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
          >
            Check a suspicious VPN page on ScamCheckTool
          </a>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">VPN leak test FAQ</h2>
          <div className="mt-5 space-y-5">
            <div>
              <h3 className="font-semibold text-white">What does this VPN leak test check?</h3>
              <p className="mt-1">
                It checks the public IP address, approximate location, and ISP or
                network owner that your browser currently exposes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">How do I know if my VPN is working?</h3>
              <p className="mt-1">
                Turn on your VPN and refresh the test. If the visible IP address,
                location, and ISP match your VPN server rather than your normal
                connection, your basic IP masking is likely working.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Why does my VPN location look slightly wrong?</h3>
              <p className="mt-1">
                IP location databases are approximate. A VPN server may appear in
                a nearby city or region even when the VPN is working normally.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">What if my real ISP appears?</h3>
              <p className="mt-1">
                Your VPN may not be connected, the app may not be routing traffic
                correctly, or the request may be bypassing the VPN. Reconnect,
                choose another server, and test again.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ToolShell>
  );
}

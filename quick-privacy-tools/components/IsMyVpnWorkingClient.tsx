"use client";

import Link from "next/link";
import { ToolShell } from "@/components/ui";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent(eventName: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

export default function IsMyVpnWorkingClient() {
  function trackLinkClick(linkName: string, linkSection: string, linkTarget: string) {
    trackEvent("is_my_vpn_working_click", {
      link_name: linkName,
      link_section: linkSection,
      link_target: linkTarget,
    });
  }

  return (
    <ToolShell
      title="Is My VPN Working?"
      icon="🛡️"
      intro="Check if your VPN is hiding your real IP address and location correctly."
    >
      <section className="space-y-6 text-slate-300">
        <div>
          <h2 className="text-2xl font-bold text-white">
            How do I know if my VPN is working?
          </h2>
          <p className="mt-3">
            A VPN is working if the IP address, location, and internet provider
            visible to websites are different from your normal connection. When
            connected, websites should usually see the VPN server instead of your
            real home, office, or mobile network.
          </p>
        </div>

        <div className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-6 text-blue-50">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">
            Fastest check
          </div>
          <h2 className="mt-3 text-2xl font-bold text-white">
            Run the VPN test first
          </h2>
          <p className="mt-3 text-blue-50/90">
            The quickest way to check your VPN is to compare what websites can
            see while the VPN is connected. Start with the live VPN Leak Test,
            then come back here if you want help interpreting the result.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/vpn-leak-test"
              onClick={() =>
                trackLinkClick("run_vpn_leak_test", "hero_cta", "/vpn-leak-test")
              }
              className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Run VPN Leak Test
            </Link>
            <Link
              href="/what-is-my-ip"
              onClick={() =>
                trackLinkClick("check_normal_ip", "hero_cta", "/what-is-my-ip")
              }
              className="rounded-2xl bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              Check Normal IP Address
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            What result should I expect?
          </h2>
          <p className="mt-3">
            If your VPN is working, the visible IP address and approximate
            location should usually match your VPN server rather than your real
            internet connection. The visible ISP or network owner may also look
            different from your normal provider.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Quick interpretation guide
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
              <h3 className="text-lg font-bold text-white">Looks good</h3>
              <p className="mt-2 text-sm leading-6 text-emerald-50/90">
                The IP, location, and ISP all look different from your normal
                connection and are consistent with the VPN server you expected.
              </p>
            </div>
            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
              <h3 className="text-lg font-bold text-white">Needs checking</h3>
              <p className="mt-2 text-sm leading-6 text-yellow-50/90">
                The location looks close but not exact, or the ISP looks unusual.
                This may still be normal, but it is worth comparing with your VPN
                server choice and testing again.
              </p>
            </div>
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-5">
              <h3 className="text-lg font-bold text-white">Likely wrong</h3>
              <p className="mt-2 text-sm leading-6 text-rose-50/90">
                The result still shows your real location or usual ISP. Reconnect
                your VPN, switch servers, and test again before trusting the
                connection.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Signs your VPN may not be working
          </h2>
          <p className="mt-3">
            Your VPN may not be working properly if your real IP address,
            location, or ISP is still visible. This can happen if the VPN
            disconnects, the app is misconfigured, or your traffic is not fully
            routed through the VPN.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            What is a VPN leak?
          </h2>
          <p className="mt-3">
            A VPN leak happens when your real IP address or network details are
            exposed even while your VPN is active. Common leak types include IP
            leaks, DNS leaks, and WebRTC leaks. Right now, the Quick Privacy
            Tools VPN test checks visible IP, location, and ISP only.
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-emerald-50">
          <h2 className="text-2xl font-bold text-white">
            Quick fix checklist
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-emerald-50/90">
            <li>Reconnect the VPN and run the test again.</li>
            <li>Switch to another VPN server or protocol.</li>
            <li>Compare the result against your normal IP address with the VPN off.</li>
            <li>Check whether the VPN app shows an active connection.</li>
            <li>If the result still looks wrong, consider a more reliable VPN setup.</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">
            Future recommendation area
          </div>
          <h2 className="mt-3 text-2xl font-bold text-white">
            Need a more reliable VPN?
          </h2>
          <p className="mt-3">
            If repeated tests still show your real connection, this is the right
            place for a future trusted VPN recommendation. No live affiliate link
            is included yet, but the page is now structured for that next step.
          </p>
          <p className="mt-3 text-sm text-slate-400">
            Disclosure placeholder: future VPN recommendations on this page may
            include affiliate links. Any recommendation should stay clearly
            separated from the guide content and the test result itself.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Related tools and guides
          </h2>
          <p className="mt-3">
            Use these pages to compare your visible IP, check what else your
            browser reveals, and understand how IP location works.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/vpn-leak-test"
              onClick={() => trackLinkClick("vpn_leak_test", "related_tools", "/vpn-leak-test")}
            >
              VPN Leak Test
            </Link>
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
              href="/what-is-my-ip-location"
              onClick={() => trackLinkClick("what_is_my_ip_location", "related_tools", "/what-is-my-ip-location")}
            >
              What Is My IP Location?
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
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Avoid suspicious VPN offers
          </h2>
          <p className="mt-3">
            If a VPN offer page, download page, or browser extension looks
            suspicious, check it before trusting it. ScamCheckTool is a sensible
            next step when something feels off.
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
          <h2 className="text-2xl font-bold text-white">
            Is My VPN Working? FAQ
          </h2>
          <div className="mt-5 space-y-5">
            <div>
              <h3 className="font-semibold text-white">
                What is the fastest way to check if my VPN is working?
              </h3>
              <p className="mt-1">
                Run the VPN Leak Test while your VPN is connected and compare the
                visible IP address, location, and ISP with what you expect from
                your VPN server.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Why does my VPN location look different from the server I picked?
              </h3>
              <p className="mt-1">
                IP location databases are approximate, so a VPN server may appear
                in a nearby city or region even when the VPN is working normally.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                If my VPN changes my IP, is that enough?
              </h3>
              <p className="mt-1">
                It is a good sign, but not the full picture. A stronger check can
                also include DNS and WebRTC testing, which Quick Privacy Tools
                does not yet run on this page.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                What should I do if my real ISP still appears?
              </h3>
              <p className="mt-1">
                Reconnect your VPN, switch servers, and test again. If your real
                ISP still appears, the VPN may not be routing your traffic the
                way you expect.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ToolShell>
  );
}

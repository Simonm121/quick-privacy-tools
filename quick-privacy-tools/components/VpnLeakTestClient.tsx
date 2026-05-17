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

type WebRtcAddressType = "public" | "private" | "loopback" | "masked" | "unknown";
type WebRtcStatus = "checking" | "pass" | "warning" | "fail" | "unavailable";
type WebRtcSource = "ice-candidate" | "local-description";

type WebRtcCandidate = {
  address: string;
  addressType: WebRtcAddressType;
  source: WebRtcSource;
  candidateType?: string;
  protocol?: string;
};

type WebRtcCheckResult = {
  status: WebRtcStatus;
  summary: string;
  details: string;
  supported: boolean;
  addresses: WebRtcCandidate[];
  publicAddresses: string[];
  privateAddresses: string[];
  maskedAddresses: string[];
  mismatchedPublicAddresses: string[];
  error?: string;
};

function trackEvent(eventName: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, params);
}

function normalizeAddress(rawAddress?: string) {
  if (!rawAddress) {
    return "";
  }

  return rawAddress.trim().replace(/^\[|\]$/g, "").split("%")[0].toLowerCase();
}

function isValidIpv4(address: string) {
  const parts = address.split(".");

  if (parts.length !== 4) {
    return false;
  }

  return parts.every((part) => {
    if (!/^\d{1,3}$/.test(part)) {
      return false;
    }

    const value = Number(part);
    return value >= 0 && value <= 255;
  });
}

function isLikelyIpv6(address: string) {
  return address.includes(":") && /^[0-9a-f:]+$/i.test(address);
}

function classifyAddress(rawAddress: string): WebRtcAddressType {
  const address = normalizeAddress(rawAddress);

  if (!address) {
    return "unknown";
  }

  if (address.endsWith(".local")) {
    return "masked";
  }

  if (isValidIpv4(address)) {
    const [first, second] = address.split(".").map(Number);

    if (first === 127) {
      return "loopback";
    }

    if (
      first === 10 ||
      (first === 172 && second >= 16 && second <= 31) ||
      (first === 192 && second === 168) ||
      (first === 169 && second === 254) ||
      (first === 100 && second >= 64 && second <= 127)
    ) {
      return "private";
    }

    return "public";
  }

  if (isLikelyIpv6(address)) {
    if (address === "::1") {
      return "loopback";
    }

    if (
      address.startsWith("fe8") ||
      address.startsWith("fe9") ||
      address.startsWith("fea") ||
      address.startsWith("feb")
    ) {
      return "private";
    }

    if (address.startsWith("fc") || address.startsWith("fd")) {
      return "private";
    }

    return "public";
  }

  return "unknown";
}

function parseCandidate(rawCandidate: string, source: WebRtcSource): WebRtcCandidate | null {
  const candidateLine = rawCandidate.trim().replace(/^a=/, "");
  const parts = candidateLine.split(/\s+/);

  if (!parts[0]?.startsWith("candidate:") || parts.length < 5) {
    return null;
  }

  const address = normalizeAddress(parts[4]);

  if (!address || address === "0.0.0.0") {
    return null;
  }

  const typeIndex = parts.indexOf("typ");

  return {
    address,
    addressType: classifyAddress(address),
    source,
    candidateType: typeIndex >= 0 ? parts[typeIndex + 1] : undefined,
    protocol: parts[2],
  };
}

function uniqueValues(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function buildWebRtcResult(
  visibleIp: string | undefined,
  addresses: WebRtcCandidate[],
  supported: boolean,
  error?: string
): WebRtcCheckResult {
  if (!supported) {
    return {
      status: "unavailable",
      summary: "WebRTC check unavailable",
      details:
        error ||
        "Your browser blocked or does not support the WebRTC checks needed to compare candidate addresses.",
      supported: false,
      addresses: [],
      publicAddresses: [],
      privateAddresses: [],
      maskedAddresses: [],
      mismatchedPublicAddresses: [],
      error,
    };
  }

  const publicAddresses = uniqueValues(
    addresses.filter((item) => item.addressType === "public").map((item) => item.address)
  );
  const privateAddresses = uniqueValues(
    addresses
      .filter((item) => item.addressType === "private" || item.addressType === "loopback")
      .map((item) => item.address)
  );
  const maskedAddresses = uniqueValues(
    addresses.filter((item) => item.addressType === "masked").map((item) => item.address)
  );
  const normalizedVisibleIp = normalizeAddress(visibleIp);
  const mismatchedPublicAddresses = publicAddresses.filter(
    (address) => normalizedVisibleIp && address !== normalizedVisibleIp
  );

  if (mismatchedPublicAddresses.length > 0) {
    return {
      status: "fail",
      summary: "WebRTC may expose a different public IP",
      details: `A WebRTC check found a public address that does not match the visible website IP: ${mismatchedPublicAddresses.join(", ")}.`,
      supported: true,
      addresses,
      publicAddresses,
      privateAddresses,
      maskedAddresses,
      mismatchedPublicAddresses,
    };
  }

  if (privateAddresses.length > 0) {
    return {
      status: "warning",
      summary: "WebRTC exposed local network details",
      details: `No different public IP was found, but WebRTC did reveal local network addresses such as ${privateAddresses.join(", ")}.`,
      supported: true,
      addresses,
      publicAddresses,
      privateAddresses,
      maskedAddresses,
      mismatchedPublicAddresses: [],
    };
  }

  if (publicAddresses.length > 0) {
    return {
      status: "pass",
      summary: "No obvious WebRTC leak found",
      details: normalizedVisibleIp
        ? "WebRTC only exposed the same public IP address that websites already see."
        : "WebRTC exposed a public IP address, but the main IP lookup was unavailable for comparison.",
      supported: true,
      addresses,
      publicAddresses,
      privateAddresses,
      maskedAddresses,
      mismatchedPublicAddresses: [],
    };
  }

  if (maskedAddresses.length > 0) {
    return {
      status: "pass",
      summary: "Browser masked local WebRTC addresses",
      details: "Your browser returned masked local candidates rather than readable IP addresses.",
      supported: true,
      addresses,
      publicAddresses,
      privateAddresses,
      maskedAddresses,
      mismatchedPublicAddresses: [],
    };
  }

  return {
    status: "pass",
    summary: "No extra WebRTC addresses exposed",
    details: "The WebRTC check did not expose any readable extra addresses in this browser session.",
    supported: true,
    addresses,
    publicAddresses,
    privateAddresses,
    maskedAddresses,
    mismatchedPublicAddresses: [],
  };
}

async function detectWebRtcCandidates() {
  const RTCPeerConnectionConstructor =
    window.RTCPeerConnection ||
    (window as Window & {
      webkitRTCPeerConnection?: typeof RTCPeerConnection;
      mozRTCPeerConnection?: typeof RTCPeerConnection;
    }).webkitRTCPeerConnection ||
    (window as Window & {
      webkitRTCPeerConnection?: typeof RTCPeerConnection;
      mozRTCPeerConnection?: typeof RTCPeerConnection;
    }).mozRTCPeerConnection;

  if (!RTCPeerConnectionConstructor) {
    return {
      supported: false,
      addresses: [] as WebRtcCandidate[],
      error: "WebRTC is not available in this browser.",
    };
  }

  return new Promise<{ supported: boolean; addresses: WebRtcCandidate[]; error?: string }>((resolve) => {
    const seen = new Set<string>();
    const addresses: WebRtcCandidate[] = [];
    const peerConnection = new RTCPeerConnectionConstructor({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun.cloudflare.com:3478" },
      ],
    });

    let settled = false;

    const addCandidate = (rawCandidate: string, source: WebRtcSource) => {
      const parsed = parseCandidate(rawCandidate, source);

      if (!parsed) {
        return;
      }

      const key = `${parsed.address}|${parsed.addressType}|${parsed.candidateType || ""}|${parsed.source}`;

      if (seen.has(key)) {
        return;
      }

      seen.add(key);
      addresses.push(parsed);
    };

    const finalize = (error?: string) => {
      if (settled) {
        return;
      }

      settled = true;

      if (peerConnection.localDescription?.sdp) {
        peerConnection.localDescription.sdp
          .split(/\r?\n/)
          .filter((line) => line.includes("candidate:"))
          .forEach((line) => addCandidate(line, "local-description"));
      }

      peerConnection.close();
      resolve({ supported: !error, addresses, error });
    };

    const timeoutId = window.setTimeout(() => finalize(), 4500);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate?.candidate) {
        addCandidate(event.candidate.candidate, "ice-candidate");
      }

      if (!event.candidate) {
        window.clearTimeout(timeoutId);
        finalize();
      }
    };

    peerConnection.onicegatheringstatechange = () => {
      if (peerConnection.iceGatheringState === "complete") {
        window.clearTimeout(timeoutId);
        finalize();
      }
    };

    peerConnection.createDataChannel("vpn-leak-test");

    peerConnection
      .createOffer()
      .then((offer) => peerConnection.setLocalDescription(offer))
      .catch(() => {
        window.clearTimeout(timeoutId);
        finalize("The browser could not create a WebRTC test session.");
      });
  });
}

async function fetchIpLookup() {
  const response = await fetch("https://ipapi.co/json/");

  if (!response.ok) {
    throw new Error("Unable to fetch visible IP details.");
  }

  return (await response.json()) as LookupResult;
}

export default function VpnLeakTestClient() {
  const [data, setData] = useState<LookupResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [resultState, setResultState] = useState<
    "loading" | "pass" | "warning" | "fail" | "partial" | "error"
  >("loading");
  const [webRtcResult, setWebRtcResult] = useState<WebRtcCheckResult>({
    status: "checking",
    summary: "Checking WebRTC addresses",
    details: "Collecting WebRTC candidate addresses to look for public or local network exposure.",
    supported: true,
    addresses: [],
    publicAddresses: [],
    privateAddresses: [],
    maskedAddresses: [],
    mismatchedPublicAddresses: [],
  });

  useEffect(() => {
    let cancelled = false;

    Promise.allSettled([fetchIpLookup(), detectWebRtcCandidates()])
      .then(([ipResult, rtcResult]) => {
        if (cancelled) {
          return;
        }

        const nextIpData = ipResult.status === "fulfilled" ? ipResult.value : null;
        const nextWebRtc =
          rtcResult.status === "fulfilled"
            ? buildWebRtcResult(
                nextIpData?.ip,
                rtcResult.value.addresses,
                rtcResult.value.supported,
                rtcResult.value.error
              )
            : buildWebRtcResult(
                nextIpData?.ip,
                [],
                false,
                "The WebRTC leak check could not be completed."
              );

        let nextResultState: "pass" | "warning" | "fail" | "partial" | "error";

        if (!nextIpData?.ip && nextWebRtc.status === "unavailable") {
          nextResultState = "error";
        } else if (nextWebRtc.status === "fail") {
          nextResultState = "fail";
        } else if (nextWebRtc.status === "warning") {
          nextResultState = "warning";
        } else if (!nextIpData?.ip || nextWebRtc.status === "unavailable") {
          nextResultState = "partial";
        } else {
          nextResultState = "pass";
        }

        setData(nextIpData);
        setWebRtcResult(nextWebRtc);
        setLoading(false);
        setResultState(nextResultState);

        trackEvent("vpn_leak_test_result", {
          result_state: nextResultState,
          ip_lookup_state: nextIpData?.ip ? "success" : "error",
          webrtc_state: nextWebRtc.status,
          webrtc_public_ip_count: nextWebRtc.publicAddresses.length,
          webrtc_private_ip_count: nextWebRtc.privateAddresses.length,
          checks_available: "ip_location_isp_webrtc",
        });
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setLoading(false);
        setResultState("error");
        setWebRtcResult(
          buildWebRtcResult(undefined, [], false, "The WebRTC leak check could not be completed.")
        );

        trackEvent("vpn_leak_test_result", {
          result_state: "error",
          ip_lookup_state: "error",
          webrtc_state: "unavailable",
          checks_available: "ip_location_isp_webrtc",
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

  const webRtcAddressList = uniqueValues(webRtcResult.addresses.map((item) => item.address));

  return (
    <ToolShell
      title="VPN Leak Test"
      icon="🛡️"
      intro="Check the IP address, approximate location, ISP, and WebRTC addresses your VPN currently exposes."
    >
      <div className="mb-5 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-100">
        This page sends a request directly from your browser to ipapi.co and also
        runs a browser-side WebRTC candidate check. It shows the visible IP
        address, approximate location, ISP, and any WebRTC addresses your browser
        exposes. Quick Privacy Tools does not store the result. DNS leak testing
        is not included on this page yet.
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Info label="IP Address" value={loading ? "Loading..." : data?.ip || "Error"} />
        <Info label="Country" value={data?.country_name || "-"} />
        <Info label="Region" value={data?.region || "-"} />
        <Info label="City" value={data?.city || "-"} />
        <Info label="ISP" value={data?.org || "-"} />
        <Info label="WebRTC Status" value={loading ? "Checking..." : webRtcResult.summary} />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            WebRTC public addresses
          </div>
          <p className="mt-2 text-sm text-slate-200">
            {loading
              ? "Checking..."
              : webRtcResult.publicAddresses.length > 0
                ? webRtcResult.publicAddresses.join(", ")
                : "None exposed"}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            WebRTC local or masked addresses
          </div>
          <p className="mt-2 text-sm text-slate-200">
            {loading
              ? "Checking..."
              : webRtcAddressList.length > 0
                ? webRtcAddressList.filter((address) => !webRtcResult.publicAddresses.includes(address)).join(", ") ||
                  "None exposed"
                : "None exposed"}
          </p>
        </div>
      </div>

      <section className="mt-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
              loading
                ? "bg-white/10 text-slate-300"
                : resultState === "fail"
                  ? "bg-rose-500/15 text-rose-200"
                  : resultState === "warning"
                    ? "bg-amber-500/15 text-amber-200"
                    : resultState === "partial"
                      ? "bg-blue-500/15 text-blue-200"
                      : resultState === "pass"
                        ? "bg-emerald-500/15 text-emerald-200"
                        : "bg-rose-500/15 text-rose-200"
            }`}
          >
            {loading
              ? "Checking"
              : resultState === "fail"
                ? "Leak found"
                : resultState === "warning"
                  ? "Warning"
                  : resultState === "partial"
                    ? "Partial result"
                    : resultState === "pass"
                      ? "No obvious leak found"
                      : "Check failed"}
          </span>
          <span className="text-sm text-slate-400">
            Current checks: IP address, approximate location, ISP, WebRTC candidates
          </span>
        </div>

        <h2 className="mt-4 text-2xl font-bold text-white">What your result means</h2>

        {loading ? (
          <p className="mt-3 text-slate-300">
            Loading your visible IP details and collecting WebRTC candidate
            addresses. Once the result appears, compare it with the VPN server
            location you expected to use.
          </p>
        ) : resultState === "fail" ? (
          <div className="mt-3 space-y-3 text-slate-300">
            <p>
              Websites can currently see the IP address shown above, and the
              WebRTC check found a different public IP address as well. That is a
              stronger sign that your browser may expose information outside the
              VPN tunnel.
            </p>
            <p>{webRtcResult.details}</p>
          </div>
        ) : resultState === "warning" ? (
          <div className="mt-3 space-y-3 text-slate-300">
            <p>
              The test did not find a different public WebRTC IP, but it did find
              local network details. That is less severe than a public IP leak,
              but it can still reveal information about your local setup.
            </p>
            <p>{webRtcResult.details}</p>
          </div>
        ) : resultState === "pass" ? (
          <div className="mt-3 space-y-3 text-slate-300">
            <p>
              Websites can currently see the IP address shown above. If your VPN
              is switched on, this should usually match your VPN server rather
              than your home, office, mobile network, or normal internet provider.
            </p>
            <p>{webRtcResult.details}</p>
          </div>
        ) : resultState === "partial" ? (
          <div className="mt-3 space-y-3 text-slate-300">
            <p>
              Part of the test worked, but one of the checks could not fully
              confirm the result. You can still use the visible IP and WebRTC
              details shown here as a comparison point.
            </p>
            <p>{webRtcResult.details}</p>
          </div>
        ) : (
          <p className="mt-3 text-slate-300">
            The visible IP and WebRTC checks could not load. Check your
            connection, turn off any blocking extension that may stop the
            requests, and refresh the page.
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
            This version checks the public IP address, approximate location, ISP
            or network owner, and WebRTC candidate addresses that websites can
            see from your browser right now. That makes it useful for checking
            both basic IP masking and common WebRTC exposure.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">What this version does not check yet</h2>
          <p className="mt-3">
            It does not currently run a DNS leak test. That means it can tell you
            what visible IP, network details, and WebRTC addresses are exposed,
            but it cannot confirm whether your DNS requests are bypassing the VPN.
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-emerald-50">
          <h2 className="text-2xl font-bold text-white">Quick fix checklist</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-emerald-50/90">
            <li>Connect to your VPN before running the test.</li>
            <li>Refresh the page after changing VPN servers or protocols.</li>
            <li>Check whether the ISP looks like your VPN provider rather than your normal network.</li>
            <li>Compare the visible IP with any public WebRTC address shown above.</li>
            <li>Disable or limit WebRTC in supported browsers if local details keep appearing.</li>
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
            If your real IP address, location, ISP, or a different public WebRTC
            address still appears while your VPN is connected, a stronger VPN
            setup may be the fastest fix. This module is intentionally structured
            as a future recommendation area, but no live affiliate link has been
            added yet.
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
            country, city, ISP, and WebRTC addresses match your VPN setup rather
            than your normal internet connection.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">What should you look for?</h2>
          <p className="mt-3">
            If your VPN is working correctly, the visible IP address and any
            public WebRTC address should usually reflect the VPN server rather
            than your real home or work connection. If your real ISP, location,
            or a different public WebRTC IP appears, your VPN may not be active
            or may be leaking information.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">Does this page use outside services?</h2>
          <p className="mt-3">
            Yes. This page uses ipapi.co for the visible IP lookup and standard
            public STUN endpoints for the browser-side WebRTC candidate check.
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
                It checks the public IP address, approximate location, ISP or
                network owner, and WebRTC candidate addresses that your browser currently exposes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">How do I know if my VPN is working?</h3>
              <p className="mt-1">
                Turn on your VPN and refresh the test. If the visible IP address,
                location, and WebRTC public address match your VPN server rather
                than your normal connection, your setup is in better shape.
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
              <h3 className="font-semibold text-white">What if WebRTC shows a different public IP?</h3>
              <p className="mt-1">
                That is a stronger sign of a leak. Reconnect the VPN, switch
                servers or protocols, and check whether your browser has WebRTC
                protections enabled.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Does this page run a DNS leak test too?</h3>
              <p className="mt-1">
                Not yet. This page now checks visible IP details and WebRTC
                exposure, but DNS leak testing is still a separate follow-up improvement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ToolShell>
  );
}

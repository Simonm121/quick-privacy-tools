import Link from "next/link";
import { ToolShell } from "@/components/ui";

export default function Page() {
  return (
    <ToolShell
      title="Is My VPN Working?"
      icon="🛡️"
      intro="Check if your VPN is hiding your real IP address and location correctly."
    >
      <section className="space-y-4 text-slate-300">
        <h2 className="text-2xl font-bold text-white">
          How do I know if my VPN is working?
        </h2>

        <p>
          A VPN is working if your visible IP address and location are different
          from your normal internet connection. When connected, websites should
          see the VPN server instead of your real location.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Quick way to check your VPN
        </h2>

        <p>
          Turn on your VPN and run a VPN leak test. If your IP address, country,
          or ISP still match your real connection, your VPN may not be working
          correctly.
        </p>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Test your VPN now
          </h2>

          <p className="mt-3">
            Use our VPN Leak Test to check your IP address, location, and
            internet provider while connected to your VPN.
          </p>

          <Link
            href="/vpn-leak-test"
            className="mt-5 inline-block rounded-2xl bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-400"
          >
            Run VPN Leak Test
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-white">
          Signs your VPN is NOT working
        </h2>

        <p>
          Your VPN may not be working properly if your real IP address, location,
          or ISP is still visible. This can happen if the VPN disconnects, leaks
          data, or is misconfigured.
        </p>

        <h2 className="text-2xl font-bold text-white">
          What is a VPN leak?
        </h2>

        <p>
          A VPN leak happens when your real IP address or network details are
          exposed even while your VPN is active. Common leaks include IP leaks,
          DNS leaks, and WebRTC leaks.
        </p>

        <h2 className="text-2xl font-bold text-white">
          How to fix VPN issues
        </h2>

        <p>
          To fix VPN issues, reconnect your VPN, switch servers, check your VPN
          settings, or try a different VPN provider. Make sure your connection is
          stable and properly configured.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Related tools
          </h2>

          <p className="mt-3">
            Use these tools to check your IP address, location, and browser
            privacy signals.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/what-is-my-ip"
            >
              What Is My IP Address
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/ip-location-checker"
            >
              IP Location Checker
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/browser-fingerprint-test"
            >
              Browser Fingerprint Test
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/dns-lookup"
            >
              DNS Lookup
            </Link>
          </div>
        </div>
      </section>
    </ToolShell>
  );
}
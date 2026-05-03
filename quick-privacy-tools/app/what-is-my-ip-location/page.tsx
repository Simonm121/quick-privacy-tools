import Link from "next/link";
import { ToolShell } from "@/components/ui";

export default function Page() {
  return (
    <ToolShell
      title="What Is My IP Location?"
      icon="📍"
      intro="Learn what your IP location means and use free tools to check the location websites can detect."
    >
      <section className="space-y-4 text-slate-300">
        <h2 className="text-2xl font-bold text-white">
          What is my IP location?
        </h2>

        <p>
          Your IP location is the approximate location linked to your public IP
          address. Websites may use your IP address to estimate your country,
          region, city, and internet provider.
        </p>

        <p>
          IP location is not the same as GPS location. It is usually based on
          internet provider and network data, so it may be approximate rather
          than exact.
        </p>

        <h2 className="text-2xl font-bold text-white">
          How can I check my IP location?
        </h2>

        <p>
          You can check your IP location by using an IP location checker. This
          shows the public IP address and approximate location that websites may
          detect when you browse online.
        </p>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Check your IP location now
          </h2>

          <p className="mt-3">
            Use our free IP Location Checker to see your public IP address,
            country, region, city, and internet provider.
          </p>

          <Link
            href="/ip-location-checker"
            className="mt-5 inline-block rounded-2xl bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-400"
          >
            Open IP Location Checker
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-white">
          Why does my IP location matter?
        </h2>

        <p>
          Your IP location can affect what websites show you, which content is
          available, fraud checks, account security alerts, and whether a VPN
          appears to be working correctly.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Can a VPN change my IP location?
        </h2>

        <p>
          Yes. A VPN can make websites see the VPN server location instead of
          your normal internet connection. If your VPN is working, your visible
          IP location should usually match the VPN server you selected.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Why is my IP location wrong?
        </h2>

        <p>
          IP location can be wrong because it depends on databases, internet
          provider routing, mobile networks, VPNs, proxies, and how your
          connection is assigned. It is best treated as an estimate.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Related IP privacy tools
          </h2>

          <p className="mt-3">
            Use these tools to compare your IP address, location, VPN status,
            and browser privacy details.
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
              href="/vpn-leak-test"
            >
              VPN Leak Test
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/browser-fingerprint-test"
            >
              Browser Fingerprint Test
            </Link>
          </div>
        </div>
      </section>
    </ToolShell>
  );
}
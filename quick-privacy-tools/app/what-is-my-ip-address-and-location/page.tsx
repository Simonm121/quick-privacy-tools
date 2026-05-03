import Link from "next/link";
import { ToolShell } from "@/components/ui";

export default function Page() {
  return (
    <ToolShell
      title="What Is My IP Address and Location?"
      icon="🌐"
      intro="Check your IP address and learn how websites detect your location, country, and internet provider."
    >
      <section className="space-y-4 text-slate-300">
        <h2 className="text-2xl font-bold text-white">
          What is my IP address and location?
        </h2>

        <p>
          Your IP address is a unique number assigned to your internet
          connection. Your IP location is the approximate geographic location
          linked to that IP address, such as your country, region, and city.
        </p>

        <p>
          When you visit a website, it can usually see your public IP address and
          estimate your location based on it.
        </p>

        <h2 className="text-2xl font-bold text-white">
          How can I check my IP address and location?
        </h2>

        <p>
          You can use online tools to check both your IP address and location.
          These tools show the information that websites may detect when you
          connect to them.
        </p>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Check your IP address and location
          </h2>

          <p className="mt-3">
            Use our free tools to see your IP address and the location linked to
            your internet connection.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/what-is-my-ip"
              className="rounded-2xl bg-blue-500 px-5 py-3 font-semibold text-white hover:bg-blue-400"
            >
              Check IP Address
            </Link>

            <Link
              href="/ip-location-checker"
              className="rounded-2xl bg-white/10 px-5 py-3 font-semibold text-white hover:bg-white/15"
            >
              Check IP Location
            </Link>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white">
          Why do websites check IP address and location?
        </h2>

        <p>
          Websites use IP address and location data for security checks, fraud
          prevention, content localisation, and analytics. It can also help detect
          suspicious logins or unusual activity.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Can I hide my IP address and location?
        </h2>

        <p>
          Yes. A VPN can hide your real IP address and replace it with the IP of
          the VPN server. This changes the location that websites see.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Is IP location always accurate?
        </h2>

        <p>
          No. IP location is an estimate and can vary depending on your internet
          provider, network routing, or whether you are using a VPN or mobile
          network.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Related tools
          </h2>

          <p className="mt-3">
            Use these tools to check your IP address, location, and connection
            privacy.
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
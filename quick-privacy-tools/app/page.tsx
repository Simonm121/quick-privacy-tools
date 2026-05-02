import Link from "next/link";
import { Card } from "@/components/ui";

const tools = [
  ["🌐", "What Is My IP Address", "See your public IP instantly.", "/what-is-my-ip", "ip-tools"],
  ["📍", "IP Location Checker", "Find your IP location and ISP details.", "/ip-location-checker", "ip-tools"],
  ["🛡️", "VPN Leak Test", "Detect IP, DNS and WebRTC leaks.", "/vpn-leak-test", "ip-tools"],
  ["🧪", "Browser Fingerprint Test", "See what your browser reveals about you.", "/browser-fingerprint-test", "privacy"],
  ["🔑", "Password Generator", "Generate strong passwords instantly.", "/password-generator", "passwords"],
  ["🔐", "Password Strength Checker", "Check if your password is weak or secure.", "/password-checker", "passwords"],
  ["📧", "Email Breach Checker", "Check if your email may have been exposed.", "/email-breach-checker", "privacy"],
  ["📂", "Metadata Remover", "Remove hidden image data before sharing.", "/metadata-remover", "privacy"],
  ["🎲", "Username Generator", "Generate clean username ideas instantly.", "/username-generator", "privacy"],
  ["🔍", "Whois Lookup", "Check domain ownership and registration details.", "/whois-lookup", "domain"],
  ["📡", "DNS Lookup", "Lookup A, MX, TXT, NS and CNAME records.", "/dns-lookup", "domain"],
];

const categories = [
  ["ip-tools", "IP Tools"],
  ["passwords", "Passwords"],
  ["privacy", "Privacy"],
  ["domain", "Domain"],
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            Fast checks. No login. Built for everyday privacy tasks.
          </div>

          <h1 className="mx-auto max-w-5xl text-4xl font-black tracking-tight md:text-7xl">
            Privacy tools that run instantly in your browser
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            Check your IP, test your VPN, generate secure passwords and protect your data — no tracking, no signup,
            everything runs locally where possible.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-semibold text-slate-200">
            <span className="rounded-full bg-white/10 px-4 py-2">✔ No data stored</span>
            <span className="rounded-full bg-white/10 px-4 py-2">✔ Fast & free</span>
            <span className="rounded-full bg-white/10 px-4 py-2">✔ Works in your browser</span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl rounded-3xl border border-dashed border-white/15 bg-slate-900/80 p-6 text-center text-sm text-slate-400">
          Ad Banner Placeholder
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          {categories.map(([id, label]) => {
            const categoryTools = tools.filter((tool) => tool[4] === id);

            return (
              <div key={id} id={id} className="mb-14 scroll-mt-24">
                <h2 className="mb-5 text-2xl font-bold">{label}</h2>

                <div className="grid gap-5 md:grid-cols-3">
                  {categoryTools.map(([icon, title, desc, href]) => (
                    <Link key={href} href={href}>
                      <Card className="h-full cursor-pointer p-6 transition-all hover:-translate-y-1 hover:bg-slate-700/90 hover:shadow-blue-500/10">
                        <div className="text-3xl">{icon}</div>
                        <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
                        <p className="mt-3 leading-7 text-slate-300">{desc}</p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="rounded-3xl border border-dashed border-white/15 bg-slate-900/80 p-6 text-center text-sm text-slate-400">
            Ad Banner Placeholder
          </div>
        </div>
      </section>
    </main>
  );
}

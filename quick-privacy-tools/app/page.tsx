import { Card } from "@/components/ui";
import HomepageTrackedLink from "@/components/HomepageTrackedLink";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata = buildPageMetadata({
  absoluteTitle: "Quick Privacy Tools | Free Online Privacy & Security Tools",
  description:
    "Free online privacy and security tools to check your IP, review VPN-visible location, inspect browser fingerprinting, generate passwords, remove image metadata, and look up DNS and Whois data.",
  path: "/",
});

const tools = [
  {
    icon: "🌐",
    title: "What Is My IP Address",
    description: "See your public IP instantly.",
    href: "/what-is-my-ip",
    category: "ip-tools",
  },
  {
    icon: "📍",
    title: "IP Location Checker",
    description: "Find your IP location and ISP details.",
    href: "/ip-location-checker",
    category: "ip-tools",
  },
  {
    icon: "🛡️",
    title: "VPN Leak Test",
    description: "Check the IP, location, and ISP your VPN exposes.",
    href: "/vpn-leak-test",
    category: "ip-tools",
  },
  {
    icon: "🧪",
    title: "Browser Fingerprint Test",
    description: "See what your browser reveals about you.",
    href: "/browser-fingerprint-test",
    category: "privacy",
  },
  {
    icon: "🔑",
    title: "Password Generator",
    description: "Generate strong passwords instantly.",
    href: "/password-generator",
    category: "passwords",
  },
  {
    icon: "🔐",
    title: "Password Strength Checker",
    description: "Check if your password is weak or secure.",
    href: "/password-checker",
    category: "passwords",
  },
  {
    icon: "📧",
    title: "Email Breach Check Guide",
    description: "Validate an email format and follow a trusted live breach check.",
    href: "/email-breach-checker",
    category: "privacy",
  },
  {
    icon: "📂",
    title: "Metadata Remover",
    description: "Remove hidden image data from JPG, PNG, and WEBP files.",
    href: "/metadata-remover",
    category: "privacy",
  },
  {
    icon: "🎲",
    title: "Username Generator",
    description: "Generate clean username ideas instantly.",
    href: "/username-generator",
    category: "privacy",
  },
  {
    icon: "🔍",
    title: "Whois Lookup",
    description: "Check domain ownership and registration details.",
    href: "/whois-lookup",
    category: "domain",
  },
  {
    icon: "📡",
    title: "DNS Lookup",
    description: "Lookup A, MX, TXT, NS and CNAME records.",
    href: "/dns-lookup",
    category: "domain",
  },
] as const;

const categories = [
  ["ip-tools", "IP Tools"],
  ["passwords", "Passwords"],
  ["privacy", "Privacy"],
  ["domain", "Domain"],
] as const;

const featuredTools = [
  {
    title: "VPN Leak Test",
    description: "Check the IP address, location, and ISP your VPN currently exposes.",
    href: "/vpn-leak-test",
  },
  {
    title: "What Is My IP Address",
    description: "See the public IP address websites can detect right now.",
    href: "/what-is-my-ip",
  },
  {
    title: "Browser Fingerprint Test",
    description: "Review common browser and device details that can identify you.",
    href: "/browser-fingerprint-test",
  },
  {
    title: "Metadata Remover",
    description: "Strip hidden image metadata before you share photos online.",
    href: "/metadata-remover",
  },
] as const;

const guides = [
  {
    title: "Is My VPN Working?",
    description: "Learn the quickest way to confirm whether your VPN is hiding your real connection.",
    href: "/is-my-vpn-working",
  },
  {
    title: "What Is My IP Location?",
    description: "Understand what websites can estimate from your public IP address.",
    href: "/what-is-my-ip-location",
  },
  {
    title: "What Is My IP Address and Location?",
    description: "See how your IP address and approximate location fit together.",
    href: "/what-is-my-ip-address-and-location",
  },
] as const;

const faqItems = [
  {
    question: "What can websites see about me?",
    answer:
      "Websites can usually see your public IP address, approximate IP location, browser details, device information, and sometimes hidden image metadata if you upload files without cleaning them first.",
  },
  {
    question: "How do I check if my VPN is working?",
    answer:
      "Turn on your VPN and run a VPN check. If the visible IP address, location, or ISP still match your normal connection, your VPN may not be hiding your traffic correctly.",
  },
  {
    question: "What is a browser fingerprint?",
    answer:
      "A browser fingerprint is a collection of details about your browser, device, screen, language, and settings that can help websites recognise or group your visits.",
  },
  {
    question: "Do these privacy tools store my data?",
    answer:
      "Many Quick Privacy Tools run locally in your browser. When a page uses an outside lookup service, the page notes that clearly so you can make an informed choice.",
  },
  {
    question: "Which privacy check should I start with?",
    answer:
      "Most people start with their IP address, VPN status, or browser fingerprint. Those checks quickly show what websites and services can already see about your connection and device.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

function SisterSiteShield() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
    >
      <path d="M12 2l7 3v6c0 5.25-3.15 9.9-7 11-3.85-1.1-7-5.75-7-11V5l7-3z" />
      <path
        d="M10.7 12.9l-2-2 1.4-1.4 1.3 1.3 3.6-3.6 1.4 1.4-5 5a1 1 0 0 1-1.4 0z"
        className="fill-slate-950"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
            Check your IP, test your VPN, generate secure passwords and protect
            your data. Many tools run locally in your browser, and pages clearly
            note when an outside lookup service is used.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-semibold text-slate-200">
            <span className="rounded-full bg-white/10 px-4 py-2">No signup required</span>
            <span className="rounded-full bg-white/10 px-4 py-2">Fast and free</span>
            <span className="rounded-full bg-white/10 px-4 py-2">Clear privacy notes</span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <HomepageTrackedLink
              href="/vpn-leak-test"
              trackingName="hero_vpn_leak_test"
              trackingSection="hero"
              className="rounded-2xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400"
            >
              Run VPN Leak Test
            </HomepageTrackedLink>
            <HomepageTrackedLink
              href="/what-is-my-ip"
              trackingName="hero_what_is_my_ip"
              trackingSection="hero"
              className="rounded-2xl bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              Check My IP Address
            </HomepageTrackedLink>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.35fr_1fr]">
          <Card className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">
                  Start here
                </div>
                <h2 className="mt-3 text-3xl font-bold text-white">
                  The quickest privacy checks for most visitors
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                  These tools give you the fastest picture of what your browser,
                  connection, and shared files may reveal online.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {featuredTools.map((tool) => (
                <HomepageTrackedLink
                  key={tool.href}
                  href={tool.href}
                  trackingName={tool.title}
                  trackingSection="featured_tools"
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-blue-400/40 hover:bg-slate-900"
                >
                  <h3 className="text-lg font-bold text-white">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {tool.description}
                  </p>
                </HomepageTrackedLink>
              ))}
            </div>
          </Card>

          <Card className="p-6 md:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Popular guides
            </div>
            <h2 className="mt-3 text-2xl font-bold text-white">
              Simple answers to common privacy questions
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              These pages support the main tools and help visitors understand what
              websites can see, what a VPN changes, and what to check next.
            </p>

            <div className="mt-6 space-y-3">
              {guides.map((guide) => (
                <HomepageTrackedLink
                  key={guide.href}
                  href={guide.href}
                  trackingName={guide.title}
                  trackingSection="popular_guides"
                  className="block rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:border-emerald-400/40 hover:bg-slate-900"
                >
                  <h3 className="font-bold text-white">{guide.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {guide.description}
                  </p>
                </HomepageTrackedLink>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-7xl">
          {categories.map(([id, label]) => {
            const categoryTools = tools.filter((tool) => tool.category === id);

            return (
              <div key={id} id={id} className="mb-14 scroll-mt-24">
                <h2 className="mb-5 text-2xl font-bold">{label}</h2>

                <div className="grid gap-5 md:grid-cols-3">
                  {categoryTools.map((tool) => (
                    <HomepageTrackedLink
                      key={tool.href}
                      href={tool.href}
                      trackingName={tool.title}
                      trackingSection={`tool_grid_${tool.category}`}
                    >
                      <Card className="h-full cursor-pointer p-6 transition-all hover:-translate-y-1 hover:bg-slate-700/90 hover:shadow-blue-500/10">
                        <div className="text-3xl">{tool.icon}</div>
                        <h3 className="mt-4 text-xl font-bold text-white">
                          {tool.title}
                        </h3>
                        <p className="mt-3 leading-7 text-slate-300">
                          {tool.description}
                        </p>
                      </Card>
                    </HomepageTrackedLink>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl space-y-6 text-slate-300">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Free online privacy and security tools
            </h2>

            <p className="mt-5">
              Quick Privacy Tools is a collection of simple browser-based tools
              designed to help you check your online privacy, security, and public
              internet information quickly.
            </p>

            <p className="mt-4">
              You can check your public IP address, review your approximate IP
              location, test whether your VPN is showing the expected location,
              inspect common browser fingerprint details, generate stronger
              passwords, remove hidden image metadata, and look up DNS or domain
              information.
            </p>

            <p className="mt-4">
              The goal is to make everyday privacy checks fast, clear, and
              accessible without requiring an account or complicated setup.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-500/20 bg-slate-900/60 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">
              VPN privacy path
            </div>
            <h2 className="mt-3 text-2xl font-bold text-white">
              Trying to hide your IP address or check whether a VPN is working?
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Start with a quick VPN check, then use the guide page if you want a
              plain-English explanation of what the result means and what to do next.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <HomepageTrackedLink
                href="/vpn-leak-test"
                trackingName="vpn_path_vpn_leak_test"
                trackingSection="vpn_path"
                className="rounded-2xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400"
              >
                Open VPN Leak Test
              </HomepageTrackedLink>
              <HomepageTrackedLink
                href="/is-my-vpn-working"
                trackingName="vpn_path_is_my_vpn_working"
                trackingSection="vpn_path"
                className="rounded-2xl bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                Read: Is My VPN Working?
              </HomepageTrackedLink>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <h2 className="text-2xl font-bold text-white">
              Popular privacy tools
            </h2>

            <p className="mt-3">
              Start with these quick checks to understand what your browser,
              device, and internet connection may reveal online.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <HomepageTrackedLink
                className="rounded-2xl bg-white/10 p-4 font-semibold text-white transition hover:bg-white/15"
                href="/what-is-my-ip"
                trackingName="popular_what_is_my_ip"
                trackingSection="popular_tools"
              >
                What Is My IP Address
              </HomepageTrackedLink>
              <HomepageTrackedLink
                className="rounded-2xl bg-white/10 p-4 font-semibold text-white transition hover:bg-white/15"
                href="/vpn-leak-test"
                trackingName="popular_vpn_leak_test"
                trackingSection="popular_tools"
              >
                VPN Leak Test
              </HomepageTrackedLink>
              <HomepageTrackedLink
                className="rounded-2xl bg-white/10 p-4 font-semibold text-white transition hover:bg-white/15"
                href="/password-generator"
                trackingName="popular_password_generator"
                trackingSection="popular_tools"
              >
                Password Generator
              </HomepageTrackedLink>
              <HomepageTrackedLink
                className="rounded-2xl bg-white/10 p-4 font-semibold text-white transition hover:bg-white/15"
                href="/metadata-remover"
                trackingName="popular_metadata_remover"
                trackingSection="popular_tools"
              >
                Metadata Remover
              </HomepageTrackedLink>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <h2 className="text-2xl font-bold text-white">
              Privacy tool FAQs
            </h2>

            <div className="mt-5 space-y-5">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                  <h3 className="text-lg font-bold text-white">{item.question}</h3>
                  <p className="mt-2 leading-7 text-slate-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Sister site
            </div>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              ScamCheckTool is part of the same wider group of simple,
              trust-focused web tools.
            </p>

            <a
              href="https://www.scamchecktool.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex max-w-sm items-start gap-3 rounded-lg border border-slate-800 bg-slate-950 px-4 py-4 transition hover:border-slate-700 hover:bg-slate-900"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-slate-950">
                <SisterSiteShield />
              </span>

              <span className="min-w-0">
                <span className="block text-sm font-extrabold text-white">
                  ScamCheckTool
                </span>
                <span className="mt-1 block text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  by Privacy Toolbox
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/95 px-6 py-4 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">

        {/* Logo / Brand */}
        <Link href="/" className="leading-tight">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg shadow-lg">
              🛡️
            </div>

            <div>
              <div className="text-lg font-black tracking-tight">
                Quick Privacy Tools
              </div>
              <div className="text-xs text-slate-400">
                by PrivacyToolbox
              </div>
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex flex-wrap gap-5 text-sm font-medium text-slate-300">
          <a href="/#ip-tools" className="hover:text-white transition">
            IP Tools
          </a>
          <a href="/#passwords" className="hover:text-white transition">
            Passwords
          </a>
          <a href="/#privacy" className="hover:text-white transition">
            Privacy
          </a>
          <a href="/#domain" className="hover:text-white transition">
            Domain
          </a>
        </div>

      </div>
    </nav>
  );
}

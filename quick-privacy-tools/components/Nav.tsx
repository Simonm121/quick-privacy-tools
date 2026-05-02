import Link from "next/link";
export default function Nav() {
  return (
    <nav className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/95 px-6 py-4 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="leading-tight">
          <div className="flex items-center gap-2 text-lg font-black"><span>🛡️</span> Quick Privacy Tools</div>
          <div className="ml-7 text-xs text-slate-400">by PrivacyToolbox</div>
        </Link>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-300">
          <a href="/#ip-tools" className="hover:text-white">IP Tools</a>
          <a href="/#passwords" className="hover:text-white">Passwords</a>
          <a href="/#privacy" className="hover:text-white">Privacy</a>
          <a href="/#domain" className="hover:text-white">Domain</a>
        </div>
      </div>
    </nav>
  );
}

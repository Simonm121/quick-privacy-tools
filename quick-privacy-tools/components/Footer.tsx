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

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 py-10 text-center text-sm text-slate-400">
      <div className="mx-auto max-w-4xl space-y-4">
        <p>© {new Date().getFullYear()} Quick Privacy Tools</p>

        <div className="flex justify-center gap-6">
          <a href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-white">
            Terms
          </a>
          <a href="/contact" className="hover:text-white">
            Contact
          </a>
        </div>

        <div className="mx-auto max-w-sm space-y-3 text-left">
          <div className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Sister site
          </div>

          <a
            href="https://www.scamchecktool.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-4 transition hover:border-slate-700 hover:bg-slate-900"
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

        <p className="text-xs text-slate-500">
          Many tools run locally in your browser. Pages note when an outside
          lookup service is used.
        </p>
      </div>
    </footer>
  );
}

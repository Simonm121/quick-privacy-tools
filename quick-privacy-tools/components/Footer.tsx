export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 py-10 text-center text-sm text-slate-400">
      <div className="max-w-4xl mx-auto space-y-4">
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

        <a
          href="https://www.scamchecktool.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 px-3 py-1.5 text-xs text-emerald-300 transition hover:border-emerald-400/40 hover:text-emerald-200"
        >
          <img
            src="https://www.scamchecktool.com/favicon.ico"
            alt="ScamCheckTool shield logo"
            className="h-4 w-4"
          />
          <span>Visit ScamCheckTool</span>
        </a>

        <p className="text-xs text-slate-500">
          Many tools run locally in your browser. Pages note when an outside
          lookup service is used.
        </p>
      </div>
    </footer>
  );
}

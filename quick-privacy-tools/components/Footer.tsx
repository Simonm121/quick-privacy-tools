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

        <p className="text-xs text-slate-500">
          Many tools run locally in your browser. Pages note when an outside
          lookup service is used.
        </p>
      </div>
    </footer>
  );
}
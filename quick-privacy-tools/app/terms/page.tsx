export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-200">
      <h1 className="mb-6 text-4xl font-bold text-white">Terms</h1>

      <p className="mb-4">
        Quick Privacy Tools provides free online privacy and security tools for general informational use.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">No Guarantee</h2>
      <p className="mb-4">
        We aim to provide useful and accurate tools, but we do not guarantee that results will always be complete,
        accurate, or suitable for every situation.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">Use at Your Own Risk</h2>
      <p className="mb-4">
        You are responsible for how you use the information and results provided by this website.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">Changes</h2>
      <p className="mb-4">
        We may update these terms from time to time.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">Contact</h2>
      <p>
        Questions? Contact us at{" "}
        <a className="text-blue-400 hover:text-blue-300" href="mailto:hello@quickprivacytools.com">
          hello@quickprivacytools.com
        </a>
      </p>
    </main>
  );
}
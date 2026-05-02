export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-200">
      <h1 className="mb-6 text-4xl font-bold text-white">Privacy Policy</h1>

      <p className="mb-4">
        Quick Privacy Tools provides free browser-based privacy and security tools.
        We aim to collect as little personal information as possible.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">Data We Store</h2>
      <p className="mb-4">
        We do not store passwords, files, browser fingerprints, or tool results entered into our tools.
        Where possible, tools run locally in your browser.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">Analytics and Ads</h2>
      <p className="mb-4">
        In the future, we may use analytics and advertising services such as Google Analytics
        or Google AdSense. These services may use cookies or similar technologies.
      </p>

      <h2 className="mt-8 mb-3 text-2xl font-semibold text-white">Contact</h2>
      <p>
        If you have questions, contact us at:{" "}
        <a className="text-blue-400 hover:text-blue-300" href="mailto:hello@quickprivacytools.com">
          hello@quickprivacytools.com
        </a>
      </p>
    </main>
  );
}
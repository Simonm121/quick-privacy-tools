export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-200">
      <h1 className="mb-6 text-4xl font-bold text-white">Contact</h1>

      <p className="mb-4">
        Have a question, suggestion, or issue with one of our tools?
      </p>

      <p className="mb-4">
        You can contact Quick Privacy Tools at:
      </p>

      <p>
        <a
          className="text-blue-400 hover:text-blue-300"
          href="mailto:hello@quickprivacytools.com"
        >
          hello@quickprivacytools.com
        </a>
      </p>
    </main>
  );
}
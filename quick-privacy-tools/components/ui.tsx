import Link from "next/link";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-slate-800/90 shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}

export function Button({
  children,
  onClick,
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-2xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400 disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}

export function Info({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-semibold text-white">
        {String(value)}
      </p>
    </div>
  );
}

export function ToolShell({
  title,
  icon,
  intro,
  children,
}: {
  title: string;
  icon: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-950 px-6 pt-6 pb-12 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-4 inline-block text-sm font-semibold text-blue-300 hover:text-blue-200"
        >
          ← Back to all tools
        </Link>

        <Card className="p-6 md:p-8">
          <div className="mb-6 flex items-start gap-4">
            <div className="rounded-2xl bg-blue-500/20 p-3 text-3xl">
              {icon}
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                {title}
              </h1>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                {intro}
              </p>
            </div>
          </div>

          {children}
        </Card>
      </div>
    </main>
  );
}

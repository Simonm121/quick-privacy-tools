"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ToolShell } from "@/components/ui";

export default function Page() {
  const [password, setPassword] = useState("");

  const result = useMemo(() => {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (!password) {
      return {
        label: "Enter a password",
        color: "text-slate-300",
        advice: "Type a password above to check its strength.",
      };
    }

    if (score <= 2) {
      return {
        label: "Weak",
        color: "text-red-400",
        advice:
          "Use a longer password with uppercase letters, numbers, and symbols.",
      };
    }

    if (score <= 4) {
      return {
        label: "Medium",
        color: "text-amber-300",
        advice:
          "This is better, but a longer password with more variety would be stronger.",
      };
    }

    return {
      label: "Strong",
      color: "text-emerald-300",
      advice: "This password uses a good mix of length and character types.",
    };
  }, [password]);

  return (
    <ToolShell
      title="Password Strength Checker"
      icon="🔐"
      intro="Check how strong your password is based on length, numbers, capitals and symbols."
    >
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-blue-400"
      />

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
        <p className="text-xl">
          Strength: <strong className={result.color}>{result.label}</strong>
        </p>
        <p className="mt-2 text-slate-300">{result.advice}</p>
      </div>

      <section className="mt-10 space-y-4 text-slate-300">
        <h2 className="text-2xl font-bold text-white">
          Free password strength checker
        </h2>

        <p>
          This password strength checker gives a simple estimate based on common
          password rules such as length, uppercase letters, numbers, and symbols.
        </p>

        <h2 className="text-2xl font-bold text-white">
          What makes a password strong?
        </h2>

        <p>
          Strong passwords are usually long, unique, and difficult to guess. A
          good password should not be based on names, birthdays, common words, or
          passwords you have used elsewhere.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Is my password stored?
        </h2>

        <p>
          No. This tool runs in your browser and does not store your password.
          For extra safety, avoid entering real passwords you currently use on
          important accounts.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Related password and privacy tools
          </h2>

          <p className="mt-3">
            Use these tools to generate a strong password, create a private
            username, and check other privacy risks.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/password-generator"
            >
              Password Generator
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/username-generator"
            >
              Username Generator
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/email-breach-checker"
            >
              Email Breach Checker
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/metadata-remover"
            >
              Metadata Remover
            </Link>
          </div>
        </div>
      </section>
    </ToolShell>
  );
}

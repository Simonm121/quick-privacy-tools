"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, ToolShell } from "@/components/ui";

export default function Page() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  function checkEmail() {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      setResult("Please enter a valid email address, for example: name@example.com");
      return;
    }

    setResult(
      "This email format looks valid. This free version does not search live breach databases yet. For a real breach result, use the official Have I Been Pwned website linked below."
    );
  }

  return (
    <ToolShell
      title="Email Breach Checker"
      icon="📧"
      intro="Check whether an email address is ready for a breach lookup and learn how to verify exposure safely."
    >
      <div className="mb-5 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-100">
        Free safe mode: this tool does not currently query live breach
        databases. We do not store your email.
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-blue-400"
        />

        <Button onClick={checkEmail}>Check Email</Button>
      </div>

      {result && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-slate-200">
          {result}

          <div className="mt-4">
            <a
              href="https://haveibeenpwned.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-300 underline hover:text-blue-200"
            >
              Check real breach results on Have I Been Pwned
            </a>
          </div>
        </div>
      )}

      <section className="mt-10 space-y-4 text-slate-300">
        <h2 className="text-2xl font-bold text-white">
          Free Email Breach Checker
        </h2>

        <p>
          An email breach checker helps you find out whether an email address
          may have appeared in a known data breach. Breaches can expose email
          addresses, passwords, usernames, phone numbers, or other account
          details.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Why email breaches matter
        </h2>

        <p>
          If your email address appears in a breach, attackers may use it for
          phishing, spam, credential stuffing, or password reset attempts. This
          is why it is important to use unique passwords for every account.
        </p>

        <h2 className="text-2xl font-bold text-white">
          What should I do if my email was exposed?
        </h2>

        <p>
          Change passwords on affected accounts, enable two-factor
          authentication where possible, and avoid reusing the same password
          across multiple websites.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Does this tool store my email?
        </h2>

        <p>
          No. This page does not store your email address. The current free
          version only validates the email format and points you to a trusted
          live breach checking service.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Related security tools
          </h2>

          <p className="mt-3">
            Use these tools to create stronger passwords, check password
            strength, and protect your online accounts.
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
              href="/password-checker"
            >
              Password Strength Checker
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/username-generator"
            >
              Username Generator
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

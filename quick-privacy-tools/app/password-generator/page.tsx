"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, ToolShell } from "@/components/ui";

export default function Page() {
  const [password, setPassword] = useState("");

  function generate() {
    const pool =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const values = new Uint32Array(18);
    crypto.getRandomValues(values);
    setPassword(Array.from(values, (v) => pool[v % pool.length]).join(""));
  }

  useEffect(() => {
    generate();
  }, []);

  return (
    <ToolShell
      title="Password Generator"
      icon="🔑"
      intro="Generate a strong random password locally in your browser."
    >
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
        <code className="break-all text-xl font-black">{password}</code>
      </div>

      <Button className="mt-5" onClick={generate}>
        Generate New Password
      </Button>

      <section className="mt-10 space-y-4 text-slate-300">
        <h2 className="text-2xl font-bold text-white">
          Free secure password generator
        </h2>

        <p>
          This password generator creates a random password using uppercase
          letters, lowercase letters, numbers, and symbols. The password is
          generated locally in your browser.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Why use a random password?
        </h2>

        <p>
          Random passwords are harder to guess than passwords based on names,
          birthdays, common words, or reused patterns. Using a unique password
          for each account helps reduce the risk if one account is compromised.
        </p>

        <h2 className="text-2xl font-bold text-white">
          Is the password stored?
        </h2>

        <p>
          No. Quick Privacy Tools does not store generated passwords. The
          password is created in your browser and disappears when you leave or
          refresh the page.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Related password and privacy tools
          </h2>

          <p className="mt-3">
            After generating a strong password, you can check password strength,
            create a private username, or review other privacy signals.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
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

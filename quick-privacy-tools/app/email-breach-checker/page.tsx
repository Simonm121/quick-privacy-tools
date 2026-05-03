"use client";

import { useState } from "react";
import { Button, ToolShell } from "@/components/ui";

export default function Page() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  function checkEmail() {
    if (!email.includes("@")) {
      setResult("Please enter a valid email address.");
      return;
    }

    setResult(
      "Demo check only: this tool does not currently search live breach databases. We do not store your email. A real breach-check API will be added later."
    );
  }

  return (
    <ToolShell
      title="Email Breach Checker"
      icon="📧"
      intro="Enter an email address to prepare a breach check. Live breach database results are not enabled yet."
    >
      <div className="mb-5 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-100">
        Demo mode: this tool does not currently check live breach databases. Do not rely on this page as proof that an email is safe.
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-blue-400"
        />

        <Button onClick={checkEmail}>Run Demo Check</Button>
      </div>

      {result && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-slate-200">
          {result}
        </div>
      )}
    </ToolShell>
  );
}

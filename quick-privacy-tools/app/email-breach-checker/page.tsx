"use client";
import { useState } from "react";
import { Button, ToolShell } from "@/components/ui";
export default function Page() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  function checkEmail() {
    if (!email.includes("@")) return setResult("Please enter a valid email address.");
    setResult("Basic check complete. For production, connect a real breach-check API such as Have I Been Pwned or XposedOrNot.");
  }
  return (
    <ToolShell title="Email Breach Checker" icon="📧" intro="Check whether your email may have been exposed in a data breach.">
      <div className="flex flex-col gap-3 md:flex-row">
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-blue-400" />
        <Button onClick={checkEmail}>Check Email</Button>
      </div>
      {result && <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-slate-200">{result}</div>}
    </ToolShell>
  );
}

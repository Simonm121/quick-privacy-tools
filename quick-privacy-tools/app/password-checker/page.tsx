"use client";
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
    if (!password) return ["Enter a password", "text-slate-300"];
    if (score <= 2) return ["Weak", "text-red-400"];
    if (score <= 4) return ["Medium", "text-amber-300"];
    return ["Strong", "text-emerald-300"];
  }, [password]);
  return (
    <ToolShell title="Password Strength Checker" icon="🔐" intro="Check how strong your password is based on length, numbers, capitals and symbols.">
      <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-blue-400" />
      <p className="mt-5 text-xl">Strength: <strong className={result[1]}>{result[0]}</strong></p>
    </ToolShell>
  );
}

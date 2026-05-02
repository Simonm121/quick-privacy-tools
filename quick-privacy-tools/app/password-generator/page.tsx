"use client";
import { useEffect, useState } from "react";
import { Button, ToolShell } from "@/components/ui";
export default function Page() {
  const [password, setPassword] = useState("");
  function generate() {
    const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const values = new Uint32Array(18);
    crypto.getRandomValues(values);
    setPassword(Array.from(values, v => pool[v % pool.length]).join(""));
  }
  useEffect(() => { generate(); }, []);
  return (
    <ToolShell title="Password Generator" icon="🔑" intro="Generate a strong random password locally in your browser.">
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
        <code className="break-all text-xl font-black">{password}</code>
      </div>
      <Button className="mt-5" onClick={generate}>Generate New Password</Button>
    </ToolShell>
  );
}

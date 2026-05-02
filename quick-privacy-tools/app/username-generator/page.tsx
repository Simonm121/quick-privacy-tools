"use client";
import { useState } from "react";
import { Button, ToolShell } from "@/components/ui";
export default function Page() {
  const [username, setUsername] = useState("");
  function generateUsername() {
    const adjectives = ["Fast", "Silent", "Secure", "Blue", "Private", "Smart", "Hidden", "Quick"];
    const nouns = ["Tiger", "Eagle", "Ninja", "Ghost", "Shield", "Falcon", "Vault", "Pixel"];
    setUsername(`${adjectives[Math.floor(Math.random()*adjectives.length)]}${nouns[Math.floor(Math.random()*nouns.length)]}${Math.floor(Math.random()*9999)}`);
  }
  return (
    <ToolShell title="Username Generator" icon="🎲" intro="Generate clean username ideas instantly for accounts, games and profiles.">
      <Button onClick={generateUsername}>Generate Username</Button>
      {username && <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-2xl font-black text-white">{username}</div>}
    </ToolShell>
  );
}

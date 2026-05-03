"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, ToolShell } from "@/components/ui";

export default function Page() {
  const [username, setUsername] = useState("");

  function generateUsername() {
    const adjectives = [
      "Fast",
      "Silent",
      "Secure",
      "Blue",
      "Private",
      "Smart",
      "Hidden",
      "Quick",
      "Brave",
      "Lucky",
      "Sharp",
      "Cosmic",
    ];

    const nouns = [
      "Tiger",
      "Eagle",
      "Ninja",
      "Ghost",
      "Shield",
      "Falcon",
      "Vault",
      "Pixel",
      "Rocket",
      "Panda",
      "Wolf",
      "Nova",
    ];

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const number = Math.floor(Math.random() * 9999);

    setUsername(`${adjective}${noun}${number}`);
  }

  async function copyUsername() {
    if (!username) return;
    await navigator.clipboard.writeText(username);
  }

  return (
    <ToolShell
      title="Username Generator"
      icon="🎲"
      intro="Generate clean username ideas instantly for accounts, games, social profiles, forums, and online services."
    >
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
        <p className="text-slate-300">
          Click the button below to create a random username idea. You can use
          it for a new account, gaming profile, social media handle, or online
          nickname.
        </p>

        <Button className="mt-5" onClick={generateUsername}>
          Generate Username
        </Button>

        {username && (
          <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/80 p-5">
            <p className="text-sm text-slate-400">Generated username</p>
            <div className="mt-2 break-all text-2xl font-black text-white">
              {username}
            </div>

            <Button className="mt-5" onClick={copyUsername}>
              Copy Username
            </Button>
          </div>
        )}
      </div>

      <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-2xl font-bold">Free Random Username Generator</h2>

        <p className="mt-4 text-slate-300">
          Use this free username generator to create quick username ideas for
          websites, apps, games, forums, and social media accounts. A unique
          username can help keep your online identity separate from your real
          name.
        </p>

        <h3 className="mt-6 text-xl font-semibold">
          Why use a random username?
        </h3>

        <p className="mt-3 text-slate-300">
          Reusing the same username everywhere can make it easier for people to
          link your accounts together. Creating different usernames for
          different services is a simple privacy habit.
        </p>

        <h3 className="mt-6 text-xl font-semibold">
          Is this username generator private?
        </h3>

        <p className="mt-3 text-slate-300">
          Yes. This tool runs in your browser and generates usernames locally.
          Your generated username is not uploaded to our servers.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Related privacy tools
          </h2>

          <p className="mt-3">
            Use these tools to create secure passwords, check password strength,
            and review other privacy signals.
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

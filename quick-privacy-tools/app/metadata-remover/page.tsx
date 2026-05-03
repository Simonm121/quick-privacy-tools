"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Button, Info, ToolShell } from "@/components/ui";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  function handleFile(selectedFile?: File) {
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }

  return (
    <ToolShell
      title="Metadata Remover"
      icon="📂"
      intro="Check image file details before sharing photos online. Remove hidden metadata such as file information, camera details, and location data before uploading images publicly."
    >
      <div className="rounded-3xl border-2 border-dashed border-white/15 bg-slate-900/70 p-8 text-center">
        <input
          ref={fileRef}
          hidden
          type="file"
          accept="image/*"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />

        <div className="text-5xl">📂</div>
        <p className="mt-3 font-semibold">Choose an image file</p>
        <p className="mt-2 text-sm text-slate-400">
          Your image stays in your browser. It is not uploaded to our servers.
        </p>

        <Button className="mt-5" onClick={() => fileRef.current?.click()}>
          Choose image
        </Button>
      </div>

      {file ? (
        <div className="mt-5 grid gap-5 md:grid-cols-[260px_1fr]">
          {preview && (
            <img
              src={preview}
              alt="Uploaded preview"
              className="h-64 w-full rounded-2xl object-cover"
            />
          )}

          <div className="grid gap-3">
            <Info label="File name" value={file.name} />
            <Info
              label="File size"
              value={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
            />
            <Info label="File type" value={file.type || "Unknown"} />
            <Info
              label="Privacy note"
              value="Photos can contain hidden metadata such as device, date, camera, and location information."
            />
          </div>
        </div>
      ) : null}

      <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-2xl font-bold">Free Image Metadata Remover</h2>

        <p className="mt-4 text-slate-300">
          Image files can contain hidden metadata, sometimes called EXIF data.
          This information may include the camera model, date taken, editing
          software, and in some cases GPS location data. Checking and removing
          metadata before sharing images can help protect your privacy.
        </p>

        <h3 className="mt-6 text-xl font-semibold">
          Why remove metadata from photos?
        </h3>

        <p className="mt-3 text-slate-300">
          When you upload or send an image, hidden file details may be shared
          with other people or websites. Removing image metadata is a simple
          privacy step before posting photos online, sending screenshots, or
          sharing files publicly.
        </p>

        <h3 className="mt-6 text-xl font-semibold">
          Does this tool upload my image?
        </h3>

        <p className="mt-3 text-slate-300">
          No. This tool previews your image locally in your browser. Your image
          is not uploaded to our servers.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-bold text-white">
            Related privacy tools
          </h2>

          <p className="mt-3">
            Use these tools to check your IP address, review browser fingerprint
            details, and test your VPN connection before sharing files online.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/what-is-my-ip"
            >
              What Is My IP Address
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/browser-fingerprint-test"
            >
              Browser Fingerprint Test
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/vpn-leak-test"
            >
              VPN Leak Test
            </Link>

            <Link
              className="rounded-2xl bg-white/10 p-4 font-semibold text-white hover:bg-white/15"
              href="/username-generator"
            >
              Username Generator
            </Link>
          </div>
        </div>
      </section>
    </ToolShell>
  );
}

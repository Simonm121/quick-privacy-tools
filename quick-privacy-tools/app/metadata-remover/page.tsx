"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, Info, ToolShell } from "@/components/ui";

const SUPPORTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function formatFileSize(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function buildCleanFileName(file: File) {
  const dotIndex = file.name.lastIndexOf(".");

  if (dotIndex === -1) {
    return `${file.name}-clean`;
  }

  const name = file.name.slice(0, dotIndex);
  const extension = file.name.slice(dotIndex);

  return `${name}-clean${extension}`;
}

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [cleanedUrl, setCleanedUrl] = useState("");
  const [cleanedFileName, setCleanedFileName] = useState("");
  const [cleanedSize, setCleanedSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    return () => {
      if (cleanedUrl) {
        URL.revokeObjectURL(cleanedUrl);
      }
    };
  }, [cleanedUrl]);

  function resetCleanedOutput() {
    if (cleanedUrl) {
      URL.revokeObjectURL(cleanedUrl);
    }

    setCleanedUrl("");
    setCleanedFileName("");
    setCleanedSize(0);
  }

  function handleFile(selectedFile?: File) {
    if (!selectedFile) return;

    if (!SUPPORTED_TYPES.has(selectedFile.type)) {
      setFile(null);
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview("");
      resetCleanedOutput();
      setMessage("");
      setError("Please choose a JPG, PNG, or WEBP image. GIF and other formats are not supported yet.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    resetCleanedOutput();
    setMessage("");
    setError("");
  }

  function removeMetadata() {
    if (!file) return;

    setProcessing(true);
    setMessage("");
    setError("");
    resetCleanedOutput();

    const tempUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        URL.revokeObjectURL(tempUrl);
        setProcessing(false);
        setError("Unable to prepare this image in your browser.");
        return;
      }

      context.drawImage(image, 0, 0);

      const outputType = file.type;
      const quality = outputType === "image/jpeg" || outputType === "image/webp" ? 0.92 : undefined;

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(tempUrl);
          setProcessing(false);

          if (!blob) {
            setError("Unable to create a cleaned image file. Please try another image.");
            return;
          }

          const nextUrl = URL.createObjectURL(blob);
          setCleanedUrl(nextUrl);
          setCleanedFileName(buildCleanFileName(file));
          setCleanedSize(blob.size);
          setMessage("Clean image ready. The downloaded copy is re-saved in your browser without the original metadata block.");
        },
        outputType,
        quality
      );
    };

    image.onerror = () => {
      URL.revokeObjectURL(tempUrl);
      setProcessing(false);
      setError("This image could not be processed. Please try another file.");
    };

    image.src = tempUrl;
  }

  return (
    <ToolShell
      title="Metadata Remover"
      icon="📂"
      intro="Remove hidden metadata from JPG, PNG, and WEBP images locally in your browser before sharing them online."
    >
      <div className="mb-5 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-100">
        This tool creates a cleaned copy of your image locally in your browser.
        Your file is not uploaded to our servers.
      </div>

      <div className="rounded-3xl border-2 border-dashed border-white/15 bg-slate-900/70 p-8 text-center">
        <input
          ref={fileRef}
          hidden
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />

        <div className="text-5xl">📂</div>
        <p className="mt-3 font-semibold">Choose a JPG, PNG, or WEBP image</p>
        <p className="mt-2 text-sm text-slate-400">
          The image stays on your device while a cleaned download is created.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button onClick={() => fileRef.current?.click()}>Choose image</Button>
          <Button onClick={removeMetadata} disabled={!file || processing}>
            {processing ? "Cleaning..." : "Remove Metadata"}
          </Button>
        </div>
      </div>

      {error ? (
        <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
          {message}
        </div>
      ) : null}

      {file ? (
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
            <h2 className="text-xl font-bold text-white">Original image</h2>
            {preview ? (
              <img
                src={preview}
                alt="Original upload preview"
                className="mt-4 h-64 w-full rounded-2xl object-cover"
              />
            ) : null}

            <div className="mt-4 grid gap-3">
              <Info label="File name" value={file.name} />
              <Info label="File size" value={formatFileSize(file.size)} />
              <Info label="File type" value={file.type || "Unknown"} />
              <Info
                label="Privacy note"
                value="Hidden metadata can include camera details, timestamps, editing software, and sometimes location information."
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
            <h2 className="text-xl font-bold text-white">Clean download</h2>

            {cleanedUrl ? (
              <>
                <img
                  src={cleanedUrl}
                  alt="Cleaned image preview"
                  className="mt-4 h-64 w-full rounded-2xl object-cover"
                />

                <div className="mt-4 grid gap-3">
                  <Info label="Clean file name" value={cleanedFileName} />
                  <Info label="Clean file size" value={formatFileSize(cleanedSize)} />
                  <Info label="Output type" value={file.type || "Unknown"} />
                </div>

                <a
                  href={cleanedUrl}
                  download={cleanedFileName}
                  className="mt-5 inline-flex rounded-2xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400"
                >
                  Download Clean Image
                </a>
              </>
            ) : (
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-slate-300">
                Choose an image, then click Remove Metadata to generate a clean
                download.
              </div>
            )}
          </div>
        </div>
      ) : null}

      <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <h2 className="text-2xl font-bold">Free Image Metadata Remover</h2>

        <p className="mt-4 text-slate-300">
          Image files can contain hidden metadata, sometimes called EXIF data.
          This information may include the camera model, date taken, editing
          software, and in some cases GPS location data. Removing metadata
          before sharing images can help protect your privacy.
        </p>

        <h3 className="mt-6 text-xl font-semibold">
          How this metadata remover works
        </h3>

        <p className="mt-3 text-slate-300">
          This tool re-saves your image locally in your browser and creates a
          cleaned copy for download. That process removes the original metadata
          block from the new file without uploading the image to our servers.
        </p>

        <h3 className="mt-6 text-xl font-semibold">
          What file types are supported?
        </h3>

        <p className="mt-3 text-slate-300">
          This version supports JPG, PNG, and WEBP images. Some formats, such as
          animated GIF files, need different handling and are not supported yet.
        </p>

        <h3 className="mt-6 text-xl font-semibold">
          Does this tool upload my image?
        </h3>

        <p className="mt-3 text-slate-300">
          No. The cleaning process runs locally in your browser. Your image is
          not uploaded to our servers.
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

"use client";
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
    <ToolShell title="Metadata Remover" icon="📂" intro="Preview image details before sharing. Production upgrade: strip EXIF/location data client-side.">
      <div className="rounded-3xl border-2 border-dashed border-white/15 bg-slate-900/70 p-8 text-center">
        <input ref={fileRef} hidden type="file" accept="image/*" onChange={(event) => handleFile(event.target.files?.[0])} />
        <div className="text-5xl">📂</div>
        <p className="mt-3 font-semibold">Choose an image file</p>
        <Button className="mt-5" onClick={() => fileRef.current?.click()}>Choose image</Button>
      </div>
      {file ? (
        <div className="mt-5 grid gap-5 md:grid-cols-[260px_1fr]">
          {preview && <img src={preview} alt="Uploaded preview" className="h-64 w-full rounded-2xl object-cover" />}
          <div className="grid gap-3">
            <Info label="File name" value={file.name} />
            <Info label="File size" value={`${(file.size / 1024 / 1024).toFixed(2)} MB`} />
            <Info label="File type" value={file.type || "Unknown"} />
          </div>
        </div>
      ) : null}
    </ToolShell>
  );
}

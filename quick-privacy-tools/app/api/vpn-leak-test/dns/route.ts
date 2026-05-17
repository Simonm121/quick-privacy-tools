import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASH_WS_BASE = "https://bash.ws";

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "";
  }

  return request.headers.get("x-real-ip")?.trim() || "";
}

function isValidLeakId(leakId: string) {
  return /^[a-z0-9]+$/i.test(leakId);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { step?: string; leakId?: string };

    if (body.step === "start") {
      const response = await fetch(`${BASH_WS_BASE}/id`, {
        cache: "no-store",
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: "Unable to start the DNS leak test." },
          { status: 502 }
        );
      }

      const leakId = (await response.text()).trim();

      if (!isValidLeakId(leakId)) {
        return NextResponse.json(
          { error: "The DNS leak test returned an invalid session." },
          { status: 502 }
        );
      }

      return NextResponse.json({ leakId });
    }

    if (body.step === "result") {
      const leakId = body.leakId?.trim() || "";

      if (!isValidLeakId(leakId)) {
        return NextResponse.json({ error: "Invalid DNS leak test session." }, { status: 400 });
      }

      const formData = new URLSearchParams();
      const clientIp = getClientIp(request);

      if (clientIp) {
        formData.set("ip", clientIp);
      }

      const response = await fetch(`${BASH_WS_BASE}/dnsleak/test/${leakId}?json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: "Unable to fetch DNS leak results." },
          { status: 502 }
        );
      }

      const results = await response.json();

      return NextResponse.json({
        results: Array.isArray(results) ? results : [],
      });
    }

    return NextResponse.json({ error: "Unsupported DNS leak test step." }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: "The DNS leak test could not be completed." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

/**
 * Receives floor-plan lead details and forwards them to Google Apps Script
 * (sheet + owner email). Set GOOGLE_APPS_SCRIPT_FLOOR_PLAN_URL in env.
 */
export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(payload?.name || "").trim();
  const email = String(payload?.email || "").trim();
  const phone = String(payload?.phone || "").trim();

  if (!name || !email || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name, email and phone are required" },
      { status: 400 },
    );
  }

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_FLOOR_PLAN_URL;

  if (scriptUrl) {
    try {
      const res = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: "Imperium Landmark — Floor Plan Download",
          project: "Imperium Landmark",
          timestamp: new Date().toISOString(),
        }),
        redirect: "follow",
      });

      if (!res.ok) {
        console.error("[floor-plan-lead] Apps Script HTTP", res.status);
        return NextResponse.json(
          { ok: false, error: "Failed to save lead" },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("[floor-plan-lead] Apps Script error", err);
      return NextResponse.json(
        { ok: false, error: "Failed to reach Apps Script" },
        { status: 502 },
      );
    }
  } else {
    console.warn(
      "[floor-plan-lead] GOOGLE_APPS_SCRIPT_FLOOR_PLAN_URL not set — lead accepted locally only",
      { name, email, phone },
    );
  }

  return NextResponse.json({
    ok: true,
    downloadUrl: "/floor-plans.pdf",
  });
}

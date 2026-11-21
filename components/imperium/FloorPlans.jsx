"use client";

import { useEffect, useId, useState } from "react";
import { PLANS } from "@/lib/imperium";
import { GOLD, STONE, goldGradient } from "@/components/imperium/theme";

function FeatureIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: GOLD,
    strokeWidth: "1.55",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "h-5 w-5 sm:h-7 sm:w-7",
    "aria-hidden": true,
  };

  switch (type) {
    case "square":
      return (
        <svg {...common}>
          <rect x="5" y="5" width="14" height="14" rx="1.5" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M4.5 9.2 12 5.5l7.5 3.7L12 12.9 4.5 9.2Z" />
          <path d="M4.5 12.8 12 16.5l7.5-3.7" />
          <path d="M4.5 16.2 12 19.9l7.5-3.7" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M4 20V9.5L9 6v14" />
          <path d="M9 20V8l6-3.5V20" />
          <path d="M15 20v-8l5 3V20" />
          <path d="M3.5 20h17" />
        </svg>
      );
    default:
      return null;
  }
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 4v10" strokeLinecap="round" />
      <path d="m8 10 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18h14" strokeLinecap="round" />
    </svg>
  );
}

function triggerPlanDownload(url = PLANS.downloadHref) {
  const link = document.createElement("a");
  link.href = url;
  link.download = "Imperium-Landmark-Floor-Plan.pdf";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function DownloadLeadModal({ open, onClose }) {
  const titleId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill name, email and phone.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/floor-plan-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong");
      }

      triggerPlanDownload(data.downloadUrl || PLANS.downloadHref);
      onClose();
      setName("");
      setEmail("");
      setPhone("");
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err?.message || "Could not submit. Please try again.");
    }
  };

  const field =
    "mt-1.5 h-11 w-full rounded-full border border-black/[0.08] bg-[#f7f7f7] px-4 text-[14px] outline-none transition focus:border-[var(--imp-gold)] focus:bg-white";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        aria-label="Close download form"
        onClick={onClose}
      />

      <div className="relative z-[1] w-full max-w-md overflow-hidden rounded-[1.15rem] bg-white p-5 shadow-[0_24px_60px_-28px_rgba(10,10,10,0.55)] sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD }}>
              Floor plan
            </p>
            <h3
              id={titleId}
              className="mt-1.5 text-[1.25rem] font-medium leading-tight text-[var(--imp-ink)] sm:text-[1.4rem]"
              style={{ fontFamily: "var(--imp-display)" }}
            >
              Download the plan
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#525252]">
              Share your details and we&apos;ll send the floor plan instantly.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-[var(--imp-ink)] transition hover:border-black/25"
            aria-label="Close"
          >
            <span className="relative block h-3.5 w-3.5">
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-3.5">
          <label className="block min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--imp-gold-dark)]">
              Name
            </span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={field}
              placeholder="Your name"
              autoComplete="name"
              autoFocus
            />
          </label>
          <label className="block min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--imp-gold-dark)]">
              Email
            </span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
              placeholder="Email"
              autoComplete="email"
            />
          </label>
          <label className="block min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--imp-gold-dark)]">
              Phone
            </span>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={field}
              placeholder="Phone number"
              inputMode="tel"
              autoComplete="tel"
            />
          </label>

          {status === "error" && error ? (
            <p className="text-[12px] font-medium text-red-700">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_-14px_rgba(162,132,77,0.75)] transition hover:brightness-105 disabled:cursor-wait disabled:opacity-70"
            style={{ background: goldGradient }}
          >
            <DownloadIcon />
            {status === "loading" ? "Preparing…" : "Download"}
            <span aria-hidden>→</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default function FloorPlans() {
  const [open, setOpen] = useState(false);
  const titleBefore = PLANS.title.replace(PLANS.titleAccent, "").trim();
  const planImage = PLANS.featuredImage || "/floor-plans/featured.png";

  const openForm = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <section
      id="floor-plans"
      className="relative scroll-mt-24 overflow-x-clip border-t border-[var(--imp-stone-deep)] px-4 py-9 sm:px-8 sm:py-18 lg:px-10 lg:py-22"
      style={{ backgroundColor: STONE }}
      aria-label="Floor plans"
    >
      <div className="relative z-[1] mx-auto max-w-[1500px]">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.4fr)] lg:gap-8 xl:gap-12">
          {/* Copy column */}
          <div className="min-w-0 max-w-md lg:max-w-none">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 shrink-0 sm:w-12" style={{ backgroundColor: GOLD }} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2a2a2a] sm:text-[12px]">
                {PLANS.eyebrow}
              </p>
            </div>

            <h2
              className="mt-3 text-[clamp(1.4rem,6.2vw,3.1rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--imp-ink)]"
              style={{ fontFamily: "var(--imp-display)" }}
            >
              {titleBefore}{" "}
              <em style={{ color: GOLD, fontStyle: "italic" }}>{PLANS.titleAccent}</em>
            </h2>

            <p className="mt-2.5 max-w-[30rem] text-[13px] leading-relaxed text-[#3f3f3f] sm:mt-3 sm:text-[15px]">
              {PLANS.body}
            </p>

            <ul className="mt-5 grid grid-cols-3 gap-1.5 sm:mt-10 sm:flex sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-0">
              {PLANS.features.map((feature, i) => (
                <li
                  key={feature.id}
                  className={`flex min-w-0 flex-col items-center gap-1 rounded-xl bg-white/70 px-1 py-2.5 text-center ring-1 ring-black/[0.04] sm:flex-1 sm:gap-1.5 sm:rounded-none sm:bg-transparent sm:px-4 sm:py-0 sm:ring-0 ${
                    i > 0 ? "sm:border-l" : ""
                  }`}
                  style={i > 0 ? { borderColor: `${GOLD}55` } : undefined}
                >
                  <FeatureIcon type={feature.icon} />
                  <span className="text-[9px] font-semibold leading-snug text-[var(--imp-ink)] sm:mt-2.5 sm:text-[12px]">
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={openForm}
              className="mt-9 hidden h-12 w-full max-w-[22rem] items-center justify-center gap-2.5 rounded-full px-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_-14px_rgba(162,132,77,0.75)] transition hover:brightness-105 md:inline-flex"
              style={{ background: goldGradient }}
            >
              <DownloadIcon />
              {PLANS.downloadLabel}
              <span aria-hidden>→</span>
            </button>
          </div>

          {/* Single floor plan image — wider column, no white card */}
          <div className="min-w-0 w-full lg:-ml-4 xl:-ml-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${planImage}?v=3`}
              alt="Imperium Landmark floor plan"
              className="h-auto w-full max-w-full rounded-[1rem] object-contain object-center sm:rounded-[1.25rem]"
              draggable={false}
            />
          </div>
        </div>

        <div className="mt-5 flex justify-center md:hidden">
          <button
            type="button"
            onClick={openForm}
            className="inline-flex h-11 max-w-full items-center justify-center gap-2 rounded-full px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_-14px_rgba(162,132,77,0.75)] transition hover:brightness-105"
            style={{ background: goldGradient }}
          >
            <DownloadIcon />
            Download Plan
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      <DownloadLeadModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

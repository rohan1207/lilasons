"use client";

import { useState } from "react";
import { IMPERIUM } from "@/lib/imperium";
import { goldGradient } from "@/components/imperium/theme";

const INTERESTS = [
  { id: "office", label: "Boutique office", short: "Office" },
  { id: "retail", label: "Showroom / retail", short: "Retail" },
  { id: "rooftop", label: "Rooftop / F&B", short: "Rooftop" },
  { id: "general", label: "General enquiry", short: "General" },
];

export default function ContactForm({ compact = false }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(INTERESTS[0].label);
  const [note, setNote] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const subject = encodeURIComponent(`Imperium Landmark enquiry — ${interest}`);
    const body = encodeURIComponent(
      [
        `Name: ${name.trim()}`,
        `Phone: ${phone.trim()}`,
        email.trim() ? `Email: ${email.trim()}` : null,
        `Interest: ${interest}`,
        note.trim() ? `Note: ${note.trim()}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    );
    window.location.href = `mailto:${IMPERIUM.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "mt-1.5 h-11 w-full rounded-full border border-black/[0.08] bg-[#fffdf9] px-4 text-[14px] outline-none transition focus:border-[var(--imp-gold)] sm:mt-2 sm:h-12 sm:px-5";

  return (
    <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
        <label className="block min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--imp-gold-dark)] sm:text-[11px]">
            Name
          </span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label className="block min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--imp-gold-dark)] sm:text-[11px]">
            Phone
          </span>
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={field}
            placeholder="Phone"
            inputMode="tel"
            autoComplete="tel"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--imp-gold-dark)] sm:text-[11px]">
          Email
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
          placeholder="Email (optional)"
          autoComplete="email"
        />
      </label>

      <div>
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--imp-gold-dark)] sm:mb-2 sm:text-[11px]">
          Interest
        </p>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {INTERESTS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setInterest(item.label)}
              className={`min-h-10 rounded-full px-3 py-2 text-[11px] font-semibold tracking-[0.04em] transition sm:min-h-11 sm:px-4 sm:py-2.5 sm:text-[12px] ${
                interest === item.label
                  ? "bg-[var(--imp-ink)] text-[var(--imp-gold-light)]"
                  : "border border-black/[0.08] bg-white text-[var(--imp-ink)]"
              }`}
            >
              <span className="sm:hidden">{item.short}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {!compact ? (
        <label className="block">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--imp-gold-dark)] sm:text-[11px]">
            Note
          </span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="mt-1.5 min-h-[4.5rem] w-full rounded-2xl border border-black/[0.08] bg-[#fffdf9] px-4 py-3 text-[14px] outline-none transition focus:border-[var(--imp-gold)] sm:mt-2 sm:min-h-[7.5rem] sm:px-5 sm:py-4"
            placeholder="Size, timeline…"
          />
        </label>
      ) : null}

      <button
        type="submit"
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_14px_30px_-14px_rgba(162,132,77,0.75)] transition hover:brightness-105 sm:h-12 sm:w-auto"
        style={{
          background: goldGradient,
        }}
      >
        Send Enquiry
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}

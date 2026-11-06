"use client";

import { useState } from "react";
import { BRAND } from "@/lib/brand";

const INTERESTS = ["Residential", "Commercial", "Plots", "Other"];

const fieldClass =
  "h-11 w-full rounded-full border border-neutral-300 bg-[#f7f7f7] px-4 text-[14px] text-neutral-950 outline-none transition-colors placeholder:text-neutral-500 focus:border-[var(--gold-dark)] focus:bg-white sm:h-12 sm:px-5";

export default function EnquiryStrip() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "Residential",
    note: "",
  });
  const [sent, setSent] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;

    const subject = encodeURIComponent(
      `Dream home enquiry — ${form.interest} — ${form.name.trim()}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name.trim()}`,
        `Phone: ${form.phone.trim()}`,
        `Email: ${form.email.trim() || "—"}`,
        `Looking for: ${form.interest}`,
        "",
        form.note.trim() || "Please contact me about a Lilasons home.",
      ].join("\n"),
    );
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="enquire"
      className="relative z-10 overflow-hidden border-t border-neutral-200/80 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
      aria-label="Short enquiry"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/welcome/welcome-estate.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[#f6f3ee]/72"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <div className="px-1 sm:px-2 lg:px-4">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="type-label text-[11px] text-[var(--gold-dark)] sm:text-[12px]">
                — Enquire
              </p>
              <h2 className="type-heading mt-2 text-[clamp(1.7rem,4vw,3rem)] text-neutral-950">
                Make your dream come true.
              </h2>
              <p className="mt-3 max-w-[28ch] text-[14px] leading-[1.6] text-neutral-600 sm:text-[16px]">
                Contact us now. A name and a number are enough — we will call you back.
              </p>
            </div>

            <form onSubmit={onSubmit} className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name"
                  aria-label="Your name"
                  className={fieldClass}
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Phone number"
                  aria-label="Phone number"
                  className={fieldClass}
                />
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Email, if you like"
                  aria-label="Email"
                  className={`${fieldClass} sm:col-span-2`}
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {INTERESTS.map((item) => {
                  const active = form.interest === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, interest: item }))
                      }
                      className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                        active
                          ? "border-neutral-950 bg-neutral-950 text-white"
                          : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <input
                name="note"
                type="text"
                value={form.note}
                onChange={onChange}
                placeholder="A short note — 2 BHK, plot, office…"
                aria-label="Short note"
                className={`${fieldClass} mt-3`}
              />

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="type-button btn-pill btn-shine btn-solid !h-11 !px-6 text-[11px]"
                >
                  Contact us now
                </button>
                {sent ? (
                  <p className="text-[13px] text-neutral-600">
                    Your email is opening to {BRAND.email}.
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

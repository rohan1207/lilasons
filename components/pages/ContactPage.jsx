"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import Subscribe from "@/components/home/Subscribe";
import { BRAND, CONTACT } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1];

const INTERESTS = [
  "Residential",
  "Row House",
  "Commercial",
  "Plotted Estate",
  "General enquiry",
];

const fieldClass =
  "h-12 w-full rounded-full border border-neutral-300 bg-white px-5 text-[14px] text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950";

export default function ContactPage() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${BRAND.mapsQuery}`;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: INTERESTS[0],
    message: "",
  });
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    const subject = encodeURIComponent(
      `Website enquiry — ${form.interest} — ${form.name.trim()}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name.trim()}`,
        `Email: ${form.email.trim()}`,
        `Phone: ${form.phone.trim() || "—"}`,
        `Interest: ${form.interest}`,
        "",
        form.message.trim(),
      ].join("\n"),
    );
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <PageShell>
      <section className="bg-white pt-28 sm:pt-32">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 pb-16 sm:px-8 sm:pb-20 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            className="lg:col-span-5"
          >
            <p className="type-label mb-3 text-[11px] text-neutral-400">
              — Get in touch
            </p>
            <h1 className="type-heading text-[40px] uppercase leading-[1.02] tracking-[-0.04em] text-neutral-950 sm:text-[56px]">
              {CONTACT.title}
            </h1>
            <p className="mt-4 text-[18px] font-medium tracking-[-0.015em] text-neutral-700">
              {CONTACT.intro}
            </p>
            <p className="type-body mt-2 max-w-[40ch] text-[15px] text-neutral-600">
              {CONTACT.body}
            </p>

            <div className="mt-10 space-y-6 rounded-2xl border border-neutral-200 bg-[#f7f7f7] p-6 sm:p-7">
              <div>
                <h2 className="type-heading text-[18px] uppercase tracking-[-0.025em] text-neutral-950">
                  {BRAND.name}
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">
                  {BRAND.address.full}
                </p>
              </div>

              <div className="space-y-2 text-[14px]">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="block font-medium text-neutral-800 transition-colors hover:text-neutral-950"
                >
                  {BRAND.email}
                </a>
                {BRAND.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="block font-medium text-neutral-800 transition-colors hover:text-neutral-950"
                  >
                    {phone}
                  </a>
                ))}
              </div>

              <div>
                <p className="type-label mb-1 text-[10px] text-neutral-400">
                  Hours
                </p>
                <p className="text-[14px] font-medium text-neutral-800">
                  {BRAND.hours.days}
                </p>
                <p className="text-[14px] text-neutral-600">{BRAND.hours.time}</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={BRAND.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="type-button btn-pill btn-shine inline-flex h-11 items-center justify-center bg-neutral-950 px-6 text-[11px] text-white transition-opacity hover:opacity-85"
                >
                  {CONTACT.whatsappLabel}
                </a>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="type-button btn-pill btn-shine inline-flex h-11 items-center justify-center border border-neutral-900 px-6 text-[11px] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
                >
                  Get directions
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-neutral-200 bg-[#f7f7f7] p-6 sm:p-8 lg:p-10">
              <p className="type-label mb-2 text-[11px] text-neutral-400">
                — Enquiry
              </p>
              <h2 className="type-heading text-[24px] uppercase tracking-[-0.03em] text-neutral-950 sm:text-[28px]">
                Send us a message
              </h2>
              <p className="type-body mt-2 max-w-[42ch] text-[14px] text-neutral-600">
                Tell us what you&apos;re looking for — we&apos;ll get back
                shortly during business hours.
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500"
                    >
                      Full name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="Your name"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500"
                    >
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="+91"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                    Interest
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map((item) => {
                      const active = form.interest === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({ ...prev, interest: item }))
                          }
                          className={`chip rounded-full border px-4 py-2 text-[12px] font-medium transition-colors ${
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
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={onChange}
                    placeholder="Share a few details about your requirement…"
                    className="w-full resize-y rounded-[1.25rem] border border-neutral-300 bg-white px-5 py-4 text-[14px] leading-relaxed text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="type-button btn-pill btn-shine inline-flex h-12 items-center justify-center bg-neutral-950 px-8 text-[11px] text-white transition-opacity hover:opacity-85"
                  >
                    Send enquiry
                  </button>
                  {sent && (
                    <p className="text-[13px] text-neutral-500">
                      Opening your email client to reach {BRAND.email}…
                    </p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Subscribe />
    </PageShell>
  );
}

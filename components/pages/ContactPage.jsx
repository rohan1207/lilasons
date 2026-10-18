"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
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
  "h-12 w-full rounded-full border border-neutral-300 bg-white px-5 text-[14px] text-neutral-950 outline-none transition-colors placeholder:text-neutral-700 focus:border-neutral-950";

function FadeUp({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

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
      {/* Full-viewport map hero */}
      <section className="relative flex h-dvh max-h-dvh min-h-dvh overflow-hidden bg-neutral-200">
        <iframe
          title="Lilasons Developers office location"
          src={CONTACT.mapEmbed}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />

        {/* Soft scrim so type stays readable over the map */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/15"
          aria-hidden
        />

        <div className="pointer-events-none relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col justify-end px-5 pb-12 pt-[calc(5rem+1.5rem)] sm:px-8 sm:pb-14 sm:pt-[calc(6rem+1.75rem)] lg:px-12 lg:pb-16">
          <div className="pointer-events-auto max-w-xl">
            <FadeUp delay={0.05}>
              <p className="type-label mb-3 text-[11px] text-white/75 sm:mb-4 sm:text-[12px]">
                {CONTACT.eyebrow}
              </p>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="type-kicker mb-3 text-[12px] text-white/80 sm:text-[13px]">
                {CONTACT.kicker}
              </p>
            </FadeUp>
            <FadeUp delay={0.18}>
              <h1 className="type-heading text-[clamp(2.5rem,7vw,5.5rem)] text-white">
                {CONTACT.title}
              </h1>
            </FadeUp>
            <FadeUp delay={0.26}>
              <p
                className="mt-4 max-w-[40ch] text-[14px] font-medium leading-[1.65] text-white sm:mt-5 sm:text-[16px]"
                style={{ textShadow: "0 1px 16px rgba(0,0,0,0.45)" }}
              >
                {CONTACT.heroBody}
              </p>
            </FadeUp>
            <FadeUp delay={0.34} className="mt-7 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="type-button btn-pill btn-shine btn-solid !h-10 !px-5 text-[10px] !bg-white !text-neutral-950 hover:!opacity-90 sm:!h-12 sm:!px-7 sm:text-[11px]"
              >
                Get directions
              </a>
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="type-button btn-pill btn-shine btn-outline !h-10 !px-5 text-[10px] !border-white/50 !text-white hover:!border-white hover:!bg-white hover:!text-neutral-950 sm:!h-12 sm:!px-7 sm:text-[11px]"
              >
                {CONTACT.whatsappLabel}
              </a>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Details + form */}
      <section className="relative z-10 border-t border-neutral-200/80 bg-[#f7f7f7]">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-24">
          <FadeUp className="lg:col-span-5">
            <p className="type-label mb-2 text-[11px] sm:text-[12px]">
              — Office
            </p>
            <h2 className="type-heading text-[clamp(1.75rem,3.5vw,2.75rem)] text-neutral-950">
              {CONTACT.intro}
            </h2>
            <p className="type-body mt-4 max-w-[40ch] text-[14px] sm:text-[15px]">
              {CONTACT.body}
            </p>

            <div className="mt-8 space-y-6 border-t border-neutral-200 pt-8">
              <div>
                <p className="type-label text-[10px]">Headquarters</p>
                <p className="mt-2 text-[15px] font-medium tracking-[-0.02em] text-neutral-950">
                  {BRAND.name}
                </p>
                <p className="type-body mt-1 max-w-[34ch] text-[13px] sm:text-[14px]">
                  {BRAND.address.full}
                </p>
              </div>

              <div>
                <p className="type-label text-[10px]">Reach us</p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="mt-2 block text-[14px] font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-950"
                >
                  {BRAND.email}
                </a>
                {BRAND.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="mt-1 block text-[14px] font-medium text-neutral-800 transition-colors hover:text-neutral-950"
                  >
                    {phone}
                  </a>
                ))}
              </div>

              <div>
                <p className="type-label text-[10px]">Hours</p>
                <p className="mt-2 text-[15px] font-medium text-neutral-950">
                  {BRAND.hours.days}
                </p>
                <p className="type-body mt-0.5 text-[13px]">{BRAND.hours.time}</p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.08} className="lg:col-span-7">
            <div className="rounded-[1.35rem] border border-neutral-200 bg-white p-6 sm:p-8 lg:p-10">
              <p className="type-label mb-2 text-[11px] sm:text-[12px]">
                — Enquiry
              </p>
              <h2 className="type-heading text-[24px] text-neutral-950 sm:text-[28px]">
                {CONTACT.formTitle}
              </h2>
              <p className="type-body mt-2 max-w-[42ch] text-[14px]">
                {CONTACT.formBody}
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="type-label mb-2 block text-[10px]"
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
                      className="type-label mb-2 block text-[10px]"
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
                    className="type-label mb-2 block text-[10px]"
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
                  <p className="type-label mb-2 text-[10px]">Interest</p>
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
                          className={`chip rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors sm:px-4 sm:py-2 sm:text-[12px] ${
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
                    className="type-label mb-2 block text-[10px]"
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
                    className="w-full resize-y rounded-[1.25rem] border border-neutral-300 bg-white px-5 py-4 text-[14px] leading-relaxed text-neutral-950 outline-none transition-colors placeholder:text-neutral-700 focus:border-neutral-950"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="type-button btn-pill btn-shine btn-solid w-full sm:w-auto"
                  >
                    Send enquiry
                  </button>
                  {sent && (
                    <p className="text-[13px] text-neutral-700">
                      Opening your email client to reach {BRAND.email}…
                    </p>
                  )}
                </div>
              </form>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Quick links */}
      <section className="relative z-10 border-t border-neutral-200/80 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p className="type-body max-w-[40ch] text-[14px]">
            Looking for a specific development? Browse projects or tour a
            walkthrough first.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className="type-button btn-pill btn-shine btn-outline">
              Our Projects
            </Link>
            <Link href="/walkthrough" className="type-button btn-pill btn-shine btn-outline">
              Walkthroughs
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

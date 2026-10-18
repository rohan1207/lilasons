"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import { ABOUT, BRAND, BRANDS, RECOGNITION } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1];

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

export default function CompanyPage() {
  const [timelineHover, setTimelineHover] = useState(0);
  const activeMilestone = ABOUT.milestones[timelineHover] ?? ABOUT.milestones[0];
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${BRAND.mapsQuery}`;

  return (
    <PageShell>
      {/* ——— Hero (full viewport; fixed navbar overlays top) ——— */}
      <section className="relative flex h-dvh max-h-dvh min-h-dvh overflow-hidden bg-neutral-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ABOUT.heroImage}
          alt="Lilasons Developers — About Us"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col justify-end px-5 pb-12 pt-[calc(5rem+1.5rem)] sm:px-8 sm:pb-14 sm:pt-[calc(6rem+1.75rem)] lg:px-12 lg:pb-16">
          <FadeUp delay={0.05}>
            <p className="type-label mb-3 text-[11px] text-white/70 sm:mb-4 sm:text-[12px]">
              {ABOUT.eyebrow}
            </p>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="type-kicker mb-3 text-[12px] text-white/75 sm:text-[13px]">
              {ABOUT.heroKicker}
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <h1 className="type-heading whitespace-pre-line text-[clamp(2.5rem,7vw,5.5rem)] text-white">
              {ABOUT.heroTitle}
            </h1>
          </FadeUp>
          <FadeUp delay={0.26}>
            <p
              className="mt-4 max-w-[42ch] text-[14px] font-medium leading-[1.65] text-white sm:mt-5 sm:text-[16px]"
              style={{ textShadow: "0 1px 16px rgba(0,0,0,0.45)" }}
            >
              {ABOUT.heroBody}
            </p>
          </FadeUp>
          <FadeUp delay={0.34} className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            <Link
              href={ABOUT.heroCtaHref}
              className="type-button btn-pill btn-shine btn-solid !bg-white !text-neutral-950 hover:!opacity-90"
            >
              {ABOUT.heroCta}
            </Link>
            <Link
              href={ABOUT.heroCtaSecondaryHref}
              className="type-button btn-pill btn-shine btn-outline !border-white/50 !text-white hover:!border-white hover:!bg-white hover:!text-neutral-950"
            >
              {ABOUT.heroCtaSecondary}
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ——— Story — structured chapters, not a wall of text ——— */}
      <section className="relative z-10 border-t border-neutral-200/80 bg-[#f4f4f2]">
        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <FadeUp className="max-w-xl">
              <p className="type-label mb-2 text-[11px] sm:mb-3 sm:text-[12px]">
                {ABOUT.storyEyebrow}
              </p>
              <h2 className="type-heading whitespace-pre-line text-[clamp(1.85rem,3.8vw,3.15rem)] text-neutral-950">
                {ABOUT.storyHeading}
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="type-kicker max-w-[34ch] text-[12px] sm:text-[13px] lg:pb-1">
                {ABOUT.storyLead}
              </p>
            </FadeUp>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 lg:mt-14 lg:grid-cols-12 lg:gap-5">
            <FadeUp delay={0.06} className="relative min-h-[280px] overflow-hidden bg-neutral-900 sm:min-h-[340px] lg:col-span-5 lg:min-h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ABOUT.storyImage}
                alt="Lilasons Developers landmark project"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p className="type-heading absolute inset-x-0 bottom-0 p-6 text-[20px] text-white sm:p-7 sm:text-[24px]">
                {ABOUT.storyQuote}
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-neutral-300/90 lg:border lg:border-neutral-300/90 lg:bg-white">
              {ABOUT.storyChapters.map((chapter, i) => (
                <FadeUp
                  key={chapter.index}
                  delay={0.1 + i * 0.06}
                  className="flex flex-col gap-3 border border-neutral-300/90 bg-white p-5 sm:border-0 sm:p-6 lg:flex-row lg:items-start lg:gap-8 lg:p-7"
                >
                  <span className="type-label shrink-0 text-[11px] text-neutral-400">
                    {chapter.index}
                  </span>
                  <div className="min-w-0">
                    <h3 className="type-heading text-[18px] text-neutral-950 sm:text-[20px] lg:text-[22px]">
                      {chapter.title}
                    </h3>
                    <p className="type-body mt-2 max-w-[44ch] text-[13px] sm:text-[14px]">
                      {chapter.body}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— Stats ——— */}
      <section className="relative z-10 border-t border-neutral-200/80 bg-white">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 divide-x divide-y divide-neutral-200 sm:grid-cols-4 sm:divide-y-0">
          {ABOUT.stats.map((stat, i) => (
            <FadeUp
              key={stat.label}
              delay={i * 0.06}
              className="flex flex-col items-start px-5 py-8 sm:px-8 sm:py-10 lg:px-10"
            >
              <p className="type-stat text-[clamp(1.75rem,3.5vw,2.75rem)] text-neutral-950">
                {stat.value}
              </p>
              <p className="type-label mt-2 text-[10px] sm:text-[11px]">{stat.label}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ——— Group companies — proper image cards ——— */}
      <section className="relative z-10 overflow-hidden border-t border-neutral-200/80 bg-[#f7f7f7]">
        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <FadeUp>
              <p className="type-label mb-2 text-[11px] sm:text-[12px]">
                {ABOUT.brandsEyebrow}
              </p>
              <h2 className="type-heading whitespace-pre-line text-[clamp(1.85rem,4vw,3.25rem)] text-neutral-950">
                {ABOUT.brandsTitle}
              </h2>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p className="type-body max-w-[36ch] text-[14px] sm:text-[15px]">
                {ABOUT.brandsBody}
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
            {BRANDS.map((item, i) => (
              <FadeUp
                key={item.name}
                delay={i * 0.08}
                className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-neutral-200 bg-white shadow-[0_18px_40px_-32px_rgba(0,0,0,0.35)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    draggable={false}
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
                  <p className="type-label text-[10px] text-neutral-400 sm:text-[11px]">
                    {String(i + 1).padStart(2, "0")} · {item.role}
                  </p>
                  <h3 className="type-heading mt-2 text-[18px] text-neutral-950 sm:text-[20px] lg:text-[22px]">
                    {item.name}
                  </h3>
                  <p className="type-body mt-3 flex-1 text-[13px] sm:text-[14px]">
                    {item.body}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.focus.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-neutral-200 bg-[#f7f7f7] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-600"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Philosophy ——— */}
      <section className="relative z-10 border-t border-neutral-200/80 bg-[#f4f4f2]">
        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <FadeUp className="mb-10 max-w-xl sm:mb-12">
            <p className="type-label mb-2 text-[11px] sm:mb-3 sm:text-[12px]">
              {ABOUT.philosophyEyebrow}
            </p>
            <h2 className="type-heading whitespace-pre-line text-[clamp(1.85rem,3.8vw,3.15rem)] text-neutral-950">
              {ABOUT.philosophyTitle}
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-neutral-300/90 bg-neutral-300/90 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT.values.map((value, i) => (
              <FadeUp
                key={value.title}
                delay={i * 0.06}
                className="group bg-[#f4f4f2] p-6 transition-colors duration-400 hover:bg-white sm:p-8"
              >
                <p className="type-label text-[10px] text-neutral-400">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="type-heading mt-4 text-[18px] text-neutral-950 sm:text-[20px]">
                  {value.title}
                </h3>
                <p className="type-body mt-3 text-[13px] sm:text-[14px]">{value.body}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Timeline (hover → floating image) ——— */}
      <section className="relative z-10 border-t border-neutral-200/80 bg-white">
        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <FadeUp className="mb-10 sm:mb-12">
            <p className="type-label mb-2 text-[11px] sm:mb-3 sm:text-[12px]">
              {ABOUT.timelineEyebrow}
            </p>
            <h2 className="type-heading whitespace-pre-line text-[clamp(1.85rem,3.8vw,3.15rem)] text-neutral-950">
              {ABOUT.timelineTitle}
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 lg:items-start">
            <ol
              className="relative border-t border-neutral-200 lg:col-span-7"
              onMouseLeave={() => setTimelineHover(0)}
            >
              {ABOUT.milestones.map((m, i) => {
                const on = timelineHover === i;
                return (
                  <li key={m.year}>
                    <button
                      type="button"
                      onMouseEnter={() => setTimelineHover(i)}
                      onFocus={() => setTimelineHover(i)}
                      className={`grid w-full grid-cols-1 gap-2 border-b border-neutral-200 py-6 text-left transition-colors duration-300 sm:grid-cols-[140px_1fr] sm:items-baseline sm:gap-10 sm:py-7 lg:grid-cols-[160px_1fr] ${
                        on ? "bg-[#f7f7f7]" : "bg-transparent hover:bg-[#fafafa]"
                      }`}
                    >
                      <span
                        className={`type-stat text-[clamp(1.35rem,2.4vw,1.85rem)] transition-colors ${
                          on ? "text-neutral-950" : "text-neutral-400"
                        }`}
                      >
                        {m.year}
                      </span>
                      <span
                        className={`type-body text-[14px] transition-colors sm:text-[15px] ${
                          on ? "text-neutral-800" : "text-neutral-500"
                        }`}
                      >
                        {m.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="relative hidden min-h-[420px] lg:col-span-5 lg:block">
              <div className="sticky top-28 flex min-h-[420px] items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.figure
                    key={activeMilestone.year}
                    initial={{ opacity: 0, y: 18, scale: 0.96, rotate: -2 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: 1.5 }}
                    exit={{ opacity: 0, y: -12, scale: 0.97, rotate: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="relative w-[min(100%,280px)] overflow-hidden rounded-[1.25rem] bg-neutral-200 shadow-[0_28px_60px_-28px_rgba(0,0,0,0.45)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeMilestone.image}
                      alt={activeMilestone.alt}
                      className="aspect-[3/4] h-auto w-full object-cover"
                      draggable={false}
                    />
                    <figcaption className="type-label border-t border-neutral-200 bg-white px-4 py-3 text-[10px] text-neutral-500">
                      {activeMilestone.year}
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile preview */}
            <div className="lg:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`m-${activeMilestone.year}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="mx-auto w-[min(100%,220px)] overflow-hidden rounded-[1.1rem] bg-neutral-200 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.4)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeMilestone.image}
                    alt={activeMilestone.alt}
                    className="aspect-[3/4] w-full object-cover"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Design + Cares ——— */}
      <section className="relative z-10 border-t border-neutral-200/80 bg-[#f4f4f2]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-4 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-5 lg:px-12 lg:py-24">
          <FadeUp className="relative min-h-[420px] overflow-hidden bg-neutral-900 sm:min-h-[480px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ABOUT.sideImage}
              alt={ABOUT.designTitle}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
              <p className="type-label mb-2 text-[11px] text-white/70">— Design</p>
              <h3 className="type-heading text-[28px] text-white sm:text-[34px]">
                {ABOUT.designTitle}
              </h3>
              <p className="type-body mt-3 max-w-[36ch] text-[14px] text-white/75">
                {ABOUT.designBody}
              </p>
              <Link
                href="/projects"
                className="type-button btn-pill btn-shine btn-solid mt-6 !bg-white !text-neutral-950 hover:!opacity-90"
              >
                View Projects
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.08} className="flex min-h-[420px] flex-col justify-between border border-neutral-300/90 bg-white p-6 sm:min-h-[480px] sm:p-8 lg:p-10">
            <div>
              <p className="type-label mb-2 text-[11px] sm:text-[12px]">— Community</p>
              <h3 className="type-heading text-[28px] text-neutral-950 sm:text-[34px]">
                {ABOUT.caresTitle}
              </h3>
              <p className="type-body mt-4 max-w-[42ch] text-[14px] sm:text-[15px]">
                {ABOUT.caresBody}
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-neutral-200 pt-6">
              {RECOGNITION.items.slice(0, 3).map((item) => (
                <div key={item.alt} className="flex flex-col items-center text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.logo}
                    alt={item.alt}
                    className="h-8 w-auto object-contain opacity-70 sm:h-9"
                    draggable={false}
                  />
                  <p className="type-label mt-2 text-[8px] sm:text-[9px]">{item.text}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ——— Presence ——— */}
      <section className="relative z-10 border-t border-neutral-200/80 bg-white">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-12 lg:py-24">
          <FadeUp className="lg:col-span-5">
            <p className="type-label mb-2 text-[11px] sm:mb-3 sm:text-[12px]">
              {ABOUT.presenceEyebrow}
            </p>
            <h2 className="type-heading text-[clamp(1.85rem,3.8vw,3.15rem)] text-neutral-950">
              {ABOUT.presenceTitle}
            </h2>
            <p className="type-body mt-4 max-w-[40ch] text-[14px] sm:text-[15px]">
              {ABOUT.presenceBody}
            </p>

            <div className="mt-8 space-y-5 border-t border-neutral-200 pt-6">
              <div>
                <p className="type-label text-[10px]">Headquarters</p>
                <p className="mt-1 text-[15px] font-medium tracking-[-0.02em] text-neutral-950 sm:text-[16px]">
                  {BRAND.address.short}
                </p>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="type-body mt-1 block max-w-[34ch] text-[13px] transition-colors hover:text-neutral-800"
                >
                  {BRAND.address.full}
                </a>
              </div>
              <div>
                <p className="type-label text-[10px]">Hours</p>
                <p className="mt-1 text-[15px] font-medium tracking-[-0.02em] text-neutral-950">
                  {BRAND.hours.days}
                </p>
                <p className="type-body mt-0.5 text-[13px]">{BRAND.hours.time}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="type-button btn-pill btn-shine btn-solid">
                Get In Touch
              </Link>
              <Link href="/projects" className="type-button btn-pill btn-shine btn-outline">
                View Projects
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="relative min-h-[360px] lg:col-span-7 lg:min-h-[520px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ABOUT.presenceImage}
              alt="Lilasons Developers in Aurangabad"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </FadeUp>
        </div>
      </section>
    </PageShell>
  );
}

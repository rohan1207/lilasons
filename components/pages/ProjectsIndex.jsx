"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import Reveal from "@/components/layout/Reveal";
import SectionEyebrow from "@/components/layout/SectionEyebrow";
import { PROJECTS, PROJECT_CATEGORIES, PROJECTS_PAGE } from "@/lib/projects";

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

export default function ProjectsIndex() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === active),
    [active],
  );

  return (
    <PageShell>
      {/* Hero — same pattern as About Us */}
      <section className="relative flex h-dvh max-h-dvh min-h-dvh overflow-hidden bg-neutral-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PROJECTS_PAGE.heroImage}
          alt="Lilasons Developers projects"
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
              {PROJECTS_PAGE.eyebrow}
            </p>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="type-kicker mb-3 text-[12px] text-white/75 sm:text-[13px]">
              {PROJECTS_PAGE.kicker}
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <h1 className="type-heading whitespace-pre-line text-[clamp(2.5rem,7vw,5.5rem)] text-white">
              {PROJECTS_PAGE.title}
            </h1>
          </FadeUp>
          <FadeUp delay={0.26}>
            <p
              className="mt-4 max-w-[42ch] text-[14px] font-medium leading-[1.65] text-white sm:mt-5 sm:text-[16px]"
              style={{ textShadow: "0 1px 16px rgba(0,0,0,0.45)" }}
            >
              {PROJECTS_PAGE.body}
            </p>
          </FadeUp>
          <FadeUp delay={0.34} className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            <Link
              href={PROJECTS_PAGE.ctaHref}
              className="type-button btn-pill btn-shine btn-solid !bg-white !text-neutral-950 hover:!opacity-90"
            >
              {PROJECTS_PAGE.cta}
            </Link>
            <Link
              href={PROJECTS_PAGE.ctaSecondaryHref}
              className="type-button btn-pill btn-shine btn-outline !border-white/50 !text-white hover:!border-white hover:!bg-white hover:!text-neutral-950"
            >
              {PROJECTS_PAGE.ctaSecondary}
            </Link>
          </FadeUp>
        </div>
      </section>

      <section className="border-t border-black/10 bg-white px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionEyebrow className="mb-4">Projects</SectionEyebrow>
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                <span className="type-stat">{filtered.length}</span>{" "}
                {active === "All" ? "Projects" : active}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {PROJECT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                    active === cat
                      ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                      : "border-black/20 bg-transparent text-[#0a0a0a] hover:border-black/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div
            layout
            className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link href={project.href} className="group block cursor-pointer">
                    <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 lg:aspect-[4/5]">
                      <motion.img
                        src={project.gallery?.[0] || project.image}
                        alt={project.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.06 }}
                        transition={{
                          duration: 0.7,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.08]" />
                      <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/80">
                          {project.locationLabel}
                          {project.rera ? ` — RERA ${project.rera}` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 md:pt-5">
                      <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-400 md:mb-2 md:text-[10px] md:tracking-[0.22em]">
                        {project.category}
                      </p>
                      <h3 className="mb-1 text-sm font-medium leading-snug tracking-[-0.02em] text-[#0a0a0a] md:mb-2 md:text-[clamp(1.1rem,1.8vw,1.35rem)]">
                        {project.title}
                      </h3>
                      <p className="hidden line-clamp-2 text-sm leading-relaxed text-neutral-500 md:block">
                        {project.summary}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#f5f5f3] px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-14">
        <Reveal className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <SectionEyebrow className="mb-4">Visit Us</SectionEyebrow>
            <h2 className="type-heading text-[clamp(1.75rem,4vw,2.75rem)] text-[#0a0a0a]">
              Looking for your next home?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              Walk through our developments across Aurangabad — residences, row
              houses, commercial spaces, and plotted estates.
            </p>
          </div>
          <Link
            href="/contact"
            className="type-button btn-pill btn-shine btn-outline"
          >
            <span aria-hidden>↗</span>
            Start A Conversation
          </Link>
        </Reveal>
      </section>
    </PageShell>
  );
}

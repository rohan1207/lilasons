"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/layout/Reveal";
import SectionEyebrow from "@/components/layout/SectionEyebrow";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/projects";

const HERO_IMAGE =
  PROJECTS[0]?.gallery?.[0] ||
  PROJECTS[0]?.image ||
  "/welcome/welcome-aurangabad.jpg";

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
      <PageHero
        eyebrow="Portfolio"
        title="Our Projects"
        subtitle="Residential towers, row houses, commercial spaces, and plotted estates — each crafted by Lilasons Developers across Aurangabad."
        image={HERO_IMAGE}
      />

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
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
              Looking for your next home?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              Walk through our developments across Aurangabad — residences, row
              houses, commercial spaces, and plotted estates.
            </p>
          </div>
          <Link
            href="/contact"
            className="type-button btn-pill btn-shine inline-flex h-11 items-center gap-2 border border-neutral-900 bg-transparent px-6 text-[11px] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
          >
            <span aria-hidden>↗</span>
            Start A Conversation
          </Link>
        </Reveal>
      </section>
    </PageShell>
  );
}

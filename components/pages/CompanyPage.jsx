"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import PageHero from "@/components/layout/PageHero";
import Reveal, { RevealStagger, revealItem } from "@/components/layout/Reveal";
import RevealClip from "@/components/layout/RevealClip";
import SectionEyebrow from "@/components/layout/SectionEyebrow";
import AboutStatsStrip from "@/components/about/AboutStatsStrip";
import {
  ScrollRevealHeading,
  ScrollRevealParagraph,
} from "@/components/about/ScrollRevealText";
import { ABOUT, BRAND, BRANDS } from "@/lib/brand";

const timelineItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CompanyPage() {
  const storyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const storyLines = ABOUT.storyHeading.split("\n");

  return (
    <PageShell>
      <PageHero
        eyebrow="Our Company"
        title={ABOUT.title}
        subtitle={ABOUT.subtitle}
        image={ABOUT.heroImage}
      />

      {/* Story */}
      <section
        ref={storyRef}
        className="border-t border-black/10 bg-white px-5 py-16 sm:px-8 md:px-12 md:py-28 lg:px-14"
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionEyebrow className="mb-5">Our Story</SectionEyebrow>
              <RevealClip delay={0.05}>
                <p
                  className="max-w-lg text-[clamp(1.35rem,2.4vw,2rem)] font-light leading-[1.22] tracking-[-0.025em] text-[#0a0a0a]"
                  style={{ fontWeight: 300 }}
                >
                  {ABOUT.storyLead}
                </p>
              </RevealClip>
            </Reveal>

            <div className="flex flex-col gap-5">
              <ScrollRevealHeading delay={0.1}>
                <h2 className="type-heading text-[clamp(1.5rem,3vw,2.25rem)] text-[#0a0a0a]">
                  {storyLines.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h2>
              </ScrollRevealHeading>

              <motion.div
                className="relative aspect-[4/3] overflow-hidden bg-neutral-100 sm:aspect-[16/11]"
                style={{ y: imageY }}
              >
                <motion.img
                  src={ABOUT.storyImage}
                  alt="Lilasons Developers landmark project"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-8 lg:pt-4">
            {ABOUT.paragraphs.map((paragraph, i) => (
              <ScrollRevealParagraph
                key={paragraph.slice(0, 48)}
                text={paragraph}
                className="text-[15px] leading-[1.9] text-neutral-600 md:text-base md:leading-[1.85]"
                delay={i * 0.12}
              />
            ))}
          </div>
        </div>
      </section>

      <AboutStatsStrip stats={ABOUT.stats} />

      {/* Group companies — mirrors leadership card grid */}
      <section className="border-t border-black/10 bg-white px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="mb-12 md:mb-16">
            <SectionEyebrow className="mb-4">Our Brands</SectionEyebrow>
            <RevealClip>
              <h2 className="type-heading max-w-2xl text-[clamp(1.75rem,3.8vw,3rem)] text-[#0a0a0a]">
                Group companies
              </h2>
            </RevealClip>
            <motion.p
              className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base md:leading-[1.75]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Three specialised wings under the Lilasons umbrella — residential
              schemes, homes in upcoming corridors, and commercial sale & leasing.
            </motion.p>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6 md:gap-8">
            {BRANDS.map((brand, i) => (
              <motion.article
                key={brand.name}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-[#fafaf9]"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.85,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-8">
                  <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                    {brand.role}
                  </p>
                  <h3 className="mb-3 text-base font-medium leading-snug tracking-[-0.02em] text-[#0a0a0a] md:text-lg lg:text-xl">
                    {brand.name}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-[1.75] text-neutral-600">
                    {brand.body}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {brand.focus.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-neutral-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-t border-black/10 bg-[#f5f5f3] px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-12 md:mb-14">
            <SectionEyebrow className="mb-4">Philosophy</SectionEyebrow>
            <RevealClip>
              <h2 className="type-heading max-w-lg text-[clamp(1.75rem,3.8vw,3rem)] text-[#0a0a0a]">
                How we work
              </h2>
            </RevealClip>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT.values.map((value) => (
              <motion.div
                key={value.title}
                variants={revealItem}
                className="group bg-[#f5f5f3] p-6 transition-colors duration-500 hover:bg-white sm:p-8"
              >
                <span className="mb-4 block h-px w-6 bg-[#0a0a0a] transition-all duration-500 group-hover:w-10 md:mb-5" />
                <h3 className="mb-2 text-sm font-medium tracking-[-0.02em] text-[#0a0a0a] md:text-base">
                  {value.title}
                </h3>
                <p className="text-xs leading-relaxed text-neutral-600 md:text-sm">
                  {value.body}
                </p>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-black/10 bg-white px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-12">
            <SectionEyebrow className="mb-4">Timeline</SectionEyebrow>
            <RevealClip>
              <h2 className="type-heading text-[clamp(1.75rem,3.8vw,3rem)] text-[#0a0a0a]">
                Decades of practice
              </h2>
            </RevealClip>
          </Reveal>

          <div className="relative">
            <div className="absolute left-0 top-0 hidden h-full w-px bg-black/10 md:left-8 md:block" />
            <RevealStagger className="flex flex-col gap-8 md:gap-10">
              {ABOUT.milestones.map((m) => (
                <motion.div
                  key={m.year}
                  variants={timelineItem}
                  className="grid grid-cols-1 gap-2 md:grid-cols-[140px_1fr] md:gap-12 md:pl-16"
                >
                  <p className="type-stat text-[clamp(1.35rem,2.6vw,2rem)] text-[#0a0a0a]">
                    {m.year}
                  </p>
                  <p className="self-center text-sm text-neutral-600 md:text-base">
                    {m.label}
                  </p>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Presence / office */}
      <section className="border-t border-black/10 bg-[#f5f5f3] px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionEyebrow className="mb-4">Presence</SectionEyebrow>
              <RevealClip>
                <h2 className="type-heading mb-6 text-[clamp(1.75rem,3.8vw,3rem)] text-[#0a0a0a]">
                  Aurangabad
                </h2>
              </RevealClip>
              <motion.p
                className="mb-8 max-w-md text-sm leading-relaxed text-neutral-600 md:text-base"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Based in Chhatrapati Sambhaji Nagar, Lilasons Developers crafts
                residences, commercial destinations, and plotted estates for the
                city we call home.
              </motion.p>
              <div className="space-y-5">
                <div className="border-t border-black/10 pt-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                    Headquarters
                  </p>
                  <p className="mt-1 text-lg font-medium tracking-[-0.02em] text-[#0a0a0a] md:text-xl">
                    {BRAND.address.short}
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-600">
                    {BRAND.address.full}
                  </p>
                </div>
                <div className="border-t border-black/10 pt-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                    Hours
                  </p>
                  <p className="mt-1 text-lg font-medium tracking-[-0.02em] text-[#0a0a0a] md:text-xl">
                    {BRAND.hours.days}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">{BRAND.hours.time}</p>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="type-button btn-pill btn-shine btn-solid"
                >
                  <span aria-hidden>↗</span>
                  Get In Touch
                </Link>
                <Link
                  href="/projects"
                  className="type-button btn-pill btn-shine btn-outline"
                >
                  View Projects
                </Link>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 lg:aspect-[5/4]">
                <motion.img
                  src={ABOUT.presenceImage}
                  alt="Lilasons Developers in Aurangabad"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

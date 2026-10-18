"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import { BRAND, PROJECTS, WALKTHROUGH_PAGE, WALKTHROUGHS } from "@/lib/brand";

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

export default function WalkthroughPage() {
  const moreProjects = PROJECTS.filter(
    (p) => !WALKTHROUGHS.some((w) => w.projectHref === p.href),
  ).slice(0, 3);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative flex h-dvh max-h-dvh min-h-dvh overflow-hidden bg-neutral-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={WALKTHROUGH_PAGE.heroImage}
          alt="Lilasons Developers walkthroughs"
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
              {WALKTHROUGH_PAGE.eyebrow}
            </p>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="type-kicker mb-3 text-[12px] text-white/75 sm:text-[13px]">
              {WALKTHROUGH_PAGE.kicker}
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <h1 className="type-heading text-[clamp(2.5rem,7vw,5.5rem)] text-white">
              {WALKTHROUGH_PAGE.title}
            </h1>
          </FadeUp>
          <FadeUp delay={0.26}>
            <p
              className="mt-4 max-w-[42ch] text-[14px] font-medium leading-[1.65] text-white sm:mt-5 sm:text-[16px]"
              style={{ textShadow: "0 1px 16px rgba(0,0,0,0.45)" }}
            >
              {WALKTHROUGH_PAGE.body}
            </p>
          </FadeUp>
          <FadeUp delay={0.34} className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            <Link
              href={WALKTHROUGH_PAGE.ctaHref}
              className="type-button btn-pill btn-shine btn-solid !bg-white !text-neutral-950 hover:!opacity-90"
            >
              {WALKTHROUGH_PAGE.cta}
            </Link>
            <Link
              href={WALKTHROUGH_PAGE.ctaSecondaryHref}
              className="type-button btn-pill btn-shine btn-outline !border-white/50 !text-white hover:!border-white hover:!bg-white hover:!text-neutral-950"
            >
              {WALKTHROUGH_PAGE.ctaSecondary}
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Featured films */}
      <section className="relative z-10 border-t border-neutral-200/80 bg-[#f7f7f7]">
        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <FadeUp className="mb-10 max-w-xl sm:mb-12">
            <p className="type-label mb-2 text-[11px] sm:mb-3 sm:text-[12px]">
              — Featured films
            </p>
            <h2 className="type-heading text-[clamp(1.85rem,3.8vw,3.15rem)] text-neutral-950">
              Watch &amp; explore
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {WALKTHROUGHS.map((item, i) => (
              <FadeUp
                key={item.id}
                delay={i * 0.08}
                className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-neutral-200 bg-white shadow-[0_18px_40px_-32px_rgba(0,0,0,0.35)]"
              >
                <div
                  id={item.id}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    draggable={false}
                  />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-neutral-950 shadow-sm">
                    <span aria-hidden className="ml-0.5 text-[12px]">
                      ▶
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="type-label text-[10px] text-neutral-400">
                    {String(i + 1).padStart(2, "0")} · {item.role}
                  </p>
                  <h3 className="type-heading mt-2 text-[20px] text-neutral-950 sm:text-[22px]">
                    {item.title}
                  </h3>
                  <p className="type-body mt-3 flex-1 text-[13px] sm:text-[14px]">
                    {item.body}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {item.projectHref && (
                      <Link
                        href={item.projectHref}
                        className="type-button btn-pill btn-shine btn-solid !h-10"
                      >
                        View Project
                      </Link>
                    )}
                    <Link
                      href="/contact"
                      className="type-button btn-pill btn-shine btn-outline !h-10"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll see */}
      <section className="relative z-10 border-t border-neutral-200/80 bg-white">
        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <FadeUp className="mb-10 max-w-xl sm:mb-12">
            <p className="type-label mb-2 text-[11px] sm:mb-3 sm:text-[12px]">
              {WALKTHROUGH_PAGE.featuresEyebrow}
            </p>
            <h2 className="type-heading whitespace-pre-line text-[clamp(1.85rem,3.8vw,3.15rem)] text-neutral-950">
              {WALKTHROUGH_PAGE.featuresTitle}
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-neutral-300/90 bg-neutral-300/90 sm:grid-cols-3">
            {WALKTHROUGH_PAGE.features.map((feature, i) => (
              <FadeUp
                key={feature.index}
                delay={i * 0.06}
                className="bg-white p-6 sm:p-8"
              >
                <p className="type-label text-[10px] text-neutral-400">
                  {feature.index}
                </p>
                <h3 className="type-heading mt-4 text-[18px] text-neutral-950 sm:text-[20px]">
                  {feature.title}
                </h3>
                <p className="type-body mt-3 text-[13px] sm:text-[14px]">
                  {feature.body}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* More projects to tour */}
      {moreProjects.length > 0 && (
        <section className="relative z-10 border-t border-neutral-200/80 bg-[#f4f4f2]">
          <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
              <FadeUp>
                <p className="type-label mb-2 text-[11px] sm:text-[12px]">
                  — Also explore
                </p>
                <h2 className="type-heading text-[clamp(1.85rem,3.8vw,3.15rem)] text-neutral-950">
                  More projects to tour
                </h2>
              </FadeUp>
              <FadeUp delay={0.08}>
                <Link
                  href="/projects"
                  className="type-button btn-pill btn-shine btn-outline w-fit"
                >
                  All Projects
                </Link>
              </FadeUp>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
              {moreProjects.map((project, i) => (
                <FadeUp key={project.id} delay={i * 0.07}>
                  <Link
                    href={project.href}
                    className="group block overflow-hidden rounded-[1.25rem] border border-neutral-200 bg-white"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.alt}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-5">
                      <p className="type-label text-[10px] text-neutral-400">
                        {project.category} · {project.locationLabel}
                      </p>
                      <h3 className="type-heading mt-2 text-[18px] text-neutral-950 sm:text-[20px]">
                        {project.title}
                      </h3>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative z-10 border-t border-neutral-200/80 bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 px-5 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-20 lg:px-12">
          <FadeUp>
            <p className="type-label mb-2 text-[11px] sm:text-[12px]">
              — Visit {BRAND.shortName}
            </p>
            <h2 className="type-heading max-w-[16ch] text-[clamp(1.75rem,3.5vw,2.75rem)] text-neutral-950">
              Prefer a site visit?
            </h2>
            <p className="type-body mt-3 max-w-[40ch] text-[14px] sm:text-[15px]">
              Book a walkthrough at our office or on site — Monday to Saturday,{" "}
              {BRAND.hours.time}.
            </p>
          </FadeUp>
          <FadeUp delay={0.08} className="flex flex-wrap gap-3">
            <Link href="/contact" className="type-button btn-pill btn-shine btn-solid">
              Contact Us
            </Link>
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="type-button btn-pill btn-shine btn-outline"
            >
              WhatsApp
            </a>
          </FadeUp>
        </div>
      </section>
    </PageShell>
  );
}

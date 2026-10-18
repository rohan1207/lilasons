"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageShell from "@/components/layout/PageShell";
import Reveal from "@/components/layout/Reveal";
import SectionEyebrow from "@/components/layout/SectionEyebrow";
import ProjectImageSlideshow from "@/components/projects/ProjectImageSlideshow";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { BRAND, CONTACT } from "@/lib/brand";
import {
  getAdjacentProjects,
  getProjectImages,
  getRelatedProjects,
} from "@/lib/projects";

export default function ProjectDetail({ project }) {
  const { prev, next } = getAdjacentProjects(project.slug);
  const related = getRelatedProjects(project.slug, 3);
  const allImages = getProjectImages(project);
  const slideshowImages =
    project.gallery?.length > 0 ? project.gallery : allImages;
  const galleryImages = allImages;

  const sections = [
    project.brief ? { title: "Brief", body: project.brief } : null,
    ...(project.overviewSections ?? []),
  ].filter(Boolean);

  const facts = [
    ...(project.meta || []),
    project.rera ? { label: "RERA", value: project.rera } : null,
    project.address ? { label: "Address", value: project.address } : null,
  ].filter(Boolean);

  const phone = project.phone ? `+91 ${project.phone}` : BRAND.phones[0];
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    project.address || project.title,
  )}`;

  return (
    <PageShell>
      <section className="border-b border-black/10 bg-[#f5f5f3]">
        <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-[max(7.5rem,calc(env(safe-area-inset-top,0px)+6.75rem))] sm:px-8 md:px-12 md:pb-12 lg:px-14">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 transition hover:text-[#0a0a0a]"
          >
            <span aria-hidden>←</span> All Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionEyebrow className="mb-5">{project.category}</SectionEyebrow>
            <h1 className="type-heading max-w-[16ch] text-[clamp(2rem,7.5vw,5.5rem)] leading-[0.92] text-[#0a0a0a]">
              {project.title}
            </h1>
            <p className="mt-4 text-[clamp(13px,1.1vw,16px)] font-normal tracking-wide text-neutral-600">
              {project.placeLine || project.locationLabel}
            </p>
            <p className="mt-6 max-w-3xl text-[clamp(15px,1.2vw,18px)] leading-relaxed text-[#3a3a3a]">
              {project.summary}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 sm:px-8 md:px-12 md:py-14 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <ProjectImageSlideshow
            images={slideshowImages}
            alt={project.title}
          />
        </div>
      </section>

      <section className="border-t border-black/10 bg-white px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-14">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(280px,34%)] lg:gap-20">
          <div>
            {sections.map((block, i) => (
              <Reveal key={block.title} delay={i}>
                <h2 className="mb-4 text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                  {block.title}
                </h2>
                <p className="mb-10 max-w-3xl text-base leading-[1.8] text-neutral-600 md:mb-12">
                  {block.body}
                </p>
              </Reveal>
            ))}

            {project.options?.length > 0 && (
              <Reveal>
                <h2 className="mb-5 text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                  Available Options
                </h2>
                <ul className="mb-10 flex flex-wrap gap-2 md:mb-12">
                  {project.options.map((opt) => (
                    <li
                      key={opt}
                      className="rounded-full border border-black/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0a0a0a]"
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {project.highlights?.length > 0 && (
              <Reveal>
                <h2 className="mb-5 text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
                  Project Highlights
                </h2>
                <ul className="mb-10 max-w-3xl space-y-4 md:mb-12">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-base leading-[1.75] text-neutral-600"
                    >
                      <span
                        className="mt-2.5 h-px w-5 shrink-0 bg-[#0a0a0a]"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionEyebrow className="mb-6">Project Facts</SectionEyebrow>
              <dl className="space-y-5 border-t border-black/10 pt-6">
                {facts.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[minmax(0,38%)_1fr] gap-4"
                  >
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                      {item.label}
                    </dt>
                    <dd className="text-sm leading-snug text-[#0a0a0a]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 space-y-2 border-t border-black/10 pt-6 text-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  {CONTACT.title}
                </p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="block font-medium text-[#0a0a0a] transition hover:opacity-70"
                >
                  {BRAND.email}
                </a>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="block font-medium text-[#0a0a0a] transition hover:opacity-70"
                >
                  {phone}
                </a>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                {project.whatsapp && (
                  <a
                    href={BRAND.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="type-button btn-pill btn-shine btn-solid"
                  >
                    <span aria-hidden>↗</span>
                    {CONTACT.whatsappLabel}
                  </a>
                )}
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="type-button btn-pill btn-shine btn-outline"
                >
                  Get Directions
                </a>
                <Link
                  href="/contact"
                  className="type-button btn-pill btn-shine btn-outline border-black/15 text-neutral-700"
                >
                  Discuss This Project
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <section className="border-t border-black/10 bg-[#f5f5f3] px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-14">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="mb-8 md:mb-10">
              <SectionEyebrow className="mb-4">Gallery</SectionEyebrow>
              <h2 className="type-heading text-[clamp(1.5rem,3vw,2.25rem)] text-[#0a0a0a]">
                Project Gallery
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base">
                Tap any image to view full size.
              </p>
            </Reveal>
            <ProjectGallery images={galleryImages} alt={project.title} />
          </div>
        </section>
      )}

      {(prev || next) && (
        <section className="border-t border-black/10 bg-white px-5 py-10 sm:px-8 md:px-12 md:py-12 lg:px-14">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-4 sm:flex-row sm:justify-between">
            {prev ? (
              <Link
                href={prev.href}
                className="group flex max-w-md flex-col gap-1 rounded-2xl border border-black/10 bg-[#f5f5f3] px-5 py-4 transition hover:border-black/25"
              >
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  Previous
                </span>
                <span className="text-base font-medium tracking-[-0.02em] text-[#0a0a0a] group-hover:opacity-70">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={next.href}
                className="group flex max-w-md flex-col gap-1 rounded-2xl border border-black/10 bg-[#f5f5f3] px-5 py-4 text-left transition hover:border-black/25 sm:ml-auto sm:text-right"
              >
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  Next
                </span>
                <span className="text-base font-medium tracking-[-0.02em] text-[#0a0a0a] group-hover:opacity-70">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-black/10 bg-white px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-14">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="mb-10">
              <SectionEyebrow className="mb-4">Related Work</SectionEyebrow>
              <h2 className="type-heading text-[clamp(1.5rem,3vw,2.25rem)] text-[#0a0a0a]">
                More Projects
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-10">
              {related.map((item) => (
                <Link key={item.id} href={item.href} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 lg:aspect-[4/5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.gallery?.[0] || item.image}
                      alt={item.alt}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="pt-3 md:pt-5">
                    <p className="mb-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-400 md:text-[10px]">
                      {item.category}
                    </p>
                    <h3 className="text-sm font-medium leading-snug tracking-[-0.02em] text-[#0a0a0a] md:text-lg">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import IconArrow from "@/components/IconArrow";
import { getUpcomingProjects } from "@/lib/projects";

const ease = [0.22, 1, 0.36, 1];

export default function UpcomingProjects() {
  const projects = getUpcomingProjects();
  const [index, setIndex] = useState(0);

  if (!projects.length) return null;

  const project = projects[index];
  const total = projects.length;
  const go = (dir) => setIndex((i) => (i + dir + total) % total);

  return (
    <section
      id="upcoming"
      className="relative z-10 border-t border-neutral-200/80 bg-white"
      aria-label="Upcoming projects"
    >
      <div className="mx-auto flex w-full max-w-[1500px] flex-col px-5 pb-14 pt-20 sm:px-8 sm:pb-16 sm:pt-24 lg:px-12 lg:pb-20 lg:pt-28">
        <div className="mb-3 flex shrink-0 items-end justify-between gap-4 sm:mb-4">
          <div>
            <p className="type-label mb-1 text-[11px] text-neutral-700 sm:text-[12px]">
              — Coming soon
            </p>
            <h2 className="type-heading text-[clamp(1.35rem,2.6vw,2.25rem)] text-neutral-950">
              Upcoming Projects
            </h2>
          </div>

          {total > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous upcoming project"
                onClick={() => go(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-950 transition hover:border-neutral-950 sm:h-10 sm:w-10"
              >
                <IconArrow dir="left" className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Next upcoming project"
                onClick={() => go(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-950 transition hover:border-neutral-950 sm:h-10 sm:w-10"
              >
                <IconArrow dir="right" className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={project.id}
            className="flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="h-[58vh] min-h-[340px] overflow-hidden bg-neutral-950 sm:h-[66vh] sm:min-h-[460px] lg:h-[72vh]">
              <picture className="block h-full w-full">
                {project.heroPhone ? (
                  <source media="(max-width: 767px)" srcSet={project.heroPhone} />
                ) : null}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.heroDesktop || project.image}
                  alt={project.alt || project.title}
                  className="h-full w-full object-cover object-center"
                  draggable={false}
                />
              </picture>
            </div>

            <div className="mt-3 flex shrink-0 flex-col gap-3 sm:mt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div className="min-w-0 max-w-[46rem]">
                <p className="type-label text-[10px] text-[var(--gold-dark)] sm:text-[11px]">
                  {project.status}
                  {project.category ? ` · ${project.category}` : ""}
                </p>
                <h3 className="type-heading mt-1 text-[clamp(1.25rem,2.2vw,2rem)] leading-none text-neutral-950">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[13px] leading-[1.55] text-neutral-600 sm:text-[15px]">
                  {project.cardSummary || project.summary}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2 sm:gap-2.5">
                <Link
                  href={project.href}
                  className="type-button btn-pill btn-shine btn-solid !h-9 !px-4 text-[10px] sm:!h-11 sm:!px-6 sm:text-[11px]"
                >
                  Read More
                </Link>
                <Link
                  href={project.planHref || "/contact"}
                  className="type-button btn-pill btn-shine btn-outline !h-9 !px-4 text-[10px] sm:!h-11 sm:!px-6 sm:text-[11px]"
                >
                  Download Plan
                </Link>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        {total > 1 && (
          <div className="mt-3 flex shrink-0 items-center gap-2" aria-hidden>
            {projects.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show ${item.title}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-[var(--gold)]" : "w-3 bg-neutral-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

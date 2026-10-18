"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { AMENITIES } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1];

export default function Amenities() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="amenities"
      className="relative z-10 bg-[#f7f7f7]"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-14 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <p className="type-label mb-1.5 text-[11px] text-neutral-700 sm:mb-2 sm:text-[12px]">
            {AMENITIES.eyebrow}
          </p>
          <h2 className="type-heading whitespace-pre-line text-[28px] text-neutral-950 sm:text-[36px] md:text-[44px] lg:text-[48px]">
            {AMENITIES.title}
          </h2>
        </motion.div>

        {/* Desktop / tablet: horizontal expanding panels */}
        <div
          className="hidden h-[min(62vh,560px)] gap-2.5 sm:flex md:gap-3"
          onMouseLeave={() => setActive(0)}
        >
          {AMENITIES.items.map((item, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={item.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={isActive}
                className="relative h-full min-w-0 overflow-hidden rounded-[1.75rem] bg-neutral-200 text-left outline-none focus-visible:ring-2 focus-visible:ring-neutral-950/40 md:rounded-[2rem]"
                initial={false}
                animate={{
                  flexGrow: isActive ? 5.2 : 1,
                  flexBasis: 0,
                }}
                transition={{ duration: 0.55, ease }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                  aria-hidden
                />
                <motion.span
                  className="absolute inset-x-0 bottom-0 z-10 px-3 pb-5 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white sm:pb-6 sm:text-[12px] md:pb-7 md:text-[13px]"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 10,
                  }}
                  transition={{ duration: 0.35, ease }}
                >
                  {item.label}
                </motion.span>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile: 2-column cards */}
        <div className="grid grid-cols-2 gap-2.5 sm:hidden">
          {AMENITIES.items.map((item) => (
            <article
              key={item.id}
              className="relative aspect-[3/4] overflow-hidden rounded-[1.15rem] bg-neutral-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                aria-hidden
              />
              <p className="absolute inset-x-0 bottom-0 z-10 px-2 pb-3 text-center text-[9px] font-semibold uppercase tracking-[0.16em] text-white sm:text-[12px]">
                {item.label}
              </p>
            </article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, delay: 0.1, ease }}
          className="mt-8 flex flex-col items-center gap-4 sm:mt-10"
        >
          <p className="type-label text-[12px] text-neutral-700 sm:text-[13px]">
            {AMENITIES.moreLabel}
          </p>
          <Link
            href={AMENITIES.ctaHref}
            className="type-button btn-pill btn-shine btn-outline"
          >
            {AMENITIES.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

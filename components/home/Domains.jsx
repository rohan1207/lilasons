"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { DOMAINS } from "@/lib/brand";
import IconArrow from "@/components/IconArrow";

gsap.registerPlugin(ScrollTrigger);

function DomainTile({ domain, className }) {
  return (
    <Link
      href={domain.href}
      className={`group relative block min-h-0 overflow-hidden bg-neutral-200 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={domain.image}
        alt={domain.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 z-10 p-2.5 sm:p-4 md:p-5">
        <p className="mb-0.5 text-[8px] font-semibold uppercase tracking-[0.08em] text-white/85 sm:mb-1 sm:text-[10px] md:text-[11px]">
          {domain.label}
        </p>
        <h3 className="type-heading text-[15px] text-white sm:text-[22px] md:text-[26px] lg:text-[30px]">
          {domain.title}
        </h3>
      </div>
    </Link>
  );
}

export default function Domains() {
  const byTitle = Object.fromEntries(DOMAINS.map((d) => [d.title, d]));

  useEffect(() => {
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.cancelAnimationFrame(id);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <section
      id="domains"
      className="relative z-10 flex h-auto flex-col overflow-hidden bg-white px-4 pb-8 pt-24 sm:h-dvh sm:max-h-dvh sm:px-6 sm:pb-6 sm:pt-28 md:px-10 md:pb-8 md:pt-32 lg:px-14"
    >
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[1600px] flex-col">
        <div className="mb-5 flex shrink-0 flex-col gap-3 sm:mb-5 sm:flex-row sm:items-end sm:justify-between md:mb-6">
          <div>
            <p className="type-label mb-1.5 text-[11px] text-neutral-700 sm:mb-2 sm:text-[12px]">
              — What We Build
            </p>
            <h2 className="type-heading text-[28px] text-neutral-950 sm:text-[36px] md:text-[44px] lg:text-[48px]">
              Our Focus
            </h2>
          </div>

          <Link
            href="/projects"
            className="type-button btn-pill btn-shine btn-outline w-fit shrink-0 gap-2"
          >
            <IconArrow dir="ne" className="h-3 w-3" />
            View Projects
          </Link>
        </div>

        {/* Phone: 2×2 + full commercial — no empty cell beside Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid min-h-0 flex-1 grid-cols-2 gap-[2px] sm:hidden"
        >
          <DomainTile
            domain={byTitle.Residences}
            className="aspect-[4/5]"
          />
          <DomainTile
            domain={byTitle.Developments}
            className="aspect-[4/5]"
          />
          <DomainTile
            domain={byTitle.Design}
            className="aspect-[4/5]"
          />
          <DomainTile
            domain={byTitle.Communities}
            className="aspect-[4/5]"
          />
          <DomainTile
            domain={byTitle.Commercial}
            className="col-span-2 aspect-[16/9]"
          />
        </motion.div>

        {/* Tablet / desktop: original 3-col bento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="hidden min-h-0 flex-1 grid-cols-3 grid-rows-[1fr_1.2fr] gap-[2px] sm:grid"
        >
          <DomainTile
            domain={byTitle.Residences}
            className="h-full min-h-0"
          />
          <DomainTile
            domain={byTitle.Developments}
            className="h-full min-h-0"
          />
          <DomainTile
            domain={byTitle.Design}
            className="h-full min-h-0"
          />
          <DomainTile
            domain={byTitle.Communities}
            className="col-span-2 h-full min-h-0"
          />
          <DomainTile
            domain={byTitle.Commercial}
            className="h-full min-h-0"
          />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import IconArrow from "@/components/IconArrow";
import { SHOWCASE } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1];

function RevealImage({ src, alt, className = "", delay = 0 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -8% 0px" });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-transparent ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
        loading="eager"
        decoding="async"
        initial={false}
        animate={
          reduce || inView
            ? { clipPath: "inset(0 0 0 0%)" }
            : { clipPath: "inset(0 0 0 100%)" }
        }
        transition={{ duration: reduce ? 0 : 1.25, delay: reduce ? 0 : delay, ease }}
      />
    </div>
  );
}

function FadeUp({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.85, delay: reduce ? 0 : delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function Showcase() {
  const reduce = useReducedMotion();

  return (
    <section
      id="signature"
      className="relative z-10 flex min-h-0 items-center border-t border-neutral-200/70 bg-[#f4f4f2] lg:min-h-dvh"
      aria-label="Signature living"
    >
      <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col justify-center px-5 py-12 sm:px-8 sm:py-12 lg:h-[100dvh] lg:max-h-[100dvh] lg:px-12 lg:py-8 xl:py-10">
        <div className="grid flex-1 grid-cols-1 gap-5 lg:grid-cols-12 lg:grid-rows-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-5 xl:gap-6">
          {/* Copy */}
          <div className="flex flex-col justify-between gap-5 sm:gap-6 lg:col-span-4 lg:row-span-1">
            <div>
              <FadeUp delay={0.04}>
                <div className="overflow-hidden">
                  <h2 className="type-heading max-w-[12ch] text-[clamp(1.75rem,7vw,3.15rem)] text-neutral-950">
                    {SHOWCASE.title}
                  </h2>
                </div>
              </FadeUp>
              <FadeUp delay={0.14}>
                <p className="type-kicker mt-4 max-w-[34ch] text-[12px] sm:text-[13px]">
                  {SHOWCASE.subtitle}
                </p>
              </FadeUp>
              <FadeUp delay={0.22}>
                <p className="type-body mt-4 max-w-[40ch] text-[14px] sm:text-[15px]">
                  {SHOWCASE.body}
                </p>
              </FadeUp>
            </div>

            <FadeUp delay={0.3}>
              <Link
                href={SHOWCASE.ctaHref}
                className="type-button btn-pill btn-shine btn-solid"
              >
                {SHOWCASE.cta}
                <IconArrow dir="right" className="h-3 w-3" />
              </Link>
            </FadeUp>
          </div>

          {/* Main image */}
          <div className="relative min-h-0 lg:col-span-8">
            <RevealImage
              src={SHOWCASE.heroImage}
              alt={SHOWCASE.heroAlt}
              className="aspect-[16/10] h-auto min-h-0 w-full sm:h-[38vw] sm:aspect-auto sm:min-h-[220px] lg:h-full lg:min-h-0"
              delay={reduce ? 0 : 0.1}
            />
            <p className="type-label pointer-events-none absolute bottom-3 right-3 max-w-[20ch] text-right text-[9px] text-white sm:bottom-4 sm:right-4 sm:text-[10px] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
              {SHOWCASE.heroAccentBottom}
            </p>
          </div>

          {/* Side image */}
          <div className="relative min-h-0 lg:col-span-5">
            <RevealImage
              src={SHOWCASE.sideImage}
              alt={SHOWCASE.sideAlt}
              className="aspect-[4/3] h-auto min-h-0 w-full sm:aspect-auto sm:h-[36vw] sm:min-h-[180px] lg:h-full lg:min-h-0"
              delay={reduce ? 0 : 0.06}
            />
            <p className="type-label pointer-events-none absolute bottom-3 left-3 text-[9px] text-white sm:bottom-4 sm:left-4 sm:text-[10px] [text-shadow:0_1px_10px_rgba(0,0,0,0.4)]">
              {SHOWCASE.sideAccent}
            </p>
          </div>

          {/* Stats */}
          <FadeUp
            delay={0.16}
            className="grid grid-cols-2 items-center justify-items-center gap-4 border-y border-neutral-300/80 py-5 sm:flex sm:justify-center sm:gap-8 sm:py-6 lg:col-span-3 lg:border-y-0 lg:py-0"
          >
            {SHOWCASE.stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6 sm:gap-8">
                {i > 0 && (
                  <span className="hidden h-12 w-px bg-neutral-300 sm:block" aria-hidden />
                )}
                <div className="text-center lg:text-left">
                  <p className="type-stat text-[clamp(1.75rem,7vw,2.85rem)] leading-none text-neutral-950">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="type-label mt-1.5 max-w-[12ch] text-[9px] sm:text-[10px]">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </FadeUp>

          {/* Detail + lines */}
          <div className="relative flex min-h-0 gap-3 lg:col-span-4 lg:gap-4">
            <RevealImage
              src={SHOWCASE.detailImage}
              alt={SHOWCASE.detailAlt}
              className="aspect-[3/4] h-auto min-h-0 w-full max-w-[200px] flex-1 sm:aspect-auto sm:h-[48vw] sm:min-h-[200px] sm:max-w-none lg:h-full lg:min-h-0 lg:max-w-none"
              delay={reduce ? 0 : 0.14}
            />
            <ul className="flex shrink-0 flex-col justify-end gap-2 pb-1">
              {SHOWCASE.detailLines.map((line) => (
                <li
                  key={line}
                  className="text-[8px] font-semibold uppercase tracking-[0.16em] text-neutral-700 sm:text-[10px] sm:tracking-[0.18em]"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

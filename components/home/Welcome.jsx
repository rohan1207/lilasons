"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { HOME } from "@/lib/brand";

function ParallaxPanel({ panel, index, scrollYProgress }) {
  // 1st image drifts down, 2nd drifts up — subtle opposite motion
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    index === 0 ? ["-6%", "8%"] : ["8%", "-6%"],
  );

  return (
    <article className="relative aspect-[3/4] overflow-hidden bg-neutral-200 sm:aspect-[3/4] lg:min-h-[min(78vh,820px)] lg:aspect-auto">
      <motion.div className="absolute inset-[-12%] will-change-transform" style={{ y }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={panel.image}
          alt={panel.alt}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </motion.div>
    </article>
  );
}

export default function Welcome() {
  const panels = HOME.welcomePanels || [];
  const mediaRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="welcome"
      className="relative z-10 bg-white"
      aria-label="Welcome"
    >
      <div className="mx-auto max-w-[1500px] px-5 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 border-b border-transparent pb-10 lg:grid-cols-12 lg:gap-12 lg:pb-14">
          <div className="lg:col-span-7">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1f4d4a] sm:text-[12px]">
              {HOME.welcomeEyebrow}
            </p>
            <h2 className="font-display max-w-[16ch] text-[34px] font-medium leading-[1.12] tracking-[-0.02em] text-neutral-950 sm:text-[44px] md:text-[52px] lg:text-[58px]">
              {HOME.welcomeTitle}
            </h2>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:col-span-5 lg:pt-8">
            <p className="type-body max-w-[46ch] text-[14px] leading-[1.7] text-neutral-600 sm:text-[15px] md:text-[16px]">
              {HOME.welcomeBody}
            </p>
            <Link
              href={HOME.welcomeCtaHref}
              className="type-button btn-pill btn-shine inline-flex h-11 w-fit items-center justify-center bg-neutral-950 px-7 text-[11px] text-white transition-opacity hover:opacity-85 sm:h-12 sm:px-8"
            >
              {HOME.welcomeCta}
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={mediaRef}
        className="relative mx-auto mt-2 max-w-[1500px] px-0 sm:mt-0 sm:px-8 lg:px-12"
      >
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-[2px]">
          {panels.map((panel, index) => (
            <ParallaxPanel
              key={panel.label}
              panel={panel}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

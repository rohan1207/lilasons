"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { HOME } from "@/lib/brand";

function ParallaxPanel({ panel, index, scrollYProgress }) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    index === 0 ? ["-6%", "8%"] : ["8%", "-6%"],
  );

  return (
    <article className="relative aspect-[3/4] overflow-hidden bg-neutral-200 sm:aspect-[3/4] lg:min-h-[min(72vh,760px)] lg:aspect-auto">
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
      {/* Tight copy block — one composition, no empty mid-gap */}
      <div className="mx-auto max-w-[1500px] px-5 pt-14 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
        <div className="max-w-[52rem] border-b border-neutral-200/80 pb-10 sm:pb-12">
          <p className="type-label mb-3 text-[11px] sm:mb-4 sm:text-[12px]">
            {HOME.welcomeEyebrow}
          </p>
          <h2 className="type-heading max-w-[20ch] text-[clamp(1.85rem,4.2vw,3.35rem)] text-neutral-950">
            {HOME.welcomeTitle}
          </h2>
          <p className="type-body mt-5 max-w-[42ch] text-[15px] sm:mt-6 sm:text-[16px]">
            {HOME.welcomeBody}
          </p>
          <Link
            href={HOME.welcomeCtaHref}
            className="type-button btn-pill btn-shine btn-solid mt-7 w-fit sm:mt-8"
          >
            {HOME.welcomeCta}
          </Link>
        </div>
      </div>

      <div
        ref={mediaRef}
        className="relative mx-auto mt-0 max-w-[1500px] px-0 sm:px-8 lg:px-12"
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

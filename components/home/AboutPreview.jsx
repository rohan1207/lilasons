"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ABOUT } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1];

const STATS = [
  {
    label: ABOUT.stats[0].label,
    icon: (
      <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none" aria-hidden>
        <path
          d="M4 20V9.5L12 4l8 5.5V20H4Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M9.5 20v-6h5v6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: ABOUT.stats[1].label,
    icon: (
      <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none" aria-hidden>
        <path
          d="M7 11.5 11.2 7l2.1 2.1L17.5 5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 19.5h16M6.5 19.5V14h11v5.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: ABOUT.stats[2].label,
    icon: (
      <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none" aria-hidden>
        <path
          d="M5 19.5V8.2L12 4.5l7 3.7v11.3"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M9 19.5v-4.2h6v4.2" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M9.2 11.2h5.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

function FloatOrb({ src, alt, className, amplitude = 8, duration = 5.5, delay = 0 }) {
  const reduce = useReducedMotion();

  return (
    <motion.img
      src={src}
      alt={alt}
      draggable={false}
      className={`pointer-events-none select-none object-contain mix-blend-screen ${className}`}
      initial={false}
      animate={reduce ? { y: 0 } : { y: [-amplitude, amplitude] }}
      transition={
        reduce
          ? undefined
          : {
              delay,
              duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }
      }
    />
  );
}

function Reveal({ children, className = "", delay = 0, y = 28, scale = 1 }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPreview() {
  return (
    <section
      id="about"
      className="relative z-10 flex h-auto flex-col overflow-hidden bg-[#fbfbfb] pt-24 pb-10 sm:h-dvh sm:max-h-dvh sm:pb-0 sm:pt-28 md:pt-32"
      aria-label="About Lilasons Developers"
    >
      {/* Soft architectural grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,251,251,0.2)_0%,rgba(251,251,251,0.92)_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-[1500px] flex-1 flex-col px-5 pb-8 sm:px-8 sm:pb-5 lg:px-12 lg:pb-6">
        <Reveal delay={0.02} y={16} className="mb-5 shrink-0 sm:mb-6 lg:mb-7">
          <p className="type-label mb-1.5 text-[11px] text-neutral-700 sm:mb-2 sm:text-[12px]">
            {ABOUT.eyebrow}
          </p>
          <h2 className="type-heading text-[28px] text-neutral-950 sm:text-[36px] md:text-[42px] lg:text-[46px]">
            {ABOUT.subtitle}
          </h2>
          <p className="type-body mt-2 max-w-[48ch] text-[13px] text-neutral-700 sm:mt-2.5 sm:text-[14px] md:text-[15px]">
            {ABOUT.body}
          </p>
        </Reveal>

        <div className="grid min-h-0 flex-1 grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-6 xl:gap-8">
        {/* Left */}
        <div className="relative flex min-h-0 flex-col justify-between py-1 lg:col-span-3">
          <Reveal delay={0.08} y={28} scale={0.98} className="relative z-[1] w-[72%] max-w-[200px] sm:max-w-[220px]">
            <div className="overflow-hidden rounded-[999px] bg-neutral-200 shadow-[0_20px_48px_-24px_rgba(0,0,0,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/dubai-villa.jpg"
                alt="Lilasons Developers residential living"
                className="aspect-[3/4] max-h-[min(32dvh,240px)] w-full object-cover sm:max-h-[min(36dvh,280px)]"
              />
            </div>
          </Reveal>

          <div className="relative z-[2] -mt-4 ml-[36%] w-[38%] max-w-[110px] sm:-mt-5 lg:absolute lg:bottom-[24%] lg:left-[40%] lg:ml-0 lg:mt-0 lg:w-[42%]">
            <FloatOrb
              src="/brown.png"
              alt=""
              amplitude={7}
              duration={6.2}
              delay={0.4}
              className="h-auto w-full drop-shadow-[0_14px_24px_rgba(0,0,0,0.12)]"
            />
          </div>

          <Reveal delay={0.18} y={18} className="mt-5 lg:mt-0">
            <p className="type-heading text-[30px] text-neutral-950 sm:text-[38px] lg:text-[44px] xl:text-[50px]">
              {ABOUT.wordmark}
            </p>
          </Reveal>
        </div>

        {/* Center card */}
        <div className="flex min-h-0 items-center justify-center lg:col-span-5">
          <Reveal
            delay={0.12}
            y={32}
            scale={0.985}
            className="h-full max-h-full w-full max-w-[360px] lg:max-w-none"
          >
            <div className="h-full max-h-[min(48dvh,480px)] overflow-hidden bg-neutral-200 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.38)] sm:max-h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/dubai-tower.jpg"
                alt="Lilasons Developers landmark project"
                className="h-full max-h-[min(48dvh,480px)] w-full object-cover sm:aspect-auto sm:max-h-full sm:min-h-[min(52dvh,500px)]"
              />
            </div>
          </Reveal>
        </div>

        {/* Right */}
        <div className="relative flex min-h-0 flex-col justify-between py-1 lg:col-span-4 lg:pl-2">
          <div className="absolute -right-1 top-0 z-[1] w-[28%] max-w-[100px] sm:right-2 lg:-right-2 lg:top-0 lg:w-[32%]">
            <FloatOrb
              src="/white.png"
              alt=""
              amplitude={8}
              duration={7}
              delay={1.1}
              className="h-auto w-full drop-shadow-[0_12px_22px_rgba(0,0,0,0.1)]"
            />
          </div>

          <Reveal delay={0.2} y={24} className="relative z-[2] mt-10 max-w-[24ch] lg:mt-12">
            <h3 className="type-heading text-[20px] text-neutral-950 sm:text-[26px] lg:text-[28px] xl:text-[32px]">
              Building your foundation.
              <br />
              Building your environment.
            </h3>
            <p className="type-body mt-3 max-w-[32ch] text-[13px] text-neutral-700 sm:text-[14px]">
              {ABOUT.detail}
            </p>
          </Reveal>

          <Reveal delay={0.3} y={18} className="mt-6 lg:mt-0">
            <ul className="space-y-3">
              {STATS.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.65, delay: 0.34 + i * 0.07, ease }}
                  className="flex items-center gap-3 text-[12px] font-medium tracking-[-0.01em] text-neutral-700 sm:text-[13px]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center text-neutral-900">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </motion.li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.42} y={14} className="mt-6 flex justify-start lg:mt-0 lg:justify-end">
            <Link
              href={ABOUT.ctaHref}
              className="type-button btn-pill btn-shine btn-solid !h-10 sm:!h-10"
            >
              {ABOUT.cta}
            </Link>
          </Reveal>
        </div>
        </div>
      </div>
    </section>
  );
}

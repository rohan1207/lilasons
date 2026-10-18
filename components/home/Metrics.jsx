"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BRANDS, METRICS } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1];

function useCountUp(target, active, duration, delay) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return undefined;

    let raf = 0;
    const timeout = window.setTimeout(() => {
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(Math.round(eased * target));

        if (progress < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(target);
        }
      };

      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [active, target, duration, delay]);

  return display;
}

function formatNumber(n) {
  return n.toLocaleString("en-IN");
}

function MetricTile({ card, index, active }) {
  const duration = card.value >= 100 ? 2200 : card.value >= 20 ? 1700 : 1300;
  const count = useCountUp(card.value, active, duration, 140 + index * 120);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.65, delay: 0.12 + index * 0.08, ease }}
      className="flex min-h-0 flex-col justify-between overflow-hidden rounded-[1.15rem] border border-black/[0.06] bg-white p-3 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.35)] sm:rounded-[1.5rem] sm:p-5 dark:border-white/10 dark:bg-[#161616] dark:shadow-none"
    >
      <p className="text-[9px] font-medium tracking-[-0.01em] text-neutral-700 sm:text-[12px] dark:text-white/45">
        {card.label}
      </p>
      <p
        className="type-stat mt-2 text-[clamp(1.35rem,5.5vw,2.75rem)] font-semibold leading-none tracking-[-0.04em] text-neutral-950 tabular-nums sm:mt-3 dark:text-white"
      >
        {formatNumber(count)}
        {card.suffix}
      </p>
    </motion.article>
  );
}

export default function Metrics() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -8% 0px",
  });

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return undefined;

    if (inView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      id="metrics"
      className="relative z-10 flex h-auto max-h-none overflow-visible border-t border-neutral-200/80 bg-[#f4f4f2] text-neutral-950 lg:h-dvh lg:max-h-dvh lg:overflow-hidden dark:border-white/10 dark:bg-[#0a0a0a] dark:text-white"
      aria-label="Decades of trust"
    >
      <div className="mx-auto flex h-full w-full max-w-[1600px] flex-col gap-6 px-5 py-14 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:gap-10 lg:px-12 lg:py-10 xl:gap-14">
        {/* Left — brand story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease }}
          className="flex w-full shrink-0 flex-col justify-center lg:w-[40%] lg:max-w-[520px]"
        >
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-[-0.01em] text-neutral-800 shadow-sm dark:border-white/15 dark:bg-white/10 dark:text-white/90">
            <span
              className="text-[10px] leading-none text-[var(--accent)]"
              aria-hidden
            >
              ✦
            </span>
            {METRICS.badge}
          </span>

          <h2 className="type-heading max-w-[16ch] text-[28px] text-neutral-950 sm:text-[36px] lg:text-[42px] xl:text-[46px] dark:text-white">
            {METRICS.title}
          </h2>

          <p className="type-body mt-4 max-w-[40ch] text-[14px] sm:mt-5 sm:text-[15px] dark:text-white/55">
            {METRICS.body}
          </p>

          <ul className="mt-6 space-y-3 sm:mt-7">
            {BRANDS.map((brand, i) => (
              <li
                key={brand.name}
                className="flex items-baseline gap-3 border-t border-black/[0.06] pt-3 first:border-t-0 first:pt-0 dark:border-white/10"
              >
                <span className="type-label shrink-0 text-[10px] text-neutral-700 dark:text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold tracking-[-0.02em] text-neutral-900 sm:text-[14px] dark:text-white">
                    {brand.name}
                  </p>
                  <p className="mt-0.5 text-[11px] text-neutral-700 dark:text-white/40">
                    {brand.role}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href={METRICS.ctaHref}
            className="type-button btn-pill btn-shine btn-solid mt-7 w-fit sm:mt-8 dark:bg-white dark:text-neutral-950"
          >
            {METRICS.cta}
          </Link>
        </motion.div>

        {/* Right — video + metrics */}
        <div className="flex min-h-0 w-full flex-1 flex-col gap-3 sm:gap-3.5 lg:h-[min(78vh,720px)]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: 0.06, ease }}
            className="relative min-h-[220px] flex-[1.55] overflow-hidden rounded-[1.5rem] bg-neutral-200 sm:min-h-0 sm:rounded-[1.75rem] dark:bg-neutral-800"
          >
            <video
              ref={videoRef}
              src={METRICS.video}
              poster={METRICS.videoPoster}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              aria-label="Lilasons Developers property walkthrough"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent dark:from-black/40"
              aria-hidden
            />
          </motion.div>

          <div className="grid min-h-[100px] flex-[0.85] grid-cols-3 gap-2 sm:min-h-[130px] sm:gap-3.5">
            {METRICS.cards.map((card, i) => (
              <MetricTile
                key={card.id}
                card={card}
                index={i}
                active={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

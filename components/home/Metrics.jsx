"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { METRICS } from "@/lib/brand";

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

function ChartPanel({ children }) {
  return (
    <div className="relative mt-auto overflow-hidden rounded-xl bg-[#f4f4f2] px-3.5 py-3.5 sm:rounded-[14px] sm:px-4 sm:py-4">
      {children}
    </div>
  );
}

/** Cap-top column chart — growth over decades */
function VizBars({ series, active, delay = 0 }) {
  return (
    <ChartPanel>
      <div className="mb-2.5 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
          Legacy growth
        </p>
        <motion.p
          className="text-[10px] font-semibold text-neutral-500"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.9, duration: 0.4 }}
        >
          Since 1971
        </motion.p>
      </div>
      <div className="flex h-[76px] items-end gap-[5px] sm:h-[84px] sm:gap-1.5" aria-hidden>
        {series.map((h, i) => {
          const isLast = i === series.length - 1;
          return (
            <div key={i} className="relative flex h-full flex-1 items-end">
              <motion.div
                className="relative w-full overflow-hidden rounded-sm bg-neutral-300/80"
                initial={{ height: "6%" }}
                animate={
                  active
                    ? isLast
                      ? {
                          height: [
                            "6%",
                            `${h}%`,
                            `${Math.max(8, h - 4)}%`,
                            `${h}%`,
                          ],
                        }
                      : { height: `${h}%` }
                    : { height: "6%" }
                }
                transition={
                  isLast && active
                    ? {
                        duration: 2.8,
                        delay: delay + i * 0.04,
                        ease,
                        times: [0, 0.35, 0.7, 1],
                        repeat: Infinity,
                        repeatDelay: 1.6,
                      }
                    : { duration: 0.9, delay: delay + i * 0.045, ease }
                }
              >
                <span className="absolute inset-x-0 top-0 h-[2.5px] bg-neutral-950" />
              </motion.div>
            </div>
          );
        })}
      </div>
    </ChartPanel>
  );
}

/** Horizontal composition meters — clear professional breakdown */
function VizMeters({ meters, active, delay = 0 }) {
  return (
    <ChartPanel>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
        Portfolio mix
      </p>
      <div className="flex flex-col gap-2.5" aria-hidden>
        {meters.map((row, i) => (
          <div key={row.label}>
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-neutral-600">
                {row.label}
              </span>
              <motion.span
                className="type-stat text-[11px] !font-semibold text-neutral-950"
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: delay + 0.35 + i * 0.12, duration: 0.4 }}
              >
                {row.value}%
              </motion.span>
            </div>
            <div className="h-[7px] overflow-hidden rounded-full bg-neutral-200/90">
              <motion.div
                className="relative h-full rounded-full bg-neutral-950"
                initial={{ width: "0%" }}
                animate={active ? { width: `${row.value}%` } : { width: "0%" }}
                transition={{
                  duration: 1.15,
                  delay: delay + i * 0.14,
                  ease,
                }}
              >
                {active && (
                  <motion.span
                    className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                    animate={{ left: ["-20%", "120%"] }}
                    transition={{
                      duration: 1.8,
                      delay: delay + 1.1 + i * 0.25,
                      repeat: Infinity,
                      repeatDelay: 2.4,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </ChartPanel>
  );
}

/** Project tile grid — six live cells */
function VizGrid({ projects, active, delay = 0 }) {
  return (
    <ChartPanel>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
        Live pipeline
      </p>
      <div className="grid grid-cols-3 gap-2" aria-hidden>
        {projects.map((name, i) => (
          <motion.div
            key={name}
            className="relative flex aspect-[1.15] flex-col justify-between overflow-hidden rounded-lg border border-black/[0.06] bg-white px-2 py-2"
            initial={{ opacity: 0, y: 10 }}
            animate={
              active
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.5, delay: delay + i * 0.07, ease }}
          >
            <span className="type-stat text-[10px] !font-semibold text-neutral-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="truncate text-[10px] font-semibold leading-tight tracking-[-0.01em] text-neutral-900 sm:text-[11px]">
              {name}
            </span>
            {active && (
              <motion.span
                className="absolute inset-x-0 bottom-0 h-[2px] bg-neutral-950"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 1, 0.35, 1] }}
                transition={{
                  duration: 3.2,
                  delay: delay + 0.6 + i * 0.12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ originX: 0 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </ChartPanel>
  );
}

function MetricVisual({ card, active, delay }) {
  if (card.viz === "bars") {
    return <VizBars series={card.series} active={active} delay={delay} />;
  }
  if (card.viz === "meters") {
    return <VizMeters meters={card.meters} active={active} delay={delay} />;
  }
  if (card.viz === "grid") {
    return <VizGrid projects={card.projects} active={active} delay={delay} />;
  }
  return null;
}

function MetricCard({ card, index, sectionInView }) {
  const duration = card.value >= 100 ? 2200 : card.value >= 20 ? 1700 : 1300;
  const delay = 120 + index * 140;
  const count = useCountUp(card.value, sectionInView, duration, delay);

  return (
    <motion.article
      className="flex min-h-[300px] flex-col rounded-2xl border border-black/[0.05] bg-white p-5 shadow-[0_18px_50px_-36px_rgba(0,0,0,0.35)] sm:min-h-[320px] sm:rounded-[1.25rem] sm:p-6"
      initial={{ opacity: 0, y: 22 }}
      animate={
        sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }
      }
      transition={{ duration: 0.7, delay: index * 0.08, ease }}
    >
      <p className="text-[13px] font-medium tracking-[-0.01em] text-neutral-400 sm:text-[14px]">
        {card.label}
      </p>
      <p
        className="mt-3 text-[clamp(2.4rem,5vw,3.25rem)] font-semibold leading-none tracking-[-0.035em] text-neutral-950 tabular-nums"
        style={{
          fontFamily:
            'var(--font-tsk), "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {formatNumber(count)}
        {card.suffix}
      </p>
      <div className="mt-6 flex-1">
        <MetricVisual
          card={card}
          active={sectionInView}
          delay={0.22 + index * 0.08}
        />
      </div>
    </motion.article>
  );
}

export default function Metrics() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -8% 0px",
  });

  return (
    <section
      ref={ref}
      id="metrics"
      className="relative z-10 border-t border-neutral-200/70 bg-[#efefed]"
      aria-label="Company metrics"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="mb-10 grid grid-cols-1 gap-6 lg:mb-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <motion.h2
            className="font-display max-w-[18ch] text-[clamp(1.75rem,3.6vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.03em] text-neutral-950 lg:col-span-7"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, ease }}
          >
            {METRICS.title}
          </motion.h2>
          <motion.div
            className="space-y-3 text-[14px] leading-relaxed text-neutral-500 sm:text-[15px] lg:col-span-5 lg:pt-1"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            {METRICS.body.map((p) => (
              <p key={p.slice(0, 36)}>{p}</p>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
          {METRICS.cards.map((card, i) => (
            <MetricCard
              key={card.id}
              card={card}
              index={i}
              sectionInView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

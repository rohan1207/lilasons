"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

function parseStatValue(value) {
  const str = String(value);
  const match = str.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!match) return { prefix: "", target: 0, suffix: str };
  return {
    prefix: match[1],
    target: Number(match[2]),
    suffix: match[3],
  };
}

function getCountDuration(target) {
  if (target <= 5) return 1200;
  if (target <= 50) return 1600;
  return 2200;
}

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

function RollUpStat({ value, label, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -60px 0px",
  });
  const delay = index * 120;
  const { prefix, target, suffix } = parseStatValue(value);
  const duration = getCountDuration(target);
  const count = useCountUp(target, inView, duration, delay);

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="overflow-hidden" style={{ minHeight: "1.1em" }}>
        <motion.div
          className="type-stat text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.05] text-white"
          initial={{ opacity: 0, y: "100%" }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }}
          transition={{ duration: 0.85, delay: delay / 1000, ease }}
        >
          {prefix}
          {count}
          {suffix}
        </motion.div>
      </div>
      <motion.p
        className="mt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/50 md:mt-3 md:text-[10px]"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.65, delay: delay / 1000 + 0.2, ease }}
      >
        {label}
      </motion.p>
    </div>
  );
}

export default function AboutStatsStrip({ stats }) {
  return (
    <section className="relative border-y border-white/10 bg-[#0a0a0a] px-5 py-12 sm:px-8 md:py-16 lg:px-14">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
        {stats.map((stat, i) => (
          <RollUpStat
            key={stat.label}
            value={stat.value}
            label={stat.label}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Compass from "./Compass";
import AnimatedSlogan from "./AnimatedSlogan";
import BrandMark from "@/components/BrandMark";
import {
  LANDING_BG_SRC,
  LANDING_LOAD_MS,
  startFramePreload,
} from "@/lib/framePreloader";

/**
 * @param {{ onComplete?: () => void }} props
 */
export default function LandingScreen({ onComplete }) {
  const completed = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    startFramePreload();

    let cancelled = false;
    let raf = 0;
    const start = performance.now();

    const tick = (now) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / LANDING_LOAD_MS);
      const eased = 1 - Math.pow(1 - t, 1.35);
      setProgress(eased);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (completed.current) return;
      completed.current = true;
      // Same frame as 100% — no setTimeout, no router delay
      onComplete?.();
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [onComplete]);

  const percent = Math.round(progress * 100);

  return (
    <main className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#f7f7f7] px-6">
      <div
        className="pointer-events-none absolute inset-0 scale-105 bg-cover bg-center opacity-[0.1]"
        style={{ backgroundImage: `url(${LANDING_BG_SRC})` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f7f7f7]/85 via-[#f7f7f7]/55 to-[#f7f7f7]/92"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex w-full max-w-xl flex-col items-center text-center"
      >
        <Compass progress={progress} />

        <div className="mt-12 flex justify-center">
          <BrandMark
            asLink={false}
            imgClassName="h-[4.75rem] w-auto max-w-[380px] object-contain sm:h-20 sm:max-w-[440px] md:h-24 md:max-w-[520px]"
          />
        </div>

        <AnimatedSlogan />

        <div className="mt-10 flex flex-col items-center gap-2.5">
          <p className="type-label text-[11px] text-neutral-500 sm:text-[12px]">
            Loading your experience
          </p>
          <p className="type-stat text-[2rem] text-neutral-950 sm:text-[2.25rem]">
            {percent}
            <span className="ml-0.5 text-[0.9rem] font-semibold text-neutral-400">
              %
            </span>
          </p>
          <div className="mt-1 h-px w-28 overflow-hidden bg-neutral-300">
            <motion.div
              className="h-full bg-neutral-950"
              initial={false}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>
    </main>
  );
}

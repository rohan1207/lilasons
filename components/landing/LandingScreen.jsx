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
    <main className="relative flex h-dvh max-h-dvh min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#f7f7f7] px-5">
      <div
        className="pointer-events-none absolute inset-0 scale-105 bg-cover bg-center opacity-[0.08]"
        style={{ backgroundImage: `url(${LANDING_BG_SRC})` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f7f7f7]/90 via-[#f7f7f7]/70 to-[#f7f7f7]"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex w-full flex-col items-center"
      >
        <Compass progress={progress}>
          <BrandMark
            asLink={false}
            className="justify-center"
            imgClassName="h-auto w-[72%] max-w-[200px] object-contain sm:max-w-[240px] md:max-w-[280px]"
            textClassName="type-logo text-[1.4rem] tracking-[-0.02em] text-neutral-950 sm:text-[1.7rem]"
          />
        </Compass>

        <AnimatedSlogan />
      </motion.div>

      {/* Bottom-right loading % only */}
      <div className="absolute bottom-6 right-6 z-10 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10">
        <p
          className="type-stat tabular-nums text-[1.35rem] text-neutral-950 sm:text-[1.6rem]"
          aria-live="polite"
          aria-label={`Loading ${percent} percent`}
        >
          {percent}
          <span className="ml-0.5 text-[0.75rem] font-semibold text-neutral-400 sm:text-[0.85rem]">
            %
          </span>
        </p>
      </div>
    </main>
  );
}

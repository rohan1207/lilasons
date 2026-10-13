"use client";

import { useCallback, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { BRAND } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1];

function IllustratorHand({ className = "" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M28.2 10.5c0-1.7 1.3-3.1 3-3.1s3 1.4 3 3.1v16.2l3.4-4.1c1.2-1.4 3.3-1.6 4.7-.5 1.3 1.1 1.5 3 .5 4.3l-1.8 2.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.5 32.8 42 28.5c1.3-1.3 3.4-1.3 4.7 0 1.2 1.3 1.2 3.3 0 4.6l-9.8 10.1c-1.4 1.5-3.4 2.3-5.4 2.3H22.4c-3.4 0-6.2-2.6-6.5-6l-.8-9.2c-.2-2.1 1.3-4 3.4-4.3 1.7-.3 3.3.6 4 2.1l1.6 3.5V10.5c0-1.7 1.3-3.1 3-3.1s3 1.4 3 3.1V28"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="46.5" cy="48.5" r="2.2" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

export default function IdCard() {
  const reduce = useReducedMotion();
  const [engaged, setEngaged] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.7 });
  const tiltX = useTransform(springY, [-60, 60], [6, -6]);
  const tiltY = useTransform(springX, [-60, 60], [-8, 8]);

  const engage = useCallback(() => {
    setEngaged(true);
  }, []);

  const idle = !reduce && !engaged;

  return (
    <section
      id="membership"
      className="relative z-10 overflow-hidden bg-[#f7f7f7] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      aria-label="Lilasons resident card"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
          className="mb-10 text-center sm:mb-12"
        >
          <p className="type-label mb-2 text-[11px] text-neutral-400 sm:text-[12px]">
            — Resident Access
          </p>
          <h2 className="type-heading text-[28px] text-neutral-950 sm:text-[36px] md:text-[42px]">
            Your Lilasons Card
          </h2>
          <p className="type-body mx-auto mt-2 max-w-[40ch] text-[13px] text-neutral-500 sm:text-[14px]">
            Drag gently to explore — a quiet signature of belonging.
          </p>
        </motion.div>

        <div className="relative flex w-full max-w-[420px] items-center justify-center py-6 sm:py-8">
          <div
            className="pointer-events-none absolute inset-x-10 bottom-4 h-8 rounded-[100%] bg-neutral-950/10 blur-2xl"
            aria-hidden
          />

          <motion.div
            className="relative"
            animate={
              idle
                ? { rotate: [-2.1, 2.1, -2.1], y: [0, -2.5, 0] }
                : { rotate: 0, y: 0 }
            }
            transition={
              idle
                ? { duration: 4.8, ease: "easeInOut", repeat: Infinity }
                : { type: "spring", stiffness: 160, damping: 22 }
            }
          >
            <motion.div
              className="relative touch-none"
              style={{
                x: springX,
                y: springY,
                rotateX: engaged ? tiltX : 0,
                rotateY: engaged ? tiltY : 0,
                transformPerspective: 900,
              }}
              drag={!reduce}
              dragConstraints={{ left: -72, right: 72, top: -48, bottom: 48 }}
              dragElastic={0.18}
              dragMomentum={false}
              onDragStart={engage}
              onPointerDown={engage}
              whileTap={{ cursor: "grabbing" }}
            >
              <div
                className="relative w-[min(86vw,380px)] cursor-grab overflow-hidden rounded-[22px] border border-white/40 bg-neutral-950 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.55)] active:cursor-grabbing"
                style={{ aspectRatio: "1.586 / 1" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/expand-story-hero.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-55"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-950/30 via-neutral-950/55 to-neutral-950/85" />

                <div className="relative flex h-full flex-col justify-between p-5 text-white sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={BRAND.logo}
                        alt={BRAND.name}
                        className="h-10 w-auto max-w-[200px] object-contain brightness-0 invert"
                        draggable={false}
                      />
                      <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/55">
                        Developers
                      </p>
                    </div>
                    <div className="rounded-full border border-white/25 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/70">
                      Aurangabad
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
                      Resident
                    </p>
                    <p className="mt-1 text-[18px] font-bold tracking-[-0.02em] sm:text-[20px]">
                      Golden Heights
                    </p>
                    <div className="mt-4 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/40">
                          Access
                        </p>
                        <p className="type-stat mt-0.5 text-[12px] tracking-[0.04em] text-white/80">
                          IN · CSN · MH
                        </p>
                      </div>
                      <div className="h-8 w-10 rounded-md border border-white/20 bg-white/10 backdrop-blur-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {idle ? (
                <motion.div
                  className="pointer-events-none absolute -bottom-1 -right-3 z-10 text-neutral-950 sm:-bottom-2 sm:-right-4"
                  animate={{
                    x: [0, 5, 0],
                    y: [0, -4, 0],
                    rotate: [-5, 3, -5],
                  }}
                  transition={{
                    duration: 4.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                >
                  <IllustratorHand className="h-14 w-14 drop-shadow-[0_6px_12px_rgba(0,0,0,0.15)] sm:h-16 sm:w-16" />
                </motion.div>
              ) : null}
            </motion.div>
          </motion.div>
        </div>

        <p className="type-label mt-2 text-[10px] text-neutral-400 sm:text-[11px]">
          {engaged ? "Release to settle" : "Drag to explore"}
        </p>
      </div>
    </section>
  );
}

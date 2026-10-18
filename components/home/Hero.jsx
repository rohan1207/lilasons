"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FRAME_COUNT,
  getFrameImage,
  startFramePreload,
  subscribeFramePreload,
} from "@/lib/framePreloader";
import { BRAND } from "@/lib/brand";
import HeroClouds from "@/components/home/HeroClouds";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drip/Trex model (what made 700 frames feel silk):
 * - NO GSAP pin — tall scroll block + FIXED canvas
 * - scrub: 0.42s (eased playhead, not raw true)
 * - dedicated rAF lerp loop (FRAME_LERP)
 * - nearest loaded-frame fallback (never blank / never stuck on null)
 *
 * Our old model lagged because of pin + short runway + missing-frame hold.
 */

const SEQUENCE_VH = 1000; // scroll runway for frames (~Drip desktop scale)
const HOLD_VH = 120; // last-frame hold before content below takes over
const TOTAL_VH = SEQUENCE_VH + HOLD_VH;
const FRAME_PROGRESS_END = SEQUENCE_VH / TOTAL_VH;

/** Light scrub — heavy scrub + slow lerp = skipped frames on wheel flings */
const SCROLL_SCRUB_SMOOTH_SEC = 0.28;
const FRAME_LERP = 0.22;

const COPY_LAST_FRAME = 68;
const COPY_FADE_START = 38;
/** Split exit distance — heading left, body/CTA right */
const SLIDE_HEADING_PX = 96;
const SLIDE_REST_PX = 72;

function smoothstep(t) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function frameLerpFactor(delta) {
  const d = Math.abs(delta);
  if (d > 48) return 0.72;
  if (d > 24) return 0.48;
  if (d > 10) return 0.32;
  return FRAME_LERP;
}

function cornerVisibility(frame) {
  if (frame < 0 || frame > COPY_LAST_FRAME) return 0;
  if (frame < COPY_FADE_START) return 1;
  return (
    1 -
    (frame - COPY_FADE_START) /
      Math.max(1, COPY_LAST_FRAME - COPY_FADE_START)
  );
}

/** Prefer exact frame; else walk backward then forward (Drip pattern). */
function findDrawable(index) {
  const max = FRAME_COUNT - 1;
  const i = Math.max(0, Math.min(index, max));
  const direct = getFrameImage(i);
  if (direct) return { img: direct, index: i };

  for (let back = i - 1; back >= 0; back -= 1) {
    const img = getFrameImage(back);
    if (img) return { img, index: back };
  }
  for (let fwd = i + 1; fwd <= max; fwd += 1) {
    const img = getFrameImage(fwd);
    if (img) return { img, index: fwd };
  }
  return null;
}

export default function Hero() {
  const blockRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const headingRef = useRef(null);
  const restRef = useRef(null);
  const cloudsRef = useRef(null);
  const scrollHintRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const block = blockRef.current;
    const canvas = canvasRef.current;
    const wrap = canvasWrapRef.current;
    if (!block || !canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let cancelled = false;
    let rafId = 0;
    let lastDrawn = -1;

    const targetFrameRef = { current: 0 };
    const currentFrameRef = { current: 0 };
    const lastCorner = { current: -1 };

    const syncCopy = (frame) => {
      const heading = headingRef.current;
      const rest = restRef.current;
      if (!heading || !rest) return;

      const cornerVis = cornerVisibility(frame);
      if (Math.abs(cornerVis - lastCorner.current) < 0.002) return;
      lastCorner.current = cornerVis;

      // Controlled split exit: heading ← left, sub + CTA → right
      const leave = smoothstep(1 - cornerVis);
      const headOpacity = Math.pow(cornerVis, 0.85);
      const restOpacity = Math.pow(cornerVis, 1.05);

      heading.style.opacity = String(headOpacity);
      heading.style.transform = `translate3d(${-leave * SLIDE_HEADING_PX}px, ${leave * 10}px, 0)`;
      rest.style.opacity = String(restOpacity);
      rest.style.transform = `translate3d(${leave * SLIDE_REST_PX}px, ${leave * 14}px, 0)`;

      const clouds = cloudsRef.current;
      if (clouds) {
        clouds.style.opacity = String(cornerVis);
        clouds.style.visibility = cornerVis < 0.04 ? "hidden" : "visible";
      }
      const hint = scrollHintRef.current;
      if (hint) {
        hint.style.opacity = String(cornerVis);
        hint.style.visibility = cornerVis < 0.04 ? "hidden" : "visible";
      }

      const hidden = cornerVis < 0.05;
      heading.setAttribute("aria-hidden", hidden ? "true" : "false");
      rest.setAttribute("aria-hidden", hidden ? "true" : "false");
    };

    const syncCanvasSize = () => {
      const w = Math.max(1, Math.round(wrap.clientWidth || window.innerWidth));
      const h = Math.max(1, Math.round(wrap.clientHeight || window.innerHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastDrawn = -1;
    };

    const drawFrame = (index) => {
      const found = findDrawable(index);
      const w = Math.max(1, Math.round(wrap.clientWidth || window.innerWidth));
      const h = Math.max(1, Math.round(wrap.clientHeight || window.innerHeight));

      // Soft fill — never flash empty / transparent
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);
      if (!found) return;

      const { img } = found;
      const scale = Math.max(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const renderLoop = () => {
      if (cancelled) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const delta = target - current;
      let next = current + delta * frameLerpFactor(delta);
      if (Math.abs(target - next) < 0.05) next = target;
      currentFrameRef.current = next;

      const display = Math.max(
        0,
        Math.min(FRAME_COUNT - 1, Math.round(next))
      );
      if (display !== lastDrawn) {
        drawFrame(display);
        lastDrawn = display;
        syncCopy(display);
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    startFramePreload();
    syncCanvasSize();

    if (getFrameImage(0)) {
      drawFrame(0);
      syncCopy(0);
      setReady(true);
    }

    const unsub = subscribeFramePreload(() => {
      if (cancelled) return;
      if (getFrameImage(0)) {
        setReady(true);
        lastDrawn = -1;
      }
    });

    rafId = requestAnimationFrame(renderLoop);

    let st;
    const attachST = () => {
      if (st) st.kill();
      st = ScrollTrigger.create({
        trigger: block,
        start: "top top",
        end: "bottom top",
        scrub: SCROLL_SCRUB_SMOOTH_SEC,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onUpdate: (self) => {
          // Frames play through first portion; remainder holds last frame
          const play = Math.min(1, self.progress / FRAME_PROGRESS_END);
          targetFrameRef.current = play * (FRAME_COUNT - 1);

          // Park fixed canvas once sequence is past — stops ghosting into later sections
          const past = self.progress >= 0.998;
          wrap.style.visibility = past ? "hidden" : "visible";
          wrap.style.pointerEvents = "none";
        },
      });
      ScrollTrigger.refresh();
    };

    // Double rAF like Drip — layout ready before measuring
    let bootA = requestAnimationFrame(() => {
      bootA = requestAnimationFrame(() => {
        attachST();
        drawFrame(0);
      });
    });

    const onResize = () => {
      syncCanvasSize();
      drawFrame(Math.round(currentFrameRef.current));
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(onResize);
    ro.observe(wrap);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(bootA);
      unsub();
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (st) st.kill();
    };
  }, []);

  return (
    <section
      id="home"
      ref={blockRef}
      className="relative w-full"
      style={{ height: `${TOTAL_VH}vh` }}
      aria-label="Hero sequence"
    >
      {/* Fixed canvas layer — Drip pattern (not GSAP pin) */}
      <div
        ref={canvasWrapRef}
        className="pointer-events-none fixed inset-0 z-[1] h-dvh w-full overflow-hidden bg-neutral-950"
      >
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

        {/* Realistic mist banks — visible with intro copy, fades with it */}
        <HeroClouds ref={cloudsRef} />

        {/* Centered intro — one tight stack: title → sub → CTA */}
        <div className="pointer-events-none absolute inset-x-0 top-[max(5.75rem,14vh)] z-10 flex flex-col items-center px-5 text-center sm:top-[max(6.25rem,15vh)] sm:px-8 lg:top-[max(6.75rem,17vh)]">
          <div
            ref={headingRef}
            className="will-change-transform"
            style={{ opacity: 1 }}
          >
            <p className="type-label mb-3 text-[11px] !text-neutral-950 sm:mb-4 sm:text-[12px] lg:mb-5 lg:text-[13px]">
              Lilasons · Aurangabad
            </p>
            <h1 className="type-heading mx-auto max-w-[12ch] text-[clamp(2.75rem,8.2vw,7rem)] leading-[0.9] text-neutral-950">
              {BRAND.headline}
            </h1>
          </div>

          <div
            ref={restRef}
            className="mt-5 flex max-w-[34rem] flex-col items-center will-change-transform sm:mt-6 lg:mt-7 lg:max-w-[40rem]"
            style={{ opacity: 1 }}
          >
            <p className="type-kicker max-w-[36ch] text-[12px] !text-neutral-950 sm:text-[13px] lg:text-[14px]">
              {BRAND.tagline}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:mt-8 sm:gap-4 lg:mt-9">
              <Link
                href="/projects"
                className="type-button btn-pill btn-shine btn-solid pointer-events-auto !h-10 !px-5 text-[10px] sm:!h-12 sm:!px-7 sm:text-[11px]"
              >
                Our Projects
              </Link>
              <Link
                href="/contact"
                className="type-button btn-pill btn-shine btn-outline pointer-events-auto border-neutral-900/30 bg-white/75 backdrop-blur-sm !h-10 !px-5 text-[10px] sm:!h-12 sm:!px-7 sm:text-[11px]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint — dark on mist; fades with clouds + copy */}
        <div
          ref={scrollHintRef}
          className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-9"
          style={{ opacity: 1 }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-950 sm:text-[11px]">
            Scroll to explore
          </p>
          <motion.div
            className="flex h-9 w-5 items-start justify-center rounded-full border border-neutral-800/45 pt-1.5"
            aria-hidden="true"
          >
            <motion.span
              className="block h-1.5 w-1 rounded-full bg-neutral-900"
              animate={{ y: [0, 11, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.div>
          <motion.div
            className="h-4 w-px origin-top bg-neutral-800/50"
            animate={{ scaleY: [0.65, 1, 0.65], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>

        <div
          className={`pointer-events-none absolute inset-0 z-20 bg-neutral-950 transition-opacity duration-700 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </section>
  );
}

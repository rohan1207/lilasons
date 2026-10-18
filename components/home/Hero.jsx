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
import { isPhoneViewport } from "@/lib/mobile";

gsap.registerPlugin(ScrollTrigger);

/**
 * Same full 300-frame canvas scrub on desktop and phone.
 * Only the scroll *driver* differs:
 *   Desktop → ScrollTrigger + fixed canvas
 *   Phone   → native scroll + sticky canvas (no Lenis — avoids iOS jitter)
 * Playhead lerp is the same so phone feels as smooth as desktop.
 */

const DESKTOP = { sequence: 1000, hold: 120, scrub: 0.28, lerp: 0.22 };
const PHONE = { sequence: 1000, hold: 120, lerp: 0.28 };

const COPY_LAST_FRAME = 68;
const COPY_FADE_START = 38;
const SLIDE_HEADING_PX = 96;
const SLIDE_REST_PX = 72;

function smoothstep(t) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function frameLerpFactor(delta, baseLerp) {
  const d = Math.abs(delta);
  if (d > 48) return Math.min(1, baseLerp + 0.55);
  if (d > 24) return Math.min(1, baseLerp + 0.3);
  if (d > 10) return Math.min(1, baseLerp + 0.12);
  return baseLerp;
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

function findDrawable(index) {
  const i = Math.max(0, Math.min(index, FRAME_COUNT - 1));
  const img = getFrameImage(i);
  return img ? { img, index: i } : null;
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
  const [phone, setPhone] = useState(false);

  useEffect(() => {
    const sync = () => setPhone(isPhoneViewport());
    sync();
    const mq = window.matchMedia("(max-width: 767px)");
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const block = blockRef.current;
    const canvas = canvasRef.current;
    const wrap = canvasWrapRef.current;
    if (!block || !canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const onPhone = isPhoneViewport();
    const cfg = onPhone ? PHONE : DESKTOP;
    const totalVh = cfg.sequence + cfg.hold;
    const frameProgressEnd = cfg.sequence / totalVh;
    block.style.height = `${totalVh}vh`;

    let cancelled = false;
    let rafId = 0;
    let lastDrawn = -1;
    let touchTimer = 0;
    let phoneLooping = false;

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

      const leave = smoothstep(1 - cornerVis);
      heading.style.opacity = String(Math.pow(cornerVis, 0.85));
      heading.style.transform = `translate3d(${-leave * SLIDE_HEADING_PX}px, ${leave * 10}px, 0)`;
      rest.style.opacity = String(Math.pow(cornerVis, 1.05));
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
      const dpr = onPhone ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      const bw = Math.round(w * dpr);
      const bh = Math.round(h * dpr);
      if (canvas.width === bw && canvas.height === bh) return;
      canvas.width = bw;
      canvas.height = bh;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastDrawn = -1;
    };

    const drawFrame = (index) => {
      const found = findDrawable(index);
      if (!found?.img) return null;

      const w = Math.max(1, Math.round(wrap.clientWidth || window.innerWidth));
      const h = Math.max(1, Math.round(wrap.clientHeight || window.innerHeight));
      const { img } = found;
      const scale = Math.max(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      // Overwrite previous frame — never clear to black
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      return found;
    };

    const applyProgress = (progress) => {
      const play = Math.min(1, Math.max(0, progress) / frameProgressEnd);
      targetFrameRef.current = play * (FRAME_COUNT - 1);
    };

    /** Shared playhead — same smoothing desktop uses. */
    const renderLoop = () => {
      if (cancelled) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const delta = target - current;
      let next = current + delta * frameLerpFactor(delta, cfg.lerp);
      if (Math.abs(target - next) < 0.05) next = target;
      currentFrameRef.current = next;

      const display = Math.max(
        0,
        Math.min(FRAME_COUNT - 1, Math.round(next)),
      );
      if (display !== lastDrawn) {
        const found = drawFrame(display);
        if (found) {
          lastDrawn = display;
          syncCopy(found.index);
          setReady(true);
        }
      }

      const catchingUp = Math.abs(target - next) >= 0.05;
      const inHero =
        onPhone && block.getBoundingClientRect().bottom > 8;
      if (catchingUp || (onPhone && (phoneLooping || inHero))) {
        rafId = requestAnimationFrame(renderLoop);
      } else {
        rafId = 0;
      }
    };

    const kickRender = () => {
      if (cancelled) return;
      if (!rafId) rafId = requestAnimationFrame(renderLoop);
    };

    const readNativeProgress = () => {
      const total = Math.max(1, block.offsetHeight - window.innerHeight);
      const top = block.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, -top / total));
    };

    /** Phone: only update the *target* playhead — lerp handles smoothness. */
    const onNativeScroll = () => {
      if (!onPhone || cancelled) return;
      const progress = readNativeProgress();
      applyProgress(progress);
      kickRender();
      wrap.style.pointerEvents = "none";
    };

    startFramePreload();
    syncCanvasSize();

    const paintCurrent = () => {
      const idx = Math.round(currentFrameRef.current);
      if (!getFrameImage(idx) && !getFrameImage(0)) return false;
      lastDrawn = -1;
      const found = drawFrame(idx);
      if (found) {
        syncCopy(found.index);
        setReady(true);
      }
      kickRender();
      return true;
    };

    paintCurrent();

    const unsub = subscribeFramePreload(() => {
      if (cancelled) return;
      if (!getFrameImage(0) && !getFrameImage(Math.round(currentFrameRef.current))) {
        return;
      }
      setReady(true);
      lastDrawn = -1;
      kickRender();
      if (onPhone) onNativeScroll();
    });

    const startTouchPoll = () => {
      phoneLooping = true;
      if (touchTimer) return;
      onNativeScroll();
      // Keep sampling scroll position while finger is down (iOS scroll events are sparse)
      touchTimer = window.setInterval(onNativeScroll, 16);
      kickRender();
    };
    const stopTouchPoll = () => {
      phoneLooping = false;
      if (touchTimer) {
        window.clearInterval(touchTimer);
        touchTimer = 0;
      }
      onNativeScroll();
      // Keep lerping until playhead catches the final target
      kickRender();
    };

    let st = null;
    if (!onPhone) {
      st = ScrollTrigger.create({
        trigger: block,
        start: "top top",
        end: "bottom top",
        scrub: cfg.scrub,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onUpdate: (self) => {
          applyProgress(self.progress);
          kickRender();
          wrap.style.visibility = self.progress >= 0.998 ? "hidden" : "visible";
          wrap.style.pointerEvents = "none";
        },
      });
      ScrollTrigger.refresh();
      kickRender();
    } else {
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      document.addEventListener("scroll", onNativeScroll, {
        passive: true,
        capture: true,
      });
      window.addEventListener("touchstart", startTouchPoll, { passive: true });
      window.addEventListener("touchmove", onNativeScroll, { passive: true });
      window.addEventListener("touchend", stopTouchPoll, { passive: true });
      window.addEventListener("touchcancel", stopTouchPoll, { passive: true });
      onNativeScroll();
      phoneLooping = true;
      kickRender();
    }

    let bootA = requestAnimationFrame(() => {
      bootA = requestAnimationFrame(() => {
        syncCanvasSize();
        paintCurrent();
        if (st) ScrollTrigger.refresh();
        else onNativeScroll();
      });
    });

    const onLandingDone = () => {
      syncCanvasSize();
      if (st) ScrollTrigger.refresh();
      else onNativeScroll();
      kickRender();
    };
    window.addEventListener("lilasons:landing-done", onLandingDone);

    const onResize = () => {
      const next = isPhoneViewport() ? PHONE : DESKTOP;
      block.style.height = `${next.sequence + next.hold}vh`;
      syncCanvasSize();
      drawFrame(Math.round(currentFrameRef.current));
      if (st) ScrollTrigger.refresh();
      else onNativeScroll();
    };
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => {
      syncCanvasSize();
      drawFrame(Math.round(currentFrameRef.current));
    });
    ro.observe(wrap);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(bootA);
      if (touchTimer) window.clearInterval(touchTimer);
      unsub();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onNativeScroll);
      document.removeEventListener("scroll", onNativeScroll, true);
      window.removeEventListener("touchstart", startTouchPoll);
      window.removeEventListener("touchmove", onNativeScroll);
      window.removeEventListener("touchend", stopTouchPoll);
      window.removeEventListener("touchcancel", stopTouchPoll);
      window.removeEventListener("lilasons:landing-done", onLandingDone);
      ro.disconnect();
      if (st) st.kill();
    };
  }, []);

  const totalVh = phone
    ? PHONE.sequence + PHONE.hold
    : DESKTOP.sequence + DESKTOP.hold;

  return (
    <section
      id="home"
      ref={blockRef}
      className="relative w-full"
      style={{ height: `${totalVh}vh` }}
      aria-label="Hero sequence"
    >
      <div
        ref={canvasWrapRef}
        className={
          phone
            ? "pointer-events-none sticky top-0 z-[1] h-[100dvh] w-full overflow-hidden bg-neutral-950"
            : "pointer-events-none fixed inset-0 z-[1] h-dvh w-full overflow-hidden bg-neutral-950"
        }
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full"
          style={{ transform: "translateZ(0)" }}
        />

        <HeroClouds ref={cloudsRef} />

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

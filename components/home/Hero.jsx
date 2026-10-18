"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FRAME_COUNT,
  frameSrc,
  getFrameImage,
  getLoadedPhoneScrubFrames,
  getPhoneScrubFrames,
  loadFrameIndices,
  startFramePreload,
  subscribeFramePreload,
} from "@/lib/framePreloader";
import { BRAND } from "@/lib/brand";
import HeroClouds from "@/components/home/HeroClouds";
import { isCoarsePointer, isPhoneViewport } from "@/lib/mobile";

gsap.registerPlugin(ScrollTrigger);

/**
 * Desktop (fine pointer / wide): fixed canvas + ScrollTrigger scrub.
 * Phone / real touch: sticky canvas + scrollY progress.
 *   DevTools "phone" + mouse wheel still paints a fixed layer — real iOS does not
 *   update position:fixed canvases during touch momentum. Sticky fixes that.
 */

const DESKTOP = { sequenceVh: 1000, holdVh: 120, scrub: 0.28, lerp: 0.22 };
const PHONE = { sequenceVh: 380, holdVh: 40 };

const COPY_LAST_FRAME = 68;
const COPY_FADE_START = 38;
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
  return 0.22;
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

function findDrawableDesktop(index) {
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

/** Real touch device — not just a narrow DevTools pane with a mouse. */
function useTouchScrub() {
  return isPhoneViewport() && isCoarsePointer();
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
  const [touchScrub, setTouchScrub] = useState(false);

  useEffect(() => {
    const sync = () => {
      setPhone(isPhoneViewport());
      setTouchScrub(useTouchScrub());
    };
    sync();
    const mqW = window.matchMedia("(max-width: 767px)");
    const mqP = window.matchMedia("(pointer: coarse)");
    mqW.addEventListener("change", sync);
    mqP.addEventListener("change", sync);
    return () => {
      mqW.removeEventListener("change", sync);
      mqP.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const block = blockRef.current;
    const canvas = canvasRef.current;
    const wrap = canvasWrapRef.current;
    if (!block || !canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Narrow viewport OR real touch → phone scroll scrub (no ScrollTrigger pin fight)
    const onPhone = isPhoneViewport();
    const isTouch = isCoarsePointer();
    // Prefer sticky whenever phone-width: DevTools wheel still works with sticky;
    // real iOS *requires* sticky (fixed canvas freezes mid-scroll).
    const stickyMode = onPhone;

    const sequenceVh = onPhone ? PHONE.sequenceVh : DESKTOP.sequenceVh;
    const holdVh = onPhone ? PHONE.holdVh : DESKTOP.holdVh;
    const totalVh = sequenceVh + holdVh;
    const frameProgressEnd = sequenceVh / totalVh;
    block.style.height = `${totalVh}vh`;

    let cancelled = false;
    let rafId = 0;
    let lastDrawn = -1;
    let touchInterval = 0;

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
      if (
        canvas.width === Math.round(w * dpr) &&
        canvas.height === Math.round(h * dpr)
      ) {
        return;
      }
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastDrawn = -1;
    };

    const paintImage = (img) => {
      const w = Math.max(1, Math.round(wrap.clientWidth || window.innerWidth));
      const h = Math.max(1, Math.round(wrap.clientHeight || window.innerHeight));
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);
      if (!img) return;
      const scale = Math.max(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    const drawAbsoluteFrame = (index) => {
      const found = onPhone
        ? (() => {
            const img = getFrameImage(index);
            return img ? { img, index } : null;
          })()
        : findDrawableDesktop(index);
      if (!found) {
        paintImage(null);
        return;
      }
      paintImage(found.img);
      syncCopy(found.index);
    };

    /**
     * Document scrollY based — more reliable on iOS than getBoundingClientRect
     * alone while the address bar resizes during touch scroll.
     */
    const readProgress = () => {
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;
      const blockTop = block.offsetTop;
      const scrollable = Math.max(1, block.offsetHeight - window.innerHeight);
      return Math.min(1, Math.max(0, (scrollY - blockTop) / scrollable));
    };

    const frameFromPhoneProgress = (progress) => {
      const play = Math.min(1, progress / frameProgressEnd);
      const loaded = getLoadedPhoneScrubFrames();
      if (loaded.length === 0) return 0;
      if (loaded.length === 1) return loaded[0];
      const i = Math.min(
        loaded.length - 1,
        Math.round(play * (loaded.length - 1)),
      );
      return loaded[i];
    };

    const applyPhoneScroll = () => {
      if (cancelled || !onPhone) return;
      syncCanvasSize();
      const progress = readProgress();
      const frame = frameFromPhoneProgress(progress);
      targetFrameRef.current = frame;
      currentFrameRef.current = frame;

      if (frame !== lastDrawn) {
        drawAbsoluteFrame(frame);
        lastDrawn = frame;
        setReady(true);
      }

      // Sticky naturally leaves the viewport; keep a hard hide as safety for fixed fallback
      if (!stickyMode) {
        wrap.style.visibility = progress >= 0.998 ? "hidden" : "visible";
      }
      wrap.style.pointerEvents = "none";
    };

    const desktopLoop = () => {
      if (cancelled) return;
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const delta = target - current;
      let next = current + delta * frameLerpFactor(delta);
      if (Math.abs(target - next) < 0.05) next = target;
      currentFrameRef.current = next;

      const display = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(next)));
      if (display !== lastDrawn) {
        drawAbsoluteFrame(display);
        lastDrawn = display;
        setReady(true);
      }

      if (Math.abs(target - next) >= 0.05) {
        rafId = requestAnimationFrame(desktopLoop);
      } else {
        rafId = 0;
      }
    };

    const kickDesktop = () => {
      if (!rafId) rafId = requestAnimationFrame(desktopLoop);
    };

    startFramePreload();
    if (onPhone) {
      loadFrameIndices(getPhoneScrubFrames(), 8);
    }
    syncCanvasSize();

    {
      const img0 = getFrameImage(0);
      if (img0) {
        drawAbsoluteFrame(0);
        setReady(true);
      }
    }

    const unsub = subscribeFramePreload(() => {
      if (cancelled) return;
      if (onPhone) {
        applyPhoneScroll();
        if (getLoadedPhoneScrubFrames().length > 0) setReady(true);
      } else if (getFrameImage(0)) {
        setReady(true);
        lastDrawn = -1;
        kickDesktop();
      }
    });

    if (onPhone) {
      const onScroll = () => applyPhoneScroll();

      // iOS pauses rAF during momentum scroll — setInterval keeps drawing.
      const startTouchPoll = () => {
        if (touchInterval) return;
        applyPhoneScroll();
        touchInterval = window.setInterval(applyPhoneScroll, 32);
      };
      const stopTouchPoll = () => {
        if (touchInterval) {
          window.clearInterval(touchInterval);
          touchInterval = 0;
        }
        applyPhoneScroll();
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("scroll", onScroll, { passive: true, capture: true });
      window.addEventListener("touchstart", startTouchPoll, { passive: true });
      window.addEventListener("touchmove", onScroll, { passive: true });
      window.addEventListener("touchend", stopTouchPoll, { passive: true });
      window.addEventListener("touchcancel", stopTouchPoll, { passive: true });
      window.visualViewport?.addEventListener("resize", onScroll);
      window.visualViewport?.addEventListener("scroll", onScroll);

      applyPhoneScroll();
      const t1 = window.setTimeout(applyPhoneScroll, 100);
      const t2 = window.setTimeout(applyPhoneScroll, 400);

      const onResize = () => {
        block.style.height = `${PHONE.sequenceVh + PHONE.holdVh}vh`;
        syncCanvasSize();
        applyPhoneScroll();
      };
      window.addEventListener("resize", onResize);

      return () => {
        cancelled = true;
        cancelAnimationFrame(rafId);
        if (touchInterval) window.clearInterval(touchInterval);
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        unsub();
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("scroll", onScroll, true);
        window.removeEventListener("touchstart", startTouchPoll);
        window.removeEventListener("touchmove", onScroll);
        window.removeEventListener("touchend", stopTouchPoll);
        window.removeEventListener("touchcancel", stopTouchPoll);
        window.visualViewport?.removeEventListener("resize", onScroll);
        window.visualViewport?.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    }

    // Desktop ScrollTrigger path
    const st = ScrollTrigger.create({
      trigger: block,
      start: "top top",
      end: "bottom top",
      scrub: DESKTOP.scrub,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      onUpdate: (self) => {
        const play = Math.min(1, self.progress / frameProgressEnd);
        targetFrameRef.current = play * (FRAME_COUNT - 1);
        kickDesktop();
        wrap.style.visibility = self.progress >= 0.998 ? "hidden" : "visible";
        wrap.style.pointerEvents = "none";
      },
    });

    rafId = requestAnimationFrame(desktopLoop);
    ScrollTrigger.refresh();

    const onResize = () => {
      block.style.height = `${DESKTOP.sequenceVh + DESKTOP.holdVh}vh`;
      syncCanvasSize();
      lastDrawn = -1;
      kickDesktop();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => {
      syncCanvasSize();
      lastDrawn = -1;
      kickDesktop();
    });
    ro.observe(wrap);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      unsub();
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      st.kill();
    };
  }, []);

  const totalVh = phone
    ? PHONE.sequenceVh + PHONE.holdVh
    : DESKTOP.sequenceVh + DESKTOP.holdVh;

  // Sticky on phone: stays in document flow so iOS paints canvas during touch scroll.
  // Fixed on desktop: full-bleed pin over the tall runway.
  const wrapClass = phone
    ? "pointer-events-none sticky top-0 z-[1] h-[100dvh] w-full overflow-hidden bg-neutral-950"
    : "pointer-events-none fixed inset-0 z-[1] h-dvh w-full overflow-hidden bg-neutral-950";

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
        className={wrapClass}
        style={
          phone
            ? {
                backgroundImage: `url(${frameSrc(0)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
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

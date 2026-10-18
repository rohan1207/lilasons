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
  getPhoneScrubFrames,
  loadFrameIndices,
  startFramePreload,
  subscribeFramePreload,
} from "@/lib/framePreloader";
import { BRAND } from "@/lib/brand";
import HeroClouds from "@/components/home/HeroClouds";
import { isPhoneViewport } from "@/lib/mobile";

gsap.registerPlugin(ScrollTrigger);

/**
 * Desktop: fixed canvas + ScrollTrigger scrub (full 300).
 * Phone (anti-jitter, no Lenis / no ST):
 *   sticky layer + native scroll → full phoneFrames list → CSS backgroundImage
 *   (canvas hidden — iOS freezes fixed-canvas paints during touch momentum).
 */

const DESKTOP = { sequence: 1000, hold: 120, scrub: 0.28, lerp: 0.22 };
const PHONE = { sequence: 340, hold: 48, lerp: 1 };

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
  if (baseLerp >= 0.99) return 1;
  if (d > 48) return 0.85;
  if (d > 24) return 0.55;
  if (d > 10) return 0.38;
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

/** Nearest loaded frame — never collapse the whole scrub onto frame 0. */
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
    const phoneFrames = onPhone ? getPhoneScrubFrames() : null;
    const totalVh = cfg.sequence + cfg.hold;
    const frameProgressEnd = cfg.sequence / totalVh;
    block.style.height = `${totalVh}vh`;

    let cancelled = false;
    let rafId = 0;
    let lastDrawn = -1;
    let touchTimer = 0;
    let lastBgIndex = -1;

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

    const setPhoneBg = (frameIndex) => {
      if (!onPhone) return;
      const i = Math.max(0, Math.min(FRAME_COUNT - 1, frameIndex));
      if (i === lastBgIndex) return;
      lastBgIndex = i;
      wrap.style.backgroundImage = `url(${frameSrc(i)})`;
      wrap.style.backgroundSize = "cover";
      wrap.style.backgroundPosition = "center";
    };

    const drawFrame = (index) => {
      // Phone: CSS background is the visible scrub (updates during touch scroll).
      // Always point at the target index so animation isn't gated on preload cache.
      if (onPhone) {
        setPhoneBg(index);
        return findDrawable(index) || { img: null, index };
      }

      const found = findDrawable(index);
      const w = Math.max(1, Math.round(wrap.clientWidth || window.innerWidth));
      const h = Math.max(1, Math.round(wrap.clientHeight || window.innerHeight));

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);
      if (!found) return found;

      const { img } = found;
      const scale = Math.max(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      return found;
    };

    const applyProgress = (progress) => {
      const play = Math.min(1, Math.max(0, progress) / frameProgressEnd);
      if (phoneFrames) {
        const idx = Math.min(
          phoneFrames.length - 1,
          Math.round(play * (phoneFrames.length - 1)),
        );
        targetFrameRef.current = phoneFrames[idx];
      } else {
        targetFrameRef.current = play * (FRAME_COUNT - 1);
      }
    };

    const renderLoop = () => {
      if (cancelled) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const delta = target - current;
      let next = current + delta * frameLerpFactor(delta, cfg.lerp);
      if (Math.abs(target - next) < 0.08) next = target;
      currentFrameRef.current = next;

      const display = Math.max(
        0,
        Math.min(FRAME_COUNT - 1, Math.round(next)),
      );
      if (display !== lastDrawn) {
        const found = drawFrame(display);
        lastDrawn = display;
        syncCopy(found?.index ?? display);
        setReady(true);
      }

      // Phone: keep the loop alive while the hero is on screen — iOS pauses
      // rAF during scroll, but when it resumes we must still catch the target.
      const stillInHero =
        onPhone &&
        (block.getBoundingClientRect().bottom > 0 ||
          Math.abs(target - next) >= 0.08);
      if (stillInHero || Math.abs(target - next) >= 0.08) {
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

    const onNativeScroll = () => {
      if (!onPhone || cancelled) return;
      const progress = readNativeProgress();
      applyProgress(progress);
      // Synchronous draw path — do not wait for rAF (paused on iOS scroll)
      const target = targetFrameRef.current;
      currentFrameRef.current = target;
      const display = Math.round(target);
      if (display !== lastDrawn) {
        const found = drawFrame(display);
        lastDrawn = display;
        syncCopy(found?.index ?? display);
        setReady(true);
      }
      kickRender();

      const past = progress >= 0.998;
      wrap.style.visibility = past ? "hidden" : "visible";
      wrap.style.pointerEvents = "none";
    };

    startFramePreload();
    if (phoneFrames) {
      loadFrameIndices(phoneFrames, 8);
    }
    syncCanvasSize();

    const paintCurrent = () => {
      const idx = Math.round(currentFrameRef.current);
      if (!getFrameImage(idx) && !getFrameImage(0)) return false;
      lastDrawn = -1;
      drawFrame(idx);
      syncCopy(idx);
      setReady(true);
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
      if (onPhone) onNativeScroll();
      else kickRender();
    });

    const startTouchPoll = () => {
      if (touchTimer) return;
      onNativeScroll();
      touchTimer = window.setInterval(onNativeScroll, 32);
    };
    const stopTouchPoll = () => {
      if (touchTimer) {
        window.clearInterval(touchTimer);
        touchTimer = 0;
      }
      onNativeScroll();
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

  return (
    <section
      id="home"
      ref={blockRef}
      className="relative w-full"
      style={{
        height: phone
          ? `${PHONE.sequence + PHONE.hold}vh`
          : `${DESKTOP.sequence + DESKTOP.hold}vh`,
      }}
      aria-label="Hero sequence"
    >
      <div
        ref={canvasWrapRef}
        className="pointer-events-none fixed inset-0 z-[1] h-dvh w-full overflow-hidden bg-neutral-950"
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
        {/* Phone: canvas stays for decode/warmup but CSS bg is the visible scrub
            (iOS freezes fixed-canvas paints during touch momentum). */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 block h-full w-full ${
            phone ? "opacity-0" : ""
          }`}
          style={{ transform: "translateZ(0)" }}
          aria-hidden={phone ? "true" : undefined}
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

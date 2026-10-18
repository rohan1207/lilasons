"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldUseNativeScroll } from "@/lib/mobile";

import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Desktop: calm Lenis + ScrollTrigger sync.
 * Phone / coarse touch: native scroll only — Lenis causes jitter & hangs on iOS.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || shouldUseNativeScroll()) {
      window.__tskLenis = null;
      // Keep ScrollTrigger on native scroll events
      const onScroll = () => ScrollTrigger.update();
      window.addEventListener("scroll", onScroll, { passive: true });
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    }

    const lenis = new Lenis({
      lerp: 0.068,
      wheelMultiplier: 0.52,
      touchMultiplier: 0.72,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    window.__tskLenis = lenis;

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const syncLock = () => {
      const locked =
        document.body.style.overflow === "hidden" ||
        document.documentElement.style.overflow === "hidden";
      if (locked) lenis.stop();
      else lenis.start();
    };
    syncLock();

    const mo = new MutationObserver(syncLock);
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      mo.disconnect();
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(onTick);
      if (window.__tskLenis === lenis) delete window.__tskLenis;
      lenis.destroy();
    };
  }, []);

  return children;
}

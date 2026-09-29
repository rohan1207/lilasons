"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide calm scroll — dampens wheel flings so sections aren't skipped,
 * and keeps GSAP ScrollTrigger (hero + expand) in sync.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    const lenis = new Lenis({
      // Heavier, premium feel — less distance per wheel tick
      lerp: 0.068,
      wheelMultiplier: 0.52,
      touchMultiplier: 0.72,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    window.__tskLenis = lenis;

    // Drive Lenis from GSAP ticker so scrub/pin stay locked to the same clock
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

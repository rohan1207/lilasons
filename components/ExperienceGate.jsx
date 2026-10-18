"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandingScreen from "@/components/landing/LandingScreen";
import HomeView from "@/components/home/HomeView";
import { startFramePreload } from "@/lib/framePreloader";

gsap.registerPlugin(ScrollTrigger);

/**
 * Home mounts under the landing overlay from the start.
 * At 100%, landing slides up — home is already painted (no route delay).
 */
export default function ExperienceGate() {
  const [phase, setPhase] = useState("loading"); // loading | exiting | done

  useEffect(() => {
    startFramePreload();
  }, []);

  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  const handleComplete = useCallback(() => {
    setPhase((p) => (p === "loading" ? "exiting" : p));
  }, []);

  return (
    <div className="relative min-h-dvh">
      {/* Already live under the loader — zero navigation wait */}
      <HomeView />

      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] will-change-transform"
          initial={{ y: 0 }}
          animate={{ y: phase === "exiting" ? "-100%" : 0 }}
          transition={{
            duration: 0.85,
            ease: [0.76, 0, 0.24, 1],
          }}
          onAnimationComplete={() => {
            if (phase !== "exiting") return;
            setPhase("done");
            window.history.replaceState(null, "", "/home");
            // Unlock scroll layout + wake phone hero scrub
            requestAnimationFrame(() => {
              ScrollTrigger.refresh();
              window.dispatchEvent(new Event("scroll"));
              window.dispatchEvent(new Event("lilasons:landing-done"));
            });
          }}
        >
          <LandingScreen onComplete={handleComplete} />
        </motion.div>
      )}
    </div>
  );
}

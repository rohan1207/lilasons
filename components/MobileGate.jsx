"use client";

import { useEffect } from "react";

/**
 * Full-screen gate for phone / small screens.
 * Desktop experience only for now.
 */
export default function MobileGate({ children }) {
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      if (mq.matches) {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div className="hidden min-h-dvh md:block">{children}</div>

      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f7f7f7] px-8 text-center md:hidden">
        <p className="type-label mb-3 text-[11px] text-neutral-400">
          Lilasons Developers
        </p>
        <h1 className="type-heading max-w-[16ch] text-[28px] leading-[1.1] tracking-[-0.03em] text-neutral-950">
          Phone screen is in progress
        </h1>
        <p className="type-body mt-4 max-w-[28ch] text-[14px] text-neutral-500">
          Please visit us on a larger screen for the full experience.
        </p>
      </div>
    </>
  );
}

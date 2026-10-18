"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const OUTER_TICKS = 72;
const INNER_TICKS = 48;

/**
 * @param {{ progress?: number, children?: import("react").ReactNode, className?: string }} props
 */
export default function Compass({ progress = 0, children, className = "" }) {
  const rootRef = useRef(null);
  const outerRefs = useRef([]);
  const lastFilled = useRef(-1);
  const [radius, setRadius] = useState({ outer: 190, inner: 128 });

  const outerTicks = useMemo(
    () => Array.from({ length: OUTER_TICKS }, (_, i) => i),
    [],
  );
  const innerTicks = useMemo(
    () => Array.from({ length: INNER_TICKS }, (_, i) => i),
    [],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;

    const measure = () => {
      const size = el.getBoundingClientRect().width;
      setRadius({
        outer: size * 0.455,
        inner: size * 0.3,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const filled = Math.min(
      OUTER_TICKS,
      Math.max(0, Math.round(progress * OUTER_TICKS)),
    );
    if (filled === lastFilled.current) return;
    lastFilled.current = filled;

    outerRefs.current.forEach((tick, i) => {
      if (!tick) return;
      tick.style.backgroundColor = i < filled ? "#1a1a1a" : "#d6d6d6";
    });
  }, [progress]);

  return (
    <div
      ref={rootRef}
      className={`relative mx-auto size-[min(78vw,420px)] sm:size-[460px] md:size-[520px] ${className}`}
      aria-hidden="true"
    >
      {outerTicks.map((i) => {
        const angle = (i / OUTER_TICKS) * 360;
        return (
          <span
            key={`o-${i}`}
            ref={(el) => {
              outerRefs.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 block h-[14px] w-[1.5px] rounded-full sm:h-4 sm:w-[2px]"
            style={{
              backgroundColor: "#d6d6d6",
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius.outer}px)`,
            }}
          />
        );
      })}

      {innerTicks.map((i) => {
        const angle = (i / INNER_TICKS) * 360;
        return (
          <span
            key={`i-${i}`}
            className="absolute left-1/2 top-1/2 block h-[7px] w-px rounded-full bg-[#e0e0e0] sm:h-2"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius.inner}px)`,
            }}
          />
        );
      })}

      <span className="absolute left-1/2 top-[12%] -translate-x-1/2 text-[12px] font-semibold tracking-[0.22em] text-[var(--accent)] sm:text-[13px]">
        N
      </span>
      <span className="absolute right-[12%] top-1/2 -translate-y-1/2 text-[12px] font-semibold tracking-[0.22em] text-neutral-700 sm:text-[13px]">
        E
      </span>
      <span className="absolute bottom-[12%] left-1/2 -translate-x-1/2 text-[12px] font-semibold tracking-[0.22em] text-neutral-700 sm:text-[13px]">
        S
      </span>
      <span className="absolute left-[12%] top-1/2 -translate-y-1/2 text-[12px] font-semibold tracking-[0.22em] text-neutral-700 sm:text-[13px]">
        W
      </span>

      <div className="absolute left-1/2 top-[16%] z-[1] -translate-x-1/2">
        <svg
          width="18"
          height="48"
          viewBox="0 0 16 40"
          fill="none"
          className="h-10 w-4 sm:h-12 sm:w-[18px]"
        >
          <path d="M8 0L15.5 39H0.5L8 0Z" fill="#c5e24a" />
        </svg>
      </div>

      <div className="absolute inset-[24%] z-[2] flex items-center justify-center sm:inset-[26%]">
        {children}
      </div>
    </div>
  );
}

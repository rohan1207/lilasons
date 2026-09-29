"use client";

import { useEffect, useMemo, useRef } from "react";

const OUTER_TICKS = 72;
const INNER_TICKS = 48;

/**
 * @param {{ progress?: number }} props
 * progress: 0–1 drives the outer ring fill (real preload progress)
 */
export default function Compass({ progress = 0 }) {
  const outerRefs = useRef([]);
  const lastFilled = useRef(-1);

  const outerTicks = useMemo(
    () => Array.from({ length: OUTER_TICKS }, (_, i) => i),
    []
  );
  const innerTicks = useMemo(
    () => Array.from({ length: INNER_TICKS }, (_, i) => i),
    []
  );

  useEffect(() => {
    const filled = Math.min(
      OUTER_TICKS,
      Math.max(0, Math.round(progress * OUTER_TICKS))
    );
    if (filled === lastFilled.current) return;
    lastFilled.current = filled;

    outerRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.backgroundColor = i < filled ? "#1a1a1a" : "#d6d6d6";
    });
  }, [progress]);

  return (
    <div
      className="relative mx-auto size-[260px] sm:size-[300px]"
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
            className="absolute left-1/2 top-1/2 block h-[12px] w-[1.5px] rounded-full"
            style={{
              backgroundColor: "#d6d6d6",
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-118px)`,
            }}
          />
        );
      })}

      {innerTicks.map((i) => {
        const angle = (i / INNER_TICKS) * 360;
        return (
          <span
            key={`i-${i}`}
            className="absolute left-1/2 top-1/2 block h-[6px] w-px rounded-full bg-[#e0e0e0]"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-78px)`,
            }}
          />
        );
      })}

      <span className="absolute left-1/2 top-[22%] -translate-x-1/2 text-[11px] font-medium tracking-[0.2em] text-[#c5e24a]">
        N
      </span>
      <span className="absolute right-[22%] top-1/2 -translate-y-1/2 text-[11px] font-medium tracking-[0.2em] text-neutral-400">
        E
      </span>
      <span className="absolute bottom-[22%] left-1/2 -translate-x-1/2 text-[11px] font-medium tracking-[0.2em] text-neutral-400">
        S
      </span>
      <span className="absolute left-[22%] top-1/2 -translate-y-1/2 text-[11px] font-medium tracking-[0.2em] text-neutral-400">
        W
      </span>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[62%]">
        <svg width="16" height="40" viewBox="0 0 16 40" fill="none">
          <path d="M8 0L15.5 39H0.5L8 0Z" fill="#c5e24a" />
          <path
            d="M8 2L8 38"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="0.75"
          />
        </svg>
      </div>
    </div>
  );
}

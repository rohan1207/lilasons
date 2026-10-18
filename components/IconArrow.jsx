/**
 * Minimal geometric arrow — no emoji (iOS/Android replace text arrows with cartoon glyphs).
 * @param {{ dir?: "ne" | "se" | "nw" | "sw" | "up" | "down" | "left" | "right", className?: string }} props
 */
export default function IconArrow({ dir = "ne", className = "h-3.5 w-3.5" }) {
  const rotate = {
    ne: "-45",
    se: "45",
    sw: "135",
    nw: "-135",
    right: "0",
    down: "90",
    left: "180",
    up: "-90",
  }[dir] ?? "-45";

  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M3 8h9.5M8.5 3.5 13.5 8l-5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

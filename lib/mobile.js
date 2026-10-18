/** True for phone / tablet-touch where native scroll must win. */
export function isPhoneViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

export function isCoarsePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

/** Prefer native scroll on touch phones (Lenis + pins fight iOS momentum). */
export function shouldUseNativeScroll() {
  if (typeof window === "undefined") return false;
  return (
    isPhoneViewport() ||
    (isCoarsePointer() && window.matchMedia("(max-width: 1023px)").matches)
  );
}

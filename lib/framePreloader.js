/**
 * Shared scroll-frame cache (300 WebP frames — public/frames).
 * Landing runs a timed ~7.5s loader while we preload as many frames
 * as possible in parallel; remaining frames keep loading after redirect.
 */

export const FRAME_COUNT = 300;

/** Landing UI always covers 0→100% in this window (ms) */
export const LANDING_LOAD_MS = 7500;

export function frameSrc(index) {
  const n = String(index + 1).padStart(3, "0");
  return `/frames/ezgif-frame-${n}.webp`;
}

export const LANDING_BG_SRC = frameSrc(12);

const images = /** @type {(HTMLImageElement | undefined)[]} */ (
  new Array(FRAME_COUNT)
);

/** @type {Set<number>} */
const settled = new Set();
/** @type {Map<number, Promise<HTMLImageElement | undefined>>} */
const pending = new Map();

let loadedCount = 0;
let started = false;

/** @type {Set<(state: { loadedCount: number, totalProgress: number }) => void>} */
const listeners = new Set();

function getState() {
  return {
    loadedCount,
    totalProgress: loadedCount / FRAME_COUNT,
  };
}

function notify() {
  const state = getState();
  listeners.forEach((fn) => fn(state));
}

/**
 * @param {(state: ReturnType<typeof getState>) => void} fn
 */
export function subscribeFramePreload(fn) {
  listeners.add(fn);
  fn(getState());
  return () => listeners.delete(fn);
}

export function getFrameImage(index) {
  const img = images[index];
  if (img?.complete && img.naturalWidth > 0) return img;
  return null;
}

function markSettled(index, img) {
  if (settled.has(index)) return;
  settled.add(index);
  images[index] = img;
  loadedCount = settled.size;
  notify();
}

function loadOne(index) {
  if (getFrameImage(index)) return Promise.resolve(images[index]);
  if (pending.has(index)) return pending.get(index);

  const promise = new Promise((resolve) => {
    const img = new Image();
    // Skip await decode() — it was slowing the old 50% gate badly
    img.decoding = "async";
    img.src = frameSrc(index);

    img.onload = () => {
      markSettled(index, img);
      pending.delete(index);
      resolve(img);
    };
    img.onerror = () => {
      markSettled(index, img);
      pending.delete(index);
      resolve(undefined);
    };
  });

  pending.set(index, promise);
  return promise;
}

async function loadRange(start, end, concurrency) {
  for (let i = start; i < end; i += concurrency) {
    const batch = [];
    for (let j = i; j < Math.min(i + concurrency, end); j += 1) {
      batch.push(loadOne(j));
    }
    await Promise.all(batch);
  }
}

/**
 * Kick off frame preload.
 * Safe to call many times — keeps going in the background after landing.
 * Phone: lower concurrency + prioritize early frames first (hero needs 0+).
 */
export function startFramePreload() {
  if (started) return;
  started = true;

  const phone =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  if (phone) {
    // Hero-critical frames first, then the rest at gentler concurrency
    void (async () => {
      await loadRange(0, Math.min(48, FRAME_COUNT), 8);
      if (FRAME_COUNT > 48) await loadRange(48, FRAME_COUNT, 6);
    })();
    return;
  }

  // Desktop: pack as many as possible into the ~7.5s landing window
  loadRange(0, FRAME_COUNT, 28);
}

export function getLoadedCount() {
  return loadedCount;
}

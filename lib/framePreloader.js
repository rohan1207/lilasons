/**
 * Shared scroll-frame cache (300 WebP frames — public/frames).
 * Landing blocks until all 300 are decoded (desktop + phone) so home never flashes.
 */

export const FRAME_COUNT = 300;

/** Soft minimum time on landing so % doesn't jump instantly on cache hits */
export const LANDING_MIN_MS = 1800;

/** Hard cap — never trap the user if a few frames fail */
export const LANDING_MAX_MS = 60000;

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

/** @type {Set<(state: ReturnType<typeof getState>) => void>} */
const listeners = new Set();

/** Full sequence — same on phone and desktop. */
export function getRequiredFrameIndices() {
  return Array.from({ length: FRAME_COUNT }, (_, i) => i);
}

function countRequiredLoaded() {
  let n = 0;
  for (let i = 0; i < FRAME_COUNT; i += 1) {
    if (getFrameImage(i)) n += 1;
  }
  return n;
}

function getState() {
  const requiredTotal = FRAME_COUNT;
  const requiredLoaded = countRequiredLoaded();
  return {
    loadedCount,
    totalProgress: loadedCount / FRAME_COUNT,
    requiredLoaded,
    requiredTotal,
    requiredProgress: requiredLoaded / requiredTotal,
    ready: requiredLoaded >= requiredTotal,
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

export function isHeroFramesReady() {
  return getState().ready;
}

export function getHeroLoadProgress() {
  return getState().requiredProgress;
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
    img.decoding = "sync";
    img.src = frameSrc(index);

    const finish = async () => {
      if (img.naturalWidth > 0) {
        try {
          if (typeof img.decode === "function") await img.decode();
        } catch {
          /* still drawable */
        }
        markSettled(index, img);
        pending.delete(index);
        resolve(img);
        return;
      }
      pending.delete(index);
      resolve(undefined);
    };

    img.onload = () => {
      void finish();
    };
    img.onerror = () => {
      pending.delete(index);
      resolve(undefined);
    };
  });

  pending.set(index, promise);
  return promise;
}

/**
 * @param {number[]} indices
 * @param {number} [concurrency=6]
 */
export function loadFrameIndices(indices, concurrency = 6) {
  const unique = [...new Set(indices)].filter(
    (i) => i >= 0 && i < FRAME_COUNT,
  );
  return (async () => {
    for (let i = 0; i < unique.length; i += concurrency) {
      await Promise.all(unique.slice(i, i + concurrency).map((idx) => loadOne(idx)));
    }
  })();
}

/** Preload all 300 frames — phone and desktop. */
export function startFramePreload() {
  if (started) return;
  started = true;

  const phone =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;
  const concurrency = phone ? 12 : 28;

  void loadFrameIndices(getRequiredFrameIndices(), concurrency);
}

export function getLoadedCount() {
  return loadedCount;
}

/** @deprecated */
export const LANDING_LOAD_MS = 7500;
/** @deprecated — phone now uses full 300 */
export const PHONE_FRAME_STEP = 1;

export function getPhoneScrubFrames() {
  return getRequiredFrameIndices();
}

export function getLoadedPhoneScrubFrames() {
  return getRequiredFrameIndices().filter((i) => getFrameImage(i));
}

export function countLoadedPhoneScrubFrames() {
  return getLoadedPhoneScrubFrames().length;
}

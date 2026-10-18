/**
 * Shared scroll-frame cache (300 WebP frames — public/frames).
 * Landing runs a timed loader while we preload frames in parallel.
 */

export const FRAME_COUNT = 300;

/** Landing UI always covers 0→100% in this window (ms) */
export const LANDING_LOAD_MS = 7500;

/** Phone hero uses every Nth frame so the scrub set can finish loading. */
export const PHONE_FRAME_STEP = 3;

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

/** Stepped indices used for phone hero scrub (≈100 frames). */
export function getPhoneScrubFrames() {
  const list = [];
  for (let i = 0; i < FRAME_COUNT; i += PHONE_FRAME_STEP) list.push(i);
  if (list[list.length - 1] !== FRAME_COUNT - 1) list.push(FRAME_COUNT - 1);
  return list;
}

/** Only the scrub frames that are actually decoded and drawable. */
export function getLoadedPhoneScrubFrames() {
  return getPhoneScrubFrames().filter((i) => getFrameImage(i));
}

export function countLoadedPhoneScrubFrames() {
  return getLoadedPhoneScrubFrames().length;
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
    img.decoding = "async";
    img.src = frameSrc(index);

    img.onload = () => {
      markSettled(index, img);
      pending.delete(index);
      resolve(img);
    };
    img.onerror = () => {
      // Do NOT mark broken images as settled drawable — leave slot empty
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

/**
 * Kick off frame preload.
 * Phone: finish the scrub-step set first (so scroll animates), then fill gaps.
 */
export function startFramePreload() {
  if (started) return;
  started = true;

  const phone =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  if (phone) {
    void (async () => {
      const scrub = getPhoneScrubFrames();
      await loadFrameIndices(scrub, 8);
      // Optional fill for nicer nearest-frame quality later
      await loadRange(0, FRAME_COUNT, 4);
    })();
    return;
  }

  loadRange(0, FRAME_COUNT, 28);
}

export function getLoadedCount() {
  return loadedCount;
}

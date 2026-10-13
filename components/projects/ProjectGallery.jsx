"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const glassBtn =
  "flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-md transition hover:border-white/35 hover:bg-white/20 active:scale-95";

export default function ProjectGallery({ images, alt }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const open = lightboxIndex !== null;
  const total = images?.length || 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setLightboxIndex(null), []);

  const step = useCallback(
    (dir) => {
      setLightboxIndex((i) => (i + dir + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  if (!total) return null;

  const lightbox = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10050] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-xl backdrop-saturate-150"
            onClick={close}
            aria-label="Close gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightboxIndex]}
              alt=""
              className="h-full w-full scale-110 object-cover opacity-30 blur-3xl"
              draggable={false}
            />
          </div>

          <button
            type="button"
            onClick={close}
            className={`absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-20 h-11 w-11 sm:right-5 sm:h-12 sm:w-12 ${glassBtn}`}
            aria-label="Close"
          >
            <CloseIcon />
          </button>

          {total > 1 && (
            <button
              type="button"
              onClick={() => step(-1)}
              className={`absolute left-2 top-1/2 z-20 h-11 w-11 -translate-y-1/2 sm:left-5 sm:h-12 sm:w-12 ${glassBtn}`}
              aria-label="Previous image"
            >
              <ChevronLeft />
            </button>
          )}

          <motion.div
            key={images[lightboxIndex]}
            className="relative z-10 mx-auto flex max-h-[min(78vh,900px)] w-[min(92vw,1200px)] items-center justify-center px-12 py-16 sm:px-16 sm:py-14"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightboxIndex]}
              alt={`${alt} — image ${lightboxIndex + 1}`}
              className="max-h-[min(72vh,820px)] w-full object-contain drop-shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
              draggable={false}
            />
          </motion.div>

          {total > 1 && (
            <button
              type="button"
              onClick={() => step(1)}
              className={`absolute right-2 top-1/2 z-20 h-11 w-11 -translate-y-1/2 sm:right-5 sm:h-12 sm:w-12 ${glassBtn}`}
              aria-label="Next image"
            >
              <ChevronRight />
            </button>
          )}

          <p className="absolute bottom-[max(0.85rem,env(safe-area-inset-bottom))] left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
            {lightboxIndex + 1} / {total}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden bg-neutral-100 text-left"
            aria-label={`Open image ${i + 1} of ${total}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${alt} — image ${i + 1}`}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {mounted && createPortal(lightbox, document.body)}
    </>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectImageSlideshow({ images, alt }) {
  const [active, setActive] = useState(0);
  const total = images?.length || 0;

  const go = useCallback(
    (dir) => {
      setActive((i) => (i + dir + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (total <= 1) return undefined;
    const timer = setInterval(() => go(1), 5500);
    return () => clearInterval(timer);
  }, [go, total, active]);

  if (!total) return null;

  return (
    <div className="relative w-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 md:aspect-[16/10] lg:aspect-[21/9]">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[active]}
            src={images[active]}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            draggable={false}
          />
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/45 md:left-5 md:h-11 md:w-11"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/45 md:right-5 md:h-11 md:w-11"
              aria-label="Next image"
            >
              →
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {images.map((src, i) => (
                <button
                  key={`${src}-dot-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-8 bg-white"
                      : "w-1.5 bg-white/45 hover:bg-white/70"
                  }`}
                  aria-label={`Show image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:mt-4">
          {images.map((src, i) => (
            <button
              key={`thumb-${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition md:h-16 md:w-24 ${
                i === active
                  ? "border-[#0a0a0a]"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

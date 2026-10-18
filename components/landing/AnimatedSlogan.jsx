"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  { lead: "We", word: "craft." },
  { lead: "We", word: "build." },
  { lead: "We", word: "elevate." },
  { lead: "We", word: "belong." },
  { lead: "We", word: "endure." },
];

const ease = [0.22, 1, 0.36, 1];

export default function AnimatedSlogan() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % LINES.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const line = LINES[index];

  return (
    <div className="mt-8 flex min-h-[1.15em] items-center justify-center text-center sm:mt-10">
      <AnimatePresence mode="wait">
        <motion.p
          key={line.word}
          initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease }}
          className="type-heading text-[clamp(1.75rem,5.5vw,3.25rem)] text-neutral-950"
        >
          <span className="text-neutral-400">{line.lead}</span>{" "}
          <span>{line.word}</span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

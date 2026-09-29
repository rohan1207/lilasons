"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["build", "deliver", "care", "create", "thrive"];

export default function AnimatedSlogan() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setShow(false);
      window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % WORDS.length);
        setShow(true);
      }, 320);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="type-heading-upper mt-8 text-center text-[clamp(0.95rem,2.8vw,1.2rem)] text-neutral-800">
      we{" "}
      <motion.span
        className="inline"
        animate={{
          opacity: show ? 1 : 0,
          filter: show ? "blur(0px)" : "blur(8px)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {WORDS[index]}
      </motion.span>
    </p>
  );
}

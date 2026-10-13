"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

function splitSentences(text) {
  return (
    text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((s) => s.trim()).filter(Boolean) ?? [
      text,
    ]
  );
}

export function ScrollRevealParagraph({ text, className = "", delay = 0 }) {
  const sentences = splitSentences(text);

  return (
    <p className={className}>
      {sentences.map((sentence, i) => (
        <motion.span
          key={i}
          className="inline"
          initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35, margin: "0px 0px -40px 0px" }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.12,
            ease,
          }}
        >
          {sentence}{" "}
        </motion.span>
      ))}
    </p>
  );
}

export function ScrollRevealHeading({ children, className = "", delay = 0 }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.95, delay, ease }}
      >
        {children}
      </motion.div>
    </div>
  );
}

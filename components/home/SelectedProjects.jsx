"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1];

function readNavOffset() {
  const header = document.querySelector("header");
  if (!header) {
    return window.matchMedia("(min-width: 640px)").matches ? 96 : 80;
  }
  return Math.round(header.getBoundingClientRect().height);
}

export default function SelectedProjects() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const [active, setActive] = useState(0);
  const total = PROJECTS.length;
  const project = PROJECTS[active];

  const progressWidth = useMemo(
    () => `${((active + 1) / total) * 100}%`,
    [active, total],
  );

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const layout = () => {
      const nav = readNavOffset();
      const h = Math.max(320, window.innerHeight - nav);
      stage.style.height = `${h}px`;
      return { nav, h };
    };

    layout();

    // One viewport of scroll per project while pinned
    const st = ScrollTrigger.create({
      id: "tsk-selected-projects",
      trigger: root,
      start: () => `top top+=${readNavOffset()}`,
      end: () => {
        const h = Math.max(320, window.innerHeight - readNavOffset());
        return `+=${h * total}`;
      },
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.35,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      onRefreshInit: layout,
      onUpdate: (self) => {
        const idx = Math.min(
          total - 1,
          Math.floor(self.progress * total + 0.0001),
        );
        setActive((prev) => (prev === idx ? prev : idx));
      },
    });

    const refresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refresh, 120);
    const t2 = window.setTimeout(refresh, 600);
    window.addEventListener("resize", refresh);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", refresh);
      st.kill();
    };
  }, [total]);

  return (
    <section
      id="residences"
      ref={rootRef}
      className="relative z-10 bg-white"
      aria-label="Selected projects"
    >
      <div
        ref={stageRef}
        className="relative flex w-full flex-col overflow-hidden lg:flex-row"
      >
        {/* Left panel */}
        <div className="relative flex min-h-0 w-full flex-1 flex-col justify-between bg-white px-5 py-8 sm:px-8 sm:py-10 lg:w-[46%] lg:max-w-[640px] lg:px-12 lg:py-12 xl:px-14">
          <div className="min-h-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.55, ease }}
                className="flex h-full flex-col"
              >
                <p className="type-label text-[11px] text-neutral-400 sm:text-[12px]">
                  {project.category} · {project.indexLabel}
                </p>

                <h2 className="type-heading mt-4 text-[32px] leading-[1.05] tracking-[-0.035em] text-neutral-950 sm:mt-5 sm:text-[42px] md:text-[48px] lg:text-[52px]">
                  {project.title}
                </h2>

                <p className="type-label mt-3 text-[11px] text-neutral-500 sm:mt-4 sm:text-[12px]">
                  {project.placeLine}
                </p>

                <p className="type-body mt-5 max-w-[40ch] text-[13px] text-neutral-600 sm:mt-6 sm:text-[14px] md:text-[15px]">
                  {project.summary}
                </p>

                <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-neutral-200 pt-6 sm:mt-8 sm:gap-y-5 sm:pt-7">
                  {project.meta.map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 sm:text-[11px]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-[13px] font-medium tracking-[-0.01em] text-neutral-900 sm:text-[14px]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 sm:mt-10">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="type-button btn-pill btn-shine inline-flex h-10 items-center gap-2.5 border border-neutral-900 bg-transparent px-5 text-[11px] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white sm:h-11 sm:px-6 sm:text-[12px]"
                  >
                    <span aria-hidden className="text-[13px] leading-none">
                      ↗
                    </span>
                    View Project
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress + scroll cue */}
          <div className="mt-8 flex shrink-0 items-end justify-between gap-6 pt-4 sm:mt-10">
            <div className="min-w-[120px] flex-1 max-w-[200px]">
              <p className="type-label text-[11px] text-neutral-500">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </p>
              <div className="mt-2.5 h-px w-full bg-neutral-200">
                <div
                  className="h-px bg-neutral-950 transition-[width] duration-500 ease-out"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>
            <p className="type-label pb-0.5 text-[10px] text-neutral-400 sm:text-[11px]">
              Scroll
            </p>
          </div>
        </div>

        {/* Right image */}
        <div className="relative min-h-[42vh] w-full flex-1 overflow-hidden bg-neutral-200 lg:min-h-0 lg:w-[54%]">
          <AnimatePresence mode="wait">
            <motion.img
              key={project.image}
              src={project.image}
              alt={project.alt}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.7, ease }}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

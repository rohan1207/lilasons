"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { isPhoneViewport } from "@/lib/mobile";

gsap.registerPlugin(ScrollTrigger);

function readNavOffset() {
  const header = document.querySelector("header");
  if (!header) {
    return window.matchMedia("(min-width: 640px)").matches ? 96 : 80;
  }
  return Math.round(header.getBoundingClientRect().height);
}

function indexFromProgress(progress, total) {
  if (progress >= 0.999) return total - 1;
  return Math.min(total - 1, Math.floor(progress * total));
}

function lerpFactor(distance) {
  if (distance > 0.4) return 0.14;
  if (distance > 0.2) return 0.1;
  if (distance > 0.08) return 0.075;
  return 0.055;
}

export default function SelectedProjects() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const targetProgress = useRef(0);
  const displayProgress = useRef(0);
  const activeRef = useRef(0);
  const rafRef = useRef(0);
  const barRef = useRef(null);

  const [active, setActive] = useState(0);
  const [phone, setPhone] = useState(false);

  const total = PROJECTS.length;

  useEffect(() => {
    const sync = () => setPhone(isPhoneViewport());
    sync();
    const mq = window.matchMedia("(max-width: 767px)");
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    // Phone: no ScrollTrigger pin — pins + momentum scroll hang/jitter on iOS
    if (isPhoneViewport()) {
      stage.style.height = "";
      if (barRef.current) {
        barRef.current.style.width = `${((activeRef.current + 1) / total) * 100}%`;
      }
      return undefined;
    }

    const layout = () => {
      const nav = readNavOffset();
      const h = Math.max(320, window.innerHeight - nav);
      stage.style.height = `${h}px`;
      return { nav, h };
    };

    layout();

    const tick = () => {
      const target = targetProgress.current;
      let display = displayProgress.current;
      const delta = target - display;
      const dist = Math.abs(delta);

      if (dist < 0.00035) {
        display = target;
      } else {
        display += delta * lerpFactor(dist);
      }

      displayProgress.current = display;

      if (barRef.current) {
        barRef.current.style.width = `${Math.min(100, Math.max(0, display * 100))}%`;
      }

      const idx = indexFromProgress(display, total);
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    const st = ScrollTrigger.create({
      id: "tsk-selected-projects",
      trigger: root,
      start: () => `top top+=${readNavOffset()}`,
      end: () => {
        const h = Math.max(320, window.innerHeight - readNavOffset());
        return `+=${Math.round(h * total)}`;
      },
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.65,
      invalidateOnRefresh: true,
      fastScrollEnd: false,
      onRefreshInit: layout,
      onUpdate: (self) => {
        targetProgress.current = self.progress;
      },
    });

    const refresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refresh, 120);
    const t2 = window.setTimeout(refresh, 600);
    window.addEventListener("resize", refresh);

    return () => {
      window.cancelAnimationFrame(rafRef.current);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", refresh);
      st.kill();
    };
  }, [total, phone]);

  useEffect(() => {
    activeRef.current = active;
    if (phone && barRef.current) {
      barRef.current.style.width = `${((active + 1) / total) * 100}%`;
    }
  }, [active, phone, total]);

  const go = (dir) => {
    setActive((prev) => {
      const next = (prev + dir + total) % total;
      return next;
    });
  };

  return (
    <section
      id="residences"
      ref={rootRef}
      className="relative z-10 bg-white"
      aria-label="Selected work"
    >
      <div
        ref={stageRef}
        className="relative flex w-full flex-col overflow-hidden lg:flex-row"
      >
        <div className="relative order-2 flex min-h-0 w-full flex-1 flex-col bg-white px-5 py-5 sm:px-8 sm:py-9 lg:order-1 lg:w-[46%] lg:max-w-[640px] lg:px-12 lg:py-11 xl:px-14">
          <header className="shrink-0 pb-3 sm:pb-6">
            <p className="type-label mb-1.5 text-[11px] text-neutral-700 sm:text-[12px]">
              — Our Projects
            </p>
            <h2 className="type-heading text-[24px] text-neutral-950 sm:text-[34px] lg:text-[38px]">
              Selected Work
            </h2>
          </header>

          <div
            className={`relative min-h-0 overflow-hidden ${
              phone ? "min-h-[280px]" : "flex-1"
            }`}
          >
            {PROJECTS.map((project, i) => {
              const on = i === active;
              return (
                <div
                  key={project.id}
                  className={`${
                    phone ? "relative" : "absolute inset-0"
                  } flex flex-col transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    phone && !on ? "hidden" : ""
                  }`}
                  style={
                    phone
                      ? undefined
                      : {
                          opacity: on ? 1 : 0,
                          transform: on ? "translateY(0)" : "translateY(10px)",
                          pointerEvents: on ? "auto" : "none",
                        }
                  }
                  aria-hidden={!on}
                >
                  <p className="type-label text-[11px] text-neutral-700 sm:text-[12px]">
                    {project.category} · {project.indexLabel}
                  </p>

                  <h3 className="type-heading mt-2 text-[22px] text-neutral-950 sm:mt-4 sm:text-[34px] md:text-[40px] lg:text-[44px]">
                    {project.title}
                  </h3>

                  <p className="type-kicker mt-2 text-[11px] sm:mt-3 sm:text-[12px]">
                    {project.placeLine}
                  </p>

                  <p className="type-body mt-3 line-clamp-3 max-w-[40ch] text-[12px] sm:mt-5 sm:line-clamp-none sm:text-[14px] md:text-[15px]">
                    {project.summary}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-neutral-200 pt-4 sm:mt-6 sm:gap-y-4 sm:pt-6">
                    {project.meta.slice(0, 4).map((item) => (
                      <div key={item.label}>
                        <p className="type-label text-[9px] sm:text-[11px]">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-[12px] font-medium tracking-[-0.01em] text-neutral-900 sm:mt-1 sm:text-[14px]">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex shrink-0 flex-col gap-3 border-t border-neutral-200 pt-4 sm:mt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pt-6">
            <Link
              href={PROJECTS[active].href}
              className="type-button btn-pill btn-shine btn-outline w-fit !h-9 !px-4 text-[10px] sm:!h-12 sm:!px-7 sm:text-[11px]"
            >
              <span aria-hidden className="text-[13px] leading-none">
                ↗
              </span>
              View Project
            </Link>

            <div className="min-w-[140px] sm:max-w-[200px] sm:flex-1 sm:text-right">
              <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
                {phone ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Previous project"
                      onClick={() => go(-1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-950"
                    >
                      ‹
                    </button>
                    <p className="type-label text-[11px] tabular-nums text-neutral-700">
                      {String(active + 1).padStart(2, "0")} /{" "}
                      {String(total).padStart(2, "0")}
                    </p>
                    <button
                      type="button"
                      aria-label="Next project"
                      onClick={() => go(1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-950"
                    >
                      ›
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="type-label text-[11px] tabular-nums text-neutral-700">
                      {String(active + 1).padStart(2, "0")} /{" "}
                      {String(total).padStart(2, "0")}
                    </p>
                    <p className="type-label text-[10px] text-neutral-700 sm:text-[11px]">
                      Scroll
                    </p>
                  </>
                )}
              </div>
              <div className="mt-2.5 h-px w-full bg-neutral-200 sm:ml-auto sm:max-w-[200px]">
                <div
                  ref={barRef}
                  className="h-px w-0 bg-neutral-950 will-change-[width]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative order-1 min-h-[34vh] w-full shrink-0 overflow-hidden bg-neutral-200 lg:order-2 lg:min-h-0 lg:w-[54%] lg:flex-1">
          {PROJECTS.map((project, i) => {
            const on = i === active;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={project.id}
                src={project.gallery?.[0] || project.image}
                alt={project.alt}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? "scale(1)" : "scale(1.03)",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

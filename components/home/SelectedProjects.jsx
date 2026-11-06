"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import IconArrow from "@/components/IconArrow";
import { getCatalogProjects } from "@/lib/projects";
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
  const phoneBarRef = useRef(null);
  const swipeRef = useRef(null);

  const [active, setActive] = useState(0);
  const [phone, setPhone] = useState(false);

  const projects = getCatalogProjects();
  const total = projects.length;

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

      const width = `${Math.min(100, Math.max(0, display * 100))}%`;
      if (barRef.current) barRef.current.style.width = width;
      if (phoneBarRef.current) phoneBarRef.current.style.width = width;

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
    if (!phone) return;
    const width = `${((active + 1) / total) * 100}%`;
    if (phoneBarRef.current) phoneBarRef.current.style.width = width;
  }, [active, phone, total]);

  useEffect(() => {
    if (!phone || total < 2) return undefined;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 4000);
    return () => window.clearInterval(id);
  }, [phone, total, active]);

  const go = (dir) => {
    setActive((prev) => (prev + dir + total) % total);
  };

  const onTouchStart = (event) => {
    if (!isPhoneViewport()) return;
    const touch = event.touches[0];
    swipeRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    if (!isPhoneViewport() || !swipeRef.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - swipeRef.current.x;
    const dy = touch.clientY - swipeRef.current.y;
    swipeRef.current = null;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      id="residences"
      ref={rootRef}
      className="relative z-10 bg-white max-md:flex max-md:h-[calc(100svh-5rem)] max-md:max-h-[calc(100svh-5rem)] max-md:flex-col max-md:overflow-hidden"
      aria-label="Selected work"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        ref={stageRef}
        className="relative flex w-full flex-col overflow-hidden max-md:h-full max-md:min-h-0 md:flex-row"
      >
        <div className="relative order-2 flex min-h-0 w-full flex-1 flex-col bg-[#f6f3ee] px-5 py-3 sm:px-8 md:order-1 md:w-[46%] md:max-w-[680px] md:px-10 md:py-8 lg:px-12 lg:py-10 xl:px-14">
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-8 left-0 top-8 hidden w-px bg-[#c59d5f] md:block"
          />
          <header className="shrink-0 pb-2 md:pb-5">
            <p className="type-label mb-1 text-[11px] text-[#8a6a3a] sm:mb-1.5 sm:text-[12px]">
              — Our Projects
            </p>
            <h2 className="type-heading text-[22px] text-neutral-950 sm:text-[34px] lg:text-[40px]">
              Selected Work
            </h2>
          </header>

          <div className="relative min-h-0 flex-1 overflow-hidden">
            {projects.map((project, i) => {
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
                  <div className="flex items-start justify-between gap-3">
                    <p className="type-label text-[10px] text-neutral-600 sm:text-[11px]">
                      <span className="text-[#8a6a3a]">{project.indexLabel}</span>
                      <span className="mx-2 inline-block h-px w-5 translate-y-[-3px] bg-[#c59d5f] align-middle" />
                      {project.category}
                    </p>
                  </div>

                  <div className="relative mt-1.5 md:mt-4">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-1 -top-3 hidden select-none font-display text-[6.5rem] font-medium leading-none text-[#c59d5f]/25 lg:block xl:text-[7.5rem]"
                    >
                      {project.indexLabel}
                    </span>
                    <h3
                      className="relative z-[1] block text-left font-display text-[1.45rem] font-medium uppercase text-neutral-950 sm:text-[1.7rem] md:max-w-[9.2em] md:text-[clamp(2.15rem,2.7vw,3.15rem)]"
                      style={{
                        letterSpacing: "-0.03em",
                        wordSpacing: "normal",
                        textAlign: "left",
                        textAlignLast: "left",
                        fontStretch: "normal",
                        lineHeight: 1.02,
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <p className="mt-2 max-w-[34ch] text-[11px] font-medium uppercase leading-snug tracking-[0.06em] text-neutral-600 md:mt-4 md:text-[12px]">
                    <span className="mr-2 inline-block h-px w-5 translate-y-[-3px] bg-[#c59d5f] align-middle" />
                    {project.placeLine}
                  </p>

                  <p className="type-body mt-2 max-h-[3.4em] max-w-[42ch] overflow-hidden text-[12px] md:mt-5 md:max-h-[6.6em] md:text-[15px]">
                    {project.summary}
                  </p>

                  <div className="mt-2.5 grid grid-cols-2 gap-x-5 gap-y-2 md:mt-6 md:gap-y-4">
                    {project.meta.slice(0, 4).map((item) => (
                      <div key={item.label} className="border-t border-[#c59d5f]/55 pt-1.5 md:pt-2.5">
                        <p className="type-label text-[9px] text-[#8a6a3a] sm:text-[10px]">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-[12px] font-medium tracking-[-0.01em] text-neutral-950 sm:mt-1 sm:text-[14px]">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-auto flex shrink-0 flex-col gap-3 border-t border-[#e4dccf] pt-3 sm:mt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pt-5">
            <Link
              href={projects[active].href}
              className="type-button btn-pill btn-shine btn-outline w-fit !h-9 !px-4 text-[10px] sm:!h-12 sm:!px-7 sm:text-[11px]"
            >
              <IconArrow dir="ne" className="h-3 w-3" />
              View Project
            </Link>

            <div className="hidden min-w-[140px] md:block md:max-w-[200px] md:flex-1 md:text-right">
              <div className="flex items-center justify-end gap-4">
                <p className="type-label text-[11px] tabular-nums text-neutral-700">
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </p>
                <p className="type-label text-[11px] text-neutral-700">Scroll</p>
              </div>
              <div className="mt-2.5 h-px w-full bg-[#e4dccf] sm:ml-auto sm:max-w-[200px]">
                <div
                  ref={barRef}
                  className="h-px w-0 bg-[#8a6a3a] will-change-[width]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative order-1 h-[42%] w-full shrink-0 overflow-hidden bg-neutral-200 max-md:min-h-0 md:order-2 md:h-full md:min-h-0 md:w-[54%] md:flex-1">
          {projects.map((project, i) => {
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

          <div className="pointer-events-none absolute left-3 top-3 z-10 max-w-[70%] md:left-6 md:top-6">
            <span className="inline-block rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-[#e8c67c] backdrop-blur-[2px] sm:text-[11px]">
              {projects[active].status}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/35 to-transparent px-4 pb-3 pt-12 md:hidden">
            <div className="mb-2.5 h-px w-full bg-white/25">
              <div
                ref={phoneBarRef}
                className="h-px w-0 bg-white will-change-[width]"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => go(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-950"
              >
                <IconArrow dir="left" className="h-3.5 w-3.5" />
              </button>
              <p className="type-label text-[11px] tabular-nums text-white">
                {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => go(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-950"
              >
                <IconArrow dir="right" className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ScrollExpand.css";

gsap.registerPlugin(ScrollTrigger);

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

function readNavOffset() {
  const header = document.querySelector("header");
  if (!header) {
    return window.matchMedia("(min-width: 640px)").matches ? 96 : 80;
  }
  return Math.round(header.getBoundingClientRect().height);
}

/**
 * GSAP-pinned scroll expand.
 * Pin holds the stage until expand + hold complete — no sticky/lerp desync on fast scroll.
 */
export default function ScrollExpand({
  src = "",
  mediaType = "image",
  poster = "",
  alt = "",
  title = "",
  scrollHint = "",
  startWidth = 36,
  startHeight = 50,
  startRadius = 18,
  endRadius = 0,
  mediaZoom = 1.28,
  scrollDistance = 1.55,
  holdDistance = 0.6,
  scrub = 0.32,
  overlayScrim = 0.4,
  enabled = true,
  children,
  className = "",
  style,
  ...rest
}) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const mediaRef = useRef(null);
  const titleRef = useRef(null);
  const overlayRef = useRef(null);
  const scrimRef = useRef(null);
  const hintRef = useRef(null);

  const propsRef = useRef({});
  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    scrub,
    overlayScrim,
    enabled,
  };

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!root || !stage || !frame || !media) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const applyProgress = (raw) => {
      const p = clamp(raw, 0, 1);
      const c = propsRef.current;
      const e = smoothstep(0, 1, p);

      const w = c.startWidth + (100 - c.startWidth) * e;
      const h = c.startHeight + (100 - c.startHeight) * e;
      const ix = Math.max(0, (100 - w) / 2);
      const iy = Math.max(0, (100 - h) / 2);
      const r = c.startRadius + (c.endRadius - c.startRadius) * e;
      frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;
      media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

      if (scrimRef.current) {
        scrimRef.current.style.opacity = `${c.overlayScrim * e}`;
      }
      if (titleRef.current) {
        const out = smoothstep(0.32, 0.72, p);
        titleRef.current.style.opacity = `${1 - out}`;
        titleRef.current.style.transform = `translate3d(0, ${-20 * out}px, 0) scale(${1 + 0.035 * out})`;
      }
      if (hintRef.current) {
        const gone = smoothstep(0, 0.08, p);
        hintRef.current.style.opacity = `${1 - gone}`;
        hintRef.current.style.transform = `translate3d(0, ${6 * gone}px, 0)`;
      }
      if (overlayRef.current) {
        const inn = smoothstep(0.7, 0.95, p);
        overlayRef.current.style.opacity = `${inn}`;
        overlayRef.current.style.transform = `translate3d(0, ${12 * (1 - inn)}px, 0)`;
      }
    };

    const layoutStage = () => {
      const nav = readNavOffset();
      const stageH = Math.max(280, window.innerHeight - nav);
      stage.style.height = `${stageH}px`;
      root.style.setProperty("--se-nav", `${nav}px`);
      stage.style.setProperty(
        "--se-title-size",
        `${clamp((root.clientWidth || stageH) * 0.042, 18, 40)}px`,
      );
      return { nav, stageH };
    };

    layoutStage();
    applyProgress(propsRef.current.enabled ? 0 : 1);

    if (!propsRef.current.enabled) return undefined;

    const expandShare = () => {
      const c = propsRef.current;
      const expand = Math.max(0.45, c.scrollDistance);
      const hold = Math.max(0.4, c.holdDistance);
      return expand / (expand + hold);
    };

    const st = ScrollTrigger.create({
      id: "tsk-scroll-expand",
      trigger: root,
      start: () => `top top+=${readNavOffset()}`,
      end: () => {
        const h = Math.max(280, window.innerHeight - readNavOffset());
        const c = propsRef.current;
        return `+=${h * (Math.max(0.45, c.scrollDistance) + Math.max(0.4, c.holdDistance))}`;
      },
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: reduceMotion ? true : Math.max(0.18, propsRef.current.scrub),
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      preventOverlaps: "tsk-scroll-expand",
      onRefreshInit: () => {
        layoutStage();
      },
      onUpdate: (self) => {
        applyProgress(self.progress / expandShare());
      },
      onRefresh: (self) => {
        applyProgress(self.progress / expandShare());
      },
    });

    // Hero + domains change document height after mount — remeasure pins
    const refresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refresh, 100);
    const t2 = window.setTimeout(refresh, 500);
    const t3 = window.setTimeout(refresh, 1200);

    const onResize = () => {
      layoutStage();
      refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener("resize", onResize);
      st.kill();
    };
  }, []);

  const media =
    mediaType === "video" ? (
      <video
        ref={mediaRef}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={mediaRef}
        className="scroll-expand__media"
        src={src}
        alt={alt}
        draggable={false}
      />
    );

  return (
    <div
      ref={rootRef}
      className={`scroll-expand scroll-expand--pinned ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={stageRef} className="scroll-expand__stage">
        <div ref={frameRef} className="scroll-expand__frame">
          {media}
          <div className="scroll-expand__veil" aria-hidden />
          <div ref={scrimRef} className="scroll-expand__scrim" />
          {title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          ) : null}
          {children ? (
            <div ref={overlayRef} className="scroll-expand__overlay">
              {children}
            </div>
          ) : null}
        </div>
        {scrollHint ? (
          <div ref={hintRef} className="scroll-expand__hint">
            {scrollHint}
          </div>
        ) : null}
      </div>
    </div>
  );
}

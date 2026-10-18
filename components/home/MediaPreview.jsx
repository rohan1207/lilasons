"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MEDIA } from "@/lib/brand";
import { PROJECTS } from "@/lib/projects";

const CircularCarousel = dynamic(
  () => import("@/components/react-bits/CircularCarousel"),
  { ssr: false },
);

const ease = [0.22, 1, 0.36, 1];

function buildGalleryItems() {
  const fromMedia = MEDIA.gallery.map((src, i) => {
    const event = MEDIA.events[i % MEDIA.events.length];
    return {
      src,
      alt: event?.title || "Lilasons Developers media",
      title: event?.title || "Beyond the Office",
      subtitle: "Media",
    };
  });

  const fromProjects = PROJECTS.flatMap((project) => {
    const shots = (project.gallery?.length ? project.gallery : [project.image]).slice(
      0,
      3,
    );
    return shots.map((src, i) => ({
      src,
      alt: project.alt,
      title: project.title,
      subtitle: i === 0 ? project.locationLabel : "Project gallery",
    }));
  });

  const extras = [
    {
      src: "/welcome/welcome-aurangabad.jpg",
      alt: "Lilasons residential living in Aurangabad",
      title: "Aurangabad",
      subtitle: "Residences",
    },
    {
      src: "/welcome/welcome-estate.jpg",
      alt: "Lilasons gated estate community",
      title: "Golden Estate",
      subtitle: "Communities",
    },
    {
      src: "/footer/footer-skyline-dark.jpg",
      alt: "Lilasons skyline at dusk",
      title: "Skyline",
      subtitle: "Developments",
    },
    {
      src: "/about/expand-story-hero.jpg",
      alt: "Lilasons premium living",
      title: "Excellency",
      subtitle: "Living",
    },
  ];

  const merged = [...fromMedia, ...fromProjects, ...extras];
  const seen = new Set();
  return merged
    .filter((item) => {
      if (!item.src || seen.has(item.src)) return false;
      seen.add(item.src);
      return true;
    })
    .slice(0, 20);
}

const GALLERY_ITEMS = buildGalleryItems();

export default function MediaPreview() {
  const [cardWidth, setCardWidth] = useState(220);

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth;
      if (w < 400) setCardWidth(150);
      else if (w < 640) setCardWidth(180);
      else if (w < 1024) setCardWidth(220);
      else setCardWidth(260);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section
      id="media-preview"
      className="relative z-10 flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden border-t border-neutral-200/80 bg-[#f7f7f7]"
      aria-label="Media gallery preview"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about/expand-story-hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
        />
        <div className="absolute inset-0 bg-[#f7f7f7]/45" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-col px-5 pt-20 sm:px-8 sm:pt-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease }}
          className="shrink-0"
        >
          <p className="type-label mb-2 text-[11px] text-neutral-700 sm:text-[12px]">
            — Media
          </p>
          <h2 className="type-heading max-w-[16ch] text-[24px] text-neutral-950 sm:text-[36px] lg:text-[42px]">
            Life at Lilasons
          </h2>
          <p className="type-body mt-2 max-w-[42ch] text-[13px] sm:text-[15px]">
            {MEDIA.title}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.06, ease }}
          className="relative min-h-0 w-full flex-1 text-neutral-950"
        >
          <CircularCarousel
            items={GALLERY_ITEMS}
            preset="cylinder"
            intro="rise"
            cardWidth={cardWidth}
            aspectRatio={1}
            gap={cardWidth < 200 ? 18 : 32}
            speed={7}
            autoplay="drift"
            scrollLinked
            momentum={0.75}
            fadeColor="#f7f7f7"
            depthFade={0.42}
            cornerRadius={10}
            pauseOnHover
            draggable
          />
        </motion.div>

        <div className="flex shrink-0 justify-center pb-5 pt-1 sm:pb-8 sm:pt-2">
          <Link
            href="/media"
            className="type-button btn-pill btn-shine btn-outline w-fit !h-9 !px-4 text-[10px] sm:!h-12 sm:!px-7 sm:text-[11px]"
          >
            <span aria-hidden className="text-[13px] leading-none">
              ↗
            </span>
            View Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

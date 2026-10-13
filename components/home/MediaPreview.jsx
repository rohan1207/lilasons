"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
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

  // Multiple frames per project so the ring feels fuller
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
  return (
    <section
      id="media-preview"
      className="relative z-10 border-t border-neutral-200/80 bg-[#f7f7f7]"
      aria-label="Media gallery preview"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease }}
          className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="type-label mb-2 text-[11px] text-neutral-400 sm:text-[12px]">
              — Media
            </p>
            <h2 className="type-heading max-w-[16ch] text-[28px] uppercase leading-[1.05] tracking-[-0.035em] text-neutral-950 sm:text-[36px] lg:text-[42px]">
              Life at Lilasons
            </h2>
            <p className="type-body mt-3 max-w-[42ch] text-[14px] text-neutral-600 sm:text-[15px]">
              {MEDIA.title}
            </p>
          </div>

          <Link
            href="/media"
            className="type-button btn-pill btn-shine inline-flex h-11 w-fit shrink-0 items-center gap-2.5 border border-neutral-900 bg-transparent px-5 text-[11px] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white sm:px-6"
          >
            <span aria-hidden className="text-[13px] leading-none">
              ↗
            </span>
            View Gallery
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.06, ease }}
          className="relative h-[480px] w-full text-neutral-950 sm:h-[560px] lg:h-[640px]"
        >
          <CircularCarousel
            items={GALLERY_ITEMS}
            preset="cylinder"
            intro="rise"
            cardWidth={260}
            aspectRatio={1}
            gap={32}
            speed={7}
            autoplay="drift"
            scrollLinked
            momentum={0.75}
            captions
            fadeColor="#f7f7f7"
            depthFade={0.42}
            cornerRadius={10}
            pauseOnHover
            draggable
          />
        </motion.div>
      </div>
    </section>
  );
}

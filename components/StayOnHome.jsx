"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Keep users on the home experience for now.
 * - Hash links (#about) still scroll within the page
 * - External URLs and other routes are blocked
 */
export default function StayOnHome({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const homePaths = new Set(["/", "/home"]);

    // If somehow on another route, bounce back
    if (pathname && !homePaths.has(pathname)) {
      router.replace("/");
    }

    const onClick = (e) => {
      const anchor = e.target?.closest?.("a[href]");
      if (!anchor) return;

      const raw = anchor.getAttribute("href");
      if (!raw || raw === "#") return;

      // In-page section anchors stay on home
      if (raw.startsWith("#")) return;

      // Block leaving the site (external, mailto, tel, other routes)
      if (
        raw.startsWith("mailto:") ||
        raw.startsWith("tel:") ||
        raw.startsWith("http") ||
        raw.startsWith("//")
      ) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      try {
        const url = new URL(raw, window.location.origin);
        const isHome =
          url.origin === window.location.origin &&
          (url.pathname === "/" ||
            url.pathname === "/home" ||
            url.pathname === "");
        if (isHome) {
          if (url.hash) {
            e.preventDefault();
            const id = url.hash.slice(1);
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }
      } catch {
        // fall through
      }

      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, router]);

  return children;
}

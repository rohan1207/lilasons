"use client";

import { forwardRef } from "react";
import "./HeroClouds.css";

/**
 * Multi-layer fractal-noise mist banks.
 * Opacity is driven by Hero scroll (visible with intro copy, fades with it).
 */
const HeroClouds = forwardRef(function HeroClouds(_, ref) {
  return (
    <div
      ref={ref}
      className="hero-clouds"
      aria-hidden
      style={{ opacity: 1 }}
    >
      {/* Dark veil under mist so white type stays crisp */}
      <div className="hero-clouds__veil" />

      {/* Soft atmospheric haze near copy corners */}
      <div className="hero-clouds__haze" />

      {/* Fractal cloud sheet — far / slow */}
      <div className="hero-clouds__layer hero-clouds__layer--a">
        <svg className="hero-clouds__svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter
              id="heroCloudNoiseA"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.009 0.014"
                numOctaves="5"
                seed="7"
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="0 0 0 0 0.96
                        0 0 0 0 0.97
                        0 0 0 0 0.99
                        0 0 0 0.72 0"
                result="cloud"
              />
              <feGaussianBlur in="cloud" stdDeviation="18" result="soft" />
              <feComponentTransfer in="soft">
                <feFuncA type="table" tableValues="0 0 0.15 0.45 0.75 0.9 0.7 0.35 0" />
              </feComponentTransfer>
            </filter>
            <radialGradient id="heroCloudMaskA" cx="30%" cy="35%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="55%" stopColor="white" stopOpacity="0.55" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect
            width="1200"
            height="800"
            filter="url(#heroCloudNoiseA)"
            fill="url(#heroCloudMaskA)"
          />
        </svg>
      </div>

      {/* Mid bank — brighter wisps */}
      <div className="hero-clouds__layer hero-clouds__layer--b">
        <svg className="hero-clouds__svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter
              id="heroCloudNoiseB"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015 0.011"
                numOctaves="4"
                seed="19"
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="0 0 0 0 1
                        0 0 0 0 1
                        0 0 0 0 1
                        0 0 0 0.85 0"
                result="cloud"
              />
              <feGaussianBlur in="cloud" stdDeviation="12" />
              <feComponentTransfer>
                <feFuncA type="table" tableValues="0 0 0.05 0.35 0.7 0.95 0.55 0.2 0" />
              </feComponentTransfer>
            </filter>
            <radialGradient id="heroCloudMaskB" cx="78%" cy="68%" r="65%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="50%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect
            width="1200"
            height="800"
            filter="url(#heroCloudNoiseB)"
            fill="url(#heroCloudMaskB)"
          />
        </svg>
      </div>

      {/* Near wisps — fine detail */}
      <div className="hero-clouds__layer hero-clouds__layer--c">
        <svg className="hero-clouds__svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter
              id="heroCloudNoiseC"
              x="-15%"
              y="-15%"
              width="130%"
              height="130%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.022 0.018"
                numOctaves="3"
                seed="31"
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="0 0 0 0 0.98
                        0 0 0 0 0.99
                        0 0 0 0 1
                        0 0 0 0.55 0"
              />
              <feGaussianBlur stdDeviation="8" />
              <feComponentTransfer>
                <feFuncA type="table" tableValues="0 0 0.1 0.4 0.65 0.4 0.15 0" />
              </feComponentTransfer>
            </filter>
          </defs>
          <rect width="1200" height="800" filter="url(#heroCloudNoiseC)" fill="white" />
        </svg>
      </div>
    </div>
  );
});

export default HeroClouds;

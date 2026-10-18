"use client";

/**
 * Pass-through wrapper — site is fully phone responsive.
 * Kept so layout.js import stays stable.
 */
export default function MobileGate({ children }) {
  return children;
}

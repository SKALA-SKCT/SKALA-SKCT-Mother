"use client";

import { useEffect } from "react";

/**
 * Drives every `.reveal` / `.reveal-scale` / `.reveal-tile` entry animation on the page.
 *
 * The hidden starting state lives behind `:root[data-reveal="on"]`, and that
 * attribute is only set once this effect runs. If scripting is unavailable the
 * page renders in its final state instead of staying blank.
 *
 * This lives in the root layout, so it does not re-mount on client navigation —
 * without re-running per route, a page navigated to after the first load would
 * never have its elements observed and would stay invisible.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (typeof IntersectionObserver === "undefined") return;

    root.dataset.reveal = "on";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
    );

    const nodes = document.querySelectorAll(".reveal, .reveal-scale, .reveal-tile");
    nodes.forEach((node) => observer.observe(node));

    // Anything already on screen is revealed straight away. IntersectionObserver
    // does not deliver callbacks while the tab is hidden, so without this a page
    // opened in a background tab would stay blank until it regains focus.
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
        node.classList.add("is-visible");
        observer.unobserve(node);
      }
    });

    return () => {
      observer.disconnect();
      delete root.dataset.reveal;
    };
  }, []);

  return null;
}

import { useEffect } from "react";

// Adds .visible to any element with .reveal-* when it enters viewport
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal, .reveal-up, .reveal-scale, .reveal-fade"));
    if (els.length === 0) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    }, { rootMargin: "-10% 0px -10% 0px", threshold: 0.1 });

    els.forEach((el, idx) => {
      el.style.transitionDelay = el.dataset.delay || `${(idx % 6) * 40}ms`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);
}
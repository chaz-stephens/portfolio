"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface CountUpNumberProps {
  value: string;
  className?: string;
}

// Differentiated reveal motion for stat numbers (DESIGN_SPEC.md §5, fresh-eyes critique #5):
// counts up from 0 instead of only fading in, so a data point reads differently than a card
// or a timeline entry. Self-contained IntersectionObserver (same threshold/rootMargin as
// Reveal) rather than threading visibility through the parent Reveal wrapper.
const DURATION_MS = 600;
const NUMBER_PATTERN = /^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)([^0-9]*)$/;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function CountUpNumber({ value, className }: CountUpNumberProps) {
  const match = value.match(NUMBER_PATTERN);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || prefersReducedMotion) return;

    const [, prefix, numStr, suffix] = match;
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const useCommas = numStr.includes(",");
    const target = parseFloat(numStr.replace(/,/g, ""));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.unobserve(el);
        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          const current = target * easeOutCubic(progress);
          const formatted = useCommas
            ? current.toLocaleString("en-US", {
                maximumFractionDigits: decimals,
                minimumFractionDigits: decimals,
              })
            : current.toFixed(decimals);
          setDisplay(`${prefix}${formatted}${suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [match, value, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefersReducedMotion ? value : display}
    </span>
  );
}

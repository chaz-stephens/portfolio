"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ElementType,
  type ReactNode,
} from "react";

interface RevealProps {
  children: ReactNode;
  /** Position within a staggered group; delay is capped at the 5th item (index 4). */
  index?: number;
  className?: string;
  /** Rendered element — "tr" for table-row reveals, which can't be wrapped in a div. */
  as?: ElementType;
}

const STAGGER_MS = 80;
const STAGGER_CAP = 4;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

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

/**
 * Scroll-triggered entrance per DESIGN_SPEC.md §5: IntersectionObserver, threshold 0.15,
 * rootMargin "0px 0px -10% 0px", fires once. Honors prefers-reduced-motion (read via
 * useSyncExternalStore, not a plain effect, so there's no setState-in-effect on mount) by
 * skipping the observer entirely and rendering at final state immediately.
 */
export default function Reveal({ children, index = 0, className = "", as }: RevealProps) {
  const Tag = as || "div";
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const isVisible = visible || prefersReducedMotion;

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? "reveal-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${Math.min(index, STAGGER_CAP) * STAGGER_MS}ms` }}
    >
      {children}
    </Tag>
  );
}

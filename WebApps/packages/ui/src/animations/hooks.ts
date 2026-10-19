import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createScrollTriggerReveal,
  ScrollTriggerRevealOptions,
} from "./transitions";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Universal GSAP React Hook Wrapper
 * Re-exports useGSAP with automatic context scoping and cleanup.
 */
export const useUniversalGsap = useGSAP;

/**
 * Universal Viewport Scroll Hook
 * Automatically reveals elements when they enter the user's viewport.
 * Cleans up GSAP ScrollTrigger instances on unmount.
 */
export function useViewportReveal(
  options: ScrollTriggerRevealOptions = {}
) {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!elementRef.current || typeof window === "undefined") return;

    const tween = createScrollTriggerReveal(elementRef.current, {
      ...options,
      trigger: elementRef.current,
    });

    return () => {
      if (tween?.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      tween?.kill();
    };
  }, []);

  return elementRef;
}

export { gsap, ScrollTrigger };

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Universal Zen Xea Modern Digital Brutalism GSAP Transitions
 *
 * Core Principle: Build once, maintain centrally, reuse everywhere.
 * These transitions are reusable across all websites, dashboards,
 * client portals, and SaaS tools in the Zen Xea ecosystem.
 */

// ── Canonical Brutalist Easing Presets ─────────────────────────────────────────

export const GSAP_EASINGS = {
  /** Snappy, high-contrast brutalist entrance curve */
  expoOut: "expo.out",
  /** Smooth cinematic deceleration */
  power4Out: "power4.out",
  /** Controlled natural deceleration */
  power3Out: "power3.out",
  /** Luxury curtain wipe / reveal curve */
  curtain: "power4.inOut",
  /** Tactile bounce for accent geometry (squares, badges) */
  tactilePop: "back.out(2.2)",
  /** Gentle spring for subtle interactive elements */
  springSoft: "back.out(1.4)",
  /** Smooth linear constant motion */
  linear: "none",
} as const;

export interface CurtainRevealOptions {
  duration?: number;
  ease?: string;
  onComplete?: () => void;
  direction?: "up" | "down" | "left" | "right";
}

/**
 * Ultimate Curtain Reveal Transition
 * Smoothly wipes or slides an overlay to reveal the underlying application.
 */
export function createCurtainReveal(
  element: HTMLElement | string,
  options: CurtainRevealOptions = {}
): gsap.core.Tween {
  const {
    duration = 0.85,
    ease = GSAP_EASINGS.curtain,
    onComplete,
    direction = "up",
  } = options;

  const yProp = direction === "up" ? "-100%" : direction === "down" ? "100%" : 0;
  const xProp = direction === "left" ? "-100%" : direction === "right" ? "100%" : 0;

  return gsap.to(element, {
    y: yProp,
    x: xProp,
    duration,
    ease,
    onComplete,
  });
}

export interface StaggerFadeOptions {
  duration?: number;
  stagger?: number;
  yOffset?: number;
  xOffset?: number;
  delay?: number;
  ease?: string;
  onComplete?: () => void;
}

/**
 * Universal Staggered Reveal
 * Animates a list or collection of elements with brutalist deceleration.
 */
export function createStaggerReveal(
  targets: gsap.DOMTarget,
  options: StaggerFadeOptions = {}
): gsap.core.Tween {
  const {
    duration = 0.75,
    stagger = 0.1,
    yOffset = 30,
    xOffset = 0,
    delay = 0,
    ease = GSAP_EASINGS.power4Out,
    onComplete,
  } = options;

  return gsap.fromTo(
    targets,
    {
      opacity: 0,
      y: yOffset,
      x: xOffset,
    },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      stagger,
      delay,
      ease,
      onComplete,
    }
  );
}

export interface CounterOptions {
  duration?: number;
  ease?: string;
  onUpdate?: (value: number) => void;
  onComplete?: () => void;
}

/**
 * Kinetic Counter Animation (0% to 100%)
 */
export function createCounterAnimation(
  fromValue: number = 0,
  toValue: number = 100,
  options: CounterOptions = {}
): gsap.core.Tween {
  const {
    duration = 1.6,
    ease = "power2.inOut",
    onUpdate,
    onComplete,
  } = options;

  const progressObj = { value: fromValue };

  return gsap.to(progressObj, {
    value: toValue,
    duration,
    ease,
    onUpdate: () => {
      if (onUpdate) {
        onUpdate(Math.round(progressObj.value));
      }
    },
    onComplete,
  });
}

// ── Viewport Scroll-Triggered Animation Presets ───────────────────────────────

export interface ScrollTriggerRevealOptions {
  trigger?: gsap.DOMTarget;
  start?: string; // default "top 85%"
  end?: string;
  toggleActions?: string; // default "play none none none"
  once?: boolean;
  duration?: number;
  stagger?: number;
  yOffset?: number;
  xOffset?: number;
  scale?: number;
  ease?: string;
  delay?: number;
  onEnter?: () => void;
}

/**
 * Universal ScrollTrigger Viewport Reveal
 * Activates an animation ONLY when the target component reaches the viewport.
 */
export function createScrollTriggerReveal(
  targets: gsap.DOMTarget,
  options: ScrollTriggerRevealOptions = {}
): gsap.core.Tween | undefined {
  if (typeof window === "undefined") return undefined;

  const {
    trigger,
    start = "top 88%",
    toggleActions = "play none none none",
    once = true,
    duration = 0.8,
    stagger = 0.08,
    yOffset = 35,
    xOffset = 0,
    scale = 1,
    ease = GSAP_EASINGS.power3Out,
    delay = 0,
    onEnter,
  } = options;

  const triggerEl = trigger || targets;

  return gsap.fromTo(
    targets,
    {
      opacity: 0,
      y: yOffset,
      x: xOffset,
      scale: scale !== 1 ? scale : 1,
    },
    {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger: {
        trigger: triggerEl as gsap.DOMTarget,
        start,
        toggleActions: once ? "play none none none" : toggleActions,
        once,
        onEnter: () => {
          if (onEnter) onEnter();
        },
      },
    }
  );
}

/**
 * Universal Batch Viewport Reveal for Grids & Lists
 * Staggers items in the viewport as they scroll into view.
 */
export function createBatchScrollReveal(
  targets: string | Element[],
  options: {
    start?: string;
    stagger?: number;
    duration?: number;
    yOffset?: number;
    ease?: string;
  } = {}
) {
  if (typeof window === "undefined" || !ScrollTrigger) return;

  const {
    start = "top 90%",
    stagger = 0.1,
    duration = 0.7,
    yOffset = 30,
    ease = GSAP_EASINGS.power3Out,
  } = options;

  ScrollTrigger.batch(targets, {
    start,
    once: true,
    onEnter: (batch) => {
      gsap.fromTo(
        batch,
        { opacity: 0, y: yOffset },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease,
          overwrite: true,
        }
      );
    },
  });
}

// ── Master Hero Entrance Sequence ─────────────────────────────────────────────

export interface HeroEntranceTargets {
  eyebrow?: gsap.DOMTarget;
  headlineLines?: gsap.DOMTarget;
  coralSquare?: gsap.DOMTarget;
  description?: gsap.DOMTarget;
  ctas?: gsap.DOMTarget;
  supportingLine?: gsap.DOMTarget;
  graphicPillar?: gsap.DOMTarget;
  graphicPhoto?: gsap.DOMTarget;
  graphicAccents?: gsap.DOMTarget;
  servicesTicker?: gsap.DOMTarget;
  transformationBanner?: gsap.DOMTarget;
}

export interface HeroTimelineOptions {
  delay?: number;
  autoPlay?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
}

/**
 * Master Hero Entrance Timeline
 * Orchestrates all hero elements into a cohesive cinematic sequence.
 * Can be paused and activated only after the loading screen completes.
 */
export function createHeroMasterTimeline(
  targets: HeroEntranceTargets,
  options: number | HeroTimelineOptions = 0.1
): gsap.core.Timeline {
  const opts: HeroTimelineOptions =
    typeof options === "number" ? { delay: options } : options;

  const {
    delay = 0.1,
    autoPlay = true,
    onComplete,
    onStart,
  } = opts;

  const tl = gsap.timeline({
    delay,
    paused: !autoPlay,
    defaults: { ease: GSAP_EASINGS.power4Out },
    onStart,
    onComplete,
  });

  // 1. Eyebrow tracks in
  if (targets.eyebrow) {
    tl.fromTo(
      targets.eyebrow,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.55 },
      0.05
    );
  }

  // 2. Headline stacked lines reveal with brutalist authority
  if (targets.headlineLines) {
    tl.fromTo(
      targets.headlineLines,
      { opacity: 0, y: 45, skewY: 2 },
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: GSAP_EASINGS.expoOut,
      },
      0.15
    );
  }

  // 3. Signature Coral Square pops with tactile spring
  if (targets.coralSquare) {
    tl.fromTo(
      targets.coralSquare,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: GSAP_EASINGS.tactilePop,
      },
      0.5
    );
  }

  // 4. Description & CTAs slide up
  if (targets.description) {
    tl.fromTo(
      targets.description,
      { opacity: 0, y: 20 },
      { opacity: 0.92, y: 0, duration: 0.65 },
      0.4
    );
  }

  if (targets.ctas) {
    tl.fromTo(
      targets.ctas,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
      0.5
    );
  }

  if (targets.supportingLine) {
    tl.fromTo(
      targets.supportingLine,
      { opacity: 0, x: -15 },
      { opacity: 0.85, x: 0, duration: 0.55 },
      0.6
    );
  }

  // 5. Right Graphic Composition: Pillar slides down, photo settles
  if (targets.graphicPillar) {
    tl.fromTo(
      targets.graphicPillar,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: GSAP_EASINGS.power4Out },
      0.25
    );
  }

  if (targets.graphicPhoto) {
    tl.fromTo(
      targets.graphicPhoto,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.85, ease: GSAP_EASINGS.power4Out },
      0.35
    );
  }

  if (targets.graphicAccents) {
    tl.fromTo(
      targets.graphicAccents,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.55, stagger: 0.1, ease: GSAP_EASINGS.springSoft },
      0.45
    );
  }

  // 6. Services Ticker Strip sweeps across
  if (targets.servicesTicker) {
    tl.fromTo(
      targets.servicesTicker,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.06 },
      0.6
    );
  }

  // 7. Transformation Banner anchors the bottom
  if (targets.transformationBanner) {
    tl.fromTo(
      targets.transformationBanner,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: GSAP_EASINGS.expoOut },
      0.7
    );
  }

  return tl;
}

export { gsap, ScrollTrigger };

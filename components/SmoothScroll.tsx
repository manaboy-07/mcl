"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [shouldSmoothScroll, setShouldSmoothScroll] = useState(false);

  useEffect(() => {
    // 1. Accessibility Check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // 2. Mobile Responsive Breakpoint Check (e.g., 1024px for Desktops)
    // We bypass Lenis on mobile/tablets to preserve buttery-smooth native momentum touch
    // and stop the mobile address bar from causing rendering stutter on resize.
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    setShouldSmoothScroll(isDesktop && !prefersReducedMotion);

    // Listen for screen orientation/resize flips on tablets
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = (e: MediaQueryListEvent) => {
      setShouldSmoothScroll(e.matches && !prefersReducedMotion);
    };
    
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  // 3. Synchronize Lenis with GSAP's ticker
  useEffect(() => {
    if (!shouldSmoothScroll) return;

    // FIX: drive lenis.raf() AND ScrollTrigger.update() from the exact same
    // callback, reading lenisRef.current?.lenis fresh on every tick (same
    // pattern already used below — this is the fix that was already applied
    // to the raf call but not to the scroll sync). Previously, the scroll
    // sync was wired via `lenisInstance.on("scroll", syncScroll)` with
    // `lenisInstance` captured ONCE at effect-setup time — if the Lenis
    // instance wasn't ready in that exact tick, the listener silently never
    // attached, for the lifetime of the effect.
    //
    // Calling ScrollTrigger.update() here also fixes a subtler ordering
    // issue: ScrollTrigger registers its own internal callback on
    // gsap.ticker when the plugin loads, which runs BEFORE this callback
    // (added later, in this effect) on every tick — so without an explicit
    // update *after* lenis.raf() moves the real scroll position, ScrollTrigger
    // is always reading the previous frame's position. Invisible during
    // continuous scrub, very visible at a hard state flip like a pin
    // engaging or disengaging.
    const handleTicker = (time: number) => {
      const lenis = lenisRef.current?.lenis;
      lenis?.raf(time * 1000);
      ScrollTrigger.update();
    };

    // FIX: tell Lenis to recompute its cached scroll height whenever
    // ScrollTrigger recalculates. A pinned section's spacer height can
    // change on any ScrollTrigger.refresh() (window resize, dynamically
    // loaded content changing page height, etc.) — without this, Lenis's
    // internal scroll-height cache goes stale right around that pin,
    // which is what produces a rubber-band/jump glitch there specifically.
    const handleRefresh = () => lenisRef.current?.lenis?.resize();
    ScrollTrigger.addEventListener("refresh", handleRefresh);

    gsap.ticker.add(handleTicker);
    gsap.ticker.lagSmoothing(0);

    // One refresh right as Lenis comes online, so anything created before
    // this effect ran (e.g. ScrollTriggers set up in other components
    // while Lenis was still mounting) is measured with Lenis already in
    // the loop.
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(handleTicker);
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
    };
  }, [shouldSmoothScroll]);

  // Fallback to high-refresh-rate native scrolling on mobile devices
  if (!shouldSmoothScroll) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false, 
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 0, 
        syncTouch: false,
        gestureOrientation: "vertical",
      }}
    >
      {children}
    </ReactLenis>
  );
}
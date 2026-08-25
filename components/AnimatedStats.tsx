"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Shared across HomePage and AboutPage (and anywhere else with a proof-point
// number) so the count-up logic lives in exactly one place. A regex splits
// off any currency symbol / suffix (%, ×, K, M, +) so "$2.1M", "41%", "10+"
// all animate correctly without a special case per string.
export default function AnimatedStat({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const match = value.match(/^([^\d.]*)([\d,.]+)(.*)$/);
      if (!match) return; // non-numeric value, leave as static text

      const [, prefix, rawNumber, suffix] = match;
      const target = parseFloat(rawNumber.replace(/,/g, ""));
      const decimals = rawNumber.includes(".")
        ? rawNumber.split(".")[1].length
        : 0;

      const counter = { val: 0 };
      const render = () =>
        (el.textContent = `${prefix}${counter.val.toFixed(decimals)}${suffix}`);
      render();

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: render,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
        return () => tween.kill();
      });
      // Reduced-motion users get the final value from the render() call above.

      return () => mm.revert();
    },
    { scope: ref, dependencies: [value] }
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
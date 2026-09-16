"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Slide } from "./Slide";
import { clients } from "../data/client";

interface SlideClientProps {
  style: CSSProperties;
}

export function SlideClient({ style }: SlideClientProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [marqueeReady, setMarqueeReady] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ---- Full-motion version ----
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".client-eyebrow", { opacity: 0, y: 10, duration: 0.5 })
          .from(
            ".client-heading-line",
            { yPercent: 110, duration: 0.9, ease: "power4.out" },
            "-=0.15",
          )
          .from(
            ".client-description",
            { opacity: 0, y: 14, duration: 0.6 },
            "-=0.5",
          )
          .from(
            ".client-marquee",
            { opacity: 0, scale: 0.96, duration: 0.7 },
            "-=0.4",
          )
          .add(() => setMarqueeReady(true));
      });

      // ---- Reduced-motion version: everything present, marquee off ----
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".client-eyebrow",
            ".client-heading-line",
            ".client-description",
            ".client-marquee",
          ],
          { clearProps: "all" },
        );
        setMarqueeReady(true);
      });

      return () => mm.revert();
    },
    { scope: contentRef },
  );

  return (
    <Slide style={style}>
      <style>{`
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .animate-scroll {
          animation: scroll 50s linear infinite;
        }
        .animate-scroll.is-paused {
          animation-play-state: paused;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            /* Moves the track exactly halfway minus half the gap (4rem gap = 2rem offset) */
            transform: translateX(calc(-50% - 2rem));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none;
          }
        }
      `}</style>

      <div
        ref={contentRef}
        className="mx-auto w-full max-w-240 px-6 py-10 md:px-12"
      >
        <p className="client-eyebrow mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fd018b]">
          Clients
        </p>

        {/* Header Row */}
        <div className="mb-10 flex flex-col items-start justify-between gap-5 md:mb-14 md:flex-row md:items-end md:gap-6">
          <h2 className="max-w-105 text-[clamp(28px,3vw,44px)] font-bold leading-[1.1] tracking-tight text-black">
            <span className="block overflow-hidden">
              <span className="client-heading-line inline-block">
                Trusted by Leading Organizations
              </span>
            </span>
          </h2>
          <p className="client-description max-w-75 text-[15px] leading-[1.7] text-[#888]">
            Supporting businesses and institutions across industries with
            technology solutions built for performance, resilience and growth
          </p>
        </div>

        {/* Marquee Wrapper */}
        <div className="client-marquee mask-edges relative w-full overflow-hidden py-8">
          <div
            className={`animate-scroll flex w-max items-center gap-16 ${
              marqueeReady ? "" : "is-paused"
            }`}
          >
            {/* Duplicating the array creates the seamless infinite loop */}
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex shrink-0 items-center justify-center"
              >
                <Image
                  src={client.path}
                  alt={`${client.name} logo`}
                  width={120}
                  height={60}
                  className="opacity-70 grayscale transition-all duration-300 ease-in-out hover:opacity-100 hover:grayscale-0"
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

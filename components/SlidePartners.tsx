import type { CSSProperties } from "react";
import Image from "next/image";
import { partnerImages } from "@/data/partners"; // Make sure this path is correct
import { Slide } from "./Slide";

interface SlidePartnersProps {
  style: CSSProperties;
}

export function SlidePartners({ style }: SlidePartnersProps) {
  return (
    <Slide style={style}>
      {/* 
        Custom styles for the infinite marquee animation and gradient mask.
        Keeping this scoped ensures the calc() math for the seamless loop remains perfect.
      */}
      <style>{`
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
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
      `}</style>

      <div className="mx-auto w-full max-w-240 px-6 py-10 md:px-12">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fd018b]">
          Partners
        </p>

        {/* Header Row */}
        <div className="mb-10 flex flex-col items-start justify-between gap-5 md:mb-14 md:flex-row md:items-end md:gap-6">
          <h2 className="max-w-105 text-[clamp(28px,3vw,44px)] font-bold leading-[1.1] tracking-tight text-black">
            Trusted by Global Technology Leaders
          </h2>
          <p className="max-w-75 text-[15px] leading-[1.7] text-[#888]">
            Working with the world&apos;s leading technology companies to
            deliver future-ready solutions.
          </p>
        </div>

        {/* Marquee Wrapper */}
        <div className="mask-edges relative w-full overflow-hidden py-8">
          <div className="animate-scroll flex w-max items-center gap-16">
            {/* Duplicating the array creates the seamless infinite loop */}
            {[...partnerImages, ...partnerImages].map((p, index) => (
              <div
                key={`${p.name}-${index}`}
                className="flex shrink-0 items-center justify-center"
              >
                <Image
                  src={p.path}
                  alt={`${p.name} logo`}
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

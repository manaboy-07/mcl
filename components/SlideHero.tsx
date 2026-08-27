import type { CSSProperties } from "react";
import { Slide } from "./Slide";
import { HeroIllustration } from "./HeroIllustration";

interface SlideHeroProps {
  style: CSSProperties;
  onNext: () => void;
}

export function SlideHero({ style, onNext }: SlideHeroProps) {
  return (
    <Slide style={style}>
      {/* 
        Injecting the custom float animation here so it works out-of-the-box 
        without needing to edit tailwind.config.js
      */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 py-10 md:px-12 lg:grid-cols-2 lg:gap-16">
        {/* Left Content Area */}
        <div className="flex flex-col items-start">
          {/* Eyebrow Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#fd018b]/20 bg-[#fd018b]/10 px-3.5 py-1.5 md:mb-7">
            <div className="h-1.5 w-1.5 rounded-full bg-[#fd018b]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#fd018b]">
              Enterprise Technology
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-5 text-[clamp(36px,4.5vw,68px)] font-extrabold leading-[1.06] tracking-[-0.035em] text-black md:mb-6">
            Built for Modern Business.
          </h1>

          {/* Body */}
          <p className="mb-8 w-full max-w-110 text-base font-normal leading-[1.8] text-[#666] md:mb-10 md:text-[17px]">
            Manifold Computers Limited delivers enterprise infrastructure,
            cybersecurity, networking and managed services that help
            organisations modernise, scale and innovate.
          </p>

          {/* Actions */}
          <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
            <button
              onClick={onNext}
              className="w-full rounded-[7px] bg-[#fd018b] px-[26px] py-[13px] text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(253,1,139,0.3)] sm:w-auto"
            >
              Our Solutions
            </button>
            <button className="w-full rounded-[7px] border border-[#eaeaea] bg-transparent px-[26px] py-[13px] text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-black sm:w-auto">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Illustration Area */}
        <div className="flex justify-center lg:justify-end">
          <div className="animate-float">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </Slide>
  );
}

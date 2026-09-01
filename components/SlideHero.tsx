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
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto flex w-full max-w-[1200px] flex-col justify-start gap-12 overflow-y-auto px-6 py-10 md:px-12 lg:grid lg:h-full lg:grid-cols-2 lg:items-center lg:gap-16 lg:overflow-visible">
        {/* Left Content Area */}
        <div className="order-1 flex w-full flex-col items-start lg:order-none">
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
          <p className="mb-8 w-full max-w-[440px] text-[15px] font-normal leading-[1.8] text-[#666] md:mb-10 md:text-[17px]">
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

        <div className="order-2 flex w-full justify-center lg:order-none lg:justify-end">
          <div className="animate-float w-full max-w-[280px] sm:max-w-[380px] lg:max-w-none">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </Slide>
  );
}

import type { CSSProperties } from "react";
import { Slide } from "./Slide";

interface SlideComingSoonProps {
  style: CSSProperties;
  onNext: () => void;
  onContact: () => void;
}

export function SlideComingSoon({
  style,
  onNext,
  onContact,
}: SlideComingSoonProps) {
  return (
    <Slide style={style}>
      <div className="mx-auto max-w-160 px-6 text-center md:px-8">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 md:mb-12">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#fd018b]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#999]">
            New Website Coming Soon
          </span>
        </div>

        {/* Brand */}
        <div className="mb-6 flex items-center justify-center gap-4 md:mb-7">
          <span className="text-xl font-bold tracking-[-0.02em] text-black md:text-[22px]">
            Manifold Computers Limited
          </span>
        </div>

        {/* Title (Uses your excellent clamp() trick for fluid typography) */}
        <h1 className="mb-5 text-[clamp(36px,5.5vw,72px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-black md:mb-6">
          Our New Digital Experience Is Coming Soon.
        </h1>

        {/* Body text */}
        <p className="mb-8 text-base font-normal leading-[1.8] text-[#666] md:mb-13 md:text-[17px]">
          We&apos;re redesigning our website to better showcase our
          capabilities, partnerships and enterprise solutions. Until then, our
          team remains available.
        </p>

        {/* Actions - Stacks vertically on mobile, horizontal on small screens and up */}
        <div className="flex flex-col justify-center gap-3.5 sm:flex-row">
          <button
            onClick={onNext}
            className="w-full rounded-[7px] bg-[#fd018b] px-7 py-3.25 text-sm font-semibold tracking-[0.01em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(253,1,139,0.3)] sm:w-auto"
          >
            Explore
          </button>
          <button
            onClick={onContact}
            className="w-full rounded-[7px] border border-[#eaeaea] bg-transparent px-7 py-3.25 text-sm font-semibold tracking-[0.01em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-black sm:w-auto"
          >
            Contact Us
          </button>
        </div>
      </div>
    </Slide>
  );
}

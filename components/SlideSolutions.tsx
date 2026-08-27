import type { CSSProperties } from "react";
import { solutions } from "@/data/solutions";
import { Slide } from "./Slide";

interface SlideSolutionsProps {
  style: CSSProperties;
}

export function SlideSolutions({ style }: SlideSolutionsProps) {
  return (
    <Slide style={style}>
      <div className="mx-auto w-full max-w-215 px-6 py-10 md:px-12">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fd018b]">
          Solutions
        </p>
        <h2 className="mb-9 text-[clamp(28px,3vw,44px)] font-bold leading-[1.1] tracking-tight text-black">
          Our Solutions
        </h2>

        <div className="flex flex-col gap-2 md:gap-3">
          {solutions.map((s) => (
            <div
              key={s.name}
              className="group flex cursor-default items-center justify-between gap-4 rounded-[10px] border border-[#eaeaea] bg-white p-5 transition-all duration-300 ease-out hover:translate-x-2 hover:border-black hover:bg-[#f5f5f5] md:gap-6 md:px-6 md:py-4.5"
            >
              {/* Text Wrapper - Stacks on mobile, side-by-side on desktop */}
              <div className="flex flex-1 flex-col gap-1.5 md:flex-row md:items-center md:gap-6">
                <span className="text-[15px] font-semibold tracking-[-0.01em] text-black md:w-55 md:flex-none">
                  {s.name}
                </span>
                <span className="text-sm font-normal leading-[1.6] text-[#666]">
                  {s.desc}
                </span>
              </div>

              {/* Arrow Icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="shrink-0 text-black opacity-30 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-[#fd018b] group-hover:opacity-100"
              >
                <path
                  d="M3 9h12M9 3l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

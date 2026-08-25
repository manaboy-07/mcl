import type { CSSProperties, ReactNode } from "react";

interface SlideProps {
  children: ReactNode;
  style: CSSProperties;
  bg?: string;
}

export function Slide({ children, style, bg = "#fff" }: SlideProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition:
          "opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)",
        paddingTop: 64,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

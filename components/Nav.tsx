"use client";

import { SLIDES } from "@/lib/constants";
import styles from "../app/Nav.module.css";
import Image from "next/image";

interface NavProps {
  current: number;
  progress: number;
  paused: boolean;
  onDotClick: (index: number) => void;
  onTogglePause: () => void;
  onLogoClick: () => void;
}

export function Nav({
  current,
  progress,
  paused,
  onDotClick,
  onTogglePause,
  onLogoClick,
}: NavProps) {
  return (
    <nav className={styles.nav}>
      <div onClick={onLogoClick} className={""}>
        <div className={""}>
          <Image
            src={"/assets/Images/mcl-logo.png"}
            width={150}
            height={150}
            alt="mcl logo"
          />
        </div>
      </div>

      <div className={styles.dotsRow}>
        {SLIDES.map((slide, i) => {
          const isActive = i === current;
          const r = 7;
          const circumference = 2 * Math.PI * r;
          const dash = isActive ? (progress / 100) * circumference : 0;

          return (
            <button
              key={slide}
              onClick={() => onDotClick(i)}
              className={styles.dotButton}
              aria-label={`Go to slide ${i + 1}`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                className={styles.dotSvg}
              >
                <circle
                  cx="9"
                  cy="9"
                  r={r}
                  fill="none"
                  stroke="rgba(0,0,0,0.12)"
                  strokeWidth="1.5"
                />
                {isActive && !paused && (
                  <circle
                    cx="9"
                    cy="9"
                    r={r}
                    fill="none"
                    stroke="#FD018B"
                    strokeWidth="1.5"
                    strokeDasharray={`${dash} ${circumference}`}
                    strokeLinecap="round"
                    className={styles.dotProgress}
                  />
                )}
                <circle
                  cx="9"
                  cy="9"
                  r={isActive ? 3 : 2}
                  fill={isActive ? "#FD018B" : "rgba(0,0,0,0.2)"}
                  className={styles.dotCenter}
                />
              </svg>
            </button>
          );
        })}

        <button
          onClick={onTogglePause}
          className={styles.pauseButton}
          aria-label={paused ? "Resume auto-scroll" : "Pause auto-scroll"}
        >
          {paused ? (
            <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
              <path d="M2 1.5l7 4-7 4V1.5z" fill="rgba(0,0,0,0.5)" />
            </svg>
          ) : (
            <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
              <rect
                x="0.5"
                y="1"
                width="2.5"
                height="9"
                rx="1"
                fill="rgba(0,0,0,0.5)"
              />
              <rect
                x="5.5"
                y="1"
                width="2.5"
                height="9"
                rx="1"
                fill="rgba(0,0,0,0.5)"
              />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}

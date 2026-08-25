import type { CSSProperties } from "react";

import { solutions } from "@/data/solutions";
import styles from "../app/SlideSolutions.module.css";
import { Slide } from "./Slide";

interface SlideSolutionsProps {
  style: CSSProperties;
}

export function SlideSolutions({ style }: SlideSolutionsProps) {
  return (
    <Slide style={style}>
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Solutions</p>
        <h2 className={styles.heading}>Our Solutions</h2>

        <div className={styles.list}>
          {solutions.map((s) => (
            <div key={s.name} className={styles.card}>
              <span className={styles.cardName}>{s.name}</span>
              <span className={styles.cardDesc}>{s.desc}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className={styles.cardIcon}
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

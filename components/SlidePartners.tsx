import type { CSSProperties } from "react";
import Image from "next/image";
import { partnerImages } from "@/data/partners"; // Make sure this path is correct
import styles from "../app/SlidePartners.module.css";
import { Slide } from "./Slide";

interface SlidePartnersProps {
  style: CSSProperties;
}

export function SlidePartners({ style }: SlidePartnersProps) {
  return (
    <Slide style={style}>
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Partners</p>

        <div className={styles.headerRow}>
          <h2 className={styles.heading}>
            Trusted by Global Technology Leaders
          </h2>
          <p className={styles.subtext}>
            Working with the world&apos;s leading technology companies to
            deliver future-ready solutions.
          </p>
        </div>

        {/* Marquee Wrapper */}
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {/* Duplicating the array creates the seamless infinite loop */}
            {[...partnerImages, ...partnerImages].map((p, index) => (
              <div key={`${p.name}-${index}`} className={styles.marqueeItem}>
                <Image
                  src={p.path}
                  alt={`${p.name} logo`}
                  width={120}
                  height={60}
                  className={styles.partnerLogo}
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

import type { CSSProperties } from "react";

import styles from "./Slidecomingsoon.module.css";
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
      <div className={styles.wrap}>
        <div className={styles.badge}>
          <div className={styles.badgeDot} />
          <span className={styles.badgeLabel}>New Website Coming Soon</span>
        </div>

        <div className={styles.brandRow}>
          <span className={styles.brandName}>Manifold Computers Limited</span>
        </div>

        <h1 className={styles.title}>
          Our New Digital Experience Is Coming Soon.
        </h1>

        <p className={styles.body}>
          We&apos;re redesigning our website to better showcase our
          capabilities, partnerships and enterprise solutions. Until then, our
          team remains available.
        </p>

        <div className={styles.actions}>
          <button onClick={onNext} className={styles.primaryButton}>
            Explore
          </button>
          <button onClick={onContact} className={styles.secondaryButton}>
            Contact Us
          </button>
        </div>
      </div>
    </Slide>
  );
}

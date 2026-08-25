import type { CSSProperties } from "react";

import styles from "../app/Slidehero.module.css";
import { Slide } from "./Slide";
import { HeroIllustration } from "./HeroIllustration";

interface SlideHeroProps {
  style: CSSProperties;
  onNext: () => void;
}

export function SlideHero({ style, onNext }: SlideHeroProps) {
  return (
    <Slide style={style}>
      <div className={styles.grid}>
        <div>
          <div className={styles.eyebrowBadge}>
            <div className={styles.eyebrowDot} />
            <span className={styles.eyebrowLabel}>Enterprise Technology</span>
          </div>

          <h1 className={styles.title}>Built for Modern Business.</h1>

          <p className={styles.body}>
            Manifold Computers Limited delivers enterprise infrastructure,
            cybersecurity, networking and managed services that help
            organisations modernise, scale and innovate.
          </p>

          <div className={styles.actions}>
            <button onClick={onNext} className={styles.primaryButton}>
              Our Solutions
            </button>
            <button className={styles.secondaryButton}>Learn More</button>
          </div>
        </div>

        <div className={styles.illustrationWrap}>
          <div className={styles.floating}>
            <HeroIllustration />
          </div>
        </div>
      </div>
    </Slide>
  );
}

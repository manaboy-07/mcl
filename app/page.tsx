"use client";

import { useState } from "react";

import { useSlideDeck } from "@/hooks/useSlideDeck";
import { SLIDES } from "@/lib/constants";
import styles from "./Home.module.css";
import {
  ContactFormState,
  EMPTY_CONTACT_FORM,
  SlideContact,
} from "@/components/SlideContact";
import { Nav } from "@/components/Nav";
import { SlideComingSoon } from "@/components/SlideComingSoon";
import { SlideHero } from "@/components/SlideHero";
import { SlideSolutions } from "@/components/SlideSolutions";
import { SlidePartners } from "@/components/SlidePartners";

const CONTACT_SLIDE_INDEX = SLIDES.indexOf("contact");

export default function Home() {
  const {
    current,
    paused,
    progress,
    goTo,
    togglePause,
    handleUserInteraction,
    slideStyle,
  } = useSlideDeck();

  const [formState, setFormState] =
    useState<ContactFormState>(EMPTY_CONTACT_FORM);
  const [sent, setSent] = useState(false);

  const handleDotClick = (index: number) => {
    handleUserInteraction();
    goTo(index);
  };

  const handleNext = () => {
    handleUserInteraction();
    goTo(current + 1);
  };

  return (
    <div className={styles.page}>
      <Nav
        current={current}
        progress={progress}
        paused={paused}
        onDotClick={handleDotClick}
        onTogglePause={togglePause}
        onLogoClick={() => handleDotClick(0)}
      />

      <SlideComingSoon
        style={slideStyle(0)}
        onNext={handleNext}
        onContact={() => handleDotClick(CONTACT_SLIDE_INDEX)}
      />
      <SlideHero style={slideStyle(1)} onNext={handleNext} />
      <SlideSolutions style={slideStyle(2)} />
      <SlidePartners style={slideStyle(3)} />
      <SlideContact
        style={slideStyle(4)}
        formState={formState}
        setFormState={setFormState}
        sent={sent}
        setSent={setSent}
      />

      {current < SLIDES.length - 1 && (
        <button
          onClick={handleNext}
          className={styles.scrollHint}
          aria-label="Next section"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 4v12M4 10l6 6 6-6"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

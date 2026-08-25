import { motion } from "motion/react";
import { type ElementType, type ReactNode } from "react";

/**
 * RevealLines Component
 * 
 * Elegant line-by-line reveal animation.
 * Replaced GSAP with Framer Motion (motion/react) to fix:
 * 1. Missing external library crashes (GSAP/useGSAP not in dependencies)
 * 2. Timing/viewport bugs where on-mount GSAP animations fire while off-screen,
 *    leaving lines invisible when scrolled into view.
 * 3. React 19 compatibility issues.
 */
export default function RevealLines({
  lines,
  as: Tag = "div",
  className,
  lineClassName,
  delay = 0,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  key?: any;
}) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Stagger between lines (seconds)
        delayChildren: delay, // Start delay
      },
    },
  };

  const childVariants = {
    hidden: { 
      y: "115%", // Pushes text down below the overflow boundary
      opacity: 0 
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1], // Custom exponential ease-out curve (comparable to power4.out)
      },
    },
  };

  const MotionTag = motion(Tag as any);

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Animates automatically when in viewport
      viewport={{ once: true, margin: "-10% 0px" }} // Animates once when 10% inside the viewport
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden ">
          <motion.span
            variants={childVariants as any}
            className={
              lineClassName
                ? `reveal-line inline-block origin-left ${lineClassName}`
                : "reveal-line inline-block origin-left"
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

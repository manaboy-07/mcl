export const SLIDES = [
  "coming-soon",
  "hero",
  "solutions",
  "partners",
  "contact",
] as const

export type SlideName = (typeof SLIDES)[number]

/** How long each slide stays on screen before auto-advancing. */
export const AUTO_INTERVAL_MS = 5000

/** How long a manual interaction (scroll/swipe/keys) pauses auto-advance for. */
export const PAUSE_RESUME_DELAY_MS = 8000

/** Minimum vertical swipe distance to count as a slide change. */
export const SWIPE_THRESHOLD_PX = 40

/** Minimum wheel delta to count as a slide change (ignores trackpad noise). */
export const WHEEL_THRESHOLD_PX = 10

/** How long the outgoing/incoming slide stays locked mid-transition. */
export const TRANSITION_LOCK_MS = 600

/** Delay before swapping `current`, giving the exit animation a frame to start. */
export const TRANSITION_STEP_MS = 50

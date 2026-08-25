"use client"

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import {
  AUTO_INTERVAL_MS,
  PAUSE_RESUME_DELAY_MS,
  SLIDES,
  SWIPE_THRESHOLD_PX,
  TRANSITION_LOCK_MS,
  TRANSITION_STEP_MS,
  WHEEL_THRESHOLD_PX,
} from "@/lib/constants"

type Direction = "down" | "up"

/**
 * Drives the full-screen slide deck: current index, enter/exit direction,
 * auto-advance with a pausable progress ring, and wheel/keyboard/touch input.
 * Mirrors the behaviour of the original Figma export 1:1.
 */
export function useSlideDeck() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<Direction>("down")
  const [transitioning, setTransitioning] = useState(false)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  const lockRef = useRef(false)
  const touchStartY = useRef(0)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback(
    (next: number) => {
      if (lockRef.current || next === current || next < 0 || next >= SLIDES.length) {
        return
      }
      lockRef.current = true
      setTransitioning(true)
      setDirection(next > current ? "down" : "up")
      setProgress(0)
      setTimeout(() => {
        setCurrent(next)
        setTransitioning(false)
        setTimeout(() => {
          lockRef.current = false
        }, TRANSITION_LOCK_MS)
      }, TRANSITION_STEP_MS)
    },
    [current],
  )

  const handleUserInteraction = useCallback(() => {
    setPaused(true)
    if (pauseRef.current) clearTimeout(pauseRef.current)
    pauseRef.current = setTimeout(() => setPaused(false), PAUSE_RESUME_DELAY_MS)
  }, [])

  const togglePause = useCallback(() => {
    setPaused((p) => {
      if (!p) setProgress(0)
      return !p
    })
  }, [])

  // Auto-advance + progress ring
  useEffect(() => {
    if (paused) {
      if (autoRef.current) clearInterval(autoRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
      return
    }
    setProgress(0)
    const tick = AUTO_INTERVAL_MS / 100
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100))
    }, tick)
    autoRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % SLIDES.length
        setDirection("down")
        setProgress(0)
        return next
      })
    }, AUTO_INTERVAL_MS)
    return () => {
      if (autoRef.current) clearInterval(autoRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [paused])

  // Wheel / keyboard / touch input
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD_PX) return
      handleUserInteraction()
      goTo(e.deltaY > 0 ? current + 1 : current - 1)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        handleUserInteraction()
        goTo(current + 1)
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        handleUserInteraction()
        goTo(current - 1)
      }
    }
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(dy) > SWIPE_THRESHOLD_PX) {
        handleUserInteraction()
        goTo(dy > 0 ? current + 1 : current - 1)
      }
    }
    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [current, goTo, handleUserInteraction])

  const slideStyle = useCallback(
    (idx: number): CSSProperties => {
      const isActive = idx === current
      const offset = direction === "down" ? -100 : 100
      const enterFrom = direction === "down" ? 100 : -100

      if (transitioning) {
        if (isActive) return { opacity: 0, transform: `translateY(${enterFrom}px)` }
        if (idx === current - (direction === "down" ? 0 : -1) || idx === current) {
          return { opacity: 0, transform: `translateY(${offset}px)` }
        }
      }
      if (isActive) return { opacity: 1, transform: "translateY(0px)" }
      return {
        opacity: 0,
        transform: `translateY(${idx < current ? -60 : 60}px)`,
        pointerEvents: "none",
      }
    },
    [current, direction, transitioning],
  )

  return {
    current,
    paused,
    progress,
    goTo,
    togglePause,
    handleUserInteraction,
    slideStyle,
  }
}

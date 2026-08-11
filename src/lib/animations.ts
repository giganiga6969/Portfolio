import type { Variants, Transition } from 'framer-motion'

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const

export const transition: Record<string, Transition> = {
  fast: { duration: 0.3, ease: EASE_OUT_EXPO },
  base: { duration: 0.6, ease: EASE_OUT_EXPO },
  slow: { duration: 0.9, ease: EASE_OUT_EXPO },
  spring: { type: 'spring', stiffness: 80, damping: 14, mass: 0.8 },
  springFast: { type: 'spring', stiffness: 140, damping: 16, mass: 0.6 },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transition.base },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.base },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition.base },
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: transition.base },
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: transition.base },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}

'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function RevealOnScroll({ 
  children, 
  delay = 0, 
  className,
  direction = 'up' 
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const shouldReduceMotion = useReducedMotion()

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  // If user prefers reduced motion, disable the offset animation
  const initialStyles = shouldReduceMotion 
    ? { opacity: 0 }
    : { opacity: 0, y: directionOffset[direction].y, x: directionOffset[direction].x }

  const animateStyles = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, x: 0 }

  return (
    <motion.div
      ref={ref}
      initial={initialStyles}
      animate={isInView ? animateStyles : {}}
      transition={{ 
        duration: shouldReduceMotion ? 0.3 : 0.6, 
        delay: shouldReduceMotion ? 0 : delay,
        ease: 'easeOut' 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

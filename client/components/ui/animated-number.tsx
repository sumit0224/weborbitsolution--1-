'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

export function AnimatedNumber({ 
  value, 
  suffix = '', 
  prefix = '',
  duration = 2 
}: AnimatedNumberProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const hasAnimated = useRef(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      const startTime = Date.now()
      const endTime = startTime + duration * 1000

      const animate = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / (duration * 1000), 1)
        
        // Easing function for smooth deceleration
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(easeOutQuart * value)
        
        setCount(currentValue)

        if (now < endTime) {
          requestAnimationFrame(animate)
        } else {
          setCount(value)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [isInView, value, duration])

  return (
    <motion.span
      ref={ref}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={isInView ? (shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : {}}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.5 }}
    >
      {prefix}{shouldReduceMotion ? value : count}{suffix}
    </motion.span>
  )
}

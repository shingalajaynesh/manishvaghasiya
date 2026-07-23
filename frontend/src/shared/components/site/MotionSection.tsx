import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface MotionSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function MotionSection({ children, className, delay = 0 }: MotionSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

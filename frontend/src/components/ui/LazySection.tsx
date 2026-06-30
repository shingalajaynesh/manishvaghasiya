import React, { ReactNode } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

interface LazySectionProps {
  children: ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right'
  delay?: number
}

export function LazySection({
  children, className, animation = 'fade-up', delay = 0
}: LazySectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.08 })

  const animations = {
    'fade-up':     { hidden: 'opacity-0 translate-y-8', visible: 'opacity-100 translate-y-0' },
    'fade-in':     { hidden: 'opacity-0',               visible: 'opacity-100' },
    'slide-left':  { hidden: 'opacity-0 -translate-x-8', visible: 'opacity-100 translate-x-0' },
    'slide-right': { hidden: 'opacity-0 translate-x-8',  visible: 'opacity-100 translate-x-0' },
  }

  const anim = animations[animation]

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`
        transition-all duration-700 ease-out
        ${isIntersecting ? anim.visible : anim.hidden}
        ${className ?? ''}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

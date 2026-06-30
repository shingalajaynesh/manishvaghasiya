import React, { useRef } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'

interface CounterItemProps {
  target: number
  suffix: string
  label: string
  detail: string
  underlineColor: string
  isActive: boolean
}

function CounterItem({
  target,
  suffix,
  label,
  detail,
  underlineColor,
  isActive,
}: CounterItemProps) {
  const count = useAnimatedCounter(target, 2000, isActive)

  // Format count helper
  const formattedCount = count.toLocaleString('en-IN')

  return (
    <div className="flex flex-col items-center text-center p-4">
      <span className="font-display font-black text-white text-[2.75rem] md:text-[3.75rem] leading-none mb-3 tracking-tight">
        {formattedCount}
        {suffix}
      </span>
      {/* Accent Underline */}
      <div className={`w-12 h-1 rounded-full ${underlineColor} mb-4`} />
      <span className="font-sans font-bold text-white text-sm uppercase tracking-wider mb-1">
        {label}
      </span>
      <span className="font-sans text-xs text-apple-muted leading-relaxed max-w-[150px]">
        {detail}
      </span>
    </div>
  )
}

const impactStats = [
  {
    target: 1500000,
    suffix: '+',
    label: 'Social Followers',
    detail: 'across Instagram, Facebook & YouTube',
    underlineColor: 'bg-accent-orange',
  },
  {
    target: 4500,
    suffix: '+',
    label: 'Programs',
    detail: 'delivered in various formats',
    underlineColor: 'bg-accent-purple',
  },
  {
    target: 1000,
    suffix: '+',
    label: 'Institutions',
    detail: 'served across public & private sectors',
    underlineColor: 'bg-accent-blue',
  },
  {
    target: 20,
    suffix: '+',
    label: 'Years Exp.',
    detail: 'experience in transformational coaching',
    underlineColor: 'bg-accent-gold',
  },
  {
    target: 2,
    suffix: '',
    label: 'Nations Reached',
    detail: 'expanding impact internationally',
    underlineColor: 'bg-accent-green',
  },
]

export function ImpactNumbers() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  return (
    <section 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="bg-[#0F0F1A] text-white section-padding relative overflow-hidden"
    >
      {/* Subtle background color blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-accent-blue/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent-purple/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent-blue text-xs uppercase tracking-[0.2em] font-bold mb-3 block">
            Our Shared Journey
          </span>
          <h2 className="font-display font-bold text-white text-h2 leading-tight tracking-tight">
            Impact in Numbers
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-4 md:gap-8">
          {impactStats.map((stat) => (
            <CounterItem
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              detail={stat.detail}
              underlineColor={stat.underlineColor}
              isActive={isIntersecting}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

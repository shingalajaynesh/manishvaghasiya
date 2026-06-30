import React from 'react'

interface PillProps {
  children: React.ReactNode
  color?: 'blue' | 'orange' | 'purple' | 'teal' | 'gold' | 'green' | 'gray'
  className?: string
}

export function Pill({ children, color = 'blue', className = '' }: PillProps) {
  const colors = {
    blue:   'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
    orange: 'bg-accent-orange/10 text-accent-orange border-accent-orange/20',
    purple: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
    teal:   'bg-accent-teal/10 text-accent-teal border-accent-teal/20',
    gold:   'bg-accent-gold/10 text-accent-gold border-accent-gold/20',
    green:  'bg-accent-green/10 text-accent-green border-accent-green/20',
    gray:   'bg-bg-subtle text-apple-gray border-border',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 border rounded-full text-xs font-semibold tracking-wide uppercase ${colors[color]} ${className}`}
    >
      {children}
    </span>
  )
}

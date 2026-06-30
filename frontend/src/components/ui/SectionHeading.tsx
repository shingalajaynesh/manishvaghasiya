import React from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-3 max-w-3xl mb-12 ${
        centered ? 'text-center mx-auto' : 'text-left'
      } ${className}`}
    >
      <span className="text-accent-blue text-xs uppercase tracking-[0.2em] font-bold">
        {eyebrow}
      </span>
      <h2 className="font-display font-bold text-apple-black text-h2 leading-tight tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-apple-gray text-base md:text-lg font-light leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

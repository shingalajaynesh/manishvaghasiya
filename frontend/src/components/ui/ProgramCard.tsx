import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Pill } from './Pill'

interface ProgramCardProps {
  icon: LucideIcon
  title: string
  description: string
  tags: string[]
  accentColor: 'blue' | 'orange' | 'purple' | 'teal' | 'gold' | 'green'
  path: string
}

export function ProgramCard({
  icon: Icon,
  title,
  description,
  tags,
  accentColor,
  path,
}: ProgramCardProps) {
  const accentBorders = {
    blue:   'hover:border-t-accent-blue',
    orange: 'hover:border-t-accent-orange',
    purple: 'hover:border-t-accent-purple',
    teal:   'hover:border-t-accent-teal',
    gold:   'hover:border-t-accent-gold',
    green:  'hover:border-t-accent-green',
  }

  const iconBackgrounds = {
    blue:   'bg-accent-blue/10 text-accent-blue',
    orange: 'bg-accent-orange/10 text-accent-orange',
    purple: 'bg-accent-purple/10 text-accent-purple',
    teal:   'bg-accent-teal/10 text-accent-teal',
    gold:   'bg-accent-gold/10 text-accent-gold',
    green:  'bg-accent-green/10 text-accent-green',
  }

  return (
    <div
      className={`bg-white border border-border hover:border-t-4 rounded-[24px] p-6 md:p-8 flex flex-col items-start text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-card-lg ${accentBorders[accentColor]}`}
    >
      {/* Icon Wrapper */}
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${iconBackgrounds[accentColor]}`}>
        <Icon className="w-6 h-6" />
      </div>

      {/* Title */}
      <h3 className="font-sans font-bold text-apple-black text-lg md:text-xl mb-3 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-apple-gray text-xs md:text-sm font-light leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      {/* Tags Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <Pill key={tag} color="gray" className="text-[9px] px-2 py-0.5">{tag}</Pill>
        ))}
      </div>

      {/* Action Link */}
      <Link
        to={path}
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-blue hover:text-accent-blue/80 transition-colors group mt-auto"
      >
        Learn More
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

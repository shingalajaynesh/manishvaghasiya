import { Star, Quote } from 'lucide-react'
import { Pill } from './Pill'

interface TestimonialCardProps {
  name: string
  role: string
  location: string
  stars: number
  quote: string
  tag: string
}

export function TestimonialCard({
  name,
  role,
  location,
  stars,
  quote,
  tag,
}: TestimonialCardProps) {
  // Initials generator
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="bg-white border border-border rounded-3xl p-6 md:p-8 flex flex-col justify-between text-left shadow-sm min-w-[280px] max-w-[340px] md:max-w-[400px] flex-shrink-0 scroll-snap-align-start hover:shadow-md transition-shadow duration-300">
      
      {/* Upper Section */}
      <div>
        <div className="flex justify-between items-start mb-6">
          {/* Avatar Circle */}
          <div className="w-10 h-10 rounded-full bg-bg-subtle text-apple-gray flex items-center justify-center font-sans font-bold text-xs border border-border">
            {initials || 'MV'}
          </div>
          
          <Quote className="w-8 h-8 text-bg-subtle" />
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 text-accent-gold mb-4">
          {Array.from({ length: stars }).map((_, idx) => (
            <Star key={idx} className="w-3.5 h-3.5 fill-accent-gold text-accent-gold" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-apple-black text-xs md:text-sm font-light leading-relaxed mb-6 italic">
          "{quote}"
        </p>
      </div>

      {/* Footer Info */}
      <div className="border-t border-border pt-4 mt-auto flex flex-col gap-3">
        <div>
          <h4 className="font-sans font-bold text-apple-black text-sm leading-tight">{name}</h4>
          <p className="text-[11px] text-apple-gray">
            {role} · {location}
          </p>
        </div>
        <div>
          <Pill color="gray" className="text-[8px] px-2 py-0.5">{tag}</Pill>
        </div>
      </div>

    </div>
  )
}

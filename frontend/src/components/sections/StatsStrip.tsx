import { motion } from 'framer-motion'
import { LazySection } from '../ui/LazySection'

const stats = [
  { number: '1.5M+',  label: 'Followers', detail: 'across multiple social platforms' },
  { number: '4500+',  label: 'Programs',  detail: 'delivered successfully across India' },
  { number: '1000+',  label: 'Institutions', detail: 'served including banks, schools, corporates' },
  { number: '20+',    label: 'Years Exp.', detail: 'experience transforming youth & families' },
]

export function StatsStrip() {
  return (
    <section className="bg-white border-y border-border py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LazySection animation="fade-in">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map(({ number, label, detail }) => (
              <div key={label} className="text-center flex flex-col items-center">
                <span className="font-display font-black text-apple-black text-[2.5rem] md:text-[3.25rem] leading-none mb-2 tracking-tight">
                  {number}
                </span>
                <span className="font-sans font-bold text-apple-black text-xs md:text-sm uppercase tracking-wider mb-1">
                  {label}
                </span>
                <span className="font-sans text-[11px] md:text-xs text-apple-gray max-w-[160px] leading-relaxed">
                  {detail}
                </span>
              </div>
            ))}
          </div>
        </LazySection>
      </div>
    </section>
  )
}

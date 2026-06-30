import { Link } from 'react-router-dom'
import { ArrowRight, HeartHandshake, ShieldCheck } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { LazySection } from '../ui/LazySection'

export function InitiativesSection() {
  return (
    <section className="bg-white section-padding border-b border-border relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="Giving Back"
          title="Signature Initiatives"
          description="Manish believes that small, collective actions lead to monumental shifts in society. Discover his nationwide social campaigns."
        />

        <LazySection animation="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Initiative 1: 1 Rupee for Nation */}
            <div className="bg-off-white border border-border p-8 rounded-[32px] text-left flex flex-col items-start shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-2xl bg-accent-orange/10 text-accent-orange flex items-center justify-center mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              
              <div className="flex items-center gap-2.5 mb-3">
                <h3 className="font-sans font-bold text-apple-black text-lg md:text-xl tracking-tight">
                  1 Rupee for Nation
                </h3>
                {/* Tiny flag pill indicator */}
                <span className="flex items-center gap-0.5 px-2 py-0.5 text-[9px] font-bold bg-white border rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#128807]" />
                  India
                </span>
              </div>

              <p className="text-apple-gray text-xs md:text-sm font-light leading-relaxed mb-6 flex-grow">
                A massive community movement where every citizen contributes exactly ₹1 toward national welfare, defense funds, and disaster management. Manfred believes small contributions, multiplied by millions, move mountains.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-orange hover:text-accent-orange/80 transition-colors group mt-auto"
              >
                Learn More
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Initiative 2: Parenting for Peace */}
            <div className="bg-off-white border border-border p-8 rounded-[32px] text-left flex flex-col items-start shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-2xl bg-accent-green/10 text-accent-green flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h3 className="font-sans font-bold text-apple-black text-lg md:text-xl mb-3 tracking-tight">
                Parenting for Peace
              </h3>

              <p className="text-apple-gray text-xs md:text-sm font-light leading-relaxed mb-6 flex-grow">
                A dedicated campaign focused on bridging the communication gap between parents and children. Through counseling camps, workshops, and school seminars, Manish educates families on parenting techniques.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-green hover:text-accent-green/80 transition-colors group mt-auto"
              >
                Learn More
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </LazySection>

      </div>
    </section>
  )
}

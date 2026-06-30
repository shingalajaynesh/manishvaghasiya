import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { LazyImage } from '../ui/LazyImage'
import { LazySection } from '../ui/LazySection'
import { Pill } from '../ui/Pill'

const tags = ['Youth Icon', 'Life Coach', 'Trainer', 'Consultant', 'Podcast Host']

export function AboutSection() {
  return (
    <section className="bg-off-white section-padding relative overflow-hidden border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Image with Quote Mark Decor */}
          <div className="lg:col-span-5 relative flex justify-center order-last lg:order-first">
            <LazySection animation="slide-left" className="relative w-full max-w-[380px]">
              {/* Decorative Quote Mark */}
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-accent-orange flex items-center justify-center text-white font-serif text-3xl shadow-md z-20">
                “
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-card-lg border border-border bg-white">
                <LazyImage
                  src="/images/about/manish-stage.webp"
                  alt="Manish Vaghasiya Smiling"
                  className="w-full h-full object-cover"
                  placeholder="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='125' viewBox='0 0 100 125'><rect width='100%' height='100%' fill='%23f2f2f7'/><text x='50%' y='50%' font-family='sans-serif' font-size='8' fill='%23aeaeb2' text-anchor='middle'>Manish Vaghasiya</text></svg>"
                />
              </div>
            </LazySection>
          </div>

          {/* Right: Text Description */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <LazySection animation="fade-up">
              <span className="text-accent-blue text-xs uppercase tracking-[0.2em] font-bold mb-3 block">
                About Manish
              </span>
              <h2 className="font-display font-bold text-apple-black text-h2 leading-tight tracking-tight mb-6">
                A Coach Who Has Lived What He Teaches
              </h2>
              
              <div className="flex flex-col gap-4 text-apple-gray text-sm md:text-base font-light leading-relaxed mb-6">
                <p>
                  Manish Vaghasiya is the founder of <strong>Manas Life Coach</strong> and one of India's most sought-after transformational speakers. Based in Surat, Gujarat, he has spent decades helping youth, families, and organizations discover the power within themselves — through honesty, experience, and heart.
                </p>
                <p>
                  With 4,500+ programs, he has spoken in 1,000+ banks, schools, companies, and colleges. His signature initiatives — <em>"1 Rupee for Nation"</em> and <em>"Parenting for Peace"</em> — have created ripples of positive change across Gujarat and beyond.
                </p>
                <p>
                  From battling personal adversity to becoming a beacon for millions online, Manish's journey is proof that transformation is not a destination — it is a daily practice.
                </p>
              </div>

              {/* Tags Badge Row */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {tags.map((tag) => (
                  <Pill key={tag} color="gray">{tag}</Pill>
                ))}
              </div>

              {/* Link CTA */}
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-blue hover:text-accent-blue/80 transition-colors group"
              >
                Read Full Story
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </LazySection>
          </div>

        </div>
      </div>
    </section>
  )
}

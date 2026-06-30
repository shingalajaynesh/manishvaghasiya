import { ArrowRight, Newspaper } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { LazySection } from '../ui/LazySection'
import { Pill } from '../ui/Pill'

const articles = [
  {
    pub: 'Gujarat Samachar',
    date: 'March 15, 2025',
    title: "Youth Icon Manish Vaghasiya Addresses 10,000+ Students on Combating Academic Depression",
    excerpt: "In his keynote, Manish outlined steps for families to detect exam-related stress and create healthy channels of communication.",
    url: 'https://gujaratsamachar.com',
  },
  {
    pub: 'Divya Bhaskar',
    date: 'January 28, 2025',
    title: "How '1 Rupee for Nation' Initiative by Manas Life Coach is Powering Rural Libraries",
    excerpt: "A look at the community fundraiser that collects ₹1 contributions from citizens to construct modern book hubs in tribal areas.",
    url: 'https://divyabhaskar.co.in',
  },
  {
    pub: 'Times of India',
    date: 'November 12, 2024',
    title: 'Transformational Speaker Manish Vaghasiya Invited for Banking Corporate Leadership Keynote',
    excerpt: 'The seminar addressed mindsets, adaptability in digital spaces, and stress management parameters for over 500 branch executives.',
    url: 'https://timesofindia.indiatimes.com',
  },
]

const logos = [
  { name: 'Gujarat Samachar' },
  { name: 'Sandesh' },
  { name: 'Divya Bhaskar' },
  { name: 'Times of India' },
]

export function MediaSection() {
  return (
    <section className="bg-white section-padding border-b border-border relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="In The Media"
          title="As Featured In"
          description="Read newspaper coverage and media features outlining Manish's public seminars and social campaigns."
        />

        {/* Grayscale Press Logo Strip */}
        <LazySection animation="fade-in" className="mb-16">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 border-b border-border pb-10">
            {logos.map((logo) => (
              <span
                key={logo.name}
                className="font-display font-bold text-apple-muted hover:text-apple-black text-lg md:text-xl transition-colors duration-300 tracking-tight"
              >
                {logo.name}
              </span>
            ))}
          </div>
        </LazySection>

        {/* Article Cards Grid */}
        <LazySection animation="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((art) => (
              <div
                key={art.title}
                className="bg-white border border-border p-6 rounded-3xl text-left flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Newspaper className="w-4 h-4 text-accent-blue" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-apple-gray">
                      {art.pub}
                    </span>
                    <span className="text-[10px] text-apple-muted">·</span>
                    <span className="text-[10px] text-apple-muted">{art.date}</span>
                  </div>
                  
                  <h3 className="font-sans font-bold text-apple-black text-sm md:text-base leading-snug tracking-tight mb-3 hover:text-accent-blue transition-colors">
                    <a href={art.url} target="_blank" rel="noopener noreferrer">
                      {art.title}
                    </a>
                  </h3>
                  
                  <p className="text-apple-gray text-xs font-light leading-relaxed mb-6">
                    {art.excerpt}
                  </p>
                </div>

                <a
                  href={art.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent-blue hover:text-accent-blue/80 transition-colors group mt-auto"
                >
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            ))}
          </div>
        </LazySection>

      </div>
    </section>
  )
}

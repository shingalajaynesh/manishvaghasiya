import { TestimonialCard } from '../ui/TestimonialCard'
import { SectionHeading } from '../ui/SectionHeading'
import { LazySection } from '../ui/LazySection'

const testimonials = [
  {
    name: 'Riya Shah',
    role: 'Student',
    location: 'Surat',
    stars: 5,
    quote: 'Manish bhai changed the way I think about my future. After his session, I cleared my competitive exam with confidence I never knew I had.',
    tag: 'Youth Program',
  },
  {
    name: 'HR Manager',
    role: 'Leading Bank',
    location: 'Gujarat',
    stars: 5,
    quote: "Our entire team's productivity shifted after Manish's corporate workshop. The energy he brings to a room is unmatched.",
    tag: 'Corporate Program',
  },
  {
    name: 'Priya Mehta',
    role: 'Parent',
    location: 'Vadodara',
    stars: 5,
    quote: 'Parenting for Peace transformed my relationship with my teenage son. We communicate now — truly communicate.',
    tag: 'Parenting for Peace',
  },
  {
    name: 'Anonymous',
    role: 'Coaching Client',
    location: 'Age 24',
    stars: 5,
    quote: 'I was dealing with depression when I attended Manish\'s program. He gave me tools that no therapist ever did — in plain, human language.',
    tag: 'Life Coaching',
  },
  {
    name: 'College Principal',
    role: 'Engineering College',
    location: 'South Gujarat',
    stars: 5,
    quote: 'More than 200 students in our college changed their career direction after his seminar. We invite him every year.',
    tag: 'Youth Program',
  },
  {
    name: 'Raj Patel',
    role: 'Businessman',
    location: 'Surat',
    stars: 5,
    quote: "His talk on 'ખુદની ફિલોસોફી' (your own philosophy) is something I carry with me every single day in my business.",
    tag: 'Life Coaching',
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-off-white section-padding border-b border-border relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="What People Say"
          title="Voices of Transformation"
          description="Read real stories of change from students, professionals, and families who attended Manish's programs."
        />

        {/* Scrollable card container */}
        <LazySection animation="fade-up">
          <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scroll-smooth mask-horizontal-scroll">
            {testimonials.map((t, idx) => (
              <TestimonialCard
                key={t.name + idx}
                name={t.name}
                role={t.role}
                location={t.location}
                stars={t.stars}
                quote={t.quote}
                tag={t.tag}
              />
            ))}
          </div>
          
          <div className="text-center mt-6 text-xs text-apple-gray block lg:hidden">
            ← Swipe to view more reviews →
          </div>
        </LazySection>

      </div>
    </section>
  )
}

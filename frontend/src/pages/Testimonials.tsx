import { Layout } from '../components/layout/Layout'
import { TestimonialCard } from '../components/ui/TestimonialCard'
import { LazySection } from '../components/ui/LazySection'

const allTestimonials = [
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

export default function Testimonials() {
  return (
    <Layout>
      {/* Page Hero */}
      <section className="bg-bg-subtle py-16 border-b border-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazySection animation="fade-up">
            <span className="text-accent-blue text-xs uppercase tracking-[0.2em] font-bold mb-3 block">
              Testimonials
            </span>
            <h1 className="font-display font-bold text-apple-black text-h1 leading-tight tracking-tight mb-4 max-w-xl">
              Voices of Transformation
            </h1>
            <p className="text-apple-gray text-base md:text-lg font-light leading-relaxed max-w-2xl">
              Read personal feedback and stories of growth from students, parents, and leaders who have attended Manish's keynotes.
            </p>
          </LazySection>
        </div>
      </section>

      {/* Testimonials Grid Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazySection animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
              {allTestimonials.map((t, idx) => (
                <div key={t.name + idx} className="w-full max-w-[380px] md:max-w-full flex">
                  <TestimonialCard
                    name={t.name}
                    role={t.role}
                    location={t.location}
                    stars={t.stars}
                    quote={t.quote}
                    tag={t.tag}
                  />
                </div>
              ))}
            </div>
          </LazySection>
        </div>
      </section>
    </Layout>
  )
}

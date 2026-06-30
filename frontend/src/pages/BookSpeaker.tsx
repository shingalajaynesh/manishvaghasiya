import { Layout } from '../components/layout/Layout'
import { ContactSection } from '../components/sections/ContactSection'
import { LazySection } from '../components/ui/LazySection'

const categories = [
  {
    title: 'Schools & Colleges',
    use: 'Exam mindset, motivation, career mapping, parenting tips.',
    duration: '60–90 mins keynote / interactive session',
  },
  {
    title: 'Corporate & Banks',
    use: 'Executive stress management, peak productivity, team building.',
    duration: 'Half-day workshops / custom consulting',
  },
  {
    title: 'Community Events',
    use: 'Parenting seminars, youth gatherings, social campaigns.',
    duration: '90–120 mins keynote address',
  },
]

export default function BookSpeaker() {
  return (
    <Layout>
      {/* Page Hero */}
      <section className="bg-bg-subtle py-16 border-b border-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazySection animation="fade-up">
            <span className="text-accent-blue text-xs uppercase tracking-[0.2em] font-bold mb-3 block">
              Event Booking
            </span>
            <h1 className="font-display font-bold text-apple-black text-h1 leading-tight tracking-tight mb-4 max-w-xl">
              Invite Manish to Speak
            </h1>
            <p className="text-apple-gray text-base md:text-lg font-light leading-relaxed max-w-2xl">
              Deliver an unforgettable experience of authenticity, energy, and practical life values to your audience.
            </p>
          </LazySection>
        </div>
      </section>

      {/* Booking Details Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-4xl mx-auto mb-16">
            <LazySection animation="fade-up">
              <h2 className="font-display font-bold text-apple-black text-2xl md:text-3xl tracking-tight mb-6">
                Speaking Formats & Packages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((c) => (
                  <div key={c.title} className="border border-border p-6 rounded-2xl bg-off-white hover:shadow-sm transition-shadow duration-300">
                    <h3 className="font-sans font-bold text-apple-black text-base mb-3">{c.title}</h3>
                    <p className="text-apple-gray text-xs font-light leading-relaxed mb-4">{c.use}</p>
                    <span className="text-[10px] text-accent-blue font-bold uppercase tracking-wider block mt-auto">
                      {c.duration}
                    </span>
                  </div>
                ))}
              </div>
            </LazySection>
          </div>
        </div>
      </section>

      {/* Contact Enquiry Form */}
      <ContactSection />
    </Layout>
  )
}

import { Layout } from '../components/layout/Layout'
import { PodcastSection } from '../components/sections/PodcastSection'
import { BookingSection } from '../components/sections/BookingSection'
import { LazySection } from '../components/ui/LazySection'

export default function Podcast() {
  return (
    <Layout>
      {/* Page Hero */}
      <section className="bg-bg-subtle py-16 border-b border-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazySection animation="fade-up">
            <span className="text-accent-purple text-xs uppercase tracking-[0.2em] font-bold mb-3 block">
              Audio Show
            </span>
            <h1 className="font-display font-bold text-apple-black text-h1 leading-tight tracking-tight mb-4 max-w-xl">
              Listen & Learn
            </h1>
            <p className="text-apple-gray text-base md:text-lg font-light leading-relaxed max-w-2xl">
              Tune in to raw, real conversations exploring youth development, exam pressures, family communication, and parenting guidelines.
            </p>
          </LazySection>
        </div>
      </section>

      {/* Main Podcast Section */}
      <PodcastSection />

      {/* Booking CTA */}
      <BookingSection />
    </Layout>
  )
}

import { Layout } from '../components/layout/Layout'
import { MediaSection } from '../components/sections/MediaSection'
import { BookingSection } from '../components/sections/BookingSection'
import { LazySection } from '../components/ui/LazySection'

export default function Media() {
  return (
    <Layout>
      {/* Page Hero */}
      <section className="bg-bg-subtle py-16 border-b border-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazySection animation="fade-up">
            <span className="text-accent-blue text-xs uppercase tracking-[0.2em] font-bold mb-3 block">
              Press Coverage
            </span>
            <h1 className="font-display font-bold text-apple-black text-h1 leading-tight tracking-tight mb-4 max-w-xl">
              In the News
            </h1>
            <p className="text-apple-gray text-base md:text-lg font-light leading-relaxed max-w-2xl">
              Stay up to date with Manish Vaghasiya's public campaigns, stage keynotes, and press mentions across leading publications.
            </p>
          </LazySection>
        </div>
      </section>

      {/* Main Media Section */}
      <MediaSection />

      {/* Booking CTA */}
      <BookingSection />
    </Layout>
  )
}

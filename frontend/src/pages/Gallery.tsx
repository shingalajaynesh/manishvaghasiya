import { Layout } from '../components/layout/Layout'
import { GallerySection } from '../components/sections/GallerySection'
import { LazySection } from '../components/ui/LazySection'

export default function Gallery() {
  return (
    <Layout>
      {/* Page Hero */}
      <section className="bg-bg-subtle py-16 border-b border-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazySection animation="fade-up">
            <span className="text-accent-blue text-xs uppercase tracking-[0.2em] font-bold mb-3 block">
              Moments
            </span>
            <h1 className="font-display font-bold text-apple-black text-h1 leading-tight tracking-tight mb-4 max-w-xl">
              Stage Gallery
            </h1>
            <p className="text-apple-gray text-base md:text-lg font-light leading-relaxed max-w-2xl">
              Explore snapshots of keynote presentations, youth development camps, corporate mindsets, and community engagements led by Manish.
            </p>
          </LazySection>
        </div>
      </section>

      {/* Main Gallery Section */}
      <GallerySection />
    </Layout>
  )
}

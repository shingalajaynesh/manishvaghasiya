import { Layout } from '../components/layout/Layout'
import { ContactSection } from '../components/sections/ContactSection'
import { LazySection } from '../components/ui/LazySection'

export default function Contact() {
  return (
    <Layout>
      {/* Page Hero */}
      <section className="bg-bg-subtle py-16 border-b border-border text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LazySection animation="fade-up">
            <span className="text-accent-blue text-xs uppercase tracking-[0.2em] font-bold mb-3 block">
              Contact Us
            </span>
            <h1 className="font-display font-bold text-apple-black text-h1 leading-tight tracking-tight mb-4 max-w-xl">
              Get in Touch
            </h1>
            <p className="text-apple-gray text-base md:text-lg font-light leading-relaxed max-w-2xl">
              Have questions about workshops or consultation sessions? Drop us a message, and our team will get back to you.
            </p>
          </LazySection>
        </div>
      </section>

      {/* Main Contact Section */}
      <ContactSection />
    </Layout>
  )
}

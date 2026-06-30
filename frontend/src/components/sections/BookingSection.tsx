import { Link } from 'react-router-dom'
import { Calendar, Phone, Mail, MapPin } from 'lucide-react'
import { LazySection } from '../ui/LazySection'

export function BookingSection() {
  return (
    <section className="bg-gradient-to-br from-accent-blue via-accent-purple to-accent-blue/90 text-white py-16 relative z-10 overflow-hidden">
      {/* Background circles for overlay pattern */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-black/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <LazySection animation="fade-up">
          <h2 className="font-display font-bold text-white text-h2 leading-tight tracking-tight mb-6">
            Ready to Transform Your Audience?
          </h2>
          
          <p className="text-white/80 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Book Manish Vaghasiya for your next event — corporate seminar, college program, parenting workshop, or motivational keynote.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link
              to="/book-speaker"
              className="flex items-center gap-2 px-8 py-4 bg-white hover:bg-white/90 text-accent-blue rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:shadow-card-lg hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              Book a Session
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 border border-white/40 hover:border-white text-white rounded-full text-sm font-bold tracking-wide transition-all duration-300 bg-transparent hover:bg-white/10"
            >
              Send an Enquiry
            </Link>
          </div>

          {/* Contact coordinates */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 border-t border-white/10 text-xs md:text-sm font-medium text-white/95">
            <a href="tel:+918200302328" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Phone className="w-4 h-4" />
              <span>+91-8200302328</span>
            </a>
            <a href="mailto:info@manishvaghasiya.com" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@manishvaghasiya.com</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Surat, Gujarat, India</span>
            </div>
          </div>
        </LazySection>
      </div>
    </section>
  )
}

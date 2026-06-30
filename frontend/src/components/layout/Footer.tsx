import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube, Linkedin, Phone, Mail, MapPin } from 'lucide-react'

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Programs', path: '/programs' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
]

const programLinks = [
  { name: 'Youth Transformation', path: '/programs/youth' },
  { name: 'Corporate Motivation', path: '/programs/corporate' },
  { name: 'Parenting for Peace', path: '/programs/parenting' },
  { name: 'Life Coaching & Consultation', path: '/programs' },
]

const socials = [
  { Icon: Instagram, url: 'https://instagram.com/manishvaghasiya01', label: 'Instagram' },
  { Icon: Facebook, url: 'https://facebook.com/manish.vaghasiya.984', label: 'Facebook' },
  { Icon: Youtube, url: 'https://youtube.com/@manishvaghasiya', label: 'YouTube' },
  { Icon: Linkedin, url: 'https://linkedin.com/in/manish-vaghasiya', label: 'LinkedIn' },
]

export function Footer() {
  return (
    <footer className="bg-apple-black text-white py-16 border-t border-white/5 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & Socials */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-apple-black font-display font-bold text-lg">
                MV
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-white text-sm tracking-wide leading-none">
                  MANISH VAGHASIYA
                </span>
                <span className="font-sans text-[10px] text-apple-muted tracking-wider leading-none mt-0.5">
                  Transformational Coach
                </span>
              </div>
            </Link>
            <p className="text-apple-muted text-xs leading-relaxed mt-2 max-w-xs">
              Transforming lives through the power of authentic storytelling, real-world wisdom, and the courage to begin again.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socials.map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-apple-muted hover:bg-accent-blue hover:text-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xs uppercase tracking-[0.2em] font-bold">Quick Links</h3>
            <ul className="flex flex-col gap-2.5 text-xs text-apple-muted">
              {quickLinks.map(({ name, path }) => (
                <li key={name}>
                  <Link to={path} className="hover:text-white transition-colors duration-200">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xs uppercase tracking-[0.2em] font-bold">Programs</h3>
            <ul className="flex flex-col gap-2.5 text-xs text-apple-muted">
              {programLinks.map(({ name, path }) => (
                <li key={name}>
                  <Link to={path} className="hover:text-white transition-colors duration-200">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-4 text-xs text-apple-muted">
            <h3 className="text-white text-xs uppercase tracking-[0.2em] font-bold">Contact Details</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+918200302328" className="flex items-start gap-2.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-accent-blue mt-0.5" />
                <span>+91-8200302328</span>
              </a>
              <a href="tel:+918758509891" className="flex items-start gap-2.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-accent-blue mt-0.5" />
                <span>+91-8758509891</span>
              </a>
              <a href="mailto:info@manishvaghasiya.com" className="flex items-start gap-2.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-accent-blue mt-0.5" />
                <span>info@manishvaghasiya.com</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
                <span>Surat, Gujarat, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-apple-muted">
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            <span>© {new Date().getFullYear()} Manish Vaghasiya. All rights reserved.</span>
            <span className="hidden md:inline">|</span>
            <a href="https://www.manishvaghasiya.com" className="hover:text-white">manishvaghasiya.com</a>
            <span>·</span>
            <a href="https://www.manishvaghasiya.in" className="hover:text-white">manishvaghasiya.in</a>
          </div>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-white">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Calendar } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Programs', path: '/programs' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Podcast', path: '/podcast' },
  { name: 'Media', path: '/media' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-nav border-b border-border shadow-sm py-3'
          : 'bg-white/40 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-apple-black flex items-center justify-center text-white font-display font-bold text-base transition-transform duration-300 group-hover:scale-105">
            MV
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-apple-black text-sm tracking-wide leading-none">
              MANISH VAGHASIYA
            </span>
            <span className="font-sans text-[10px] text-apple-gray tracking-wider leading-none mt-0.5">
              Transformational Coach
            </span>
          </div>
        </Link>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ name, path }) => {
            const isActive = location.pathname === path
            return (
              <Link
                key={name}
                to={path}
                className={`font-sans text-xs font-semibold tracking-wide uppercase transition-colors duration-200 hover:text-accent-blue relative ${
                  isActive ? 'text-accent-blue' : 'text-apple-gray'
                }`}
              >
                {name}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-blue rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right: CTA button */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            to="/book-speaker"
            className="flex items-center gap-2 px-5 py-2.5 bg-accent-blue hover:bg-accent-blue/90 text-white rounded-full text-xs font-bold font-sans tracking-wide transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book a Session
          </Link>
        </div>

        {/* Hamburger menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 -mr-2 text-apple-black hover:text-accent-blue transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Slide-in Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 top-[60px] bg-black/10 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-[60px] right-0 bottom-0 w-full max-w-[320px] bg-white border-l border-border p-6 flex flex-col z-40 lg:hidden shadow-card-xl"
            >
              <div className="flex flex-col gap-5 mt-4">
                {navLinks.map(({ name, path }) => {
                  const isActive = location.pathname === path
                  return (
                    <Link
                      key={name}
                      to={path}
                      className={`font-sans text-sm font-semibold tracking-wide uppercase py-2 border-b border-border ${
                        isActive ? 'text-accent-blue' : 'text-apple-gray'
                      }`}
                    >
                      {name}
                    </Link>
                  )
                })}
              </div>

              <div className="mt-auto">
                <Link
                  to="/book-speaker"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-accent-blue text-white rounded-xl text-sm font-bold tracking-wide shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  Book a Session
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

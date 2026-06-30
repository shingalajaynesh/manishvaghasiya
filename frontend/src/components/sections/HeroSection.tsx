import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Play, Star } from 'lucide-react'
import { LazyImage } from '../ui/LazyImage'
import { Pill } from '../ui/Pill'

export function HeroSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className="relative bg-white overflow-hidden py-16 lg:py-24 flex items-center min-h-[calc(100vh-68px)]">
      {/* Subtle background arc */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-accent-orange/5 via-accent-purple/5 to-accent-blue/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <Pill color="blue">Transformational Coach · Youth Icon · Surat, Gujarat</Pill>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="font-display font-extrabold text-apple-black leading-[0.9] mb-1 tracking-tight"
              style={{ fontSize: 'var(--size-hero)' }}
            >
              Manish
            </motion.h1>
            
            <motion.h1 
              variants={itemVariants}
              className="font-display italic font-extrabold leading-[0.9] mb-6 tracking-tight bg-gradient-to-r from-accent-orange via-accent-purple to-accent-blue bg-clip-text text-transparent"
              style={{ fontSize: 'var(--size-hero)' }}
            >
              Vaghasiya
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-apple-gray text-base md:text-xl font-light leading-relaxed max-w-xl mb-8"
            >
              Transforming lives through the power of authentic storytelling, real-world wisdom, and the courage to begin again.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-10 w-full"
            >
              <Link
                to="/book-speaker"
                className="flex items-center gap-2 px-8 py-3.5 bg-accent-blue hover:bg-accent-blue/90 text-white rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:shadow-card-lg hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                Book a Session
              </Link>
              <a
                href="#media-video"
                className="flex items-center gap-2 px-8 py-3.5 border border-border hover:border-apple-black text-apple-black rounded-full text-sm font-bold tracking-wide transition-all duration-300 bg-white hover:bg-bg-subtle"
              >
                <Play className="w-4 h-4 text-accent-orange fill-accent-orange" />
                Watch My Story
              </a>
            </motion.div>

            {/* Micro Social Proof */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-2 border-t border-border pt-6 w-full max-w-md"
            >
              <div className="flex gap-0.5 text-accent-gold">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                ))}
              </div>
              <span className="text-apple-gray text-xs md:text-sm font-medium ml-2">
                1.5M+ Followers · 4500+ Programs · 20+ Years Exp.
              </span>
            </motion.div>
          </motion.div>

          {/* Right Visual Column */}
          <motion.div 
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-card-xl border border-border group bg-bg-subtle">
              <LazyImage
                src="/images/hero/manish-hero.webp"
                alt="Manish Vaghasiya Speaking"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                // Fallback grey placeholder during layout tests
                placeholder="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='125' viewBox='0 0 100 125'><rect width='100%' height='100%' fill='%23f2f2f7'/><text x='50%' y='50%' font-family='sans-serif' font-size='8' fill='%23aeaeb2' text-anchor='middle'>Manish Vaghasiya</text></svg>"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

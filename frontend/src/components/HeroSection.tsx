import { motion } from 'framer-motion'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      {/* Eyebrow */}
      <motion.p 
        variants={itemVariants} 
        className="text-gray-text text-xs md:text-sm uppercase tracking-[0.2em] mb-4 font-medium"
      >
        Transformational Speaker · Coach · Trainer
      </motion.p>

      {/* Name — the hero headline */}
      <motion.h1 
        variants={itemVariants}
        className="font-playfair font-black leading-[0.9] text-white tracking-tight"
        style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
      >
        Manish
      </motion.h1>
      <motion.h1 
        variants={itemVariants}
        className="font-playfair font-black leading-[0.9] tracking-tight bg-gradient-to-r from-gold-primary via-gold-light to-gold-primary bg-clip-text text-transparent mb-8"
        style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
      >
        Vaghasiya
      </motion.h1>

      {/* Tagline */}
      <motion.p 
        variants={itemVariants}
        className="text-white-muted text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed mb-4"
      >
        Transforming lives. Building futures.
      </motion.p>
      <motion.p 
        variants={itemVariants}
        className="text-gray-text text-sm md:text-base max-w-xl mx-auto mb-6"
      >
        Something powerful is coming. The new website is under construction.
        Be the first to know when we launch.
      </motion.p>
    </motion.div>
  )
}

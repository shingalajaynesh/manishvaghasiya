import { motion } from 'framer-motion'

const stats = [
  { number: '1.5M+',  label: 'Followers'  },
  { number: '4500+',  label: 'Programs'   },
  { number: '20+',    label: 'Years Exp.' },
  { number: '∞',      label: 'Lives Changed' },
]

export function StatsBar() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.6,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:flex md:flex-row gap-6 md:gap-16 justify-center w-full max-w-2xl px-6 py-6 bg-black-card/40 border border-white/5 rounded-2xl mb-12 backdrop-blur-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map(({ number, label }, index) => (
        <motion.div 
          key={label} 
          variants={itemVariants}
          className="text-center relative flex flex-col items-center justify-center p-2"
        >
          {index > 0 && (
            <div className="hidden md:block absolute left-[-32px] top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          )}
          <div className="text-2xl md:text-3xl font-bold text-gold-primary font-playfair tracking-tight">
            {number}
          </div>
          <div className="text-gray-text text-[10px] md:text-xs uppercase tracking-wider mt-1 font-medium">{label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

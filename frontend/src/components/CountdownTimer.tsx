import { motion, AnimatePresence } from 'framer-motion'
import { useCountdown } from '../hooks/useCountdown'

interface Props { launchDate: string }

export function CountdownTimer({ launchDate }: Props) {
  const { days, hours, minutes, seconds } = useCountdown(new Date(launchDate))

  const units = [
    { value: days,    label: 'Days'    },
    { value: hours,   label: 'Hours'   },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ]

  return (
    <motion.div
      className="flex gap-3 md:gap-6 mb-12 flex-wrap justify-center"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      {units.map(({ value, label }) => (
        <motion.div 
          key={label} 
          className="flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <div 
            className="w-20 h-20 md:w-28 md:h-28 bg-black-card border border-gold-primary/20 rounded-xl flex items-center justify-center mb-2 shadow-gold-glow-subtle backdrop-blur-md transition-all duration-300 hover:border-gold-primary/45"
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="font-playfair text-3xl md:text-4xl font-bold text-gold-primary"
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-gray-text text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">{label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

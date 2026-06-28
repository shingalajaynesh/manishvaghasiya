import { motion } from 'framer-motion'
import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react'

const socials = [
  { name: 'Instagram', url: 'https://instagram.com/manishvaghasiya01', Icon: Instagram },
  { name: 'Facebook',  url: 'https://facebook.com/manish.vaghasiya.984', Icon: Facebook },
  { name: 'YouTube',   url: 'https://youtube.com/@manishvaghasiya', Icon: Youtube },
  { name: 'LinkedIn',  url: 'https://linkedin.com/in/manish-vaghasiya', Icon: Linkedin },
]

export function SocialLinks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.0,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } }
  }

  return (
    <motion.div
      className="flex gap-3 justify-center flex-wrap"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socials.map(({ name, url, Icon }) => (
        <motion.a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow Manish Vaghasiya on ${name}`}
          variants={itemVariants}
          whileHover={{ scale: 1.08, y: -2 }}
          className="flex items-center gap-2 px-4 py-2.5 bg-black-card border border-white/5 rounded-full text-xs text-gray-text hover:border-gold-primary/40 hover:text-gold-primary transition-all duration-300 shadow-md"
        >
          <Icon className="w-4 h-4 text-gold-primary" />
          <span className="font-medium tracking-wide">{name}</span>
        </motion.a>
      ))}
    </motion.div>
  )
}

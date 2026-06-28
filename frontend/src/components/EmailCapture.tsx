import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const API_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:4000' : 'https://api.manishvaghasiya.com')

export function EmailCapture() {
  const [email, setEmail] = useState('')
  const [name, setName]   = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch(`${API_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message ?? "You're on the list! 🎉")
        setEmail('')
        setName('')
      } else {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please make sure the server is running.')
    }
  }

  return (
    <motion.div
      className="w-full max-w-md mx-auto mb-10 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <p className="text-gray-text text-xs uppercase tracking-[0.25em] mb-4 font-semibold">
        Get notified at launch
      </p>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black-card border border-gold-primary/30 rounded-2xl px-6 py-5 text-gold-primary shadow-gold-glow-subtle backdrop-blur-md"
          >
            <div className="text-2xl mb-2">🙏</div>
            <p className="font-medium text-sm leading-relaxed">{message}</p>
          </motion.div>
        ) : (
          <motion.form
            key="subscription-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-black-card/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/50 transition-all duration-200 text-sm backdrop-blur-sm"
              disabled={status === 'loading'}
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-black-card/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/50 transition-all duration-200 text-sm backdrop-blur-sm"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-50 hover:shadow-gold-glow flex items-center justify-center min-w-[120px]"
                style={{ background: 'linear-gradient(90deg, #D4A017, #F5C842)', color: '#0A0A0A' }}
              >
                {status === 'loading' ? (
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Notify Me'}
              </button>
            </div>
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs text-left px-1 mt-1 font-medium"
              >
                ⚠️ {message}
              </motion.p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

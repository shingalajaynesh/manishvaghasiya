import { useEffect } from 'react'
import { HeroSection } from './components/HeroSection'
import { CountdownTimer } from './components/CountdownTimer'
import { StatsBar } from './components/StatsBar'
import { EmailCapture } from './components/EmailCapture'
import { SocialLinks } from './components/SocialLinks'
import { FloatingParticles } from './components/FloatingParticles'
import { Footer } from './components/Footer'

export default function App() {
  // Keep-alive ping to Render backend (every 14 minutes)
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:4000' : 'https://api.manishvaghasiya.com')
    const pingBackend = async () => {
      try {
        const res = await fetch(`${API_URL}/health`)
        if (res.ok) {
          console.log('[Keep-Alive] Backend ping-pong success')
        }
      } catch (err) {
        console.warn('[Keep-Alive] Backend ping-pong failed:', err)
      }
    }
    
    // Initial ping on load
    pingBackend()

    // Interval of 14 minutes
    const interval = setInterval(pingBackend, 14 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden relative font-inter">
      {/* Ambient gold particle background */}
      <FloatingParticles />

      {/* Gold top border accent */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A017] to-transparent z-50" />

      {/* Main content — centered, stacked */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center max-w-4xl mx-auto">
        
        {/* Logo or name mark */}
        <div className="mb-6 text-[#D4A017] text-xs uppercase tracking-[0.3em] font-semibold animate-pulse">
          Official Website
        </div>

        {/* HERO */}
        <HeroSection />

        {/* COUNTDOWN */}
        <CountdownTimer launchDate="2026-09-01T00:00:00" />

        {/* STATS ROW */}
        <StatsBar />

        {/* EMAIL CAPTURE */}
        <EmailCapture />

        {/* SOCIAL LINKS */}
        <SocialLinks />
      </div>

      <Footer />
    </main>
  )
}

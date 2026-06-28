import { HeroSection } from './components/HeroSection'
import { CountdownTimer } from './components/CountdownTimer'
import { StatsBar } from './components/StatsBar'
import { EmailCapture } from './components/EmailCapture'
import { SocialLinks } from './components/SocialLinks'
import { FloatingParticles } from './components/FloatingParticles'
import { Footer } from './components/Footer'

export default function App() {
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

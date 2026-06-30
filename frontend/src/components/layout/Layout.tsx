import React, { useEffect } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useScrollProgress } from '../../hooks/useScrollProgress'

const API_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:4000' : 'https://api.manishvaghasiya.com')

export function Layout({ children }: { children: React.ReactNode }) {
  const scrollProgress = useScrollProgress()

  // Keep-alive ping to Render backend (every 14 minutes)
  useEffect(() => {
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
    <div className="flex flex-col min-h-screen bg-white text-apple-black selection:bg-accent-blue/10 selection:text-accent-blue">
      {/* Dynamic Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-accent-blue z-[60] transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />
      
      {/* Margin top offset for the fixed navbar */}
      <main className="flex-grow pt-[68px]">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}

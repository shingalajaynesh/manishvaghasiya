import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'
import { LazySection } from '../ui/LazySection'
import { Pill } from '../ui/Pill'

const API_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:4000' : 'https://api.manishvaghasiya.com')

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    eventType: 'Youth Program',
    eventDate: '',
    location: '',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          eventType: 'Youth Program',
          eventDate: '',
          location: '',
          message: '',
        })
      } else {
        setStatus('error')
        setErrorMsg(data.error ?? 'Submission failed. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please make sure the backend is running.')
    }
  }

  return (
    <section className="bg-white py-16 border-b border-border relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 text-left bg-off-white border border-border p-6 md:p-8 rounded-[32px]">
            <LazySection animation="fade-up">
              <span className="text-accent-blue text-xs uppercase tracking-[0.2em] font-bold mb-3 block">
                Get In Touch
              </span>
              <h3 className="font-display font-bold text-apple-black text-2xl md:text-3xl tracking-tight mb-8">
                Send an Enquiry
              </h3>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-accent-green/10 border border-accent-green/20 rounded-2xl p-6 text-center text-accent-green flex flex-col items-center gap-4"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                    <div>
                      <h4 className="font-sans font-bold text-lg mb-1 text-apple-black">Enquiry Submitted!</h4>
                      <p className="text-xs text-apple-gray leading-relaxed max-w-sm mx-auto">
                        Thank you for reaching out. Manish's team will review your requirements and get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-apple-gray">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-white border border-border rounded-xl px-4 py-2.5 text-sm text-apple-black placeholder-apple-muted focus:outline-none focus:border-accent-blue transition-colors"
                          placeholder="Your Name"
                        />
                      </div>
                      
                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-apple-gray">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-white border border-border rounded-xl px-4 py-2.5 text-sm text-apple-black placeholder-apple-muted focus:outline-none focus:border-accent-blue transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-apple-gray">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-white border border-border rounded-xl px-4 py-2.5 text-sm text-apple-black placeholder-apple-muted focus:outline-none focus:border-accent-blue transition-colors"
                          placeholder="e.g. +91 99999 99999"
                        />
                      </div>
                      
                      {/* Organization */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-apple-gray">Organization / School</label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          className="bg-white border border-border rounded-xl px-4 py-2.5 text-sm text-apple-black placeholder-apple-muted focus:outline-none focus:border-accent-blue transition-colors"
                          placeholder="e.g. ABC College / Company"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Event Type */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-apple-gray">Event Type *</label>
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleInputChange}
                          className="bg-white border border-border rounded-xl px-4 py-2.5 text-sm text-apple-black focus:outline-none focus:border-accent-blue transition-colors appearance-none cursor-pointer"
                        >
                          <option>Youth Program</option>
                          <option>Corporate Program</option>
                          <option>Parenting Workshop</option>
                          <option>Personal Coaching</option>
                          <option>Other / Consulting</option>
                        </select>
                      </div>
                      
                      {/* Event Date */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-apple-gray">Tentative Date</label>
                        <input
                          type="date"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleInputChange}
                          className="bg-white border border-border rounded-xl px-4 py-2.5 text-sm text-apple-black focus:outline-none focus:border-accent-blue transition-colors cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-apple-gray">City / Location *</label>
                      <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleInputChange}
                        className="bg-white border border-border rounded-xl px-4 py-2.5 text-sm text-apple-black placeholder-apple-muted focus:outline-none focus:border-accent-blue transition-colors"
                        placeholder="e.g. Surat, Gujarat"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-apple-gray">Requirements / Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-white border border-border rounded-xl px-4 py-2.5 text-sm text-apple-black placeholder-apple-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
                        placeholder="Please describe your event goals, audience size, and requirements..."
                      />
                    </div>

                    {/* Error display */}
                    {status === 'error' && (
                      <p className="text-red-500 text-xs font-semibold">
                        ⚠️ {errorMsg}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="mt-2 w-full flex items-center justify-center gap-2 py-3 bg-accent-blue hover:bg-accent-blue/90 text-white rounded-xl text-sm font-bold tracking-wide transition-all duration-300 disabled:opacity-50"
                    >
                      {status === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Enquiry
                        </>
                      )}
                    </button>

                  </motion.form>
                )}
              </AnimatePresence>
            </LazySection>
          </div>

          {/* Right: Contact Information */}
          <div className="lg:col-span-5 text-left flex flex-col gap-8">
            <LazySection animation="fade-up" delay={200}>
              <span className="text-accent-blue text-xs uppercase tracking-[0.2em] font-bold mb-3 block">
                Office Information
              </span>
              <h3 className="font-display font-bold text-apple-black text-2xl md:text-3xl tracking-tight mb-8">
                Connect Directly
              </h3>

              <div className="flex flex-col gap-6 text-apple-gray text-xs md:text-sm">
                
                {/* Phones */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-apple-black text-sm mb-1">Telephone</h4>
                    <p className="font-light">+91-8200302328</p>
                    <p className="font-light">+91-8758509891</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-apple-black text-sm mb-1">Email</h4>
                    <p className="font-light hover:text-accent-blue transition-colors">
                      <a href="mailto:info@manishvaghasiya.com">info@manishvaghasiya.com</a>
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-apple-black text-sm mb-1">Office Location</h4>
                    <p className="font-light">Surat, Gujarat, India</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-apple-black text-sm mb-1">Working Hours</h4>
                    <p className="font-light">Monday – Saturday: 10:00 AM – 07:00 PM IST</p>
                  </div>
                </div>

              </div>
            </LazySection>
          </div>
        </div>

      </div>
    </section>
  )
}

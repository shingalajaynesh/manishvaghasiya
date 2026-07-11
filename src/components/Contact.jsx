import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    org: '',
    eventType: '',
    date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock form submission with a timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Store in localStorage as a backup log
      const bookings = JSON.parse(localStorage.getItem('manish_bookings') || '[]');
      bookings.push({ ...formState, timestamp: new Date().toISOString() });
      localStorage.setItem('manish_bookings', JSON.stringify(bookings));

      // Reset form
      setFormState({
        name: '',
        email: '',
        org: '',
        eventType: '',
        date: '',
        message: ''
      });

      // Clear success notification after 5s
      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-brand-lightBg relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-blush/40 rounded-full blur-[100px] -z-10 pointer-events-none -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[11px] font-sans font-extrabold text-brand-goldDark tracking-[0.25em] uppercase mb-2">
            {t('nav.contact')}
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif font-black text-brand-darkText leading-tight">
            {t('contact.title')}
          </h3>
          <p className="text-sm md:text-base text-gray-500 mt-3 font-sans font-medium">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact details & Whatsapp redirect */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm space-y-6">
              
              <h4 className="text-2xl font-serif font-bold text-brand-darkText mb-6">
                Booking Information
              </h4>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-brand-gold/10 text-brand-gold p-3 rounded-2xl">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-sans text-gray-400 font-extrabold tracking-wider uppercase">
                    {t('contact.info.office')}
                  </p>
                  <p className="text-sm md:text-base font-sans font-semibold text-brand-darkText mt-1">
                    {t('contact.info.address')}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-brand-terracotta/10 text-brand-terracotta p-3 rounded-2xl">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-sans text-gray-400 font-extrabold tracking-wider uppercase">
                    {t('contact.info.email')}
                  </p>
                  <a
                    href="mailto:manvaghasiya1201@gmail.com"
                    className="text-sm md:text-base font-sans font-semibold text-brand-darkText hover:text-brand-gold mt-1 block transition-colors"
                  >
                    manvaghasiya1201@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-500/10 text-green-600 p-3 rounded-2xl">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-sans text-gray-400 font-extrabold tracking-wider uppercase">
                    {t('contact.info.phone')}
                  </p>
                  <a
                    href="tel:+918200302328"
                    className="text-sm md:text-base font-sans font-semibold text-brand-darkText hover:text-brand-gold mt-1 block transition-colors"
                  >
                    +91 82003 02328
                  </a>
                </div>
              </div>

            </div>

            {/* Direct WhatsApp Call Button */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/918200302328?text=Hello%20Manish%20Ji,%20we%20want%20to%20book%20a%20motivational%20seminar."
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white p-6 rounded-3xl shadow-lg flex items-center justify-between group cursor-pointer transition-transform duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-2.5 rounded-full">
                  <MessageCircle size={24} fill="currentColor" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-sans font-bold opacity-90">Quick Booking</p>
                  <p className="text-base md:text-lg font-serif font-black">{t('contact.info.whatsapp')}</p>
                </div>
              </div>
              <Send size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </motion.a>
          </div>

          {/* Right Column: Interactive Enquiry Form */}
          <div className="lg:col-span-7 bg-white border border-gray-100 p-8 md:p-10 rounded-[2.5rem] shadow-sm">
            
            <h4 className="text-2xl font-serif font-bold text-brand-darkText mb-8">
              Enquiry Form
            </h4>

            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl flex items-start space-x-3 mb-6"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-sans font-medium">{t('contact.form.success')}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name & Email Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xs font-sans font-bold text-gray-400 uppercase mb-2">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold font-medium bg-brand-lightBg/50"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="text-xs font-sans font-bold text-gray-400 uppercase mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold font-medium bg-brand-lightBg/50"
                  />
                </div>
              </div>

              {/* Organization & Event Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="org" className="text-xs font-sans font-bold text-gray-400 uppercase mb-2">
                    {t('contact.form.org')}
                  </label>
                  <input
                    type="text"
                    id="org"
                    name="org"
                    value={formState.org}
                    onChange={handleInputChange}
                    className="border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold font-medium bg-brand-lightBg/50"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="eventType" className="text-xs font-sans font-bold text-gray-400 uppercase mb-2">
                    {t('contact.form.eventType')} *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formState.eventType}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold font-medium bg-brand-lightBg/50"
                  >
                    <option value="">{t('contact.form.selectEvent')}</option>
                    <option value="vandan">{t('contact.form.eventVandan')}</option>
                    <option value="student">{t('contact.form.eventStudent')}</option>
                    <option value="parenting">{t('contact.form.eventParenting')}</option>
                    <option value="corporate">{t('contact.form.eventCorporate')}</option>
                  </select>
                </div>
              </div>

              {/* Expected Date */}
              <div className="flex flex-col">
                <label htmlFor="date" className="text-xs font-sans font-bold text-gray-400 uppercase mb-2">
                  {t('contact.form.date')}
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formState.date}
                  onChange={handleInputChange}
                  className="border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold font-medium bg-brand-lightBg/50"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label htmlFor="message" className="text-xs font-sans font-bold text-gray-400 uppercase mb-2">
                  {t('contact.form.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold font-medium bg-brand-lightBg/50"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-gold hover:bg-brand-goldDark disabled:bg-brand-gold/50 text-white py-4 rounded-2xl font-sans font-bold text-base flex items-center justify-center space-x-2 shadow-lg shadow-brand-gold/15 hover:shadow-brand-gold/25 transition-all duration-300 cursor-pointer"
              >
                <Send size={18} />
                <span>{isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

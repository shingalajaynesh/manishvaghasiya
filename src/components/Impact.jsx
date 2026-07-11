import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Coins, ShieldCheck, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Impact() {
  const { t } = useLanguage();

  return (
    <section id="impact" className="py-20 md:py-28 bg-brand-blush/40 relative overflow-hidden">
      {/* Editorial Wave/Curves decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 -translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,90.38,27.35,172.93,49.88,243.37,63.15,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[11px] font-sans font-extrabold text-brand-goldDark tracking-[0.25em] uppercase mb-2">
            {t('nav.impact')}
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif font-black text-brand-darkText leading-tight">
            {t('impact.title')}
          </h3>
          <p className="text-sm md:text-base text-gray-500 mt-3 font-sans font-medium">
            {t('impact.subtitle')}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story + Concept Details */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            
            {/* The 1 Rupee Philosophy Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-brand-gold/10 shadow-sm flex flex-col md:flex-row gap-6"
            >
              <div className="bg-brand-gold/10 text-brand-gold p-4 rounded-2xl h-fit w-fit mx-auto md:mx-0">
                <Coins className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl md:text-2xl font-serif font-bold text-brand-darkText mb-2">
                  {t('impact.philosophyTitle')}
                </h4>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed font-sans font-medium">
                  {t('impact.philosophyDesc')}
                </p>
              </div>
            </motion.div>

            {/* Free service and education in Dang */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-brand-gold/10 shadow-sm flex flex-col md:flex-row gap-6"
            >
              <div className="bg-brand-terracotta/10 text-brand-terracotta p-4 rounded-2xl h-fit w-fit mx-auto md:mx-0">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl md:text-2xl font-serif font-bold text-brand-darkText mb-2">
                  {t('impact.freeServiceTitle')}
                </h4>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed font-sans font-medium">
                  {t('impact.freeServiceDesc')}
                </p>
              </div>
            </motion.div>

            {/* CM Appreciate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-brand-gold/10 shadow-sm flex flex-col md:flex-row gap-6"
            >
              <div className="bg-green-500/10 text-green-600 p-4 rounded-2xl h-fit w-fit mx-auto md:mx-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl md:text-2xl font-serif font-bold text-brand-darkText mb-2">
                  {t('impact.cmTitle')}
                </h4>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed font-sans font-medium">
                  {t('impact.cmDesc')}
                </p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Crowd Image and Overlaid badge */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[420px] mx-auto aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl"
            >
              <img
                src="/images/impact-crowd.png"
                alt="Manish Vaghasiya Seminar Crowd"
                className="w-full h-full object-cover rounded-[2.5rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darkText/70 to-transparent rounded-[2.5rem]" />
              
              {/* Overlay Stat card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-white/40 shadow-lg text-center">
                <p className="text-4xl font-serif font-black text-brand-gold mb-1">
                  11 Years
                </p>
                <p className="text-xs font-sans text-brand-terracotta font-extrabold tracking-widest uppercase mb-2">
                  Unpaid Service
                </p>
                <p className="text-sm font-sans font-medium text-gray-500">
                  Delivered value and support to lakhs of families across India completely free of charge.
                </p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Editorial Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,90.38,27.35,172.93,49.88,243.37,63.15,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}

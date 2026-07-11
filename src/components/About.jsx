import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Quote, BookOpen, GraduationCap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Editorial Decorative Backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-blush/30 rounded-full blur-[100px] -z-10 pointer-events-none -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait & Stats cards */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[420px] mx-auto aspect-[4/5] rounded-[2.5rem]"
            >
              {/* Decorative back border */}
              <div className="absolute inset-0 border border-brand-gold/30 rounded-[2.5rem] rotate-3 translate-x-2 translate-y-2 -z-10" />
              
              <img
                src="/images/about-portrait.png"
                alt="Manish Vaghasiya portrait"
                className="w-full h-full object-cover rounded-[2.5rem] shadow-xl border border-gray-100"
              />

              {/* Float Card 1: Experience */}
              <div className="absolute -left-6 top-1/3 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center space-x-3 hidden sm:flex">
                <div className="bg-brand-gold/15 p-2 rounded-xl text-brand-gold">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Recognition</p>
                  <p className="text-sm font-serif font-bold text-brand-darkText">Youth Icon</p>
                </div>
              </div>

              {/* Float Card 2: Education */}
              <div className="absolute -right-6 bottom-12 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center space-x-3 hidden sm:flex">
                <div className="bg-brand-terracotta/15 p-2 rounded-xl text-brand-terracotta">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Education</p>
                  <p className="text-sm font-serif font-bold text-brand-darkText">M.Sc. Chemistry</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Origin story text content */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="flex flex-col space-y-2"
            >
              <h2 className="text-[11px] font-sans font-extrabold text-brand-goldDark tracking-[0.25em] uppercase">
                {t('nav.about')}
              </h2>
              <h3 className="text-3xl md:text-5xl font-serif font-black text-brand-darkText leading-tight">
                {t('about.heading')}
              </h3>
              <p className="text-sm font-sans font-bold text-brand-terracotta tracking-wider uppercase mt-1">
                {t('about.subheading')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-brand-darkText/75 font-sans text-sm md:text-base space-y-5 leading-relaxed"
            >
              <p>{t('about.para1')}</p>
              <p>{t('about.para2')}</p>
              <p>{t('about.para3')}</p>
            </motion.div>

            {/* Signature Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative bg-brand-blush/30 border border-brand-blush rounded-3xl p-6 md:p-8 mt-4 overflow-hidden"
            >
              <Quote className="absolute top-4 right-4 text-brand-gold/15 w-16 h-16 -z-10" />
              <p className="font-serif italic text-lg md:text-xl text-brand-darkText font-medium leading-relaxed">
                "{t('about.quote')}"
              </p>
              <div className="flex items-center space-x-3 mt-4">
                <div className="h-px w-8 bg-brand-gold" />
                <span className="text-xs font-sans font-bold tracking-wider text-brand-goldDark uppercase">
                  Manish Vaghasiya
                </span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

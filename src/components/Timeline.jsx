import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Mic, Heart, Award, Landmark, BookOpen, Star } from 'lucide-react';

export default function Timeline() {
  const { t, language } = useLanguage();

  const icons = [
    <Mic className="w-5 h-5" />,
    <Landmark className="w-5 h-5" />,
    <Heart className="w-5 h-5" />,
    <BookOpen className="w-5 h-5" />,
    <Star className="w-5 h-5" />
  ];

  // Get translations of events
  // Look up events from timeline.events in translated file
  // Safe fallbacks to keep indexing correct
  const getEvents = () => {
    // Return array of objects with year, title, desc
    const keys = ['0', '1', '2', '3', '4'];
    return keys.map((key, index) => ({
      year: t(`timeline.events.${key}.year`),
      title: t(`timeline.events.${key}.title`),
      desc: t(`timeline.events.${key}.desc`),
      icon: icons[index] || <Star className="w-5 h-5" />
    }));
  };

  const events = getEvents();

  return (
    <section id="timeline" className="py-20 md:py-28 bg-brand-lightBg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] -z-10 pointer-events-none translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <h2 className="text-[11px] font-sans font-extrabold text-brand-goldDark tracking-[0.25em] uppercase mb-2">
            {t('nav.timeline')}
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif font-black text-brand-darkText leading-tight">
            {t('timeline.title')}
          </h3>
          <p className="text-sm md:text-base text-gray-500 mt-3 font-sans font-medium">
            {t('timeline.subtitle')}
          </p>
        </div>

        {/* Timeline Path Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200/80 -translate-x-1/2" />
          
          <div className="space-y-12 md:space-y-16">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`flex flex-col md:flex-row relative items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Outer dot/icon marker */}
                  <div className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 z-10 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      className="w-10 h-10 rounded-full bg-white border-2 border-brand-gold flex items-center justify-center text-brand-gold shadow-md hover:bg-brand-gold hover:text-white transition-colors duration-300"
                    >
                      {event.icon}
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className="hidden md:block w-1/2 px-12" />

                  {/* Timeline Card Column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="w-full md:w-1/2 pl-12 pr-4 md:px-12"
                  >
                    <div className="bg-white border border-gray-100/80 p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 relative group">
                      
                      {/* Year badge */}
                      <span className="inline-block bg-brand-blush/60 text-brand-terracotta text-xs md:text-sm font-sans font-bold px-3 py-1 rounded-full mb-3 tracking-wide">
                        {event.year}
                      </span>
                      
                      <h4 className="text-xl md:text-2xl font-serif font-bold text-brand-darkText mb-3 group-hover:text-brand-gold transition-colors duration-300">
                        {event.title}
                      </h4>
                      
                      <p className="text-sm md:text-base text-gray-500 leading-relaxed font-sans font-medium">
                        {event.desc}
                      </p>

                      {/* Small arrow indicator */}
                      <div className={`hidden md:block absolute top-4 w-3 h-3 bg-white border-b border-r border-gray-100/80 rotate-45 ${
                        isEven ? '-left-[6px] border-r-0 border-b-0 border-t border-l' : '-right-[6px]'
                      }`} />
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

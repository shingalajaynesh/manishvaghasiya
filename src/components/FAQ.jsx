import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') }
  ];

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[11px] font-sans font-extrabold text-brand-goldDark tracking-[0.25em] uppercase mb-2">
            {t('nav.faq')}
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif font-black text-brand-darkText leading-tight">
            {t('faq.title')}
          </h3>
          <p className="text-sm md:text-base text-gray-500 mt-3 font-sans font-medium">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Accordion FAQ Grid */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-brand-gold bg-brand-lightBg shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 ${isOpen ? 'text-brand-gold' : 'text-gray-400'}`} />
                    <span className="font-serif font-bold text-base md:text-lg text-brand-darkText">
                      {faq.q}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-full bg-gray-100/80 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-gold' : 'text-gray-500'}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm md:text-base text-gray-500 font-sans leading-relaxed border-t border-gray-100/40 ml-9 font-medium">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

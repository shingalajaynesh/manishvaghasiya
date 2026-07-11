import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Quote, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  const testimonials = [
    {
      id: 'grandma',
      title: t('testimonials.grandmother.title'),
      quote: t('testimonials.grandmother.quote'),
      author: t('testimonials.grandmother.author'),
      tag: 'Grandmother Blessing'
    },
    {
      id: 'cm',
      title: t('testimonials.cmQuote.title'),
      quote: t('testimonials.cmQuote.quote'),
      author: t('testimonials.cmQuote.author'),
      tag: 'State Recognition'
    },
    {
      id: 'parent',
      title: t('testimonials.parentQuote.title'),
      quote: t('testimonials.parentQuote.quote'),
      author: t('testimonials.parentQuote.author'),
      tag: 'Parent Feedback'
    }
  ];

  const handlePrev = () => {
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-brand-lightBg relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-brand-blush/40 rounded-full blur-[100px] -z-10 pointer-events-none translate-x-1/2" />
      <div className="absolute bottom-1/4 left-0 w-[30vw] h-[30vw] bg-brand-gold/5 rounded-full blur-[80px] -z-10 pointer-events-none -translate-x-1/2" />

      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[11px] font-sans font-extrabold text-brand-goldDark tracking-[0.25em] uppercase mb-2">
            Testimonials
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif font-black text-brand-darkText leading-tight">
            {t('testimonials.title')}
          </h3>
          <p className="text-sm md:text-base text-gray-500 mt-3 font-sans font-medium">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm min-h-[350px] flex flex-col justify-between overflow-hidden">
          <Quote className="absolute top-8 right-8 text-brand-blush w-20 h-20 -z-10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col space-y-6"
            >
              {/* Tag / Category */}
              <div className="inline-flex items-center space-x-2 bg-brand-terracotta/10 px-3 py-1 rounded-full w-fit">
                <MessageCircle size={12} className="text-brand-terracotta" />
                <span className="text-[10px] font-sans font-extrabold tracking-wider text-brand-terracotta uppercase">
                  {testimonials[active].tag}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-xl md:text-2xl font-serif font-extrabold text-brand-darkText">
                {testimonials[active].title}
              </h4>

              {/* Quote Content */}
              <p className="text-base md:text-xl font-serif font-medium text-brand-darkText/80 leading-relaxed italic">
                "{testimonials[active].quote}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-4">
                <div className="h-0.5 w-6 bg-brand-gold" />
                <span className="text-xs md:text-sm font-sans font-bold text-brand-goldDark tracking-wider uppercase">
                  {testimonials[active].author}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
            {/* Index indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === idx ? 'w-6 bg-brand-gold' : 'w-1.5 bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full border border-gray-200 text-brand-darkText hover:bg-brand-lightBg hover:border-brand-gold transition-colors duration-300"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full border border-gray-200 text-brand-darkText hover:bg-brand-lightBg hover:border-brand-gold transition-colors duration-300"
                aria-label="Next Testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

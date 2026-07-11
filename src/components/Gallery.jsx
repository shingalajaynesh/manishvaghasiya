import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function Gallery() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(null);

  const images = [
    {
      src: '/images/hero-portrait.jpg',
      title: 'Inspiring the Youth',
      caption: 'Manish Vaghasiya addressing students at Navyug College, Surat.'
    },
    {
      src: '/images/about-portrait.png',
      title: 'Professional Portrait',
      caption: 'Editorial headshot for magazine cover features.'
    },
    {
      src: '/images/program-vandan.png',
      title: 'Mata-Pita Vandan Ceremony',
      caption: 'A heartfelt moment of parental worship and family emotional union.'
    },
    {
      src: '/images/program-parenting.png',
      title: 'Empowering Parents',
      caption: 'Interactive parenting coaching workshop in progress.'
    },
    {
      src: '/images/program-student.png',
      title: 'Academic Motivation',
      caption: 'Guidance and stress-busting seminar for board examinees.'
    },
    {
      src: '/images/impact-crowd.png',
      title: 'Mass Seminar Audience',
      caption: 'A packed stadium listening to the transformation message.'
    }
  ];

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[11px] font-sans font-extrabold text-brand-goldDark tracking-[0.25em] uppercase mb-2">
            {t('nav.gallery')}
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif font-black text-brand-darkText leading-tight">
            {t('gallery.title')}
          </h3>
          <p className="text-sm md:text-base text-gray-500 mt-3 font-sans font-medium">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Bento Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => {
            // Create asymmetrical aspect ratios for bento look
            const gridClasses =
              idx === 0 ? 'lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto' :
                idx === 3 ? 'lg:col-span-2 aspect-[16/9] lg:aspect-auto' : 'aspect-square';

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-500 ${gridClasses}`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-brand-darkText/60 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-8 transition-opacity duration-500">
                  <motion.div
                    initial={{ y: 10 }}
                    whileInHover={{ y: 0 }}
                    className="flex justify-between items-end text-white"
                  >
                    <div>
                      <span className="text-xs font-sans font-bold text-brand-gold tracking-widest uppercase">
                        View Image
                      </span>
                      <h4 className="text-lg md:text-xl font-serif font-bold mt-1">
                        {img.title}
                      </h4>
                    </div>
                    <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm text-white">
                      <Maximize2 size={16} />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIdx(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-center items-center p-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>

            {/* Carousel Content */}
            <div className="relative w-full max-w-5xl max-h-[75vh] flex justify-center items-center">

              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 z-10"
                aria-label="Previous Image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Active Image */}
              <motion.img
                key={activeIdx}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={images[activeIdx].src}
                alt={images[activeIdx].title}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 z-10"
                aria-label="Next Image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Caption */}
            <motion.div
              key={`caption-${activeIdx}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center max-w-xl mt-6 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-xl font-serif font-bold text-white">
                {images[activeIdx].title}
              </h4>
              <p className="text-sm font-sans text-gray-400 mt-2 font-medium">
                {images[activeIdx].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

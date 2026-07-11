import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Play, Calendar, ArrowUpRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

function AnimatedCounter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    // Extract numerical value and suffix (e.g., 4500 from "4500+")
    const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
    const suffix = value.replace(/[0-9]/g, '');

    if (isNaN(numericPart)) {
      setCount(value);
      return;
    }

    let start = 0;
    const end = numericPart;
    const totalFrames = 60 * duration;
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out expo formula
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * end);

      // Format number to local language formatting (e.g., indian commas if possible)
      // For simplicity, direct output with suffix
      setCount(current.toLocaleString() + suffix);

      if (frame >= totalFrames) {
        clearInterval(counter);
        setCount(value);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [value, isInView, duration]);

  return <span ref={ref}>{count || '0'}</span>;
}

export default function Hero() {
  const { t, language } = useLanguage();

  // Localized values for animation
  const statsData = [
    { key: 'programs', value: language === 'gu' ? '૪૫૦૦+' : language === 'hi' ? '४५००+' : '4500+', label: t('hero.stats.programs') },
    { key: 'experience', value: language === 'gu' ? '૧૫+' : language === 'hi' ? '१५+' : '15+', label: t('hero.stats.experience') },
    { key: 'followers', value: language === 'gu' ? '૧.૫M+' : language === 'hi' ? '१.५M+' : '1.5M+', label: t('hero.stats.followers') },
    { key: 'lives', value: t('hero.stats.lives'), isText: true }
  ];

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-24 md:pt-32 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] bg-brand-blush/60 rounded-full blur-[100px] -z-10 pointer-events-none translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-brand-gold/10 rounded-full blur-[80px] -z-10 pointer-events-none -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto w-full">
        {/* Left Text Block */}
        <div className="lg:col-span-7 flex flex-col space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/20 px-4 py-1.5 rounded-full w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-brand-gold active-dot" />
            <span className="text-xs md:text-sm font-sans font-bold text-brand-goldDark tracking-wide uppercase">
              {t('hero.tagline')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-extrabold text-brand-darkText leading-[1.1] tracking-tight"
          >
            {t('hero.headline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-brand-darkText/70 leading-relaxed font-sans max-w-xl"
          >
            {t('hero.subheadline')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
          >
            {/* Primary CTA */}
            <button
              onClick={() => handleScrollTo('contact')}
              className="bg-brand-gold hover:bg-brand-goldDark text-white px-8 py-4 rounded-full font-sans font-bold text-sm md:text-base tracking-wide flex items-center justify-center space-x-2 shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Calendar size={18} />
              <span>{t('hero.ctaPrimary')}</span>
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => handleScrollTo('gallery')}
              className="border border-brand-terracotta/30 text-brand-terracotta hover:bg-brand-terracotta/5 px-8 py-4 rounded-full font-sans font-bold text-sm md:text-base tracking-wide flex items-center justify-center space-x-2 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Play size={16} fill="currentColor" />
              <span>{t('hero.ctaSecondary')}</span>
            </button>
          </motion.div>
        </div>

        {/* Right Portrait Image Column */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2.5rem] overflow-hidden"
          >
            {/* Artistic organic background shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blush to-brand-gold/20 rounded-[2.5rem] -rotate-3 scale-[0.98] -z-10" />
            <div className="absolute inset-0 bg-brand-lightBg border border-brand-terracotta/10 rounded-[2.5rem] -z-10" />

            {/* Image */}
            <img
              src="/images/hero-portrait.jpg"
              alt="Manish Vaghasiya Motivational Speaker"
              className="w-full h-full object-cover object-center rounded-[2.5rem] transition-transform duration-700 hover:scale-105"
            />

            {/* Badge overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-lg flex items-center justify-between">
              <div>
                <p className="text-xs font-sans text-brand-terracotta font-extrabold tracking-wider uppercase">
                  Founder
                </p>
                <p className="text-sm font-serif font-bold text-brand-darkText">
                  Manas Life Coach
                </p>
              </div>
              <a
                href="https://instagram.com/manishvaghasiya01"
                target="_blank"
                rel="noreferrer"
                className="bg-brand-gold/10 text-brand-gold p-2.5 rounded-full hover:bg-brand-gold hover:text-white transition-all duration-300"
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Stats Bar */}
      <div className="max-w-7xl mx-auto px-6 w-full mt-16 md:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-md grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y-0 md:divide-x divide-gray-100/80"
        >
          {statsData.map((stat, idx) => (
            <div key={stat.key || idx} className="flex flex-col items-center justify-center text-center px-4">
              <span className="font-serif text-3xl md:text-4xl lg:text-5xl font-black text-brand-gold">
                {stat.isText ? (
                  stat.value
                ) : (
                  <AnimatedCounter value={stat.value} />
                )}
              </span>
              <span className="text-xs md:text-sm font-sans font-semibold text-gray-500 tracking-wide mt-2">
                {stat.isText ? t('hero.stats.lives') : stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

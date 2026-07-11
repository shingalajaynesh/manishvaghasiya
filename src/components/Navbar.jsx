import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'timeline', label: t('nav.timeline') },
    { id: 'programs', label: t('nav.programs') },
    { id: 'impact', label: t('nav.impact') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'faq', label: t('nav.faq') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const handleLinkClick = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <div className="cursor-pointer" onClick={() => handleLinkClick('home')}>
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-brand-darkText hover:text-brand-gold transition-colors duration-300">
              MANISH <span className="text-brand-gold">VAGHASIYA</span>
            </span>
            <span className="block text-[10px] tracking-[0.2em] uppercase font-sans text-gray-500 font-semibold mt-0.5">
              {t('hero.tagline')}
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-sm font-sans font-medium text-brand-darkText/80 hover:text-brand-gold transition-colors duration-300 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher Pill */}
            <div className="bg-gray-100/80 p-0.5 rounded-full flex items-center shadow-inner border border-gray-200/50">
              {[
                { code: 'gu', label: 'ગુજરાતી' },
                { code: 'hi', label: 'हिन्दी' },
                { code: 'en', label: 'EN' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all duration-300 ${
                    language === lang.code
                      ? 'bg-brand-gold text-white shadow-sm'
                      : 'text-brand-darkText/60 hover:text-brand-darkText'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-brand-darkText hover:text-brand-gold transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col justify-between pb-8 lg:hidden shadow-xl"
          >
            <div className="flex flex-col space-y-5">
              {navLinks.map((link, index) => (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left font-serif text-2xl font-semibold py-2 text-brand-darkText hover:text-brand-gold transition-colors border-b border-gray-100"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-6">
              <p className="text-xs text-gray-400 font-sans tracking-wider uppercase mb-3">
                {t('contact.info.office')}
              </p>
              <p className="text-sm font-sans font-medium text-brand-darkText">
                {t('contact.info.address')}
              </p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://instagram.com/manishvaghasiya01"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-sans text-brand-gold font-bold hover:underline"
                >
                  Instagram
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-sans text-brand-gold font-bold hover:underline"
                >
                  Facebook
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-sans text-brand-gold font-bold hover:underline"
                >
                  YouTube
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

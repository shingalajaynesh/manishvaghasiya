import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp } from 'lucide-react';

// Custom inline SVG brand icons since they are deprecated in modern lucide-react
const InstagramIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
    <polygon points="10 15 15 12 10 9"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

export default function Footer() {
  const { t } = useLanguage();

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
    <footer className="bg-brand-darkText text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Logo & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl font-black tracking-tight text-white block">
              MANISH <span className="text-brand-gold">VAGHASIYA</span>
            </span>
            <p className="text-xs tracking-[0.15em] uppercase font-sans text-gray-400 font-semibold">
              {t('hero.tagline')}
            </p>
            <p className="text-sm font-sans text-gray-400 max-w-sm font-medium leading-relaxed font-semibold">
              Empowering individuals and rebuilding family relationships through life coaching, counseling, and motivational speaking since 2005.
            </p>
          </div>

          {/* Column 2: Sitemap Links */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="text-xs uppercase tracking-widest font-sans font-bold text-brand-gold">
              Quick Navigation
            </h5>
            <div className="grid grid-cols-2 gap-2 text-sm font-sans text-gray-400 font-semibold">
              {[
                { id: 'home', label: t('nav.home') },
                { id: 'about', label: t('nav.about') },
                { id: 'timeline', label: t('nav.timeline') },
                { id: 'programs', label: t('nav.programs') },
                { id: 'impact', label: t('nav.impact') },
                { id: 'gallery', label: t('nav.gallery') },
                { id: 'faq', label: t('nav.faq') },
                { id: 'contact', label: t('nav.contact') }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className="text-left hover:text-white transition-colors duration-300 w-fit cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Social Links */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="text-xs uppercase tracking-widest font-sans font-bold text-brand-gold">
              Connect With Us
            </h5>
            <div className="flex space-x-3">
              {/* Instagram */}
              <a
                href="https://instagram.com/manishvaghasiya01"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-brand-gold hover:text-white text-gray-300 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-brand-gold hover:text-white text-gray-300 transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-brand-gold hover:text-white text-gray-300 transition-all duration-300"
                aria-label="YouTube"
              >
                <YoutubeIcon />
              </a>

              {/* Twitter/X */}
              <a
                href="https://twitter.com/manishvaghasiya01"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-brand-gold hover:text-white text-gray-300 transition-all duration-300"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
            </div>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-4 flex items-center space-x-2 text-xs font-sans font-bold text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>

        </div>

        {/* Footer Credit & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs font-sans text-gray-400 font-bold tracking-wide">
          <p>
            &copy; {new Date().getFullYear()} Manish Vaghasiya. {t('footer.copyright')}
          </p>
          <a
            href="https://zenvyra.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-gold transition-colors mt-4 sm:mt-0"
          >
            {t('footer.credit')}
          </a>
        </div>

      </div>
    </footer>
  );
}

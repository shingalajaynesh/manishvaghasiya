import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Programs from './components/Programs';
import Impact from './components/Impact';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function AppContent() {
  return (
    <div className="relative min-h-screen font-sans antialiased text-brand-darkText">
      {/* Subtle editorial paper grain texture */}
      <div className="fixed inset-0 pointer-events-none grain-overlay z-50" />
      
      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <Hero />
        <About />
        <Timeline />
        <Programs />
        <Impact />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

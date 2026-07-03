import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronUp, FaEnvelope, FaTwitter, FaFacebook, FaGithub } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

// Load our i18n initialization
import './i18n.js';

// Import Components
import Navbar from './components/Navbar.jsx';
import Timeline from './components/Timeline.jsx';
import EventDrawer from './components/EventDrawer.jsx';
import StatsSection from './components/StatsSection.jsx';
import { siteSettings } from './data/settings.js';

export default function App() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ar';

  // State for side drawer
  const [selectedEvent, setSelectedEvent] = useState(null);

  // State for scroll-to-top button
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for Scroll-to-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-syrian-dark-950 text-slate-100 flex flex-col antialiased selection:bg-syrian-green-500/30">

      {/* Navigation Header */}
      <Navbar />

      {/* Hero Banner Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
          {/* Subtle Background Glows */}
          <div className="absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-syrian-green-500/10 rounded-full blur-[80px] pointer-events-none select-none"></div>
          <div className="absolute top-1/3 start-1/3 w-[250px] h-[250px] bg-syrian-red-500/5 rounded-full blur-[100px] pointer-events-none select-none"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">

            {/* Green Accent Ribbon */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-syrian-green-500/10 border border-syrian-green-500/20 text-xs sm:text-sm font-bold text-syrian-green-400 select-none shadow-sm shadow-syrian-green-500/5 animate-pulse-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-syrian-green-500"></span>
              <span>15 {t('durationYears')} - {currentLang === 'ar' ? 'ثورة الكرامة والحرية' : 'Revolution of Dignity'}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight select-none">
              {t('mainTitle')}
            </h1>

            {/* Main Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto">
              {t('mainSubtitle')}
            </p>

          </div>
        </section>

        {/* Timeline Event Listing with dynamic search filtering */}
        <Timeline onSelectEvent={setSelectedEvent} />

        {/* Footer Statistics Grid */}
        <StatsSection />
      </main>

      {/* Footer Block */}
      <footer className="w-full bg-syrian-dark-950 border-t border-syrian-dark-700/40 py-10 text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Left/Right Branding depending on RTL */}
            <div className="text-center md:text-start space-y-1">
              <h4 className="text-sm font-bold text-slate-300 flex items-center justify-center md:justify-start gap-2">
                <span>🇸🇾</span>
                <span>{t('siteName')}</span>
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                {currentLang === 'ar'
                  ? 'توثيق تاريخي تفاعلي لحرية وديمقراطية سوريا.'
                  : 'Interactive historical documentation for a free and democratic Syria.'}
              </p>
            </div>

            {/* Email Contact link */}
            <div className="flex items-center gap-2 text-xs font-semibold hover:text-syrian-green-400 transition-colors">
              <FaEnvelope className="text-syrian-green-500" />
              <a href={`mailto:${siteSettings.contactEmail}`}>{siteSettings.contactEmail}</a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <a href={siteSettings.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-syrian-green-400 transition-colors">
                <FaTwitter />
              </a>
              <a href={siteSettings.socialLinks.facebook} target="_blank" rel="noreferrer" className="hover:text-syrian-green-400 transition-colors">
                <FaFacebook />
              </a>
              <a href={siteSettings.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-syrian-green-400 transition-colors">
                <FaGithub />
              </a>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-syrian-dark-800/40 text-center text-xs font-medium">
            <p>
              &copy; {new Date().getFullYear()} {t('siteName')}. {currentLang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Side Drawer Panel */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDrawer
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>

      {/* Floating Scroll to Top Action Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 p-3 sm:p-4 rounded-full bg-syrian-green-600 hover:bg-syrian-green-500 text-white shadow-lg shadow-syrian-green-500/20 hover:scale-105 transition-all active:scale-95 border border-syrian-green-400/20"
            title={t('scrollTop')}
            aria-label={t('scrollTop')}
          >
            <FaChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

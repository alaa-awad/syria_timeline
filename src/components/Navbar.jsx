import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaTwitter, FaFacebook, FaGithub } from 'react-icons/fa';
import { siteSettings } from '../data/settings.js';

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(nextLang);
  };

  const currentLang = i18n.language || 'ar';

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-syrian-dark-700/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo Branding */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-syrian-green-500 to-syrian-green-700 shadow-md shadow-syrian-green-500/20 text-xl">
              🇸🇾
            </div> */}
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white select-none">
                {t('siteName')}
              </span>
              <span className="text-xs font-semibold text-syrian-green-400 select-none -mt-1 tracking-wider uppercase">
                {t('siteTagline')}
              </span>
            </div>
          </div>

          {/* Socials & Language Selector */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Social Icons - Desktop only */}
            {/* <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse text-slate-400">
              <a
                href={siteSettings.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-syrian-green-400 transition-colors p-2"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href={siteSettings.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-syrian-green-400 transition-colors p-2"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href={siteSettings.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-syrian-green-400 transition-colors p-2"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
            </div> */}

            {/* Separator - Desktop only */}
            {/* <div className="hidden md:block w-px h-6 bg-syrian-dark-700"></div> */}

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-syrian-dark-700 bg-syrian-dark-900/60 hover:bg-syrian-green-500/10 hover:border-syrian-green-500/30 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm text-slate-200"
            >
              <FaGlobe className="text-syrian-green-400 animate-pulse-subtle" />
              <span>{currentLang === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

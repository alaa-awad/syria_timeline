import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './data/translations.js';

i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: 'ar', // Arabic is the default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Automatically adjust page direction and language tag when language changes
const updatePageAttributes = (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
  
  // Set class on body to switch global fonts dynamically
  if (lng === 'ar') {
    document.body.classList.remove('font-outfit');
    document.body.classList.add('font-cairo');
  } else {
    document.body.classList.remove('font-cairo');
    document.body.classList.add('font-outfit');
  }
};

i18n.on('languageChanged', (lng) => {
  updatePageAttributes(lng);
});

// Initialize attributes on startup
updatePageAttributes(i18n.language || 'ar');

export default i18n;

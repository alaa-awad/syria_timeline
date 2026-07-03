import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaLink, FaExternalLinkAlt, FaImage, FaYoutube, FaChartBar, FaTags } from 'react-icons/fa';
import { siteSettings } from '../data/settings.js';

export default function EventDrawer({ event, onClose }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ar';
  const isRtl = currentLang === 'ar';

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [event]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  // Retrieve localized content defensively
  const title = (event.title && (event.title[currentLang] || event.title.ar)) || '';
  const description = (event.description && (event.description[currentLang] || event.description.ar)) || '';
  const location = (event.location && (event.location[currentLang] || event.location.ar)) || '';
  
  let governorateName = '';
  if (event.governorate) {
    const govKey = typeof event.governorate === 'object' ? event.governorate.en : event.governorate;
    const governorateConfig = siteSettings.governorates.find(g => g.key === govKey);
    governorateName = governorateConfig 
      ? (currentLang === 'ar' ? governorateConfig.ar : governorateConfig.en) 
      : (typeof event.governorate === 'object' ? (event.governorate[currentLang] || event.governorate.ar) : event.governorate);
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(currentLang === 'ar' ? 'ar-SY' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Drawer slide directions
  // RTL slides from Right (100% to 0)
  // LTR slides from Left (-100% to 0)
  const drawerVariants = {
    hidden: { x: isRtl ? '100%' : '-100%' },
    visible: { 
      x: 0,
      transition: { type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
    },
    exit: { 
      x: isRtl ? '100%' : '-100%',
      transition: { type: 'tween', duration: 0.3, ease: 'easeIn' } 
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end rtl:flex-row ltr:flex-row-reverse">
      
      {/* Overlay Backdrop */}
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 bg-syrian-dark-950/80 backdrop-blur-sm cursor-pointer"
      />

      {/* Sliding Panel */}
      <motion.div
        variants={drawerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-2xl h-full bg-syrian-dark-900 border-l rtl:border-l-0 rtl:border-r border-syrian-dark-700/60 shadow-2xl flex flex-col z-10"
      >
        {/* Sticky Header Control */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-syrian-dark-700/60 bg-syrian-dark-900/90 backdrop-blur-md">
          <span className="text-sm font-bold uppercase tracking-wider text-syrian-green-400">
            {t('eventDetails')}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-syrian-dark-700 text-slate-400 hover:text-white transition-colors"
            title={t('closeDrawer')}
            aria-label={t('closeDrawer')}
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* Title and Date Header */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {title}
            </h2>
            
            {/* Meta tags details */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-syrian-dark-950 border border-syrian-dark-800">
                <FaCalendarAlt className="text-syrian-green-500" />
                <span className="font-semibold text-slate-200">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-syrian-dark-950 border border-syrian-dark-800">
                <FaMapMarkerAlt className="text-syrian-red-500" />
                <span className="font-semibold text-slate-200">{location} - {governorateName}</span>
              </div>
            </div>
          </div>

          {/* Main Showcase Image */}
          {event.image && (
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-syrian-dark-950 border border-syrian-dark-700/40 shadow-lg">
              <img
                src={event.image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Full Description text */}
          <div className="space-y-2">
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed text-start whitespace-pre-wrap">
              {description}
            </p>
          </div>

          {/* Event Statistics / Metrics */}
          {event.statistics && (Object.values(event.statistics).some(v => v > 0)) && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 uppercase tracking-wider">
                <FaChartBar className="text-syrian-green-500" />
                <span>{t('statsLabel')}</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {event.statistics.casualties > 0 && (
                  <div className="p-4 bg-syrian-red-500/10 border border-syrian-red-500/20 rounded-xl text-center">
                    <span className="block text-2xl font-black text-syrian-red-500">{event.statistics.casualties}</span>
                    <span className="text-xs font-semibold text-slate-300">
                      {currentLang === 'ar' ? 'الشهداء والضحايا' : 'Martyrs & Casualties'}
                    </span>
                  </div>
                )}
                {event.statistics.detained > 0 && (
                  <div className="p-4 bg-syrian-green-500/10 border border-syrian-green-500/20 rounded-xl text-center">
                    <span className="block text-2xl font-black text-syrian-green-400">{event.statistics.detained}</span>
                    <span className="text-xs font-semibold text-slate-300">
                      {currentLang === 'ar' ? 'المعتقلون / الموقوفون' : 'Detainees / Arrests'}
                    </span>
                  </div>
                )}
                {event.statistics.injured > 0 && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center">
                    <span className="block text-2xl font-black text-yellow-500">{event.statistics.injured}</span>
                    <span className="text-xs font-semibold text-slate-300">
                      {currentLang === 'ar' ? 'الجرحى والمصابون' : 'Injured / Wounded'}
                    </span>
                  </div>
                )}
                {event.statistics.displaced > 0 && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                    <span className="block text-2xl font-black text-blue-400">{event.statistics.displaced.toLocaleString()}</span>
                    <span className="text-xs font-semibold text-slate-300">
                      {currentLang === 'ar' ? 'المهجرون قسرياً' : 'Forced Displacements'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Photo Gallery Grid */}
          {event.gallery && event.gallery.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 uppercase tracking-wider">
                <FaImage className="text-syrian-green-500" />
                <span>{t('galleryLabel')}</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {event.gallery.map((imgUrl, i) => (
                  <a
                    key={i}
                    href={imgUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="relative block rounded-lg overflow-hidden aspect-video bg-syrian-dark-950 border border-syrian-dark-700/40 hover:border-syrian-green-500/40 shadow-sm transition-all group"
                  >
                    <img
                      src={imgUrl}
                      alt={`${title} gallery ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-white text-xs font-bold px-2 py-1 bg-black/60 rounded">Zoom 🔍</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Videos Embeds Section */}
          {event.videos && event.videos.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 uppercase tracking-wider">
                <FaYoutube className="text-syrian-red-500" />
                <span>{t('videosLabel')}</span>
              </h3>
              {event.videos.map((vidUrl, i) => (
                <div key={i} className="w-full aspect-video rounded-xl overflow-hidden bg-syrian-dark-950 border border-syrian-dark-700/50 shadow-md">
                  <iframe
                    width="100%"
                    height="100%"
                    src={vidUrl}
                    title={`${title} video ${i + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              ))}
            </div>
          )}

          {/* Tag Badges */}
          {event.tags && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 uppercase tracking-wider">
                <FaTags className="text-syrian-green-500" />
                <span>{t('tagsLabel')}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {(event.tags[currentLang] || event.tags.ar || []).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-syrian-dark-950 text-xs font-medium text-slate-300 border border-syrian-dark-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Verified Sources & Citations */}
          {event.sources && event.sources.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-syrian-dark-700/30">
              <h3 className="text-sm font-bold text-slate-400 flex items-center gap-2 uppercase tracking-wider">
                <FaLink className="text-syrian-green-500" />
                <span>{t('sourcesLabel')}</span>
              </h3>
              <ul className="space-y-2 text-start">
                {event.sources.map((src, i) => {
                  const sourceName = src.name[currentLang] || src.name.ar;
                  return (
                    <li key={i}>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-syrian-green-400 hover:text-syrian-green-300 font-semibold hover:underline"
                      >
                        <FaExternalLinkAlt className="w-3 h-3 text-syrian-green-500" />
                        <span>{sourceName}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}

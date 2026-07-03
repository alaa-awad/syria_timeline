import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { siteSettings } from '../data/settings.js';

export default function TimelineCard({ event, index, onSelect }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ar';

  // Odd cards go to one side, even to the other
  const isLeft = index % 2 === 1;

  // Retrieve localized strings defensively
  const title = (event.title && (event.title[currentLang] || event.title.ar)) || '';
  const shortDescription = (event.shortDescription && (event.shortDescription[currentLang] || event.shortDescription.ar)) || '';

  const location = (event.location && (event.location[currentLang] || event.location.ar)) || '';
  const governorateConfig = event.governorate
    ? siteSettings.governorates.find(g => g.key === event.governorate.en || g.key === event.governorate)
    : null;
  const governorateName = governorateConfig
    ? (currentLang === 'ar' ? governorateConfig.ar : governorateConfig.en)
    : (event.governorate ? (event.governorate[currentLang] || event.governorate.ar || event.governorate) : '');

  // Dynamic formatting of date for UI display defensively
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

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        duration: 0.6
      }
    }
  };

  return (
    <div className={`relative flex flex-col md:flex-row w-full my-8 ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>

      {/* Connector Line Dot (Hidden on mobile) */}
      <div className="absolute top-8 start-4 md:start-1/2 w-6 h-6 rounded-full bg-syrian-dark-950 border-4 border-syrian-green-500 timeline-dot-glow z-10 -translate-x-1/2 rtl:translate-x-1/2 hidden md:block"></div>

      {/* Timeline Card Wrapper */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        onClick={() => onSelect(event)}
        className="w-full md:w-[46%] ms-8 md:ms-0 md:me-0 cursor-pointer text-start"
      >
        <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-syrian-dark-700/50 shadow-xl group">

          {/* Card Image Container */}
          {/*
{event.image && (
  <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-syrian-dark-950">
    <img
      src={event.image}
      alt={title}
      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-syrian-dark-900 via-transparent to-transparent opacity-80"></div>

    <span className="absolute top-4 start-4 px-3 py-1 bg-syrian-green-500/90 text-white font-bold text-xs sm:text-sm rounded-md shadow-md backdrop-blur-sm select-none">
      {event.year}
    </span>
  </div>
)}
*/}

          {/* Card Content */}
          <div className="p-5 sm:p-6">
            {/* Meta row: Date & Location */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3 font-medium">
              <div className="flex items-center gap-1.5">
                <FaCalendarAlt className="text-syrian-green-500" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-syrian-red-500" />
                <span>{location} - {governorateName}</span>
              </div>
            </div>

            {/* Event Title */}
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-syrian-green-400 transition-colors leading-snug">
              {title}
            </h3>

            {/* Event Short Description */}
            <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-3">
              {shortDescription}
            </p>

            {/* Action read more */}
            <div className="flex items-center gap-1 text-xs font-bold text-syrian-green-400 group-hover:underline uppercase tracking-wider">
              <span>{t('detailsBtn')}</span>
              {currentLang === 'ar' ? (
                <FaChevronLeft className="w-2.5 h-2.5 transform group-hover:-translate-x-1 transition-transform" />
              ) : (
                <FaChevronRight className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform" />
              )}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

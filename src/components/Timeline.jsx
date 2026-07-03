import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { timelineData } from '../data/timeline.js';
import SearchBar from './SearchBar.jsx';
import TimelineCard from './TimelineCard.jsx';
import { FaInbox } from 'react-icons/fa';

export default function Timeline({ onSelectEvent }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ar';

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGov, setSelectedGov] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // 1. Dynamically extract filter lists from timelineData to keep it zero-maintenance
  const availableYears = useMemo(() => {
    const years = timelineData.map(e => e.year);
    return [...new Set(years)].sort((a, b) => b - a); // Newest first
  }, []);

  const availableGovs = useMemo(() => {
    // Collect the governorate en keys (or en name) defensively
    const govs = timelineData.map(e => {
      if (e.governorate) {
        if (typeof e.governorate === 'object') {
          return e.governorate.en || e.governorate.ar;
        }
        return e.governorate;
      }
      return '';
    }).filter(Boolean);
    return [...new Set(govs)].sort();
  }, []);

  const availableTags = useMemo(() => {
    let tags = [];
    timelineData.forEach(e => {
      if (e.tags) {
        const eventTags = e.tags[currentLang] || e.tags.ar || [];
        tags = [...tags, ...eventTags];
      }
    });
    return [...new Set(tags)].sort();
  }, [currentLang]);

  // 2. Perform local live filtering defensively
  const filteredEvents = useMemo(() => {
    return timelineData.filter(event => {
      const q = searchQuery.toLowerCase().trim();
      const title = ((event.title && event.title[currentLang]) || (event.title && event.title.ar) || '').toLowerCase();
      const shortDesc = ((event.shortDescription && event.shortDescription[currentLang]) || (event.shortDescription && event.shortDescription.ar) || '').toLowerCase();
      const desc = ((event.description && event.description[currentLang]) || (event.description && event.description.ar) || '').toLowerCase();
      const location = ((event.location && event.location[currentLang]) || (event.location && event.location.ar) || '').toLowerCase();
      const date = (event.date || '').toLowerCase();
      const year = (event.year || '').toString();
      
      let governorate = '';
      if (event.governorate) {
        governorate = typeof event.governorate === 'object'
          ? (event.governorate[currentLang] || event.governorate.ar || '').toLowerCase()
          : event.governorate.toLowerCase();
      }

      // Gather tags defensively
      let tagsList = [];
      if (event.tags) {
        tagsList = (event.tags[currentLang] || event.tags.ar || []).map(t => t.toLowerCase());
      }

      // Match Text Search Query
      if (q) {
        const matchesText = 
          title.includes(q) ||
          shortDesc.includes(q) ||
          desc.includes(q) ||
          location.includes(q) ||
          governorate.includes(q) ||
          date.includes(q) ||
          year.includes(q) ||
          tagsList.some(tag => tag.includes(q));

        if (!matchesText) return false;
      }

      // Match Dropdowns
      if (selectedYear && event.year && event.year.toString() !== selectedYear) {
        return false;
      }

      if (selectedGov && event.governorate) {
        const govKey = typeof event.governorate === 'object' ? event.governorate.en : event.governorate;
        if (govKey !== selectedGov) return false;
      }

      if (selectedTag) {
        const eventTags = (event.tags && (event.tags[currentLang] || event.tags.ar)) || [];
        if (!eventTags.includes(selectedTag)) return false;
      }

      return true;
    }).sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort chronologically ascending
  }, [searchQuery, selectedYear, selectedGov, selectedTag, currentLang]);

  return (
    <section id="timeline-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Search and Filters Controls */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedGov={selectedGov}
        setSelectedGov={setSelectedGov}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        availableYears={availableYears}
        availableGovs={availableGovs}
        availableTags={availableTags}
      />

      {/* Showing count indicator */}
      <div className="mb-6 px-1 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-400">
        <span>
          {t('showingEvents', { count: filteredEvents.length })}
        </span>
      </div>

      {/* Main Timeline Block */}
      {filteredEvents.length > 0 ? (
        <div className="relative w-full mt-10">
          
          {/* Central Vertical Line */}
          {/* Mobile line aligned start (RTL/LTR start-4), desktop centered (md:start-1/2) */}
          <div className="absolute top-0 bottom-0 start-4 md:start-1/2 w-0.5 bg-gradient-to-b from-syrian-green-500/80 via-syrian-green-600/60 to-syrian-dark-800 -translate-x-1/2 timeline-line-glow"></div>

          {/* Cards Loop */}
          <div className="flex flex-col w-full relative z-10">
            {filteredEvents.map((event, index) => (
              <TimelineCard
                key={event.id}
                event={event}
                index={index}
                onSelect={onSelectEvent}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Empty Fallback State */
        <div className="w-full glass-panel rounded-2xl py-16 px-4 border border-syrian-dark-700/30 flex flex-col items-center justify-center text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-syrian-dark-900 border border-syrian-dark-700/60 flex items-center justify-center mb-4 text-syrian-green-500 shadow-md">
            <FaInbox size={24} className="opacity-75" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 select-none">
            {t('noEventsFound')}
          </h3>
        </div>
      )}
    </section>
  );
}

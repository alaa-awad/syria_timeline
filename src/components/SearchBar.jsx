import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaTag, FaTimes, FaUndo } from 'react-icons/fa';
import { siteSettings } from '../data/settings.js';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedYear,
  setSelectedYear,
  selectedGov,
  setSelectedGov,
  selectedTag,
  setSelectedTag,
  availableYears,
  availableGovs,
  availableTags
}) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ar';

  const hasActiveFilters = searchQuery || selectedYear || selectedGov || selectedTag;

  const handleReset = () => {
    setSearchQuery('');
    setSelectedYear('');
    setSelectedGov('');
    setSelectedTag('');
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-5 sm:p-6 mb-8 border border-syrian-dark-700/40 shadow-xl">
      {/* Search Input */}
      <div className="relative w-full mb-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-slate-400">
          <FaSearch className="w-5 h-5 text-syrian-green-500" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full ps-11 pe-4 py-3 sm:py-3.5 bg-syrian-dark-950/80 border border-syrian-dark-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-syrian-green-500/50 focus:border-syrian-green-500 transition-all duration-300 shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 end-0 flex items-center pe-4 text-slate-400 hover:text-syrian-red-500 transition-colors"
            aria-label="Clear search"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Year Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 px-1">
            <FaCalendarAlt className="text-syrian-green-400" />
            <span>{t('filterYear')}</span>
          </label>
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2.5 bg-syrian-dark-900 border border-syrian-dark-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-syrian-green-500 focus:border-syrian-green-500 transition-all cursor-pointer appearance-none"
            >
              <option value="">{t('all')}</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 end-3 flex items-center pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Governorate Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 px-1">
            <FaMapMarkerAlt className="text-syrian-green-400" />
            <span>{t('filterGov')}</span>
          </label>
          <div className="relative">
            <select
              value={selectedGov}
              onChange={(e) => setSelectedGov(e.target.value)}
              className="w-full px-3 py-2.5 bg-syrian-dark-900 border border-syrian-dark-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-syrian-green-500 focus:border-syrian-green-500 transition-all cursor-pointer appearance-none"
            >
              <option value="">{t('all')}</option>
              {availableGovs.map((govName) => {
                const configGov = siteSettings.governorates.find(g => g.key === govName);
                const displayName = configGov ? (currentLang === 'ar' ? configGov.ar : configGov.en) : govName;
                return (
                  <option key={govName} value={govName}>
                    {displayName}
                  </option>
                );
              })}
            </select>
            <div className="absolute inset-y-0 end-3 flex items-center pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 px-1">
            <FaTag className="text-syrian-green-400" />
            <span>{t('filterTag')}</span>
          </label>
          <div className="relative">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-3 py-2.5 bg-syrian-dark-900 border border-syrian-dark-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-syrian-green-500 focus:border-syrian-green-500 transition-all cursor-pointer appearance-none"
            >
              <option value="">{t('all')}</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 end-3 flex items-center pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Active Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-syrian-dark-700/40">
          <span className="text-xs font-semibold text-slate-500">
            {t('activeFilters')}:
          </span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-syrian-dark-900 text-xs text-slate-300 border border-syrian-dark-700">
              <span className="opacity-60">Search:</span> "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="text-syrian-red-500 hover:text-white transition-colors">
                <FaTimes />
              </button>
            </span>
          )}

          {selectedYear && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-syrian-dark-900 text-xs text-slate-300 border border-syrian-dark-700">
              <span className="opacity-60">{t('filterYear')}:</span> {selectedYear}
              <button onClick={() => setSelectedYear('')} className="text-syrian-red-500 hover:text-white transition-colors">
                <FaTimes />
              </button>
            </span>
          )}

          {selectedGov && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-syrian-dark-900 text-xs text-slate-300 border border-syrian-dark-700">
              <span className="opacity-60">{t('filterGov')}:</span> {
                (() => {
                  const configGov = siteSettings.governorates.find(g => g.key === selectedGov);
                  return configGov ? (currentLang === 'ar' ? configGov.ar : configGov.en) : selectedGov;
                })()
              }
              <button onClick={() => setSelectedGov('')} className="text-syrian-red-500 hover:text-white transition-colors">
                <FaTimes />
              </button>
            </span>
          )}

          {selectedTag && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-syrian-dark-900 text-xs text-slate-300 border border-syrian-dark-700">
              <span className="opacity-60">{t('filterTag')}:</span> {selectedTag}
              <button onClick={() => setSelectedTag('')} className="text-syrian-red-500 hover:text-white transition-colors">
                <FaTimes />
              </button>
            </span>
          )}

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 ms-auto px-3 py-1 text-xs font-semibold text-syrian-red-500 hover:text-white bg-syrian-red-500/10 hover:bg-syrian-red-600 rounded-lg transition-all duration-300 border border-syrian-red-500/20"
          >
            <FaUndo size={10} />
            <span>{t('clearFilters')}</span>
          </button>
        </div>
      )}
    </div>
  );
}

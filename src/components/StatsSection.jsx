import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { 
  FaSkullCrossbones, 
  FaBaby, 
  FaUserSlash, 
  FaHome, 
  FaGlobe, 
  FaHospital, 
  FaGraduationCap, 
  FaClock, 
  FaChartBar 
} from 'react-icons/fa';
import { statisticsData } from '../data/statistics.js';
import { timelineData } from '../data/timeline.js';

// Individual Animated Counter Sub-Component
function AnimatedCounter({ value, isFloat = false, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseFloat(value);
    if (start === end) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Quadratic easeOut function for smoother slowdown at the end
      const easeProgress = progress * (2 - progress);
      const current = easeProgress * (end - start) + start;
      
      setCount(current);

      if (progress < 1) {
        window.requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  // Format count output
  const displayValue = isFloat 
    ? count.toFixed(1) 
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref} className="font-black tracking-tight text-3xl sm:text-4xl">
      {displayValue}
    </span>
  );
}

export default function StatsSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ar';
  
  // Icon Resolver: maps string name defensively to specific React Icon components
  const getIcon = (iconName) => {
    const classes = "w-6 h-6 text-syrian-green-500";
    switch (iconName) {
      case 'FaSkullCrossbones':
        return <FaSkullCrossbones className={classes} />;
      case 'FaBaby':
        return <FaBaby className={classes} />;
      case 'FaUserSlash':
        return <FaUserSlash className={classes} />;
      case 'FaHome':
        return <FaHome className={classes} />;
      case 'FaGlobe':
        return <FaGlobe className={classes} />;
      case 'FaHospital':
        return <FaHospital className={classes} />;
      case 'FaGraduationCap':
        return <FaGraduationCap className={classes} />;
      case 'FaClock':
        return <FaClock className={classes} />;
      default:
        return <FaChartBar className={classes} />;
    }
  };

  return (
    <section className="w-full bg-syrian-dark-900 border-t border-syrian-dark-700/50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
            <span className="w-2 h-8 bg-syrian-green-500 rounded-full"></span>
            {t('statsSectionTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {t('statsSectionSubtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statisticsData.map((stat, i) => {
            const label = stat.label[currentLang] || stat.label.ar;
            const suffix = stat.suffixTranslation 
              ? (stat.suffixTranslation[currentLang] || stat.suffixTranslation.ar || '')
              : (stat.suffix || '');
            const source = stat.source[currentLang] || stat.source.ar;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative glass-card rounded-2xl p-6 border border-syrian-dark-700/30 flex flex-col items-center justify-between text-center group hover:border-syrian-green-500/20 hover:shadow-lg hover:shadow-syrian-green-500/5 transition-all duration-300"
              >
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-xl bg-syrian-dark-950 border border-syrian-dark-800 flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {getIcon(stat.icon)}
                </div>

                {/* Animated counter block */}
                <div className="text-white mb-2 flex items-baseline justify-center gap-1">
                  <AnimatedCounter value={stat.value} isFloat={stat.isFloat} />
                  <span className="text-lg font-bold text-syrian-green-400 select-none">
                    {suffix}
                  </span>
                </div>

                {/* Stat Label */}
                <h3 className="text-sm sm:text-base font-bold text-slate-200 mb-4">
                  {label}
                </h3>

                {/* Tooltip Source Citation */}
                <div className="text-[10px] text-slate-500 font-medium px-2 py-1 rounded bg-syrian-dark-950/60 border border-syrian-dark-800/50 w-full select-none line-clamp-1 group-hover:text-slate-400 group-hover:border-syrian-dark-700/50 transition-colors">
                  {t('sourceCitation', { source })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Interactive Card: Number of Events archived in the system */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 max-w-lg mx-auto glass-panel rounded-2xl p-6 border border-syrian-green-500/20 text-center shadow-lg hover:border-syrian-green-500/40 transition-colors"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-syrian-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-syrian-green-500"></span>
            </span>
            <span className="text-xs font-bold text-syrian-green-400 uppercase tracking-widest">
              {t('siteStatsCountSubtitle')}
            </span>
          </div>
          
          <div className="text-4xl font-black text-white mb-2">
            <AnimatedCounter value={timelineData.length} />
          </div>
          
          <p className="text-sm font-semibold text-slate-300">
            {t('siteStatsCount')}
          </p>
        </motion.div>

      </div>
    </section>
  );
}

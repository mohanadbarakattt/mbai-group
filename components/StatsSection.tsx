import React, { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import testimonials from './data/testimonials';
import { useI18n } from '../i18n';

const StatsSection: React.FC = () => {
  const { dict } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-6 bg-transparent border-y border-white/10 relative overflow-hidden">
      <div className="aurora w-[420px] h-[420px] bottom-0 left-1/4" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.16), transparent 60%)' }} />
      <div className="max-w-6xl mx-auto relative">

        {/* Asymmetric header — left-aligned with large decorative number right */}
        <div
          className={`mb-10 flex items-end justify-between gap-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="shrink-0 hidden sm:block select-none pointer-events-none">
            <p className="text-7xl md:text-8xl font-black text-gradient leading-none">{dict.stats.leadsBig}</p>
            <p className="text-xs text-[#8b93a7] mt-1 tracking-wide font-medium">{dict.stats.leadsLabel}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-400 mb-3">{dict.stats.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-snug">
              {dict.stats.heading1}<br className="hidden sm:block" /> {dict.stats.heading2}
            </h2>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className={`mb-10 grid grid-cols-3 divide-x divide-white/10 glass rounded-xl overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '100ms' }}
        >
          {dict.stats.items.map((s) => (
            <div key={s.label} className="px-4 py-5 text-center">
              <p className="text-2xl md:text-3xl font-black text-gradient">{s.number}</p>
              <p className="text-xs text-[#8b93a7] mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...testimonials]
            .sort((a, b) => {
              const aFeatured = a.featured ? 0 : 1;
              const bFeatured = b.featured ? 0 : 1;
              if (aFeatured !== bFeatured) return aFeatured - bFeatured;
              const aOrder = a.order ?? Infinity;
              const bOrder = b.order ?? Infinity;
              return aOrder - bOrder;
            })
            .map((t, i) => (
            <div
              key={i}
              className={`glass-strong card-fx rounded-2xl p-8 flex flex-col gap-5 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-lg font-black text-gradient leading-tight tracking-tight">
                  {t.outcome}
                </span>
                <Quote size={18} className="text-cyan-400/70 shrink-0 mt-0.5" />
              </div>

              <p className="text-[#aab2c5] text-sm leading-relaxed flex-1">
                "{t.quote}"
              </p>

              <div className="pt-4 border-t border-white/10">
                <p className="text-white text-sm font-semibold">{t.name}</p>
                <p className="text-[#8b93a7] text-xs mt-0.5">
                  {t.role} · {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;

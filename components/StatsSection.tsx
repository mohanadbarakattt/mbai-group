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
    <section ref={ref} className="py-20 px-6 bg-transparent border-y border-[#263437] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">

        {/* Asymmetric header — left-aligned with large decorative number right */}
        <div
          className={`mb-10 flex items-end justify-between gap-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="shrink-0 hidden sm:block select-none pointer-events-none">
            <p className="text-7xl md:text-8xl font-semibold text-[#2a9d8f] leading-none">{dict.stats.leadsBig}</p>
            <p className="text-xs text-[#a7b7b4] mt-1 tracking-wide font-medium">{dict.stats.leadsLabel}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-[#2a9d8f] mb-3">{dict.stats.eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug">
              {dict.stats.heading1}<br className="hidden sm:block" /> {dict.stats.heading2}
            </h2>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className={`mb-10 grid grid-cols-3 divide-x divide-[#263437] glass-card rounded-2xl overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '100ms' }}
        >
          {dict.stats.items.map((s) => (
            <div key={s.label} className="px-4 py-5 text-center">
              <p className="text-2xl md:text-3xl font-semibold text-[#2a9d8f]">{s.number}</p>
              <p className="text-xs text-[#a7b7b4] mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials — empty/error-safe; never invent quotes */}
        {testimonials.length === 0 ? (
          <div
            className={`glass-card rounded-2xl p-8 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <Quote size={18} className="text-[#2a9d8f]/70 mx-auto mb-3" />
            <p className="text-sm text-[#a7b7b4] leading-relaxed max-w-xl mx-auto">
              Client testimonials will appear here once the owner publishes attributed quotes.
              No placeholder reviews are shown.
            </p>
          </div>
        ) : (
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
                className={`glass-card rounded-2xl p-8 flex flex-col gap-5 transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-lg font-semibold text-[#2a9d8f] leading-tight tracking-tight">
                    {t.outcome}
                  </span>
                  <Quote size={18} className="text-[#2a9d8f]/70 shrink-0 mt-0.5" />
                </div>

                <p className="text-[#a7b7b4] text-sm leading-relaxed flex-1">
                  "{t.quote}"
                </p>

                <div className="pt-4 border-t border-[#263437]">
                  <p className="text-[#f1f5f4] text-sm font-semibold">{t.name}</p>
                  <p className="text-[#a7b7b4] text-xs mt-0.5">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default StatsSection;

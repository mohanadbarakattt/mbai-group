import React, { useEffect, useRef, useState } from 'react';
import VideoSlot from './VideoSlot';
import { useI18n } from '../i18n';

// Explainer videos for these rows aren't shot yet — see public/media/MANIFEST.md
// for the brief on each one (benefit-ship.mp4, benefit-arabic.mp4,
// benefit-ecosystem.mp4). VideoSlot renders its placeholder until a `src` is
// passed in, so wiring a finished clip is a one-line change per row.
const ACCENTS = ['#b85c38', '#9a4a2c', '#6b645c'];

const Benefits: React.FC = () => {
  const { dict } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 bg-transparent border-t border-[#e6dfd2] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">

        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[#b85c38] text-xs font-semibold uppercase tracking-[0.2em] mb-3">{dict.benefits.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            {dict.benefits.heading1} <span className="text-gradient">{dict.benefits.heading2}</span>
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-20">
          {dict.benefits.items.map((item, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={item.title}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: visible ? `${i * 120 + 100}ms` : '0ms' }}
              >
                <div className={reversed ? 'md:order-2' : ''}>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: ACCENTS[i] }}>{item.eyebrow}</p>
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#14110f] leading-tight mb-4">{item.title}</h3>
                  <p className="text-[#6b645c] text-sm md:text-base leading-relaxed max-w-lg">{item.body}</p>
                </div>
                <div className={reversed ? 'md:order-1' : ''}>
                  <VideoSlot label={item.videoLabel} accent={ACCENTS[i]} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Benefits;

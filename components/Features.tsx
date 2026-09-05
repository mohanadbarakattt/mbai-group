import React, { useEffect, useRef, useState } from 'react';
import { Workflow, Languages, Rocket } from 'lucide-react';
import { useI18n } from '../i18n';

const ICONS = [<Workflow size={20} />, <Languages size={20} />, <Rocket size={20} />];
const ACCENTS = ['#b85c38', '#9a4a2c', '#6b645c'];

/** Three hub-and-spoke dots lighting up in sequence — one model directing a crew. */
const OrchestrationVisual: React.FC<{ accent: string }> = ({ accent }) => (
  <div className="flex items-center justify-center gap-3 h-10" aria-hidden="true">
    <span className="w-2.5 h-2.5 rounded-full animate-pulse-glow" style={{ background: accent }} />
    <span className="h-px w-6" style={{ background: `${accent}55` }} />
    <span className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: accent, animationDelay: '0.5s' }} />
    <span className="h-px w-6" style={{ background: `${accent}55` }} />
    <span className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: accent, animationDelay: '1s' }} />
  </div>
);

/** EN / AR / FR chips fading in and out of focus in turn — no single "correct" language. */
const LanguageVisual: React.FC<{ accent: string }> = ({ accent }) => (
  <div className="flex items-center justify-center gap-2.5 h-10" aria-hidden="true">
    {['EN', 'AR', 'FR'].map((label, i) => (
      <span
        key={label}
        className="animate-chip-cycle px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border"
        style={{ color: accent, borderColor: `${accent}44`, background: `${accent}14`, animationDelay: `${i * 1.2}s` }}
      >
        {label}
      </span>
    ))}
  </div>
);

/** Three bars filling like a checklist ticking through discover → build → ship. */
const ShipVisual: React.FC<{ accent: string }> = ({ accent }) => (
  <div className="flex flex-col justify-center gap-1.5 h-10 px-1" aria-hidden="true">
    {[0, 0.3, 0.6].map((delay, i) => (
      <div key={i} className="h-1 rounded-full bg-[#f0ebe1] overflow-hidden">
        <div className="h-full rounded-full animate-bar-grow" style={{ background: accent, animationDelay: `${delay}s` }} />
      </div>
    ))}
  </div>
);

const VISUALS = [OrchestrationVisual, LanguageVisual, ShipVisual];

const Features: React.FC = () => {
  const { dict } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 bg-transparent border-t border-[#e6dfd2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">

        <div className={`mb-14 max-w-2xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[#b85c38] text-xs font-semibold uppercase tracking-[0.2em] mb-3">{dict.features.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            {dict.features.heading1} <span className="text-[#b85c38]">{dict.features.heading2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.features.items.map((item, i) => {
            const Visual = VISUALS[i];
            return (
              <div
                key={item.title}
                className={`bg-[#fffdf8] border border-[#e6dfd2] rounded-2xl p-7 flex flex-col gap-5 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: visible ? `${i * 110 + 150}ms` : '0ms' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ color: ACCENTS[i], background: `${ACCENTS[i]}16`, border: `1px solid ${ACCENTS[i]}33` }}
                >
                  {ICONS[i]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#14110f] leading-tight mb-2">{item.title}</h3>
                  <p className="text-[#6b645c] text-sm leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-auto pt-2 border-t border-[#e6dfd2]">
                  <Visual accent={ACCENTS[i]} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;

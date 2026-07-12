import React, { useRef, useEffect, useState } from 'react';
import { Search, Cpu, Rocket, HeartHandshake, ArrowRight } from 'lucide-react';
import TiltCard from './effects/TiltCard';
import { useI18n } from '../i18n';

const STEP_ICONS = [<Search size={20} />, <Cpu size={20} />, <Rocket size={20} />, <HeartHandshake size={20} />];
const STEP_NUMBERS = ['01', '02', '03', '04'];
const STEP_ACCENTS = ['#e3a83f', '#22d3ee', '#d9784f', '#e3a83f'];

const HowWeWork: React.FC = () => {
  const { dict } = useI18n();
  const steps = dict.howWeWork.steps.map((s, i) => ({ ...s, number: STEP_NUMBERS[i], icon: STEP_ICONS[i], accent: STEP_ACCENTS[i] }));
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
    <section id="how-we-work" ref={ref} className="py-24 px-6 bg-transparent border-t border-white/10 overflow-hidden relative">
      <div className="aurora w-[480px] h-[480px] top-0 right-0" style={{ background: 'radial-gradient(circle, rgba(217,120,79,0.16), transparent 60%)' }} />

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <div className={`mb-16 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400 mb-3">{dict.howWeWork.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            {dict.howWeWork.heading1}<br className="hidden sm:block" />
            <span className="text-gradient"> {dict.howWeWork.heading2}</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1200px' }}>
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative transition-[opacity,transform] duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: visible ? `${i * 110 + 150}ms` : '0ms' }}
            >
              {/* Flow connector — points from this step to the next (desktop only) */}
              {i < steps.length - 1 && (
                <ArrowRight size={16} className="hidden lg:block absolute top-1/2 -right-3.5 -translate-y-1/2 z-10 text-white/20" />
              )}

              <TiltCard className="h-full" max={5}>
                <div className="glass-strong card-fx glow-border rounded-2xl p-7 h-full flex flex-col gap-4 relative overflow-hidden">
                  {/* Large watermark number */}
                  <span className="absolute top-2 right-4 text-7xl font-black text-white/[0.05] select-none leading-none pointer-events-none">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative z-10"
                    style={{ color: step.accent, background: `${step.accent}16`, border: `1px solid ${step.accent}33` }}
                  >
                    {step.icon}
                  </div>

                  {/* Text */}
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: step.accent }}>{step.title}</p>
                    <h3 className="text-lg font-black text-white leading-tight mb-2">{step.punch}</h3>
                    <p className="text-xs text-[#8b93a7] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className={`mt-10 flex items-center justify-center gap-2 text-[#8b93a7] text-xs transition-all duration-700 delay-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="w-4 h-px bg-white/15" />
          {dict.howWeWork.avgTimeLabel} <span className="font-semibold text-white">{dict.howWeWork.avgTimeValue}</span>
          <span className="w-4 h-px bg-white/15" />
        </div>

      </div>
    </section>
  );
};

export default HowWeWork;

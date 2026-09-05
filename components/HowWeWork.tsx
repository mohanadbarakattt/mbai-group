import React, { useRef, useEffect, useState } from 'react';
import { Search, Cpu, Rocket, HeartHandshake, ArrowRight } from 'lucide-react';
import TiltCard from './effects/TiltCard';
import VideoSlot from './VideoSlot';
import { useI18n } from '../i18n';

const STEP_ICONS = [<Search size={20} />, <Cpu size={20} />, <Rocket size={20} />, <HeartHandshake size={20} />];
const STEP_NUMBERS = ['01', '02', '03', '04'];
const STEP_ACCENTS = ['#b85c38', '#9a4a2c', '#6b645c', '#b85c38'];

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
    <section id="how-we-work" ref={ref} className="py-24 px-6 bg-transparent border-t border-[#e6dfd2] overflow-hidden relative">

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b85c38] mb-3">{dict.howWeWork.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            {dict.howWeWork.heading1}<br className="hidden sm:block" />
            <span className="text-gradient"> {dict.howWeWork.heading2}</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" >
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative transition-[opacity,transform] duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: visible ? `${i * 110 + 150}ms` : '0ms' }}
            >
              {/* Flow connector — points from this step to the next (desktop only) */}
              {i < steps.length - 1 && (
                <ArrowRight size={16} className="hidden lg:block absolute top-1/2 -right-3.5 -translate-y-1/2 z-10 text-[#d9d0c0]" />
              )}

              <TiltCard className="h-full" max={5}>
                <div className="bg-[#fffdf8] border border-[#e6dfd2] rounded-2xl p-7 h-full flex flex-col gap-4 relative overflow-hidden">
                  {/* Large watermark number */}
                  <span className="absolute top-2 right-4 text-7xl font-semibold text-[#14110f]/[0.06] select-none leading-none pointer-events-none">
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
                    <h3 className="text-lg font-semibold text-[#14110f] leading-tight mb-2">{step.punch}</h3>
                    <p className="text-xs text-[#6b645c] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className={`mt-10 flex items-center justify-center gap-2 text-[#6b645c] text-xs transition-all duration-700 delay-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="w-4 h-px bg-[#f0ebe1]" />
          {dict.howWeWork.avgTimeLabel} <span className="font-semibold text-[#14110f]">{dict.howWeWork.avgTimeValue}</span>
          <span className="w-4 h-px bg-[#f0ebe1]" />
        </div>

        {/* Explainer video — process walkthrough, still to be shot (see public/media/MANIFEST.md) */}
        <div
          className={`mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '750ms' }}
        >
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-[#14110f] leading-tight mb-2">{dict.howWeWork.explainerTitle}</h3>
            <p className="text-[#6b645c] text-sm leading-relaxed max-w-md">{dict.howWeWork.explainerBody}</p>
          </div>
          <VideoSlot label={dict.howWeWork.explainerVideoLabel} accent="#b85c38" />
        </div>

      </div>
    </section>
  );
};

export default HowWeWork;

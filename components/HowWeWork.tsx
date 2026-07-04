import React, { useRef, useEffect, useState } from 'react';
import { Search, Cpu, Rocket, HeartHandshake } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <Search size={20} />,
    title: 'Discover',
    punch: 'We scope it in one call.',
    description: 'Goals, market, workflow — all mapped before a line is written.',
  },
  {
    number: '02',
    icon: <Cpu size={20} />,
    title: 'Build',
    punch: 'Engineers ship, not slides.',
    description: 'Your AI agent, pipeline, or product — built iteratively with you.',
  },
  {
    number: '03',
    icon: <Rocket size={20} />,
    title: 'Launch',
    punch: 'Live. Tested. Yours.',
    description: 'Deployed, documented, and walked through — ready from day one.',
  },
  {
    number: '04',
    icon: <HeartHandshake size={20} />,
    title: 'Support',
    punch: 'We stay in the game.',
    description: 'Optimise, scale, and refine — we treat every client as a long-term partner.',
  },
];

const HowWeWork: React.FC = () => {
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
    <section id="how-we-work" ref={ref} className="py-24 px-6 bg-[#f8f5f1] border-t border-[#e2d9ce] overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className={`mb-16 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9a9490] mb-3">Our Process</p>
          <h2 className="text-3xl md:text-5xl font-black text-[#111111] leading-tight">
            From idea to shipped —<br className="hidden sm:block" />
            <span className="text-[#c8bfb4]"> in weeks, not months.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e2d9ce] rounded-2xl overflow-hidden border border-[#e2d9ce]">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative bg-white hover:bg-[#f8f5f1] transition-all duration-300 p-7 flex flex-col gap-4 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: visible ? `${i * 100 + 200}ms` : '0ms', transitionProperty: 'opacity, transform, background-color' }}
            >
              {/* Large watermark number */}
              <span className="absolute top-4 right-5 text-7xl font-black text-[#f0ebe3] select-none leading-none pointer-events-none">
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-[#111111] flex items-center justify-center text-white shrink-0 relative z-10">
                {step.icon}
              </div>

              {/* Text */}
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9a9490] mb-1">{step.title}</p>
                <h3 className="text-lg font-black text-[#111111] leading-tight mb-2">{step.punch}</h3>
                <p className="text-xs text-[#6b6460] leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className={`mt-6 flex items-center justify-center gap-2 text-[#9a9490] text-xs transition-all duration-700 delay-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="w-4 h-px bg-[#e2d9ce]" />
          Average time to first delivery: <span className="font-semibold text-[#111111]">2–4 weeks</span>
          <span className="w-4 h-px bg-[#e2d9ce]" />
        </div>

      </div>
    </section>
  );
};

export default HowWeWork;

import React, { useState, useEffect } from 'react';
import { ChevronDown, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import Globe3D from './effects/Globe3D';
import NeuralBackground from './effects/NeuralBackground';

const slides = [
  {
    badge: 'MB AI Group · Frontier AI for MENA',
    line1: 'Frontier AI,',
    line2: 'built for the real world.',
    sub: (
      <>
        Founded by a former <strong className="text-white">xAI Human Data Lead</strong>. We build the AI agents, data systems, and products that move MENA businesses — and launch our own ventures doing the same.
      </>
    ),
  },
  {
    badge: 'One Group · Four Ventures',
    line1: 'AutoLeads. Virlo.',
    line2: 'IBNI. TUT.',
    sub: (
      <>
        <strong className="text-white">AutoLeads</strong> generates revenue today. <strong className="text-white">Virlo</strong>, <strong className="text-white">IBNI</strong> and <strong className="text-white">TUT</strong> are next — virality intelligence, no-code AI building, and education for 100M+ students.
      </>
    ),
  },
  {
    badge: 'LLM Alignment · RLHF · Reasoning',
    line1: 'The rigour behind',
    line2: 'frontier models.',
    sub: (
      <>
        Our work covered <strong className="text-white">LLM alignment, RLHF, and Chain-of-Thought reasoning</strong> — the techniques behind the world's most capable AI, now applied to your product.
      </>
    ),
  },
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const openCalendly = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/autoleadss-info/30min' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => { setCurrent((p) => (p + 1) % slides.length); setFading(false); }, 700);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(idx); setFading(false); }, 450);
  };

  const slide = slides[current];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#05060c]">
      {/* Aurora blobs */}
      <div className="aurora w-[520px] h-[520px] -top-40 -left-24" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.5), transparent 60%)' }} />
      <div className="aurora w-[560px] h-[560px] top-1/3 -right-40" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.32), transparent 60%)' }} />
      <div className="aurora w-[420px] h-[420px] -bottom-32 left-1/3" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.28), transparent 60%)' }} />

      {/* Faded grid + neural links */}
      <div className="absolute inset-0 grid-fade" />
      <div className="absolute inset-0"><NeuralBackground /></div>

      {/* 3D globe centerpiece */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Globe3D className="w-full h-full max-w-[1100px] opacity-90" />
      </div>

      {/* Perspective floor */}
      <div className="absolute bottom-0 inset-x-0 h-56 perspective-grid opacity-40 pointer-events-none"
        style={{ maskImage: 'linear-gradient(to top, #000, transparent)', WebkitMaskImage: 'linear-gradient(to top, #000, transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#05060c] to-transparent pointer-events-none" />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-7"
        style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(10px)' : 'translateY(0)', transition: 'opacity .6s ease, transform .6s ease' }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[#c7cede] text-xs font-semibold uppercase tracking-[0.18em]">
          <Sparkles size={12} className="text-cyan-300" />
          {slide.badge}
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04]">
          <span className="text-white">{slide.line1}</span>
          <br />
          <span className="text-gradient">{slide.line2}</span>
        </h1>

        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-500/60" />
        </div>

        <p className="text-base md:text-lg text-[#aab2c5] max-w-2xl mx-auto leading-relaxed">
          {slide.sub}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button onClick={openCalendly} className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl">
            <Calendar size={16} /> Book a 30-min Strategy Call
          </button>
          <a href="#demos" className="btn-ghost inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium">
            Explore Live Demos <ArrowRight size={16} />
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-gradient-to-r from-indigo-400 to-cyan-400' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-[11px] uppercase tracking-[0.15em] text-[#5b6478]">
          <span>Ex-xAI Human Data Lead</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>9 shipped products</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Cairo · Dubai</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 z-10 hidden md:block animate-bounce">
        <ChevronDown size={22} />
      </div>
    </section>
  );
};

export default Hero;

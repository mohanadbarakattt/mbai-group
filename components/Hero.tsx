import React, { useState, useEffect } from 'react';
import { ChevronDown, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import AuroraFlow from './effects/AuroraFlow';
import NeuralBackground from './effects/NeuralBackground';
import { useI18n } from '../i18n';

// English keeps its original rich JSX (inline bold emphasis) exactly as
// designed. AR/Franco render the equivalent plain-string copy from the i18n
// dictionary instead — a deliberate scope tradeoff so translating the rest
// of the site doesn't require re-authoring every component's JSX structure.
const enSubs: React.ReactNode[] = [
  <>
    Founded by a former <strong className="text-white">xAI Human Data Lead</strong>. We build the AI agents, data systems, and products that move MENA businesses — and launch our own ventures doing the same.
  </>,
  <>
    <strong className="text-white">AutoLeadss</strong> generates revenue today. <strong className="text-white">Virlo Studio</strong>, <strong className="text-white">IBNI</strong> and <strong className="text-white">TUT</strong> are next — virality intelligence, no-code AI building, and education for 100M+ students.
  </>,
  <>
    Our work covered <strong className="text-white">LLM alignment, RLHF, and Chain-of-Thought reasoning</strong> — the techniques behind the world's most capable AI, now applied to your product.
  </>,
];

const Hero: React.FC = () => {
  const { locale, dict } = useI18n();
  const slides = dict.hero.slides.map((s, i) => ({
    ...s,
    sub: locale === 'en' ? enSubs[i] : s.sub,
  }));
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  // Auto-rotation is paused while the user hovers/focuses the slide, or when the
  // system asks for reduced motion — an auto-playing carousel shouldn't fight
  // someone trying to read it or trigger animation for motion-sensitive users.
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const openCalendly = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/autoleadss-info/30min' });
    }
  };

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => { setCurrent((p) => (p + 1) % slides.length); setFading(false); }, 700);
    }, 7000);
    return () => clearInterval(interval);
  }, [paused, reducedMotion]);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(idx); setFading(false); }, 450);
  };

  const slide = slides[current];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* Aurora blobs */}
      <div className="aurora aurora-drift w-[520px] h-[520px] -top-40 -left-24" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.6), transparent 60%)' }} />
      <div className="aurora aurora-drift w-[560px] h-[560px] top-1/4 -right-40" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.45), transparent 60%)', animationDelay: '3s' }} />
      <div className="aurora aurora-drift w-[440px] h-[440px] -bottom-32 left-1/4" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.42), transparent 60%)', animationDelay: '6s' }} />
      <div className="aurora aurora-drift w-[380px] h-[380px] top-1/3 left-1/3" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.3), transparent 60%)', animationDelay: '9s' }} />

      {/* Faded grid + neural links */}
      <div className="absolute inset-0 grid-fade" />
      <div className="absolute inset-0"><NeuralBackground /></div>

      {/* Flowing energy field centerpiece */}
      <div className="absolute inset-0 pointer-events-none">
        <AuroraFlow className="w-full h-full opacity-95" />
      </div>

      {/* Readability vignette behind copy */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 46% 42% at 50% 44%, rgba(6,8,20,0.72), rgba(6,8,20,0.30) 55%, transparent 78%)' }} />

      {/* Perspective floor */}
      <div className="absolute bottom-0 inset-x-0 h-52 perspective-grid opacity-25 pointer-events-none"
        style={{ maskImage: 'linear-gradient(to top, #000, transparent)', WebkitMaskImage: 'linear-gradient(to top, #000, transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1022] to-transparent pointer-events-none" />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-7"
        style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(10px)' : 'translateY(0)', transition: 'opacity .6s ease, transform .6s ease' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[#c7cede] text-xs font-semibold uppercase tracking-[0.18em]">
          <Sparkles size={12} className="text-cyan-300" />
          {slide.badge}
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04]" style={{ textShadow: '0 4px 40px rgba(6,8,20,0.85)' }}>
          <span className="text-white">{slide.line1}</span>
          <br />
          <span className="text-gradient">{slide.line2}</span>
        </h1>

        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-500/60" />
        </div>

        <p className="text-base md:text-lg text-[#cdd4e6] max-w-2xl mx-auto leading-relaxed" style={{ textShadow: '0 2px 20px rgba(6,8,20,0.9)' }}>
          {slide.sub}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button onClick={openCalendly} className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl">
            <Calendar size={16} /> {dict.hero.ctaBook}
          </button>
          <a href="#demos" className="btn-ghost inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium">
            {dict.hero.ctaDemos} <ArrowRight size={16} />
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={dict.hero.slideAria.replace('{n}', String(i + 1))}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-gradient-to-r from-indigo-400 to-cyan-400' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-[11px] uppercase tracking-[0.15em] text-[#9aa3bd] font-medium" style={{ textShadow: '0 2px 16px rgba(6,8,20,0.9)' }}>
          <span>{dict.hero.statLead}</span>
          <span className="w-1 h-1 rounded-full bg-cyan-400/60" />
          <span>{dict.hero.statProducts}</span>
          <span className="w-1 h-1 rounded-full bg-cyan-400/60" />
          <span>{dict.hero.statLocation}</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 z-10 hidden md:block animate-bounce">
        <ChevronDown size={22} />
      </div>
    </section>
  );
};

export default Hero;

import React, { useState, useEffect } from 'react';
import { ChevronDown, Calendar, ArrowRight } from 'lucide-react';
import NeuralBackground from './effects/NeuralBackground';

const slides = [
  {
    badge: 'AI Agency · UAE Real Estate & MENA Finance',
    line1: 'Intelligence That Works.',
    line2: 'Built for Your Business.',
    sub: (
      <>
        We build <strong className="text-[#111111]">AI agents and lead generation systems</strong> for UAE real estate brokerages, MENA fintech teams, and enterprise operators who need results — not more software subscriptions.
      </>
    ),
  },
  {
    badge: 'LLM Alignment · Reasoning · RLHF',
    line1: 'Frontier AI Expertise.',
    line2: 'Applied to Your Market.',
    sub: (
      <>
        Our work at xAI covered <strong className="text-[#111111]">LLM alignment, RLHF, and Chain-of-Thought reasoning</strong> — the techniques behind the world's most capable AI. We bring that rigour to MENA enterprises.
      </>
    ),
  },
  {
    badge: 'Real Products · Real Results',
    line1: 'See What',
    line2: "We've Already Built.",
    sub: (
      <>
        From <strong className="text-[#111111]">lead generation systems and MENA fintech platforms</strong> to{' '}
        <strong className="text-[#111111]">Arabic NLP classifiers and information management AI</strong> — six live products, three markets.
      </>
    ),
  },
  {
    badge: 'MB AI Group · AutoLeads · Virlo · IBNI · TUT',
    line1: 'One Group.',
    line2: 'Four Ventures.',
    sub: (
      <>
        <strong className="text-[#111111]">AutoLeads</strong> generates revenue today. <strong className="text-[#111111]">Virlo</strong>, <strong className="text-[#111111]">IBNI</strong>, and <strong className="text-[#111111]">TUT</strong> are next — virality intelligence, no-code AI building, and education for 100M+ MENA students.
      </>
    ),
  },
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const openCalendly = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: 'https://calendly.com/autoleadss-info/30min',
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => { setCurrent((p) => (p + 1) % slides.length); setFading(false); }, 700);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(idx); setFading(false); }, 500);
  };

  const slide = slides[current];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#f8f5f1] mt-[75px] mb-[75px]">

      {/* Subtle warm grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
        backgroundSize: '72px 72px',
      }} />

      {/* Neural particle field */}
      <div className="absolute inset-0">
        <NeuralBackground />
      </div>

      {/* Floating 3D orbs */}
      <div className="absolute top-[18%] left-[8%] w-24 h-24 rounded-full pointer-events-none animate-float-slow"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.18), rgba(99,102,241,0.03) 70%)', filter: 'blur(2px)' }} />
      <div className="absolute bottom-[22%] right-[10%] w-32 h-32 rounded-full pointer-events-none animate-float-slower"
        style={{ background: 'radial-gradient(circle at 35% 30%, rgba(17,17,17,0.10), rgba(17,17,17,0.02) 70%)', filter: 'blur(2px)' }} />
      <div className="absolute top-[30%] right-[20%] w-3 h-3 rounded-full bg-indigo-500/40 pointer-events-none animate-float-slow" />
      <div className="absolute bottom-[35%] left-[18%] w-2 h-2 rounded-full bg-[#111111]/30 pointer-events-none animate-float-slower" />

      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f8f5f1] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f8f5f1] to-transparent pointer-events-none" />

      {/* Slide content */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8 pt-[100px]"
        style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 0.65s ease, transform 0.65s ease' }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e2d9ce] bg-white text-[#6b6460] text-xs font-semibold uppercase tracking-[0.15em]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
          {slide.badge}
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#111111] leading-[1.06]">
          {slide.line1}
          <br />
          <span className="text-[#4a4540]">{slide.line2}</span>
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[#e2d9ce]" />
          <div className="w-1 h-1 rounded-full bg-[#c8bfb4]" />
          <div className="h-px w-12 bg-[#e2d9ce]" />
        </div>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-[#6b6460] max-w-2xl mx-auto leading-relaxed">
          {slide.sub}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={openCalendly}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] hover:bg-[#2a2a2a] text-white font-semibold rounded-lg transition-colors duration-200"
          >
            <Calendar size={16} /> Book a 30-min Strategy Call
          </button>
          <a
            href="#demos"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#c8bfb4] hover:border-[#111111] text-[#444] hover:text-[#111111] font-medium rounded-lg transition-colors duration-200"
          >
            See It Running Live <ArrowRight size={16} />
          </a>
        </div>

        {/* Slide dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-[#111111]' : 'w-2 h-2 bg-[#c8bfb4] hover:bg-[#888]'}`}
            />
          ))}
        </div>

        <p className="text-xs text-[#9a9490]">
          Serving UAE real estate, MENA fintech, and enterprise teams across the region.
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#c8bfb4] z-10 hidden md:block animate-bounce">
        <ChevronDown size={22} />
      </div>
    </section>
  );
};

export default Hero;

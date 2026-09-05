import React, { useEffect, useRef } from 'react';
import { ChevronDown, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { useI18n } from '../i18n';

// English keeps its original rich JSX (inline bold emphasis) exactly as
// designed. AR/Franco render the equivalent plain-string copy from the i18n
// dictionary instead — a deliberate scope tradeoff so translating the rest
// of the site doesn't require re-authoring every component's JSX structure.
const enSub: React.ReactNode = (
  <>
    Founded by a former <strong className="text-white">xAI Human Data Lead</strong>. We build the AI agents, data systems, and products that move MENA businesses — and launch our own ventures doing the same.
  </>
);

const Hero: React.FC = () => {
  const { locale, dict } = useI18n();
  const sub = locale === 'en' ? enSub : dict.hero.sub;
  const videoRef = useRef<HTMLVideoElement>(null);

  const goContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.location.hash = 'contact';
  };

  // The hero video is decorative brand film, not content — pause it for
  // anyone who's asked the OS to reduce motion, same as any other autoplay loop.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      const v = videoRef.current;
      if (!v) return;
      if (mq.matches) v.pause();
      else v.play().catch(() => {});
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* Hero video — the Cairo-skyline brand film. Decorative: the headline
          carries the message, so it's hidden from assistive tech. */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/media/hero-web.mp4" type="video/mp4" />
      </video>

      {/* Brand-colour aurora blobs, kept subtle over the footage */}
      <div className="aurora aurora-drift w-[520px] h-[520px] -top-40 -left-24 opacity-70" style={{ background: 'radial-gradient(circle, rgba(227,168,63,0.5), transparent 60%)' }} />
      <div className="aurora aurora-drift w-[560px] h-[560px] top-1/4 -right-40 opacity-70" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.4), transparent 60%)', animationDelay: '3s' }} />
      <div className="aurora aurora-drift w-[440px] h-[440px] -bottom-32 left-1/4 opacity-60" style={{ background: 'radial-gradient(circle, rgba(217,120,79,0.38), transparent 60%)', animationDelay: '6s' }} />

      {/* Darkening layers so copy stays legible over the footage */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1022]/75 via-[#0b1022]/45 to-[#0b1022]/85" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 46% at 50% 44%, rgba(6,8,20,0.78), rgba(6,8,20,0.35) 55%, transparent 78%)' }} />
      <div className="absolute inset-0 grid-fade opacity-40" />

      {/* Perspective floor */}
      <div className="absolute bottom-0 inset-x-0 h-52 perspective-grid opacity-25 pointer-events-none"
        style={{ maskImage: 'linear-gradient(to top, #000, transparent)', WebkitMaskImage: 'linear-gradient(to top, #000, transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1022] to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-7">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[#c7cede] text-xs font-semibold uppercase tracking-[0.18em]">
          <Sparkles size={12} className="text-cyan-300" />
          {dict.hero.badge}
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04]" style={{ textShadow: '0 4px 40px rgba(6,8,20,0.85)' }}>
          <span className="text-white">{dict.hero.line1}</span>
          <br />
          <span className="text-gradient">{dict.hero.line2}</span>
        </h1>

        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/60" />
        </div>

        <p className="text-base md:text-lg text-[#cdd4e6] max-w-2xl mx-auto leading-relaxed" style={{ textShadow: '0 2px 20px rgba(6,8,20,0.9)' }}>
          {sub}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button onClick={goContact} className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl">
            <Calendar size={16} /> {dict.hero.ctaBook}
          </button>
          <a href="#demos" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#cdd4e6] hover:text-white transition-colors">
            {dict.hero.ctaDemos} <ArrowRight size={14} />
          </a>
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

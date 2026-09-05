import React, { useEffect, useRef } from 'react';
import { ChevronDown, Calendar, ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n';

// English keeps its original rich JSX (inline bold emphasis) exactly as
// designed. AR/Franco render the equivalent plain-string copy from the i18n
// dictionary instead — a deliberate scope tradeoff so translating the rest
// of the site doesn't require re-authoring every component's JSX structure.
const enSub: React.ReactNode = (
  <>
    Founded by a former <strong className="text-[#b85c38]">xAI Human Data Lead</strong>. We build the AI agents, data systems, and products that move MENA businesses — and launch our own ventures doing the same.
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
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#14110f]">
      {/* Hero video — Cairo-skyline brand film. Decorative: headline carries the message. */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/hero-poster-editorial.png"
        aria-hidden="true"
      >
        <source src="/media/hero-web.mp4" type="video/mp4" />
      </video>

      {/* Quiet dark wash — no aurora, no perspective grid */}
      <div className="absolute inset-0 bg-[#14110f]/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#14110f]/80 via-[#14110f]/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f7f3ec] to-transparent pointer-events-none" />

      {/* Asymmetric left-aligned copy on a cream panel */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="max-w-xl md:max-w-2xl bg-[#f7f3ec]/95 border border-[#e6dfd2] px-7 py-9 md:px-10 md:py-11 shadow-[0_20px_50px_-28px_rgba(20,17,15,0.45)]">
          <p className="inline-flex items-center px-3 py-1 rounded-full border border-[#e6dfd2] bg-[#fffdf8] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6b645c] mb-6">
            {dict.hero.badge}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.08] text-[#14110f]">
            <span>{dict.hero.line1}</span>
            <br />
            <span className="text-[#b85c38]">{dict.hero.line2}</span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-[#3a342e] leading-relaxed">
            {sub}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button onClick={goContact} className="btn-primary inline-flex items-center gap-2 px-7 py-3 rounded-md">
              <Calendar size={16} /> {dict.hero.ctaBook}
            </button>
            <a href="#demos" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#14110f] hover:text-[#b85c38] transition-colors">
              {dict.hero.ctaDemos} <ArrowRight size={14} />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.14em] text-[#6b645c] font-medium">
            <span>{dict.hero.statLead}</span>
            <span className="w-1 h-1 rounded-full bg-[#b85c38]/50" />
            <span>{dict.hero.statProducts}</span>
            <span className="w-1 h-1 rounded-full bg-[#b85c38]/50" />
            <span>{dict.hero.statLocation}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#14110f]/35 z-10 hidden md:block">
        <ChevronDown size={22} />
      </div>
    </section>
  );
};

export default Hero;

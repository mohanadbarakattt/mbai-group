import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Pause, Play } from 'lucide-react';

type Slide = { name: string; kicker: string; title: string; text: string; image: string; href: string; cta: string; external?: boolean };

const SLIDES: Slide[] = [
  { name: 'TUT', kicker: 'Live · tutapp.co', title: 'Ask about Egypt. See where the answer came from.', text: 'An AI travel guide where every answer names its source page and the day it was checked. Free, in twelve languages.', image: '/tut/tut-desktop.webp', href: 'https://tutapp.co', cta: 'Open tutapp.co', external: true },
  { name: 'AutoLeadss', kicker: 'Live · autoleadss.com', title: 'Memberships, websites and ads for local businesses.', text: 'Subscription storefronts with QR passes, website design and rebuilds, and ads management. Recent work: the Lash Cartel store.', image: '/thumbnails/autoleads.png', href: 'https://autoleadss.com', cta: 'Visit AutoLeadss', external: true },
  { name: 'IBNI', kicker: 'Preview · AI app builder', title: 'Write your idea. Ibni builds it.', text: 'Describe an app in Masri, Franco or English and Ibni plans it, writes the code, tests it and gives you a live link.', image: '/thumbnails/ibni.png', href: 'https://ibni-v2.vercel.app', cta: 'Try Ibni', external: true },
  { name: 'Virlo Studio', kicker: 'Preview · AI video & image', title: 'The AI studio that actually speaks Egyptian.', text: 'Prompt in Masri or Franco and get reels, memes, posters and ads with Egyptian templates and EGP pricing.', image: '/thumbnails/virlo.png', href: 'https://virlo-studio.vercel.app', cta: 'Open Virlo Studio', external: true },
];

const INTERVAL = 6000;

const HighlightsSlider: React.FC = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [stopped, setStopped] = useState(false);
  const n = SLIDES.length;
  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync(); mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    if (paused || stopped || reduced) return;
    const t = window.setTimeout(() => go(i + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [i, paused, stopped, reduced, go]);

  return (
    <section
      id="highlights"
      aria-roledescription="carousel"
      aria-label="MB AI Group highlights"
      className="px-4 md:px-6 py-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); }}
    >
      <div className="max-w-6xl mx-auto glass rounded-3xl overflow-hidden relative">
        <div className="overflow-hidden">
          <div className="slide-track flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
            {SLIDES.map((s, k) => (
              <div key={s.name} className="w-full shrink-0 grid md:grid-cols-2 gap-6 md:gap-10 p-6 md:p-10 items-center" role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${n}: ${s.name}`} aria-hidden={k !== i}>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2a9d8f] mb-3">{s.name} · {s.kicker}</p>
                  <h3 className="text-2xl md:text-4xl font-semibold leading-tight text-[#f1f5f4] mb-4">{s.title}</h3>
                  <p className="text-[#c3cecc] text-base leading-relaxed mb-6">{s.text}</p>
                  <a href={s.href} target={s.external ? '_blank' : undefined} rel="noopener noreferrer" tabIndex={k === i ? 0 : -1} className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm no-underline">
                    {s.cta} <ArrowUpRight size={15} />
                  </a>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_40px_-24px_rgba(20,17,15,0.45)] bg-white/[0.035]">
                  <img src={s.image} alt={`${s.name} preview`} loading={k === 0 ? 'eager' : 'lazy'} decoding="async" className="w-full aspect-video object-cover object-top" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-6 md:px-10 pb-6">
          <div className="flex gap-2" role="group" aria-label="Choose slide">
            {SLIDES.map((s, k) => (
              <button key={s.name} aria-pressed={k === i} aria-label={`Show ${s.name}`} onClick={() => go(k)}
                className={`h-2 rounded-full transition-all ${k === i ? 'w-8 bg-[#2a9d8f]' : 'w-2 bg-white/20 hover:bg-white/40'}`} />
            ))}
          </div>
          <div className="flex gap-2">
            {!reduced && <button aria-label={stopped ? "Resume slideshow" : "Pause slideshow"} onClick={() => setStopped(!stopped)} className="glass-btn rounded-full p-2">{stopped ? <Play size={16} /> : <Pause size={16} />}</button>}
            <button aria-label="Previous slide" onClick={() => go(i - 1)} className="glass-btn rounded-full p-2"><ChevronLeft size={18} /></button>
            <button aria-label="Next slide" onClick={() => go(i + 1)} className="glass-btn rounded-full p-2"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSlider;

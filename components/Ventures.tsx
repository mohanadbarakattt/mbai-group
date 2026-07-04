import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, Flame, Hammer, GraduationCap, Sparkles } from 'lucide-react';
import TiltCard from './effects/TiltCard';

interface Venture {
  name: string;
  tagline: string;
  description: string;
  interpretation: string;
  status: 'Live' | 'In Development';
  href: string;
  external?: boolean;
  icon: React.ReactNode;
  accent: string;
}

const ventures: Venture[] = [
  {
    name: 'AutoLeads',
    tagline: 'AI Lead Generation Infrastructure',
    description:
      'A hybrid AI + human system that sources, qualifies, and books appointments for UAE real estate brokerages and MENA enterprises. Custom agents hunt leads around the clock; bilingual specialists close the loop.',
    interpretation:
      'Proof that frontier-grade AI can drive revenue today — 200+ qualified leads delivered to real clients across three markets.',
    status: 'Live',
    href: 'https://autoleadss.com',
    external: true,
    icon: <Sparkles size={22} />,
    accent: '#6366f1',
  },
  {
    name: 'Virlo',
    tagline: 'Virality Intelligence Engine',
    description:
      'A trend-intelligence platform that decodes why content goes viral. Virlo scans short-form platforms in real time, scores emerging trends before they peak, and tells creators and brands exactly what to post next.',
    interpretation:
      'Applies the same signal-extraction discipline used in frontier-model data pipelines to the chaos of social media.',
    status: 'In Development',
    href: '/virlo',
    icon: <Flame size={22} />,
    accent: '#f97316',
  },
  {
    name: 'IBNI',
    tagline: 'The AI App Builder',
    description:
      'IBNI ("build me" in Arabic) turns a plain-language idea into a working application. Describe the product; IBNI architects, generates, and previews it — bringing software creation to founders who don\'t code.',
    interpretation:
      'The thesis: the next hundred million builders will speak Arabic and English — not Python. IBNI is the bridge.',
    status: 'In Development',
    href: '/ibni',
    icon: <Hammer size={22} />,
    accent: '#10b981',
  },
  {
    name: 'TUT',
    tagline: 'AI Learning Companion',
    description:
      'Named after Egypt\'s boy king, TUT is a personal AI tutor built for MENA students — explaining any concept in Arabic or English, adapting to each learner\'s pace, and turning curricula into conversations.',
    interpretation:
      'Education is MENA\'s biggest lever. TUT applies alignment-grade AI safety and pedagogy to the region\'s 100M+ students.',
    status: 'In Development',
    href: '/tut',
    icon: <GraduationCap size={22} />,
    accent: '#eab308',
  },
];

const Ventures: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    // Fallback: some browsers throttle IO — reveal whenever the section enters the viewport.
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        setVisible(true);
        window.removeEventListener('scroll', check);
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => { obs.disconnect(); window.removeEventListener('scroll', check); };
  }, []);

  return (
    <section id="ventures" ref={ref} className="py-24 px-6 bg-[#f8f5f1] border-b border-[#e2d9ce] relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[#9a9490] text-xs font-semibold uppercase tracking-[0.2em] mb-3">The MB AI Group Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-black text-[#111111] mb-4 leading-tight">
            One group.<br className="sm:hidden" /> Four ventures. One mission.
          </h2>
          <p className="text-[#6b6460] max-w-2xl">
            Every company in the group attacks the same problem from a different angle: bringing frontier-grade AI to the
            markets the frontier forgot. Lead generation, virality intelligence, no-code creation, and education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: '1200px' }}>
          {ventures.map((v, i) => {
            const card = (
              <TiltCard className="h-full">
                <div className="glass-card rounded-2xl p-8 h-full flex flex-col group relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${v.accent}, transparent)` }}
                  />
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="p-3 rounded-xl border border-[#e2d9ce] group-hover:scale-110 transition-transform"
                        style={{ color: v.accent, background: `${v.accent}12` }}
                      >
                        {v.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#111111] leading-none">{v.name}</h3>
                        <p className="text-xs font-medium uppercase tracking-wide mt-1.5" style={{ color: v.accent }}>{v.tagline}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 shrink-0 ${
                        v.status === 'Live'
                          ? 'bg-green-500/10 border-green-500/40 text-green-600'
                          : 'bg-[#f0ebe3] border-[#e2d9ce] text-[#6b6460]'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${v.status === 'Live' ? 'bg-green-500 animate-pulse' : 'bg-[#c8bfb4]'}`} />
                      {v.status}
                    </span>
                  </div>

                  <p className="text-[#6b6460] text-sm leading-relaxed mb-5">{v.description}</p>

                  <div className="mt-auto">
                    <div className="p-4 rounded-xl bg-[#f0ebe3]/50 border border-[#e2d9ce]/60 mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9a9490] mb-1.5">Why it matters</p>
                      <p className="text-[#444444] text-sm leading-relaxed">{v.interpretation}</p>
                    </div>
                    <div className="w-full py-2.5 rounded-lg border border-[#e2d9ce] text-[#444444] group-hover:bg-[#111111] group-hover:text-white transition-all font-medium flex items-center justify-center gap-2 text-sm">
                      {v.status === 'Live' ? 'Visit the live product' : 'Preview the vision'} <ArrowUpRight size={15} />
                    </div>
                  </div>
                </div>
              </TiltCard>
            );

            return (
              <div
                key={v.name}
                className={`transition-[opacity,transform] duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {v.external ? (
                  <a href={v.href} target="_blank" rel="noopener noreferrer" className="block h-full no-underline">{card}</a>
                ) : (
                  <Link href={v.href} className="block h-full no-underline">{card}</Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Ventures;

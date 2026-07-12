import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, Flame, Hammer, GraduationCap, Sparkles, Fingerprint } from 'lucide-react';
import TiltCard from './effects/TiltCard';
import MediaSlot from './MediaSlot';
import { useI18n } from '../i18n';

// Non-translatable metadata (brand names stay in Latin script in every
// locale, per the site's own convention — see i18n/ar.ts and franco.ts).
// Copy (tagline/description/interpretation) comes from dict.ventures.items.
const VENTURE_META = [
  {
    id: 'ibni' as const,
    name: 'IBNI',
    // Kept in sync with the /ibni page and the Demos section: IBNI is an active,
    // in-development concept preview today, not yet a publicly shipped product.
    status: 'Preview' as const,
    href: '/ibni',
    icon: <Hammer size={22} />,
    accent: '#10b981',
    domain: 'ibni.app',
  },
  {
    id: 'autoleadss' as const,
    name: 'AutoLeadss',
    status: 'Live' as const,
    href: 'https://autoleadss.com',
    external: true,
    icon: <Sparkles size={22} />,
    accent: '#e3a83f',
    domain: 'autoleadss.com',
    // Reuses the same hero asset shown in the Demos section's AutoLeadss card.
    thumbnail: '/autoleads-images/mbai-hero-bg-opt.jpg',
  },
  {
    id: 'virlo' as const,
    name: 'Virlo Studio',
    status: 'Coming soon' as const,
    href: '/virlo',
    icon: <Flame size={22} />,
    accent: '#f97316',
    domain: 'virlo.studio',
  },
  {
    id: 'tut' as const,
    name: 'TUT',
    status: 'Coming soon' as const,
    href: '/tut',
    icon: <GraduationCap size={22} />,
    accent: '#eab308',
    domain: 'tut.app',
  },
];

const Ventures: React.FC = () => {
  const { dict } = useI18n();
  const ventures = VENTURE_META.map((meta) => ({ ...meta, ...dict.ventures.items[meta.id] }));
  const statusLabel: Record<string, string> = {
    Live: dict.ventures.statusLive,
    Preview: dict.ventures.statusPreview,
    'Coming soon': dict.ventures.statusComingSoon,
  };
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
    <section id="ventures" ref={ref} className="py-24 px-6 bg-transparent border-y border-white/10 relative overflow-hidden">
      <div className="aurora w-[520px] h-[520px] -top-24 -left-24" style={{ background: 'radial-gradient(circle, rgba(227,168,63,0.3), transparent 60%)' }} />

      <div className="max-w-7xl mx-auto relative">
        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">{dict.ventures.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            {dict.ventures.heading1}<br className="sm:hidden" /> {dict.ventures.heading2} <span className="text-gradient">{dict.ventures.heading3}</span>
          </h2>
          <p className="text-[#8b93a7] max-w-2xl">{dict.ventures.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: '1200px' }}>
          {ventures.map((v, i) => {
            const card = (
              <TiltCard className="h-full">
                <div className="glass-strong card-fx glow-border rounded-2xl p-8 h-full flex flex-col group relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${v.accent}, transparent)` }}
                  />
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="p-3 rounded-xl group-hover:scale-110 transition-transform"
                        style={{ color: v.accent, background: `${v.accent}16`, border: `1px solid ${v.accent}33` }}
                      >
                        {v.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold leading-none">{v.name}</h3>
                        <p className="text-xs font-medium uppercase tracking-wide mt-1.5" style={{ color: v.accent }}>{v.tagline}</p>
                      </div>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 shrink-0"
                      style={v.status === 'Live'
                        ? { color: '#34d399', background: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.4)' }
                        : { color: '#93a4c8', background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: v.status === 'Live' ? '#34d399' : v.accent }} />
                      {statusLabel[v.status]}
                    </span>
                  </div>

                  <MediaSlot
                    className="mb-5"
                    accent={v.accent}
                    icon={v.icon}
                    label={v.name}
                    thumbnail={v.thumbnail}
                    domain={v.domain}
                  />

                  <p className="text-[#8b93a7] text-sm leading-relaxed mb-5">{v.description}</p>

                  <div className="mt-auto">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: v.accent }}>{dict.ventures.whyItMatters}</p>
                      <p className="text-[#cdd4e2] text-sm leading-relaxed">{v.interpretation}</p>
                    </div>
                    <div className="w-full py-2.5 rounded-lg border font-medium flex items-center justify-center gap-2 text-sm transition-all"
                      style={{ borderColor: `${v.accent}44`, color: v.accent, background: `${v.accent}0f` }}>
                      {v.status === 'Live' ? dict.ventures.ctaLive : dict.ventures.ctaPreview} <ArrowUpRight size={15} />
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

        <div
          className={`mt-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '480ms' }}
        >
          <div className="glass-strong glow-border rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8">
            <div
              className="p-3 rounded-xl shrink-0"
              style={{ color: '#22d3ee', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.3)' }}
            >
              <Fingerprint size={26} />
            </div>
            <div>
              <p className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">{dict.ventures.ecosystemEyebrow}</p>
              <p className="text-[#cdd4e2] text-base md:text-lg leading-relaxed max-w-3xl">{dict.ventures.ecosystemBody}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ventures;

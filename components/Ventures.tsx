import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, Clapperboard, Hammer, MessageCircle, Zap, Share2 } from 'lucide-react';
import MediaSlot from './MediaSlot';
import { useI18n } from '../i18n';

// Non-translatable metadata (brand names stay in Latin script in every
// locale). Copy comes from dict.ventures.items.
const VENTURE_META = [
  {
    id: 'autoleadss' as const,
    name: 'AutoLeadss',
    status: 'Live' as const,
    href: 'https://autoleadss.com',
    external: true,
    icon: <Zap size={20} />,
    accent: '#2a9d8f',
    domain: 'autoleadss.com',
    thumbnail: '/thumbnails/autoleads.png',
  },
  {
    id: 'tut' as const,
    name: 'TUT',
    status: 'Live' as const,
    href: 'https://tutapp.co',
    external: true,
    icon: <MessageCircle size={20} />,
    accent: '#2a9d8f',
    domain: 'tutapp.co',
    thumbnail: '/thumbnails/tut-card.webp',
  },
  {
    id: 'ibni' as const,
    name: 'IBNI',
    status: 'Preview' as const,
    href: 'https://ibni-v2.vercel.app',
    external: true,
    icon: <Hammer size={20} />,
    accent: '#2a9d8f',
    domain: 'ibni-v2.vercel.app',
    thumbnail: '/thumbnails/ibni-card.webp',
  },
  {
    id: 'virlo' as const,
    name: 'Virlo Studio',
    status: 'Preview' as const,
    href: 'https://virlo-studio.vercel.app',
    external: true,
    icon: <Clapperboard size={20} />,
    accent: '#2a9d8f',
    domain: 'virlo-studio.vercel.app',
    thumbnail: '/thumbnails/virlo-card.webp',
  },
  {
    id: 'be3ly' as const,
    name: 'Be3ly',
    status: 'Building' as const,
    href: '/be3ly',
    icon: <Share2 size={20} />,
    accent: '#2a9d8f',
    domain: 'building',
    thumbnail: '/thumbnails/be3ly.png',
  },
];

const Ventures: React.FC = () => {
  const { dict } = useI18n();
  const ventures = VENTURE_META.map((meta) => ({ ...meta, ...dict.ventures.items[meta.id] }));
  const statusLabel: Record<string, string> = {
    Live: dict.ventures.statusLive,
    Preview: dict.ventures.statusPreview,
    'Coming soon': dict.ventures.statusComingSoon,
    Building: dict.ventures.statusBuilding,
  };
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
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
    <section id="ventures" ref={ref} className="py-28 px-6 bg-transparent border-y border-[#263437] relative">
      <div className="max-w-7xl mx-auto relative">
        <div className={`mb-16 max-w-2xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[#2a9d8f] text-xs font-semibold uppercase tracking-[0.18em] mb-3">{dict.ventures.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4 leading-tight text-[#f1f5f4]">
            {dict.ventures.heading1} {dict.ventures.heading2}{' '}
            <span className="text-[#2a9d8f]">{dict.ventures.heading3}</span>
          </h2>
          <p className="text-[#a7b7b4] text-base md:text-lg leading-relaxed">{dict.ventures.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ventures.map((v, i) => {
            const card = (
              <div className="glass-card rounded-2xl p-7 h-full flex flex-col group relative overflow-hidden hover:border-[#33464a] transition-colors">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-lg"
                      style={{ color: v.accent, background: `${v.accent}12`, border: `1px solid ${v.accent}28` }}
                    >
                      {v.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold leading-none text-[#f1f5f4]">{v.name}</h3>
                      <p className="text-xs font-medium uppercase tracking-wide mt-1.5" style={{ color: v.accent }}>{v.tagline}</p>
                    </div>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 shrink-0"
                    style={v.status === 'Live'
                      ? { color: '#2a9d8f', background: 'rgba(42,157,143,0.12)', borderColor: 'rgba(42,157,143,0.28)' }
                      : { color: '#a7b7b4', background: 'rgba(20,17,15,0.03)', borderColor: '#263437' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: v.status === 'Live' ? '#2a9d8f' : v.accent }} />
                    {statusLabel[v.status]}
                  </span>
                </div>

                <MediaSlot
                  className="mb-5"
                  accent={v.accent}
                  icon={v.icon}
                  label={v.name}
                  alt={`${v.name} — ${v.tagline}`}
                  thumbnail={v.thumbnail}
                  domain={v.domain}
                />

                <p className="text-[#a7b7b4] text-sm leading-relaxed mb-5">{v.description}</p>

                <div className="mt-auto">
                  <div className="p-4 rounded-xl bg-white/[0.035] border border-white/10 mb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: v.accent }}>{dict.ventures.whyItMatters}</p>
                    <p className="text-[#c3cecc] text-sm leading-relaxed">{v.interpretation}</p>
                  </div>
                  <div className="w-full py-2.5 rounded-md border font-medium flex items-center justify-center gap-2 text-sm transition-colors"
                    style={{ borderColor: `${v.accent}44`, color: v.accent, background: `${v.accent}0a` }}>
                    {v.status === 'Live' ? dict.ventures.ctaLive : dict.ventures.ctaPreview} <ArrowUpRight size={15} />
                  </div>
                </div>
              </div>
            );

            return (
              <div
                key={v.name}
                className={`flex flex-col transition-[opacity,transform] duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {v.external ? (
                  <a href={v.href} target="_blank" rel="noopener noreferrer" className="block flex-1 no-underline">{card}</a>
                ) : (
                  <Link href={v.href} className="block flex-1 no-underline">{card}</Link>
                )}
                {v.id === 'autoleadss' && (
                  <a href="https://www.lashcartelcosmetics.com" target="_blank" rel="noopener noreferrer" className="mt-3 glass-card rounded-2xl p-4 flex items-center gap-4 no-underline group/ex">
                    <img src="/autoleads-images/lashcartel.webp" alt="Lash Cartel Cosmetics store built by AutoLeadss" loading="lazy" decoding="async" className="w-28 aspect-video object-cover object-top rounded-lg border border-white/10 shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#2a9d8f]">Example work · Website build</span>
                      <span className="block text-sm font-semibold text-[#f1f5f4]">Lash Cartel Cosmetics</span>
                      <span className="block text-xs text-[#a7b7b4]">Live client e-commerce store with Stripe checkout. Visit the store <ArrowUpRight size={12} className="inline" /></span>
                    </span>
                  </a>
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

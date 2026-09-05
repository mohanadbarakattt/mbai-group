import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, Clapperboard, Hammer, MessageCircle, Zap, Fingerprint, Share2 } from 'lucide-react';
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
    accent: '#b85c38',
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
    accent: '#9a4a2c',
    domain: 'tutapp.co',
    thumbnail: '/thumbnails/tut.png',
  },
  {
    id: 'ibni' as const,
    name: 'IBNI',
    status: 'Preview' as const,
    href: 'https://ibni.app',
    external: true,
    icon: <Hammer size={20} />,
    accent: '#2f6b4f',
    domain: 'ibni.app',
    thumbnail: '/thumbnails/ibni.png',
  },
  {
    id: 'virlo' as const,
    name: 'Virlo',
    status: 'Building' as const,
    href: '/virlo',
    icon: <Clapperboard size={20} />,
    accent: '#b85c38',
    domain: 'building',
    thumbnail: '/thumbnails/virlo.png',
  },
  {
    id: 'be3ly' as const,
    name: 'Be3ly',
    status: 'Building' as const,
    href: '/be3ly',
    icon: <Share2 size={20} />,
    accent: '#6b645c',
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
    <section id="ventures" ref={ref} className="py-28 px-6 bg-transparent border-y border-[#e6dfd2] relative">
      <div className="max-w-7xl mx-auto relative">
        <div className={`mb-16 max-w-2xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[#b85c38] text-xs font-semibold uppercase tracking-[0.18em] mb-3">{dict.ventures.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4 leading-tight text-[#14110f]">
            {dict.ventures.heading1} {dict.ventures.heading2}{' '}
            <span className="text-[#b85c38]">{dict.ventures.heading3}</span>
          </h2>
          <p className="text-[#6b645c] text-base md:text-lg leading-relaxed">{dict.ventures.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ventures.map((v, i) => {
            const card = (
              <div className="bg-[#fffdf8] border border-[#e6dfd2] rounded-xl p-7 h-full flex flex-col group relative overflow-hidden hover:border-[#d9d0c0] transition-colors">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-lg"
                      style={{ color: v.accent, background: `${v.accent}12`, border: `1px solid ${v.accent}28` }}
                    >
                      {v.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold leading-none text-[#14110f]">{v.name}</h3>
                      <p className="text-xs font-medium uppercase tracking-wide mt-1.5" style={{ color: v.accent }}>{v.tagline}</p>
                    </div>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 shrink-0"
                    style={v.status === 'Live'
                      ? { color: '#2f6b4f', background: 'rgba(47,107,79,0.08)', borderColor: 'rgba(47,107,79,0.28)' }
                      : { color: '#6b645c', background: 'rgba(20,17,15,0.03)', borderColor: '#e6dfd2' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: v.status === 'Live' ? '#2f6b4f' : v.accent }} />
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

                <p className="text-[#6b645c] text-sm leading-relaxed mb-5">{v.description}</p>

                <div className="mt-auto">
                  <div className="p-4 rounded-lg bg-[#f7f3ec] border border-[#e6dfd2] mb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: v.accent }}>{dict.ventures.whyItMatters}</p>
                    <p className="text-[#3a342e] text-sm leading-relaxed">{v.interpretation}</p>
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
                className={`transition-[opacity,transform] duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
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
          className={`mt-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '360ms' }}
        >
          <div className="bg-[#fffdf8] border border-[#e6dfd2] rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div
              className="p-3 rounded-lg shrink-0"
              style={{ color: '#b85c38', background: 'rgba(184,92,56,0.08)', border: '1px solid rgba(184,92,56,0.22)' }}
            >
              <Fingerprint size={24} />
            </div>
            <div>
              <p className="text-[#b85c38] text-xs font-semibold uppercase tracking-[0.18em] mb-2">{dict.ventures.ecosystemEyebrow}</p>
              <p className="text-[#3a342e] text-base md:text-lg leading-relaxed max-w-3xl">{dict.ventures.ecosystemBody}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ventures;

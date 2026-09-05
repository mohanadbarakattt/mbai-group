import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import {
  X, ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight, Zap, Loader2, PlayCircle,
  Mic, FileText, LineChart, Languages, MapPin, CreditCard, Clapperboard, Hammer, MessageCircle,
} from 'lucide-react';
import TiltCard from './effects/TiltCard';
import MediaSlot from './MediaSlot';

const SonicBoomDemo = lazy(() => import('./demos/SonicBoomDemo'));
const AtsDemo = lazy(() => import('./demos/AtsDemo'));
const MarketSentinelDemo = lazy(() => import('./demos/MarketSentinelDemo'));
const ThreeArabyDemo = lazy(() => import('./demos/ThreeArabyDemo'));
const MasrGuideDemo = lazy(() => import('./demos/MasrGuideDemo'));
const NeobankDemo = lazy(() => import('./demos/NeobankDemo'));
const VirloDemo = lazy(() => import('./demos/VirloDemo'));
const IbniDemo = lazy(() => import('./demos/IbniDemo'));

type Shot = { image: string; title: string; description: string };

interface Entry {
  id: string;
  title: string;
  subtitle: string;
  blurb: string;
  tags: string[];
  accent: string;
  icon: React.ReactNode;
  status: 'Live' | 'Preview';
  demo?: React.LazyExoticComponent<React.FC>;
  externalUrl?: string;
  pageUrl?: string;
  thumbnail?: string;
  interpretation: string;
  highlights?: string[];
  shots?: Shot[];
}

const ENTRIES: Entry[] = [
  {
    id: 'autoleads',
    title: 'AutoLeadss',
    subtitle: 'AI Lead Generation Infrastructure',
    blurb: 'A hybrid AI + human system that sources, qualifies, and books appointments for UAE real estate and MENA enterprises. Custom agents hunt leads 24/7; bilingual specialists close the loop.',
    tags: ['AI Agents', 'Lead Gen', 'Real Estate'],
    accent: '#e3a83f',
    icon: <Zap size={22} />,
    status: 'Live',
    externalUrl: 'https://autoleadss.com',
    thumbnail: '/thumbnails/autoleads.png',
    interpretation: 'Proof that frontier-grade AI drives revenue today — 200+ qualified leads delivered to real clients across three markets.',
  },
  {
    id: 'virlo',
    title: 'Virlo',
    subtitle: 'Egyptian Digital-Product Marketplace',
    blurb: 'Building an Egypt-first digital-product marketplace with InstaPay. The earlier AI video & image studio concept is parked (preview still available). No public marketplace URL yet.',
    tags: ['Marketplace', 'InstaPay', 'Egypt'],
    accent: '#f97316',
    icon: <Clapperboard size={22} />,
    status: 'Preview',
    demo: VirloDemo,
    pageUrl: '/virlo',
    thumbnail: '/thumbnails/virlo.png',
    interpretation: 'Product truth: marketplace pivot in progress; studio concept remains a parked preview only.',
  },
  {
    id: 'ibni',
    title: 'IBNI',
    subtitle: 'Egyptian Storefront Builder',
    blurb: 'IBNI ("build me" in Arabic) is an Egyptian storefront builder. Try the DEMO_MODE preview at ibni.app, or the on-site concept preview.',
    tags: ['Storefront', 'Egypt', 'Demo'],
    accent: '#10b981',
    icon: <Hammer size={22} />,
    status: 'Preview',
    demo: IbniDemo,
    pageUrl: '/ibni',
    externalUrl: 'https://ibni.app',
    thumbnail: '/thumbnails/ibni.png',
    interpretation: 'Storefront scaffolding for Egyptian merchants — live DEMO_MODE at ibni.app.',
  },
  {
    id: 'tut',
    title: 'TUT',
    subtitle: 'Boarding-Pass PWA',
    blurb: 'Live boarding-pass progressive web app at tutapp.co — keep your pass on your phone, ready at the gate. Not a coming-soon AI companion.',
    tags: ['PWA', 'Travel', 'Live'],
    accent: '#eab308',
    icon: <MessageCircle size={22} />,
    status: 'Live',
    pageUrl: '/tut',
    externalUrl: 'https://tutapp.co',
    thumbnail: '/thumbnails/tut.png',
    interpretation: 'A shipped Egyptian travel utility — open tutapp.co today.',
  },
  {
    id: 'sonicboom',
    title: 'Sonic Boom',
    subtitle: 'AI Music Deconstruction & Practice',
    blurb: 'SonicScribe uses AI to deconstruct any track into theory, chords, and tabs, then streams notes down a virtual fretboard or piano with microphone-powered pitch detection scoring your accuracy live.',
    tags: ['Gemini AI', 'Audio', 'Real-Time'],
    accent: '#b85c38',
    icon: <Mic size={22} />,
    status: 'Preview',
    demo: SonicBoomDemo,
    thumbnail: '/thumbnails/project-1.png',
    interpretation: 'Real-time signal processing married to LLM reasoning — the same class of problem as parsing unstructured enterprise data into decisions.',
    highlights: [
      'AI deconstructs any track into theory, chords & tabs',
      'Interactive Flow: falling notes on fretboard or piano',
      'Real-time mic pitch detection tracking accuracy to 97%',
      'Live waveform visualizer & detected-chord history',
    ],
    shots: [
      { image: '/sonicboom/homepage.png', title: 'Hear It. Master It.', description: 'SonicScribe deconstructs any audio into theory, chords, and tabs using AI, integrating SoundCloud, Spotify, and YouTube.' },
      { image: '/sonicboom/guitar-fretboard.png', title: 'Guitar Fretboard Stream', description: 'Notes stream down the fretboard in an F chord. Pitch precision at 94%, live signal visualizer, chord history F → Am → G.' },
      { image: '/sonicboom/piano-keys.png', title: 'Piano Mode — Live Keys', description: 'A full keyboard highlighting an Em chord — the same pitch-detection engine across instruments at 93% precision.' },
      { image: '/sonicboom/the-lab.png', title: 'The Lab — Deconstruction Studio', description: 'Paste a link and hit Deconstruct to extract full music theory, with a performance-analytics dashboard.' },
    ],
  },
  {
    id: 'ats',
    title: 'ATS Resume Fixer',
    subtitle: 'Beat the Robots. Land the Interview.',
    blurb: 'Analyzes your resume against a job description, injects missing keywords naturally, restructures bullets to score 90%+ on automated screeners, and drafts a tailored cover letter — while staying truthful.',
    tags: ['NLP', 'Keyword Opt.', 'Cover Letters'],
    accent: '#e3a83f',
    icon: <FileText size={22} />,
    status: 'Preview',
    demo: AtsDemo,
    thumbnail: '/thumbnails/project-2.png',
    interpretation: 'Adversarial thinking about automated systems — reverse-engineering how machines read humans, and putting that knowledge in the candidate\'s hands.',
    highlights: [
      'Solves the hidden-rejection problem before a human ever reads your resume',
      'Restructures bullets to score 90%+ on ATS screeners',
      'Generates tailored cover letters referencing real experience',
      'Safe & truthful — never invents facts',
    ],
    shots: [
      { image: '/ats/homepage.png', title: 'Beat the ATS', description: 'Analyzes your resume against the target job, boosts your match score, rewrites bullets, and drafts a cover letter in seconds.' },
      { image: '/ats/features.png', title: 'Optimization + Cover Letters', description: 'ATS optimization, tailored cover letters, and a safe-&-truthful guarantee that only refines wording.' },
    ],
  },
  {
    id: 'marketsentinel',
    title: 'Market Sentinel',
    subtitle: 'Real-time Fear & Greed Dashboard',
    blurb: 'A financial sentiment dashboard powered by grounded AI that calculates Fear & Greed for Gold, Silver, S&P 500, USD, and EUR — turning live market data and news into actionable buy/sell signals.',
    tags: ['Gemini 2.0', 'Grounding', 'Fintech'],
    accent: '#10b981',
    icon: <LineChart size={22} />,
    status: 'Preview',
    demo: MarketSentinelDemo,
    thumbnail: '/thumbnails/project-3.png',
    interpretation: 'Grounded AI for high-stakes domains — finance punishes hallucination, so every score is built on live, search-grounded data with verifiable sources.',
    highlights: [
      'Fear/Greed scores act as buy/sell signals',
      'Tracks Gold, Silver, S&P 500, USD & EUR in real time',
      'Search-grounded for live market data',
      'AI analysis explaining each market\'s sentiment',
    ],
    shots: [
      { image: '/marketsentinel/dashboard.png', title: 'Fear & Greed — Live Markets', description: 'Gold 90 (Extreme Greed), Silver 93, S&P 58, USD 38 (Fear), EUR 62 — each card with AI analysis of the drivers behind the score.' },
    ],
  },
  {
    id: '3araby',
    title: '3ARABY',
    subtitle: 'Egyptian Franco-Arabic Translator',
    blurb: 'An ML translator converting Franco-Arabic (Arabizi) into English and formal Arabic script, trained on Reddit-sourced Egyptian dialect data to understand slang, idioms, and cultural context.',
    tags: ['Machine Learning', 'Arabic NLP', 'Reddit Data'],
    accent: '#d9784f',
    icon: <Languages size={22} />,
    status: 'Preview',
    demo: ThreeArabyDemo,
    thumbnail: '/thumbnails/project-4.png',
    interpretation: 'Deep Arabic NLP that big tech ignores. Franco-Arabic is spoken by tens of millions and supported by almost no one — the group\'s core moat.',
    highlights: [
      'Trained on real Egyptian dialect data from Reddit',
      'Understands idioms, slang & cultural nuance',
      'Dual output: English + formal Arabic script',
      'Contextual explanations for every phrase',
    ],
    shots: [
      { image: '/3araby/francobridge.png', title: 'FrancoBridge — Greeting', description: '"Elsalam 3aleekom" → "Peace be upon you" + السلام عليكم, with context on how 3 maps to ع.' },
      { image: '/3araby/idiom-translation.png', title: 'Idiomatic Expressions', description: 'The model understands Egyptian idioms that literal translators miss entirely.' },
      { image: '/3araby/franco-guide.png', title: 'The Franco System', description: 'How numbers map to Arabic letters: 2=أ, 3=ع, 5=خ, 7=ح, 9=ص.' },
    ],
  },
  {
    id: 'masrguide',
    title: 'Masr Guide',
    subtitle: 'AI-Powered Local Intel for Egypt',
    blurb: 'Scrapes and analyzes thousands of Reddit, Quora, and Facebook discussions to give tourists and expats accurate, crowd-sourced intelligence on market prices and neighborhood safety across Egypt.',
    tags: ['Web Scraping', 'Gemini 2.0', 'Safety AI'],
    accent: '#f59e0b',
    icon: <MapPin size={22} />,
    status: 'Preview',
    demo: MasrGuideDemo,
    thumbnail: '/thumbnails/project-5.png',
    interpretation: 'Turning messy crowd-sourced data into trustworthy intelligence — data engineering plus AI judgment at scale, with confidence ratings.',
    highlights: [
      'Scrapes Reddit, Quora & Facebook for real pricing',
      'AI safety scoring for neighborhoods',
      'Price Check with best / average / overpriced ranges',
      'Smart advice with verified source citations',
    ],
    shots: [
      { image: '/masrguide/pricecheck.png', title: 'Price Check Engine', description: 'Fair-market EGP estimates cross-referenced from Reddit, Quora, and marketplace groups.' },
      { image: '/masrguide/safety-madinaty.png', title: 'Safety Map — Low Risk', description: 'Madinaty scores 92/100 — gated communities with 24/7 security from crowd-sourced data.' },
      { image: '/masrguide/safety-imbaba.png', title: 'Safety Map — Moderate Risk', description: 'Imbaba scores 52/100 with common risks identified from Reddit and Facebook reports.' },
    ],
  },
  {
    id: 'neobank',
    title: 'Neobank',
    subtitle: 'Next-Generation Digital Banking',
    blurb: 'A full-stack digital banking platform for MENA — dashboard, AI financial assistant, real-time analytics, virtual card management, and instant P2P transfers, wrapped in a sleek dark UI.',
    tags: ['React', 'Fintech', 'Full-Stack'],
    accent: '#6b645c',
    icon: <CreditCard size={22} />,
    status: 'Preview',
    demo: NeobankDemo,
    thumbnail: '/thumbnails/project-6.png',
    interpretation: 'Full-stack product craft for regulated markets — a complete banking experience for the MENA digital-banking wave, where fintech adoption is growing fastest in the world.',
    highlights: [
      'Real-time dashboard with revenue-flow visualization',
      'Nova AI assistant for spending insights',
      'Virtual card management with freeze controls',
      'Instant peer-to-peer transfers',
    ],
    shots: [
      { image: '/neobank/dashboard.png', title: 'Dashboard', description: 'Balances, revenue-flow charts, card details, and quick transfer actions at a glance.' },
      { image: '/neobank/analytics.png', title: 'Financial Analytics', description: 'Interactive donut charts, category breakdowns, and spending trends.' },
      { image: '/neobank/cards.png', title: 'Card Management', description: 'Manage virtual cards with balances and freeze/unfreeze controls.' },
    ],
  },
];

const DemoFallback: React.FC = () => (
  <div className="w-full h-[420px] flex items-center justify-center text-[#6b645c]" style={{ background: '#f0ebe1' }}>
    <Loader2 className="animate-spin mr-2" size={18} /> Loading live demo…
  </div>
);

const Demos: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  const [shotIndex, setShotIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.05 });
    obs.observe(el);
    const check = () => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) { setVisible(true); removeEventListener('scroll', check); } };
    check(); addEventListener('scroll', check, { passive: true });
    return () => { obs.disconnect(); removeEventListener('scroll', check); };
  }, []);

  // Keep the URL in sync with the open demo so any modal is shareable/deep-linkable.
  const syncUrl = useCallback((id: string | null) => {
    try {
      const url = new URL(window.location.href);
      if (id) url.searchParams.set('demo', id); else url.searchParams.delete('demo');
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch { /* no-op in non-browser contexts */ }
  }, []);

  const openDemo = useCallback((id: string) => { setActive(id); setShotIndex(0); syncUrl(id); }, [syncUrl]);
  const closeDemo = useCallback(() => { setActive(null); syncUrl(null); }, [syncUrl]);

  // Shareable deep-link: /?demo=<id> auto-opens that demo's modal on load.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('demo');
    if (id && ENTRIES.some((e) => e.id === id && e.demo)) {
      setActive(id); setShotIndex(0);
      requestAnimationFrame(() => document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDemo(); };
    if (active) window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [active, closeDemo]);

  const entry = ENTRIES.find((e) => e.id === active) || null;
  const Demo = entry?.demo;

  return (
    <section id="demos" className="py-24 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-14">
          <p className="text-[#b85c38] text-xs font-semibold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b85c38] animate-pulse" /> Live Work
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
            Ten products. <span className="text-[#b85c38]">Try them right here.</span>
          </h2>
          <p className="text-[#6b645c] max-w-2xl">
            Every card below opens a real, interactive demo — click any one and use it live. From lead generation and virality
            intelligence to Arabic NLP, fintech, and AI music. No screenshots-only tours; the actual thing, running in your browser.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
          {ENTRIES.map((e, i) => {
            const inner = (
              <div className="bg-[#fffdf8] border border-[#e6dfd2] rounded-2xl p-6 flex flex-col h-full group relative overflow-hidden cursor-pointer">
                <span
                  className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5"
                  style={e.status === 'Live'
                    ? { color: '#2f6b4f', background: 'rgba(47,107,79,0.08)', borderColor: 'rgba(47,107,79,0.28)' }
                    : { color: '#6b645c', background: 'rgba(20,17,15,0.03)', borderColor: '#e6dfd2' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: e.status === 'Live' ? '#34d399' : e.accent }} />
                  {e.status === 'Live' ? 'Live Product' : 'Interactive Demo'}
                </span>

                <div className="flex items-start gap-4 mb-4 pr-24">
                  <div className="p-3 rounded-xl shrink-0 group-hover:scale-110 transition-transform"
                    style={{ color: e.accent, background: `${e.accent}14`, border: `1px solid ${e.accent}33` }}>
                    {e.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold leading-tight mb-1">{e.title}</h3>
                    <p className="text-xs font-medium uppercase tracking-wide" style={{ color: e.accent }}>{e.subtitle}</p>
                  </div>
                </div>

                <MediaSlot className="mb-5" accent={e.accent} icon={e.icon} label={e.title} alt={`${e.title} — ${e.subtitle}`} thumbnail={e.thumbnail} />

                <p className="text-[#6b645c] text-sm mb-5 flex-grow leading-relaxed line-clamp-3">{e.blurb}</p>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {e.tags.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-1 rounded bg-[#f7f3ec] text-[#6b645c] border border-[#e6dfd2]">{t}</span>
                    ))}
                  </div>
                  <div className="w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 text-sm transition-all border"
                    style={{ borderColor: `${e.accent}44`, color: e.accent, background: `${e.accent}0f` }}>
                    {e.externalUrl ? <><ExternalLink size={15} /> Visit the live product</> : <><PlayCircle size={15} /> Launch interactive demo</>}
                  </div>
                </div>
              </div>
            );

            const wrap = `transition-[opacity,transform] duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;
            const style = { transitionDelay: `${(i % 3) * 90 + Math.floor(i / 3) * 40}ms` };

            return (
              <div key={e.id} className={wrap} style={style}>
                <TiltCard className="h-full" max={6}>
                  {e.externalUrl ? (
                    <a href={e.externalUrl} target="_blank" rel="noopener noreferrer" className="block h-full no-underline">{inner}</a>
                  ) : (
                    <div onClick={() => openDemo(e.id)} className="h-full">{inner}</div>
                  )}
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {entry && (
        <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center px-3 py-6 overflow-y-auto">
          <div className="absolute inset-0 bg-[#14110f]/45 backdrop-blur-sm" onClick={closeDemo} />
          <div className="relative w-full max-w-5xl bg-[#fffdf8] border border-[#e6dfd2] rounded-2xl shadow-[0_24px_80px_-24px_rgba(20,17,15,0.35)] ring-1 ring-[#e6dfd2]/80 my-auto" style={{ background: '#fffdf8' }}>
            {/* Header */}
            <div className="p-5 md:p-6 flex justify-between items-start border-b border-[#e6dfd2] sticky top-0 z-10 rounded-t-2xl" style={{ background: '#fffdf8' }}>
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl shrink-0" style={{ color: entry.accent, background: `${entry.accent}16`, border: `1px solid ${entry.accent}33` }}>{entry.icon}</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight">{entry.title}</h3>
                  <p className="text-sm" style={{ color: entry.accent }}>{entry.subtitle}</p>
                </div>
              </div>
              <button onClick={closeDemo} className="p-2 hover:bg-[#f0ebe1] rounded-full text-[#6b645c] hover:text-[#14110f] transition-colors shrink-0"><X size={22} /></button>
            </div>

            <div className="p-5 md:p-6 space-y-6">
              {/* Interactive demo */}
              {Demo && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a8278] mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: entry.accent }} /> Interactive — try it live
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-[#e6dfd2]" style={{ boxShadow: `0 0 60px -20px ${entry.accent}66` }}>
                    <Suspense fallback={<DemoFallback />}><Demo /></Suspense>
                  </div>
                  {entry.pageUrl && (
                    <Link href={entry.pageUrl} className="inline-flex items-center gap-1.5 text-xs mt-3 no-underline" style={{ color: entry.accent }}>
                      Open the full {entry.title} page <ArrowUpRight size={13} />
                    </Link>
                  )}
                </div>
              )}

              <p className="text-[#6b645c] leading-relaxed text-sm md:text-base">{entry.blurb}</p>

              <div className="p-4 rounded-xl border" style={{ background: `${entry.accent}0d`, borderColor: `${entry.accent}2e` }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: entry.accent }}>Interpretation</p>
                <p className="text-[#3a342e] text-sm leading-relaxed">{entry.interpretation}</p>
              </div>

              {entry.highlights && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {entry.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#f7f3ec] border border-[#e6dfd2]">
                      <Zap size={14} className="mt-0.5 shrink-0" style={{ color: entry.accent }} />
                      <span className="text-[#6b645c] text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Screenshots */}
              {entry.shots && entry.shots.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a8278] mb-2">From the live product</p>
                  <div className="relative rounded-xl overflow-hidden border border-[#e6dfd2]">
                    <img src={entry.shots[shotIndex].image} alt={entry.shots[shotIndex].title} className="w-full object-contain bg-[#f0ebe1]" />
                    {entry.shots.length > 1 && (
                      <>
                        <button onClick={() => setShotIndex((i) => (i === 0 ? entry.shots!.length - 1 : i - 1))} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#14110f]/70 hover:bg-[#14110f] rounded-full flex items-center justify-center text-[#fffdf8]"><ChevronLeft size={18} /></button>
                        <button onClick={() => setShotIndex((i) => (i === entry.shots!.length - 1 ? 0 : i + 1))} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#14110f]/70 hover:bg-[#14110f] rounded-full flex items-center justify-center text-[#fffdf8]"><ChevronRight size={18} /></button>
                      </>
                    )}
                  </div>
                  <div className="p-3.5 mt-3 rounded-xl bg-[#f7f3ec] border border-[#e6dfd2]">
                    <h4 className="font-bold text-sm mb-1">{entry.shots[shotIndex].title}</h4>
                    <p className="text-[#6b645c] text-sm leading-relaxed">{entry.shots[shotIndex].description}</p>
                  </div>
                  {entry.shots.length > 1 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                      {entry.shots.map((s, i) => (
                        <button key={i} onClick={() => setShotIndex(i)} className="shrink-0 rounded-lg overflow-hidden border-2 transition-all" style={{ borderColor: i === shotIndex ? entry.accent : '#e6dfd2', opacity: i === shotIndex ? 1 : 0.5 }}>
                          <img src={s.image} alt={s.title} className="w-20 h-12 object-cover object-top" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-1">
                {entry.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-[#f7f3ec] text-xs text-[#6b645c] border border-[#e6dfd2]">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Demos;

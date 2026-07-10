import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import {
  X, ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Loader2, PlayCircle,
  Mic, FileText, LineChart, Languages, MapPin, CreditCard, Flame, Hammer, GraduationCap,
} from 'lucide-react';
import TiltCard from './effects/TiltCard';

const SonicBoomDemo = lazy(() => import('./demos/SonicBoomDemo'));
const AtsDemo = lazy(() => import('./demos/AtsDemo'));
const MarketSentinelDemo = lazy(() => import('./demos/MarketSentinelDemo'));
const ThreeArabyDemo = lazy(() => import('./demos/ThreeArabyDemo'));
const MasrGuideDemo = lazy(() => import('./demos/MasrGuideDemo'));
const NeobankDemo = lazy(() => import('./demos/NeobankDemo'));
const VirloDemo = lazy(() => import('./demos/VirloDemo'));
const IbniDemo = lazy(() => import('./demos/IbniDemo'));
const TutDemo = lazy(() => import('./demos/TutDemo'));

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
    accent: '#6366f1',
    icon: <Sparkles size={22} />,
    status: 'Live',
    externalUrl: 'https://autoleadss.com',
    thumbnail: '/autoleads-images/mbai-hero-bg-opt.jpg',
    interpretation: 'Proof that frontier-grade AI drives revenue today — 200+ qualified leads delivered to real clients across three markets.',
  },
  {
    id: 'virlo',
    title: 'Virlo',
    subtitle: 'Virality Intelligence Engine',
    blurb: 'Scans millions of short-form posts in real time, detects trends 48–72h before they peak, and hands creators and brands a concrete post brief with a virality score for every emerging format.',
    tags: ['Trend AI', 'Short-Form', 'MENA'],
    accent: '#f97316',
    icon: <Flame size={22} />,
    status: 'Preview',
    demo: VirloDemo,
    pageUrl: '/virlo',
    interpretation: 'Applies the same signal-extraction discipline used in frontier-model data pipelines to the chaos of social media.',
  },
  {
    id: 'ibni',
    title: 'IBNI',
    subtitle: 'The AI App Builder',
    blurb: 'IBNI ("build me" in Arabic) turns a plain-language idea into a working application — architecting, generating, and previewing it live, in Arabic or English. Software creation for founders who don\'t code.',
    tags: ['No-Code', 'Codegen', 'Bilingual'],
    accent: '#10b981',
    icon: <Hammer size={22} />,
    status: 'Preview',
    demo: IbniDemo,
    pageUrl: '/ibni',
    interpretation: 'RLHF-aligned generation, pointed at software: IBNI architects apps the way a senior engineer would — so the next hundred million builders can ship in Arabic or English, not Python.',
  },
  {
    id: 'tut',
    title: 'TUT',
    subtitle: 'AI Learning Companion',
    blurb: 'Named after Egypt\'s boy king, TUT is a personal AI tutor for MENA\'s 100M+ students — explaining any concept in Arabic or English, adapting to each learner\'s pace, turning curricula into conversations.',
    tags: ['EdTech', 'Arabic', 'Tutoring'],
    accent: '#eab308',
    icon: <GraduationCap size={22} />,
    status: 'Preview',
    demo: TutDemo,
    pageUrl: '/tut',
    interpretation: 'Education is MENA\'s biggest lever. TUT applies alignment-grade AI safety and pedagogy to the region\'s students.',
  },
  {
    id: 'sonicboom',
    title: 'Sonic Boom',
    subtitle: 'AI Music Deconstruction & Practice',
    blurb: 'SonicScribe uses AI to deconstruct any track into theory, chords, and tabs, then streams notes down a virtual fretboard or piano with microphone-powered pitch detection scoring your accuracy live.',
    tags: ['Gemini AI', 'Audio', 'Real-Time'],
    accent: '#22d3ee',
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
    accent: '#6366f1',
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
    accent: '#a855f7',
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
    accent: '#38bdf8',
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
  <div className="w-full h-[420px] flex items-center justify-center text-[#8b93a7]" style={{ background: '#0a0e17' }}>
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
      <div className="aurora w-[500px] h-[500px] top-10 -right-40" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.28), transparent 60%)' }} />
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-14">
          <p className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Live Work
          </p>
          <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4">
            Ten products. <span className="text-gradient">Try them right here.</span>
          </h2>
          <p className="text-[#8b93a7] max-w-2xl">
            Every card below opens a real, interactive demo — click any one and use it live. From lead generation and virality
            intelligence to Arabic NLP, fintech, and AI music. No screenshots-only tours; the actual thing, running in your browser.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1400px' }}>
          {ENTRIES.map((e, i) => {
            const inner = (
              <div className="glass-strong card-fx glow-border rounded-2xl p-6 flex flex-col h-full group relative overflow-hidden cursor-pointer">
                <span
                  className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5"
                  style={e.status === 'Live'
                    ? { color: '#34d399', background: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.4)' }
                    : { color: '#93a4c8', background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)' }}
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

                <div className="w-full aspect-video rounded-lg mb-5 relative overflow-hidden border border-white/10">
                  {e.thumbnail ? (
                    <img src={e.thumbnail} alt={e.title} className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  ) : (
                    <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 40%, ${e.accent}22, #0a0e17 70%)` }}>
                      <div className="absolute inset-0 grid-fade opacity-60" />
                      <div className="absolute inset-0 flex items-center justify-center" style={{ color: e.accent }}>
                        <div className="scale-[2.2] opacity-30">{e.icon}</div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1022]/70 to-transparent" />
                </div>

                <p className="text-[#8b93a7] text-sm mb-5 flex-grow leading-relaxed line-clamp-3">{e.blurb}</p>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {e.tags.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-1 rounded bg-white/[0.04] text-[#8b93a7] border border-white/10">{t}</span>
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
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={closeDemo} />
          <div className="relative w-full max-w-5xl glass-strong rounded-2xl border border-white/10 shadow-2xl my-auto" style={{ background: '#0e1533' }}>
            {/* Header */}
            <div className="p-5 md:p-6 flex justify-between items-start border-b border-white/10 sticky top-0 z-10 rounded-t-2xl" style={{ background: '#0e1533' }}>
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl shrink-0" style={{ color: entry.accent, background: `${entry.accent}16`, border: `1px solid ${entry.accent}33` }}>{entry.icon}</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight">{entry.title}</h3>
                  <p className="text-sm" style={{ color: entry.accent }}>{entry.subtitle}</p>
                </div>
              </div>
              <button onClick={closeDemo} className="p-2 hover:bg-white/10 rounded-full text-[#8b93a7] hover:text-white transition-colors shrink-0"><X size={22} /></button>
            </div>

            <div className="p-5 md:p-6 space-y-6">
              {/* Interactive demo */}
              {Demo && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b6478] mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: entry.accent }} /> Interactive — try it live
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-white/10" style={{ boxShadow: `0 0 60px -20px ${entry.accent}66` }}>
                    <Suspense fallback={<DemoFallback />}><Demo /></Suspense>
                  </div>
                  {entry.pageUrl && (
                    <Link href={entry.pageUrl} className="inline-flex items-center gap-1.5 text-xs mt-3 no-underline" style={{ color: entry.accent }}>
                      Open the full {entry.title} page <ArrowUpRight size={13} />
                    </Link>
                  )}
                </div>
              )}

              <p className="text-[#aab2c5] leading-relaxed text-sm md:text-base">{entry.blurb}</p>

              <div className="p-4 rounded-xl border" style={{ background: `${entry.accent}0d`, borderColor: `${entry.accent}2e` }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: entry.accent }}>Interpretation</p>
                <p className="text-[#cdd4e2] text-sm leading-relaxed">{entry.interpretation}</p>
              </div>

              {entry.highlights && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {entry.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/10">
                      <Sparkles size={14} className="mt-0.5 shrink-0" style={{ color: entry.accent }} />
                      <span className="text-[#aab2c5] text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Screenshots */}
              {entry.shots && entry.shots.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b6478] mb-2">From the live product</p>
                  <div className="relative rounded-xl overflow-hidden border border-white/10">
                    <img src={entry.shots[shotIndex].image} alt={entry.shots[shotIndex].title} className="w-full object-contain bg-black/60" />
                    {entry.shots.length > 1 && (
                      <>
                        <button onClick={() => setShotIndex((i) => (i === 0 ? entry.shots!.length - 1 : i - 1))} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/70 hover:bg-black rounded-full flex items-center justify-center text-white backdrop-blur-sm"><ChevronLeft size={18} /></button>
                        <button onClick={() => setShotIndex((i) => (i === entry.shots!.length - 1 ? 0 : i + 1))} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/70 hover:bg-black rounded-full flex items-center justify-center text-white backdrop-blur-sm"><ChevronRight size={18} /></button>
                      </>
                    )}
                  </div>
                  <div className="p-3.5 mt-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <h4 className="font-bold text-sm mb-1">{entry.shots[shotIndex].title}</h4>
                    <p className="text-[#8b93a7] text-sm leading-relaxed">{entry.shots[shotIndex].description}</p>
                  </div>
                  {entry.shots.length > 1 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                      {entry.shots.map((s, i) => (
                        <button key={i} onClick={() => setShotIndex(i)} className="shrink-0 rounded-lg overflow-hidden border-2 transition-all" style={{ borderColor: i === shotIndex ? entry.accent : 'rgba(255,255,255,0.1)', opacity: i === shotIndex ? 1 : 0.5 }}>
                          <img src={s.image} alt={s.title} className="w-20 h-12 object-cover object-top" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-1">
                {entry.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/[0.04] text-xs text-[#aab2c5] border border-white/10">{t}</span>
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

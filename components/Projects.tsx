import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, Play, MessageSquare, Building2, Mic, PlayCircle, ChevronLeft, ChevronRight, Sparkles, CreditCard, BarChart3, Bot, ArrowLeftRight, LayoutDashboard } from 'lucide-react';
import { Link } from 'wouter';
import { Project } from '../types';
import TiltCard from './effects/TiltCard';

const projects: Project[] = [
  {
    id: 'p1',
    ctaLabel: 'See the Music AI Demo',
    title: 'Sonic Boom',
    subtitle: 'AI Music Deconstruction & Practice Platform',
    description: 'SonicScribe uses Gemini AI to deconstruct any audio source — from YouTube, SoundCloud, or Spotify links — into music theory, chords, and tabs instantly. Features a real-time Interactive Flow mode where notes stream down a virtual fretboard or piano, with microphone-powered pitch detection tracking your accuracy as you play along.',
    tags: ['Gemini AI', 'Audio Processing', 'Music Theory', 'Real-Time', 'WebAudio API', 'SaaS'],
    iconName: 'mic',
    thumbnail: '/thumbnails/project-1.png',
    interpretation: 'What this demonstrates: real-time signal processing married to LLM reasoning. Deconstructing audio into structured music theory is the same class of problem as parsing unstructured enterprise data into decisions — perception, structure, feedback loop.',
    highlights: [
      'Gemini AI deconstructs any track into theory, chords & guitar/piano tabs',
      'Accepts YouTube, SoundCloud & Spotify links or direct file uploads',
      'Interactive Flow mode with falling notes on fretboard or piano keyboard',
      'Real-time microphone pitch detection tracking accuracy up to 97%',
      'Signal visualizer with live audio waveform display',
      'Detected chord history tracking (F, Am, G, C, Em progressions)',
      'Guitar & Piano instrument switching with adjustable flow pace',
      'The Lab studio for deconstructing tracks with performance analytics'
    ],
    demos: [
      { image: '/sonicboom/homepage.png', title: 'Hear It. Master It.', description: 'SonicScribe homepage — "The AI Music Revolution is Here." Deconstructs any audio source into theory, chords, and tabs using Gemini AI. Integrates with SoundCloud, Spotify, and YouTube. Live activity ticker shows users mastering tracks in real-time.' },
      { image: '/sonicboom/mic-request.png', title: 'Microphone Access for Live Detection', description: 'The platform requests microphone access to enable real-time pitch detection — listening to you play and scoring your accuracy against the original track\'s chord progression.' },
      { image: '/sonicboom/live-stage-ready.png', title: 'Interactive Flow — Ready to Practice', description: 'The Live Stage with Interactive Flow mode ready to launch. Notes stream down the fretboard while you play along. Features signal visualizer, real-time pitch precision metrics, and goal progress tracking.' },
      { image: '/sonicboom/guitar-fretboard.png', title: 'Guitar Fretboard Stream — Active Session', description: 'Active practice session with notes (1, 2, 3) streaming down the fretboard in an F chord. Pitch precision at 94%, signal visualizer showing live audio input, and detected chord history showing F → Am → G progression.' },
      { image: '/sonicboom/guitar-progress.png', title: 'Guitar — High Accuracy Tracking', description: 'Pitch precision reaching 97% as the player follows the fretboard stream. Chord detection history expands to F → Am → G → C → Em, showing the AI tracking the full chord progression in real-time.' },
      { image: '/sonicboom/piano-keys.png', title: 'Piano Mode — Live Keys', description: 'Switching to Piano mode reveals a full keyboard interface with highlighted keys showing an Em chord. The same pitch detection engine works across instruments — 93% precision with chord history tracking.' },
      { image: '/sonicboom/the-lab.png', title: 'The Lab — Track Deconstruction Studio', description: 'The Studio mode where you paste a YouTube, SoundCloud, or Spotify link and hit "Deconstruct" to extract full music theory. Includes performance analytics dashboard with history tracking.' }
    ]
  },
  {
    id: 'p2',
    ctaLabel: 'See the ATS Tool Demo',
    title: 'ATS Resume Fixer',
    subtitle: 'Beat the Robots. Land the Interview.',
    description: 'Most job applications never reach a human — they get silently rejected by Applicant Tracking Systems (ATS) that scan for specific keywords, formatting, and structure. This AI tool solves that problem by analyzing your resume against the target job description, injecting missing keywords naturally, restructuring bullet points to match what ATS algorithms look for, and generating a tailored cover letter — all while staying truthful to your actual experience.',
    tags: ['AI', 'NLP', 'Resume Parsing', 'Keyword Optimization', 'Cover Letters', 'SaaS'],
    iconName: 'message',
    thumbnail: '/thumbnails/project-2.png',
    interpretation: 'What this demonstrates: adversarial thinking about automated systems. Having built the screeners\' logic-class at frontier labs, this tool reverse-engineers how machines read humans — and puts that knowledge in the candidate\'s hands, truthfully.',
    highlights: [
      'Solves the hidden rejection problem — most resumes are filtered out by ATS before a human ever sees them',
      'AI analyzes your resume against the target job description for keyword gaps',
      'Restructures and rewrites bullet points to score 90%+ on automated screeners',
      'Generates tailored cover letters that reference your actual experience & the company\'s needs',
      'Safe & Truthful — never invents facts, only refines wording and suggests metrics to add',
      'Bridges the gap between qualified candidates and the interviews they deserve'
    ],
    demos: [
      { image: '/ats/homepage.png', title: 'Beat the ATS. Land the Interview.', description: 'The core problem: qualified candidates get rejected by robots before a human ever reads their resume. This tool analyzes your resume against the target job description, boosts your match score, rewrites bullets, and generates a tailored cover letter — in seconds.' },
      { image: '/ats/features.png', title: 'ATS Optimization + Tailored Cover Letters', description: 'Three pillars: (1) ATS Optimization — restructures your resume and injects missing keywords naturally to score 90%+ on automated screeners. (2) Tailored Cover Letters — generates specific, confident letters referencing your actual experience. (3) Safe & Truthful — never invents facts, only refines wording and suggests placeholders for metrics you need to add.' }
    ]
  },
  {
    id: 'p3',
    ctaLabel: 'See the Fintech Dashboard',
    title: 'Market Sentinel',
    subtitle: 'Real-time Fear & Greed Sentiment Dashboard',
    description: 'A real-time financial sentiment dashboard powered by Gemini 2.0 and Google Search Grounding that calculates Fear & Greed indicators for Gold, Silver, S&P 500, US Dollar, and Euro. These indicators act as demand/supply signals — Extreme Greed (90+) suggests strong buying pressure and potential overvaluation, while Fear (below 40) signals selling pressure and potential buying opportunities. The AI analyzes live market data, price movements, and news sentiment to generate actionable analysis.',
    tags: ['Gemini 2.0', 'Google Search Grounding', 'Fintech', 'Sentiment Analysis', 'Real-Time Data'],
    iconName: 'building',
    thumbnail: '/thumbnails/project-3.png',
    interpretation: 'What this demonstrates: grounded AI for high-stakes domains. Finance punishes hallucination — so every score here is built on live, search-grounded data. This is the architecture MENA fintechs need: LLM reasoning with verifiable sources.',
    highlights: [
      'Fear/Greed scores act as buy/sell signals — Extreme Greed = overbought, Fear = potential buying opportunity',
      'Tracks Gold (XAU), Silver (XAG), S&P 500, US Dollar Index & Euro (EUR/USD) in real-time',
      'Powered by Gemini 2.0 with Google Search Grounding for live market data',
      'Color-coded gauge visualizations: green (greed/demand) to red (fear/supply)',
      'AI-generated analysis explaining what\'s driving each market\'s sentiment',
      'Live price tracking with percentage changes and last-updated timestamps'
    ],
    demos: [
      { image: '/marketsentinel/dashboard.png', title: 'Fear & Greed Dashboard — Live Markets', description: 'Full dashboard showing: Gold at $5,130 scoring 90 (Extreme Greed — strong buying/demand pressure), Silver at $86 scoring 93 (Extreme Greed — prices doubling), S&P 500 at 6,958 scoring 58 (Greed — cautiously optimistic), US Dollar at 96.60 scoring 38 (Fear — sell pressure as investors move away), Euro at $1.19 scoring 62 (Greed — capitalizing on dollar weakness). Each card includes AI analysis explaining the drivers behind the sentiment score.' }
    ]
  },
  {
    id: 'p4',
    ctaLabel: 'See the Arabic NLP Demo',
    title: '3ARABY',
    subtitle: 'Egyptian Franco-Arabic Translator',
    description: 'An ML-powered translator that converts Franco-Arabic (Arabizi) text into both English and formal Arabic script. Built using multimodal NLP techniques and trained on Reddit-sourced Egyptian dialect data to deeply understand slang, idioms, and cultural context — not just word-by-word translation, but true meaning extraction.',
    tags: ['Machine Learning', 'NLP', 'Reddit Data', 'Multimodal AI', 'Arabic NLP', 'Python'],
    iconName: 'message',
    thumbnail: '/thumbnails/project-4.png',
    interpretation: 'What this demonstrates: deep Arabic NLP capability that big tech ignores. Franco-Arabic is spoken by tens of millions and supported by almost no one. Building for it required real dialect data, cultural context, and linguistic rigour — the group\'s core moat.',
    highlights: [
      'Trained on real Egyptian dialect data scraped from Reddit communities',
      'Multimodal context engine that understands idioms, slang & cultural nuance',
      'Dual output: accurate English translation + formal Arabic script',
      'Contextual explanations breaking down why each phrase translates the way it does',
      'Built-in Franco System guide teaching users the number-to-letter mapping',
      'Handles negation particles, abbreviations & colloquial expressions natively'
    ],
    demos: [
      { image: '/3araby/francobridge.png', title: 'FrancoBridge — Greeting Translation', description: '"Elsalam 3aleekom" → "Peace be upon you" + السلام عليكم. The ML model recognizes the standard greeting and provides cultural context explaining the numeral \'3\' maps to the Arabic letter عين.' },
      { image: '/3araby/idiom-translation.png', title: 'Idiomatic Expression Handling', description: '"msh gaya ma3aya ska 5ales ya zmely" → "It\'s not working for me at all, my friend." The model understands Egyptian idioms — \'ska\' isn\'t literal, and \'5ales\' means \'at all\' — context that basic translators miss entirely.' },
      { image: '/3araby/context-translation.png', title: 'Contextual Slang Decoding', description: '"matgeeb mn el 5olasa ya sa7by" → "Just get to the point, my friend." The model trained on Reddit data recognizes \'5olasa\' as summary/essence and \'sa7by\' as the colloquial form of \'my friend\'.' },
      { image: '/3araby/negation.png', title: 'Negation & Grammar Understanding', description: '"mesh fahem 7aga" → "I don\'t understand anything." The ML model correctly handles \'mesh\' as a negation particle and \'7aga\' as something/anything — grammatical nuance from real-world training data.' },
      { image: '/3araby/translator-empty.png', title: 'Clean Translation Interface', description: 'Minimal, intuitive UI with quick-try suggestions like "ezayek?" (How are you?), "3amel eh?" (What are you doing?), and "mesh fahem 7aga" — real Egyptian phrases, not textbook Arabic.' },
      { image: '/3araby/franco-guide.png', title: 'The Franco System Guide', description: 'Built-in reference showing how numbers map to Arabic letters: 2=أ, 3=ع, 5=خ, 7=ح, 9=ص, 8=ق. Educates users on the Franco writing system that emerged in the 90s when keyboards lacked Arabic characters.' }
    ]
  },
  {
    id: 'p5',
    ctaLabel: 'See the Local Intel Demo',
    title: 'Masr Guide',
    subtitle: 'AI-Powered Local Intel for Egypt',
    description: 'An AI-powered platform that scrapes and analyzes thousands of real discussions from Reddit, Quora, and Facebook groups to give tourists and expats accurate, crowd-sourced intelligence on market prices and neighborhood safety across Egypt. No guesswork — just data-driven insights from people who actually live there.',
    tags: ['AI', 'Web Scraping', 'Reddit API', 'Quora', 'Facebook Data', 'Gemini 2.0'],
    iconName: 'building',
    thumbnail: '/thumbnails/project-5.png',
    interpretation: 'What this demonstrates: turning messy crowd-sourced data into trustworthy intelligence. Thousands of Reddit, Quora, and Facebook discussions become price ranges and safety scores with confidence ratings — data engineering plus AI judgment at scale.',
    highlights: [
      'Scrapes Reddit, Quora & Facebook groups for real local pricing data',
      'AI safety scoring system analyzing crowd-sourced neighborhood reports',
      'Interactive safety map with risk zones, common risks & safe hours',
      'Price Check engine with best deal / average / overpriced ranges in EGP',
      'Smart Advice powered by Gemini 2.0 Flash with verified source citations',
      'Essential tips section curated from expat community discussions'
    ],
    demos: [
      { image: '/masrguide/homepage.png', title: 'Navigate Egypt Like a Local', description: 'The homepage provides AI-powered local intel with real-time price estimates and neighborhood safety scores — all derived from analyzing thousands of local discussions on Reddit, Quora, and Facebook.' },
      { image: '/masrguide/pricecheck.png', title: 'Price Check Engine', description: 'Instant fair-market price estimates for any product or service in Egypt. The AI cross-references pricing data scraped from Reddit threads, Quora answers, and Facebook marketplace groups.' },
      { image: '/masrguide/price-marlboro.png', title: 'Price Intelligence — Verified Sources', description: 'Marlboro Gold priced at 102-115 EGP with Smart Advice from Gemini 2.0 Flash. Sources include official price lists, news outlets like Egypt Independent & Al-Masry Al-Youm — not just user opinions.' },
      { image: '/masrguide/price-corn.png', title: 'Street Food Pricing — Community Data', description: 'Grilled corn (Koz Dura) priced 10-50 EGP based on location data from street market observations, Talabat Egypt, and local social media reports on food inflation. High confidence rating.' },
      { image: '/masrguide/safety-imbaba.png', title: 'Safety Map — Moderate Risk Area', description: 'Imbaba, Giza scores 52/100 (Moderate Risk). The AI analyzed Reddit and Facebook reports to identify common risks like pickpocketing, phone snatching, and verbal harassment — with recommended safe hours.' },
      { image: '/masrguide/safety-madinaty.png', title: 'Safety Map — Low Risk Area', description: 'Madinaty scores 92/100 (Low Risk). The system recognizes gated communities with 24/7 security from crowd-sourced data, noting only minor risks like traffic accidents and rare petty theft.' },
      { image: '/masrguide/safety-madinaty-detail.png', title: 'Detailed Safety Analysis', description: 'Full neighborhood summary with CCTV monitoring, private security patrols, and access control details — all extracted from real resident experiences shared on Reddit and community forums.' }
    ]
  },
  {
    id: 'p6',
    ctaLabel: 'See the Neobank Demo',
    title: 'Neobank',
    subtitle: 'Next-Generation Digital Banking',
    description: 'A full-stack digital banking platform engineered for the MENA region. Features an intuitive dashboard, AI-powered financial assistant, real-time analytics, virtual card management, and instant peer-to-peer transfers — all wrapped in a sleek, dark-themed UI.',
    tags: ['React', 'TypeScript', 'Fintech', 'AI Assistant', 'UI/UX', 'Full-Stack'],
    iconName: 'message',
    thumbnail: '/thumbnails/project-6.png',
    interpretation: 'What this demonstrates: full-stack product craft for regulated markets. A complete banking experience — dashboard, cards, analytics, AI assistant — designed for the MENA digital-banking wave, where fintech adoption is growing fastest in the world.',
    highlights: [
      'Real-time financial dashboard with revenue flow visualization',
      'AI-powered assistant (Nova AI) for spending insights & budgeting',
      'Virtual card management with freeze/unfreeze controls',
      'Spending analytics with category breakdown & donut charts',
      'Instant peer-to-peer money transfers',
      'Transaction history with smart filtering & search'
    ],
    demos: [
      { image: '/neobank/dashboard.png', title: 'Dashboard', description: 'Real-time overview of balances, revenue flow charts, card details, and quick transfer actions — all at a glance.' },
      { image: '/neobank/transactions.png', title: 'Transactions', description: 'Full transaction history with merchant details, smart categorization, date tracking, and expense/income filtering.' },
      { image: '/neobank/cards.png', title: 'Card Management', description: 'Manage multiple virtual cards with real-time balance display, freeze/unfreeze controls, and one-click card creation.' },
      { image: '/neobank/analytics.png', title: 'Financial Analytics', description: 'Deep spending insights with interactive donut charts, category breakdowns, average transaction metrics, and spending trends.' },
      { image: '/neobank/assistant.png', title: 'AI Assistant', description: 'Nova AI — a built-in financial assistant that answers questions about spending, budgets, and transactions in natural language.' },
      { image: '/neobank/activity.png', title: 'Activity & Transfers', description: 'Recent activity feed with quick money transfer functionality and premium plan upsell integration.' }
    ]
  }
];

const Projects: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [demoIndex, setDemoIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const wrapClass = `transition-[opacity,transform] duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;
  const wrapStyle = (i: number): React.CSSProperties => ({ transitionDelay: `${i * 100}ms` });

  const getIcon = (name: string) => {
    switch (name) {
      case 'message': return <MessageSquare size={32} />;
      case 'building': return <Building2 size={32} />;
      case 'mic': return <Mic size={32} />;
      default: return <ExternalLink size={32} />;
    }
  };

  return (
    <section id="demos" className="py-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-950/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[#9a9490] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Live Work</p>
          <h2 className="text-3xl font-bold text-[#111111] mb-4">Six products. Three markets. All shipped.</h2>
          <p className="text-[#6b6460] max-w-2xl">
            Every demo below is a real, working system built for real problems — lead generation in UAE real estate, sentiment analysis for MENA fintech, Arabic NLP, and more.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className={wrapClass} style={wrapStyle(0)}>
          <TiltCard className="h-full">
          <a
            href="https://autoleadss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 flex flex-col h-full group relative overflow-hidden cursor-pointer hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1 no-underline"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Live Product
            </div>

            <div className="flex items-start gap-4 mb-4 pr-20">
              <div className="text-[#111111] p-3 bg-indigo-950/20 rounded-xl group-hover:scale-110 transition-transform border border-[#e2d9ce] shrink-0">
                <Sparkles size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#111111] leading-tight mb-1">Lead Generation System</h3>
                <p className="text-indigo-500 text-xs font-medium uppercase tracking-wide">AI-Powered Lead Generation</p>
              </div>
            </div>

            <div className="w-full aspect-video rounded-lg mb-6 relative overflow-hidden border border-[#e2d9ce]/50 group-hover:border-[#e2d9ce] transition-colors shadow-inner">
              <img src="/autoleads-images/mbai-hero-bg-opt.jpg" alt="AI Lead Generation System" className="w-full h-full object-cover" />
            </div>

            <p className="text-[#6b6460] text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
              A hybrid AI and outsourcing system for business owners and investors. Custom AI agents source and track qualified leads — professional Arabic &amp; English specialists convert them into booked appointments.
            </p>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[10px] px-2 py-1 rounded bg-[#f0ebe3]/50 text-[#6b6460] border border-[#e2d9ce]/50">AI Agents</span>
                <span className="text-[10px] px-2 py-1 rounded bg-[#f0ebe3]/50 text-[#6b6460] border border-[#e2d9ce]/50">Lead Gen</span>
                <span className="text-[10px] px-2 py-1 rounded bg-[#f0ebe3]/50 text-[#6b6460] border border-[#e2d9ce]/50">Real Estate</span>
              </div>
              <div className="w-full py-2.5 rounded-lg border border-[#e2d9ce] text-[#444444] group-hover:bg-[#2a2a2a] group-hover:text-white group-hover:border-indigo-500 transition-all font-medium flex items-center justify-center gap-2 text-sm">
                <ExternalLink size={16} /> See the Lead System in Action
              </div>
            </div>
          </a>
          </TiltCard>
          </div>

          {projects.map((project, idx) => {
            const cardInner = (
              <>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                {project.liveUrl && (
                  <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    Live
                  </div>
                )}
                <div className="flex items-start gap-4 mb-4 pr-16">
                  <div className="text-[#111111] p-3 bg-indigo-950/20 rounded-xl group-hover:scale-110 transition-transform border border-[#e2d9ce] shrink-0">
                    {getIcon(project.iconName)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111111] leading-tight mb-1">{project.title}</h3>
                    <p className="text-indigo-500 text-xs font-medium uppercase tracking-wide">{project.subtitle}</p>
                  </div>
                </div>
                <div className="w-full aspect-video rounded-lg mb-6 relative overflow-hidden border border-[#e2d9ce]/50 group-hover:border-[#e2d9ce] transition-colors shadow-inner">
                  {project.thumbnail ? (
                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <div className="relative z-10 w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center backdrop-blur-sm border border-indigo-500/50">
                        <Play size={20} fill="currentColor" className="text-[#111111]" />
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-[#6b6460] text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-1 rounded bg-[#f0ebe3]/50 text-[#6b6460] border border-[#e2d9ce]/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="w-full py-2.5 rounded-lg border border-[#e2d9ce] text-[#444444] group-hover:bg-[#2a2a2a] group-hover:text-white group-hover:border-indigo-500 transition-all font-medium flex items-center justify-center gap-2 text-sm">
                    {project.liveUrl
                      ? <><ExternalLink size={16} /> Try it Live</>
                      : <><PlayCircle size={16} /> {project.ctaLabel ?? 'See the Demo'}</>}
                  </div>
                </div>
              </>
            );

            return project.liveUrl ? (
              <div key={project.id} className={wrapClass} style={wrapStyle(idx + 1)}>
                <TiltCard className="h-full">
                  <Link
                    href={project.liveUrl}
                    className="glass-card rounded-2xl p-6 flex flex-col h-full group relative overflow-hidden cursor-pointer hover:border-indigo-500/50 transition-all duration-300 no-underline"
                  >
                    {cardInner}
                  </Link>
                </TiltCard>
              </div>
            ) : (
              <div key={project.id} className={wrapClass} style={wrapStyle(idx + 1)}>
                <TiltCard className="h-full">
                  <div
                    onClick={() => setActiveModal(project.id)}
                    className="glass-card rounded-2xl p-6 flex flex-col h-full group relative overflow-hidden cursor-pointer hover:border-indigo-500/50 transition-all duration-300"
                  >
                    {cardInner}
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => { setActiveModal(null); setDemoIndex(0); }}
          ></div>
          
          <div className="relative w-full max-w-4xl glass-panel rounded-2xl bg-[#0f172a] border border-[#e2d9ce] shadow-2xl flex flex-col max-h-[90vh]">
            {projects.filter(p => p.id === activeModal).map(project => (
              <div key={project.id} className="flex flex-col h-full">
                <div className="p-6 md:p-8 flex justify-between items-start border-b border-white/5 shrink-0">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#111111]">{project.title}</h3>
                    <p className="text-[#111111] text-base md:text-lg">{project.subtitle}</p>
                  </div>
                  <button 
                    onClick={() => { setActiveModal(null); setDemoIndex(0); }}
                    className="p-2 hover:bg-[#f0ebe3] rounded-full text-[#6b6460] hover:text-[#111111] transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto">
                    {project.demos && project.demos.length > 0 ? (
                      <>
                        <div className="relative rounded-xl overflow-hidden border border-[#e2d9ce]/50 shadow-lg">
                          <img 
                            src={project.demos[demoIndex].image} 
                            alt={project.demos[demoIndex].title} 
                            className="w-full object-contain bg-black/50"
                          />

                          {project.demos.length > 1 && (
                            <>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setDemoIndex(i => i === 0 ? project.demos!.length - 1 : i - 1); }}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-[#2a2a2a] rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
                              >
                                <ChevronLeft size={20} />
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setDemoIndex(i => i === project.demos!.length - 1 ? 0 : i + 1); }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-[#2a2a2a] rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
                              >
                                <ChevronRight size={20} />
                              </button>
                            </>
                          )}
                        </div>

                        <div className="p-4 bg-[#f0ebe3]/40 rounded-xl border border-[#e2d9ce]/30 mb-4">
                          <h4 className="text-[#111111] font-bold text-base md:text-lg mb-1">{project.demos[demoIndex].title}</h4>
                          <p className="text-[#6b6460] text-sm leading-relaxed">{project.demos[demoIndex].description}</p>
                        </div>

                        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                          {project.demos.map((demo, i) => (
                            <button 
                              key={i} 
                              onClick={() => setDemoIndex(i)}
                              className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all ${i === demoIndex ? 'border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]' : 'border-[#e2d9ce]/50 opacity-50 hover:opacity-80'}`}
                            >
                              <img src={demo.image} alt={demo.title} className="w-20 h-12 object-cover object-top" />
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="aspect-video bg-black rounded-xl border border-[#e2d9ce] flex items-center justify-center mb-8 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/20 to-blue-900/20"></div>
                        <div className="text-center z-10">
                          <Play size={48} className="text-white mx-auto mb-4 opacity-80" fill="white" />
                          <p className="text-[#6b6460] font-mono text-sm">Demo Coming Soon</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <p className="text-[#6b6460] leading-relaxed text-sm md:text-base">
                        {project.description}
                      </p>

                      {project.interpretation && (
                        <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-500 mb-1.5">Interpretation</p>
                          <p className="text-[#444444] text-sm leading-relaxed">{project.interpretation}</p>
                        </div>
                      )}

                      {project.highlights && project.highlights.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          {project.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#f0ebe3]/30 border border-[#e2d9ce]/30">
                              <Sparkles size={14} className="text-[#111111] mt-0.5 shrink-0" />
                              <span className="text-[#444444] text-sm">{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 pt-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-[#f0ebe3] text-xs text-[#444444] border border-[#e2d9ce]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
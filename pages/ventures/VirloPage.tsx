import React, { useEffect, useState } from 'react';
import { TrendingUp, Flame, Eye, Zap } from 'lucide-react';
import VentureShell from './VentureShell';

interface Trend {
  topic: string;
  platform: string;
  score: number;
  velocity: string;
  window: string;
  insight: string;
}

const TRENDS: Trend[] = [
  { topic: '"Get ready with my AI" transformations', platform: 'TikTok', score: 94, velocity: '+412%/24h', window: '2–4 days left', insight: 'Creators pairing morning routines with AI-generated future selves. Peak expected Thursday — post before then.' },
  { topic: 'Franco-Arabic voiceover memes', platform: 'Reels', score: 88, velocity: '+268%/24h', window: '5–7 days left', insight: 'Egyptian Arabizi voiceovers over luxury b-roll. Untapped in GCC — first movers in Saudi will capture the wave.' },
  { topic: 'Founder "day 1 vs day 365" cuts', platform: 'TikTok', score: 81, velocity: '+190%/24h', window: '~1 week left', insight: 'Raw split-screen founder journeys. High saves-to-likes ratio (0.31) signals durable, not flash, virality.' },
  { topic: 'Desert-office aesthetic', platform: 'Shorts', score: 73, velocity: '+95%/24h', window: 'Early — rising', insight: 'Remote work setups in UAE/Saudi landscapes. Low competition, high CPM niche. Enter now, own the format.' },
];

const ScoreRing: React.FC<{ score: number; animate: boolean }> = ({ score, animate }) => {
  const r = 20;
  const c = 2 * Math.PI * r;
  const color = score >= 85 ? '#f97316' : score >= 75 ? '#eab308' : '#10b981';
  return (
    <svg width="56" height="56" viewBox="0 0 56 56">
      <circle cx="28" cy="28" r={r} fill="none" stroke="#f0ebe3" strokeWidth="5" />
      <circle
        cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={animate ? c * (1 - score / 100) : c}
        transform="rotate(-90 28 28)"
        style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)' }}
      />
      <text x="28" y="32" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111111">{score}</text>
    </svg>
  );
};

const VirloPage: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const [selected, setSelected] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 300);
    const i = setInterval(() => setTick((n) => n + 1), 2500);
    return () => { clearTimeout(t); clearInterval(i); };
  }, []);

  const liveViews = 1_284_930 + tick * 1739;

  return (
    <VentureShell
      name="Virlo"
      accent="#f97316"
      tagline="Virality Intelligence"
      headline={<>Know what goes viral.<br /><span className="text-[#f97316]">Before it does.</span></>}
      sub="Virlo scans millions of short-form posts in real time, detects trends while they're still climbing, and tells creators and brands exactly what to post, when, and why — with a virality score for every emerging format."
      pillars={[
        { title: 'Trend radar', text: 'Real-time ingestion across TikTok, Reels, and Shorts detects format-level trends 48–72 hours before they peak.' },
        { title: 'Virality scoring', text: 'Every trend gets a 0–100 score built from velocity, saturation, saves-to-likes ratio, and audience overlap.' },
        { title: 'Action briefs', text: 'Not just data — Virlo generates a concrete post brief: hook, format, sound, and the exact posting window.' },
      ]}
    >
      {/* Mock dashboard */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2d9ce] bg-white">
          <div className="flex items-center gap-2 text-sm font-bold text-[#111111]">
            <Flame size={16} className="text-[#f97316]" /> Trend Radar — MENA
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6b6460]">
            <Eye size={13} />
            <span className="tabular-nums">{liveViews.toLocaleString()} posts analyzed</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>

        <div className="grid md:grid-cols-[1.2fr_1fr]">
          <div className="divide-y divide-[#e2d9ce]">
            {TRENDS.map((t, i) => (
              <button
                key={t.topic}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-6 py-4 flex items-center gap-4 transition-colors ${selected === i ? 'bg-[#f97316]/5' : 'hover:bg-[#f0ebe3]/40 bg-white'}`}
              >
                <ScoreRing score={t.score} animate={animate} />
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-[#111111] truncate">{t.topic}</p>
                  <p className="text-xs text-[#9a9490] mt-0.5">{t.platform} · <span className="text-green-600 font-semibold">{t.velocity}</span> · {t.window}</p>
                </div>
                <TrendingUp size={16} className={`ml-auto shrink-0 ${selected === i ? 'text-[#f97316]' : 'text-[#c8bfb4]'}`} />
              </button>
            ))}
          </div>

          <div className="bg-[#111111] p-6 flex flex-col">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3 flex items-center gap-2">
              <Zap size={12} className="text-[#f97316]" /> Virlo brief
            </p>
            <p className="text-white font-bold mb-2 leading-snug">{TRENDS[selected].topic}</p>
            <p className="text-white/70 text-sm leading-relaxed flex-1">{TRENDS[selected].insight}</p>
            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/5 rounded-lg py-2.5 border border-white/10">
                <p className="text-white font-black text-lg">{TRENDS[selected].score}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wide">Score</p>
              </div>
              <div className="bg-white/5 rounded-lg py-2.5 border border-white/10">
                <p className="text-green-400 font-black text-lg">{TRENDS[selected].velocity.split('/')[0]}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wide">24h velocity</p>
              </div>
              <div className="bg-white/5 rounded-lg py-2.5 border border-white/10">
                <p className="text-[#f97316] font-black text-lg">{TRENDS[selected].window.split(' ')[0]}</p>
                <p className="text-white/40 text-[10px] uppercase tracking-wide">Window</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VentureShell>
  );
};

export default VirloPage;

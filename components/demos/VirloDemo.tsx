import React, { useEffect, useState } from 'react';
import { TrendingUp, Flame, Eye, Zap } from 'lucide-react';

interface Trend { topic: string; platform: string; score: number; velocity: string; window: string; insight: string; }

const TRENDS: Trend[] = [
  { topic: '"Get ready with my AI" transformations', platform: 'TikTok', score: 94, velocity: '+412%/24h', window: '2–4 days left', insight: 'Creators pairing morning routines with AI-generated future selves. Peak expected Thursday — post before then.' },
  { topic: 'Franco-Arabic voiceover memes', platform: 'Reels', score: 88, velocity: '+268%/24h', window: '5–7 days left', insight: 'Egyptian Arabizi voiceovers over luxury b-roll. Untapped in GCC — first movers in Saudi will capture the wave.' },
  { topic: 'Founder "day 1 vs day 365" cuts', platform: 'TikTok', score: 81, velocity: '+190%/24h', window: '~1 week left', insight: 'Raw split-screen founder journeys. High saves-to-likes ratio (0.31) signals durable, not flash, virality.' },
  { topic: 'Desert-office aesthetic', platform: 'Shorts', score: 73, velocity: '+95%/24h', window: 'Early — rising', insight: 'Remote setups in UAE/Saudi landscapes. Low competition, high CPM niche. Enter now, own the format.' },
];

const ScoreRing: React.FC<{ score: number; animate: boolean }> = ({ score, animate }) => {
  const r = 18;
  const c = 2 * Math.PI * r;
  const color = score >= 85 ? '#f97316' : score >= 75 ? '#eab308' : '#22c55e';
  return (
    <svg width="52" height="52" viewBox="0 0 56 56">
      <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
      <circle cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={animate ? c * (1 - score / 100) : c}
        transform="rotate(-90 28 28)" style={{ transition: 'stroke-dashoffset 1.3s cubic-bezier(.22,1,.36,1)', filter: `drop-shadow(0 0 4px ${color}88)` }} />
      <text x="28" y="32" textAnchor="middle" fontSize="13" fontWeight="700" fill="#e8ecf4">{score}</text>
    </svg>
  );
};

const VirloDemo: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const [selected, setSelected] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 250);
    const i = setInterval(() => setTick((n) => n + 1), 2500);
    return () => { clearTimeout(t); clearInterval(i); };
  }, []);

  const livePosts = 1_284_930 + tick * 1739;

  return (
    <div className="w-full h-full text-[#e8ecf4]" style={{ background: '#0a0e17' }}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0d1220' }}>
        <div className="flex items-center gap-2 text-sm font-bold"><Flame size={16} className="text-[#f97316]" /> Trend Radar — MENA</div>
        <div className="flex items-center gap-2 text-xs text-[#8b93a7]">
          <Eye size={13} /><span className="tabular-nums">{livePosts.toLocaleString()} analyzed</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>
      <div className="grid md:grid-cols-[1.2fr_1fr]">
        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {TRENDS.map((t, i) => (
            <button key={t.topic} onClick={() => setSelected(i)}
              className="w-full text-left px-5 py-3.5 flex items-center gap-3.5 transition-colors"
              style={{ background: selected === i ? 'rgba(249,115,22,0.08)' : 'transparent' }}>
              <ScoreRing score={t.score} animate={animate} />
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{t.topic}</p>
                <p className="text-xs text-[#8b93a7] mt-0.5">{t.platform} · <span className="text-emerald-400 font-semibold">{t.velocity}</span> · {t.window}</p>
              </div>
              <TrendingUp size={15} className={`ml-auto shrink-0 ${selected === i ? 'text-[#f97316]' : 'text-[#5b6478]'}`} />
            </button>
          ))}
        </div>
        <div className="p-5 flex flex-col border-t md:border-t-0 md:border-l" style={{ background: '#111726', borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b6478] mb-2.5 flex items-center gap-2"><Zap size={12} className="text-[#f97316]" /> Virlo brief</p>
          <p className="font-bold mb-2 leading-snug text-sm">{TRENDS[selected].topic}</p>
          <p className="text-[#8b93a7] text-sm leading-relaxed flex-1">{TRENDS[selected].insight}</p>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            {[['Score', TRENDS[selected].score, '#e8ecf4'], ['24h', TRENDS[selected].velocity.split('/')[0], '#34d399'], ['Window', TRENDS[selected].window.split(' ')[0], '#f97316']].map(([l, v, c]) => (
              <div key={l as string} className="rounded-lg py-2 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <p className="font-black text-base" style={{ color: c as string }}>{v as React.ReactNode}</p>
                <p className="text-[#5b6478] text-[10px] uppercase tracking-wide">{l as string}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirloDemo;

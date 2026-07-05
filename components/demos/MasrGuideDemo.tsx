import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  MapPin,
  Search,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Loader2,
  AlertTriangle,
  Clock,
} from 'lucide-react';

/* ---------- Theme tokens ---------- */
const T = {
  bg: '#0a0e17',
  panel: '#111726',
  border: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.16)',
  text: '#e8ecf4',
  muted: '#8b93a7',
  dim: '#5b6478',
  amber: '#f59e0b',
  green: '#22c55e',
  red: '#ef4444',
  glow: '0 0 24px -6px #f59e0b66',
} as const;

/* ---------- Types ---------- */
type Confidence = 'High' | 'Medium';

interface PriceEntry {
  best: number;
  avg: number;
  overpriced: number;
  confidence: Confidence;
  source: string;
}

type RiskLabel = 'Low Risk' | 'Low-Moderate' | 'Moderate Risk' | 'Moderate';

interface Neighborhood {
  name: string;
  score: number;
  risk: RiskLabel;
  risks: string[];
  safeHours: string;
}

/* ---------- Data ---------- */
const PRICE_DATA: Record<string, PriceEntry> = {
  'marlboro gold': {
    best: 102,
    avg: 108,
    overpriced: 115,
    confidence: 'High',
    source: 'Official price lists + Egypt Independent, Al-Masry Al-Youm.',
  },
  'grilled corn': {
    best: 10,
    avg: 25,
    overpriced: 50,
    confidence: 'High',
    source: 'Street-market reports + Talabat Egypt + local social media.',
  },
  'uber from airport': {
    best: 250,
    avg: 380,
    overpriced: 600,
    confidence: 'Medium',
    source: 'Reddit r/Egypt threads + expat Facebook groups.',
  },
  'bottle of water': {
    best: 5,
    avg: 8,
    overpriced: 20,
    confidence: 'High',
    source: 'Supermarket + kiosk reports.',
  },
};

const QUICK_ITEMS: string[] = [
  'Marlboro Gold',
  'Grilled Corn',
  'Uber from Airport',
  'Bottle of Water',
];

const NEIGHBORHOODS: Neighborhood[] = [
  {
    name: 'Madinaty',
    score: 92,
    risk: 'Low Risk',
    risks: ['Long taxi waits', 'Gated access delays'],
    safeHours: '24/7 — gated community with private security.',
  },
  {
    name: 'Zamalek',
    score: 78,
    risk: 'Low-Moderate',
    risks: ['Pickpocketing', 'Traffic', 'Tourist overcharging'],
    safeHours: '6:00 AM – 12:00 AM. Well-lit, walkable riverfront.',
  },
  {
    name: 'Imbaba',
    score: 52,
    risk: 'Moderate Risk',
    risks: ['Phone snatching', 'Crowded alleys', 'Scams'],
    safeHours: '8:00 AM – 7:00 PM. Avoid back streets after dark.',
  },
  {
    name: 'Downtown Cairo',
    score: 64,
    risk: 'Moderate',
    risks: ['Pickpocketing', 'Traffic', 'Street harassment'],
    safeHours: '7:00 AM – 10:00 PM. Stay on main squares at night.',
  },
];

/* ---------- Helpers ---------- */
function scoreColor(score: number): string {
  if (score >= 80) return T.green;
  if (score >= 60) return T.amber;
  return T.red;
}

/* ---------- Small UI atoms ---------- */
function ConfidenceBadge({ level }: { level: Confidence }): React.ReactElement {
  const color = level === 'High' ? T.green : T.amber;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 11,
        fontWeight: 600,
        color,
        background: `${color}1a`,
        border: `1px solid ${color}55`,
        borderRadius: 999,
        padding: '2px 8px',
      }}
    >
      <Sparkles size={11} /> {level} confidence
    </span>
  );
}

interface ChipProps {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

const Chip: React.FC<ChipProps> = ({ label, onClick, active = false }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        fontSize: 12,
        color: active ? T.amber : T.muted,
        background: active ? `${T.amber}14` : T.bg,
        border: `1px solid ${active ? `${T.amber}66` : hover ? T.borderHover : T.border}`,
        borderRadius: 999,
        padding: '5px 11px',
        transition: 'all 140ms ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
};

/* ---------- Price range bar ---------- */
function RangeBar({ entry }: { entry: PriceEntry }): React.ReactElement {
  const min = entry.best;
  const max = entry.overpriced;
  const span = Math.max(max - min, 1);
  const pct = (v: number): number => ((v - min) / span) * 100;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 40);
    return () => window.clearTimeout(id);
  }, []);

  const markers: { v: number; c: string; label: string }[] = [
    { v: entry.best, c: T.green, label: 'Best' },
    { v: entry.avg, c: T.amber, label: 'Avg' },
    { v: entry.overpriced, c: T.red, label: 'High' },
  ];

  return (
    <div style={{ marginTop: 14 }}>
      <div
        style={{
          position: 'relative',
          height: 8,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${T.green}, ${T.amber}, ${T.red})`,
          opacity: 0.85,
        }}
      >
        {markers.map((m) => (
          <div
            key={m.label}
            style={{
              position: 'absolute',
              top: '50%',
              left: `${pct(m.v)}%`,
              transform: `translate(-50%, -50%) scale(${mounted ? 1 : 0})`,
              transition: 'transform 420ms cubic-bezier(.34,1.56,.64,1)',
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: m.c,
              border: `2px solid ${T.panel}`,
              boxShadow: `0 0 10px -2px ${m.c}`,
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        {markers.map((m) => (
          <div key={m.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: T.dim, marginBottom: 2 }}>{m.label}</div>
            <div
              className="tabular-nums"
              style={{ fontSize: 15, fontWeight: 700, color: m.c }}
            >
              {m.v}
              <span style={{ fontSize: 10, color: T.dim, marginLeft: 2 }}>EGP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Score gauge ---------- */
function ScoreGauge({ score }: { score: number }): React.ReactElement {
  const R = 34;
  const C = 2 * Math.PI * R;
  const color = scoreColor(score);
  const [anim, setAnim] = useState(0);

  useEffect(() => {
    setAnim(0);
    const id = window.setTimeout(() => setAnim(score), 60);
    return () => window.clearTimeout(id);
  }, [score]);

  const offset = C - (anim / 100) * C;

  return (
    <div style={{ position: 'relative', width: 88, height: 88, flexShrink: 0 }}>
      <svg width={88} height={88} viewBox="0 0 88 88">
        <circle cx={44} cy={44} r={R} fill="none" stroke={T.border} strokeWidth={7} />
        <circle
          cx={44}
          cy={44}
          r={R}
          fill="none"
          stroke={color}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          transform="rotate(-90 44 44)"
          style={{
            transition: 'stroke-dashoffset 900ms cubic-bezier(.4,0,.2,1)',
            filter: `drop-shadow(0 0 5px ${color}aa)`,
          }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="tabular-nums"
          style={{ fontSize: 24, fontWeight: 800, color, lineHeight: 1 }}
        >
          {Math.round(anim)}
        </span>
        <span style={{ fontSize: 9, color: T.dim, marginTop: 2 }}>/ 100</span>
      </div>
    </div>
  );
}

/* ---------- Price Check tab ---------- */
function PriceCheck(): React.ReactElement {
  const [query, setQuery] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ item: string; entry: PriceEntry | null } | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const runSearch = (raw: string): void => {
    const term = raw.trim();
    if (!term) return;
    setAnalyzing(true);
    setResult(null);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      const entry = PRICE_DATA[term.toLowerCase()] ?? null;
      setResult({ item: term, entry });
      setAnalyzing(false);
    }, 600);
  };

  const inputBorder = useMemo(() => T.border, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(query);
        }}
        style={{ display: 'flex', gap: 8 }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flex: 1,
            background: T.bg,
            border: `1px solid ${inputBorder}`,
            borderRadius: 10,
            padding: '0 12px',
          }}
        >
          <Search size={15} color={T.dim} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What did you pay for…?"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: T.text,
              fontSize: 13,
              padding: '10px 0',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            cursor: 'pointer',
            background: T.amber,
            color: '#1a1200',
            fontWeight: 700,
            fontSize: 13,
            border: 'none',
            borderRadius: 10,
            padding: '0 16px',
            boxShadow: T.glow,
          }}
        >
          Check
        </button>
      </form>

      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {QUICK_ITEMS.map((q) => (
          <Chip
            key={q}
            label={q}
            active={query.trim().toLowerCase() === q.toLowerCase()}
            onClick={() => {
              setQuery(q);
              runSearch(q);
            }}
          />
        ))}
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        {analyzing && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              height: '100%',
              color: T.muted,
              fontSize: 13,
            }}
          >
            <Loader2 size={16} color={T.amber} style={{ animation: 'mg-spin 900ms linear infinite' }} />
            Analyzing thousands of discussions…
          </div>
        )}

        {!analyzing && result && result.entry && (
          <div
            style={{
              background: T.bg,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: T.text,
                  textTransform: 'capitalize',
                }}
              >
                {result.item}
              </div>
              <ConfidenceBadge level={result.entry.confidence} />
            </div>
            <RangeBar entry={result.entry} />
            <div
              style={{
                marginTop: 14,
                paddingTop: 12,
                borderTop: `1px solid ${T.border}`,
                fontSize: 11,
                color: T.dim,
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: T.muted }}>Source · </span>
              {result.entry.source}
            </div>
          </div>
        )}

        {!analyzing && result && !result.entry && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: T.bg,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              padding: 16,
              color: T.muted,
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            <AlertTriangle size={18} color={T.amber} style={{ flexShrink: 0 }} />
            Not enough data yet — the live model scrapes fresh discussions on demand.
          </div>
        )}

        {!analyzing && !result && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: T.dim,
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <TrendingUp size={22} color={T.dim} />
              Pick an item or type your own to see the fair-price range.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Safety Map tab ---------- */
function SafetyMap(): React.ReactElement {
  const [selected, setSelected] = useState<Neighborhood>(NEIGHBORHOODS[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {NEIGHBORHOODS.map((n) => {
          const active = n.name === selected.name;
          const c = scoreColor(n.score);
          return (
            <button
              key={n.name}
              type="button"
              onClick={() => setSelected(n)}
              style={{
                cursor: 'pointer',
                textAlign: 'left',
                background: active ? `${T.amber}12` : T.bg,
                border: `1px solid ${active ? `${T.amber}66` : T.border}`,
                borderRadius: 10,
                padding: '9px 11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                transition: 'all 140ms ease',
                boxShadow: active ? T.glow : 'none',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
                <MapPin size={13} color={active ? T.amber : T.dim} style={{ flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: active ? T.text : T.muted,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {n.name}
                </span>
              </span>
              <span
                className="tabular-nums"
                style={{ fontSize: 13, fontWeight: 800, color: c, flexShrink: 0 }}
              >
                {n.score}
              </span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          background: T.bg,
          border: `1px solid ${T.border}`,
          borderRadius: 12,
          padding: 16,
          display: 'flex',
          gap: 16,
        }}
      >
        <ScoreGauge score={selected.score} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldCheck size={15} color={scoreColor(selected.score)} />
            <span style={{ fontSize: 15, fontWeight: 700, color: T.text }}>{selected.name}</span>
          </div>
          <span
            style={{
              display: 'inline-block',
              marginTop: 6,
              fontSize: 11,
              fontWeight: 600,
              color: scoreColor(selected.score),
              background: `${scoreColor(selected.score)}1a`,
              border: `1px solid ${scoreColor(selected.score)}55`,
              borderRadius: 999,
              padding: '2px 8px',
            }}
          >
            {selected.risk}
          </span>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
            {selected.risks.map((r) => (
              <Chip key={r} label={r} />
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 6,
              marginTop: 12,
              fontSize: 11,
              color: T.dim,
              lineHeight: 1.5,
            }}
          >
            <Clock size={13} color={T.muted} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>
              <span style={{ color: T.muted }}>Safe hours · </span>
              {selected.safeHours}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Root component ---------- */
type Tab = 'price' | 'safety';

export default function MasrGuideDemo(): React.ReactElement {
  const [tab, setTab] = useState<Tab>('price');

  const tabs: { id: Tab; label: string; icon: React.ReactElement }[] = [
    { id: 'price', label: 'Price Check', icon: <TrendingUp size={14} /> },
    { id: 'safety', label: 'Safety Map', icon: <ShieldCheck size={14} /> },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: 400,
        background: T.panel,
        color: T.text,
        borderRadius: 16,
        padding: 18,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <style>{`@keyframes mg-spin{to{transform:rotate(360deg)}}`}</style>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: `${T.amber}18`,
              border: `1px solid ${T.amber}55`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: T.glow,
            }}
          >
            <MapPin size={17} color={T.amber} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: -0.2 }}>Masr Guide</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10.5, color: T.dim }}>
              <Sparkles size={10} color={T.amber} />
              AI-analyzed from crowd data
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div
          style={{
            display: 'flex',
            gap: 2,
            background: T.bg,
            border: `1px solid ${T.border}`,
            borderRadius: 10,
            padding: 3,
          }}
        >
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 12,
                  fontWeight: 600,
                  color: active ? '#1a1200' : T.muted,
                  background: active ? T.amber : 'transparent',
                  border: 'none',
                  borderRadius: 7,
                  padding: '6px 10px',
                  transition: 'all 140ms ease',
                  boxShadow: active ? T.glow : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.icon}
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, minHeight: 0 }}>
        {tab === 'price' ? <PriceCheck /> : <SafetyMap />}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import { Activity, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

/**
 * MarketSentinelDemo
 * A simulated real-time "Fear & Greed" market dashboard.
 * Dark theme, animated gauges, live-ticking prices. Simulated data only.
 */

type AssetId = 'XAU' | 'XAG' | 'SPX' | 'DXY' | 'EUR';

interface AssetConfig {
  id: AssetId;
  name: string;
  symbol: string;
  basePrice: number;
  decimals: number;
  prefix: string;
  startScore: number;
  blurb: string;
}

interface AssetState {
  price: number;
  prevPrice: number;
  changePct: number;
  score: number;
}

const ASSETS: AssetConfig[] = [
  {
    id: 'XAU',
    name: 'Gold',
    symbol: 'XAU',
    basePrice: 5130,
    decimals: 2,
    prefix: '$',
    startScore: 90,
    blurb:
      'Safe-haven demand and persistent central-bank buying are driving euphoric momentum — sentiment is running hot.',
  },
  {
    id: 'XAG',
    name: 'Silver',
    symbol: 'XAG',
    basePrice: 86,
    decimals: 2,
    prefix: '$',
    startScore: 93,
    blurb:
      'Industrial demand plus a squeeze on physical supply has speculators piling in — classic extreme-greed setup.',
  },
  {
    id: 'SPX',
    name: 'S&P 500',
    symbol: 'SPX',
    basePrice: 6958,
    decimals: 2,
    prefix: '',
    startScore: 58,
    blurb:
      'Breadth is mixed and volatility is muted — the tape is constructive but far from euphoric. Neutral-to-mild greed.',
  },
  {
    id: 'DXY',
    name: 'US Dollar',
    symbol: 'DXY',
    basePrice: 96.6,
    decimals: 2,
    prefix: '',
    startScore: 38,
    blurb:
      'Dovish rate expectations and rotation into hard assets are pressuring the dollar — traders are leaning fearful.',
  },
  {
    id: 'EUR',
    name: 'Euro',
    symbol: 'EUR/USD',
    basePrice: 1.19,
    decimals: 4,
    prefix: '$',
    startScore: 62,
    blurb:
      'A softer dollar and firmer regional data are lifting the euro — sentiment tilts modestly greedy.',
  },
];

const SURFACE = '#0a0e17';
const SURFACE_2 = '#111726';
const BORDER = 'rgba(255,255,255,0.08)';
const BORDER_HOVER = 'rgba(255,255,255,0.16)';
const TEXT = '#e8ecf4';
const MUTED = '#8b93a7';
const DIM = '#5b6478';
const GREED = '#10b981';
const FEAR = '#ef4444';
const AMBER = '#f59e0b';

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function scoreLabel(score: number): string {
  if (score >= 85) return 'Extreme Greed';
  if (score >= 60) return 'Greed';
  if (score >= 45) return 'Neutral';
  if (score >= 30) return 'Fear';
  return 'Extreme Fear';
}

// Interpolate red -> amber -> green across 0..100
function scoreColor(score: number): string {
  const t = clamp(score, 0, 100) / 100;
  const stops: Array<{ t: number; c: [number, number, number] }> = [
    { t: 0, c: [239, 68, 68] }, // #ef4444
    { t: 0.5, c: [245, 158, 11] }, // #f59e0b
    { t: 1, c: [16, 185, 129] }, // #10b981
  ];
  let a = stops[0];
  let b = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i].t && t <= stops[i + 1].t) {
      a = stops[i];
      b = stops[i + 1];
      break;
    }
  }
  const span = b.t - a.t || 1;
  const local = (t - a.t) / span;
  const r = Math.round(a.c[0] + (b.c[0] - a.c[0]) * local);
  const g = Math.round(a.c[1] + (b.c[1] - a.c[1]) * local);
  const bl = Math.round(a.c[2] + (b.c[2] - a.c[2]) * local);
  return `rgb(${r}, ${g}, ${bl})`;
}

function formatPrice(cfg: AssetConfig, price: number): string {
  return (
    cfg.prefix +
    price.toLocaleString('en-US', {
      minimumFractionDigits: cfg.decimals,
      maximumFractionDigits: cfg.decimals,
    })
  );
}

// Semicircular gauge: 180deg arc from left (fear) to right (greed).
function Gauge({ score }: { score: number }): ReactElement {
  const W = 132;
  const H = 74;
  const cx = W / 2;
  const cy = H - 6;
  const r = 54;
  const color = scoreColor(score);

  // Angle: 180deg (left) at score 0 -> 0deg (right) at score 100.
  const angle = Math.PI * (1 - clamp(score, 0, 100) / 100);
  const trackStart = { x: cx - r, y: cy };
  const trackEnd = { x: cx + r, y: cy };

  const valueEnd = {
    x: cx + r * Math.cos(angle),
    y: cy - r * Math.sin(angle),
  };
  // large-arc-flag 0 works for a semicircle; sweep 1 draws clockwise over the top.
  const trackPath = `M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 0 1 ${trackEnd.x} ${trackEnd.y}`;
  const valuePath = `M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 0 1 ${valueEnd.x} ${valueEnd.y}`;

  // Needle
  const nx = cx + (r - 8) * Math.cos(angle);
  const ny = cy - (r - 8) * Math.sin(angle);

  const gradId = `gaugeGrad-${Math.round(score)}`;

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={FEAR} />
          <stop offset="50%" stopColor={AMBER} />
          <stop offset="100%" stopColor={GREED} />
        </linearGradient>
      </defs>
      {/* Track */}
      <path
        d={trackPath}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={9}
        strokeLinecap="round"
      />
      {/* Value arc */}
      <path
        d={valuePath}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={9}
        strokeLinecap="round"
        style={{
          filter: `drop-shadow(0 0 6px ${color}aa)`,
          transition: 'stroke-dasharray 0.6s ease',
        }}
      />
      {/* Needle */}
      <line
        x1={cx}
        y1={cy}
        x2={nx}
        y2={ny}
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        style={{ transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)' }}
      />
      <circle cx={cx} cy={cy} r={5} fill={color} />
      <circle cx={cx} cy={cy} r={5} fill="none" stroke={SURFACE} strokeWidth={1.5} />
      {/* Score value */}
      <text
        x={cx}
        y={cy - 16}
        textAnchor="middle"
        fill={TEXT}
        fontSize={20}
        fontWeight={700}
        className="tabular-nums"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {Math.round(score)}
      </text>
    </svg>
  );
}

interface AssetCardProps {
  // Declared explicitly because this project has no @types/react JSX attribute
  // augmentation to auto-strip `key` from custom-component prop checks.
  key?: string | number;
  cfg: AssetConfig;
  state: AssetState;
  selected: boolean;
  onSelect: () => void;
}

function AssetCard({ cfg, state, selected, onSelect }: AssetCardProps): ReactElement {
  const [hover, setHover] = useState<boolean>(false);
  const up = state.changePct >= 0;
  const changeColor = up ? GREED : FEAR;
  const color = scoreColor(state.score);
  const isGreedy = state.score >= 50;

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="tabular-nums"
      style={{
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        padding: '12px 12px 10px',
        borderRadius: 12,
        background: SURFACE_2,
        border: `1px solid ${selected ? color : hover ? BORDER_HOVER : BORDER}`,
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, box-shadow 0.3s ease, transform 0.2s ease',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: selected
          ? `0 0 24px -6px ${isGreedy ? '#10b98166' : '#ef444466'}`
          : hover
            ? '0 6px 18px -10px rgba(0,0,0,0.7)'
            : 'none',
        fontVariantNumeric: 'tabular-nums',
        outline: 'none',
        width: '100%',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: TEXT, fontSize: 13, fontWeight: 600, lineHeight: 1.1 }}>
            {cfg.name}
          </span>
          <span style={{ color: DIM, fontSize: 10, letterSpacing: 0.5, fontWeight: 500 }}>
            {cfg.symbol}
          </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{ color: TEXT, fontSize: 13, fontWeight: 700 }}
            className="tabular-nums"
          >
            {formatPrice(cfg, state.price)}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 2,
              color: changeColor,
              fontSize: 10.5,
              fontWeight: 600,
            }}
            className="tabular-nums"
          >
            {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {up ? '+' : ''}
            {state.changePct.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Gauge */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Gauge score={state.score} />
      </div>

      {/* Label */}
      <div style={{ textAlign: 'center', marginTop: -6 }}>
        <span
          style={{
            color,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.3,
          }}
        >
          {scoreLabel(state.score)}
        </span>
      </div>
    </button>
  );
}

export default function MarketSentinelDemo(): ReactElement {
  const [states, setStates] = useState<Record<AssetId, AssetState>>(() => {
    const init = {} as Record<AssetId, AssetState>;
    for (const a of ASSETS) {
      init[a.id] = {
        price: a.basePrice,
        prevPrice: a.basePrice,
        changePct: 0,
        score: a.startScore,
      };
    }
    return init;
  });
  const [selected, setSelected] = useState<AssetId>('XAU');
  const [updatedAt, setUpdatedAt] = useState<Date>(() => new Date());

  const cfgMap = useRef<Record<AssetId, AssetConfig>>(
    ASSETS.reduce(
      (acc, a) => {
        acc[a.id] = a;
        return acc;
      },
      {} as Record<AssetId, AssetConfig>,
    ),
  );

  // Price ticks ~every 2s
  useEffect(() => {
    const id = window.setInterval(() => {
      setStates((prev) => {
        const next = { ...prev };
        for (const a of ASSETS) {
          const s = prev[a.id];
          const drift = (Math.random() - 0.5) * 2 * (a.basePrice * 0.0018);
          const price = Math.max(0.0001, s.price + drift);
          const changePct = ((price - a.basePrice) / a.basePrice) * 100;
          next[a.id] = { ...s, prevPrice: s.price, price, changePct };
        }
        return next;
      });
      setUpdatedAt(new Date());
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  // Sentiment scores drift ~every 2.5s
  useEffect(() => {
    const id = window.setInterval(() => {
      setStates((prev) => {
        const next = { ...prev };
        for (const a of ASSETS) {
          const s = prev[a.id];
          const delta = (Math.random() - 0.5) * 6; // +/- up to 3
          const score = clamp(s.score + delta, 2, 99);
          next[a.id] = { ...s, score };
        }
        return next;
      });
    }, 2500);
    return () => window.clearInterval(id);
  }, []);

  const selectedCfg = cfgMap.current[selected];
  const selectedState = states[selected];

  const timeStr = updatedAt.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div
      className="w-full h-full tabular-nums"
      style={{
        background: SURFACE,
        color: TEXT,
        borderRadius: 14,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontVariantNumeric: 'tabular-nums',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 30,
              height: 30,
              borderRadius: 8,
              background: 'rgba(16,185,129,0.12)',
              border: `1px solid ${BORDER}`,
            }}
          >
            <Activity size={16} color={GREED} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 0.2, lineHeight: 1.1 }}>
              Market Sentinel
            </div>
            <div style={{ fontSize: 10.5, color: MUTED, marginTop: 1 }}>
              Fear &amp; Greed Index
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: FEAR,
                  opacity: 0.75,
                  animation: 'ms-ping 1.6s cubic-bezier(0,0,0.2,1) infinite',
                }}
              />
              <span
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  borderRadius: '50%',
                  width: 8,
                  height: 8,
                  background: FEAR,
                }}
              />
            </span>
            <span
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: 1,
                color: FEAR,
              }}
            >
              LIVE
            </span>
          </div>
          <div style={{ fontSize: 10, color: DIM }} className="tabular-nums">
            Updated {timeStr}
          </div>
        </div>
      </div>

      {/* Grid of asset cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 10,
        }}
      >
        {ASSETS.map((a) => (
          <AssetCard
            key={a.id}
            cfg={a}
            state={states[a.id]}
            selected={selected === a.id}
            onSelect={() => setSelected(a.id)}
          />
        ))}
      </div>

      {/* AI analysis blurb */}
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 9,
          padding: '10px 12px',
          borderRadius: 10,
          background: SURFACE_2,
          border: `1px solid ${BORDER}`,
          flex: '1 1 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 22,
            height: 22,
            borderRadius: 6,
            background: 'rgba(16,185,129,0.12)',
            flexShrink: 0,
            marginTop: 1,
          }}
        >
          <Sparkles size={13} color={scoreColor(selectedState.score)} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: 0.4,
              color: MUTED,
              textTransform: 'uppercase',
              marginBottom: 2,
            }}
          >
            AI Analysis · {selectedCfg.name}
          </div>
          <div style={{ fontSize: 12, color: TEXT, lineHeight: 1.45 }}>
            {selectedCfg.blurb}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ms-ping {
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  Snowflake,
  Send,
  Wifi,
  TrendingUp,
  Sparkles,
  Check,
  CreditCard,
} from 'lucide-react';

/* ------------------------------------------------------------------ *
 * Design tokens
 * ------------------------------------------------------------------ */
const C = {
  surface0: '#0a0e17',
  surface1: '#111726',
  border: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.16)',
  text: '#e8ecf4',
  muted: '#8b93a7',
  dim: '#5b6478',
  indigo: '#6366f1',
  sky: '#38bdf8',
} as const;

const GLOW: CSSProperties = { boxShadow: '0 0 24px -6px #6366f166' };

/* ------------------------------------------------------------------ *
 * Types
 * ------------------------------------------------------------------ */
interface Recipient {
  id: string;
  name: string;
  initials: string;
  color: string;
}

interface Activity {
  id: number;
  name: string;
  initials: string;
  color: string;
  amount: number;
  time: string;
}

interface Category {
  label: string;
  amount: number;
  color: string;
}

/* ------------------------------------------------------------------ *
 * Static simulated data
 * ------------------------------------------------------------------ */
const RECIPIENTS: Recipient[] = [
  { id: 'r1', name: 'Layla Hassan', initials: 'LH', color: '#6366f1' },
  { id: 'r2', name: 'Omar Nabil', initials: 'ON', color: '#38bdf8' },
  { id: 'r3', name: 'Sara Khalid', initials: 'SK', color: '#a855f7' },
  { id: 'r4', name: 'Yusuf Ali', initials: 'YA', color: '#10b981' },
];

const CATEGORIES: Category[] = [
  { label: 'Shopping', amount: 4210, color: '#6366f1' },
  { label: 'Food', amount: 2860, color: '#38bdf8' },
  { label: 'Transport', amount: 1340, color: '#a855f7' },
  { label: 'Bills', amount: 1980, color: '#10b981' },
];

const SPARK_POINTS: number[] = [
  32, 38, 30, 46, 42, 58, 50, 66, 60, 74, 68, 82, 78, 92,
];

const INITIAL_ACTIVITY: Activity[] = [
  { id: 1, name: 'Careem', initials: 'CA', color: '#10b981', amount: -34.5, time: '2h' },
  { id: 2, name: 'Noon', initials: 'NO', color: '#a855f7', amount: -189.0, time: '5h' },
  { id: 3, name: 'Salary', initials: 'SL', color: '#38bdf8', amount: 12500.0, time: '1d' },
];

const TARGET_BALANCE = 84250.0;

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */
function fmt(n: number): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Build a smooth cubic-bezier path from y-values normalized to a box. */
function smoothPath(
  values: number[],
  width: number,
  height: number,
  pad: number,
): { line: string; area: string } {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = (width - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (height - pad * 2) * (1 - (v - min) / range);
    return { x, y };
  });

  let line = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const cx = (p0.x + p1.x) / 2;
    line += ` C ${cx.toFixed(2)} ${p0.y.toFixed(2)} ${cx.toFixed(2)} ${p1.y.toFixed(2)} ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
  }
  const area = `${line} L ${pts[pts.length - 1].x.toFixed(2)} ${height - pad} L ${pts[0].x.toFixed(2)} ${height - pad} Z`;
  return { line, area };
}

/* ------------------------------------------------------------------ *
 * Card primitive
 * ------------------------------------------------------------------ */
function Panel({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}): ReactElement {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: C.surface1,
        border: `1px solid ${hover ? C.borderHover : C.border}`,
        borderRadius: 16,
        padding: 14,
        transition: 'border-color 200ms ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Main component
 * ------------------------------------------------------------------ */
export default function NeobankDemo(): ReactElement {
  const [balance, setBalance] = useState<number>(0);
  const [frozen, setFrozen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(RECIPIENTS[0].id);
  const [amount, setAmount] = useState<string>('250');
  const [activity, setActivity] = useState<Activity[]>(INITIAL_ACTIVITY);
  const [toast, setToast] = useState<boolean>(false);
  const [dash, setDash] = useState<number>(0);

  const activityId = useRef<number>(100);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Count-up balance animation */
  useEffect(() => {
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (now: number): void => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setBalance(TARGET_BALANCE * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Moving sparkline highlight */
  useEffect(() => {
    const iv = setInterval(() => {
      setDash((d) => (d + 4) % 240);
    }, 40);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const spark = useMemo(
    () => smoothPath(SPARK_POINTS, 260, 72, 6),
    [],
  );

  const totalSpend = useMemo(
    () => CATEGORIES.reduce((s, c) => s + c.amount, 0),
    [],
  );

  const donut = useMemo(() => {
    const r = 34;
    const circ = 2 * Math.PI * r;
    let offset = 0;
    return CATEGORIES.map((cat) => {
      const frac = cat.amount / totalSpend;
      const seg = {
        color: cat.color,
        dash: frac * circ,
        gap: circ - frac * circ,
        offset: -offset * circ,
        circ,
        r,
      };
      offset += frac;
      return seg;
    });
  }, [totalSpend]);

  const activeRecipient =
    RECIPIENTS.find((r) => r.id === selected) ?? RECIPIENTS[0];

  const handleSend = (): void => {
    const num = parseFloat(amount);
    if (!num || num <= 0) return;
    activityId.current += 1;
    const entry: Activity = {
      id: activityId.current,
      name: activeRecipient.name,
      initials: activeRecipient.initials,
      color: activeRecipient.color,
      amount: -num,
      time: 'now',
    };
    setActivity((prev) => [entry, ...prev].slice(0, 4));
    setBalance((b) => b - num);
    setToast(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(false), 2200);
  };

  const monthPct = 8.4;

  return (
    <div
      className="w-full h-full"
      style={{
        background: C.surface0,
        color: C.text,
        borderRadius: 18,
        padding: 16,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${C.indigo}, ${C.sky})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...GLOW,
            }}
          >
            <CreditCard size={15} color="#fff" strokeWidth={2.2} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: 0.2 }}>
            Neobank
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 11,
            color: C.muted,
            border: `1px solid ${C.border}`,
            borderRadius: 999,
            padding: '3px 9px',
          }}
        >
          <Sparkles size={12} color={C.sky} />
          <span>Nova AI</span>
        </div>
      </div>

      {/* Two-column dashboard */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: 12,
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* -------- LEFT COLUMN -------- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Balance + sparkline */}
          <Panel>
            <div
              style={{
                fontSize: 11,
                color: C.dim,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
              }}
            >
              Total balance
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 8,
                marginTop: 4,
              }}
            >
              <div
                className="tabular-nums"
                style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}
              >
                <span style={{ fontSize: 14, color: C.muted, marginRight: 4 }}>
                  AED
                </span>
                {fmt(balance)}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                marginTop: 6,
                fontSize: 12,
                color: '#10b981',
                fontWeight: 600,
              }}
            >
              <TrendingUp size={13} />
              <span className="tabular-nums">+{monthPct.toFixed(1)}%</span>
              <span style={{ color: C.dim, fontWeight: 400 }}>this month</span>
            </div>

            {/* Sparkline */}
            <svg
              viewBox="0 0 260 72"
              width="100%"
              height="60"
              style={{ marginTop: 8, display: 'block' }}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="nb-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.indigo} stopOpacity="0.45" />
                  <stop offset="100%" stopColor={C.indigo} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="nb-stroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={C.indigo} />
                  <stop offset="100%" stopColor={C.sky} />
                </linearGradient>
              </defs>
              <path d={spark.area} fill="url(#nb-fill)" />
              <path
                d={spark.line}
                fill="none"
                stroke="url(#nb-stroke)"
                strokeWidth={2.4}
                strokeLinecap="round"
              />
              {/* moving highlight */}
              <path
                d={spark.line}
                fill="none"
                stroke="#fff"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeDasharray="14 226"
                strokeDashoffset={-dash}
                opacity={0.55}
              />
            </svg>
          </Panel>

          {/* Virtual card */}
          <div
            style={{
              position: 'relative',
              borderRadius: 16,
              padding: 16,
              height: 132,
              background: frozen
                ? 'linear-gradient(135deg, #263041, #1a2233)'
                : `linear-gradient(135deg, ${C.indigo} 0%, #4f46e5 45%, ${C.sky} 120%)`,
              transition: 'filter 300ms ease, background 300ms ease',
              filter: frozen ? 'grayscale(0.5) brightness(0.8)' : 'none',
              overflow: 'hidden',
              ...(frozen ? {} : GLOW),
            }}
          >
            {/* frost overlay */}
            {frozen && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(135deg, rgba(56,189,248,0.18), rgba(255,255,255,0.06))',
                  backdropFilter: 'blur(1px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  color: '#cfe8ff',
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: 1,
                }}
              >
                <Snowflake size={16} />
                FROZEN
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              {/* chip */}
              <div
                style={{
                  width: 32,
                  height: 24,
                  borderRadius: 6,
                  background:
                    'linear-gradient(135deg, #f0d17a, #c9a53c)',
                  opacity: 0.95,
                }}
              />
              <Wifi
                size={18}
                color="#fff"
                style={{ transform: 'rotate(90deg)', opacity: 0.85 }}
              />
            </div>

            <div
              className="tabular-nums"
              style={{
                marginTop: 22,
                fontSize: 16,
                letterSpacing: 3,
                color: '#fff',
                fontWeight: 600,
                textShadow: '0 1px 4px rgba(0,0,0,0.25)',
              }}
            >
              •••• •••• •••• 4210
            </div>

            <div
              style={{
                marginTop: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}
              >
                MOHANAD BARAKAT
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontStyle: 'italic',
                  fontWeight: 800,
                  color: '#fff',
                }}
              >
                VISA
              </div>
            </div>
          </div>

          {/* Freeze toggle */}
          <button
            onClick={() => setFrozen((f) => !f)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              background: frozen ? C.sky : 'rgba(99,102,241,0.12)',
              color: frozen ? '#04121c' : C.text,
              border: `1px solid ${frozen ? C.sky : C.border}`,
              borderRadius: 12,
              padding: '9px 0',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
          >
            <Snowflake size={15} />
            {frozen ? 'Unfreeze card' : 'Freeze card'}
          </button>
        </div>

        {/* -------- RIGHT COLUMN -------- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Spending donut */}
          <Panel>
            <div
              style={{
                fontSize: 11,
                color: C.dim,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                marginBottom: 8,
              }}
            >
              Spending breakdown
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <svg width="88" height="88" viewBox="0 0 88 88">
                <g transform="translate(44,44) rotate(-90)">
                  <circle
                    r={34}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={11}
                  />
                  {donut.map((seg, i) => (
                    <circle
                      key={i}
                      r={seg.r}
                      fill="none"
                      stroke={seg.color}
                      strokeWidth={11}
                      strokeDasharray={`${seg.dash} ${seg.gap}`}
                      strokeDashoffset={seg.offset}
                      strokeLinecap="butt"
                    />
                  ))}
                </g>
                <text
                  x="44"
                  y="41"
                  textAnchor="middle"
                  fill={C.text}
                  fontSize="13"
                  fontWeight="700"
                  className="tabular-nums"
                >
                  {(totalSpend / 1000).toFixed(1)}k
                </text>
                <text
                  x="44"
                  y="54"
                  textAnchor="middle"
                  fill={C.dim}
                  fontSize="8"
                >
                  AED spent
                </text>
              </svg>

              <div style={{ flex: 1, display: 'grid', gap: 6 }}>
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: 12,
                    }}
                  >
                    <span
                      style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 3,
                          background: cat.color,
                        }}
                      />
                      <span style={{ color: C.muted }}>{cat.label}</span>
                    </span>
                    <span className="tabular-nums" style={{ fontWeight: 600 }}>
                      {fmt(cat.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          {/* Quick transfer */}
          <Panel>
            <div
              style={{
                fontSize: 11,
                color: C.dim,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                marginBottom: 8,
              }}
            >
              Quick transfer
            </div>
            <div style={{ display: 'flex', gap: 7, marginBottom: 9 }}>
              {RECIPIENTS.map((r) => {
                const on = r.id === selected;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelected(r.id)}
                    title={r.name}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      border: on
                        ? `2px solid ${C.sky}`
                        : `1px solid ${C.border}`,
                      background: r.color,
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'transform 150ms ease',
                      transform: on ? 'scale(1.08)' : 'scale(1)',
                      boxShadow: on ? '0 0 12px -2px #38bdf888' : 'none',
                    }}
                  >
                    {r.initials}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: 7 }}>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  background: C.surface0,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: '0 10px',
                }}
              >
                <span style={{ fontSize: 11, color: C.dim, marginRight: 5 }}>
                  AED
                </span>
                <input
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value.replace(/[^0-9.]/g, ''))
                  }
                  inputMode="decimal"
                  placeholder="0.00"
                  className="tabular-nums"
                  style={{
                    flex: 1,
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: C.text,
                    fontSize: 14,
                    fontWeight: 600,
                    padding: '8px 0',
                  }}
                />
              </div>
              <button
                onClick={handleSend}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: `linear-gradient(135deg, ${C.indigo}, ${C.sky})`,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  padding: '0 14px',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  ...GLOW,
                }}
              >
                <Send size={14} />
                Send
              </button>
            </div>
          </Panel>

          {/* Recent activity */}
          <Panel style={{ flex: 1, minHeight: 0 }}>
            <div
              style={{
                fontSize: 11,
                color: C.dim,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                marginBottom: 8,
              }}
            >
              Recent activity
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {activity.map((a) => (
                <div
                  key={a.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: a.color,
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {a.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {a.name}
                    </div>
                    <div style={{ fontSize: 10.5, color: C.dim }}>{a.time}</div>
                  </div>
                  <div
                    className="tabular-nums"
                    style={{
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: a.amount >= 0 ? '#10b981' : C.text,
                    }}
                  >
                    {a.amount >= 0 ? '+' : '-'}
                    {fmt(Math.abs(a.amount))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* Nova AI insight line */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 11.5,
          color: C.muted,
          background: 'rgba(56,189,248,0.06)',
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: '7px 11px',
        }}
      >
        <Sparkles size={13} color={C.sky} style={{ flexShrink: 0 }} />
        <span>
          <span style={{ color: C.sky, fontWeight: 600 }}>Nova:</span> You spent
          18% less on transport this month — nice work staying on budget.
        </span>
      </div>

      {/* Success toast */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 16,
          transform: `translateX(-50%) translateY(${toast ? 0 : 20}px)`,
          opacity: toast ? 1 : 0,
          pointerEvents: 'none',
          transition: 'all 320ms cubic-bezier(0.22,1,0.36,1)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#10b981',
          color: '#04160f',
          fontSize: 12.5,
          fontWeight: 700,
          padding: '8px 14px',
          borderRadius: 999,
          boxShadow: '0 8px 24px -6px #10b98188',
          zIndex: 10,
        }}
      >
        <Check size={15} strokeWidth={3} />
        Transfer sent to {activeRecipient.name.split(' ')[0]}
      </div>
    </div>
  );
}

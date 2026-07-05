import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type FC,
} from 'react';
import {
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  ArrowRight,
  ScanLine,
} from 'lucide-react';

type Phase = 'idle' | 'scanning' | 'done';

const COLORS = {
  surface: '#0a0e17',
  panel: '#111726',
  border: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.16)',
  text: '#e8ecf4',
  muted: '#8b93a7',
  dim: '#5b6478',
  accent: '#6366f1',
} as const;

const SAMPLE_RESUME =
  'Software engineer with 6 years building web apps. Worked on backend services and internal dashboards. Helped ship features and fixed bugs. Comfortable with JavaScript and some cloud tools. Collaborated with teammates on projects.';

const SAMPLE_JOB =
  'Seeking a Senior ML Engineer with Python, LLM alignment, and RLHF experience. Must drive A/B testing, own data pipelines, and handle stakeholder management across teams. You will lead measurable, high-impact initiatives.';

const KEYWORDS: readonly string[] = [
  'Python',
  'LLM alignment',
  'RLHF',
  'stakeholder management',
  'A/B testing',
  'data pipelines',
];

const BULLET_BEFORE = 'Helped ship features and fixed bugs on internal dashboards.';
const BULLET_AFTER =
  'Led a 3-person team to ship 4 A/B-tested features, cutting critical bugs 38% and raising engagement 22%.';

const START_SCORE = 42;
const END_SCORE = 94;
const SCAN_MS = 1800;

/** Interpolate the gauge stroke color from red/amber (low) to indigo-green (high). */
function scoreColor(score: number): string {
  if (score < 55) return '#ef4444';
  if (score < 70) return '#f59e0b';
  if (score < 85) return '#a5b4fc';
  return '#34d399';
}

const AtsDemo: FC = () => {
  const [resume, setResume] = useState<string>(SAMPLE_RESUME);
  const [job, setJob] = useState<string>(SAMPLE_JOB);
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [score, setScore] = useState<number>(START_SCORE);
  const [visibleChips, setVisibleChips] = useState<number>(0);
  const [showBullet, setShowBullet] = useState<boolean>(false);

  const timers = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);

  const clearAllTimers = useCallback((): void => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => clearAllTimers, [clearAllTimers]);

  const runScoreAnimation = useCallback((): void => {
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number): void => {
      const raw = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - raw, 3);
      setScore(Math.round(START_SCORE + (END_SCORE - START_SCORE) * eased));
      if (raw < 1) {
        rafRef.current = window.requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = window.requestAnimationFrame(tick);
  }, []);

  const handleOptimize = useCallback((): void => {
    clearAllTimers();
    setPhase('scanning');
    setProgress(0);
    setScore(START_SCORE);
    setVisibleChips(0);
    setShowBullet(false);

    const progStart = performance.now();
    const progTick = (now: number): void => {
      const p = Math.min(100, ((now - progStart) / SCAN_MS) * 100);
      setProgress(p);
      if (p < 100) {
        rafRef.current = window.requestAnimationFrame(progTick);
      }
    };
    rafRef.current = window.requestAnimationFrame(progTick);

    const done = window.setTimeout(() => {
      setPhase('done');
      runScoreAnimation();
      // Reveal chips one-by-one.
      KEYWORDS.forEach((_, i) => {
        const t = window.setTimeout(() => {
          setVisibleChips(i + 1);
        }, 300 + i * 160);
        timers.current.push(t);
      });
      const bulletTimer = window.setTimeout(() => {
        setShowBullet(true);
      }, 300 + KEYWORDS.length * 160 + 120);
      timers.current.push(bulletTimer);
    }, SCAN_MS);
    timers.current.push(done);
  }, [clearAllTimers, runScoreAnimation]);

  const handleReset = useCallback((): void => {
    clearAllTimers();
    setPhase('idle');
    setProgress(0);
    setScore(START_SCORE);
    setVisibleChips(0);
    setShowBullet(false);
  }, [clearAllTimers]);

  // --- Gauge geometry ---
  const R = 34;
  const CIRC = 2 * Math.PI * R;
  const dash = CIRC * (score / 100);
  const gaugeColor = scoreColor(score);

  const panelStyle: CSSProperties = {
    background: COLORS.panel,
    borderColor: COLORS.border,
  };

  const textareaStyle: CSSProperties = {
    background: COLORS.surface,
    borderColor: COLORS.border,
    color: COLORS.text,
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: COLORS.surface, color: COLORS.text }}
    >
      <style>{`
        @keyframes ats-scan {
          0% { transform: translateY(-10%); opacity: 0; }
          15% { opacity: 0.9; }
          85% { opacity: 0.9; }
          100% { transform: translateY(1000%); opacity: 0; }
        }
        @keyframes ats-chip-in {
          from { opacity: 0; transform: translateY(6px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ats-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-md"
            style={{ background: 'rgba(99,102,241,0.15)' }}
          >
            <ScanLine size={14} style={{ color: COLORS.accent }} />
          </div>
          <div>
            <div className="text-[13px] font-semibold leading-none">ATS Resume Fixer</div>
            <div className="text-[10px] leading-tight mt-0.5" style={{ color: COLORS.dim }}>
              Beat the applicant-tracking robots
            </div>
          </div>
        </div>
        {phase === 'done' && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] transition-colors"
            style={{ borderColor: COLORS.border, color: COLORS.muted }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.borderHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLORS.border;
            }}
          >
            <RotateCcw size={12} />
            Reset
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-3">
        {phase !== 'done' ? (
          <div className="flex flex-col gap-3">
            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium" style={{ color: COLORS.muted }}>
                  Your Resume
                </span>
                <textarea
                  value={resume}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setResume(e.target.value)}
                  disabled={phase === 'scanning'}
                  rows={4}
                  spellCheck={false}
                  className="resize-none rounded-lg border p-2.5 text-[11px] leading-relaxed outline-none transition-colors focus:border-[rgba(255,255,255,0.16)]"
                  style={textareaStyle}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-medium" style={{ color: COLORS.muted }}>
                  Target Job Description
                </span>
                <textarea
                  value={job}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setJob(e.target.value)}
                  disabled={phase === 'scanning'}
                  rows={4}
                  spellCheck={false}
                  className="resize-none rounded-lg border p-2.5 text-[11px] leading-relaxed outline-none transition-colors focus:border-[rgba(255,255,255,0.16)]"
                  style={textareaStyle}
                />
              </label>
            </div>

            {/* Scan bar / button */}
            {phase === 'scanning' ? (
              <div
                className="relative overflow-hidden rounded-lg border p-4"
                style={panelStyle}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-8"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(99,102,241,0.55), rgba(99,102,241,0))',
                    animation: `ats-scan ${SCAN_MS}ms linear infinite`,
                  }}
                />
                <div className="flex items-center gap-2 text-[12px]">
                  <Loader2 size={15} className="animate-spin" style={{ color: COLORS.accent }} />
                  <span style={{ color: COLORS.text }}>Analyzing keywords &amp; phrasing…</span>
                  <span
                    className="ml-auto tabular-nums text-[12px] font-medium"
                    style={{ color: COLORS.muted }}
                  >
                    {Math.round(progress)}%
                  </span>
                </div>
                <div
                  className="mt-3 h-1.5 w-full overflow-hidden rounded-full"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="h-full rounded-full transition-[width] duration-100"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${COLORS.accent}, #818cf8)`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={handleOptimize}
                className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-semibold transition-transform active:scale-[0.99]"
                style={{
                  background: COLORS.accent,
                  color: '#ffffff',
                  boxShadow: '0 0 24px -6px #6366f166',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px -4px #6366f199';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 24px -6px #6366f166';
                }}
              >
                <Sparkles size={15} />
                Optimize with AI
              </button>
            )}
          </div>
        ) : (
          /* Results */
          <div className="flex flex-col gap-3" style={{ animation: 'ats-fade-up 300ms ease-out' }}>
            {/* Score + gauge */}
            <div
              className="flex items-center gap-4 rounded-lg border p-3"
              style={panelStyle}
            >
              <div className="relative shrink-0" style={{ width: 84, height: 84 }}>
                <svg width={84} height={84} viewBox="0 0 84 84">
                  <circle
                    cx={42}
                    cy={42}
                    r={R}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={7}
                  />
                  <circle
                    cx={42}
                    cy={42}
                    r={R}
                    fill="none"
                    stroke={gaugeColor}
                    strokeWidth={7}
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${CIRC}`}
                    transform="rotate(-90 42 42)"
                    style={{ transition: 'stroke 200ms linear' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="tabular-nums text-[20px] font-bold leading-none"
                    style={{ color: gaugeColor }}
                  >
                    {score}%
                  </span>
                  <span className="text-[9px] mt-0.5" style={{ color: COLORS.dim }}>
                    match
                  </span>
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold">ATS Match Score</div>
                <div className="text-[11px] mt-1 leading-relaxed" style={{ color: COLORS.muted }}>
                  Optimized from{' '}
                  <span className="tabular-nums" style={{ color: '#ef4444' }}>
                    {START_SCORE}%
                  </span>{' '}
                  to{' '}
                  <span className="tabular-nums font-semibold" style={{ color: '#34d399' }}>
                    {END_SCORE}%
                  </span>
                  . Your resume now clears the keyword filter.
                </div>
              </div>
            </div>

            {/* Keywords */}
            <div className="rounded-lg border p-3" style={panelStyle}>
              <div className="text-[11px] font-medium mb-2" style={{ color: COLORS.muted }}>
                Missing keywords injected
              </div>
              <div className="flex flex-wrap gap-1.5">
                {KEYWORDS.map((kw, i) =>
                  i < visibleChips ? (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-medium"
                      style={{
                        borderColor: 'rgba(99,102,241,0.4)',
                        background: 'rgba(99,102,241,0.12)',
                        color: '#c7d2fe',
                        animation: 'ats-chip-in 260ms ease-out both',
                      }}
                    >
                      <CheckCircle2 size={11} style={{ color: COLORS.accent }} />
                      {kw}
                    </span>
                  ) : null
                )}
              </div>
            </div>

            {/* Bullet rewrite */}
            {showBullet && (
              <div
                className="rounded-lg border p-3"
                style={{ ...panelStyle, animation: 'ats-fade-up 300ms ease-out' }}
              >
                <div className="text-[11px] font-medium mb-2" style={{ color: COLORS.muted }}>
                  Bullet rewrite
                </div>
                <div className="flex flex-col gap-2">
                  <div
                    className="text-[11px] leading-relaxed line-through"
                    style={{ color: COLORS.dim }}
                  >
                    {BULLET_BEFORE}
                  </div>
                  <div className="flex items-start gap-1.5">
                    <ArrowRight
                      size={13}
                      className="mt-0.5 shrink-0"
                      style={{ color: COLORS.accent }}
                    />
                    <div
                      className="text-[11.5px] leading-relaxed font-medium tabular-nums"
                      style={{ color: COLORS.text }}
                    >
                      {BULLET_AFTER}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Safe & Truthful badge */}
            <div
              className="flex items-center gap-2 rounded-lg border px-3 py-2"
              style={{
                borderColor: 'rgba(52,211,153,0.3)',
                background: 'rgba(52,211,153,0.08)',
              }}
            >
              <ShieldCheck size={14} style={{ color: '#34d399' }} />
              <span className="text-[10.5px]" style={{ color: '#a7f3d0' }}>
                <span className="font-semibold">Safe &amp; Truthful</span> — only surfaces skills
                already implied by your experience. No fabrication.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AtsDemo;

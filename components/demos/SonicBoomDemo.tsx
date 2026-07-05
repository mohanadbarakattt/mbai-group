import { useCallback, useEffect, useRef, useState, type FC } from 'react';
import { Guitar, Piano, Play, Pause, Activity, Waves } from 'lucide-react';

// ── Theme tokens ──────────────────────────────────────────────
const BG = '#0a0e17';
const PANEL = '#111726';
const BORDER = 'rgba(255,255,255,0.08)';
const BORDER_HOVER = 'rgba(255,255,255,0.16)';
const TEXT = '#e8ecf4';
const MUTED = '#8b93a7';
const DIM = '#5b6478';
const ACCENT = '#22d3ee';
const GLOW = { boxShadow: '0 0 24px -6px #22d3ee66' } as const;

type Instrument = 'guitar' | 'piano';

interface Note {
  id: number;
  string: number; // 0..5
  fret: number; // 1..5
  x: number; // percentage 0..100 (right -> left)
}

const CHORD_SEQUENCE = ['F', 'Am', 'G', 'C', 'Em'] as const;

// Piano key layout: whites + which whites have a black key to their right
const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E'];
const BLACK_AFTER = new Set([0, 1, 3, 4, 5, 7, 8]); // no black after E(2) or B(6)

const SonicBoomDemo: FC = () => {
  const [instrument, setInstrument] = useState<Instrument>('guitar');
  const [playing, setPlaying] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);

  const [notes, setNotes] = useState<Note[]>([]);
  const [precision, setPrecision] = useState<number>(92.4);
  const [chords, setChords] = useState<string[]>([]);
  const [bars, setBars] = useState<number[]>(() =>
    Array.from({ length: 28 }, () => 20 + Math.random() * 30)
  );
  const [activeKeys, setActiveKeys] = useState<Set<number>>(new Set());

  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const spawnAccRef = useRef<number>(0);
  const noteIdRef = useRef<number>(0);
  const chordIdxRef = useRef<number>(0);

  // ── Animation loop: move notes right -> left, spawn new ones ──
  useEffect(() => {
    if (!playing) return;

    const step = (t: number) => {
      const last = lastTimeRef.current || t;
      const dt = Math.min(t - last, 60); // clamp for tab-switch jumps
      lastTimeRef.current = t;

      // spawn every ~520ms
      spawnAccRef.current += dt;
      let spawned: Note | null = null;
      if (spawnAccRef.current >= 520) {
        spawnAccRef.current = 0;
        noteIdRef.current += 1;
        spawned = {
          id: noteIdRef.current,
          string: Math.floor(Math.random() * 6),
          fret: 1 + Math.floor(Math.random() * 5),
          x: 100,
        };
      }

      const speed = 0.028; // % per ms
      setNotes((prev) => {
        const next = prev
          .map((n) => ({ ...n, x: n.x - speed * dt }))
          .filter((n) => n.x > -6);
        if (spawned) next.push(spawned);
        return next;
      });

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
    };
  }, [playing]);

  // ── Precision drift (~700ms) ──
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setPrecision((p) => {
        const next = p + (Math.random() - 0.5) * 3.4;
        return Math.max(88, Math.min(97, Math.round(next * 10) / 10));
      });
    }, 700);
    return () => window.clearInterval(id);
  }, [playing]);

  // ── Chord detection append (loop through sequence) ──
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const chord = CHORD_SEQUENCE[chordIdxRef.current % CHORD_SEQUENCE.length];
      chordIdxRef.current += 1;
      setChords((prev) => [...prev, chord].slice(-6));
    }, 1400);
    return () => window.clearInterval(id);
  }, [playing]);

  // ── Waveform bars ──
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setBars((prev) => prev.map(() => 12 + Math.random() * 78));
    }, 110);
    return () => window.clearInterval(id);
  }, [playing]);

  // ── Piano key lighting ──
  useEffect(() => {
    if (!playing || instrument !== 'piano') {
      setActiveKeys(new Set());
      return;
    }
    const id = window.setInterval(() => {
      const count = 1 + Math.floor(Math.random() * 3);
      const set = new Set<number>();
      for (let i = 0; i < count; i++) {
        set.add(Math.floor(Math.random() * WHITE_KEYS.length));
      }
      setActiveKeys(set);
    }, 380);
    return () => window.clearInterval(id);
  }, [playing, instrument]);

  const handleStart = useCallback(() => {
    if (!started) {
      setStarted(true);
      setPlaying(true);
      return;
    }
    setPlaying((p) => !p);
  }, [started]);

  return (
    <div
      className="w-full h-full flex flex-col text-[13px] select-none"
      style={{ background: BG, color: TEXT, minHeight: 400 }}
    >
      {/* ── Header strip ── */}
      <div
        className="flex items-center justify-between gap-3 px-4 py-3"
        style={{ borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
            style={{ background: PANEL, border: `1px solid ${BORDER}`, ...GLOW }}
          >
            <Waves size={16} color={ACCENT} />
          </div>
          <div className="min-w-0">
            <div className="font-semibold tracking-tight leading-none">SonicScribe</div>
            <div className="text-[11px] leading-tight" style={{ color: DIM }}>
              Interactive Flow · Practice
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Instrument toggle */}
          <div
            className="flex items-center p-0.5 rounded-lg"
            style={{ background: PANEL, border: `1px solid ${BORDER}` }}
          >
            {(['guitar', 'piano'] as Instrument[]).map((inst) => {
              const active = instrument === inst;
              const Icon = inst === 'guitar' ? Guitar : Piano;
              return (
                <button
                  key={inst}
                  type="button"
                  onClick={() => setInstrument(inst)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md capitalize transition-colors"
                  style={{
                    color: active ? BG : MUTED,
                    background: active ? ACCENT : 'transparent',
                    boxShadow: active ? '0 0 18px -6px #22d3eeaa' : 'none',
                  }}
                >
                  <Icon size={14} />
                  <span className="text-[12px] font-medium">{inst}</span>
                </button>
              );
            })}
          </div>

          {/* Start / Pause */}
          <button
            type="button"
            onClick={handleStart}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-semibold transition-transform active:scale-95"
            style={{
              background: playing ? PANEL : ACCENT,
              color: playing ? TEXT : BG,
              border: `1px solid ${playing ? BORDER_HOVER : ACCENT}`,
              boxShadow: playing ? 'none' : '0 0 24px -6px #22d3ee99',
            }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            <span className="text-[12px]">
              {!started ? 'Start Session' : playing ? 'Pause' : 'Resume'}
            </span>
          </button>
        </div>
      </div>

      {/* ── Main stage ── */}
      <div className="flex-1 min-h-0 p-4">
        <div
          className="w-full h-full rounded-xl overflow-hidden relative"
          style={{
            background: PANEL,
            border: `1px solid ${BORDER}`,
            boxShadow: playing ? '0 0 40px -18px #22d3ee55 inset' : 'none',
          }}
        >
          {instrument === 'guitar' ? (
            <Fretboard notes={notes} playing={playing} />
          ) : (
            <PianoStage activeKeys={activeKeys} />
          )}

          {!started && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center px-4"
              style={{ background: 'rgba(10,14,23,0.55)', backdropFilter: 'blur(1px)' }}
            >
              <div className="text-[13px] font-medium" style={{ color: TEXT }}>
                Interactive Flow ready
              </div>
              <div className="text-[11px]" style={{ color: MUTED }}>
                Press Start Session to begin real-time analysis
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Footer strip ── */}
      <div
        className="px-4 py-3 flex flex-col gap-2.5"
        style={{ borderTop: `1px solid ${BORDER}` }}
      >
        {/* Precision + waveform row */}
        <div className="flex items-center gap-4">
          {/* Precision */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <Activity size={12} color={ACCENT} />
                <span className="text-[11px] uppercase tracking-wide" style={{ color: MUTED }}>
                  Pitch Precision
                </span>
              </div>
              <span
                className="text-[13px] font-semibold tabular-nums"
                style={{ color: ACCENT }}
              >
                {precision.toFixed(1)}%
              </span>
            </div>
            <div
              className="h-1.5 w-full rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <div
                className="h-full rounded-full transition-[width] duration-500 ease-out"
                style={{
                  width: `${precision}%`,
                  background: `linear-gradient(90deg, #0891b2, ${ACCENT})`,
                  boxShadow: playing ? '0 0 12px 0 #22d3ee88' : 'none',
                }}
              />
            </div>
          </div>

          {/* Waveform */}
          <div className="hidden sm:flex items-end gap-[3px] h-9 w-[140px] shrink-0">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-full transition-[height] duration-100 ease-linear"
                style={{
                  height: `${playing ? h : 14}%`,
                  background: ACCENT,
                  opacity: playing ? 0.55 + (h / 100) * 0.45 : 0.22,
                }}
              />
            ))}
          </div>
        </div>

        {/* Detected chords */}
        <div className="flex items-center gap-2 min-h-[26px]">
          <span
            className="text-[11px] uppercase tracking-wide shrink-0"
            style={{ color: DIM }}
          >
            Detected Chords
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {chords.length === 0 && (
              <span className="text-[11px]" style={{ color: DIM }}>
                —
              </span>
            )}
            {chords.map((c, i) => {
              const newest = i === chords.length - 1;
              return (
                <span
                  key={`${c}-${i}`}
                  className="px-2 py-0.5 rounded-md text-[12px] font-medium tabular-nums transition-colors"
                  style={{
                    color: newest ? BG : MUTED,
                    background: newest ? ACCENT : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${newest ? ACCENT : BORDER}`,
                    boxShadow: newest ? '0 0 16px -6px #22d3eeaa' : 'none',
                  }}
                >
                  {c}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Fretboard sub-component ────────────────────────────────────
const Fretboard: FC<{ notes: Note[]; playing: boolean }> = ({ notes, playing }) => {
  const strings = [0, 1, 2, 3, 4, 5];
  return (
    <div className="absolute inset-0 py-6 px-2">
      <div className="relative w-full h-full">
        {/* Fret markers (vertical guides) */}
        {[20, 40, 60, 80].map((left) => (
          <div
            key={left}
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${left}%`, background: 'rgba(255,255,255,0.05)' }}
          />
        ))}

        {/* Strings */}
        {strings.map((s) => {
          const top = ((s + 0.5) / strings.length) * 100;
          return (
            <div
              key={s}
              className="absolute left-0 right-0"
              style={{
                top: `${top}%`,
                height: 1 + s * 0.35,
                background: 'rgba(255,255,255,0.14)',
              }}
            />
          );
        })}

        {/* Notes */}
        {notes.map((n) => {
          const top = ((n.string + 0.5) / strings.length) * 100;
          return (
            <div
              key={n.id}
              className="absolute flex items-center justify-center rounded-full text-[10px] font-bold tabular-nums -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${n.x}%`,
                top: `${top}%`,
                width: 22,
                height: 22,
                color: BG,
                background: ACCENT,
                boxShadow: '0 0 16px -2px #22d3eecc',
              }}
            >
              {n.fret}
            </div>
          );
        })}

        {/* Trigger line on the left */}
        <div
          className="absolute top-0 bottom-0 w-[2px]"
          style={{
            left: '6%',
            background: playing ? ACCENT : 'rgba(255,255,255,0.12)',
            boxShadow: playing ? '0 0 14px 1px #22d3ee99' : 'none',
          }}
        />
      </div>
    </div>
  );
};

// ── Piano sub-component ────────────────────────────────────────
const PianoStage: FC<{ activeKeys: Set<number> }> = ({ activeKeys }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div
        className="relative flex h-full max-h-[180px] w-full max-w-[420px] rounded-md overflow-hidden"
        style={{ border: `1px solid ${BORDER}` }}
      >
        {WHITE_KEYS.map((label, i) => {
          const active = activeKeys.has(i);
          return (
            <div
              key={i}
              className="relative flex-1 flex items-end justify-center pb-2"
              style={{
                background: active ? ACCENT : '#e8ecf4',
                borderRight: i < WHITE_KEYS.length - 1 ? '1px solid #0a0e17' : 'none',
                boxShadow: active ? '0 0 22px -4px #22d3ee inset' : 'none',
                transition: 'background 120ms ease',
              }}
            >
              <span
                className="text-[9px] font-semibold"
                style={{ color: active ? BG : '#9aa3b5' }}
              >
                {label}
              </span>
            </div>
          );
        })}

        {/* Black keys */}
        {WHITE_KEYS.map((_, i) => {
          if (!BLACK_AFTER.has(i)) return null;
          const left = ((i + 1) / WHITE_KEYS.length) * 100;
          return (
            <div
              key={`b-${i}`}
              className="absolute top-0 rounded-b-sm z-10 -translate-x-1/2"
              style={{
                left: `${left}%`,
                width: `${(1 / WHITE_KEYS.length) * 62}%`,
                height: '62%',
                background: '#0a0e17',
                border: `1px solid ${BORDER_HOVER}`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SonicBoomDemo;

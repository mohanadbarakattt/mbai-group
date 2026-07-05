import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type FC,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { Languages, Sparkles, ArrowRight, Info, Zap } from 'lucide-react';

interface Translation {
  en: string;
  ar: string;
  note: string;
  generic?: boolean;
}

interface DictEntry extends Translation {}

const COLORS = {
  surface0: '#0a0e17',
  surface1: '#111726',
  border: 'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.16)',
  text: '#e8ecf4',
  muted: '#8b93a7',
  dim: '#5b6478',
  accent: '#a855f7',
} as const;

const GLOW = '0 0 24px -6px #a855f766';

const DICTIONARY: Record<string, DictEntry> = {
  'elsalam 3aleekom': {
    en: 'Peace be upon you',
    ar: 'السلام عليكم',
    note: "Standard greeting. The numeral '3' maps to the Arabic letter ع (ain).",
  },
  'ezayek?': {
    en: 'How are you?',
    ar: 'إزيك؟',
    note: 'Casual Egyptian greeting.',
  },
  '3amel eh?': {
    en: "What are you doing? / How's it going?",
    ar: 'عامل إيه؟',
    note: "'3' = ع. Very common colloquial check-in.",
  },
  'mesh fahem 7aga': {
    en: "I don't understand anything.",
    ar: 'مش فاهم حاجة',
    note: "'mesh' is a negation particle; '7aga' (7 = ح) means thing/anything.",
  },
  'matgeeb mn el 5olasa ya sa7by': {
    en: 'Just get to the point, my friend.',
    ar: 'ما تجيب من الخلاصة يا صاحبي',
    note: "'5olasa' (5 = خ) = essence/summary; 'sa7by' = my friend.",
  },
  'msh gaya ma3aya ska 5ales ya zmely': {
    en: "It's not working for me at all, my friend.",
    ar: 'مش جاية معايا خالص يا زميلي',
    note: "Idiomatic; '5ales' (5 = خ) = at all.",
  },
};

const QUICK_CHIPS: string[] = [
  'elsalam 3aleekom',
  'ezayek?',
  '3amel eh?',
  'mesh fahem 7aga',
  'matgeeb mn el 5olasa ya sa7by',
];

const FRANCO_LEGEND: { num: string; letter: string }[] = [
  { num: '2', letter: 'أ' },
  { num: '3', letter: 'ع' },
  { num: '5', letter: 'خ' },
  { num: '7', letter: 'ح' },
  { num: '9', letter: 'ص' },
];

function lookup(raw: string): Translation {
  const key = raw.trim().toLowerCase();
  const hit = DICTIONARY[key];
  if (hit) return hit;
  return {
    en: '(Translation preview — full model handles any Egyptian dialect input.)',
    ar: raw.trim() || '—',
    note: 'The live model is trained on Reddit-sourced Egyptian dialect data.',
    generic: true,
  };
}

const ThreeArabyDemo: FC = () => {
  const [input, setInput] = useState<string>('');
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<Translation | null>(null);
  const [dots, setDots] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dotsRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback((): void => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (dotsRef.current !== null) {
      clearInterval(dotsRef.current);
      dotsRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const runTranslate = useCallback(
    (value: string): void => {
      const text = value.trim();
      if (!text) return;
      clearTimers();
      setResult(null);
      setAnalyzing(true);
      setDots(0);
      dotsRef.current = setInterval(() => {
        setDots((d) => (d + 1) % 4);
      }, 180);
      timerRef.current = setTimeout(() => {
        if (dotsRef.current !== null) {
          clearInterval(dotsRef.current);
          dotsRef.current = null;
        }
        setResult(lookup(text));
        setAnalyzing(false);
      }, 600);
    },
    [clearTimers],
  );

  const handleSubmit = useCallback((): void => {
    runTranslate(input);
  }, [input, runTranslate]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const handleChip = useCallback(
    (phrase: string): void => {
      setInput(phrase);
      runTranslate(phrase);
    },
    [runTranslate],
  );

  const rootStyle: CSSProperties = {
    background: `radial-gradient(120% 120% at 15% 0%, #141a2c 0%, ${COLORS.surface0} 55%)`,
    color: COLORS.text,
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  };

  const cardStyle: CSSProperties = {
    background: COLORS.surface1,
    border: `1px solid ${COLORS.border}`,
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ ...rootStyle, minHeight: 400 }}
    >
      <div className="flex flex-col gap-3 p-4 sm:p-5 flex-1 overflow-auto">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{
              width: 40,
              height: 40,
              background:
                'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(168,85,247,0.05))',
              border: `1px solid ${COLORS.border}`,
              boxShadow: GLOW,
            }}
          >
            <Languages size={20} color={COLORS.accent} />
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="font-semibold tracking-tight"
              style={{ fontSize: 17 }}
            >
              3ARABY
            </span>
            <span style={{ fontSize: 11, color: COLORS.muted }}>
              Franco-Arabic → English &amp; Arabic
            </span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <Sparkles size={13} color={COLORS.accent} />
            <span style={{ fontSize: 10.5, color: COLORS.dim }}>
              ML translator
            </span>
          </div>
        </div>

        {/* Input row */}
        <div className="flex items-stretch gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type Franco-Arabic, e.g. ezayek?"
            spellCheck={false}
            className="flex-1 rounded-lg px-3 outline-none transition-colors"
            style={{
              background: COLORS.surface0,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.text,
              fontSize: 14,
              height: 42,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = COLORS.accent;
              e.currentTarget.style.boxShadow = GLOW;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = COLORS.border;
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={analyzing || input.trim().length === 0}
            className="flex items-center gap-1.5 rounded-lg px-3.5 font-medium transition-all"
            style={{
              height: 42,
              fontSize: 13.5,
              color: '#0a0e17',
              background:
                analyzing || input.trim().length === 0
                  ? 'rgba(168,85,247,0.35)'
                  : COLORS.accent,
              border: '1px solid transparent',
              boxShadow:
                analyzing || input.trim().length === 0 ? 'none' : GLOW,
              cursor:
                analyzing || input.trim().length === 0
                  ? 'not-allowed'
                  : 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Translate
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Quick-try chips */}
        <div className="flex flex-wrap gap-1.5">
          {QUICK_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChip(chip)}
              className="rounded-full px-2.5 py-1 transition-colors"
              style={{
                fontSize: 11,
                color: COLORS.muted,
                background: COLORS.surface1,
                border: `1px solid ${COLORS.border}`,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.borderHover;
                e.currentTarget.style.color = COLORS.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.border;
                e.currentTarget.style.color = COLORS.muted;
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Result / analyzing area */}
        <div className="flex-1 min-h-0">
          {analyzing ? (
            <div
              className="rounded-xl p-4 flex items-center gap-3 overflow-hidden relative"
              style={{ ...cardStyle }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, transparent, rgba(168,85,247,0.12), transparent)',
                  animation: 'araby-scan 1.1s linear infinite',
                }}
              />
              <Zap size={16} color={COLORS.accent} />
              <span style={{ fontSize: 13, color: COLORS.muted }}>
                Analyzing dialect
                <span style={{ color: COLORS.accent }}>
                  {'.'.repeat(dots)}
                  <span style={{ opacity: 0 }}>{'.'.repeat(3 - dots)}</span>
                </span>
              </span>
            </div>
          ) : result ? (
            <div className="rounded-xl p-4 flex flex-col gap-3" style={cardStyle}>
              {/* English */}
              <div className="flex flex-col gap-0.5">
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: 1,
                    color: COLORS.dim,
                    textTransform: 'uppercase',
                  }}
                >
                  English
                </span>
                <span
                  style={{
                    fontSize: 16,
                    color: COLORS.text,
                    fontWeight: 500,
                    lineHeight: 1.35,
                  }}
                >
                  {result.en}
                </span>
              </div>

              <div style={{ height: 1, background: COLORS.border }} />

              {/* Arabic */}
              <div className="flex flex-col gap-0.5">
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: 1,
                    color: COLORS.dim,
                    textTransform: 'uppercase',
                  }}
                >
                  Arabic
                </span>
                <span
                  dir="rtl"
                  style={{
                    fontSize: 24,
                    color: COLORS.accent,
                    fontWeight: 600,
                    lineHeight: 1.4,
                    textShadow: '0 0 18px rgba(168,85,247,0.35)',
                  }}
                >
                  {result.ar}
                </span>
              </div>

              {/* Context note */}
              <div
                className="flex items-start gap-2 rounded-lg p-2.5"
                style={{
                  background: COLORS.surface0,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <Info
                  size={14}
                  color={COLORS.muted}
                  style={{ marginTop: 1, flexShrink: 0 }}
                />
                <div className="flex flex-col gap-0.5">
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: 0.5,
                      color: COLORS.dim,
                      textTransform: 'uppercase',
                    }}
                  >
                    Context
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: COLORS.muted,
                      lineHeight: 1.45,
                    }}
                  >
                    {result.note}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="rounded-xl p-4 flex items-center justify-center text-center"
              style={{
                ...cardStyle,
                borderStyle: 'dashed',
                minHeight: 96,
              }}
            >
              <span style={{ fontSize: 12.5, color: COLORS.dim }}>
                Enter a phrase or tap a chip to see the translation.
              </span>
            </div>
          )}
        </div>

        {/* Franco System legend */}
        <div className="flex items-center gap-2 flex-wrap">
          <span style={{ fontSize: 10.5, color: COLORS.dim }}>
            Franco System
          </span>
          {FRANCO_LEGEND.map((m) => (
            <span
              key={m.num}
              className="flex items-center gap-1 rounded-md px-2 py-0.5"
              style={{
                fontSize: 11,
                background: COLORS.surface1,
                border: `1px solid ${COLORS.border}`,
                color: COLORS.muted,
              }}
            >
              <span style={{ color: COLORS.accent, fontWeight: 600 }}>
                {m.num}
              </span>
              <span style={{ color: COLORS.dim }}>=</span>
              <span dir="rtl" style={{ color: COLORS.text, fontSize: 13 }}>
                {m.letter}
              </span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes araby-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ThreeArabyDemo;

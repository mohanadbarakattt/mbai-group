import React, { useEffect, useRef, useState } from 'react';
import { Clapperboard, Image as ImageIcon, Loader2, Play, Sparkles } from 'lucide-react';

type Mode = 'image' | 'video';
type Phase = 'idle' | 'generating' | 'done';

interface Preset {
  id: string;
  label: string;
  /** Two hues used to tint the generated frame placeholders. */
  hues: [number, number];
}

const PRESETS: Preset[] = [
  { id: 'street', label: 'Cairo street food', hues: [26, 44] },
  { id: 'ramadan', label: 'Ramadan brand spot', hues: [286, 320] },
  { id: 'sahel', label: 'North Coast summer', hues: [188, 206] },
];

/** Prompt examples in the three ways Virlo's users actually write. */
const EXAMPLES = [
  'wa7ed by3mel koshari fe wost el balad, cinematic, golden hour',
  'إعلان عصير مانجو، إضاءة دافية، لقطة قريبة',
  'rooftop café at sunset, Cairo skyline, slow pan',
];

const STEPS = ['Reading the prompt…', 'Matching Egyptian presets…', 'Rendering frames…'];

const VirloDemo: React.FC = () => {
  const [mode, setMode] = useState<Mode>('image');
  const [preset, setPreset] = useState<Preset>(PRESETS[0]);
  const [prompt, setPrompt] = useState('');
  const [phase, setPhase] = useState<Phase>('idle');
  const [step, setStep] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => clearTimers, []);

  const generate = (text?: string) => {
    const p = (text ?? prompt).trim();
    if (!p || phase === 'generating') return;
    clearTimers();
    setPrompt(p);
    setPhase('generating');
    setStep(0);
    STEPS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i), i * 700));
    });
    timers.current.push(setTimeout(() => setPhase('done'), STEPS.length * 700));
  };

  const reset = () => { clearTimers(); setPhase('idle'); setStep(0); };

  // Four frames, tinted across the preset's hue range so each render looks distinct.
  const frames = Array.from({ length: 4 }, (_, i) => {
    const [h1, h2] = preset.hues;
    const h = h1 + ((h2 - h1) * i) / 3;
    return `linear-gradient(${140 + i * 12}deg, hsl(${h} 70% 46%), hsl(${h + 14} 55% 16%) 70%, #0a0e17)`;
  });

  return (
    <div className="w-full h-full grid md:grid-cols-2 text-[#e8ecf4]" style={{ background: '#0a0e17' }}>
      {/* Controls */}
      <div className="p-5 border-b md:border-b-0 md:border-r" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0d1220' }}>
        <div className="flex items-center gap-2 text-sm font-bold mb-4">
          <Clapperboard size={16} className="text-[#f97316]" /> Virlo Studio
          <span className="ml-auto flex rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            {(['image', 'video'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); reset(); }}
                className="px-2.5 py-1 text-[11px] font-semibold capitalize transition-colors flex items-center gap-1"
                style={mode === m
                  ? { background: 'rgba(249,115,22,0.16)', color: '#f97316' }
                  : { background: 'transparent', color: '#8b93a7' }}
              >
                {m === 'image' ? <ImageIcon size={11} /> : <Play size={11} />} {m}
              </button>
            ))}
          </span>
        </div>

        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b6478]">Prompt — Franco, عربي, or English</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. wa7ed by3mel koshari fe wost el balad, cinematic…"
          rows={2}
          dir="auto"
          className="mt-2 w-full rounded-xl p-3 text-sm resize-none focus:outline-none"
          style={{ background: '#111726', border: '1px solid rgba(255,255,255,0.08)', color: '#e8ecf4' }}
        />

        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5b6478] mt-3 mb-1.5">Egyptian preset</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => { setPreset(p); reset(); }}
              className="text-[11px] px-2.5 py-1.5 rounded-full transition-colors"
              style={preset.id === p.id
                ? { background: 'rgba(249,115,22,0.16)', border: '1px solid rgba(249,115,22,0.5)', color: '#f97316' }
                : { background: '#111726', border: '1px solid rgba(255,255,255,0.08)', color: '#8b93a7' }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => generate()}
          disabled={phase === 'generating' || !prompt.trim()}
          className="btn-primary mt-3.5 w-full py-2.5 rounded-lg font-semibold text-sm disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {phase === 'generating'
            ? <><Loader2 size={15} className="animate-spin" /> Generating…</>
            : <><Sparkles size={15} /> Generate {mode}</>}
        </button>

        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => generate(ex)}
              dir="auto"
              className="text-[11px] px-2.5 py-1.5 rounded-full text-[#8b93a7] hover:text-white transition-colors text-left max-w-full truncate"
              style={{ background: '#111726', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {ex}
            </button>
          ))}
        </div>

        {phase !== 'idle' && (
          <p className="mt-3 text-[11px] font-mono flex items-center gap-2" style={{ color: phase === 'done' ? '#34d399' : '#8b93a7' }}>
            {phase === 'done'
              ? <>✓ 4 {mode === 'image' ? 'images' : 'shots'} ready · {preset.label}</>
              : <><Loader2 size={11} className="animate-spin" /> {STEPS[step]}</>}
          </p>
        )}
      </div>

      {/* Output */}
      <div className="p-5 flex items-center justify-center min-h-[300px]" style={{ background: '#080b12' }}>
        {phase === 'idle' ? (
          <div className="text-center text-[#5b6478]">
            <Clapperboard size={38} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">Your generated {mode === 'image' ? 'images' : 'shots'} appear here.</p>
            <p className="text-xs mt-1 opacity-70">Write a prompt, or tap an example.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 w-full">
            {frames.map((bg, i) => (
              <div
                key={i}
                className="relative rounded-lg overflow-hidden"
                style={{
                  aspectRatio: mode === 'image' ? '1 / 1' : '16 / 9',
                  background: bg,
                  border: '1px solid rgba(255,255,255,0.1)',
                  opacity: phase === 'done' ? 1 : 0.28,
                  filter: phase === 'done' ? 'none' : 'blur(6px)',
                  transition: 'opacity .5s ease, filter .6s ease',
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                {phase === 'done' && mode === 'video' && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm"
                      style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.35)' }}>
                      <Play size={13} className="text-white ml-0.5" />
                    </span>
                  </span>
                )}
                {phase === 'generating' && (
                  <span className="absolute inset-0 animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VirloDemo;

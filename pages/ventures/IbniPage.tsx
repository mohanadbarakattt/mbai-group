import React, { useEffect, useRef, useState } from 'react';
import { Hammer, Check, Loader2, Terminal, Smartphone } from 'lucide-react';
import VentureShell from './VentureShell';

const STEPS = [
  'Understanding your idea…',
  'Designing the data model…',
  'Generating the interface…',
  'Wiring the AI logic…',
  'Deploying preview…',
];

const SUGGESTIONS = [
  'A booking app for my barbershop in Arabic and English',
  'A dashboard that tracks my store\'s daily sales',
  'A landing page for my real estate agency with a lead form',
];

const IbniPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [phase, setPhase] = useState<'idle' | 'building' | 'done'>('idle');
  const [step, setStep] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const build = (text?: string) => {
    const p = (text ?? prompt).trim();
    if (!p || phase === 'building') return;
    setPrompt(p);
    setPhase('building');
    setStep(0);
    timer.current = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) {
          if (timer.current) clearInterval(timer.current);
          setTimeout(() => setPhase('done'), 500);
          return s;
        }
        return s + 1;
      });
    }, 900);
  };

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  return (
    <VentureShell
      name="IBNI"
      accent="#10b981"
      tagline="The AI App Builder"
      headline={<>Describe it.<br /><span className="text-[#10b981]">IBNI builds it.</span></>}
      sub={'IBNI — "build me" in Arabic — turns a plain-language idea into a working application. No code, no dev team, no six-month timeline. Type what you want in Arabic or English and watch the software assemble itself.'}
      pillars={[
        { title: 'Idea to app', text: 'A single sentence becomes a data model, an interface, and working logic — architected the way a senior engineer would.' },
        { title: 'Bilingual by design', text: 'Prompts, interfaces, and generated apps work natively in Arabic and English — built for MENA founders first.' },
        { title: 'Own what you build', text: 'Generated apps are real, exportable software — not a walled garden. Deploy anywhere, extend with real code later.' },
      ]}
    >
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-[#e2d9ce] bg-white text-sm font-bold text-[#111111]">
          <Hammer size={16} className="text-[#10b981]" /> IBNI Studio
        </div>

        <div className="grid md:grid-cols-2">
          {/* Left: prompt + build log */}
          <div className="p-6 bg-white border-b md:border-b-0 md:border-r border-[#e2d9ce]">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a9490]">What should IBNI build?</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A booking app for my barbershop in Arabic and English"
              rows={3}
              className="mt-2 w-full rounded-xl border border-[#e2d9ce] bg-[#f8f5f1] p-4 text-sm text-[#111111] placeholder:text-[#b0a89e] focus:outline-none focus:border-[#10b981] resize-none"
            />
            <button
              onClick={() => build()}
              disabled={phase === 'building' || !prompt.trim()}
              className="mt-3 w-full py-3 rounded-lg bg-[#111111] hover:bg-[#2a2a2a] disabled:opacity-40 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              {phase === 'building' ? <><Loader2 size={15} className="animate-spin" /> Building…</> : <>⚡ Build my app</>}
            </button>

            <div className="mt-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => build(s)} className="text-[11px] px-3 py-1.5 rounded-full border border-[#e2d9ce] text-[#6b6460] hover:border-[#10b981] hover:text-[#111111] transition-colors bg-[#f8f5f1] text-left">
                  {s}
                </button>
              ))}
            </div>

            {phase !== 'idle' && (
              <div className="mt-5 rounded-xl bg-[#111111] p-4 font-mono text-xs space-y-2">
                <p className="text-white/40 flex items-center gap-2"><Terminal size={12} /> ibni build</p>
                {STEPS.map((s, i) => (
                  <p key={s} className={`flex items-center gap-2 transition-opacity duration-300 ${i <= step ? 'opacity-100' : 'opacity-0'}`}>
                    {i < step || phase === 'done' ? <Check size={12} className="text-[#10b981]" /> : <Loader2 size={12} className="text-white/60 animate-spin" />}
                    <span className={i < step || phase === 'done' ? 'text-[#10b981]' : 'text-white/80'}>{s}</span>
                  </p>
                ))}
                {phase === 'done' && <p className="text-[#10b981] font-bold pt-1">✓ Preview ready in 4.3s</p>}
              </div>
            )}
          </div>

          {/* Right: mock preview */}
          <div className="p-6 bg-[#f0ebe3]/50 flex items-center justify-center min-h-[380px]">
            {phase === 'done' ? (
              <div className="w-full max-w-[260px] rounded-[2rem] border-[6px] border-[#111111] bg-white overflow-hidden shadow-2xl animate-[fadeIn_0.6s_ease]">
                <div className="bg-[#10b981] px-4 py-4 text-white">
                  <p className="text-[10px] opacity-80">Generated by IBNI</p>
                  <p className="font-bold text-sm leading-tight mt-0.5 line-clamp-2">{prompt}</p>
                </div>
                <div className="p-4 space-y-3">
                  {[92, 68, 80].map((w, i) => (
                    <div key={i} className="rounded-lg border border-[#e2d9ce] p-3">
                      <div className="h-2 rounded bg-[#10b981]/30 mb-2" style={{ width: `${w}%` }} />
                      <div className="h-2 rounded bg-[#f0ebe3]" style={{ width: `${w - 25}%` }} />
                    </div>
                  ))}
                  <div className="rounded-lg bg-[#111111] text-white text-center text-xs font-semibold py-2.5">احجز الآن · Book now</div>
                </div>
              </div>
            ) : (
              <div className="text-center text-[#9a9490]">
                <Smartphone size={40} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm">Your app preview appears here.</p>
                <p className="text-xs mt-1 opacity-70">Type an idea and hit “Build my app”.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </VentureShell>
  );
};

export default IbniPage;

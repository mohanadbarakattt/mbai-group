import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Send, Sparkles } from 'lucide-react';

interface Msg { role: 'user' | 'tut'; text: string; }

const SCRIPT: Record<string, string> = {
  photosynthesis: 'Think of a plant as a tiny solar-powered kitchen 🌱. It takes sunlight, water from the roots, and CO₂ from the air, and "cooks" them into glucose (its food) — releasing the oxygen you breathe as a bonus. Want me to explain it بالعربي, or quiz you on it?',
  quadratic: 'A quadratic equation is a curve\'s story: ax² + bx + c = 0. The formula x = (−b ± √(b²−4ac)) / 2a finds where it crosses zero. Try x² − 5x + 6 = 0 → x = 2 or 3. Want to solve one together, step by step?',
  arabic: 'أكيد! أنا بشرح بالعربي الفصحى أو بالمصري، زي ما يريحك. قولي إيه الموضوع اللي واقف معاك — رياضة، فيزياء، إنجليزي؟ هنمشي فيه خطوة خطوة لحد ما يبقى سهل. 💡',
  default: 'Great question! I\'d break that into three small steps and check your understanding after each one — that\'s how TUT works: a conversation at your pace, in Arabic or English. (Full model launching soon — this is a preview.)',
};

const SUGGESTIONS = [
  { label: 'Explain photosynthesis simply', key: 'photosynthesis' },
  { label: 'Help me with quadratic equations', key: 'quadratic' },
  { label: 'اشرحلي بالعربي', key: 'arabic' },
];

const TutDemo: React.FC = () => {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'tut', text: 'أهلاً! I\'m TUT — your personal AI tutor. Ask me anything from your curriculum, in Arabic or English, and I\'ll explain it at your pace. 👑' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' }); }, [messages, typing]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const send = (text?: string, key?: string) => {
    const t = (text ?? input).trim();
    if (!t || typing) return;
    setMessages((m) => [...m, { role: 'user', text: t }]);
    setInput(''); setTyping(true);
    const lower = t.toLowerCase();
    const reply = SCRIPT[key ?? ''] ??
      (lower.includes('photo') ? SCRIPT.photosynthesis
        : lower.includes('quad') || lower.includes('equation') || lower.includes('math') ? SCRIPT.quadratic
        : /[؀-ۿ]/.test(t) ? SCRIPT.arabic : SCRIPT.default);
    timer.current = setTimeout(() => { setMessages((m) => [...m, { role: 'tut', text: reply }]); setTyping(false); }, 1000);
  };

  return (
    <div className="w-full h-full flex flex-col text-[#e8ecf4]" style={{ background: '#0a0e17' }}>
      <div className="flex items-center gap-2 px-5 py-3.5 border-b text-sm font-bold" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0d1220' }}>
        <GraduationCap size={16} className="text-amber-300" /> TUT — Study Session
        <span className="ml-auto text-[10px] font-semibold text-[#5b6478] uppercase tracking-wide flex items-center gap-1.5"><Sparkles size={11} className="text-amber-300" /> Concept preview</span>
      </div>
      <div ref={scroller} className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: '#080b12', minHeight: 220 }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
              style={m.role === 'user'
                ? { background: 'linear-gradient(120deg,#4f46e5,#6366f1)', color: '#fff', borderBottomRightRadius: 6 }
                : { background: '#111726', border: '1px solid rgba(255,255,255,0.08)', color: '#c7cede', borderBottomLeftRadius: 6 }}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-3.5 py-3 flex gap-1.5 items-center" style={{ background: '#111726', border: '1px solid rgba(255,255,255,0.08)', borderBottomLeftRadius: 6 }}>
              {[0, 1, 2].map((d) => <span key={d} className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />)}
            </div>
          </div>
        )}
      </div>
      <div className="border-t p-3.5" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0d1220' }}>
        <div className="flex flex-wrap gap-2 mb-2.5">
          {SUGGESTIONS.map((s) => (
            <button key={s.key} onClick={() => send(s.label, s.key)} className="text-[11px] px-2.5 py-1.5 rounded-full text-[#8b93a7] hover:text-white transition-colors"
              style={{ background: '#111726', border: '1px solid rgba(255,255,255,0.08)' }}>{s.label}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask TUT anything… اسأل أي حاجة"
            className="flex-1 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none" style={{ background: '#111726', border: '1px solid rgba(255,255,255,0.08)', color: '#e8ecf4' }} />
          <button onClick={() => send()} className="btn-primary px-4 rounded-xl"><Send size={16} /></button>
        </div>
      </div>
    </div>
  );
};

export default TutDemo;

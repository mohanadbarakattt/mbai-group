import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Send, Sparkles } from 'lucide-react';
import VentureShell from './VentureShell';

interface Msg { role: 'user' | 'tut'; text: string }

const SCRIPT: Record<string, string> = {
  photosynthesis:
    'Think of a plant as a tiny solar-powered kitchen 🌱. It takes sunlight, water from the roots, and CO₂ from the air, and "cooks" them into glucose (its food) — releasing the oxygen you breathe as a bonus. Want me to explain it بالعربي, or quiz you on it?',
  quadratic:
    'A quadratic equation is just a curve\'s story: ax² + bx + c = 0. The formula x = (−b ± √(b²−4ac)) / 2a finds where the curve crosses zero. Try one: x² − 5x + 6 = 0 → x = 2 or 3. Shall we solve one together, step by step?',
  arabic:
    'أكيد! أنا بشرح بالعربي الفصحى أو بالمصري، زي ما يريحك. قولي إيه الموضوع اللي واقف معاك — رياضة، فيزيا، إنجليزي؟ هنمشي فيه خطوة خطوة لحد ما يبقى سهل. 💡',
  default:
    'Great question! I\'d break that into three small steps and check your understanding after each one — that\'s how TUT works: no lectures, just a conversation at your pace, in Arabic or English. (Full model launching soon — this is a preview.)',
};

const SUGGESTIONS = [
  { label: 'Explain photosynthesis simply', key: 'photosynthesis' },
  { label: 'Help me with quadratic equations', key: 'quadratic' },
  { label: 'اشرحلي بالعربي', key: 'arabic' },
];

const TutPage: React.FC = () => {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'tut', text: 'أهلاً! I\'m TUT — your personal AI tutor. Ask me anything from your curriculum, in Arabic or English, and I\'ll explain it at your pace. 👑' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text?: string, key?: string) => {
    const t = (text ?? input).trim();
    if (!t || typing) return;
    setMessages((m) => [...m, { role: 'user', text: t }]);
    setInput('');
    setTyping(true);
    const lower = t.toLowerCase();
    const reply =
      SCRIPT[key ?? ''] ??
      (lower.includes('photo') ? SCRIPT.photosynthesis
        : lower.includes('quad') || lower.includes('math') || lower.includes('equation') ? SCRIPT.quadratic
        : /[؀-ۿ]/.test(t) ? SCRIPT.arabic
        : SCRIPT.default);
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'tut', text: reply }]);
      setTyping(false);
    }, 1100);
  };

  return (
    <VentureShell
      name="TUT"
      accent="#eab308"
      tagline="AI Learning Companion"
      headline={<>Every student deserves<br /><span className="text-[#b8860b]">a brilliant tutor.</span></>}
      sub="Named after Egypt's boy king, TUT is a personal AI tutor for MENA's 100M+ students — explaining any concept in Arabic or English, adapting to each learner's pace, and turning static curricula into living conversations."
      pillars={[
        { title: 'Truly bilingual', text: 'Fus\'ha, Egyptian, Gulf dialects, or English — TUT teaches in the language the student actually thinks in.' },
        { title: 'Socratic, not lecturing', text: 'TUT asks before it answers, checks understanding at every step, and adapts difficulty in real time.' },
        { title: 'Alignment-grade safety', text: 'Built by a former xAI Human Data Lead — with the same safety and accuracy discipline used on frontier models.' },
      ]}
    >
      <div className="glass-card rounded-2xl overflow-hidden max-w-3xl">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-[#e2d9ce] bg-white text-sm font-bold text-[#111111]">
          <GraduationCap size={16} className="text-[#b8860b]" /> TUT — Study Session
          <span className="ml-auto text-[10px] font-semibold text-[#9a9490] uppercase tracking-wide flex items-center gap-1.5">
            <Sparkles size={11} className="text-[#b8860b]" /> Concept preview
          </span>
        </div>

        <div ref={scroller} className="h-[340px] overflow-y-auto p-6 space-y-4 bg-[#f8f5f1]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-[#111111] text-white rounded-br-md'
                    : 'bg-white border border-[#e2d9ce] text-[#333] rounded-bl-md'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-white border border-[#e2d9ce] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5 items-center">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="w-1.5 h-1.5 rounded-full bg-[#b8860b] animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-[#e2d9ce] bg-white p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {SUGGESTIONS.map((s) => (
              <button key={s.key} onClick={() => send(s.label, s.key)} className="text-[11px] px-3 py-1.5 rounded-full border border-[#e2d9ce] text-[#6b6460] hover:border-[#b8860b] hover:text-[#111111] transition-colors bg-[#f8f5f1]">
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask TUT anything… اسأل أي حاجة"
              className="flex-1 rounded-xl border border-[#e2d9ce] bg-[#f8f5f1] px-4 py-3 text-sm focus:outline-none focus:border-[#b8860b]"
            />
            <button onClick={() => send()} className="px-4 rounded-xl bg-[#111111] hover:bg-[#2a2a2a] text-white transition-colors">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </VentureShell>
  );
};

export default TutPage;

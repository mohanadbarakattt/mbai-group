import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Sparkles } from 'lucide-react';

interface Msg { role: 'user' | 'tut'; text: string; }

const SCRIPT: Record<string, string> = {
  khan: 'Khan el-Khalili? Go late afternoon — the light is better and it cools down 🌇. On haggling: the first price is a greeting, not an offer. Counter low, stay friendly, and be ready to walk. Take a mint tea break in the middle of the souq — that is half the point of going. Want me to plan a half-day around it?',
  hieroglyphics: 'That oval ring around the signs is a cartouche — it wraps a royal name to mark it as a king. Reading it: 𓈖 is water (n), 𓂋 is a mouth (r), 𓅱 is a quail chick (w). Signs face the start of the line, so read *toward* the faces. Send me a photo of one and I will read it sign by sign.',
  masri: 'أيوة طبعًا 😄 أنا بتكلم مصري عادي، مش بترجم من إنجليزي. W law te7eb tektebli Franco keda, hardod 3aleik b nafs el tari2a — 3ady khales. Ne7ki fe eh؟ سفر، أكل، تاريخ، ولا كلام وبس؟',
  default: 'I am TUT — ask me about anywhere in Egypt, what things should fairly cost, museums and monuments, hieroglyphics, or the slang people are actually using right now. Or just chat in Masri, Franco, or English. (Full model launching soon — this is a preview.)',
};

const SUGGESTIONS = [
  { label: 'Plan my afternoon in Khan el-Khalili', key: 'khan' },
  { label: 'Read this cartouche for me', key: 'hieroglyphics' },
  { label: 'اتكلم معايا مصري', key: 'masri' },
];

const TutDemo: React.FC = () => {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'tut', text: 'أهلاً! I\'m TUT — your Egyptian AI friend and guide. Ask me about Egypt — places, fair prices, monuments, hieroglyphics — or just chat in Masri, Franco, or English. 👑' },
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
      (/khan|souq|souk|market|bazaar/.test(lower) ? SCRIPT.khan
        : /hiero|cartouche|glyph|temple|tomb/.test(lower) ? SCRIPT.hieroglyphics
        : /[؀-ۿ]/.test(t) ? SCRIPT.masri : SCRIPT.default);
    timer.current = setTimeout(() => { setMessages((m) => [...m, { role: 'tut', text: reply }]); setTyping(false); }, 1000);
  };

  return (
    <div className="w-full h-full flex flex-col text-[#e8ecf4]" style={{ background: '#0a0e17' }}>
      <div className="flex items-center gap-2 px-5 py-3.5 border-b text-sm font-bold" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0d1220' }}>
        <MessageCircle size={16} className="text-amber-300" /> TUT — Chat
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

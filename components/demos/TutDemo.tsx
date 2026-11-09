import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, ArrowUpRight } from 'lucide-react';

interface Msg { role: 'user' | 'tut'; text: string; }
// Local illustrative responses only. No price/visa advice or pretend live retrieval.
const SCRIPT: Record<string, string> = {
  sources: 'The live guide answers from a sourced Egypt knowledge file. Every answer names the source page and the day it was checked, or says nobody publishes one. For current travel answers, open tutapp.co/guide. This on-site sample is scripted, not connected to the live guide.',
  pass: 'Traveller signup is your free Egypt Pass: a shareable boarding-pass souvenir with your name in hieroglyphs, a Pharaoh Me portrait as Tut or Cleopatra, and a stub number. Check in at tutapp.co/checkin. No subscription or paid pass is needed.',
  partners: 'Listings are free for vetted tour operators, guides, hotels, lodges, dive centres and transport providers. TUT earns a revenue share only when it brings a booking. Partner bookings go live with pilots. Apply at www.tutapp.co/partners: a business form, not the traveller boarding-pass signup.',
  masri: 'أهلاً بيك! TUT شغال على tutapp.co بالمصري والفرانكو وضمن 12 لغة. الدليل الحقيقي بيذكر الصفحة المصدر وتاريخ التحقق، أو يقول إن مفيش حد ناشر الإجابة. ده نموذج تفاعلي مكتوب مسبقًا، مش متصل بالدليل المباشر.',
  default: 'TUT is live at tutapp.co. This is a small, scripted taste of the product, not live AI or current travel advice. Try a topic below, or open the live guide for sourced Egypt answers, free boarding-pass check-in and Pharaoh Me.',
};
const SUGGESTIONS = [
  { label: 'How do sourced answers work?', key: 'sources' },
  { label: "What is my Egypt Pass?", key: 'pass' },
  { label: 'Can my business join?', key: 'partners' },
];
const TutDemo: React.FC = () => {
  const [messages, setMessages] = useState<Msg[]>([{ role: 'tut', text: 'أهلاً! I’m TUT, your AI travel guide for Egypt. The full guide is live at tutapp.co. Here, try a few scripted examples about sources, free Egypt Pass check-in or the partner pilot.' }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, [messages, typing]);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const send = (text?: string, key?: string) => {
    const t = (text ?? input).trim();
    if (!t || typing) return;
    setMessages(m => [...m, { role: 'user', text: t }]); setInput(''); setTyping(true);
    const lower = t.toLowerCase();
    const reply = SCRIPT[key ?? ''] ?? (/source|check|rag/.test(lower) ? SCRIPT.sources : /pass|pharaoh|signup|souvenir/.test(lower) ? SCRIPT.pass : /partner|business|pilot/.test(lower) ? SCRIPT.partners : /[\u0600-\u06ff]/.test(t) ? SCRIPT.masri : SCRIPT.default);
    timer.current = setTimeout(() => { setMessages(m => [...m, { role: 'tut', text: reply }]); setTyping(false); }, 550);
  };
  return (
    <div className="w-full flex flex-col text-[#f1f5f4] bg-[#0b1418]">
      <div className="flex flex-wrap items-center gap-2 px-5 py-4 border-b border-white/10 text-sm font-semibold">
        <MessageCircle size={16} className="text-[#2a9d8f]" /> TUT · A taste of the guide
        <span className="sm:ml-auto text-[10px] text-[#a7b7b4] font-normal">Scripted sample · not live AI</span>
      </div>
      <div ref={scroller} role="log" aria-label="TUT sample conversation" aria-live="polite" className="overflow-y-auto p-4 space-y-3 h-72 sm:h-80">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] sm:max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${m.role === 'user' ? 'bg-[#246f69] text-white' : 'bg-white/5 border border-white/10 text-[#c3cecc]'}`}>{m.text}</div>
          </div>
        ))}
        {typing && <p className="text-xs text-[#a7b7b4]" role="status">TUT is typing…</p>}
      </div>
      <div className="border-t border-white/10 p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTIONS.map(s => <button disabled={typing} key={s.key} onClick={() => send(s.label, s.key)} className="glass-btn text-[11px] px-3 py-2 rounded-full disabled:opacity-50">{s.label}</button>)}
        </div>
        <form onSubmit={e => { e.preventDefault(); send(); }} className="flex gap-2">
          <input aria-label="Ask TUT a sample question" value={input} onChange={e => setInput(e.target.value)} placeholder="Try a question… اسأل سؤال" className="min-w-0 flex-1 rounded-xl px-3 py-2.5 text-sm bg-white/5 border border-white/10" />
          <button type="submit" aria-label="Send sample question" disabled={typing || !input.trim()} className="btn-primary px-4 rounded-xl disabled:opacity-50"><Send size={16} /></button>
        </form>
        <a href="https://tutapp.co/guide" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#a7b7b4] hover:text-white mt-3">Open the live guide at tutapp.co <ArrowUpRight size={13} /></a>
      </div>
    </div>
  );
};
export default TutDemo;

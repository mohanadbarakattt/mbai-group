import React, { useRef, useEffect, useState } from 'react';
import { Zap, Brain, Globe2, Layers, Package, MapPin } from 'lucide-react';

const credentials = [
  { icon: <Zap size={16} />, title: 'LLM Alignment', sub: 'xAI · RLHF · DPO' },
  { icon: <Brain size={16} />, title: 'Reasoning & CoT', sub: 'Pre-training · Synthetic Data' },
  { icon: <Globe2 size={16} />, title: 'Arabic NLP', sub: 'MENA dialects · Real data' },
  { icon: <Layers size={16} />, title: 'Full-Stack AI', sub: 'APIs · Agentic pipelines' },
  { icon: <Package size={16} />, title: 'Ships to Production', sub: 'Tested · Documented · Live' },
  { icon: <MapPin size={16} />, title: 'Cairo & Dubai', sub: 'On the ground in MENA' },
];

const FounderCredentials: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-6 bg-[#0e1533]/70 border-y border-white/10 overflow-hidden relative">
      <div className="aurora w-[420px] h-[420px] top-0 right-0" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.18), transparent 60%)' }} />
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#ffffff80] mb-4">Engineering Pedigree</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-xl">
              Frontier AI.<br />
              <span className="text-gradient">Applied to MENA.</span>
            </h2>
            <p className="text-[#ffffffcc] text-sm max-w-xs leading-relaxed md:text-right">
              Former xAI Human Data Lead. The same rigour that trains frontier models — now building your product.
            </p>
          </div>
        </div>

        {/* Credential grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
          {credentials.map((c, i) => (
            <div
              key={c.title}
              className={`group flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 rounded-xl px-4 py-3.5 transition-all duration-300 cursor-default ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: visible ? `${i * 70 + 200}ms` : '0ms', transitionProperty: 'opacity, transform, background-color, border-color' }}
            >
              <div className="text-[#ffffffaa] group-hover:text-white transition-colors shrink-0">{c.icon}</div>
              <div>
                <p className="text-white text-xs font-semibold leading-none mb-1">{c.title}</p>
                <p className="text-[#ffffff80] text-[10px] leading-none">{c.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className={`border-t border-white/20 pt-10 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-xl md:text-2xl font-semibold text-white leading-snug max-w-3xl">
            "I worked on the alignment systems behind frontier models.{' '}
            <span className="text-[#ffffffcc]">Now I use that same precision to build AI products for MENA businesses."</span>
          </p>
          <div className="flex items-center gap-3 mt-6">
            <div className="w-8 h-8 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-xs font-bold text-white">M</div>
            <div>
              <p className="text-white text-xs font-semibold">Mohanad Barakat</p>
              <p className="text-[#ffffff80] text-[10px]">Founder · Former xAI Human Data Lead</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FounderCredentials;

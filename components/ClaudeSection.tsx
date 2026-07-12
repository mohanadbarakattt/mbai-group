import React, { useEffect, useRef, useState } from 'react';
import { Bot, GitBranch, Sparkles, Layers, Workflow, ArrowRight } from 'lucide-react';

const CAPABILITIES = [
  { icon: <Workflow size={16} />, title: 'Multi-Agent Orchestration', sub: 'One model plans, others execute' },
  { icon: <GitBranch size={16} />, title: 'Custom Skills & Commands', sub: 'Repeatable workflows, not one-offs' },
  { icon: <Layers size={16} />, title: 'Ecosystem-Wide Automation', sub: 'Every venture, one delegation policy' },
  { icon: <Sparkles size={16} />, title: 'Cross-Session Memory', sub: 'Context that survives between builds' },
];

const AGENTS = [
  { label: 'Executor', sub: 'Sonnet · builds to spec' },
  { label: 'Grunt', sub: 'Haiku · high-volume work' },
  { label: 'Reviewer', sub: 'Sonnet · adversarial QA' },
];

const ClaudeSection: React.FC = () => {
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
    <section id="claude" ref={ref} className="py-20 px-6 bg-[#0e1533]/70 border-y border-white/10 overflow-hidden relative">
      <div className="aurora w-[420px] h-[420px] bottom-0 left-0" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.16), transparent 60%)' }} />
      <div className="max-w-6xl mx-auto relative">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

          {/* Left — positioning copy */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400 mb-4 flex items-center gap-2">
              <Bot size={13} /> Built with Claude
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              A Claude power-user,<br /><span className="text-gradient">not just a Claude customer.</span>
            </h2>
            <p className="text-[#8b93a7] text-sm leading-relaxed mb-8 max-w-lg">
              Every product on this site — the ecosystem, the demos, this page — is built and shipped through Claude.
              Not one prompt at a time: a real orchestration practice, where a planning model specs the work and a crew
              of delegated agents build, search, and review it.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {CAPABILITIES.map((c, i) => (
                <div
                  key={c.title}
                  className={`flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 rounded-xl px-4 py-3.5 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: visible ? `${i * 80 + 150}ms` : '0ms', transitionProperty: 'opacity, transform, background-color, border-color' }}
                >
                  <div className="text-cyan-400 shrink-0">{c.icon}</div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-none mb-1">{c.title}</p>
                    <p className="text-[#8b93a7] text-[10px] leading-none">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — the actual delegation pattern, as a simple flow */}
          <div className="glass-strong glow-border rounded-2xl p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-400 mb-6">The delegation pattern, in practice</p>
            <div className="flex flex-col items-center gap-3">
              <div className="w-full rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-center">
                <p className="text-white font-bold text-sm">Orchestrator</p>
                <p className="text-[#aab2c5] text-xs">Specs the work, reviews the diff</p>
              </div>
              <ArrowRight size={16} className="text-white/30 rotate-90" />
              <div className="w-full grid grid-cols-3 gap-2.5">
                {AGENTS.map((a) => (
                  <div key={a.label} className="rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-3 text-center">
                    <p className="text-white font-semibold text-xs">{a.label}</p>
                    <p className="text-[#8b93a7] text-[9px] mt-1 leading-tight">{a.sub}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[#8b93a7] text-xs leading-relaxed mt-6 pt-6 border-t border-white/10">
              The same policy runs across every venture in the group — keeping expensive reasoning for architecture
              and review, and routing the volume work to cheaper, faster agents.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ClaudeSection;

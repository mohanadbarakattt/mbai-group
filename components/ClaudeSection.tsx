import React, { useEffect, useRef, useState } from 'react';
import { Bot, GitBranch, Cpu, Layers, Workflow, ArrowRight } from 'lucide-react';

const CAPABILITIES = [
  { icon: <Workflow size={16} />, title: 'Multi-Agent Orchestration', sub: 'One model plans, others execute' },
  { icon: <GitBranch size={16} />, title: 'Custom Skills & Commands', sub: 'Repeatable workflows, not one-offs' },
  { icon: <Layers size={16} />, title: 'Ecosystem-Wide Automation', sub: 'Every venture, one delegation policy' },
  { icon: <Cpu size={16} />, title: 'Cross-Session Memory', sub: 'Context that survives between builds' },
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
    <section id="claude" ref={ref} className="py-20 px-6 bg-transparent border-y border-[#e6dfd2] overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

          {/* Left — positioning copy */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b85c38] mb-4 flex items-center gap-2">
              <Bot size={13} /> Built with Claude
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#14110f] leading-tight mb-4">
              A Claude power-user,<br /><span className="text-[#b85c38]">not just a Claude customer.</span>
            </h2>
            <p className="text-[#6b645c] text-sm leading-relaxed mb-8 max-w-lg">
              Every product on this site — the ecosystem, the demos, this page — is built and shipped through Claude.
              Not one prompt at a time: a real orchestration practice, where a planning model specs the work and a crew
              of delegated agents build, search, and review it.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {CAPABILITIES.map((c, i) => (
                <div
                  key={c.title}
                  className={`flex items-center gap-3 bg-[#f7f3ec] hover:bg-[#f0ebe1] border border-[#e6dfd2] hover:border-[#e6dfd2] rounded-xl px-4 py-3.5 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: visible ? `${i * 80 + 150}ms` : '0ms', transitionProperty: 'opacity, transform, background-color, border-color' }}
                >
                  <div className="text-[#b85c38] shrink-0">{c.icon}</div>
                  <div>
                    <p className="text-[#14110f] text-xs font-semibold leading-none mb-1">{c.title}</p>
                    <p className="text-[#6b645c] text-[10px] leading-none">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — the actual delegation pattern, as a simple flow */}
          <div className="bg-[#fffdf8] border border-[#e6dfd2] rounded-2xl p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#b85c38] mb-6">The delegation pattern, in practice</p>
            <div className="flex flex-col items-center gap-3">
              <div className="w-full rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-center">
                <p className="text-[#14110f] font-bold text-sm">Orchestrator</p>
                <p className="text-[#6b645c] text-xs">Specs the work, reviews the diff</p>
              </div>
              <ArrowRight size={16} className="text-[#8a8278] rotate-90" />
              <div className="w-full grid grid-cols-3 gap-2.5">
                {AGENTS.map((a) => (
                  <div key={a.label} className="rounded-xl border border-[#e6dfd2] bg-[#f7f3ec] px-2.5 py-3 text-center">
                    <p className="text-[#14110f] font-semibold text-xs">{a.label}</p>
                    <p className="text-[#6b645c] text-[9px] mt-1 leading-tight">{a.sub}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[#6b645c] text-xs leading-relaxed mt-6 pt-6 border-t border-[#e6dfd2]">
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

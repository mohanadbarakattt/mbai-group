import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, BrainCircuit, Code2, Rocket, ArrowUpCircle, Building2, Quote, X, ShieldCheck } from 'lucide-react';

const Experience: React.FC = () => {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cardClass = `transition-[opacity,transform] duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;

  const cardStyle = (i: number): React.CSSProperties => ({
    transitionDelay: `${i * 120}ms`,
  });

  return (
    <section id="experience" className="py-24 px-4 md:px-6 max-w-7xl mx-auto relative overflow-hidden md:overflow-visible">
      <h2 className="text-3xl md:text-4xl font-bold mb-20 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#8b93a7]">
          Professional Evolution
        </span>
        <div className="w-24 h-1 bg-indigo-500 mx-auto mt-4 rounded-full "></div>
      </h2>

      {/* Timeline Container */}
      <div ref={ref} className="relative">
        {/* Central Vertical Line (Desktop) / Left Line (Mobile) */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/15 via-white/10 to-transparent md:-translate-x-1/2 z-0"></div>

        {/* 1. The Summit: MB AI Solutions (Current Mission) */}
        <div className={`relative mb-24 md:mb-32 ${cardClass}`} style={cardStyle(0)}>
          {/* Node Marker */}
          <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 -top-6 z-10">
            <div className="w-12 h-12 rounded-full bg-[#0d1220] border-2 border-white/15 flex items-center justify-center ">
               <Sparkles size={20} className="text-white" />
            </div>
          </div>

          {/* Card */}
          <div className="ml-16 md:ml-0 md:max-w-4xl md:mx-auto">
             <div className="relative group">
                <div className="absolute -inset-1 bg-indigo-500/20 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-1000"></div>
                <div className="relative glass-card xai-glow rounded-2xl p-6 md:p-10 border border-white/10">
                  <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <Building2 className="w-20 h-20 md:w-36 md:h-36" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between mb-6 relative z-10">
                    <div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                         <h3 className="text-2xl md:text-4xl font-bold text-white">MB AI Solutions</h3>
                         <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-indigo-500/40 text-[#aab2c5] text-[10px] md:text-xs font-mono tracking-wider uppercase">Current Mission</span>
                      </div>
                      <p className="text-lg md:text-xl text-white font-medium flex items-center gap-2">
                        Founder & Lead Architect
                      </p>
                    </div>
                    <div className="text-[#8b93a7] text-xs md:text-sm font-mono bg-white/[0.05] border border-white/10 rounded px-4 py-2 self-start">
                      Oct 2025 – Present
                    </div>
                  </div>

                  <p className="text-[#aab2c5] mb-6 leading-relaxed max-w-3xl text-base md:text-lg">
                    Spearheading the premier <strong className="text-white font-semibold">Sovereign AI Infrastructure</strong> in Egypt. My mission is to <strong className="text-[#aab2c5]">automize and develop workflows</strong> for local enterprises, deploying localized, high-performance AI agents that bridge the gap between global innovation and regional needs.
                  </p>
                </div>
             </div>
          </div>
        </div>

        {/* 2. xAI — Elon Musk's AI Company */}
        <div className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-center w-full ${cardClass}`} style={cardStyle(1)}>
           {/* Marker */}
           <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 top-8 z-10">
              <div className="w-10 h-10 rounded-full bg-[#0d1220] border-2 border-white/15 flex items-center justify-center ">
                 <Rocket size={18} className="text-[#8b93a7]" />
              </div>
           </div>

           {/* Left Side (Content on Desktop) */}
           <div className="w-[calc(100%-4rem)] ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
              <div className="relative group">
                 <div className="absolute -inset-0.5 bg-indigo-500/20 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
                 <div className="relative glass-card p-6 md:p-8 rounded-2xl hover:bg-white/[0.05] transition-all border border-white/10 hover:border-white/25">
                    <div className="absolute top-4 right-4 md:right-auto md:left-4 text-white/20 group-hover:text-blue-500/20 transition-colors">
                       <Rocket className="w-12 h-12 md:w-[60px] md:h-[60px]" />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 mb-2">
                       <h3 className="text-2xl md:text-3xl font-bold text-white">xAI</h3>
                       <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[#aab2c5] text-[10px] font-mono tracking-wider uppercase w-fit">Elon Musk's AI Lab</span>
                    </div>
                    <div className="text-[#8b93a7] text-xs font-mono mb-2">Apr 2025 – Oct 2025</div>
                    <p className="text-[#8b93a7] font-medium mb-4 text-lg">Human Data Lead</p>
                    
                    <p className="text-[#aab2c5] text-sm leading-relaxed mb-4">
                       Worked at <strong className="text-white">xAI — the world's leading frontier AI company</strong> founded by Elon Musk, competing directly with OpenAI and Google DeepMind. Played a direct role in <strong className="text-[#aab2c5]">developing and training Grok</strong>, xAI's flagship large language model powering hundreds of millions of users on X (Twitter).
                    </p>
                    
                    <div className="space-y-3 mb-6">
                       <div className="flex items-start gap-2 md:justify-end">
                          <p className="text-[#8b93a7] text-sm"><strong className="text-white">Trained Grok's reasoning engine</strong> — designed and executed RLHF (Reinforcement Learning from Human Feedback) workflows that directly shaped how Grok thinks, reasons, and responds</p>
                       </div>
                       <div className="flex items-start gap-2 md:justify-end">
                          <p className="text-[#8b93a7] text-sm"><strong className="text-white">Led human data quality</strong> — established rigorous evaluation protocols for coding logic, mathematical reasoning, and multimodal inputs (text, image, audio)</p>
                       </div>
                       <div className="flex items-start gap-2 md:justify-end">
                          <p className="text-[#8b93a7] text-sm"><strong className="text-white">Shaped Grok 4's intelligence</strong> — contributed to the training data pipeline that evolved Grok from a competitive model to a frontier-class AI system</p>
                       </div>
                    </div>
                 
                    {/* Mini Stats for xAI */}
                    <div className="grid grid-cols-3 gap-2 mt-4 md:ml-auto md:mr-0">
                       <div className="bg-white/[0.05] p-3 rounded border border-white/10 flex flex-col items-center md:items-end">
                           <div className="text-lg md:text-xl font-bold text-white flex items-center gap-1"><ArrowUpCircle size={14} className="text-green-500"/> 86%</div>
                           <div className="text-[10px] text-[#8b93a7] uppercase">Annotation Velocity</div>
                       </div>
                       <div className="bg-white/[0.05] p-3 rounded border border-white/10 flex flex-col items-center md:items-end">
                           <div className="text-lg md:text-xl font-bold text-white flex items-center gap-1"><BrainCircuit size={14} className="text-purple-500"/> 135%</div>
                           <div className="text-[10px] text-[#8b93a7] uppercase">Model Perf.</div>
                       </div>
                       <div className="bg-white/[0.05] p-3 rounded border border-white/10 flex flex-col items-center md:items-end">
                           <div className="text-lg md:text-xl font-bold text-white flex items-center gap-1"><Sparkles size={14} className="text-[#8b93a7]"/> Grok</div>
                           <div className="text-[10px] text-[#8b93a7] uppercase">Model Trained</div>
                       </div>
                     </div>
                 </div>
              </div>
           </div>

           {/* Right Side (Empty on Desktop) */}
           <div className="hidden md:block w-1/2 pl-12"></div>
        </div>


        {/* xAI Manager Testimonials */}
        <div className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-center w-full ${cardClass}`} style={cardStyle(2)}>
           <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 top-8 z-10">
              <div className="w-8 h-8 rounded-full bg-[#0d1220] border-2 border-white/15 flex items-center justify-center">
                 <Quote size={12} className="text-[#8b93a7]" />
              </div>
           </div>

           <div className="hidden md:block w-1/2 pr-12"></div>

           <div className="w-[calc(100%-4rem)] ml-16 md:ml-0 md:w-1/2 md:pl-12">
              <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

                 <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-white/[0.05] rounded-full border border-blue-500/30">
                       <ShieldCheck size={18} className="text-[#8b93a7]" />
                    </div>
                    <div>
                       <h4 className="text-white font-bold text-sm">Manager Performance Review</h4>
                       <p className="text-[#8b93a7] text-xs">Allie Taylor — xAI Manager | 3 & 6 Month Review</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="group cursor-pointer" onClick={() => setExpandedReview(expandedReview === 'excellence' ? null : 'excellence')}>
                       <div className="flex items-start gap-3 mb-3">
                          <Quote size={16} className="text-[#8b93a7]/60 mt-1 flex-shrink-0" />
                          <div>
                             <p className="text-[#aab2c5] text-sm leading-relaxed italic">
                                "Mohanad has worked on 10+ projects, consistently demonstrating reliability, flexibility, and curiosity. His QA scores and lead times on most projects are at least average, if not frequently better than the average... His efforts to elevate both his contributions and the broader quality of our data make him a valued member of the xAI team."
                             </p>
                             <p className="text-[#8b93a7]/60 text-xs mt-2 group-hover:text-[#8b93a7] transition-colors">
                                {expandedReview === 'excellence' ? 'Click to collapse' : 'Click to see full review screenshot'}
                             </p>
                          </div>
                       </div>
                       {expandedReview === 'excellence' && (
                          <div className="mt-3 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                             <img src="/xai/review-excellence.png" alt="xAI Performance Review — Excellence" className="w-full" />
                          </div>
                       )}
                    </div>

                    <div className="w-full h-px bg-white/10"></div>

                    <div className="group cursor-pointer" onClick={() => setExpandedReview(expandedReview === 'impact' ? null : 'impact')}>
                       <div className="flex items-start gap-3 mb-3">
                          <Quote size={16} className="text-[#8b93a7]/60 mt-1 flex-shrink-0" />
                          <div>
                             <p className="text-[#aab2c5] text-sm leading-relaxed italic">
                                "Mohanad brings a thoughtful and respectful presence to every project he works on... I am grateful to have Mohanad on the Grok, Paper, Scissors team, and I value his contributions every day."
                             </p>
                             <p className="text-[#8b93a7]/60 text-xs mt-2 group-hover:text-[#8b93a7] transition-colors">
                                {expandedReview === 'impact' ? 'Click to collapse' : 'Click to see full review screenshot'}
                             </p>
                          </div>
                       </div>
                       {expandedReview === 'impact' && (
                          <div className="mt-3 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                             <img src="/xai/review-impact.png" alt="xAI Performance Review — Impact" className="w-full" />
                          </div>
                       )}
                    </div>
                 </div>

                 <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] text-[#8b93a7] uppercase tracking-wider">Verified Internal Review — xAI Official Performance Evaluation</span>
                 </div>
              </div>
           </div>
        </div>

        {/* 3. Outlier AI (Generative Model Refinement) */}
        <div className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-center w-full ${cardClass}`} style={cardStyle(3)}>
           {/* Marker */}
           <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 top-8 z-10">
              <div className="w-6 h-6 rounded-full bg-[#0d1220] border-2 border-white/15 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              </div>
           </div>

           {/* Left Side (Empty on Desktop) */}
           <div className="hidden md:block w-1/2 pr-12"></div>

           {/* Right Side (Content) */}
           <div className="w-[calc(100%-4rem)] ml-16 md:ml-0 md:w-1/2 md:pl-12">
              <div className="glass-card p-6 md:p-8 rounded-2xl hover:bg-white/[0.05] transition-all border border-white/10 hover:border-white/25 group relative">
                 <div className="absolute top-4 right-4 text-white/20 group-hover:text-indigo-500/20 transition-colors">
                    <BrainCircuit className="w-12 h-12 md:w-[60px] md:h-[60px]" />
                 </div>
                 <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Outlier AI</h3>
                 <p className="text-white font-medium mb-4">Generative Model Refinement</p>
                 
                 <p className="text-[#aab2c5] text-sm leading-relaxed mb-4">
                   Operated at the bridge between raw machine learning and polished, safe AI interactions, teaching frontier models how to think and maintain context.
                 </p>

                 <div className="space-y-4">
                    <div className="flex items-start gap-3">
                       <div className="mt-1 p-1 bg-white/[0.05] rounded text-white">
                          <ArrowUpCircle size={14} />
                       </div>
                       <div>
                          <p className="text-white text-sm font-semibold">RLHF Pipeline Management</p>
                          <p className="text-[#8b93a7] text-xs">Evaluated and ranked LLM outputs to create "gold standard" ground truth data, directly adjusting model weights for helpfulness and safety.</p>
                       </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                       <div className="mt-1 p-1 bg-white/[0.05] rounded text-white">
                          <BrainCircuit size={14} />
                       </div>
                       <div>
                          <p className="text-white text-sm font-semibold">Context & Nuance Optimization</p>
                          <p className="text-[#8b93a7] text-xs">Enhanced context awareness and tone understanding, transforming robotic responses into intuitive, memory-aware dialogue systems.</p>
                       </div>
                    </div>

                    <div className="flex items-start gap-3">
                       <div className="mt-1 p-1 bg-white/[0.05] rounded text-white">
                          <ShieldCheck size={14} />
                       </div>
                       <div>
                          <p className="text-white text-sm font-semibold">Factual Precision & De-hallucination</p>
                          <p className="text-[#8b93a7] text-xs">Mitigated risks in finance and technical sectors by verifying data claims and refining the model's ability to distinguish between accurate data and hallucinations.</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>


        {/* 4. Freelance (Left Side) */}
        <div className={`relative flex flex-col md:flex-row items-center w-full ${cardClass}`} style={cardStyle(4)}>
           {/* Marker */}
           <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 top-8 z-10">
              <div className="w-6 h-6 rounded-full bg-[#0d1220] border-2 border-white/15 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
              </div>
           </div>

           {/* Left Side (Content) */}
           <div className="w-[calc(100%-4rem)] ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
              <div className="glass-card p-6 md:p-8 rounded-2xl hover:bg-white/[0.05] transition-all border border-white/10 hover:border-white/25 group relative">
                 <div className="absolute top-4 right-4 md:right-auto md:left-4 text-white/20 group-hover:text-purple-500/20 transition-colors">
                    <Code2 className="w-12 h-12 md:w-[60px] md:h-[60px]" />
                 </div>
                 <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Freelance</h3>
                 <p className="text-[#8b93a7] font-medium mb-4">Web Developer & AI Agent Architect</p>
                 <p className="text-[#8b93a7] text-sm leading-relaxed">
                   Engineered custom autonomous AI agents and integrated NLP stacks into modern web architectures. Delivered scalable solutions bridging raw model capability and user application.
                 </p>
              </div>
           </div>

           {/* Right Side (Empty) */}
           <div className="hidden md:block w-1/2 pl-12"></div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-8 md:left-1/2 w-0.5 h-24 bg-gradient-to-t from-[#0b1022] to-transparent md:-translate-x-1/2 z-20"></div>
      </div>
    </section>
  );
};

export default Experience;

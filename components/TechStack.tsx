import React, { useEffect, useRef, useState } from 'react';
import { Database, FileCode2, Languages, GraduationCap, Binary, Sigma, PieChart, Code, Network, Globe, Box, Layers, Hexagon, Triangle, Award, CheckCircle2, Sparkles, BarChart3, ClipboardList } from 'lucide-react';

const TechStack: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cardClass = () =>
    `transition-[opacity,transform] duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;

  const cardStyle = (i: number): React.CSSProperties => ({
    transitionDelay: `${i * 80}ms`,
  });

  return (
    <section id="stack" className="py-24 px-6 bg-[#f8f5f1] relative overflow-hidden">
      {/* Background Abstract Objects — warm toned */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#e2d9ce]/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d4c9bc]/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating Geometric Figures */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
        {/* Rotating ring */}
        <div className="absolute top-10 right-20 w-32 h-32 border border-[#e2d9ce] rounded-full animate-[spin_10s_linear_infinite]"></div>
        {/* Rotating ring */}
        <div className="absolute bottom-40 left-20 w-48 h-48 border border-[#e2d9ce]/60 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

        {/* Hexagon */}
        <div className="absolute top-40 left-1/4 opacity-[0.06] animate-pulse text-[#111111]">
          <Hexagon size={64} strokeWidth={1} />
        </div>

        {/* Triangle */}
        <div className="absolute bottom-1/3 right-1/4 opacity-[0.06] animate-bounce text-[#6b6460]" style={{ animationDuration: '4s' }}>
          <Triangle size={48} strokeWidth={1} />
        </div>

        {/* Binary Stream */}
        <div className="absolute top-20 right-10 font-mono text-xs text-[#c8bfb4] select-none" style={{ writingMode: 'vertical-rl' }}>
          0101101010110
        </div>
      </div>

      {/* Subtle light grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] pointer-events-none"></div>

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#111111]">
          Technical Arsenal & <span className="text-[#6b6460]">Proficiency</span>
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-6">

          {/* Main Tech: Python */}
          <div
            className={`glass-card p-6 rounded-2xl md:col-span-2 md:row-span-2 flex flex-col justify-between group hover:border-indigo-500/50 relative overflow-hidden ${cardClass()}`}
            style={cardStyle(0)}
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="absolute -bottom-8 -right-8 opacity-5 rotate-12 transition-transform group-hover:rotate-0 duration-700">
              <FileCode2 size={200} />
            </div>

            <div className="flex justify-between items-start z-10">
              <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 border border-blue-500/30">
                <FileCode2 size={32} />
              </div>
              <div className="text-right">
                <span className="text-xs text-[#9a9490] font-mono block">MASTERY LEVEL</span>
                <span className="text-xl font-bold text-[#111111]">98%</span>
              </div>
            </div>

            <div className="z-10 mt-8">
              <h3 className="text-3xl font-bold text-[#111111] mb-2">Python</h3>
              <p className="text-[#6b6460] text-sm mb-6 max-w-sm">
                Architecting scalable AI backends, complex data pipelines, and custom agentic workflows.
              </p>

              {/* Dark terminal — intentional accent */}
              <div className="bg-[#1a1a2e] rounded-lg p-3 border border-[#e2d9ce]/30 font-mono text-xs text-[#9a9490] overflow-hidden shadow-inner">
                <div className="flex gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                </div>
                <p><span className="text-purple-400">def</span> <span className="text-blue-400">sovereign_ai</span>(data):</p>
                <p className="pl-4"><span className="text-[#6b6460]"># Processing logic</span></p>
                <p className="pl-4"><span className="text-green-400">return</span> data.optimize()</p>
              </div>
            </div>
          </div>

          {/* SQL */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(1)}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">
              <Database size={80} />
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400 border border-orange-500/30 w-fit">
                <Database size={24} />
              </div>
              <span className="text-sm font-bold text-[#9a9490]">90%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#111111]">SQL</h3>
              <div className="w-full bg-[#e2d9ce]/50 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full w-[90%] shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
              </div>
            </div>
          </div>

          {/* NLP */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(2)}
          >
            <div className="absolute top-3 right-3 flex gap-1">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-150"></div>
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 border border-purple-500/30 w-fit">
                <Binary size={24} />
              </div>
              <span className="text-sm font-bold text-[#9a9490]">95%</span>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-[#111111]">NLP</h3>
              <div className="w-full bg-[#e2d9ce]/50 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[95%] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
              </div>
            </div>
          </div>

          {/* R */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(3)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-blue-50/60 to-transparent pointer-events-none"></div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-blue-400/20 rounded-lg text-blue-400 border border-blue-400/30 w-fit">
                <Sigma size={24} />
              </div>
              <span className="text-sm font-bold text-[#9a9490]">85%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#111111]">R</h3>
              <div className="w-full bg-[#e2d9ce]/50 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full w-[85%] shadow-[0_0_10px_rgba(96,165,250,0.5)]"></div>
              </div>
            </div>
          </div>

          {/* SAS */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 relative hover:-translate-y-1 overflow-hidden ${cardClass()}`}
            style={cardStyle(4)}
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400 border border-indigo-500/30 w-fit">
                <PieChart size={24} />
              </div>
              <span className="text-sm font-bold text-[#9a9490]">80%</span>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-[#111111]">SAS</h3>
              <div className="w-full bg-[#e2d9ce]/50 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full w-[80%] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
              </div>
            </div>
          </div>

          {/* Prompt Engineering */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(5)}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">
              <Sparkles size={80} />
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-amber-500/20 rounded-lg text-amber-400 border border-amber-500/30 w-fit">
                <Sparkles size={24} />
              </div>
              <span className="text-sm font-bold text-[#9a9490]">95%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#111111]">Prompt Engineering</h3>
              <div className="w-full bg-[#e2d9ce]/50 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[95%] shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
              </div>
            </div>
          </div>

          {/* Data Analysis */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(6)}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">
              <BarChart3 size={80} />
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-teal-500/20 rounded-lg text-teal-400 border border-teal-500/30 w-fit">
                <BarChart3 size={24} />
              </div>
              <span className="text-sm font-bold text-[#9a9490]">92%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#111111]">Data Analysis</h3>
              <div className="w-full bg-[#e2d9ce]/50 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full w-[92%] shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
              </div>
            </div>
          </div>

          {/* Project Management */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/50 relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(7)}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">
              <ClipboardList size={80} />
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-rose-500/20 rounded-lg text-rose-400 border border-rose-500/30 w-fit">
                <ClipboardList size={24} />
              </div>
              <span className="text-sm font-bold text-[#9a9490]">90%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#111111]">Project Management</h3>
              <div className="w-full bg-[#e2d9ce]/50 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full w-[90%] shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div
            className={`glass-card p-6 rounded-2xl md:col-span-2 bg-gradient-to-br from-emerald-50 to-[#f0ebe3] group hover:border-indigo-500/50 flex items-center relative overflow-hidden ${cardClass()}`}
            style={cardStyle(8)}
          >
            <div className="absolute right-0 top-0 w-64 h-full bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.01)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px] pointer-events-none"></div>
            <div className="absolute -left-10 bottom-0 text-emerald-200/60 rotate-12">
              <Box size={120} />
            </div>

            <div className="flex items-center gap-6 z-10 ml-4">
              <div className="p-4 bg-emerald-500/20 rounded-xl text-emerald-500 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#111111]">Universidade NOVA de Lisboa</h3>
                <p className="text-emerald-600 text-sm font-medium">B.S. Information Science & Management</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">Data Governance</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">Systems</span>
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div
            className={`glass-card p-6 rounded-2xl md:col-span-2 flex flex-col justify-center relative group hover:border-indigo-500/50 overflow-hidden ${cardClass()}`}
            style={cardStyle(9)}
          >
            <div className="absolute right-[-20px] bottom-[-20px] text-[#e2d9ce] opacity-40 transform -rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <Globe size={150} />
            </div>

            <div className="flex items-center gap-4 mb-4 z-10">
              <div className="p-3 bg-pink-500/20 rounded-lg text-pink-400 border border-pink-500/30">
                <Languages size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#111111]">Trilingual + French</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 z-10">
              <div className="flex items-center justify-between p-2 rounded bg-[#f0ebe3] border border-[#e2d9ce] hover:bg-[#e2d9ce]/60 transition-colors">
                <span className="text-sm text-[#444444]">Arabic</span>
                <span className="text-xs text-[#111111] font-mono font-semibold">NATIVE</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#f0ebe3] border border-[#e2d9ce] hover:bg-[#e2d9ce]/60 transition-colors">
                <span className="text-sm text-[#444444]">English</span>
                <span className="text-xs text-emerald-600 font-mono font-semibold">FLUENT</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#f0ebe3] border border-[#e2d9ce] hover:bg-[#e2d9ce]/60 transition-colors">
                <span className="text-sm text-[#444444]">Hungarian</span>
                <span className="text-xs text-emerald-600 font-mono font-semibold">FLUENT</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#f0ebe3] border border-[#e2d9ce] hover:bg-[#e2d9ce]/60 transition-colors group/french">
                <span className="text-sm text-[#444444] group-hover/french:text-[#111111]">French</span>
                <span className="text-xs text-amber-600 font-mono font-semibold">INTERMED</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div
            className={`glass-card p-6 rounded-2xl md:col-span-4 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-indigo-500/50 relative overflow-hidden bg-gradient-to-r from-[#f0ebe3] to-[#f8f5f1] ${cardClass()}`}
            style={cardStyle(10)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/20 rounded-full text-amber-500 border border-amber-500/30">
                <Award size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#111111]">Honors & Certifications</h3>
                <p className="text-[#6b6460] text-sm">Verified credentials</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#f0ebe3] rounded-full border border-[#e2d9ce] text-xs text-[#444444] hover:border-amber-400/60 transition-colors">
                <CheckCircle2 size={14} className="text-amber-500" /> CS50 Python (Harvard)
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#f0ebe3] rounded-full border border-[#e2d9ce] text-xs text-[#444444] hover:border-amber-400/60 transition-colors">
                <CheckCircle2 size={14} className="text-amber-500" /> CS50 Web Dev (Harvard)
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#f0ebe3] rounded-full border border-[#e2d9ce] text-xs text-[#444444] hover:border-amber-400/60 transition-colors">
                <CheckCircle2 size={14} className="text-amber-500" /> ICDL Certificate
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechStack;

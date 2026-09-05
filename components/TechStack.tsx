import React, { useEffect, useRef, useState } from 'react';
import { Database, FileCode2, Languages, GraduationCap, Binary, Sigma, PieChart, Code, Network, Globe, Box, Layers, Award, CheckCircle2, BarChart3, ClipboardList } from 'lucide-react';

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
    <section id="stack" className="py-24 px-6 bg-transparent relative overflow-hidden">
      {/* Background Abstract Objects — warm toned */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#f7f3ec] rounded-full blur-3xl pointer-events-none"></div>

      {/* Decorative clutter removed for cream editorial */}

      {/* Subtle light grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] pointer-events-none"></div>

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#14110f]">
          Technical Arsenal & <span className="text-[#6b645c]">Proficiency</span>
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-6">

          {/* Main Tech: Python */}
          <div
            className={`glass-card p-6 rounded-2xl md:col-span-2 md:row-span-2 flex flex-col justify-between group hover:border-[#d9d0c0] relative overflow-hidden ${cardClass()}`}
            style={cardStyle(0)}
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-[#b85c38]/08 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="absolute -bottom-8 -right-8 opacity-5 rotate-12 transition-transform group-hover:rotate-0 duration-700">
              <FileCode2 size={200} />
            </div>

            <div className="flex justify-between items-start z-10">
              <div className="p-3 bg-[#f7f3ec] rounded-lg text-[#b85c38] border border-[#e6dfd2]">
                <FileCode2 size={32} />
              </div>
              <div className="text-right">
                <span className="text-xs text-[#6b645c] font-mono block">MASTERY LEVEL</span>
                <span className="text-xl font-bold text-[#14110f]">98%</span>
              </div>
            </div>

            <div className="z-10 mt-8">
              <h3 className="text-3xl font-bold text-[#14110f] mb-2">Python</h3>
              <p className="text-[#6b645c] text-sm mb-6 max-w-sm">
                Architecting scalable AI backends, complex data pipelines, and custom agentic workflows.
              </p>

              {/* Dark terminal — intentional accent */}
              <div className="bg-[#14110f] rounded-lg p-3 border border-[#e6dfd2] font-mono text-xs text-[#6b645c] overflow-hidden shadow-inner">
                <div className="flex gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                </div>
                <p><span className="text-[#b85c38]">def</span> <span className="text-blue-400">sovereign_ai</span>(data):</p>
                <p className="pl-4"><span className="text-[#6b645c]"># Processing logic</span></p>
                <p className="pl-4"><span className="text-green-400">return</span> data.optimize()</p>
              </div>
            </div>
          </div>

          {/* SQL */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#d9d0c0] relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(1)}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">
              <Database size={80} />
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-[#f7f3ec] rounded-lg text-[#9a4a2c] border border-[#e6dfd2] w-fit">
                <Database size={24} />
              </div>
              <span className="text-sm font-bold text-[#6b645c]">90%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#14110f]">SQL</h3>
              <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#b85c38] h-full w-[90%]"></div>
              </div>
            </div>
          </div>

          {/* NLP */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#d9d0c0] relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(2)}
          >
            <div className="absolute top-3 right-3 flex gap-1">
              <div className="w-1.5 h-1.5 bg-[#b85c38] rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-[#b85c38] rounded-full animate-pulse delay-75"></div>
              <div className="w-1.5 h-1.5 bg-[#b85c38] rounded-full animate-pulse delay-150"></div>
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-[#b85c38]/10 rounded-lg text-[#b85c38] border border-[#b85c38]/25 w-fit">
                <Binary size={24} />
              </div>
              <span className="text-sm font-bold text-[#6b645c]">95%</span>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-[#14110f]">NLP</h3>
              <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#b85c38] h-full w-[95%] "></div>
              </div>
            </div>
          </div>

          {/* R */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#d9d0c0] relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(3)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-blue-50/60 to-transparent pointer-events-none"></div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-blue-400/20 rounded-lg text-blue-400 border border-blue-400/30 w-fit">
                <Sigma size={24} />
              </div>
              <span className="text-sm font-bold text-[#6b645c]">85%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#14110f]">R</h3>
              <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#6b645c] h-full w-[85%]"></div>
              </div>
            </div>
          </div>

          {/* SAS */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#d9d0c0] relative hover:-translate-y-1 overflow-hidden ${cardClass()}`}
            style={cardStyle(4)}
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-amber-500/20 rounded-lg text-amber-400 border border-amber-500/30 w-fit">
                <PieChart size={24} />
              </div>
              <span className="text-sm font-bold text-[#6b645c]">80%</span>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-[#14110f]">SAS</h3>
              <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#b85c38] h-full w-[80%]"></div>
              </div>
            </div>
          </div>

          {/* Prompt Engineering */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#d9d0c0] relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(5)}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">
              <Award size={80} />
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-amber-500/20 rounded-lg text-amber-400 border border-amber-500/30 w-fit">
                <Award size={24} />
              </div>
              <span className="text-sm font-bold text-[#6b645c]">95%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#14110f]">Prompt Engineering</h3>
              <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#b85c38] h-full w-[95%]"></div>
              </div>
            </div>
          </div>

          {/* Data Analysis */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#d9d0c0] relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(6)}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">
              <BarChart3 size={80} />
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-teal-500/20 rounded-lg text-teal-400 border border-teal-500/30 w-fit">
                <BarChart3 size={24} />
              </div>
              <span className="text-sm font-bold text-[#6b645c]">92%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#14110f]">Data Analysis</h3>
              <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#2f6b4f] h-full w-[92%]"></div>
              </div>
            </div>
          </div>

          {/* Project Management */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#d9d0c0] relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(7)}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">
              <ClipboardList size={80} />
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-rose-500/20 rounded-lg text-rose-400 border border-rose-500/30 w-fit">
                <ClipboardList size={24} />
              </div>
              <span className="text-sm font-bold text-[#6b645c]">90%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#14110f]">Project Management</h3>
              <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#9a4a2c] h-full w-[90%]"></div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div
            className={`glass-card p-6 rounded-2xl md:col-span-2 bg-gradient-to-br from-emerald-50 to-[#f0ebe1] group hover:border-[#d9d0c0] flex items-center relative overflow-hidden ${cardClass()}`}
            style={cardStyle(8)}
          >
            <div className="absolute right-0 top-0 w-64 h-full bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.01)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px] pointer-events-none"></div>
            <div className="absolute -left-10 bottom-0 text-emerald-200/60 rotate-12">
              <Box size={120} />
            </div>

            <div className="flex items-center gap-6 z-10 ml-4">
              <div className="p-4 bg-emerald-500/20 rounded-xl text-emerald-500 border border-emerald-500/30 ">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#14110f]">Universidade NOVA de Lisboa</h3>
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
            className={`glass-card p-6 rounded-2xl md:col-span-2 flex flex-col justify-center relative group hover:border-[#d9d0c0] overflow-hidden ${cardClass()}`}
            style={cardStyle(9)}
          >
            <div className="absolute right-[-20px] bottom-[-20px] text-[#14110f]/20 opacity-40 transform -rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <Globe size={150} />
            </div>

            <div className="flex items-center gap-4 mb-4 z-10">
              <div className="p-3 bg-sky-500/20 rounded-lg text-sky-400 border border-sky-500/30">
                <Languages size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#14110f]">Trilingual + French</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 z-10">
              <div className="flex items-center justify-between p-2 rounded bg-[#f7f3ec] border border-[#e6dfd2] hover:bg-white/10 transition-colors">
                <span className="text-sm text-[#6b645c]">Arabic</span>
                <span className="text-xs text-[#14110f] font-mono font-semibold">NATIVE</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#f7f3ec] border border-[#e6dfd2] hover:bg-white/10 transition-colors">
                <span className="text-sm text-[#6b645c]">English</span>
                <span className="text-xs text-emerald-600 font-mono font-semibold">FLUENT</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#f7f3ec] border border-[#e6dfd2] hover:bg-white/10 transition-colors">
                <span className="text-sm text-[#6b645c]">Hungarian</span>
                <span className="text-xs text-emerald-600 font-mono font-semibold">FLUENT</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#f7f3ec] border border-[#e6dfd2] hover:bg-white/10 transition-colors group/french">
                <span className="text-sm text-[#6b645c] group-hover/french:text-[#14110f]">French</span>
                <span className="text-xs text-amber-600 font-mono font-semibold">INTERMED</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div
            className={`glass-card p-6 rounded-2xl md:col-span-4 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-[#d9d0c0] relative overflow-hidden bg-gradient-to-r from-[#f0ebe1] to-[#fffdf8] ${cardClass()}`}
            style={cardStyle(10)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/20 rounded-full text-amber-500 border border-amber-500/30">
                <Award size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#14110f]">Honors & Certifications</h3>
                <p className="text-[#6b645c] text-sm">Verified credentials</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#f7f3ec] rounded-full border border-[#e6dfd2] text-xs text-[#6b645c] hover:border-amber-400/60 transition-colors">
                <CheckCircle2 size={14} className="text-amber-500" /> CS50 Python (Harvard)
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#f7f3ec] rounded-full border border-[#e6dfd2] text-xs text-[#6b645c] hover:border-amber-400/60 transition-colors">
                <CheckCircle2 size={14} className="text-amber-500" /> CS50 Web Dev (Harvard)
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#f7f3ec] rounded-full border border-[#e6dfd2] text-xs text-[#6b645c] hover:border-amber-400/60 transition-colors">
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

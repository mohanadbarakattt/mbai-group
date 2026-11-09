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
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#080d0f] rounded-full blur-3xl pointer-events-none"></div>

      {/* Decorative clutter removed for cream editorial */}

      {/* Subtle light grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] pointer-events-none"></div>

      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#f1f5f4]">
          Technical Arsenal & <span className="text-[#a7b7b4]">Proficiency</span>
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-6">

          {/* Main Tech: Python */}
          <div
            className={`glass-card p-6 rounded-2xl md:col-span-2 md:row-span-2 flex flex-col justify-between group hover:border-[#33464a] relative overflow-hidden ${cardClass()}`}
            style={cardStyle(0)}
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-[#2a9d8f]/08 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="absolute -bottom-8 -right-8 opacity-5 rotate-12 transition-transform group-hover:rotate-0 duration-700">
              <FileCode2 size={200} />
            </div>

            <div className="flex justify-between items-start z-10">
              <div className="p-3 bg-[#080d0f] rounded-lg text-[#2a9d8f] border border-[#263437]">
                <FileCode2 size={32} />
              </div>
              <div className="text-right">
                <span className="text-xs text-[#a7b7b4] font-mono block">MASTERY LEVEL</span>
                <span className="text-xl font-bold text-[#f1f5f4]">98%</span>
              </div>
            </div>

            <div className="z-10 mt-8">
              <h3 className="text-3xl font-bold text-[#f1f5f4] mb-2">Python</h3>
              <p className="text-[#a7b7b4] text-sm mb-6 max-w-sm">
                Architecting scalable AI backends, complex data pipelines, and custom agentic workflows.
              </p>

              {/* Dark terminal — intentional accent */}
              <div className="bg-[#080d0f] rounded-lg p-3 border border-[#263437] font-mono text-xs text-[#a7b7b4] overflow-hidden shadow-inner">
                <div className="flex gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#2a9d8f]/60"></div>
                  <div className="w-2 h-2 rounded-full bg-[#2a9d8f]/60"></div>
                  <div className="w-2 h-2 rounded-full bg-[#2a9d8f]/60"></div>
                </div>
                <p><span className="text-[#2a9d8f]">def</span> <span className="text-[#2a9d8f]">sovereign_ai</span>(data):</p>
                <p className="pl-4"><span className="text-[#a7b7b4]"># Processing logic</span></p>
                <p className="pl-4"><span className="text-[#2a9d8f]">return</span> data.optimize()</p>
              </div>
            </div>
          </div>

          {/* SQL */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#33464a] relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(1)}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">
              <Database size={80} />
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-[#080d0f] rounded-lg text-[#2a9d8f] border border-[#263437] w-fit">
                <Database size={24} />
              </div>
              <span className="text-sm font-bold text-[#a7b7b4]">90%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#f1f5f4]">SQL</h3>
              <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#2a9d8f] h-full w-[90%]"></div>
              </div>
            </div>
          </div>

          {/* NLP */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#33464a] relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(2)}
          >
            <div className="absolute top-3 right-3 flex gap-1">
              <div className="w-1.5 h-1.5 bg-[#2a9d8f] rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-[#2a9d8f] rounded-full animate-pulse delay-75"></div>
              <div className="w-1.5 h-1.5 bg-[#2a9d8f] rounded-full animate-pulse delay-150"></div>
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-[#2a9d8f]/10 rounded-lg text-[#2a9d8f] border border-[#2a9d8f]/25 w-fit">
                <Binary size={24} />
              </div>
              <span className="text-sm font-bold text-[#a7b7b4]">95%</span>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-[#f1f5f4]">NLP</h3>
              <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#2a9d8f] h-full w-[95%] "></div>
              </div>
            </div>
          </div>

          {/* R */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#33464a] relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(3)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a9d8f]/60 to-transparent pointer-events-none"></div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-[#2a9d8f]/20 rounded-lg text-[#2a9d8f] border border-[#2a9d8f]/30 w-fit">
                <Sigma size={24} />
              </div>
              <span className="text-sm font-bold text-[#a7b7b4]">85%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#f1f5f4]">R</h3>
              <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#92a5a1] h-full w-[85%]"></div>
              </div>
            </div>
          </div>

          {/* SAS */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#33464a] relative hover:-translate-y-1 overflow-hidden ${cardClass()}`}
            style={cardStyle(4)}
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-[#2a9d8f]/20 rounded-lg text-[#2a9d8f] border border-[#2a9d8f]/30 w-fit">
                <PieChart size={24} />
              </div>
              <span className="text-sm font-bold text-[#a7b7b4]">80%</span>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-[#f1f5f4]">SAS</h3>
              <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#2a9d8f] h-full w-[80%]"></div>
              </div>
            </div>
          </div>

          {/* Prompt Engineering */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#33464a] relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(5)}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">
              <Award size={80} />
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-[#2a9d8f]/20 rounded-lg text-[#2a9d8f] border border-[#2a9d8f]/30 w-fit">
                <Award size={24} />
              </div>
              <span className="text-sm font-bold text-[#a7b7b4]">95%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#f1f5f4]">Prompt Engineering</h3>
              <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#2a9d8f] h-full w-[95%]"></div>
              </div>
            </div>
          </div>

          {/* Data Analysis */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#33464a] relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(6)}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">
              <BarChart3 size={80} />
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-teal-500/20 rounded-lg text-teal-400 border border-teal-500/30 w-fit">
                <BarChart3 size={24} />
              </div>
              <span className="text-sm font-bold text-[#a7b7b4]">92%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#f1f5f4]">Data Analysis</h3>
              <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#2a9d8f] h-full w-[92%]"></div>
              </div>
            </div>
          </div>

          {/* Project Management */}
          <div
            className={`glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-[#33464a] relative overflow-hidden hover:-translate-y-1 ${cardClass()}`}
            style={cardStyle(7)}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">
              <ClipboardList size={80} />
            </div>
            <div className="flex justify-between items-start">
              <div className="p-3 bg-[#2a9d8f]/20 rounded-lg text-[#2a9d8f] border border-[#2a9d8f]/30 w-fit">
                <ClipboardList size={24} />
              </div>
              <span className="text-sm font-bold text-[#a7b7b4]">90%</span>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="text-xl font-bold text-[#f1f5f4]">Project Management</h3>
              <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                <div className="bg-[#2a9d8f] h-full w-[90%]"></div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div
            className={`glass-card p-6 rounded-2xl md:col-span-2 bg-gradient-to-br from-[#2a9d8f] to-[#10191c] group hover:border-[#33464a] flex items-center relative overflow-hidden ${cardClass()}`}
            style={cardStyle(8)}
          >
            <div className="absolute right-0 top-0 w-64 h-full bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.01)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px] pointer-events-none"></div>
            <div className="absolute -left-10 bottom-0 text-[#2a9d8f]/60 rotate-12">
              <Box size={120} />
            </div>

            <div className="flex items-center gap-6 z-10 ml-4">
              <div className="p-4 bg-[#2a9d8f]/20 rounded-xl text-[#2a9d8f] border border-[#2a9d8f]/30 ">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#f1f5f4]">Universidade NOVA de Lisboa</h3>
                <p className="text-[#2a9d8f] text-sm font-medium">B.S. Information Science & Management</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#2a9d8f] text-[#2a9d8f] border border-[#2a9d8f]">Data Governance</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#2a9d8f] text-[#2a9d8f] border border-[#2a9d8f]">Systems</span>
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div
            className={`glass-card p-6 rounded-2xl md:col-span-2 flex flex-col justify-center relative group hover:border-[#33464a] overflow-hidden ${cardClass()}`}
            style={cardStyle(9)}
          >
            <div className="absolute right-[-20px] bottom-[-20px] text-[#f1f5f4]/20 opacity-40 transform -rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <Globe size={150} />
            </div>

            <div className="flex items-center gap-4 mb-4 z-10">
              <div className="p-3 bg-[#2a9d8f]/20 rounded-lg text-[#2a9d8f] border border-[#2a9d8f]/30">
                <Languages size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#f1f5f4]">Trilingual + French</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 z-10">
              <div className="flex items-center justify-between p-2 rounded bg-[#080d0f] border border-[#263437] hover:bg-white/10 transition-colors">
                <span className="text-sm text-[#a7b7b4]">Arabic</span>
                <span className="text-xs text-[#f1f5f4] font-mono font-semibold">NATIVE</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#080d0f] border border-[#263437] hover:bg-white/10 transition-colors">
                <span className="text-sm text-[#a7b7b4]">English</span>
                <span className="text-xs text-[#2a9d8f] font-mono font-semibold">C1</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#080d0f] border border-[#263437] hover:bg-white/10 transition-colors">
                <span className="text-sm text-[#a7b7b4]">Hungarian</span>
                <span className="text-xs text-[#2a9d8f] font-mono font-semibold">B1</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#080d0f] border border-[#263437] hover:bg-white/10 transition-colors group/french">
                <span className="text-sm text-[#a7b7b4] group-hover/french:text-[#f1f5f4]">French</span>
                <span className="text-xs text-[#2a9d8f] font-mono font-semibold">B1–B2</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div
            className={`glass-card p-6 rounded-2xl md:col-span-4 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-[#33464a] relative overflow-hidden bg-gradient-to-r from-[#10191c] to-[#11191c] ${cardClass()}`}
            style={cardStyle(10)}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2a9d8f]/50 to-transparent"></div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#2a9d8f]/20 rounded-full text-[#2a9d8f] border border-[#2a9d8f]/30">
                <Award size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#f1f5f4]">Honors & Certifications</h3>
                <p className="text-[#a7b7b4] text-sm">Verified credentials</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#080d0f] rounded-full border border-[#263437] text-xs text-[#a7b7b4] hover:border-[#2a9d8f]/60 transition-colors">
                <CheckCircle2 size={14} className="text-[#2a9d8f]" /> CS50 Python (Harvard)
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#080d0f] rounded-full border border-[#263437] text-xs text-[#a7b7b4] hover:border-[#2a9d8f]/60 transition-colors">
                <CheckCircle2 size={14} className="text-[#2a9d8f]" /> CS50 Web Dev (Harvard)
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#080d0f] rounded-full border border-[#263437] text-xs text-[#a7b7b4] hover:border-[#2a9d8f]/60 transition-colors">
                <CheckCircle2 size={14} className="text-[#2a9d8f]" /> ICDL Certificate
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechStack;

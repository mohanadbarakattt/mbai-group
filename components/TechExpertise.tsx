import React from 'react';

const techs = [
  'Python',
  'LLM Alignment',
  'RLHF · PPO/DPO',
  'Chain-of-Thought',
  'Gemini API',
  'GPT-4o',
  'LangChain',
  'Agentic Pipelines',
  'Synthetic Data',
  'n8n',
  'React',
  'TypeScript',
  'FastAPI',
  'Supabase',
  'PostgreSQL',
  'API Connectivity',
  'Secure Architecture',
  'Prompt Engineering',
  'Arabic NLP',
  'Framer Motion',
];

const Separator = () => (
  <span className="mx-5 text-white/20 select-none">·</span>
);

const TechExpertise: React.FC = () => {
  const doubled = [...techs, ...techs];

  return (
    <div className="w-full bg-[#080b14] border-y border-white/10 py-5 overflow-hidden relative">
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#080b14] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#080b14] to-transparent z-10 pointer-events-none" />

      <div className="flex items-center mb-3 px-6 justify-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300/80">Technical Competencies</p>
      </div>

      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee 36s linear infinite', width: 'max-content' }}
      >
        {doubled.map((tech, i) => (
          <span key={i} className="inline-flex items-center text-sm font-mono font-medium text-white/55">
            {tech}<Separator />
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechExpertise;

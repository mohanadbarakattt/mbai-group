import React from 'react';
import { useI18n } from '../i18n';

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
  const { locale, dict } = useI18n();
  const doubled = [...techs, ...techs];

  return (
    <div className="w-full bg-[#0e1533]/70 border-y border-white/10 py-5 overflow-hidden relative">
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0e1533] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0e1533] to-transparent z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 mb-4 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300/80 mb-2">{dict.techExpertise.eyebrow}</p>
        {locale === 'en' ? (
          <p className="text-sm md:text-[15px] text-[#aab2c5] leading-relaxed">
            The same disciplines that align frontier models — <span className="text-white font-medium">RLHF</span>,{' '}
            <span className="text-white font-medium">signal extraction</span>, and{' '}
            <span className="text-white font-medium">reasoning-grade data pipelines</span> — now power all four MB AI Group ventures.
          </p>
        ) : (
          <p className="text-sm md:text-[15px] text-[#aab2c5] leading-relaxed">{dict.techExpertise.body}</p>
        )}
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

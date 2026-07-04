import React from 'react';

const items = [
  'AI Agent Development',
  'Lead Generation Systems',
  'Arabic & English NLP',
  'MENA Market Expertise',
  'End-to-End AI Products',
  'Workflow Automation',
  'Real Estate AI Tools',
  'Fintech & Neobanking',
  'Translation AI',
  'Custom LLM Integration',
  'Done-For-You Systems',
  'Rapid Deployment',
];

const Dot = () => <span className="mx-5 w-1 h-1 rounded-full bg-[#c8bfb4] inline-block shrink-0" />;

const MarqueeBanner: React.FC = () => {
  const doubled = [...items, ...items];

  return (
    <div className="w-full overflow-hidden border-y border-[#e2d9ce] bg-[#f0ebe3] py-4 relative">
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#f0ebe3] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#f0ebe3] to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap" style={{ animation: 'marquee 32s linear infinite', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center text-sm font-medium text-[#6b6460]">
            {item}<Dot />
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;

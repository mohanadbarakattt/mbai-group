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

const Dot = () => <span className="mx-5 w-1 h-1 rounded-full bg-[#b85c38]/60 inline-block shrink-0" />;

const MarqueeBanner: React.FC = () => {
  const doubled = [...items, ...items];

  return (
    <div className="w-full overflow-hidden border-y border-[#e6dfd2] bg-[#fffdf8] py-4 relative">
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#fffdf8] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#fffdf8] to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap motion-safe-marquee" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center text-sm font-medium text-[#6b645c]">
            {item}<Dot />
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;

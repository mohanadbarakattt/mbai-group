import React from 'react';

const items = [
  'AI Agent Development',
  'Membership Systems',
  'Website Design & Rebuilds',
  'Ads Management',
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

const Dot = () => <span className="mx-5 w-1 h-1 rounded-full bg-[#2a9d8f]/60 inline-block shrink-0" />;

const MarqueeBanner: React.FC = () => {
  const doubled = [...items, ...items];

  return (
    <div className="w-full overflow-hidden border-y border-white/10 bg-white/[0.035] backdrop-blur-md py-4 relative">
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#080d0f] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#080d0f] to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap motion-safe-marquee" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center text-sm font-medium text-[#a7b7b4]">
            {item}<Dot />
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;

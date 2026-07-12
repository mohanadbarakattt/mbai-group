import React, { useEffect, useRef, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, HelpCircle } from 'lucide-react';

// Genuine Q&A grounded in copy that already exists elsewhere on this site —
// nothing here is a new claim, just a crawlable, directly-citable summary of
// facts an LLM or search snippet could otherwise only find scattered across
// animated, scroll-revealed sections.
const FAQS = [
  {
    q: 'What is MB AI Group?',
    a: "MB AI Group (MBAI Solutions) is an AI product studio based in Cairo, Egypt and Dubai, UAE, founded by Mohanad Barakat, a former xAI Human Data Lead. It builds AI agents, data systems, and products for MENA businesses, and ships its own ventures — AutoLeadss, Virlo Studio, IBNI, and TUT — using the same alignment and Arabic-NLP discipline.",
  },
  {
    q: 'What is AutoLeadss?',
    a: 'AutoLeadss is a hybrid AI + human lead-generation system that sources, qualifies, and books appointments for MENA enterprises, plus a self-serve SaaS that lets any business spin up its own AI-powered lead funnel. It is live today at autoleadss.com, with 200+ qualified leads delivered across three markets.',
  },
  {
    q: 'What is IBNI?',
    a: 'IBNI ("build me" in Arabic) is an AI app builder that turns a plain-language idea into a working application — architected, generated, and previewed live, in Arabic or English. It is currently an active, in-development concept preview, not yet a publicly shipped product.',
  },
  {
    q: 'What is Virlo Studio?',
    a: 'Virlo Studio is an Egyptian-first AI video and image generation studio — Franco-Arabic prompting, culturally-tuned presets, characters, and b-roll for creators and brands. It is currently an active, in-development concept preview.',
  },
  {
    q: 'What is TUT?',
    a: "TUT, named after Egypt's boy king, is a personal AI learning companion for MENA students — explaining concepts in Arabic or English at each learner's pace. It is currently an active, in-development concept preview.",
  },
  {
    q: 'How many products has MB AI Group shipped or demoed?',
    a: "The group's four ventures (AutoLeadss, Virlo Studio, IBNI, TUT) plus six additional interactive engineering demos (an ATS resume optimizer, a market-sentiment dashboard, a Franco-Arabic translator, a local-intelligence tool for Egypt, a neobank UI, and an AI music tool) add up to ten working, try-it-live products shown on this site.",
  },
];

const FAQSection: React.FC = () => {
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
    <section id="faq" ref={ref} className="py-24 px-6 bg-transparent border-t border-white/10">
      <div className="max-w-3xl mx-auto">
        <div className={`mb-12 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3 flex items-center justify-center gap-2">
            <HelpCircle size={14} /> Frequently Asked
          </p>
          <h2 className="text-3xl md:text-4xl font-black leading-tight">
            Quick answers, <span className="text-gradient">no scrolling required.</span>
          </h2>
        </div>

        <Accordion.Root type="single" collapsible className={`space-y-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {FAQS.map((item, i) => (
            <Accordion.Item
              key={item.q}
              value={`item-${i}`}
              className="glass-strong card-fx rounded-2xl overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm md:text-base font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded-2xl">
                  {item.q}
                  <ChevronDown size={18} className="shrink-0 text-cyan-400 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-sm text-[#aab2c5] leading-relaxed data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <p className="px-6 pb-5">{item.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
};

export default FAQSection;

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
    a: "MB AI Group (MBAI Solutions) is an AI product studio based in Cairo, Egypt and Dubai, UAE, founded by Mohanad Barakat, a former xAI Human Data Lead. It builds AI agents, data systems, and products for MENA businesses, and ships its own ventures — AutoLeadss, TUT, IBNI, Virlo, and Be3ly.",
  },
  {
    q: 'What is AutoLeadss?',
    a: 'AutoLeadss is a hybrid AI + human lead-generation system that sources, qualifies, and books appointments for MENA enterprises, plus a self-serve SaaS that lets any business spin up its own AI-powered lead funnel. It is live today at autoleadss.com.',
  },
  {
    q: 'What is TUT?',
    a: 'TUT is a live boarding-pass progressive web app at tutapp.co — keep your pass on your phone, offline-friendly and ready at the gate. It is not a coming-soon AI companion.',
  },
  {
    q: 'What is IBNI?',
    a: 'IBNI ("build me" in Arabic) is an Egyptian storefront builder. A DEMO_MODE preview is live at ibni.app.',
  },
  {
    q: 'What is Virlo?',
    a: 'Virlo is building an Egypt-first digital-product marketplace with InstaPay. The earlier AI video & image studio concept is parked. There is no public marketplace URL yet.',
  },
  {
    q: 'What is Be3ly?',
    a: 'Be3ly is a prototype Egyptian affiliate / social-selling connector. Model B: the merchant collects payment via InstaPay. Still building — no public product URL yet.',
  },
  {
    q: 'How many ventures does MB AI Group have?',
    a: 'Five ventures: AutoLeadss (live), TUT (live at tutapp.co), IBNI (demo at ibni.app), Virlo (building), and Be3ly (building), plus additional interactive engineering demos on this site.',
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
    <section id="faq" ref={ref} className="py-24 px-6 bg-transparent border-t border-[#e6dfd2]">
      <div className="max-w-3xl mx-auto">
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[#b85c38] text-xs font-semibold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
            <HelpCircle size={14} /> Frequently Asked
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            Quick answers, <span className="text-[#b85c38]">no scrolling required.</span>
          </h2>
        </div>

        <Accordion.Root type="single" collapsible className={`space-y-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {FAQS.map((item, i) => (
            <Accordion.Item
              key={item.q}
              value={`item-${i}`}
              className="bg-[#fffdf8] border border-[#e6dfd2] rounded-2xl overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm md:text-base font-semibold text-[#14110f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b85c38]/60 rounded-2xl">
                  {item.q}
                  <ChevronDown size={18} className="shrink-0 text-[#b85c38] transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-sm text-[#6b645c] leading-relaxed data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
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

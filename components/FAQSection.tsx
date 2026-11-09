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
    a: 'AutoLeadss is the done-for-you growth arm of MB AI Group: membership systems for repeat-service businesses in Egypt (subscription storefront, upfront payment to the merchant account, customer QR passes, staff redemption, owner dashboard), website design and rebuilds, ads management, and AI-assisted lead generation. Live at autoleadss.com.',
  },
  {
    q: 'What is TUT?',
    a: 'TUT is live at tutapp.co: a sourced AI travel guide, free Egypt Pass check-in with your name in hieroglyphs and a Tut or Cleopatra portrait, plus itineraries and a trips & plans library. Every answer names its source page and the day it was checked, or says nobody publishes one. Twelve languages, dark/light themes and PWA install. TUT has been shortlisted to pitch at the Global Entrepreneurship Festival (GEF), EIP programme 2026. Free for travellers, no subscriptions or paid passes. Partner listings are free for vetted businesses; TUT earns a revenue share only when it brings a booking. Partner bookings go live with pilots. GEM & attraction tickets are planned, not live.',
  },
  {
    q: 'What is IBNI?',
    a: 'IBNI ("build me" in Arabic) is an AI app builder: write an idea in Masri, Franco or English and it plans, codes, tests and publishes a real app with its own database. Preview at ibni-v2.vercel.app.',
  },
  {
    q: 'What is Virlo Studio?',
    a: 'Virlo Studio is an Egyptian-first AI video and image studio: prompt in Masri or Franco for reels, memes, posters and ads, with Egyptian templates and EGP pricing. Preview at virlo-studio.vercel.app.',
  },
  {
    q: 'What is Be3ly?',
    a: 'Be3ly is a prototype Egyptian affiliate / social-selling connector. Model B: the merchant collects payment via InstaPay. Still building — no public product URL yet.',
  },
  {
    q: 'How many ventures does MB AI Group have?',
    a: 'Five ventures: AutoLeadss (live at autoleadss.com), TUT (live at tutapp.co), IBNI (AI app builder, preview), Virlo Studio (AI video and image studio, preview) and Be3ly (building), plus interactive engineering demos and open-source projects on this site.',
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
    <section id="faq" ref={ref} className="py-24 px-6 bg-transparent border-t border-[#263437]">
      <div className="max-w-3xl mx-auto">
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[#2a9d8f] text-xs font-semibold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
            <HelpCircle size={14} /> Frequently Asked
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            Quick answers, <span className="text-[#2a9d8f]">no scrolling required.</span>
          </h2>
        </div>

        <Accordion.Root type="single" collapsible className={`space-y-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {FAQS.map((item, i) => (
            <Accordion.Item
              key={item.q}
              value={`item-${i}`}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm md:text-base font-semibold text-[#f1f5f4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a9d8f]/60 rounded-2xl">
                  {item.q}
                  <ChevronDown size={18} className="shrink-0 text-[#2a9d8f] transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-sm text-[#a7b7b4] leading-relaxed data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
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

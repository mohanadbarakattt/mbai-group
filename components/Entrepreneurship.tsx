import React from 'react';
import { motion } from 'framer-motion';
import { Bot, BarChart3, Code2, TrendingUp, Info, Shield } from 'lucide-react';

const services = [
  {
    icon: <Bot size={24} />,
    number: '01',
    title: 'AI Agents & Automation',
    description: 'Custom autonomous agents for UAE real estate brokerages and MENA enterprise ops teams — scanning listings, qualifying leads, running follow-up outreach, and executing multi-step workflows 24/7 without headcount.',
    tags: ['LLM Integration', 'CoT Reasoning', 'Agentic Pipelines'],
  },
  {
    icon: <BarChart3 size={24} />,
    number: '02',
    title: 'Lead Generation Systems',
    description: 'We source, score, and deliver warm, pre-qualified leads for UAE brokerages and MENA fintech ops teams. High-throughput data pipelines do the research; Arabic & English outreach specialists handle the close — done for you.',
    tags: ['Data Pipelines', 'Synthetic Data', 'Arabic Outreach'],
  },
  {
    icon: <Code2 size={24} />,
    number: '03',
    title: 'AI Product Development',
    description: 'End-to-end engineering of MENA fintech dashboards, Arabic NLP classifiers, information management platforms, and AI-powered web apps — production-ready, unit-tested, deployed, and documented.',
    tags: ['API Connectivity', 'Database Scalability', 'Secure Architecture'],
  },
];

const verticals = [
  { icon: <TrendingUp size={16} />, label: 'UAE Real Estate', detail: 'Lead scoring agents, automated viewing follow-up, Arabic buyer outreach' },
  { icon: <Info size={16} />, label: 'MENA Finance & Fintech', detail: 'Risk assessment agents, financial data analysis, automated reporting' },
  { icon: <Shield size={16} />, label: 'Enterprise Information Systems', detail: 'Hallucination-minimised AI for regulated industries, market intelligence platforms' },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 bg-[#f8f5f1]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.p
            className="text-[#9a9490] text-xs font-semibold uppercase tracking-[0.2em]"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          >
            What We Build
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[#111111]"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          >
            AI Solutions for the Real World
          </motion.h2>
          <motion.p
            className="text-[#6b6460] max-w-xl mx-auto leading-relaxed"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          >
            We don't just consult — we build and deliver working AI products. Every engagement ends with something you can use in production.
          </motion.p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, index) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="bg-white border border-[#e2d9ce] rounded-2xl p-8 relative overflow-hidden hover:border-[#b8afa6] hover:shadow-md transition-all duration-250 flex flex-col"
            >
              <div className="absolute top-4 right-6 text-7xl font-black text-[#f0ebe3] select-none pointer-events-none leading-none">
                {s.number}
              </div>
              <div className="bg-[#f0ebe3] text-[#444] p-3 rounded-xl w-fit mb-6">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-[#111111] mb-3">{s.title}</h3>
              <p className="text-[#6b6460] leading-relaxed text-sm mb-6 flex-1">{s.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-[#f0ebe3] border border-[#e2d9ce] text-[#6b6460] font-medium">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verticals strip */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {verticals.map((v, index) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border border-[#e2d9ce] rounded-xl px-5 py-4 flex items-start gap-3 hover:border-[#b8afa6] transition-colors"
            >
              <div className="text-[#9a9490] mt-0.5 shrink-0">{v.icon}</div>
              <div>
                <p className="text-xs font-bold text-[#111111] mb-0.5">{v.label}</p>
                <p className="text-xs text-[#9a9490] leading-snug">{v.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 bg-[#111111] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ color: 'white' }}>Have a project in mind?</h3>
            <p className="text-[#9a9490] text-sm">30 minutes. We'll scope the project, define the deliverable, and tell you exactly what it takes.</p>
          </div>
          <button
            onClick={() => { if ((window as any).Calendly) (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/autoleadss-info/30min' }); }}
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3 bg-white hover:bg-[#f0ebe3] text-[#111111] font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap">
            Book a 30-min Strategy Call
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;

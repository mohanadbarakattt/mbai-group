import type { Dict } from './types';

/**
 * English — the source-of-truth copy (identical to what shipped before i18n
 * existed). Every other locale is typed against `Dict`, so a missing/extra
 * key in ar.ts or franco.ts is a real TypeScript error, not a silent gap.
 *
 * Scope: the primary site chrome (Navigation, Hero, Ventures, Footer, Contact,
 * About's header block, HowWeWork, StatsSection, TechExpertise) — not the
 * embedded autoleads/ legacy subtree, the interactive demos, or About's
 * detailed Experience/TechStack timeline (a large, CV-specific content
 * surface better suited to a dedicated follow-up).
 */
const en: Dict = {
  nav: {
    ventures: 'Ventures',
    process: 'Process',
    demos: 'Demos',
    contact: 'Contact',
    ourStory: 'Our Story',
    bookCall: 'Book a 30-min Strategy Call',
    languageLabel: 'Language',
  },

  hero: {
    slides: [
      {
        badge: 'MB AI Group · Frontier AI for MENA',
        line1: 'Frontier AI,',
        line2: 'built for the real world.',
        sub: 'Founded by a former xAI Human Data Lead. We build the AI agents, data systems, and products that move MENA businesses — and launch our own ventures doing the same.',
      },
      {
        badge: 'One Group · Four Ventures',
        line1: 'AutoLeadss. Virlo.',
        line2: 'IBNI. TUT.',
        sub: 'AutoLeadss generates revenue today. Virlo Studio, IBNI and TUT are next — virality intelligence, no-code AI building, and education for 100M+ students.',
      },
      {
        badge: 'LLM Alignment · RLHF · Reasoning',
        line1: 'The rigour behind',
        line2: 'frontier models.',
        sub: "Our work covered LLM alignment, RLHF, and Chain-of-Thought reasoning — the techniques behind the world's most capable AI, now applied to your product.",
      },
    ],
    ctaBook: 'Book a 30-min Strategy Call',
    ctaDemos: 'Explore Live Demos',
    ctaStory: 'Read the founder’s story',
    statLead: 'Ex-xAI Human Data Lead',
    statProducts: '10 shipped products',
    statLocation: 'Cairo · Dubai',
    slideAria: 'Slide {n}',
  },

  ventures: {
    eyebrow: 'The MB AI Group Portfolio',
    heading1: 'One group.',
    heading2: 'Four ventures.',
    heading3: 'One mission.',
    intro:
      'Every company in the group attacks the same problem from a different angle: bringing frontier-grade AI to the markets the frontier forgot. No-code app building, AI-driven lead generation, generative media, and companionship.',
    statusLive: 'Live',
    statusPreview: 'Preview',
    statusComingSoon: 'Coming soon',
    ctaLive: 'Visit the live product',
    ctaPreview: 'Preview the vision',
    whyItMatters: 'Why it matters',
    items: {
      ibni: {
        tagline: 'The AI App Builder',
        description:
          'IBNI ("build me" in Arabic) turns a plain-language idea into a working application. Describe the product; IBNI architects, generates, and ships it — bringing software creation to founders who don\'t code.',
        interpretation:
          'RLHF-aligned generation, pointed at software: IBNI architects apps the way a senior engineer would — so the next hundred million builders can ship in Arabic or English, not Python.',
      },
      autoleadss: {
        tagline: 'Agency + AI Funnel-Builder SaaS',
        description:
          'A hybrid AI + human system that sources, qualifies, and books appointments for MENA enterprises — plus a self-serve SaaS that lets any business spin up its own AI-powered lead funnel in minutes.',
        interpretation:
          'Proof that frontier-grade AI can drive revenue today — real leads for real clients, and the same engine packaged for anyone to run themselves.',
      },
      virlo: {
        tagline: 'Egyptian-First AI Video & Image Studio',
        description:
          'A generation studio built for Egyptian and MENA creators — Franco-Arabic prompting, culturally-tuned presets, characters, and b-roll, so brands and creators get on-brand video and image content without a production crew.',
        interpretation:
          'Applies frontier generative media, tuned for Egyptian culture and dialect, to the creators the global tools were never built for.',
      },
      tut: {
        tagline: 'Egyptian AI Companion',
        description:
          "Named after Egypt's boy king, TUT is a personal AI companion for MENA users — conversing naturally in Egyptian Franco-Arabic, remembering context, and adapting to each person's life and pace.",
        interpretation:
          "A companion that actually speaks like Egypt does — alignment-grade AI, tuned for the region's dialect and culture, not translated from someone else's.",
      },
    },
    ecosystemEyebrow: 'One account. One AI. All products.',
    ecosystemBody:
      'Every product in the MB AI Group runs on the same foundation: one login across the whole ecosystem, one shared data platform, and the MBAI AI gateway — fine-tuned for Egyptian Franco-Arabic — powering every model call. Each venture still lives on its own domain, built for its own audience, but none of them start from zero.',
  },

  footer: {
    explore: 'Explore',
    legal: 'Legal',
    venturesLink: 'Ventures',
    demosLink: 'Demos',
    githubLink: 'GitHub',
    claudeLink: 'Claude',
    ourStory: 'Our Story',
    contactLink: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: '© {year} MB AI Group. All rights reserved.',
    location: 'Cairo, Egypt & Dubai, UAE',
  },

  contact: {
    eyebrow: 'Get in Touch',
    heading: "Let's talk about your project.",
    body: 'Book a call directly using the calendar, or reach out through any of the channels below. We typically respond within a few hours.',
    whatsapp: 'WhatsApp',
    email: 'Email',
    calendlyTitle: 'Book a 30-min Strategy Call',
    calendlySub: 'Pick a time that works for you — no commitment required.',
  },

  about: {
    kicker: 'Mohanad Barakat',
    headingPre: 'Meet the',
    headingGradient: 'Founder & CEO',
    blurb:
      'Former xAI Human Data Lead — translating world-scale AI research into practical solutions for the MENA region.',
    downloadCv: 'Download CV',
  },

  howWeWork: {
    eyebrow: 'Our Process',
    heading1: 'From idea to shipped —',
    heading2: 'in weeks, not months.',
    steps: [
      { title: 'Discover', punch: 'We scope it in one call.', description: 'Goals, market, workflow — all mapped before a line is written.' },
      { title: 'Build', punch: 'Engineers ship, not slides.', description: 'Your AI agent, pipeline, or product — built iteratively with you.' },
      { title: 'Launch', punch: 'Live. Tested. Yours.', description: 'Deployed, documented, and walked through — ready from day one.' },
      { title: 'Support', punch: 'We stay in the game.', description: 'Optimise, scale, and refine — we treat every client as a long-term partner.' },
    ],
    avgTimeLabel: 'Average time to first delivery:',
    avgTimeValue: '2–4 weeks',
  },

  stats: {
    eyebrow: 'Client Results',
    heading1: 'Real outcomes,',
    heading2: 'real teams.',
    leadsBig: '200+',
    leadsLabel: 'leads delivered',
    items: [
      { number: '10', label: 'AI products shipped' },
      { number: '3', label: 'MENA markets served' },
      { number: '200+', label: 'leads delivered' },
    ],
  },

  techExpertise: {
    eyebrow: 'The Engine Behind the Group',
    body: 'The same disciplines that align frontier models — RLHF, signal extraction, and reasoning-grade data pipelines — now power all four MB AI Group ventures.',
  },
};

export default en;

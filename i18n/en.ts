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
    bookCall: 'Get in touch',
    languageLabel: 'Language',
  },

  hero: {
    badge: 'MB AI Group · Frontier AI for MENA',
    line1: 'Frontier AI,',
    line2: 'built for the real world.',
    sub: 'Founded by a former xAI Human Data Lead. We build the AI agents, data systems, and products that move MENA businesses — and launch our own ventures doing the same.',
    ctaBook: 'Get in touch',
    ctaDemos: 'Explore Live Demos',
    statLead: 'Ex-xAI Human Data Lead',
    statProducts: '10 shipped products',
    statLocation: 'Cairo · Dubai',
  },

  ventures: {
    eyebrow: 'The MB AI Group Portfolio',
    heading1: 'One group.',
    heading2: 'Five ventures.',
    heading3: 'One mission.',
    intro:
      'Every company in the group attacks a MENA-shaped problem: AI lead gen, Egyptian boarding-pass UX, storefront building, digital-product commerce (InstaPay), and affiliate social selling.',
    statusLive: 'Live',
    statusPreview: 'Preview',
    statusComingSoon: 'Coming soon',
    statusBuilding: 'Building',
    ctaLive: 'Visit the live product',
    ctaPreview: 'Preview the vision',
    whyItMatters: 'Why it matters',
    items: {
      ibni: {
        tagline: 'Egyptian Storefront Builder',
        description:
          'IBNI ("build me" in Arabic) is an Egyptian storefront builder — turn a plain-language idea into a working shop experience. Demo live at ibni.app in DEMO_MODE.',
        interpretation:
          'Storefront scaffolding for Egyptian merchants first — try the DEMO_MODE preview at ibni.app.',
      },
      autoleadss: {
        tagline: 'Agency + AI Funnel-Builder SaaS',
        description:
          'A hybrid AI + human system that sources, qualifies, and books appointments for MENA enterprises — plus a self-serve SaaS that lets any business spin up its own AI-powered lead funnel in minutes.',
        interpretation:
          'Proof that frontier-grade AI can drive revenue today — real leads for real clients, and the same engine packaged for anyone to run themselves.',
      },
      virlo: {
        tagline: 'Egyptian Digital-Product Marketplace',
        description:
          'Pivoting (Aug 2026) into an Egypt-first digital-product marketplace with InstaPay. The earlier AI video & image studio is parked. Still building — no public marketplace URL yet.',
        interpretation:
          'Honest product truth: commerce rails for Egyptian digital goods, not a fake "coming soon" studio launch page.',
      },
      tut: {
        tagline: 'Boarding-Pass PWA',
        description:
          'TUT is a live boarding-pass progressive web app at tutapp.co — keep your pass on your phone, ready at the gate. Not a coming-soon AI companion.',
        interpretation:
          'A shipped Egyptian travel utility — open tutapp.co and use it today.',
      },
      be3ly: {
        tagline: 'Affiliate & Social-Selling Connector',
        description:
          'Prototype Egyptian affiliate / social-selling connector. Model B: the merchant collects InstaPay. Still building — no invented production URL.',
        interpretation:
          'Connects promoters to merchants without inventing a fake storefront domain.',
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

  cookieConsent: {
    body: 'We use essential cookies to run this site, and optional cookies for analytics. You can accept or reject anytime.',
    analyticsLabel: 'Analytics (optional) — helps us understand site usage',
    acceptAll: 'Accept all',
    rejectAll: 'Reject non-essential',
    manage: 'Manage',
    saveChoices: 'Save choices',
  },

  contact: {
    eyebrow: 'Get in Touch',
    heading: "Let's talk about your project.",
    body: 'Online booking is temporarily unavailable. Reach out by WhatsApp, email, or LinkedIn — we typically respond within a few hours.',
    whatsapp: 'WhatsApp',
    email: 'Email',
    calendlyTitle: 'Strategy call booking',
    calendlySub: 'Calendar embed currently unavailable.',
    bookingUnavailable: 'Please use WhatsApp, email, or LinkedIn below. A working Calendly link will be restored once the owner provides one.',
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
    explainerTitle: 'Watch the process, start to finish',
    explainerBody: 'A real project moving through Discover, Build, Launch, and Support — in under two minutes.',
    explainerVideoLabel: 'How We Work — a 2-minute walkthrough',
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
    body: 'The same disciplines that align frontier models — RLHF, signal extraction, and reasoning-grade data pipelines — now power MB AI Group ventures.',
  },

  features: {
    eyebrow: 'What We Bring',
    heading1: "Everything you'd expect from a frontier AI lab —",
    heading2: 'tuned for how MENA actually works.',
    items: [
      {
        title: 'Multi-Agent Orchestration',
        description: 'One model plans and reviews, a crew of cheaper agents build — the same delegation practice powering every product we ship.',
      },
      {
        title: 'Arabic-First, Not Arabic-Translated',
        description: 'Dialect-tuned NLP for Egyptian Franco-Arabic and MSA — built from real regional data, not machine-translated prompts.',
      },
      {
        title: 'Idea to Shipped, in Weeks',
        description: 'Tested, documented, and deployed — not a slide deck. Most engagements go live in 2–4 weeks.',
      },
    ],
  },

  benefits: {
    eyebrow: 'What You Actually Get',
    heading1: 'Real outcomes,',
    heading2: 'not just a build.',
    items: [
      {
        eyebrow: 'Speed',
        title: 'From idea to shipped product in weeks, not months',
        body: 'Most engagements go live in 2–4 weeks — discovery, build, and launch as one continuous sprint, not a quarter-long contract.',
        videoLabel: 'Idea to shipped, visualised',
      },
      {
        eyebrow: 'Reach',
        title: 'Speak to your Arabic-speaking customers the way they actually talk',
        body: 'Egyptian Franco-Arabic, MSA, and English — dialect-tuned NLP built from real regional data, not a translated prompt.',
        videoLabel: 'Arabic-first, by design',
      },
      {
        eyebrow: 'Scale',
        title: 'One AI gateway powers every product you own',
        body: 'Every MB AI Group venture runs on the same shared foundation — one login, one data platform, one gateway — so nothing you build starts from zero.',
        videoLabel: 'One gateway, every product',
      },
    ],
  },

  comparison: {
    eyebrow: 'Why MB AI Group',
    heading1: 'One partner for build and market —',
    heading2: 'not another vendor in the queue.',
    sub: 'A straightforward look at how we compare to the alternatives MENA businesses usually weigh.',
    columnUs: 'MB AI Group',
    columnOffshore: 'Offshore Dev Shop',
    columnAgency: 'Generic Agency',
    rows: [
      { label: 'Ships its own AI products, not just client work', us: 'Yes — 5 active ventures', offshore: 'Usually client work only', agency: 'Usually client work only' },
      { label: 'Team on the ground in Cairo & Dubai', us: 'Yes', offshore: '—', agency: '—' },
      { label: 'Arabic dialect-tuned AI (Egyptian Franco-Arabic + MSA)', us: 'Yes', offshore: '—', agency: '—' },
      { label: 'One partner for build and ongoing growth', us: 'Yes', offshore: 'Varies by contract', agency: 'Varies by contract' },
      { label: 'Open, inspectable code on public repos', us: 'Yes — GitHub', offshore: '—', agency: '—' },
    ],
    footnote: "— means it depends on the specific shop; we're not going to guess at claims we can't verify.",
  },
};

export default en;

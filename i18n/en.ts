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
    statProducts: '14 products, demos & projects',
    statLocation: 'Cairo · Dubai',
  },

  ventures: {
    eyebrow: 'The MB AI Group Portfolio',
    heading1: 'One group.',
    heading2: 'Five ventures.',
    heading3: 'One mission.',
    intro:
      'Every company in the group attacks a MENA-shaped problem: done-for-you growth for local businesses, a sourced AI travel guide for Egypt, an AI app builder that speaks Masri, an Egyptian AI video and image studio, and affiliate social selling.',
    statusLive: 'Live',
    statusPreview: 'Preview',
    statusComingSoon: 'Coming soon',
    statusBuilding: 'Building',
    ctaLive: 'Visit the live product',
    ctaPreview: 'Preview the vision',
    whyItMatters: 'Why it matters',
    items: {
      ibni: {
        tagline: 'The AI App Builder',
        description:
          'IBNI ("build me" in Arabic) turns one sentence into a real app with its own code and database. Write your idea in Masri, Franco or English; Ibni plans it, writes the code, tests it, fixes what breaks and publishes it on your own link. Free instant preview; paid plans add a real backend and database, priced in EGP.',
        interpretation:
          'Software creation for Egyptian founders who do not code: describe it the way you talk, and you own the code.',
      },
      autoleadss: {
        tagline: 'Memberships · Websites · Ads · Lead Gen',
        description:
          'AutoLeadss is the done-for-you growth arm of MB AI Group. It builds membership systems for repeat-service businesses in Egypt (subscription storefront, upfront payment to the merchant account, customer QR passes, staff redemption, owner dashboard), designs and rebuilds websites and online stores, runs ads, and sets up AI-assisted lead generation.',
        interpretation:
          'One partner for the storefront, the site, the ads and the leads, with the merchant owning the build and the data.',
      },
      virlo: {
        tagline: 'Egyptian-First AI Video & Image Studio',
        description:
          'Virlo Studio is the AI studio that actually speaks Egyptian. Prompt in Masri or Franco and get reels, memes, posters and ads, with Egyptian templates and daily trends, a saved brand kit and characters, batch generation, and clear EGP pricing with a free daily allowance.',
        interpretation:
          'Generative video and images tuned for Egyptian dialect and culture, for the creators global tools were not built for.',
      },
      tut: {
        tagline: 'AI Travel Guide for Egypt',
        description:
          'TUT is an AI travel guide for Egypt, live at tutapp.co. Ask about prices, transport, sites or etiquette: every answer names the source page and the day it was checked, or says nobody publishes one. Free to use, in twelve languages including Egyptian Arabic and Franco.',
        interpretation:
          'Retrieval-grounded AI that shows its sources instead of guessing. Sign up and you get a shareable boarding-pass souvenir with your name in hieroglyphs.',
      },
      be3ly: {
        tagline: 'Affiliate & Social-Selling Connector',
        description:
          'Prototype Egyptian affiliate / social-selling connector. Model B: the merchant collects InstaPay. Still building — no invented production URL.',
        interpretation:
          'Connects promoters to merchants without inventing a fake storefront domain.',
      },
    },
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
    body: 'We use essential cookies to run this site. We do not currently load third-party analytics; if you accept analytics below, we will store that preference for if we add them later.',
    analyticsLabel: 'Analytics (optional, not currently active) — preference stored for a future analytics tool',
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
    headingGradient: 'Founder & AI Engineer',
    blurb:
      'AI Engineer & Founder | Ex-xAI Human Data Lead (Grok). Building Arabic-first AI products and agents for MENA from Cairo and Dubai.',
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
      { number: '14', label: 'products, demos & projects built' },
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
        eyebrow: 'Ownership',
        title: 'You own what we build',
        body: 'Code, domain, accounts and data are handed over at the end of the project. No lock-in, and optional maintenance only if you want it.',
        videoLabel: 'Handed over, not rented',
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

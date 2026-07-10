/**
 * Shape shared by every locale dictionary. Using an explicit interface (rather
 * than `typeof en`) means translated strings are just `string` — only the
 * *keys* are enforced to match across en/ar/franco, so a missing or renamed
 * key in any locale is a real tsc error instead of a silent runtime gap.
 */
export interface HeroSlide {
  badge: string;
  line1: string;
  line2: string;
  sub: string;
}

export interface HowWeWorkStep {
  title: string;
  punch: string;
  description: string;
}

export interface StatItem {
  number: string;
  label: string;
}

export interface VentureCopy {
  tagline: string;
  description: string;
  interpretation: string;
}

export interface Dict {
  nav: {
    ventures: string;
    process: string;
    demos: string;
    contact: string;
    ourStory: string;
    bookCall: string;
    languageLabel: string;
  };
  hero: {
    slides: HeroSlide[];
    ctaBook: string;
    ctaDemos: string;
    statLead: string;
    statProducts: string;
    statLocation: string;
    /** Template with a literal `{n}` placeholder, e.g. "Slide {n}". */
    slideAria: string;
  };
  ventures: {
    eyebrow: string;
    heading1: string;
    heading2: string;
    heading3: string;
    intro: string;
    statusLive: string;
    statusPreview: string;
    statusComingSoon: string;
    ctaLive: string;
    ctaPreview: string;
    whyItMatters: string;
    items: {
      ibni: VentureCopy;
      autoleadss: VentureCopy;
      virlo: VentureCopy;
      tut: VentureCopy;
    };
    ecosystemEyebrow: string;
    ecosystemBody: string;
  };
  footer: {
    explore: string;
    legal: string;
    venturesLink: string;
    demosLink: string;
    ourStory: string;
    contactLink: string;
    privacy: string;
    terms: string;
    /** Template with a literal `{year}` placeholder. */
    copyright: string;
    location: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    body: string;
    whatsapp: string;
    email: string;
    calendlyTitle: string;
    calendlySub: string;
  };
  about: {
    kicker: string;
    headingPre: string;
    headingGradient: string;
    blurb: string;
    downloadCv: string;
  };
  howWeWork: {
    eyebrow: string;
    heading1: string;
    heading2: string;
    steps: HowWeWorkStep[];
    avgTimeLabel: string;
    avgTimeValue: string;
  };
  stats: {
    eyebrow: string;
    heading1: string;
    heading2: string;
    leadsBig: string;
    leadsLabel: string;
    items: StatItem[];
  };
  techExpertise: {
    eyebrow: string;
    body: string;
  };
}

export type Locale = 'en' | 'ar' | 'franco';

import type { Dict } from './types';

/**
 * Franco (Egyptian Arabizi) — casual, native-Cairo-texting register, per
 * FRANCO_EGYPTIAN_ARABIC_GUIDE.md: 2/3/5/7 mandatory for their sounds, silent
 * Qaf defaults to "2", ت/ط collapse to plain T, ث/س/ص collapse to plain S,
 * غ is written "gh", ج is a hard "g", minimal/phonetic spelling (no fixed
 * "correct" spelling), and natural English code-switching for tech/brand
 * terms (Live, Demos, products, shipped, etc.) — exactly how an Egyptian
 * founder would actually text this, not a transliteration of the English copy.
 */
const franco: Dict = {
  nav: {
    ventures: 'El Mashari3',
    process: 'Shoghlana',
    demos: 'Demos',
    contact: 'Kalemna',
    ourStory: "2essetna",
    bookCall: 'Ehgez Strategy Call, 30 di2i2a',
    languageLabel: 'El Lugha',
  },

  hero: {
    slides: [
      {
        badge: 'MB AI Group · AI 2awy lel MENA',
        line1: 'AI 2awy,',
        line2: 'mabniya lel 3alam el 7a2i2i.',
        sub: "Assasha wa7ed kan Human Data Lead fi xAI 2abl keda. E7na benebni AI agents w data systems w products bteghayar shoghl sharikat el MENA — w betla2 mashari3na el shakhsiya bnefs el fikr.",
      },
      {
        badge: 'Group wa7ed · Arba3 Mashari3',
        line1: 'AutoLeadss. Virlo.',
        line2: 'IBNI. TUT.',
        sub: 'AutoLeadss gayeb felous fe3lan delwa2ty. Virlo Studio w IBNI w TUT gayin ba3d keda — virality intelligence, bina2 apps min gheer code, w ta3leem le aktar men 100 melyoon student.',
      },
      {
        badge: 'LLM Alignment · RLHF · Reasoning',
        line1: 'El dabt elly wara',
        line2: 'el frontier models.',
        sub: 'Shoghlna kan shamel LLM alignment w RLHF w Chain-of-Thought reasoning — nafs el techniques elly wara a2wa AI models fel 3alam, dilwa2ty bnetteb2 3ala el product beta3ak.',
      },
    ],
    ctaBook: 'Ehgez Strategy Call, 30 di2i2a',
    ctaDemos: 'Shoof el Demos Live',
    statLead: 'Kan Human Data Lead fi xAI',
    statProducts: '10 products shipped',
    statLocation: 'Cairo · Dubai',
    slideAria: 'Slide ra2am {n}',
  },

  ventures: {
    eyebrow: 'Portfolio bta3 MB AI Group',
    heading1: 'Group wa7ed.',
    heading2: 'Arba3 mashari3.',
    heading3: 'Hadaf wa7ed.',
    intro:
      'Kol sharika fel group betwage2 nafs el moshkela men zawya mo5talfa: hat AI 2awy lel aswa2 el donya nesyaha. Bina2 apps min gheer code, gam3 3omala2 be AI, generative media, w rofo2a zakya.',
    statusLive: 'Live',
    statusPreview: 'Preview',
    statusComingSoon: '2orayeb',
    ctaLive: 'Zoor el product el live',
    ctaPreview: 'Shoof el ro2ya',
    whyItMatters: 'Leh da mohem',
    items: {
      ibni: {
        tagline: 'Bane el Apps bel AI',
        description:
          'IBNI (ya3ni "ebni li" bel 3araby) betakhod fekra basita w te7awelha le app shaghal fe3lan. 2ololha el fikra, w IBNI te-design w te-generate w te-launch — 3ashan ay wa7ed msh 3aref yekteb code ye2dar yesawwe2 software.',
        interpretation:
          'Generation be ma3ayeer RLHF, mowaggah lel software: IBNI btsammem el apps zay ma senior engineer haykon faker — 3ashan el melyoon builder el gay ye2dar yeshaghal be el 3araby wala el ingilizy, mesh Python.',
      },
      autoleadss: {
        tagline: 'Wekala + SaaS le Funnels bel AI',
        description:
          'System hybrid, AI + nas, bydawwar 3ala 3omala2, ye2ayemhom, w yehgezlohom mawa3id le sharikat el MENA — kaman fi SaaS self-serve bete5aly ay business ye3mel funnel bel AI le wa7do fi da2ay2.',
        interpretation:
          'Dalil en el AI el 2awy ye2dar yegeeb felous fe3lan delwa2ty — 3omala2 7a2ee2yeen le clients 7a2ee2yeen, w nafs el mo7arrek metah le ay wa7ed yeshaghalo lewa7do.',
      },
      virlo: {
        tagline: 'Studio Masry le Video w Sowar bel AI',
        description:
          'Studio generation etsamem 3ashan el creators el masreyeen w fel MENA — prompting bel Franco-3araby, presets w characters metsamemeen 3ala el thaqafa, w b-roll, 3ashan el brands w el creators ya5edo content video w sowar 3ala zo2hom min gheer crew intag.',
        interpretation:
          'Btatba2 generative media motawwera, madbota 3ala el thaqafa w el lahga el masreya, 3ashan el creators elly el adawat el 3alameya ma etsamemetsh 3ashanhom.',
      },
      tut: {
        tagline: 'Rafee2 Masry bel AI',
        description:
          'Etsama be esm malek Masr el soghayar, TUT rafee2 shakhsy bel AI le nas el MENA — beykallem Franco-3araby masry tabi3i, byefzkar el context, w byet2ayef ma3 7ayet w sor3et kol wa7ed.',
        interpretation:
          "Rafee2 beykallem fe3lan zay Masr — AI be ma3ayeer alignment, madbot 3ala lahget el mante2a w thaqaftaha, mesh mutargem men 7aga tanya.",
      },
    },
    ecosystemEyebrow: 'Account wa7ed. AI wa7ed. Kol el products.',
    ecosystemBody:
      'Kol product fi MB AI Group beyeshtaghal 3ala nafs el asas: login wa7ed 3ala el ecosystem kolo, data platform moshtareka, w MBAI AI gateway — mazbota 3ala el Franco-3araby el masry — beteshaghal kol model call. Kol venture lessa 3aysh 3ala domain beta3o, mabni le audience beta3o, bas wala wa7ed minhom bebtidy men sefr.',
  },

  footer: {
    explore: 'Estakshef',
    legal: 'Legal',
    venturesLink: 'El Mashari3',
    demosLink: 'Demos',
    ourStory: "2essetna",
    contactLink: 'Kalemna',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: '© {year} MB AI Group. Kol el 7o2oo2 me7fooza.',
    location: 'El 2ahera, Masr w Dubai, El Emarat',
  },

  contact: {
    eyebrow: 'Kalemna',
    heading: 'Yalla netkallem 3an el mashroo3 beta3ak.',
    body: "Ehgez call mobashera men el calendar, aw kalemna men ay wasila taht da. 3adatan bnerod khilal sa3at 2alila.",
    whatsapp: 'WhatsApp',
    email: 'Email',
    calendlyTitle: 'Ehgez Strategy Call, 30 di2i2a',
    calendlySub: 'E5tar el ma3ad elly yerayya7ak — min gheer eltizam.',
  },

  about: {
    kicker: 'Mohanad Barakat',
    headingPre: 'Et3araf 3ala',
    headingGradient: 'El Founder w CEO',
    blurb:
      'Kan Human Data Lead fi xAI — bysawwar ab7as el AI el 3alameya le 7olol 3amaleya lel mante2et el MENA.',
    downloadCv: 'Download el CV',
  },

  howWeWork: {
    eyebrow: 'Ezay Benashtaghal',
    heading1: 'Men el fikra lel etla2 —',
    heading2: 'fi asabee3, mesh shohoor.',
    steps: [
      { title: 'Nektshef', punch: 'Bnehded el nita2 fi call wa7ed.', description: 'El ahdaf, el soo2, sayr el 3amal — kolo mekhattat 2abl ma nekteb sat sat.' },
      { title: 'Nebni', punch: 'El mohandeseen beyeshahno, mesh beye3redo slides.', description: 'El AI agent, el pipeline, aw el product beta3ak — beyetbena ma3ak khatwa khatwa.' },
      { title: 'Netle2', punch: 'Live. Metjarrab. Melkak.', description: 'Etnasher, et wassaf, w etsharah — gahez men awal yom.' },
      { title: 'Nedam', punch: 'Ba2yeen ma3ak.', description: 'Bnehassen, bnwassa3, w bnetawwar — betaamel ma3 kol client zay shareek 3ala tool.' },
    ],
    avgTimeLabel: 'Motawaset el wa2t le awel tasleem:',
    avgTimeValue: '2–4 asabee3',
  },

  stats: {
    eyebrow: 'Nata2eg el 3omala2',
    heading1: 'Nata2eg 7a2ee2ya,',
    heading2: 'faree2een 7a2ee2yeen.',
    leadsBig: '200+',
    leadsLabel: '3omeel etwassal',
    items: [
      { number: '10', label: 'products etshahno bel AI' },
      { number: '3', label: 'aswa2 fel MENA etkhadamet' },
      { number: '200+', label: '3omeel etwassal' },
    ],
  },

  techExpertise: {
    eyebrow: 'El Mo7arrek Wara el Group',
    body: 'Nafs el disciplines elly bt-align el frontier models — RLHF, w signal extraction, w data pipelines be mostawa reasoning — delwa2ty beteshaghal arba3 mashari3 MB AI Group kolohom.',
  },
};

export default franco;

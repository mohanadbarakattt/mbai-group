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
    badge: 'MB AI Group · AI 2awy lel MENA',
    line1: 'AI 2awy,',
    line2: 'mabniya lel 3alam el 7a2i2i.',
    sub: "Assasha wa7ed kan Human Data Lead fi xAI 2abl keda. E7na benebni AI agents w data systems w products bteghayar shoghl sharikat el MENA — w betla2 mashari3na el shakhsiya bnefs el fikr.",
    ctaBook: 'Ehgez Strategy Call, 30 di2i2a',
    ctaDemos: 'Shoof el Demos Live',
    statLead: 'Kan Human Data Lead fi xAI',
    statProducts: '10 products shipped',
    statLocation: 'Cairo · Dubai',
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
    githubLink: 'GitHub',
    claudeLink: 'Claude',
    ourStory: "2essetna",
    contactLink: 'Kalemna',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: '© {year} MB AI Group. Kol el 7o2oo2 me7fooza.',
    location: 'El 2ahera, Masr w Dubai, El Emarat',
  },

  cookieConsent: {
    body: 'Benesta5dem cookies asasya 3ashan el site ye4-8al, w cookies tanya ekhtiarya lel tahlilat. Te2dar tewafe2 aw terfod aw wa2t.',
    analyticsLabel: 'Tahlilat (ekhtiary) — tesa3edna nefham este5dam el site',
    acceptAll: 'Mwafa2a 3ala el kol',
    rejectAll: 'Rafd 8eir el asasy',
    manage: 'Edara',
    saveChoices: 'Hefz el ekhtiar',
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
    explainerTitle: 'Shoof el process men el awel lel akher',
    explainerBody: 'Mashroo3 7a2ee2y beyemshy fi Discover w Build w Launch w Support — fi a2al min 2 di2i2a.',
    explainerVideoLabel: 'Ezay Benashtaghal — jolla 2 di2i2a',
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

  features: {
    eyebrow: 'El7aga Elly Benmeeza Beeha',
    heading1: 'Kol 7aga te2dar tetwa2a3ha men frontier AI lab —',
    heading2: 'bas madbota 3ala tare2et shoghl el MENA fe3lan.',
    items: [
      {
        title: 'Multi-Agent Orchestration',
        description: 'Model wa7ed beyekhattat w yeraga3, w faree2 min agents ar5as beyebno — nafs tare2et el delegation elly beteshaghal kol product benshaheno.',
      },
      {
        title: '3araby Awwalan, Mesh 3araby Mutargam',
        description: 'NLP madbota 3ala el lahga el masreya (Franco-3araby) w el fus7a — mabneya men data 7a2ee2ya mn el mante2a, mesh prompts etargemet automatically.',
      },
      {
        title: 'Men el Fikra lel Etla2, fi Asabee3',
        description: 'Metjarrab, mwassaf, w manshoor — mesh 3ard slides khales. Aghlab el mashari3 beteetle2 fi 2–4 asabee3.',
      },
    ],
  },

  benefits: {
    eyebrow: 'El7aga Elly Hatakodha Fe3lan',
    heading1: 'Nata2eg 7a2ee2ya,',
    heading2: 'mesh mogarad tanfeez.',
    items: [
      {
        eyebrow: 'Sor3a',
        title: 'Men el fikra le product etshahan fi asabee3, mesh shohoor',
        body: 'Aghlab el mashari3 beteetle2 fi 2–4 asabee3 — discovery w build w launch f sprint wa7ed metasel, mesh 3a2d le rob3 sana.',
        videoLabel: 'Men el fikra lel etla2, bel soora',
      },
      {
        eyebrow: 'El Wosool',
        title: 'Kallem el 3omala2 elly beyetkallemo 3araby bel tare2a elly hom fe3lan beyetkallemo beeha',
        body: 'Franco-3araby masry, fus7a, w ingilizy — NLP madbota 3ala el lahga men data 7a2ee2ya mn el mante2a, mesh prompt etargem.',
        videoLabel: '3araby awwalan, min el design',
      },
      {
        eyebrow: 'El Tawasso3',
        title: 'AI gateway wa7ed beyeshaghal kol product 3andak',
        body: 'Kol venture fi MB AI Group beyeshtaghal 3ala nafs el asas: login wa7ed, data platform wa7eda, gateway wa7ed — fa wala 7aga benebneeha betebtidy men sefr.',
        videoLabel: 'Gateway wa7ed, kol el products',
      },
    ],
  },

  comparison: {
    eyebrow: 'Leh MB AI Group',
    heading1: 'Shareek wa7ed lel build w el market —',
    heading2: 'mesh vendor tany fel do0r.',
    sub: 'Nazra sari7a 3ala ezay bnet2aren m3a el alternatives elly sharikat el MENA 3adatan bytewazno beenhom.',
    columnUs: 'MB AI Group',
    columnOffshore: 'Offshore Dev Shop',
    columnAgency: 'Wekala 3adeya',
    rows: [
      { label: 'Betetle2 products beta3etha bel AI, mesh mogarad shoghl 3omala2', us: 'Aywa — 4 mashari3 live', offshore: '3adatan shoghl 3omala2 bas', agency: '3adatan shoghl 3omala2 bas' },
      { label: 'Faree2 3ala ard el wa2e3 fi Cairo w Dubai', us: 'Aywa', offshore: '—', agency: '—' },
      { label: 'AI madbot 3ala el lahga el 3arabeya (Franco-3araby masry + fus7a)', us: 'Aywa', offshore: '—', agency: '—' },
      { label: 'Shareek wa7ed lel build w el nemo el mostamer', us: 'Aywa', offshore: 'Bytfawet 7asab el 3a2d', agency: 'Bytfawet 7asab el 3a2d' },
      { label: 'Code maftoo7 wa2abel lel moraga3a 3ala public repos', us: 'Aywa — GitHub', offshore: '—', agency: '—' },
    ],
    footnote: '— ya3ny bytfawet 7asab el sharika nafsaha; msh hanekhamen 7agat ma na2darsh net2akked menha.',
  },
};

export default franco;

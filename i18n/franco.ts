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
    bookCall: 'Kalemna',
    languageLabel: 'El Lugha',
  },

  hero: {
    badge: 'MB AI Group · AI 2awy lel MENA',
    line1: 'AI 2awy,',
    line2: 'mabniya lel 3alam el 7a2i2i.',
    sub: "Assasha wa7ed kan Human Data Lead fi xAI 2abl keda. E7na benebni AI agents w data systems w products bteghayar shoghl sharikat el MENA — w betla2 mashari3na el shakhsiya bnefs el fikr.",
    ctaBook: 'Kalemna',
    ctaDemos: 'Shoof el Demos Live',
    statLead: 'Kan Human Data Lead fi xAI',
    statProducts: '14 products, demos w projects',
    statLocation: 'Cairo · Dubai',
  },

  ventures: {
    eyebrow: 'Portfolio bta3 MB AI Group',
    heading1: 'Group wa7ed.',
    heading2: '5 mashari3.',
    heading3: 'Hadaf wa7ed.',
    intro:
      'Kol sharika fel group betwage2 moshkela MENA: growth done-for-you lel businesses el ma7alleya, AI travel guide le Masr be masader, AI app builder beyetkalem masry, AI studio masry lel video wel sowar, w affiliate social selling.',
    statusLive: 'Live',
    statusPreview: 'Preview',
    statusComingSoon: '2orayeb',
    statusBuilding: 'Benebni',
    ctaLive: 'Zoor el product el live',
    ctaPreview: 'Shoof el ro2ya',
    whyItMatters: 'Leh da mohem',
    items: {
      ibni: {
        tagline: 'AI App Builder',
        description:
          'IBNI (ya3ni "ebni") bey7awel gomla wa7da le app 7a2i2i b kodo w database bta3o. Ekteb fekretak bel masry aw Franco aw English, w Ibni beye5atat w yekteb el code w yegarabo w yesala7 elly ye2a3 w yenshoro 3ala link bta3ak. Preview free, w el paid plans betzawed backend w database 7a2i2eya be as3ar bel geneh.',
        interpretation:
          'Software lel founders el masreyeen elly mesh beybarmego: e7kiha zay ma betetkalem, wel code bta3ak.',
      },
      autoleadss: {
        tagline: 'Memberships · Websites · Ads · Leads',
        description:
          'AutoLeadss howa dera3 el growth done-for-you fe MB AI Group: membership systems lel businesses el metkarrara fe Masr (storefront, daf3 mo2addam 3ala account el tager, QR passes, redemption, dashboard), design w rebuild lel websites wel online stores, ads management, w lead generation bel AI.',
        interpretation:
          'Partner wa7ed lel storefront wel site wel ads wel leads, wel tager beyemlek el build wel data.',
      },
      virlo: {
        tagline: 'Studio Masry lel Video wel Sowar bel AI',
        description:
          'Virlo Studio awel AI studio beyetkalem masry begad. Ekteb bel 3ameya aw Franco w tala3 reels w memes w posters w e3lanat, be templates w trends masreya, brand kit w characters mat7foza, batch generation, w as3ar wad7a bel geneh ma3 points free kol youm.',
        interpretation:
          'Video w sowar bel AI metzabata 3ala el lahga wel sa2afa el masreya.',
      },
      tut: {
        tagline: 'AI Travel Guide le Masr',
        description:
          'TUT AI travel guide le Masr, live 3ala tutapp.co. Es2al 3an el as3ar wel mowasalat wel amaken: kol egaba betoul el source page w youm el check, aw te2oul en mafish 7ad nasharha. Free w be 12 logha menhom masry w Franco.',
        interpretation:
          'AI beywarrik masadro badal ma ye5amman, w ma3 el signup bta5od boarding pass souvenir be esmak bel hieroglyphs.',
      },
      be3ly: {
        tagline: 'Affiliate & Social-Selling Connector',
        description:
          'Prototype connector masry lel affiliate / social selling. Model B: el tagger beyegma3 InstaPay. Lessa benebni — men gheer URL production wehmy.',
        interpretation:
          'Beyewassel el promoters bel toggar men gheer ma ye5tera3 domain matgar wehmy.',
      },
    },
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
    body: 'Benesta5dem essential cookies 3ashan el site yeshtaghal. Ma beneshaghalsh analytics delwa2ti; law 2ablet analytics ta7t, han7faz el preference law zedna tool ba3dein.',
    analyticsLabel: "Tahlilat (ekhtiary, mesh sha3ala delwa2ti) — preference lel future analytics",
    acceptAll: 'Mwafa2a 3ala el kol',
    rejectAll: 'Rafd 8eir el asasy',
    manage: 'Edara',
    saveChoices: 'Hefz el ekhtiar',
  },

  contact: {
    eyebrow: 'Kalemna',
    heading: 'Yalla netkallem 3an el mashroo3 beta3ak.',
    body: "El booking online mesh shaghal delwa2ty. Kalemna 3ala WhatsApp aw email aw LinkedIn — 3adatan bnerod khilal sa3at 2alila.",
    whatsapp: 'WhatsApp',
    email: 'Email',
    calendlyTitle: 'Strategy call booking',
    calendlySub: 'El calendar mesh available delwa2ty.',
    bookingUnavailable: 'Esta5dem WhatsApp aw email aw LinkedIn taht. Calendly hayerga3 lamma el owner yede link shaghal.',
  },

  about: {
    kicker: 'Mohanad Barakat',
    headingPre: 'Et3araf 3ala',
    headingGradient: 'El Founder w AI Engineer',
    blurb:
      'AI Engineer w Founder | Ex-xAI Human Data Lead (Grok). Beyebni AI products w agents 3arabi awalan lel MENA men el Cairo w Dubai.',
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
      { number: '14', label: 'products, demos w projects' },
      { number: '3', label: 'aswa2 fel MENA etkhadamet' },
      { number: '200+', label: '3omeel etwassal' },
    ],
  },

  techExpertise: {
    eyebrow: 'El Mo7arrek Wara el Group',
    body: 'Nafs el disciplines elly bt-align el frontier models — RLHF, w signal extraction, w data pipelines be mostawa reasoning — delwa2ty beteshaghal mashari3 MB AI Group.',
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
        eyebrow: 'Ownership',
        title: 'Elly bnebneeh bta3ak',
        body: 'El code wel domain wel accounts wel data betetsallem lak fe a5er el project. Mafish lock-in, wel maintenance optional.',
        videoLabel: 'Tasleem kamel, mesh egar',
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
      { label: 'Betetle2 products beta3etha bel AI, mesh mogarad shoghl 3omala2', us: 'Aywa — 5 mashari3 active', offshore: '3adatan shoghl 3omala2 bas', agency: '3adatan shoghl 3omala2 bas' },
      { label: 'Faree2 3ala ard el wa2e3 fi Cairo w Dubai', us: 'Aywa', offshore: '—', agency: '—' },
      { label: 'AI madbot 3ala el lahga el 3arabeya (Franco-3araby masry + fus7a)', us: 'Aywa', offshore: '—', agency: '—' },
      { label: 'Shareek wa7ed lel build w el nemo el mostamer', us: 'Aywa', offshore: 'Bytfawet 7asab el 3a2d', agency: 'Bytfawet 7asab el 3a2d' },
      { label: 'Code maftoo7 wa2abel lel moraga3a 3ala public repos', us: 'Aywa — GitHub', offshore: '—', agency: '—' },
    ],
    footnote: '— ya3ny bytfawet 7asab el sharika nafsaha; msh hanekhamen 7agat ma na2darsh net2akked menha.',
  },
};

export default franco;

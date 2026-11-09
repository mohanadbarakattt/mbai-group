import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import VentureShell from './VentureShell';
import TutDemo from '../../components/demos/TutDemo';

const SHOTS = [
  { src: '/tut/tut-mobile-1.webp', alt: 'TUT home: Ask about Egypt. See where the answer came from.' },
  { src: '/tut/tut-mobile-2.webp', alt: 'TUT answers with the source page and the date it was checked' },
  { src: '/tut/tut-mobile-3.webp', alt: 'TUT Egypt Pass souvenir with a name in hieroglyphs' },
];
const LIVE = [
  'AI chat from a sourced Egypt knowledge file (RAG / hyper-context): every answer names the source page and the day it was checked, or says nobody publishes one.',
  'Free check-in is traveller signup: a shareable Egypt Pass boarding-pass souvenir with your name in hieroglyphs, a Pharaoh Me portrait as Tut or Cleopatra, and a stub number.',
  'Itineraries, a trips & plans library, practical info and verified local prices.',
  'Dark and light themes, twelve languages including Egyptian Arabic and Franco, and PWA install with no app store.',
];
const NEXT = [
  'GEM & attraction tickets (planned, not live).',
  'Hire a licensed tour guide, rent a stay, group trips & shared events.',
  'Museum maps and voice mode in the browser.',
  'Partner bookings go live with pilots, not a fully launched booking marketplace.',
];
const LINKS = [
  ['Egypt Guide', 'https://tutapp.co/guide'],
  ['Pharaoh Me', 'https://tutapp.co/pharaoh'],
  ['Free check-in', 'https://tutapp.co/checkin'],
  ['Partner applications', 'https://www.tutapp.co/partners'],
];

const TutDetails: React.FC = () => (
  <div className="space-y-8 mb-16">
    <nav aria-label="Explore TUT" className="flex flex-wrap gap-3">
      {LINKS.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="glass-btn rounded-xl px-4 py-2.5 text-sm inline-flex items-center gap-2">{label} <ArrowUpRight size={14} /></a>)}
    </nav>
    <div className="grid md:grid-cols-2 gap-6">
      {([["Live today", LIVE], ["On the way", NEXT]] as [string, string[]][]).map(([title, items]) => (
        <section key={title} className="glass-card rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-5">{title}</h2>
          <ul className="space-y-4 text-sm text-[#a7b7b4] leading-relaxed">
            {items.map(text => <li key={text} className="flex gap-3"><span aria-hidden="true" className="w-1 h-1 mt-2 rounded-full bg-[#2a9d8f] shrink-0" />{text}</li>)}
          </ul>
        </section>
      ))}
    </div>
    <section aria-labelledby="tut-recognition" className="glass-card rounded-2xl overflow-hidden">
      <div className="grid md:grid-cols-2 items-center">
        <div className="p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-[.2em] text-[#2a9d8f] mb-3">Recognition · GEF EIP 2026</p>
          <h2 id="tut-recognition" className="text-2xl font-semibold mb-4">Shortlisted to pitch.</h2>
          <p className="text-[#c3cecc] text-sm leading-relaxed">TUT has been shortlisted to pitch at the Global Entrepreneurship Festival (GEF), EIP programme 2026.</p>
          <p className="text-[#a7b7b4] text-sm leading-relaxed mt-4">Selected to pitch at GEF, 6–8 November 2026, JW Marriott New Cairo.</p>
        </div>
        <img src="/tut/gef-eip-shortlist.webp" alt="TUT shortlist artwork: Global Entrepreneurship Festival, EIP programme 2026" width={1200} height={627} loading="lazy" decoding="async" className="w-full" />
      </div>
    </section>
    <section aria-labelledby="tut-traction" className="glass-card rounded-2xl p-6 md:p-8">
      <p className="text-[10px] uppercase tracking-[.2em] text-[#2a9d8f] mb-3">Early traction · early November 2026</p>
      <h2 id="tut-traction" className="text-2xl font-semibold mb-6">A live product. Early partner interest.</h2>
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[['Live', 'Web app at tutapp.co'], ['9', 'Partners interested'], ['5', 'Asked for a pilot'], ['0', 'Signed partners yet']].map(([value, label]) => (
          <div key={label} className="rounded-xl bg-white/[.025] border border-white/10 px-4 py-5"><dd className="text-3xl font-medium mb-2">{value}</dd><dt className="text-xs text-[#a7b7b4]">{label}</dt></div>
        ))}
      </dl>
      <p className="text-sm text-[#c3cecc] leading-relaxed">As of early November 2026: 9 partners interested; 5 asked for a pilot. Interest and pilot requests only; none signed yet.</p>
      <p className="text-xs text-[#92a5a1] mt-3">Source: GEF pitch TUT-Pitch-EIP-GEF-2026-v12, partner email replies logged to 4 Nov 2026.</p>
    </section>
  </div>
);

const TutPage: React.FC = () => (
  <VentureShell
    name="TUT"
    accent="#2a9d8f"
    tagline="AI Travel Guide for Egypt"
    path="/tut"
    status="Live"
    externalUrl="https://tutapp.co"
    externalLabel="Open tutapp.co"
    headline={<>Ask about Egypt.<br /><span className="text-[#2a9d8f]">See where the answer came from.</span></>}
    sub="TUT is a live, sourced AI travel guide for Egypt with free boarding-pass check-in: your name in hieroglyphs and your Pharaoh Me portrait. TUT has been shortlisted to pitch at the Global Entrepreneurship Festival (GEF), EIP programme 2026. Free for travellers, with twelve languages including Egyptian Arabic and Franco."
    details={<TutDetails />}
    pillars={[
      { title: 'Free for travellers', text: 'The public product has no subscriptions or paid passes. Check in free and use the guide, Pharaoh Me, trips and plans.' },
      { title: 'Free listings, vetted partners', text: 'Tour operators, guides, hotels, lodges, dive centres and transport providers can apply. TUT earns a revenue share only when it brings a booking. Partner bookings go live with pilots.' },
      { title: 'A business form for partners', text: 'Partner applications ask for company name, commercial registration number, optional tax ID and tourism licence, contact and services. It is not the traveller boarding pass or Tut-or-Cleopatra signup.' },
    ]}
    previewLabel="The real product, plus an interactive taste"
    previewNote="Product screenshots from tutapp.co. The on-site chat below is a scripted sample; open tutapp.co/guide for the live sourced guide."
  >
    <div className="p-3 md:p-6 space-y-6">
      <img src="/tut/tut-desktop.webp" alt="TUT on desktop" loading="lazy" decoding="async" width={1280} height={800} className="w-full rounded-2xl border border-white/10" />
      <div className="grid grid-cols-3 gap-3 md:gap-6">
        {SHOTS.map(s => <img key={s.src} src={s.src} alt={s.alt} loading="lazy" decoding="async" width={600} height={1298} className="w-full rounded-2xl border border-white/10" />)}
      </div>
      <section aria-label="Try TUT" className="rounded-2xl overflow-hidden border border-white/10">
        <TutDemo />
      </section>
    </div>
  </VentureShell>
);
export default TutPage;

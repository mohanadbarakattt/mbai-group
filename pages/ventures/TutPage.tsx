import React from 'react';
import VentureShell from './VentureShell';

const SHOTS = [
  { src: '/tut/tut-mobile-1.webp', alt: 'TUT home: Ask about Egypt. See where the answer came from.' },
  { src: '/tut/tut-mobile-2.webp', alt: 'TUT answers with the source page and the date it was checked' },
  { src: '/tut/tut-mobile-3.webp', alt: 'TUT boarding-pass souvenir with a name in hieroglyphs' },
];

const TutPage: React.FC = () => (
  <VentureShell
    name="TUT"
    accent="#d4a017"
    tagline="AI Travel Guide for Egypt"
    path="/tut"
    status="Live"
    externalUrl="https://tutapp.co"
    externalLabel="Open tutapp.co"
    headline={<>Ask about Egypt.<br /><span className="text-[#b85c38]">See where the answer came from.</span></>}
    sub="TUT is your boarding pass to Egypt: an AI travel guide live at tutapp.co. It answers from a sourced Egypt knowledge file covering prices, transport, sites and etiquette, and every answer names the source page and the day it was checked, or says nobody publishes one. Free to use."
    pillars={[
      { title: 'Sourced answers, not guesses', text: 'A retrieval-grounded guide on a checked Egypt knowledge file, including verified local prices. If no one publishes an answer, TUT says so.' },
      { title: 'Live today', text: 'AI chat guide, your name in hieroglyphs, Pharaoh Me portraits, a shareable boarding-pass souvenir at sign-up, trips & plans library, dark/light themes, PWA install, and twelve languages including Egyptian Arabic and Franco.' },
      { title: 'Partners in pilot', text: 'Free for travellers; TUT earns a revenue share only when it brings a booking to a vetted partner. Partner listings (tour operators, guides, hotels, lodges, dive centres, transport) are in pilot. On the way: licensed guides, stays, group trips, museum maps, voice mode, and in-app GEM tickets (planned).' },
    ]}
    previewLabel="The real product, from tutapp.co"
    previewNote="Screenshots captured from tutapp.co on 8 Nov 2026."
  >
    <img src="/tut/tut-desktop.webp" alt="TUT on desktop" loading="lazy" decoding="async" className="w-full rounded-2xl border border-white/70 shadow-[0_20px_40px_-24px_rgba(20,17,15,0.45)] mb-6" />
    <div className="grid grid-cols-3 gap-3 md:gap-6">
      {SHOTS.map((s) => (
        <img key={s.src} src={s.src} alt={s.alt} loading="lazy" decoding="async" className="w-full rounded-2xl border border-white/70 shadow-[0_20px_40px_-24px_rgba(20,17,15,0.45)]" />
      ))}
    </div>
  </VentureShell>
);

export default TutPage;

import React from 'react';
import VentureShell from './VentureShell';

const TutPage: React.FC = () => (
  <VentureShell
    name="TUT"
    accent="#eab308"
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
  />
);

export default TutPage;

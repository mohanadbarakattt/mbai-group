import React from 'react';
import VentureShell from './VentureShell';

const TutPage: React.FC = () => (
  <VentureShell
    name="TUT"
    accent="#eab308"
    tagline="Boarding-Pass PWA"
    path="/tut"
    status="Live"
    externalUrl="https://tutapp.co"
    externalLabel="Open tutapp.co"
    headline={<>Your boarding pass,<br /><span className="text-[#b85c38]">on your phone.</span></>}
    sub="TUT is a live boarding-pass progressive web app at tutapp.co — not a coming-soon AI companion. Keep your pass handy, offline-friendly, and ready at the gate."
    pillars={[
      { title: 'Live at tutapp.co', text: 'The product is shipped as a PWA — open tutapp.co on your phone and use it like an installed app.' },
      { title: 'Boarding-pass first', text: 'Built around the pass you actually need at the airport — scannable, fast, and usable without hunting through email threads.' },
      { title: 'Earlier companion concept parked', text: 'Older site copy described an Egyptian AI companion. That direction is not what is live today; the live product is the boarding-pass PWA.' },
    ]}
  />
);

export default TutPage;

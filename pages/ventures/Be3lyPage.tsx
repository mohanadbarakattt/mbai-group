import React from 'react';
import VentureShell from './VentureShell';

const Be3lyPage: React.FC = () => (
  <VentureShell
    name="Be3ly"
    accent="#6b645c"
    tagline="Affiliate & Social-Selling Connector"
    path="/be3ly"
    status="Building"
    headline={<>Affiliate selling for Egypt.<br /><span className="text-[#b85c38]">Merchant keeps the InstaPay.</span></>}
    sub="Be3ly is a prototype Egyptian affiliate / social-selling connector. Model B: the merchant collects payment via InstaPay; Be3ly connects promoters and storefronts without inventing a fake production URL. Still building — no public product domain yet."
    pillars={[
      { title: 'Model B — merchant collects', text: 'The merchant receives InstaPay directly. Be3ly connects affiliates and social sellers to the merchant rather than sitting in the middle of settlement.' },
      { title: 'Social-selling native', text: 'Built for how Egyptian products actually move — WhatsApp, Instagram, and affiliate promoters — not a Western marketplace clone.' },
      { title: 'Prototype, no fake URL', text: 'There is no invented production domain. When a public URL exists, it will be linked here honestly.' },
    ]}
  />
);

export default Be3lyPage;

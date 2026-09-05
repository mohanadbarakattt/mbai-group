import React from 'react';
import VentureShell from './VentureShell';
import VirloDemo from '../../components/demos/VirloDemo';

const VirloPage: React.FC = () => (
  <VentureShell
    name="Virlo"
    accent="#f97316"
    tagline="Egyptian Digital-Product Marketplace"
    path="/virlo"
    status="Building"
    headline={<>Selling digital products in Egypt.<br /><span className="text-[#b85c38]">Built around InstaPay.</span></>}
    sub="Virlo is pivoting (Aug 2026) into an Egypt-first digital-product marketplace — creators and merchants list digital goods, buyers pay via InstaPay. The earlier AI video & image studio concept is parked; there is no public marketplace URL yet while we build."
    pillars={[
      { title: 'InstaPay-native checkout', text: 'Payments shaped for how Egyptians actually pay for digital goods — not a card-only funnel bolted onto a global template.' },
      { title: 'Digital goods, local rails', text: 'Listings, delivery, and settlement designed for Egyptian digital products — courses, assets, tools — not a generic Shopify clone.' },
      { title: 'AI studio parked', text: 'The Franco-Arabic AI video/image studio remains a parked concept preview below. The live product direction is the marketplace.' },
    ]}
    previewLabel="Parked concept — AI studio preview"
    previewNote="The interactive preview below is the parked AI studio concept. The current Virlo product direction is the Egypt digital-product marketplace (InstaPay) — still building, no public storefront URL yet."
  >
    <VirloDemo />
  </VentureShell>
);

export default VirloPage;

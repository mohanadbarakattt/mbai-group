import React from 'react';
import VentureShell from './VentureShell';
import IbniDemo from '../../components/demos/IbniDemo';

const IbniPage: React.FC = () => (
  <VentureShell
    name="IBNI"
    accent="#10b981"
    tagline="Egyptian Storefront Builder"
    path="/ibni"
    status="Live"
    externalUrl="https://ibni.app"
    externalLabel="Open ibni.app"
    headline={<>Your online store,<br /><span className="text-[#b85c38]">ready to take orders.</span></>}
    sub={'IBNI ("build me" in Arabic) is live at ibni.app: Egyptian merchants pick one of 3 ready designs, add products, set shipping per governorate across all 27, and publish a store on their own ibni.app link that takes cash-on-delivery orders, with a dashboard, stock tracking and sales reports.'}
    pillars={[
      { title: 'Built for Egyptian selling', text: '3 ready designs (store, restaurant, services), categories, banners and offers, and a shipping price for each of the 27 governorates.' },
      { title: 'Clear pricing', text: '1,500 EGP per month or 15,000 EGP per year, tax included, every feature from day one. No stored card and no auto-renewal.' },
      { title: 'Honest about limits', text: 'Cash on delivery only for now, no shipping-company integration, no custom domain yet, and no AI store manager. ibni.app lists these openly.' },
    ]}
    previewLabel="On-site concept preview"
    previewNote="The live product is at ibni.app. The on-site preview below is an earlier lightweight concept."
  >
    <IbniDemo />
  </VentureShell>
);

export default IbniPage;

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
    headline={<>متجرك الإلكتروني، جاهز يستقبل طلبات.<br /><span className="text-[#b85c38]">Pick a template. Publish. COD.</span></>}
    sub={'IBNI ("build me" in Arabic) is a live Egyptian storefront builder at ibni.app — choose one of three ready designs (store, restaurant, services), add products, set shipping for all 27 governorates, and take cash-on-delivery orders on your own ibni.app/s/… link. Not an AI app-scaffolder.'}
    pillars={[
      { title: 'COD-first commerce', text: 'Buyers order and pay on delivery — no card or e-wallet required inside the shop. Built for how Egyptian retail actually closes.' },
      { title: '27 governorates, your rates', text: 'Set per-governorate shipping fees, manage inventory and order status from one merchant dashboard, and publish banners without touching code.' },
      { title: 'Three ready designs', text: 'Store, restaurant, or services — same platform, different layouts. Live product (not DEMO_MODE); honest limits are listed on ibni.app.' },
    ]}
    previewLabel="On-site storefront preview"
    previewNote="Lightweight companion to the live product at ibni.app — pick a template, set a governorate shipping fee, and publish a concept shop."
  >
    <IbniDemo />
  </VentureShell>
);

export default IbniPage;

import React from 'react';
import VentureShell from './VentureShell';
import IbniDemo from '../../components/demos/IbniDemo';

const IbniPage: React.FC = () => (
  <VentureShell
    name="IBNI"
    accent="#10b981"
    tagline="Egyptian Storefront Builder"
    path="/ibni"
    status="Preview"
    externalUrl="https://ibni.app"
    externalLabel="Open ibni.app (demo)"
    headline={<>Build an Egyptian storefront.<br /><span className="text-gradient">Describe it — IBNI scaffolds it.</span></>}
    sub={'IBNI ("build me" in Arabic) is an Egyptian storefront builder — turn a plain-language idea into a working shop experience. The live demo runs at ibni.app in DEMO_MODE.'}
    pillars={[
      { title: 'Storefront, not generic apps', text: 'Oriented around Egyptian merchants: product pages, checkout flows, and local selling context — not an abstract app-builder pitch.' },
      { title: 'Demo live at ibni.app', text: 'Try the DEMO_MODE experience on ibni.app. It is a real preview of the product direction, not a finished production rollout.' },
      { title: 'Arabic & English', text: 'Prompts and interfaces work in Arabic or English — built for MENA founders first.' },
    ]}
    previewLabel="On-site concept preview"
    previewNote="Prefer the live demo at ibni.app (DEMO_MODE). The on-site preview below is a lightweight companion concept."
  >
    <IbniDemo />
  </VentureShell>
);

export default IbniPage;

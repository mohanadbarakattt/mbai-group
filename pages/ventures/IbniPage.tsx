import React from 'react';
import VentureShell from './VentureShell';
import IbniDemo from '../../components/demos/IbniDemo';

const IbniPage: React.FC = () => (
  <VentureShell
    name="IBNI"
    accent="#2a9d8f"
    tagline="The AI App Builder"
    path="/ibni"
    status="Preview"
    externalUrl="https://ibni-v2.vercel.app"
    externalLabel="Try Ibni"
    headline={<>Write your idea.<br /><span className="text-[#2a9d8f]">Ibni builds it.</span></>}
    sub={'IBNI ("build me" in Arabic) turns one sentence into a real app with its own code and database. Write it in Masri, Franco or English, the way you would tell a friend, and Ibni plans it, writes the code, tests it, fixes what breaks and publishes it on your own link.'}
    pillars={[
      { title: 'Talk the way you talk', text: 'Ibni understands "3ayez app lel mat3am bta3i" as easily as English. No translation step, no code required.' },
      { title: 'A real product, not a mockup', text: 'Not a template or a picture of an app: a working backend, database, API, user accounts and Egyptian payment rails on paid plans.' },
      { title: 'Your code, EGP pricing', text: 'You can see, edit and export the code. Free instant preview with monthly credits; paid plans priced in EGP with Fawry, Vodafone Cash and InstaPay.' },
    ]}
    previewLabel="Try the on-site concept preview"
    previewNote="The full product runs at ibni-v2.vercel.app. The preview below is a lightweight on-site concept."
  >
    <img src="/media/ibni-codegen.webp" alt="Ibni AI app builder home page" loading="lazy" decoding="async" className="w-full rounded-2xl border border-white/10 shadow-[0_20px_40px_-24px_rgba(20,17,15,0.45)] mb-8" />
    <IbniDemo />
  </VentureShell>
);

export default IbniPage;

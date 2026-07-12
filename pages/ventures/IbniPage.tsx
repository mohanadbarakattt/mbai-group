import React from 'react';
import VentureShell from './VentureShell';
import IbniDemo from '../../components/demos/IbniDemo';

const IbniPage: React.FC = () => (
  <VentureShell
    name="IBNI"
    accent="#10b981"
    tagline="The AI App Builder"
    path="/ibni"
    status="Preview"
    headline={<>Describe it.<br /><span className="text-gradient">IBNI builds it.</span></>}
    sub={'IBNI — "build me" in Arabic — turns a plain-language idea into a working application. No code, no dev team, no six-month timeline. Type what you want in Arabic or English and watch the software assemble itself.'}
    pillars={[
      { title: 'Idea to app', text: 'A single sentence becomes a data model, an interface, and working logic — architected the way a senior engineer would.' },
      { title: 'Bilingual by design', text: 'Prompts, interfaces, and generated apps work natively in Arabic and English — built for MENA founders first.' },
      { title: 'Own what you build', text: 'Generated apps are real, exportable software — not a walled garden. Deploy anywhere, extend with real code later.' },
    ]}
  >
    <IbniDemo />
  </VentureShell>
);

export default IbniPage;

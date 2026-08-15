import React from 'react';
import VentureShell from './VentureShell';
import TutDemo from '../../components/demos/TutDemo';

const TutPage: React.FC = () => (
  <VentureShell
    name="TUT"
    accent="#eab308"
    tagline="Egyptian AI Companion & Guide"
    path="/tut"
    status="Coming soon"
    headline={<>An AI friend<br /><span className="text-gradient">that actually speaks Egyptian.</span></>}
    sub="Named after Egypt's boy king, TUT is a personal AI companion that chats natively in Egyptian Arabic, Franco, and English — and knows Egypt cold: places and fair prices, museums and monuments, hieroglyphics, and the slang people actually use."
    pillars={[
      { title: 'Speaks Masri, not translated', text: 'Egyptian Arabic, Franco-Arabic, or English — TUT talks the way people actually talk, instead of reading like a translated chatbot.' },
      { title: 'Knows Egypt cold', text: 'Places worth going and what they should fairly cost, museums and monuments, hieroglyphics, and the slang and trends of right now.' },
      { title: 'Alignment-grade safety', text: 'Built by a former xAI Human Data Lead — same safety and accuracy discipline used on frontier models, and strictly politically neutral.' },
    ]}
  >
    <TutDemo />
  </VentureShell>
);

export default TutPage;

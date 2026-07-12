import React from 'react';
import VentureShell from './VentureShell';
import TutDemo from '../../components/demos/TutDemo';

const TutPage: React.FC = () => (
  <VentureShell
    name="TUT"
    accent="#eab308"
    tagline="AI Learning Companion"
    path="/tut"
    status="Coming soon"
    headline={<>Every student deserves<br /><span className="text-gradient">a brilliant tutor.</span></>}
    sub="Named after Egypt's boy king, TUT is a personal AI tutor for MENA's 100M+ students — explaining any concept in Arabic or English, adapting to each learner's pace, and turning static curricula into living conversations."
    pillars={[
      { title: 'Truly bilingual', text: "Fus'ha, Egyptian, Gulf dialects, or English — TUT teaches in the language the student actually thinks in." },
      { title: 'Socratic, not lecturing', text: 'TUT asks before it answers, checks understanding at every step, and adapts difficulty in real time.' },
      { title: 'Alignment-grade safety', text: 'Built by a former xAI Human Data Lead — with the same safety and accuracy discipline used on frontier models.' },
    ]}
  >
    <TutDemo />
  </VentureShell>
);

export default TutPage;

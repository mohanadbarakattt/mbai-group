import React from 'react';
import VentureShell from './VentureShell';
import VirloDemo from '../../components/demos/VirloDemo';

const VirloPage: React.FC = () => (
  <VentureShell
    name="Virlo"
    accent="#f97316"
    tagline="Virality Intelligence"
    headline={<>Know what goes viral.<br /><span className="text-gradient">Before it does.</span></>}
    sub="Virlo scans millions of short-form posts in real time, detects trends while they're still climbing, and tells creators and brands exactly what to post, when, and why — with a virality score for every emerging format."
    pillars={[
      { title: 'Trend radar', text: 'Real-time ingestion across TikTok, Reels, and Shorts detects format-level trends 48–72 hours before they peak.' },
      { title: 'Virality scoring', text: 'Every trend gets a 0–100 score built from velocity, saturation, saves-to-likes ratio, and audience overlap.' },
      { title: 'Action briefs', text: 'Not just data — Virlo generates a concrete post brief: hook, format, sound, and the exact posting window.' },
    ]}
  >
    <VirloDemo />
  </VentureShell>
);

export default VirloPage;

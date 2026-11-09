import React from 'react';
import VentureShell from './VentureShell';
import VirloDemo from '../../components/demos/VirloDemo';

const VirloPage: React.FC = () => (
  <VentureShell
    name="Virlo Studio"
    accent="#2a9d8f"
    tagline="Egyptian-First AI Video & Image Studio"
    path="/virlo"
    status="Preview"
    externalUrl="https://virlo-studio.vercel.app"
    externalLabel="Open Virlo Studio"
    headline={<>Prompt it in Masri.<br /><span className="text-[#2a9d8f]">Get content that looks Egyptian.</span></>}
    sub="Virlo Studio is the AI studio that actually speaks Egyptian. Write in Masri or Franco and get reels, memes, posters and ads, built around Egyptian templates and trends, with clear EGP pricing."
    pillars={[
      { title: 'Masri and Franco from day one', text: 'Built around Egyptian dialect and Franco-Arabic, not a translation layer added later. Describe the shot the way you actually talk.' },
      { title: 'A month of content in one sitting', text: 'Batch-generate a set of ideas at once, keep your brand kit and saved characters in every piece, and ride Egyptian trends while they are hot.' },
      { title: 'Clear points, EGP pricing', text: 'Every action shows its point cost up front, failed jobs refund automatically, and there is a free daily allowance before paid plans.' },
    ]}
  >
    <img src="/media/virlo-studio.webp" alt="Virlo Studio home page" loading="lazy" decoding="async" className="w-full rounded-2xl border border-white/10 shadow-[0_20px_40px_-24px_rgba(20,17,15,0.45)] mb-8" />
    <VirloDemo />
  </VentureShell>
);

export default VirloPage;

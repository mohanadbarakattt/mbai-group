import React from 'react';
import VentureShell from './VentureShell';
import VirloDemo from '../../components/demos/VirloDemo';

const VirloPage: React.FC = () => (
  <VentureShell
    name="Virlo Studio"
    accent="#f97316"
    tagline="Egyptian-First AI Video & Image Studio"
    path="/virlo"
    status="Coming soon"
    headline={<>Prompt it in Franco.<br /><span className="text-gradient">Get content that looks Egyptian.</span></>}
    sub="Virlo Studio is a generation studio built for Egyptian and MENA creators — Franco-Arabic prompting, culturally-tuned presets, reusable characters, and b-roll, so brands and creators get on-brand video and image content without a production crew."
    pillars={[
      { title: 'Franco-Arabic prompting', text: 'Describe the shot the way you actually talk — Masri, Franco, or English — instead of translating your idea into someone else\'s English first.' },
      { title: 'Culturally-tuned presets', text: 'Presets, characters, and b-roll tuned for Egyptian and MENA context, so the output looks like the region instead of a generic stock render.' },
      { title: 'Video and image, one studio', text: 'Generate stills and cinematic video side by side, with reusable characters that stay consistent across a whole campaign.' },
    ]}
  >
    <VirloDemo />
  </VentureShell>
);

export default VirloPage;

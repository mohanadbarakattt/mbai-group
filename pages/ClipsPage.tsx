import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Github, Mail, Scissors } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import ClipCard from '../components/ClipCard';
import { CLIPS, AUTOCLIPPER_REPO } from '../components/data/clips';

/**
 * Public clip portfolio. This URL (and /clips.json) is what gets sent to
 * streamers as proof of work, so keep it self-explanatory for a cold visitor.
 * Each clip has an anchor: /clips#clip-3 links straight to one clip.
 */
const ClipsPage: React.FC = () => {
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AutoClipper clip portfolio',
    itemListElement: CLIPS.map((c, i) => ({
      '@type': 'VideoObject',
      position: i + 1,
      name: c.title,
      description: c.caption,
      thumbnailUrl: `https://mbai-group.com${c.poster}`,
      contentUrl: `https://mbai-group.com${c.video}`,
      duration: `PT${c.durationSec}S`,
      uploadDate: '2026-11-21',
    })),
  };

  return (
    <div className="min-h-screen bg-transparent text-[#f1f5f4] overflow-x-hidden">
      <Seo
        title="Stream Clips by AutoClipper · MB AI Group"
        description="Vertical Shorts, Reels and TikToks cut automatically from livestreams by AutoClipper: chat-spike detection, action-following crop, captions and hooks."
        path="/clips"
        jsonLd={jsonLd}
      />
      <Navigation />
      <main className="pt-36 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/#autoclipper" className="inline-flex items-center gap-2 text-sm text-[#a7b7b4] hover:text-[#f1f5f4] no-underline mb-8">
            <ArrowLeft size={16} /> Back to MB AI Group
          </Link>

          <p className="text-[#2a9d8f] text-xs font-semibold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
            <Scissors size={14} /> Clip portfolio
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold mb-4 leading-tight">
            Your stream, cut into <span className="text-[#2a9d8f]">clips people finish.</span>
          </h1>
          <p className="text-[#a7b7b4] max-w-2xl mb-8">
            Every clip below was found, cut, cropped to 9:16, captioned and given a hook by AutoClipper, with no
            manual editing. Streamers: want this running on your channel? Get in touch.
          </p>
          <div className="flex flex-wrap gap-3 mb-14">
            <a href="mailto:mohanad.barakat@mbai-group.com?subject=Clips%20for%20my%20stream" className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm no-underline">
              <Mail size={16} /> Get clips for your stream
            </a>
            <a href={AUTOCLIPPER_REPO} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm border border-[#263437] text-[#f1f5f4] hover:border-[#2a9d8f] no-underline transition-colors">
              <Github size={16} /> How it works (GitHub)
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIPS.map((c) => <ClipCard key={c.id} clip={c} showCaption />)}
          </div>

          <p className="text-xs text-[#a7b7b4]/80 mt-10 max-w-2xl">
            Footage belongs to the streamers shown and is used here only to demonstrate the clipping tool.
            Streamers can ask for any clip to be removed at mohanad.barakat@mbai-group.com.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClipsPage;

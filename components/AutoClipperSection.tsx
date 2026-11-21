import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { Github, Scissors, ArrowRight, Radar, Brain, Clapperboard, CalendarClock, TrendingUp, Wallet } from 'lucide-react';
import ClipCard from './ClipCard';
import { CLIPS, AUTOCLIPPER_REPO } from './data/clips';

// Feature list paraphrased from the AutoClipper README.
const FEATURES = [
  { icon: Radar, title: 'Finds the moments', text: "Chat spikes, YouTube's Most Replayed peaks, viewer-clip clusters and audio peaks. No AI spent on dead air." },
  { icon: Brain, title: 'Two free AI judges', text: 'Gemini watches each candidate clip; Claude gives the final word on what is worth posting.' },
  { icon: Clapperboard, title: 'Edits like a human', text: '9:16 crop that follows the action, webcam stacked on top, punchline zoom, word-by-word captions and a hook banner.' },
  { icon: CalendarClock, title: 'Posting schedule', text: 'Three peak-time slots a day, with every clip and caption file copied to Google Drive.' },
  { icon: TrendingUp, title: 'Learns from views', text: 'Paste the link after posting; it tracks views and scores future clips like your best ones.' },
  { icon: Wallet, title: '$0 a month', text: 'Self-hosted on Twitch, Kick and YouTube, on free AI tiers. Open source, with a ready-made GTA 6 preset.' },
];

const AutoClipperSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fade = `transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;

  return (
    <section id="autoclipper" ref={ref} className="py-24 px-6 bg-transparent border-t border-[#263437] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className={`mb-12 ${fade}`}>
          <p className="text-[#2a9d8f] text-xs font-semibold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
            <Scissors size={14} /> AutoClipper · open source
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4 leading-tight">
            Livestreams in, <span className="text-[#2a9d8f]">viral vertical clips out.</span>
          </h2>
          <p className="text-[#a7b7b4] max-w-2xl">
            A self-hosted stream clipper that watches Twitch, Kick and YouTube, finds the moments chat went crazy for,
            and turns them into ready-to-post Shorts, Reels and TikToks, with captions, hook and schedule.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href={AUTOCLIPPER_REPO} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm no-underline">
              <Github size={16} /> View on GitHub
            </a>
            <Link href="/clips" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm border border-[#263437] text-[#f1f5f4] hover:border-[#2a9d8f] no-underline transition-colors">
              Watch all clips <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`glass-card rounded-2xl p-5 ${fade}`} style={{ transitionDelay: `${i * 60}ms` }}>
              <f.icon size={20} className="text-[#2a9d8f] mb-3" />
              <h3 className="font-semibold text-[#f1f5f4] mb-1">{f.title}</h3>
              <p className="text-sm text-[#a7b7b4] leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>

        <div className={`flex items-end justify-between gap-4 mb-6 ${fade}`}>
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Clips it made, untouched</h3>
            <p className="text-sm text-[#a7b7b4] mt-1">Rendered end-to-end by AutoClipper from public streams.</p>
          </div>
          <Link href="/clips" className="hidden sm:inline-flex items-center gap-1 text-sm text-[#2a9d8f] no-underline hover:underline shrink-0">
            All {CLIPS.length} clips <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CLIPS.slice(0, 4).map((c) => <ClipCard key={c.id} clip={c} />)}
        </div>
        <Link href="/clips" className="sm:hidden mt-6 inline-flex items-center gap-1 text-sm text-[#2a9d8f] no-underline">
          All {CLIPS.length} clips <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default AutoClipperSection;

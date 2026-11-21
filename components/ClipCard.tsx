import React, { useRef, useState } from 'react';
import { Play, Flame } from 'lucide-react';
import type { Clip } from './data/clips';

/**
 * One vertical clip. The video only loads when the visitor presses play
 * (preload="none" + poster), so a grid of clips costs a few small JPEGs.
 */
const ClipCard: React.FC<{ clip: Clip; showCaption?: boolean }> = ({ clip, showCaption = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    // Wait a tick so the controls attribute is applied before playing.
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  };

  return (
    <article id={clip.id} className="glass-card rounded-2xl overflow-hidden flex flex-col scroll-mt-28">
      <div className="relative aspect-[9/16] bg-[#080d0f]">
        <video
          ref={videoRef}
          src={clip.video}
          poster={clip.poster}
          preload="none"
          playsInline
          controls={started}
          className="absolute inset-0 w-full h-full object-cover"
          aria-label={clip.title}
        />
        {!started && (
          <button
            type="button"
            onClick={start}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/35 transition-colors group"
            aria-label={`Play: ${clip.title}`}
          >
            <span className="w-16 h-16 rounded-full bg-[#2a9d8f] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play size={28} className="text-white ml-1" fill="currentColor" />
            </span>
          </button>
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold bg-black/60 text-white backdrop-blur pointer-events-none">
          <Flame size={12} className="text-[#f4a261]" /> {clip.score.toFixed(1)}
        </span>
        <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-white backdrop-blur pointer-events-none">
          0:{String(clip.durationSec).padStart(2, '0')}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#2a9d8f] font-semibold">
          {clip.streamer} · {clip.game}
        </p>
        <h3 className="text-sm font-semibold leading-snug text-[#f1f5f4]">{clip.title}</h3>
        {showCaption && (
          <>
            <p className="text-xs text-[#a7b7b4] leading-relaxed">{clip.caption}</p>
            <p className="text-[11px] text-[#a7b7b4]/80">{clip.tags.join(' ')}</p>
          </>
        )}
      </div>
    </article>
  );
};

export default ClipCard;

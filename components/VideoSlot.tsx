import React, { useEffect, useRef } from 'react';
import { PlayCircle } from 'lucide-react';

interface VideoSlotProps {
  /** Path to a real video file, e.g. `/media/benefit-ship.mp4`. Omit until the
   * asset exists — see public/media/MANIFEST.md for the explainer briefs. */
  src?: string;
  poster?: string;
  /** Caption shown on the placeholder, and the video's aria-label once live. */
  label: string;
  accent?: string;
  className?: string;
}

/**
 * Explainer-video placement used across the Benefits and How We Work
 * sections. Renders a labeled placeholder until `src` is set, then plays the
 * real clip — so dropping a finished asset into public/media/ is the only
 * change needed to go live, no layout work.
 */
const VideoSlot: React.FC<VideoSlotProps> = ({ src, poster, label, accent = '#22d3ee', className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!src) return;
    const v = videoRef.current;
    if (!v) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => { if (mq.matches) v.pause(); else v.play().catch(() => {}); };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [src]);

  return (
    <div className={`relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 ${className}`}>
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={label}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: `radial-gradient(circle at 50% 42%, ${accent}22, #0a0e17 72%)` }}>
          <div className="absolute inset-0 grid-fade opacity-50" />
          <PlayCircle size={38} style={{ color: accent }} className="relative opacity-40" aria-hidden="true" />
          <p className="relative text-[11px] uppercase tracking-[0.15em] text-white/40 px-6 text-center">{label}</p>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1022]/55 to-transparent pointer-events-none" />
    </div>
  );
};

export default VideoSlot;

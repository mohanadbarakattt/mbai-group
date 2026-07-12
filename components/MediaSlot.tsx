import React from 'react';

interface MediaSlotProps {
  /** Brand accent color for the icon-fallback treatment. */
  accent: string;
  /** Fallback glyph shown when there's no video or image yet. */
  icon: React.ReactNode;
  /** Alt text / video aria-label. */
  label: string;
  /** Static image — used as the poster behind `video`, or shown alone if no video. */
  thumbnail?: string;
  /** Optional video source. When present, video plays muted/looped and takes over from the thumbnail. */
  video?: string;
  /** Shows a mock browser-chrome bar with this domain across the top when set. */
  domain?: string;
  className?: string;
}

/**
 * Shared hero/showcase media frame: video-first with a static-image fallback,
 * and an icon-on-gradient placeholder when neither exists yet. Used by
 * Ventures and Demos cards so a future video asset only needs a `video` prop
 * — no layout changes required.
 */
const MediaSlot: React.FC<MediaSlotProps> = ({ accent, icon, label, thumbnail, video, domain, className = '' }) => (
  <div className={`w-full aspect-video rounded-lg relative overflow-hidden border border-white/10 ${className}`}>
    {domain && (
      <div className="absolute inset-x-0 top-0 h-6 flex items-center gap-1.5 px-2.5 z-10" style={{ background: 'rgba(10,14,23,0.85)' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        <span className="ml-2 text-[9px] font-mono text-white/30 truncate">{domain}</span>
      </div>
    )}

    {video ? (
      <video
        src={video}
        poster={thumbnail}
        aria-label={label}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
      />
    ) : thumbnail ? (
      <img
        src={thumbnail}
        alt={label}
        className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
      />
    ) : (
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 45%, ${accent}22, #0a0e17 70%)` }}>
        <div className="absolute inset-0 grid-fade opacity-60" />
        <div className={`absolute inset-0 flex items-center justify-center ${domain ? 'pt-3' : ''}`} style={{ color: accent }}>
          <div className="scale-[2.2] opacity-30 group-hover:opacity-45 group-hover:scale-[2.4] transition-all duration-500">{icon}</div>
        </div>
      </div>
    )}

    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1022]/70 to-transparent pointer-events-none" />
  </div>
);

export default MediaSlot;

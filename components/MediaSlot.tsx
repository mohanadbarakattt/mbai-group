import React from 'react';

interface MediaSlotProps {
  accent: string;
  icon: React.ReactNode;
  label: string;
  alt?: string;
  thumbnail?: string;
  video?: string;
  domain?: string;
  className?: string;
}

const MediaSlot: React.FC<MediaSlotProps> = ({ accent, icon, label, alt, thumbnail, video, domain, className = '' }) => (
  <div className={`w-full aspect-video rounded-lg relative overflow-hidden border border-[#e6dfd2] bg-[#f0ebe1] ${className}`}>
    {domain && (
      <div className="absolute inset-x-0 top-0 h-6 flex items-center gap-1.5 px-2.5 z-10 bg-[#fffdf8]/95 border-b border-[#e6dfd2]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d9d0c0]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#d9d0c0]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#d9d0c0]" />
        <span className="ml-2 text-[9px] font-mono text-[#8a8278] truncate">{domain}</span>
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
        className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
      />
    ) : thumbnail ? (
      <img
        src={thumbnail}
        alt={alt ?? label}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
      />
    ) : (
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 45%, ${accent}18, #f0ebe1 70%)` }}>
        <div className={`absolute inset-0 flex items-center justify-center ${domain ? 'pt-3' : ''}`} style={{ color: accent }}>
          <div className="scale-[2.0] opacity-25">{icon}</div>
        </div>
      </div>
    )}

    <div className="absolute inset-0 bg-gradient-to-t from-[#14110f]/25 to-transparent pointer-events-none" />
  </div>
);

export default MediaSlot;

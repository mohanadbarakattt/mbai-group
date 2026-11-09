import React from 'react';

interface LogoProps { size?: number; dark?: boolean; withWordmark?: boolean; }

/** Logo 2: a continuous M/B silhouette. The upper M diagonal flows into the
 * B's crown; the B's vertical is the shared right stem. No badge/container.
 * Master coordinates are mirrored in public/brand/mbai-mark.svg. */
export const MB_MARK_PATH = 'M8 8 L56 56 L99 16 H120 C139 16 151 29 151 46 C151 56 147 63 139 69 C150 75 156 84 156 96 C156 114 142 126 123 126 H86 V62 H119 C128 62 135 55 135 46 C135 38 128 32 119 32 H105 L56 80 L24 48 V126 H8 Z M102 78 V110 H123 C132 110 139 104 139 95 C139 86 132 78 123 78 Z';
export const MBMark: React.FC<{ size: number; ink?: string }> = ({ size, ink = '#f1f5f4' }) => (
  <svg width={size * 1.2} height={size} viewBox="0 0 164 134" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MB AI Group">
    <path d={MB_MARK_PATH} fill={ink} fillRule="evenodd" />
  </svg>
);
const Logo: React.FC<LogoProps> = ({ size = 36, withWordmark = false }) => (
  <span className="inline-flex items-center gap-3 select-none text-[#f1f5f4]">
    <MBMark size={size} />
    {withWordmark && <span className="flex flex-col leading-none">
      <span style={{ fontSize: Math.max(15, size * .46), fontWeight: 550, letterSpacing: '-.035em' }}>MB AI Group</span>
      <span className="uppercase" style={{ fontSize: 7, letterSpacing: '.22em', marginTop: 6, color: '#849a95' }}>Cairo · Dubai</span>
    </span>}
  </span>
);
export default Logo;

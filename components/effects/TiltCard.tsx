import React, { useRef, useState } from 'react';

/**
 * 3D perspective tilt wrapper — cards subtly rotate toward the cursor
 * with a moving light sheen, giving the grid a physical, futuristic feel.
 */
const TiltCard: React.FC<{ children: React.ReactNode; className?: string; max?: number }> = ({
  children,
  className = '',
  max = 7,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [sheen, setSheen] = useState<React.CSSProperties>({ opacity: 0 });
  const rafRef = useRef(0);

  // rAF-throttled: native mousemove can fire far faster than the display
  // refreshes, so without this every pixel of movement forces a React
  // re-render and a new transform, more work than the compositor needs.
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * max;
      const ry = (px - 0.5) * max;
      setStyle({
        transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`,
        transition: 'transform 0.08s ease-out',
      });
      setSheen({
        opacity: 1,
        background: `radial-gradient(420px circle at ${px * 100}% ${py * 100}%, rgba(99,102,241,0.10), transparent 55%)`,
      });
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(rafRef.current);
    setStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg)', transition: 'transform 0.45s ease' });
    setSheen({ opacity: 0, transition: 'opacity 0.45s ease' });
  };

  return (
    <div
      ref={ref}
      className={`relative will-change-transform ${className}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-10" style={sheen} />
    </div>
  );
};

export default TiltCard;

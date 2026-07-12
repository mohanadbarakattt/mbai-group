import React, { useEffect, useRef } from 'react';

/**
 * A smooth, flowing field of luminous particles — an undulating "silk" of light
 * rendered with additive blending on a 2D canvas. No hard edges: soft glowing
 * sprites drift on layered sine waves in 3D, tinted across a colour palette.
 * Reacts gently to the pointer. Designed to sit behind the hero copy.
 */
const AuroraFlow: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let W = 0, H = 0, cx = 0, cy = 0, scale = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    // Soft glowing sprites, one per palette colour
    const palette = ['#e3a83f', '#38bdf8', '#22d3ee', '#f4cd7c', '#d9784f'];
    const sprites: HTMLCanvasElement[] = palette.map((col) => {
      const s = document.createElement('canvas');
      s.width = s.height = 64;
      const sc = s.getContext('2d')!;
      const g = sc.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, col);
      g.addColorStop(0.35, col + 'aa');
      g.addColorStop(1, col + '00');
      sc.fillStyle = g;
      sc.beginPath(); sc.arc(32, 32, 32, 0, Math.PI * 2); sc.fill();
      return s;
    });

    // Grid of particles across a plane u,v ∈ [-1,1]
    const COLS = 52, ROWS = 30;
    type P = { u: number; v: number };
    const pts: P[] = [];
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        pts.push({ u: (j / (COLS - 1)) * 2 - 1, v: (i / (ROWS - 1)) * 2 - 1 });
      }
    }

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      W = parent.clientWidth; H = parent.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2; cy = H / 2;
      scale = Math.min(W, H) * 0.62;
    };

    // rAF-throttled so rapid native 'resize' events (mobile address-bar
    // show/hide during scroll, pinch-zoom) only recompute layout once per frame.
    let resizeScheduled = false;
    const scheduleResize = () => {
      if (resizeScheduled) return;
      resizeScheduled = true;
      requestAnimationFrame(() => { resizeScheduled = false; resize(); });
    };

    // Freeze the (expensive, ~1500-sprite) redraw while actively scrolling or
    // off-screen, so it never competes with the browser's scroll compositing.
    let isScrolling = false;
    let scrollIdleTimer = 0;
    const onScroll = () => {
      isScrolling = true;
      window.clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(() => { isScrolling = false; }, 150);
    };
    let isVisible = true;
    const io = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { threshold: 0 });
    if (canvas.parentElement) io.observe(canvas.parentElement);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5);
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5);
    };

    let t = 0;
    const step = () => {
      if (isScrolling || !isVisible) {
        raf = requestAnimationFrame(step);
        return;
      }
      t += 0.006;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      const tiltX = 0.62 + pointer.y * 0.35;   // recline the sheet
      const rotY = t * 0.06 + pointer.x * 0.5; // slow drift
      const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const aspectX = W >= H ? 1.7 : 1.1;

      for (const p of pts) {
        // layered smooth waves → height
        const wave =
          Math.sin(p.u * 2.6 + t) * 0.5 +
          Math.sin(p.v * 2.2 - t * 0.8) * 0.4 +
          Math.sin((p.u + p.v) * 1.9 + t * 1.3) * 0.35 +
          Math.sin((p.u - p.v) * 3.1 - t * 0.6) * 0.25;
        const h = wave * 0.22;                 // vertical displacement
        const nh = (wave + 1.55) / 3.1;        // normalised 0..1

        // position on plane
        let x = p.u * aspectX;
        let y = h;
        let z = p.v;
        // rotate around Y
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;
        // tilt around X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const persp = 2.6 / (2.6 + z2 + 1.2);

        const sx = cx + x1 * scale * persp;
        const sy = cy + y2 * scale * persp - scale * 0.02;

        // fade particles near dead-centre so hero copy stays readable
        const distC = Math.hypot((sx - cx) / (W * 0.5), (sy - cy) / (H * 0.5));
        const centreFade = Math.min(1, Math.max(0.12, distC * 1.15));

        const idx = Math.min(sprites.length - 1, Math.floor(nh * sprites.length));
        const size = (10 + nh * 30) * persp;
        const alpha = (0.10 + nh * 0.5) * persp * centreFade;

        ctx.globalAlpha = Math.max(0, Math.min(0.85, alpha));
        ctx.drawImage(sprites[idx], sx - size / 2, sy - size / 2, size, size);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(step);
    };

    resize();
    step();
    window.addEventListener('resize', scheduleResize);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(scrollIdleTimer);
      io.disconnect();
      window.removeEventListener('resize', scheduleResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default AuroraFlow;

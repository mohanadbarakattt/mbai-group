import React, { useEffect, useRef } from 'react';

/**
 * Mouse-reactive neural-network particle field rendered on canvas.
 * Warm-ink palette so it sits quietly behind the cream hero.
 */
const NeuralBackground: React.FC<{ density?: number }> = ({ density = 70 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: P[] = [];

    // Mobile browsers fire `resize` mid-scroll as the address bar collapses —
    // height changes, width doesn't. Re-seeding particles from scratch on
    // every such event is what causes the visible "jump" while scrolling, so
    // we rescale existing positions instead of discarding them, and only
    // reseed on a real (width) change or first mount.
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const prevW = w;
      const prevH = h;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(density, Math.floor((w * h) / 16000));

      const widthChanged = prevW > 0 && Math.abs(w - prevW) > 1;
      if (particles.length > 0 && !widthChanged) {
        // Same effective width (e.g. mobile toolbar show/hide) — keep every
        // particle's position/velocity, just clamp into the new bounds.
        particles.forEach((p) => {
          p.x = Math.min(p.x, w);
          p.y = Math.min(p.y, h);
        });
        while (particles.length < count) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.6 + 0.8,
          });
        }
        if (particles.length > count) particles.length = count;
        return;
      }

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
      }));
    };

    // rAF-throttled resize so rapid-fire resize events (pinch-zoom, dragging
    // a window edge) don't run the layout math more than once per frame.
    let resizeScheduled = false;
    const scheduleResize = () => {
      if (resizeScheduled) return;
      resizeScheduled = true;
      requestAnimationFrame(() => {
        resizeScheduled = false;
        resize();
      });
    };

    // Pause the heavy per-frame work (O(n^2) link search + redraw) while the
    // page is actively scrolling, and while this canvas is off-screen — both
    // just freeze the last drawn frame and keep the rAF loop cheap, resuming
    // full-quality drawing once scroll goes idle / the section re-enters view.
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
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        mouse.x = -9999; mouse.y = -9999;
      } else {
        mouse.x = x; mouse.y = y;
      }
    };

    const step = () => {
      // Freeze the last drawn frame while scrolling or off-screen — this is
      // the O(n^2) link-distance pass plus redraw, which is exactly the work
      // that competes with the browser's scroll compositing and causes stutter.
      if (isScrolling || !isVisible) {
        raf = requestAnimationFrame(step);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      const linkDist = 130;

      for (const p of particles) {
        // gentle pull toward the cursor
        const dxm = mouse.x - p.x;
        const dym = mouse.y - p.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 180 && dm > 0.01) {
          p.vx += (dxm / dm) * 0.012;
          p.vy += (dym / dm) * 0.012;
        }
        p.vx = Math.max(-0.6, Math.min(0.6, p.vx));
        p.vy = Math.max(-0.6, Math.min(0.6, p.vy));
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.22;
            const nearMouse = Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y) < 160;
            ctx.strokeStyle = nearMouse
              ? `rgba(34,211,238,${alpha * 2.4})`
              : `rgba(148,163,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const p of particles) {
        const nearMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y) < 160;
        ctx.fillStyle = nearMouse ? 'rgba(34,211,238,0.85)' : 'rgba(165,180,252,0.4)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

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
  }, [density]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
};

export default NeuralBackground;

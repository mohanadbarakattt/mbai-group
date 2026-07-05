import React, { useEffect, useRef } from 'react';

/**
 * A genuine 3D point-cloud globe rendered with manual perspective projection
 * on a 2D canvas — no WebGL dependency. Points sit on a sphere, rotate in 3D,
 * are depth-sorted and drawn with size/alpha by depth, plus a few orbiting
 * satellites and great-circle arcs. Reacts subtly to the pointer.
 */
const Globe3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let W = 0, H = 0, cx = 0, cy = 0, R = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    // Fibonacci sphere points
    const N = 620;
    type V = { x: number; y: number; z: number };
    const pts: V[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r });
    }
    // Satellites on inclined orbits
    const sats = Array.from({ length: 4 }, (_, i) => ({
      radius: 1.35 + i * 0.14,
      speed: 0.4 + i * 0.18,
      incl: (i * Math.PI) / 5 + 0.3,
      phase: i * 1.7,
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      W = parent.clientWidth; H = parent.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2; cy = H / 2;
      R = Math.min(W, H) * 0.32;
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
    };

    let t = 0;
    const project = (v: V, ay: number, ax: number) => {
      // rotate around Y then X
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      let x = v.x * cosY - v.z * sinY;
      let z = v.x * sinY + v.z * cosY;
      let y = v.y;
      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const y2 = y * cosX - z * sinX;
      const z2 = y * sinX + z * cosX;
      const persp = 3.2 / (3.2 + z2); // perspective divide
      return { sx: cx + x * R * persp, sy: cy + y2 * R * persp, depth: z2, persp };
    };

    const step = () => {
      t += 0.0032;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const ay = t + pointer.x;
      const ax = 0.35 + pointer.y;

      ctx.clearRect(0, 0, W, H);

      // soft core glow
      const g = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.5);
      g.addColorStop(0, 'rgba(99,102,241,0.18)');
      g.addColorStop(0.5, 'rgba(34,211,238,0.06)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2); ctx.fill();

      const proj = pts.map((p) => project(p, ay, ax));

      // connect nearby front-facing points (network look)
      ctx.lineWidth = 1;
      for (let i = 0; i < proj.length; i += 2) {
        const a = proj[i];
        if (a.depth < -0.1) continue;
        for (let j = i + 1; j < i + 10 && j < proj.length; j++) {
          const b = proj[j];
          if (b.depth < -0.1) continue;
          const dx = a.sx - b.sx, dy = a.sy - b.sy;
          const d = dx * dx + dy * dy;
          if (d < 40 * 40) {
            ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - d / 1600)})`;
            ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke();
          }
        }
      }

      // depth-sorted points
      const order = proj.map((p, i) => i).sort((a, b) => proj[a].depth - proj[b].depth);
      for (const i of order) {
        const p = proj[i];
        const front = (p.depth + 1) / 2; // 0 back → 1 front
        const size = (0.6 + front * 1.9) * p.persp;
        const alpha = 0.15 + front * 0.75;
        const cyanMix = i % 7 === 0;
        ctx.fillStyle = cyanMix
          ? `rgba(34,211,238,${alpha})`
          : `rgba(165,180,252,${alpha})`;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, Math.max(0.3, size), 0, Math.PI * 2); ctx.fill();
      }

      // satellites
      for (const s of sats) {
        const a = t * s.speed + s.phase;
        const v: V = {
          x: Math.cos(a) * s.radius,
          y: Math.sin(a) * Math.sin(s.incl) * s.radius,
          z: Math.sin(a) * Math.cos(s.incl) * s.radius,
        };
        const p = project(v, ay, ax);
        const front = (p.depth + 1) / 2;
        ctx.fillStyle = `rgba(34,211,238,${0.35 + front * 0.6})`;
        ctx.shadowColor = 'rgba(34,211,238,0.9)';
        ctx.shadowBlur = 8 * p.persp;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 2.2 * p.persp, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(step);
    };

    resize();
    step();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default Globe3D;

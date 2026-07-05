import React, { useEffect, useRef } from 'react';

/**
 * A clean, colorful wireframe globe rendered with manual 3D projection on a 2D
 * canvas (no WebGL). Structured latitude/longitude mesh with a gradient palette,
 * a soft glowing halo, bright vertices, and orbiting satellites with trails.
 * Reacts gently to the pointer.
 */
const Globe3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let W = 0, H = 0, cx = 0, cy = 0, R = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    // Palette sampled around the sphere
    const palette = ['#818cf8', '#22d3ee', '#38bdf8', '#a855f7', '#f472b6'];
    const hexToRgb = (h: string) => {
      const n = parseInt(h.slice(1), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };
    const rgb = palette.map(hexToRgb);
    const colorAt = (t: number) => {
      const s = ((t % 1) + 1) % 1;
      const f = s * rgb.length;
      const i = Math.floor(f);
      const frac = f - i;
      const a = rgb[i % rgb.length];
      const b = rgb[(i + 1) % rgb.length];
      return [
        Math.round(a[0] + (b[0] - a[0]) * frac),
        Math.round(a[1] + (b[1] - a[1]) * frac),
        Math.round(a[2] + (b[2] - a[2]) * frac),
      ];
    };

    // Build lat/long grid
    const LAT = 13; // parallels
    const LON = 24; // meridians
    type V = { x: number; y: number; z: number; lon: number };
    const grid: V[][] = [];
    for (let i = 1; i < LAT; i++) {
      const phi = (i / LAT) * Math.PI; // 0..PI
      const row: V[] = [];
      for (let j = 0; j < LON; j++) {
        const theta = (j / LON) * Math.PI * 2;
        row.push({
          x: Math.sin(phi) * Math.cos(theta),
          y: Math.cos(phi),
          z: Math.sin(phi) * Math.sin(theta),
          lon: j / LON,
        });
      }
      grid.push(row);
    }

    const sats = Array.from({ length: 3 }, (_, i) => ({
      r: 1.32 + i * 0.16,
      speed: 0.5 + i * 0.22,
      incl: (i * Math.PI) / 3 + 0.4,
      phase: i * 2.1,
      col: rgb[(i * 2) % rgb.length],
      trail: [] as { x: number; y: number; p: number }[],
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      W = parent.clientWidth; H = parent.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2; cy = H / 2;
      R = Math.min(W, H) * 0.30;
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 0.5;
    };

    let t = 0;
    const project = (x: number, y: number, z: number, ay: number, ax: number) => {
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      let x1 = x * cosY - z * sinY;
      let z1 = x * sinY + z * cosY;
      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const persp = 3.4 / (3.4 + z2);
      return { sx: cx + x1 * R * persp, sy: cy + y2 * R * persp, depth: z2, persp };
    };

    const step = () => {
      t += 0.0026;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const ay = t + pointer.x;
      const ax = 0.4 + pointer.y;

      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = 'round';

      // Halo glow
      const halo = ctx.createRadialGradient(cx, cy, R * 0.55, cx, cy, R * 1.5);
      halo.addColorStop(0, 'rgba(56,189,248,0.10)');
      halo.addColorStop(0.55, 'rgba(168,85,247,0.10)');
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2); ctx.fill();

      // Rim ring
      ctx.strokeStyle = 'rgba(129,140,248,0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.02, 0, Math.PI * 2); ctx.stroke();

      // Project grid
      const P = grid.map((row) => row.map((v) => ({ ...project(v.x, v.y, v.z, ay, ax), lon: v.lon })));

      // Meridians (vertical lines connecting parallels)
      for (let j = 0; j < LON; j++) {
        ctx.beginPath();
        let started = false;
        let depthSum = 0;
        for (let i = 0; i < P.length; i++) {
          const p = P[i][j];
          depthSum += p.depth;
          if (!started) { ctx.moveTo(p.sx, p.sy); started = true; } else ctx.lineTo(p.sx, p.sy);
        }
        const front = (depthSum / P.length + 1) / 2;
        const c = colorAt(j / LON);
        ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${0.08 + front * 0.32})`;
        ctx.lineWidth = 0.6 + front * 1.0;
        ctx.stroke();
      }

      // Parallels (horizontal loops)
      for (let i = 0; i < P.length; i++) {
        ctx.beginPath();
        let depthSum = 0;
        for (let j = 0; j <= LON; j++) {
          const p = P[i][j % LON];
          depthSum += p.depth;
          if (j === 0) ctx.moveTo(p.sx, p.sy); else ctx.lineTo(p.sx, p.sy);
        }
        const front = (depthSum / (LON + 1) + 1) / 2;
        ctx.strokeStyle = `rgba(148,163,255,${0.05 + front * 0.22})`;
        ctx.lineWidth = 0.5 + front * 0.8;
        ctx.stroke();
      }

      // Vertices (depth-sorted glowing dots)
      const flat: { sx: number; sy: number; depth: number; persp: number; lon: number }[] = [];
      for (const row of P) for (const p of row) flat.push(p);
      flat.sort((a, b) => a.depth - b.depth);
      for (const p of flat) {
        const front = (p.depth + 1) / 2;
        if (front < 0.2) continue;
        const c = colorAt(p.lon + t * 0.05);
        const size = (0.6 + front * 1.8) * p.persp;
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${0.25 + front * 0.7})`;
        if (front > 0.75) { ctx.shadowColor = `rgba(${c[0]},${c[1]},${c[2]},0.9)`; ctx.shadowBlur = 6 * p.persp; }
        ctx.beginPath(); ctx.arc(p.sx, p.sy, Math.max(0.4, size), 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Satellites with trails
      for (const s of sats) {
        const a = t * s.speed + s.phase;
        const x = Math.cos(a) * s.r;
        const y = Math.sin(a) * Math.sin(s.incl) * s.r;
        const z = Math.sin(a) * Math.cos(s.incl) * s.r;
        const p = project(x, y, z, ay, ax);
        const front = (p.depth + 1) / 2;
        s.trail.push({ x: p.sx, y: p.sy, p: front });
        if (s.trail.length > 22) s.trail.shift();
        // trail
        for (let k = 1; k < s.trail.length; k++) {
          const a0 = s.trail[k - 1], a1 = s.trail[k];
          const alpha = (k / s.trail.length) * 0.35 * a1.p;
          ctx.strokeStyle = `rgba(${s.col[0]},${s.col[1]},${s.col[2]},${alpha})`;
          ctx.lineWidth = 1.4 * a1.p;
          ctx.beginPath(); ctx.moveTo(a0.x, a0.y); ctx.lineTo(a1.x, a1.y); ctx.stroke();
        }
        ctx.fillStyle = `rgba(${s.col[0]},${s.col[1]},${s.col[2]},${0.5 + front * 0.5})`;
        ctx.shadowColor = `rgba(${s.col[0]},${s.col[1]},${s.col[2]},1)`;
        ctx.shadowBlur = 12 * p.persp;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 2.6 * p.persp, 0, Math.PI * 2); ctx.fill();
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

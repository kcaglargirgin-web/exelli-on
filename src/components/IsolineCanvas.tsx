import React, { useEffect, useRef } from 'react';

interface IsolineCanvasProps {
  activeSection?: string;
}

// 2D Simplex Noise generator
const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;
const GRAD = [1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 0, 1, 0, -1];

function createSimplexNoise(seed = 12345) {
  const PERM = new Uint8Array(512);
  const PMOD = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = (seed || 1) >>> 0;
  for (let i = 255; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1), t = p[i]; p[i] = p[j]; p[j] = t;
  }
  for (let i = 0; i < 512; i++) {
    PERM[i] = p[i & 255];
    PMOD[i] = (PERM[i] % 8) * 2;
  }

  return function snoise(xin: number, yin: number) {
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s), j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const x0 = xin - (i - t), y0 = yin - (j - t);
    let i1: number, j1: number;
    if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }
    const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
    const ii = i & 255, jj = j & 255;
    const g0 = PMOD[ii + PERM[jj]];
    const g1 = PMOD[ii + i1 + PERM[jj + j1]];
    const g2 = PMOD[ii + 1 + PERM[jj + 1]];
    let n0 = 0, n1 = 0, n2 = 0;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 > 0) { t0 *= t0; n0 = t0 * t0 * (GRAD[g0] * x0 + GRAD[g0 + 1] * y0); }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 > 0) { t1 *= t1; n1 = t1 * t1 * (GRAD[g1] * x1 + GRAD[g1 + 1] * y1); }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 > 0) { t2 *= t2; n2 = t2 * t2 * (GRAD[g2] * x2 + GRAD[g2 + 1] * y2); }
    return 70 * (n0 + n1 + n2);
  };
}

// Color palettes tailored for light/warm app aesthetics
const THEMES = {
  roseGold: {
    light: true,
    wash: ['#f5ede6', '#eee1d4', '#e6d3c1', '#dec3ae', '#d6b39b', '#cda288', '#c39176', '#b97f64', '#af6c52'],
    vein: ['#c49887', '#b2806f', '#9e6a59', '#8a5545', '#764132', '#622d1f', '#4e1b0e'],
  },
  survey: {
    light: true,
    wash: ['#fbfaf7', '#eceade', '#dfe4e2', '#d6e0e6', '#cdd9e6', '#c4cfe4', '#bcc2df', '#c3bcd6', '#d2bcc6'],
    vein: ['#4a5568', '#3b4252', '#374a78', '#5c6b73', '#8a707e', '#b47a70', '#986c5c'],
  },
  bathy: {
    light: false,
    wash: ['#061024', '#0a1e3a', '#0f3252', '#154a6b', '#1c6480', '#2a8391', '#48a29b', '#7cbfa6', '#bcd8b4'],
    vein: ['#2b5f92', '#2f7ba6', '#3a9fb2', '#57c3b6', '#8adcc0', '#c6ecc2', '#f4e6b4'],
  },
};

function hexToRGB(h: string): [number, number, number] {
  const v = parseInt(h.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

export const IsolineCanvas: React.FC<IsolineCanvasProps> = () => {
  const washRef = useRef<HTMLCanvasElement>(null);
  const veinsRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const washEl = washRef.current;
    const veinsEl = veinsRef.current;
    const starsEl = starsRef.current;
    if (!washEl || !veinsEl || !starsEl) return;

    const wctx = washEl.getContext('2d');
    const vctx = veinsEl.getContext('2d');
    const sctx = starsEl.getContext('2d');
    if (!wctx || !vctx || !sctx) return;

    const snoise = createSimplexNoise(Math.floor(Math.random() * 100000));

    // Detect touch / tablet / mobile devices to optimize particle count and grid density
    const isTouchOrTablet =
      typeof window !== 'undefined' &&
      (window.innerWidth <= 1180 ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0);

    // Configuration - Adapted dynamically for silky performance across desktop, tablet, and mobile
    const CFG = {
      count: isTouchOrTablet ? 400 : 900,
      scale: 150,
      speed: 100,
      morph: 30,
      persist: 86,
      width: 75,
      bands: 5,
      wash: 25,
      swirl: 35,
      theme: 'roseGold' as keyof typeof THEMES,
    };

    const CELL = isTouchOrTablet ? 18 : 12;
    let W = 0, H = 0, DPR = 1;
    let GW = 0, GH = 0;
    let psi: Float32Array;
    let washImg: ImageData;

    let px: Float32Array;
    let py: Float32Array;
    let plx: Float32Array;
    let ply: Float32Array;
    let plife: Float32Array;

    let washRGB: [number, number, number][] = [];
    let veinCSS: string[] = [];

    // Sparkling Stars state
    interface Star {
      x: number;
      y: number;
      size: number;
      baseAlpha: number;
      speed: number;
      phase: number;
      isCross: boolean;
    }
    let stars: Star[] = [];

    const initStars = (width: number, height: number) => {
      const starCount = Math.floor((width * height) / (isTouchOrTablet ? 60000 : 35000)) + 20;
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.8,
          baseAlpha: Math.random() * 0.4 + 0.25,
          speed: Math.random() * 2 + 1,
          phase: Math.random() * Math.PI * 2,
          isCross: Math.random() < 0.2,
        });
      }
    };

    const respawn = (i: number, fresh: boolean) => {
      px[i] = Math.random() * (GW - 2);
      py[i] = Math.random() * (GH - 2);
      plx[i] = px[i];
      ply[i] = py[i];
      plife[i] = fresh ? Math.random() * 260 : 160 + Math.random() * 220;
    };

    const allocTracers = () => {
      const n = CFG.count;
      px = new Float32Array(n);
      py = new Float32Array(n);
      plx = new Float32Array(n);
      ply = new Float32Array(n);
      plife = new Float32Array(n);
      for (let i = 0; i < n; i++) respawn(i, true);
    };

    const rebuildBands = () => {
      const T = THEMES[CFG.theme];
      const n = CFG.bands;
      const out: string[] = [];
      for (let b = 0; b < n; b++) {
        const t = n === 1 ? 0.5 : b / (n - 1);
        const f = t * (T.vein.length - 1);
        const i = Math.min(T.vein.length - 2, Math.floor(f));
        const k = f - i;
        const a = hexToRGB(T.vein[i]);
        const c = hexToRGB(T.vein[i + 1]);
        out.push(
          `rgb(${Math.round(a[0] + (c[0] - a[0]) * k)},${Math.round(
            a[1] + (c[1] - a[1]) * k
          )},${Math.round(a[2] + (c[2] - a[2]) * k)})`
        );
      }
      veinCSS = out;
    };

    const applyTheme = () => {
      const T = THEMES[CFG.theme];
      washRGB = T.wash.map(hexToRGB);
      rebuildBands();
      vctx.globalCompositeOperation = T.light ? 'source-over' : 'lighter';
      vctx.clearRect(0, 0, W, H);
    };

    const alloc = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      DPR = isTouchOrTablet ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.25);

      veinsEl.width = Math.max(1, Math.round(W * DPR));
      veinsEl.height = Math.max(1, Math.round(H * DPR));
      vctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      vctx.lineCap = 'round';

      starsEl.width = Math.max(1, Math.round(W * DPR));
      starsEl.height = Math.max(1, Math.round(H * DPR));
      sctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      GW = Math.ceil(W / CELL) + 2;
      GH = Math.ceil(H / CELL) + 2;
      psi = new Float32Array(GW * GH);

      washEl.width = GW;
      washEl.height = GH;
      washImg = wctx.createImageData(GW, GH);

      allocTracers();
      initStars(W, H);
      applyTheme();
    };

    alloc();

    // Mouse pointer swirl
    const ptr = { x: -1e5, y: -1e5, active: false };
    const handlePointerMove = (e: PointerEvent) => {
      ptr.x = e.clientX / CELL;
      ptr.y = e.clientY / CELL;
      ptr.active = true;
    };
    const handlePointerLeave = () => {
      ptr.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    let fieldT = 0;
    const buildField = (dt: number) => {
      fieldT += dt * (CFG.morph / 100) * 0.42;
      const f = (1 / (CFG.scale / 100)) * 0.055;
      const f2 = f * 2.13;
      const tx = fieldT * 0.9;
      const ty = fieldT * -0.7;

      for (let gy = 0; gy < GH; gy++) {
        const y = gy * f;
        const y2 = gy * f2;
        const row = gy * GW;
        for (let gx = 0; gx < GW; gx++) {
          psi[row + gx] =
            snoise(gx * f + tx, y + ty) * 0.64 +
            snoise(gx * f2 + 31.7, y2 - 11.3) * 0.3;
        }
      }
    };

    const drawWash = () => {
      const d = washImg.data;
      const n = washRGB.length;
      const op = CFG.wash / 100;
      if (op <= 0.001) {
        wctx.clearRect(0, 0, GW, GH);
        return;
      }
      for (let i = 0, p = 0; i < psi.length; i++, p += 4) {
        let t = (psi[i] / 0.94 + 1) * 0.5;
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        const c = washRGB[Math.min(n - 1, (t * n) | 0)];
        d[p] = c[0];
        d[p + 1] = c[1];
        d[p + 2] = c[2];
        d[p + 3] = 255 * op;
      }
      wctx.putImageData(washImg, 0, 0);
    };

    const bandPts: number[][] = [];
    const stepTracers = (dt: number) => {
      const n = CFG.count;
      const spd = (CFG.speed / 100) * 1.7;
      const gxMax = GW - 2;
      const gyMax = GH - 2;
      const nb = CFG.bands;
      const swirl = (CFG.swirl / 100) * 3.2;

      for (let b = 0; b < nb; b++) {
        if (!bandPts[b]) bandPts[b] = [];
        bandPts[b].length = 0;
      }

      for (let i = 0; i < n; i++) {
        const fx = px[i];
        const fy = py[i];

        let gx = fx | 0;
        let gy = fy | 0;
        if (gx < 0) gx = 0;
        else if (gx > gxMax - 1) gx = gxMax - 1;
        if (gy < 0) gy = 0;
        else if (gy > gyMax - 1) gy = gyMax - 1;

        const tx = fx - gx;
        const ty = fy - gy;
        const i00 = gy * GW + gx;

        const a = psi[i00];
        const b2 = psi[i00 + 1];
        const c = psi[i00 + GW];
        const d = psi[i00 + GW + 1];

        let vx = (c - a) * (1 - tx) + (d - b2) * tx;
        let vy = -((b2 - a) * (1 - ty) + (d - c) * ty);

        if (ptr.active && swirl > 0) {
          const rx = fx - ptr.x;
          const ry = fy - ptr.y;
          const r2 = rx * rx + ry * ry;
          if (r2 < 5200) {
            const fall = 1 / (1 + r2 * 0.012);
            vx += -ry * fall * swirl * 0.02;
            vy += rx * fall * swirl * 0.02;
          }
        }

        const mag = Math.sqrt(vx * vx + vy * vy);
        if (mag < 1e-7) {
          respawn(i, false);
          continue;
        }

        const stepLen = (spd * dt * 60) / CELL;
        const nx = fx + (vx / mag) * stepLen;
        const ny = fy + (vy / mag) * stepLen;

        plife[i] -= dt * 60;
        if (plife[i] <= 0 || nx < 0 || nx > gxMax || ny < 0 || ny > gyMax) {
          respawn(i, false);
          continue;
        }

        let t = (a / 0.94 + 1) * 0.5;
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        const band = Math.min(nb - 1, (t * nb) | 0);
        const arr = bandPts[band];
        arr.push(plx[i] * CELL, ply[i] * CELL, nx * CELL, ny * CELL);

        plx[i] = nx;
        ply[i] = ny;
        px[i] = nx;
        py[i] = ny;
      }
    };

    const drawTracers = () => {
      const fade = 0.0016 + Math.pow(1 - CFG.persist / 100, 2) * 0.34;
      const prev = vctx.globalCompositeOperation;
      vctx.globalCompositeOperation = 'destination-out';
      vctx.fillStyle = `rgba(0,0,0,${Math.max(0.02, fade).toFixed(4)})`;
      vctx.fillRect(0, 0, W, H);
      vctx.globalCompositeOperation = prev;

      const lw = (CFG.width / 100) * 1.05;
      vctx.globalAlpha = 0.20; // Richer line stroke contrast
      vctx.lineWidth = Math.max(0.25, lw);

      for (let b = 0; b < CFG.bands; b++) {
        const arr = bandPts[b];
        if (!arr || !arr.length) continue;
        vctx.strokeStyle = veinCSS[b];
        vctx.beginPath();
        for (let k = 0; k < arr.length; k += 4) {
          vctx.moveTo(arr[k], arr[k + 1]);
          vctx.lineTo(arr[k + 2], arr[k + 3]);
        }
        vctx.stroke();
      }
      vctx.globalAlpha = 1;
    };

    // Draw sparkling stars
    const drawStars = (nowSec: number) => {
      sctx.clearRect(0, 0, W, H);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const alpha = Math.max(
          0.05,
          star.baseAlpha + Math.sin(nowSec * star.speed + star.phase) * 0.35
        );

        sctx.save();
        sctx.globalAlpha = alpha;

        // Soft warm star color
        sctx.fillStyle = '#b88f7f';
        sctx.strokeStyle = '#d8b6a9';

        // Draw core dot
        sctx.beginPath();
        sctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        sctx.fill();

        // 4-point subtle sparkle cross glint for select stars
        if (star.isCross && alpha > 0.3) {
          const glintSize = star.size * (2 + Math.sin(nowSec * star.speed * 2) * 0.8);
          sctx.lineWidth = 0.6;
          sctx.beginPath();
          sctx.moveTo(star.x - glintSize, star.y);
          sctx.lineTo(star.x + glintSize, star.y);
          sctx.moveTo(star.x, star.y - glintSize);
          sctx.lineTo(star.x, star.y + glintSize);
          sctx.stroke();
        }

        sctx.restore();
      }
    };

    let animId: number;
    let last = performance.now();
    let frameCount = 0;

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.05) dt = 0.05;

      frameCount++;

      // On tablet/touch devices, calculate the heavy noise grid every 2nd frame to keep 60fps scrolling
      if (!isTouchOrTablet || frameCount % 2 === 0) {
        buildField(dt * (isTouchOrTablet ? 2 : 1));
        drawWash();
      }

      stepTracers(dt);
      drawTracers();
      drawStars(now / 1000);
    };

    animId = requestAnimationFrame(loop);

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        alloc();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Wash elevation layer */}
      <canvas
        ref={washRef}
        className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      />
      {/* Veins curl-noise tracer layer */}
      <canvas
        ref={veinsRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-75"
      />
      {/* Sparkling stars layer */}
      <canvas
        ref={starsRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />
    </div>
  );
};

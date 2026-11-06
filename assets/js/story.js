/* Story home page: scroll-scrubbed particle morphs (Krishna symbols -> AI) and reveal choreography.
   Loaded only by _layouts/story.html. three.js comes from the CDN on demand; if it fails to load,
   the page still works and keeps its CSS star field. */

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('st-js');

/* ---------- Reveal + count-up ---------- */
function countUp(scope) {
  scope.querySelectorAll('[data-count]').forEach((el) => {
    const end = +el.dataset.count;
    if (reduceMotion) return;
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / 1400);
      el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

const reveals = document.querySelectorAll('.reveal');
reveals.forEach((el) => [...el.children].forEach((c, i) => c.style.setProperty('--i', i)));
const revealIO = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    countUp(e.target);
    revealIO.unobserve(e.target);
  }),
  { threshold: 0.12 }
);
reveals.forEach((el) => revealIO.observe(el));

/* ---------- Gita: the shloka in the middle of the screen is "active" ---------- */
const FX = ['ripple', 'sink', 'contract', 'expand', 'turbulence', 'drift', 'fire', 'water', 'sparkle', 'still', 'march', 'clash', 'spin', 'rise', 'descend', 'ash', 'breathe', 'scatter', 'gather', 'thread', 'daynight', 'veil'];
const SPIN = FX.indexOf('spin');
let activeFx = '';
const verseCards = document.querySelectorAll('.gv[data-fx]');
if (verseCards.length) {
  const verseIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        let before = true;
        verseCards.forEach((c) => {
          if (c === e.target) before = false;
          else c.classList.remove('active');
          if (before) c.classList.add('lit'); /* a fast scroll can skip a verse; never leave earlier ones dim */
        });
        e.target.classList.add('active', 'lit'); /* lit stays: each shloka is recited once */
        activeFx = e.target.dataset.fx;
      } else {
        e.target.classList.remove('active');
      }
    });
    if (!document.querySelector('.gv.active')) activeFx = '';
  }, { rootMargin: '-42% 0px -42% 0px' });
  verseCards.forEach((c) => verseIO.observe(c));
}

/* ---------- Chapter rail ---------- */
const sections = [...document.querySelectorAll('.st-chapter[data-shape]')];
const rail = document.querySelector('.st-chapters');
const railLinks = sections.map((s) => {
  const a = document.createElement('a');
  a.href = '#' + s.id;
  a.innerHTML = '<span></span>';
  a.firstChild.textContent = s.dataset.label;
  rail.appendChild(a);
  return a;
});
const railIO = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    railLinks.forEach((a, i) => {
      const on = sections[i] === e.target;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'step');
      else a.removeAttribute('aria-current');
    });
  }),
  { rootMargin: '-45% 0px -45% 0px' }
);
sections.forEach((s) => railIO.observe(s));

/* ---------- Nav state + progress bar ---------- */
const nav = document.querySelector('.st-nav');
const bar = document.querySelector('.st-progress span');
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
    nav.classList.toggle('scrolled', scrollY > 40);
    ticking = false;
  });
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Typed roles ---------- */
const typed = document.getElementById('typed-role');
if (typed && !reduceMotion) {
  const roles = ['Machine Learning Engineer', 'Generative AI Specialist', 'Multi-Agent Systems Builder', 'Real-Time Voice AI Engineer', 'LLM & RAG Developer', 'Computer Vision Engineer'];
  let r = 0, n = roles[0].length, del = true;
  const loop = () => {
    const cur = roles[r];
    n += del ? -1 : 1;
    typed.textContent = cur.slice(0, n);
    if (del && n === 0) { del = false; r = (r + 1) % roles.length; return setTimeout(loop, 350); }
    if (!del && n === roles[r].length) { del = true; return setTimeout(loop, 2200); }
    setTimeout(loop, del ? 35 : 65);
  };
  setTimeout(loop, 2600);
}

/* ---------- 3D particle stage ---------- */
const canvas = document.getElementById('st-canvas');
if (canvas && !reduceMotion) {
  initStage().catch(() => { canvas.style.display = 'none'; });
}

async function initStage() {
  const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js');
  /* The ॐ glyph needs its font before we rasterise it; don't wait more than 1.5s. */
  await Promise.race([
    document.fonts.load('400 300px "Tiro Devanagari Sanskrit"', 'ॐ'),
    new Promise((r) => setTimeout(r, 1500)),
  ]).catch(() => {});

  const mobile = innerWidth < 768;
  const N = mobile ? 7000 : 14000;
  const TAU = Math.PI * 2;
  const rnd = Math.random;

  /* Rasterise a 2D drawing and scatter N particles over its filled pixels, keeping pixel colour. */
  function sample2D(draw, scale = 2.6, depth = 0.4) {
    const S = 512;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const g = c.getContext('2d', { willReadFrequently: true });
    draw(g, S);
    const d = g.getImageData(0, 0, S, S).data;
    const filled = [];
    for (let i = 0; i < S * S; i++) if (d[i * 4 + 3] > 8 + rnd() * 247) filled.push(i);
    if (!filled.length) return cloud(2.4);
    const pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const k = filled[(rnd() * filled.length) | 0];
      const x = k % S, y = (k / S) | 0;
      pos[i * 3] = ((x + rnd() - S / 2) / (S / 2)) * scale;
      pos[i * 3 + 1] = (-(y + rnd() - S / 2) / (S / 2)) * scale;
      pos[i * 3 + 2] = (rnd() - 0.5) * depth;
      col[i * 3] = d[k * 4] / 255;
      col[i * 3 + 1] = d[k * 4 + 1] / 255;
      col[i * 3 + 2] = d[k * 4 + 2] / 255;
    }
    return { pos, col };
  }

  function cloud(radius) {
    const pos = new Float32Array(N * 3), col = new Float32Array(N * 3), v = new THREE.Vector3();
    for (let i = 0; i < N; i++) {
      v.randomDirection().multiplyScalar(radius * Math.cbrt(rnd())).toArray(pos, i * 3);
      col.set([0.35, 0.45, 0.9], i * 3);
    }
    return { pos, col };
  }

  const drawOm = (g, S) => {
    const font = (px) => `400 ${px}px "Tiro Devanagari Sanskrit", "Noto Serif Devanagari", serif`;
    g.font = font(400);
    let m = g.measureText('ॐ');
    const k = Math.min(430 / (m.actualBoundingBoxLeft + m.actualBoundingBoxRight), 430 / (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent));
    g.font = font(400 * k);
    m = g.measureText('ॐ');
    const grad = g.createLinearGradient(0, 40, 0, 470);
    grad.addColorStop(0, '#ffe7a8');
    grad.addColorStop(0.5, '#f5b942');
    grad.addColorStop(1, '#ff7a33');
    g.fillStyle = grad;
    g.fillText('ॐ', S / 2 - (m.actualBoundingBoxRight - m.actualBoundingBoxLeft) / 2, S / 2 + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2);
  };

  const drawFlute = (g, S) => {
    const L = 470, T = 30;
    g.translate(S / 2, S / 2 - 30);
    g.rotate(-0.42);
    const body = g.createLinearGradient(0, -T / 2, 0, T / 2);
    body.addColorStop(0, '#ffe08f');
    body.addColorStop(0.5, '#e0a242');
    body.addColorStop(1, '#9a6526');
    g.fillStyle = body;
    g.beginPath();
    g.roundRect(-L / 2, -T / 2, L, T, T / 2);
    g.fill();
    g.fillStyle = '#ff4d6d';
    [-L / 2 + 34, -L / 2 + 52, L / 2 - 70, L / 2 - 52].forEach((x) => g.fillRect(x, -T / 2, 7, T));
    g.globalCompositeOperation = 'destination-out';
    [-L / 2 + 110, 10, 42, 74, 106, 138, 170].forEach((x) => { g.beginPath(); g.arc(x, 0, 6.5, 0, TAU); g.fill(); });
    g.globalCompositeOperation = 'source-over';
    /* tassel hanging under gravity from the right end */
    g.save();
    g.translate(L / 2 - 60, T / 2);
    g.rotate(0.42);
    g.lineWidth = 3;
    for (let i = 0; i < 9; i++) {
      g.strokeStyle = i % 3 === 0 ? '#ffd166' : '#ff4d6d';
      g.beginPath();
      g.moveTo(0, 0);
      g.quadraticCurveTo((i - 4) * 2, 55, (i - 4) * 4 + 4, 105);
      g.stroke();
    }
    g.fillStyle = '#ffd166';
    g.beginPath();
    g.arc(0, 4, 9, 0, TAU);
    g.fill();
    g.restore();
  };

  const drawFeather = (g, S) => {
    g.translate(S / 2, S / 2);
    g.rotate(0.3);
    g.translate(-S / 2, -S / 2);
    const cx = S / 2, top = 24, bot = 505;
    const shaftX = (t) => cx + Math.sin(t * 2.2) * 12;
    for (let i = 0; i <= 150; i++) {
      const t = i / 150;
      const y = bot - t * (bot - top);
      const w = 128 * Math.sin(Math.PI * Math.pow(t, 1.7)) * (0.85 + rnd() * 0.3);
      for (const side of [-1, 1]) {
        g.strokeStyle = `hsl(${148 + t * 30 + rnd() * 14}, 80%, ${46 + t * 14}%)`;
        g.lineWidth = 1.3;
        g.beginPath();
        g.moveTo(shaftX(t), y);
        g.quadraticCurveTo(shaftX(t) + side * w * 0.5, y - 4, shaftX(t) + side * w, y - 38 * t - 8);
        g.stroke();
      }
    }
    g.strokeStyle = '#f1fadc';
    g.lineWidth = 3;
    g.beginPath();
    for (let i = 0; i <= 40; i++) { const t = i / 40; g.lineTo(shaftX(t), bot - t * (bot - top)); }
    g.stroke();
    /* the eye: gold, green, bronze, turquoise rings around a royal-blue heart */
    const ex = shaftX(0.74), ey = bot - 0.74 * (bot - top);
    [[70, 88, '#e9cf55'], [58, 74, '#35d39a'], [46, 60, '#f0a94e'], [35, 47, '#45e3d3'], [22, 32, '#5b86ff']].forEach(([rx, ry, c]) => {
      g.fillStyle = c;
      g.beginPath();
      g.ellipse(ex, ey + (88 - ry) * 0.3, rx, ry, 0, 0, TAU);
      g.fill();
    });
  };

  const drawChakra = (g, S) => {
    const c = S / 2;
    g.translate(c, c);
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * TAU;
      const p = (r, t) => [Math.cos(a + t) * r, Math.sin(a + t) * r];
      g.fillStyle = i % 2 ? '#ff9a4d' : '#ffc857';
      g.beginPath();
      g.moveTo(...p(166, -0.12));
      g.lineTo(...p(240, 0.06));
      g.lineTo(...p(166, 0.15));
      g.fill();
    }
    g.strokeStyle = '#f5c15c';
    g.lineWidth = 16;
    g.beginPath(); g.arc(0, 0, 168, 0, TAU); g.stroke();
    g.lineWidth = 7;
    g.beginPath(); g.arc(0, 0, 118, 0, TAU); g.stroke();
    g.lineWidth = 5;
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * TAU;
      g.beginPath(); g.moveTo(Math.cos(a) * 40, Math.sin(a) * 40); g.lineTo(Math.cos(a) * 118, Math.sin(a) * 118); g.stroke();
    }
    g.fillStyle = '#ffe7a8';
    for (let i = 0; i < 32; i++) {
      const a = (i / 32) * TAU;
      g.beginPath(); g.arc(Math.cos(a) * 143, Math.sin(a) * 143, 4, 0, TAU); g.fill();
    }
    const hub = g.createRadialGradient(0, 0, 0, 0, 0, 40);
    hub.addColorStop(0, '#fff6dc');
    hub.addColorStop(1, '#ff9a4d');
    g.fillStyle = hub;
    g.beginPath(); g.arc(0, 0, 40, 0, TAU); g.fill();
  };

  const drawLotus = (g, S) => {
    g.fillStyle = '#14b8a6';
    g.beginPath(); g.ellipse(S / 2, 410, 215, 30, 0, 0, TAU); g.fill();
    const petal = (ang, len, wid, tip, base) => {
      g.save();
      g.translate(S / 2, 395);
      g.rotate(ang);
      const gr = g.createLinearGradient(0, 0, 0, -len);
      gr.addColorStop(0, base);
      gr.addColorStop(1, tip);
      g.fillStyle = gr;
      g.beginPath();
      g.moveTo(0, 0);
      g.bezierCurveTo(wid, -len * 0.35, wid * 0.6, -len * 0.82, 0, -len);
      g.bezierCurveTo(-wid * 0.6, -len * 0.82, -wid, -len * 0.35, 0, 0);
      g.fill();
      g.restore();
    };
    [-1.3, -0.9, -0.48, 0.48, 0.9, 1.3].forEach((a) => petal(a, 235, 72, '#f472b6', '#831843'));
    [-0.68, -0.24, 0.24, 0.68].forEach((a) => petal(a, 215, 66, '#f9a8d4', '#9d174d'));
    petal(0, 250, 64, '#fbcfe8', '#be185d');
    g.fillStyle = '#ffd166';
    g.beginPath(); g.arc(S / 2, 345, 14, 0, TAU); g.fill();
  };

  function neural() {
    const layers = [4, 7, 9, 7, 4], radii = [0.8, 1.3, 1.7, 1.3, 0.8];
    const nodes = [];
    layers.forEach((n, l) => {
      for (let j = 0; j < n; j++) {
        const a = (j / n) * TAU + l * 0.35;
        nodes.push({ l, p: new THREE.Vector3(-2 + l * 1, Math.cos(a) * radii[l], Math.sin(a) * radii[l] * 0.7) });
      }
    });
    const edges = [];
    nodes.forEach((a) => nodes.forEach((b) => { if (b.l === a.l + 1) edges.push([a.p, b.p]); }));
    const pos = new Float32Array(N * 3), col = new Float32Array(N * 3), v = new THREE.Vector3();
    const violet = new THREE.Color('#8b5cf6'), cyan = new THREE.Color('#22d3ee'), tmp = new THREE.Color();
    for (let i = 0; i < N; i++) {
      if (i < N * 0.3) {
        const node = nodes[i % nodes.length].p;
        v.randomDirection().multiplyScalar(0.09 * Math.cbrt(rnd())).add(node);
        tmp.set('#e0f7ff');
      } else {
        const [a, b] = edges[(rnd() * edges.length) | 0];
        v.lerpVectors(a, b, rnd());
        v.x += (rnd() - 0.5) * 0.02; v.y += (rnd() - 0.5) * 0.02;
        tmp.lerpColors(violet, cyan, (v.x + 2) / 4).multiplyScalar(0.75);
      }
      v.toArray(pos, i * 3);
      tmp.toArray(col, i * 3);
    }
    return { pos, col };
  }

  /* Krishna's open palm, offered upwards (Chapter V); the cosmos floats above it */
  const drawPalm = (g, S) => {
    /* zoom onto the palm and fingers; the forearm runs off the bottom-left edge */
    g.translate(256, 300);
    g.scale(1.35, 1.35);
    g.translate(-315, -340);
    const skin = g.createLinearGradient(0, 220, 0, 480);
    skin.addColorStop(0, '#b3ccff');
    skin.addColorStop(0.45, '#6188f2');
    skin.addColorStop(1, '#3550c0');
    g.lineCap = 'round';
    g.lineJoin = 'round';
    const curve = (p) => { g.beginPath(); g.moveTo(p[0], p[1]); g.bezierCurveTo(p[2], p[3], p[4], p[5], p[6], p[7]); };
    /* fingers first (little -> index), each cutting a thin gap so neighbours stay distinct */
    const finger = (p, w) => {
      g.globalCompositeOperation = 'destination-out'; g.lineWidth = w + 10; curve(p); g.stroke();
      g.globalCompositeOperation = 'source-over'; g.strokeStyle = skin; g.lineWidth = w; curve(p); g.stroke();
    };
    finger([316, 372, 364, 376, 398, 390, 405, 412], 18);
    finger([324, 357, 398, 354, 444, 368, 457, 399], 21);
    finger([330, 340, 410, 330, 462, 344, 480, 378], 23);
    finger([328, 323, 395, 307, 450, 317, 473, 351], 22);
    /* forearm, palm and thumb on top, hiding the finger bases */
    g.fillStyle = skin;
    g.strokeStyle = skin;
    g.beginPath(); g.moveTo(0, 512); g.lineTo(118, 512); g.quadraticCurveTo(150, 430, 222, 380); g.lineTo(160, 318); g.quadraticCurveTo(70, 370, 0, 452); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(160, 318); g.bezierCurveTo(220, 302, 300, 304, 345, 320); g.bezierCurveTo(352, 352, 322, 386, 268, 392); g.bezierCurveTo(244, 395, 228, 390, 222, 380); g.closePath(); g.fill();
    g.lineWidth = 25; curve([228, 348, 236, 306, 266, 284, 302, 276]); g.stroke();
    /* gold bangle */
    g.strokeStyle = '#f5c15c'; g.lineWidth = 15; g.lineCap = 'butt';
    g.beginPath(); g.moveTo(140, 330); g.lineTo(204, 398); g.stroke();
    g.fillStyle = '#ffe7a8';
    for (let i = 0; i < 6; i++) { g.beginPath(); g.arc(146 + i * 11, 337 + i * 11.6, 3.5, 0, TAU); g.fill(); }
    /* fade the forearm out towards the corner instead of a hard crop */
    g.globalCompositeOperation = 'destination-out';
    const fadeOut = g.createRadialGradient(0, 512, 0, 0, 512, 250);
    fadeOut.addColorStop(0, 'rgba(0,0,0,1)');
    fadeOut.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = fadeOut;
    g.fillRect(-200, -200, 1000, 1000);
    g.globalCompositeOperation = 'source-over';
  };

  /* ---------- Prologue sequence: Mahabharata symbols, drawn in code ---------- */
  const strokePath = (g, pts, w, color) => {
    g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(pts[0], pts[1]);
    for (let i = 2; i < pts.length; i += 2) g.lineTo(pts[i], pts[i + 1]);
    g.stroke();
  };
  const bez = (g, p, w, color) => {
    g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round';
    g.beginPath(); g.moveTo(p[0], p[1]); g.bezierCurveTo(p[2], p[3], p[4], p[5], p[6], p[7]); g.stroke();
  };
  const disc = (g, x, y, r, color) => { g.fillStyle = color; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); };
  const poly = (g, pts, color) => {
    g.fillStyle = color; g.beginPath(); g.moveTo(pts[0], pts[1]);
    for (let i = 2; i < pts.length; i += 2) g.lineTo(pts[i], pts[i + 1]);
    g.closePath(); g.fill();
  };
  const cut = (g, fn) => { g.globalCompositeOperation = 'destination-out'; fn(); g.globalCompositeOperation = 'source-over'; };

  /* Panchajanya: Krishna's conch (Gita 1.15) */
  function drawConch(g, S) {
    g.save();
    g.translate(S / 2, S / 2); g.rotate(-0.45); g.translate(-S / 2, -S / 2);
    const pearl = g.createLinearGradient(0, 160, 0, 360);
    pearl.addColorStop(0, '#fffaf0'); pearl.addColorStop(0.6, '#f3e3c3'); pearl.addColorStop(1, '#d9b98a');
    /* body: wide whorl tapering to the siphonal canal */
    g.fillStyle = pearl;
    g.beginPath();
    g.moveTo(130, 256);
    g.bezierCurveTo(140, 150, 300, 150, 455, 248);
    g.lineTo(458, 262);
    g.bezierCurveTo(330, 345, 150, 360, 130, 256);
    g.fill();
    /* spire: stacked whorls */
    [[118, 256, 46], [86, 256, 30], [64, 256, 19], [50, 256, 11]].forEach(([x, y, r]) => disc(g, x, y, r, '#fbf1dc'));
    cut(g, () => {
      [[100, 256, 46, 0.9], [74, 256, 30, 0.9], [57, 256, 19, 0.9]].forEach(([x, y, r]) => {
        g.lineWidth = 4; g.beginPath(); g.arc(x, y, r, -0.9, 0.9); g.stroke();
      });
      /* spiral grooves across the body */
      for (let i = 0; i < 4; i++) {
        g.lineWidth = 4; g.beginPath();
        const x = 175 + i * 38;
        g.moveTo(x, 180 + i * 6); g.quadraticCurveTo(x + 26, 256, x - 4, 335 - i * 10); g.stroke();
      }
    });
    /* flared outer lip of the aperture */
    g.fillStyle = '#f7e6c4';
    g.beginPath();
    g.moveTo(190, 318); g.bezierCurveTo(260, 380, 360, 360, 430, 280);
    g.bezierCurveTo(360, 320, 270, 330, 190, 318); g.fill();
    /* gold caps */
    disc(g, 40, 256, 9, '#f5c15c');
    g.fillStyle = '#f5c15c'; g.beginPath(); g.ellipse(132, 256, 10, 50, 0, 0, TAU); g.fill();
    poly(g, [452, 244, 478, 255, 452, 266], '#f5c15c');
    g.restore();
  }

  /* Arjuna drawing the Gandiva, in profile facing right */
  function drawArcher(g, S) {
    const skin = '#ffd08a', gold = '#f5c15c', cloth = '#ff9a4d';
    /* quiver on the back */
    g.save(); g.translate(168, 200); g.rotate(-0.45);
    g.fillStyle = '#c98a3a'; g.fillRect(-12, -70, 24, 95);
    for (let i = 0; i < 4; i++) strokePath(g, [-8 + i * 5, -70, -12 + i * 7, -96], 3, '#ffe7a8');
    g.restore();
    /* back leg, straight */
    strokePath(g, [205, 285, 165, 360, 138, 438], 24, skin);
    strokePath(g, [138, 438, 118, 446], 12, skin);
    /* front leg, lunging */
    strokePath(g, [222, 285, 282, 345, 290, 438], 24, skin);
    strokePath(g, [290, 438, 318, 444], 12, skin);
    /* dhoti */
    poly(g, [190, 250, 238, 250, 262, 318, 252, 330, 210, 312, 172, 330, 166, 316], cloth);
    /* torso */
    poly(g, [188, 176, 236, 176, 230, 258, 194, 258], skin);
    /* head + crown (mukut) */
    disc(g, 212, 150, 21, skin);
    poly(g, [190, 140, 234, 140, 228, 118, 222, 126, 212, 88, 202, 126, 196, 118], gold);
    disc(g, 212, 86, 5, gold);
    /* uttariya scarf streaming behind */
    bez(g, [196, 182, 150, 200, 120, 190, 92, 214], 6, cloth);
    bez(g, [200, 190, 160, 226, 130, 224, 104, 250], 5, cloth);
    /* draw arm: elbow pulled back, hand at the cheek */
    strokePath(g, [196, 184, 140, 176, 224, 160], 15, skin);
    /* bow arm, extended */
    strokePath(g, [230, 184, 300, 180, 362, 176], 12, skin);
    /* the Gandiva: stave bulging forward, recurved tips */
    g.strokeStyle = gold; g.lineWidth = 9; g.lineCap = 'round';
    g.beginPath(); g.moveTo(336, 42); g.quadraticCurveTo(430, 176, 336, 310); g.stroke();
    bez(g, [336, 42, 326, 34, 318, 40, 322, 50], 6, gold);
    bez(g, [336, 310, 326, 318, 318, 312, 322, 302], 6, gold);
    /* string drawn back to the cheek */
    strokePath(g, [336, 44, 226, 160, 336, 308], 2.5, '#fff3cf');
    /* arrow with head and fletching */
    strokePath(g, [214, 161, 452, 172], 4, '#fff3cf');
    poly(g, [452, 162, 480, 173, 452, 183], gold);
    poly(g, [214, 161, 196, 150, 204, 161, 196, 172], '#ff6b6b');
  }

  /* Krishna Murlidhar: tribhanga pose, flute at the lips, peacock-feather crown */
  function drawMurlidhar(g, S) {
    const blue = '#6f93f5', gold = '#f5c15c', pitambar = '#ffc94d';
    /* halo (prabhamandal) */
    g.strokeStyle = gold; g.lineWidth = 3; g.beginPath(); g.arc(250, 126, 46, 0, TAU); g.stroke();
    /* crossed legs: right leg crosses in front, resting on the toes */
    strokePath(g, [246, 340, 244, 396, 252, 448], 19, blue);
    strokePath(g, [270, 340, 256, 398, 226, 446], 19, blue);
    strokePath(g, [252, 448, 270, 452], 9, blue);
    strokePath(g, [226, 446, 214, 456], 9, blue);
    disc(g, 250, 432, 5, gold); disc(g, 230, 430, 5, gold);
    /* pitambar: flared, hips swaying right */
    g.fillStyle = pitambar;
    g.beginPath(); g.moveTo(232, 258); g.lineTo(286, 254);
    g.bezierCurveTo(300, 290, 308, 330, 302, 368);
    g.bezierCurveTo(284, 360, 270, 376, 254, 366);
    g.bezierCurveTo(240, 376, 222, 366, 214, 372);
    g.bezierCurveTo(214, 330, 222, 290, 232, 258); g.fill();
    cut(g, () => { [[246, 286, 238, 360], [266, 284, 272, 356], [284, 280, 292, 350]].forEach((p) => strokePath(g, p, 2.5, '#000')); });
    /* waist sash ends */
    bez(g, [278, 262, 300, 290, 296, 320, 310, 344], 6, '#ff8a3d');
    /* torso: broad shoulders, narrow waist */
    g.fillStyle = blue;
    g.beginPath(); g.moveTo(220, 172); g.lineTo(290, 168);
    g.bezierCurveTo(288, 210, 280, 240, 284, 262); g.lineTo(234, 264);
    g.bezierCurveTo(236, 238, 228, 206, 220, 172); g.fill();
    /* vaijayanti garland */
    g.strokeStyle = '#ff8fb1'; g.lineWidth = 5; g.beginPath(); g.moveTo(230, 176); g.quadraticCurveTo(258, 280, 284, 172); g.stroke();
    /* arms raised to the flute */
    strokePath(g, [224, 178, 204, 210, 240, 152], 12, blue);
    strokePath(g, [286, 176, 320, 200, 324, 156], 12, blue);
    disc(g, 206, 206, 4, gold); disc(g, 318, 198, 4, gold);
    /* flowing uttariya */
    bez(g, [206, 206, 176, 258, 198, 316, 172, 376], 5, pitambar);
    bez(g, [320, 200, 350, 252, 330, 316, 356, 370], 5, pitambar);
    /* head tilted towards the flute, curls at the nape */
    disc(g, 250, 130, 22, blue);
    [[230, 140], [234, 150], [270, 144], [268, 152]].forEach(([x, y]) => disc(g, x, y, 6, '#3f5fc0'));
    /* the bansuri at the lips, angled down to the right */
    strokePath(g, [234, 146, 396, 166], 7, gold);
    cut(g, () => { [300, 318, 336, 354, 372].forEach((x) => disc(g, x, 154 + (x - 300) * 0.123, 2.2, '#000')); });
    /* mukut with peacock feather */
    poly(g, [228, 118, 272, 114, 268, 96, 258, 102, 250, 78, 242, 102, 232, 98], gold);
    g.save(); g.translate(264, 84); g.rotate(0.35);
    g.fillStyle = '#21b37c'; g.beginPath(); g.ellipse(0, -34, 15, 34, 0, 0, TAU); g.fill();
    g.fillStyle = '#e9cf55'; g.beginPath(); g.ellipse(0, -44, 10, 14, 0, 0, TAU); g.fill();
    g.fillStyle = '#45e3d3'; g.beginPath(); g.ellipse(0, -43, 6.5, 9, 0, 0, TAU); g.fill();
    g.fillStyle = '#5b86ff'; g.beginPath(); g.ellipse(0, -42, 3.5, 5, 0, 0, TAU); g.fill();
    g.restore();
  }

  /* Gita Upadesh: Krishna as charioteer teaching Arjuna, under the Hanuman flag (Kapidhvaja) */
  function drawChariot(g, S) {
    const gold = '#f5c15c', blue = '#6f93f5', saffron = '#ff9a4d', silver = '#e8ecf8';
    /* flag pole + pennant with Hanuman mark */
    strokePath(g, [112, 318, 112, 64], 5, gold);
    g.fillStyle = saffron; g.beginPath(); g.moveTo(114, 66); g.quadraticCurveTo(170, 70, 222, 92); g.quadraticCurveTo(170, 108, 114, 118); g.fill();
    disc(g, 150, 92, 9, '#ffe7a8');
    bez(g, [158, 96, 172, 110, 178, 92, 170, 86], 3, '#ffe7a8');
    /* horses: two galloping, one offset behind */
    const horse = (dx, dy, color) => {
      g.save(); g.translate(dx, dy);
      g.fillStyle = color; g.strokeStyle = color; g.lineCap = 'round'; g.lineJoin = 'round';
      /* galloping body: chest, arched neck, head, back and croup in one silhouette */
      g.beginPath();
      g.moveTo(450, 304);
      g.bezierCurveTo(458, 280, 462, 254, 470, 238);
      g.lineTo(496, 254); g.lineTo(502, 245);
      g.bezierCurveTo(494, 232, 486, 220, 478, 214);
      g.lineTo(476, 196); g.lineTo(468, 210);
      g.bezierCurveTo(446, 222, 428, 256, 410, 278);
      g.bezierCurveTo(390, 284, 360, 284, 336, 290);
      g.bezierCurveTo(326, 306, 330, 326, 344, 334);
      g.bezierCurveTo(380, 342, 420, 340, 448, 324);
      g.closePath(); g.fill();
      /* legs: front pair reaching forward, hind pair pushing back */
      strokePath(g, [438, 328, 462, 350, 486, 340], 10, color);
      strokePath(g, [426, 334, 446, 368, 466, 376], 10, color);
      strokePath(g, [348, 328, 326, 352, 300, 364], 10, color);
      strokePath(g, [362, 334, 348, 370, 330, 388], 10, color);
      /* tail and mane */
      bez(g, [334, 294, 304, 284, 294, 310, 278, 324], 9, color);
      for (let k = 0; k < 5; k++) strokePath(g, [470 - k * 12, 214 + k * 13, 452 - k * 12, 210 + k * 13], 4, color);
      g.restore();
    };
    horse(-26, -16, '#8f9cc6');
    horse(0, 0, silver);
    /* chariot: yoke pole, body with rising prow, back rail */
    strokePath(g, [318, 330, 398, 318], 6, gold);
    poly(g, [98, 300, 330, 300, 346, 262, 340, 330, 98, 330], gold);
    strokePath(g, [98, 300, 98, 250, 130, 250], 6, gold);
    /* wheel */
    g.strokeStyle = gold; g.lineWidth = 10; g.beginPath(); g.arc(168, 362, 62, 0, TAU); g.stroke();
    for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU; strokePath(g, [168, 362, 168 + Math.cos(a) * 60, 362 + Math.sin(a) * 60], 4, gold); }
    disc(g, 168, 362, 12, '#ffe7a8');
    /* Arjuna: kneeling, hands folded towards Krishna, Gandiva laid upright beside him */
    g.strokeStyle = gold; g.lineWidth = 5; g.beginPath(); g.moveTo(150, 168); g.quadraticCurveTo(128, 236, 150, 300); g.stroke();
    poly(g, [172, 232, 210, 232, 214, 296, 168, 296], saffron);
    disc(g, 192, 214, 17, '#ffd08a');
    poly(g, [176, 206, 208, 206, 204, 190, 198, 196, 192, 170, 186, 196, 180, 190], gold);
    strokePath(g, [204, 246, 232, 242], 10, '#ffd08a');
    /* Krishna: seated at the front, turned back, right hand raised in teaching */
    g.strokeStyle = gold; g.lineWidth = 3; g.beginPath(); g.arc(290, 200, 30, 0, TAU); g.stroke();
    poly(g, [274, 226, 306, 226, 312, 296, 270, 296], blue);
    disc(g, 290, 206, 17, blue);
    poly(g, [274, 196, 306, 196, 302, 180, 296, 186, 290, 160, 284, 186, 278, 180], gold);
    g.fillStyle = '#21b37c'; g.beginPath(); g.ellipse(300, 150, 7, 17, 0.4, 0, TAU); g.fill();
    disc(g, 303, 144, 4, '#45e3d3');
    strokePath(g, [276, 236, 254, 224, 250, 204], 10, blue);
    g.fillStyle = blue; g.beginPath(); g.ellipse(249, 196, 7, 11, -0.2, 0, TAU); g.fill();
    strokePath(g, [306, 244, 332, 262], 10, blue);
    strokePath(g, [332, 262, 486, 248], 2, '#ffe7a8');
    poly(g, [272, 290, 330, 290, 336, 306, 268, 306], '#ffc94d');
  }

  /* Shapes are sampled on first use, so each page only pays for the shapes it actually shows */
  const SHAPE_DEFS = {
    om: () => sample2D(drawOm),
    flute: () => sample2D(drawFlute, 2.1),
    feather: () => sample2D(drawFeather, 2.6),
    chakra: () => sample2D(drawChakra, 2.2, 0.25),
    neural: () => neural(),
    palm: () => sample2D(drawPalm, 2.4, 0.12),
    conch: () => sample2D(drawConch, 2.5),
    archer: () => sample2D(drawArcher, 2.35, 0.2),
    murlidhar: () => sample2D(drawMurlidhar, 2.45, 0.2),
    chariot: () => sample2D(drawChariot, 2.35, 0.2),
    lotus: () => sample2D(drawLotus, 2.6),
  };
  /* Gita chapter pages bring their own scenes; keep the same ?v= so a deploy busts both files */
  if (document.querySelector('.gv-scene')) {
    const mod = await import('./gita-shapes.js' + new URL(import.meta.url).search);
    Object.assign(SHAPE_DEFS, mod.default({ sample2D }));
  }
  const shapeCache = {};
  const shapes = new Proxy({}, {
    get: (_, name) => (typeof name === 'string' && SHAPE_DEFS[name] ? (shapeCache[name] ||= SHAPE_DEFS[name]()) : undefined),
  });
  const intro = cloud(9);

  /* ---------- Scene ---------- */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  const dpr = Math.min(devicePixelRatio, 1.75);
  renderer.setPixelRatio(dpr);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 9;

  const geo = new THREE.BufferGeometry();
  const aFrom = new THREE.BufferAttribute(intro.pos.slice(), 3);
  const first = shapes[sections[0].dataset.shape] || shapes.om; /* the intro gathers into this page's first shape */
  const aTo = new THREE.BufferAttribute(first.pos.slice(), 3);
  const aColA = new THREE.BufferAttribute(intro.col.slice(), 3);
  const aColB = new THREE.BufferAttribute(first.col.slice(), 3);
  const seeds = new Float32Array(N);
  for (let i = 0; i < N; i++) seeds[i] = rnd();
  geo.setAttribute('position', aFrom);
  geo.setAttribute('aTo', aTo);
  geo.setAttribute('aColA', aColA);
  geo.setAttribute('aColB', aColB);
  geo.setAttribute('aRand', new THREE.BufferAttribute(seeds, 1));

  const uniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uSize: { value: mobile ? 30 : 34 },
    uPixelRatio: { value: dpr },
    uMouse: { value: new THREE.Vector2(9, 9) },
    uAspect: { value: 1 },
    uPulse: { value: 0 },
    uFx: { value: new Float32Array(22) },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      uniform float uTime, uProgress, uSize, uPixelRatio, uAspect, uPulse;
      uniform float uFx[22]; /* ripple sink contract expand turbulence drift fire water sparkle still march clash spin rise descend ash breathe scatter gather thread daynight veil */
      uniform vec2 uMouse;
      attribute vec3 aTo, aColA, aColB;
      attribute float aRand;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float d = aRand * 0.35;
        float p = smoothstep(d, d + 0.65, uProgress);
        vec3 pos = mix(position, aTo, p);
        float burst = sin(p * 3.14159);
        pos += burst * 1.1 * vec3(sin(aRand * 91.0 + uTime), cos(aRand * 57.0 + uTime * 1.3), sin(aRand * 33.0 + uTime * 0.7));
        pos += vec3(sin(uTime * 0.8 + pos.y * 2.0), cos(uTime * 0.6 + pos.x * 2.0), sin(uTime * 0.7 + pos.z * 2.0)) * 0.022 * (1.0 - uFx[9]);
        /* per-shloka motion */
        vec3 dirC = normalize(pos + 1e-5);
        float rad = length(pos);
        pos += dirC * sin(rad * 5.0 - uTime * 7.0) * 0.12 * uFx[0];                         /* ripple: sound */
        pos.y -= 0.5 * uFx[1] * (0.55 + 0.45 * aRand);                                       /* sink: grief */
        pos *= 1.0 - 0.22 * uFx[2] + 0.16 * uFx[3] + 0.045 * uFx[10] * sin(uTime * 7.0);    /* contract, expand, march */
        pos += uFx[4] * 0.22 * vec3(sin(aRand * 71.0 + uTime * 3.1), cos(aRand * 43.0 + uTime * 2.7), sin(aRand * 29.0 + uTime * 3.7)); /* turbulence */
        pos.x += uFx[5] * 0.32 * sin(uTime * 0.9 + pos.y * 1.5);                            /* drift: wind */
        pos.y += uFx[6] * 0.3 * fract(aRand * 7.0 + uTime * 0.7);                           /* fire: rising flicker */
        pos.y += uFx[7] * 0.13 * sin(pos.x * 3.0 + uTime * 2.2);                            /* water: waves */
        pos += dirC * uFx[11] * 0.32 * pow(abs(sin(uTime * 1.8)), 10.0);                    /* clash: sharp bursts */
        /* spin turns the whole shape (JS, spinZ); here the rim lags a little, like a turning wheel */
        pos.xy += uFx[12] * 0.06 * vec2(-pos.y, pos.x) * sin(rad * 3.0 - uTime * 2.0);
        float hp = step(0.5, aRand);                                                       /* rise, descend, ash move half the particles */
        float riseT = fract(aRand * 13.0 + uTime * 0.18);
        pos.y += uFx[13] * hp * 1.3 * riseT;                                               /* rise: offering smoke */
        pos.x += uFx[13] * hp * 0.16 * riseT * sin(uTime * 1.3 + pos.y * 4.0 + aRand * 6.0);
        float fallT = 1.0 - smoothstep(0.0, 1.0, fract(aRand * 11.0 + uTime * 0.3));
        pos.y += uFx[14] * hp * 1.8 * fallT;                                               /* descend: light pouring down */
        float ashT = fract(aRand * 5.0 + uTime * 0.2);
        pos += uFx[15] * hp * ashT * (dirC * 0.25 + vec3(0.0, 0.45, 0.0));                 /* ash: flakes lift off the burning shape */
        float breath = sin(uTime * 0.9);
        pos *= 1.0 + 0.09 * uFx[16] * breath;                                                 /* breathe: slow inhale, exhale */
        float hop = floor(uTime * 2.5 + aRand * 9.0);                                         /* scatter: the restless mind darts, stops, darts */
        pos += uFx[17] * hp * 0.4 * vec3(sin(hop * 12.9898 + aRand * 78.2), cos(hop * 4.1414 + aRand * 31.7), 0.0);
        pos = mix(pos, vec3(0.0, 0.0, pos.z * 0.2), uFx[18] * hp * 0.9);                     /* gather: half the mind collapses to one point */
        pos.y = mix(pos.y, floor(pos.y * 5.0 + 0.5) / 5.0, uFx[19] * 0.85);                 /* thread: strung like pearls on a thread */
        pos.x += uFx[19] * 0.05 * sin(uTime * 1.2 + floor(pos.y * 5.0 + 0.5));
        float day = 0.5 + 0.5 * sin(uTime * 0.6 - pos.x * 0.9);                              /* daynight: dawn sweeps across, night follows */
        pos *= 1.0 + uFx[20] * 0.07 * (day - 0.5);
        pos.x += uFx[21] * 0.12 * sin(pos.y * 6.0 + uTime * 1.5);                            /* veil: maya ripples like cloth */
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;
        vec2 ndc = gl_Position.xy / gl_Position.w;
        vec2 dir = (ndc - uMouse) * vec2(uAspect, 1.0);
        float f = smoothstep(0.3, 0.0, length(dir));
        gl_Position.xy += normalize(dir + 1e-5) / vec2(uAspect, 1.0) * f * 0.15 * gl_Position.w;
        gl_PointSize = uSize * uPixelRatio * (0.35 + aRand * 0.9) / -mv.z;
        vec3 c = mix(aColA, aColB, p);
        float pulse = uPulse * pow(0.5 + 0.5 * sin(pos.x * 2.6 - uTime * 3.2), 10.0);
        c += vec3(0.6, 0.9, 1.0) * pulse;
        c = mix(c, vec3(1.0, 0.42, 0.12), uFx[6] * 0.65);                                   /* fire colour */
        c = mix(c, vec3(0.25, 0.6, 1.0), uFx[7] * 0.55);                                    /* water colour */
        c = mix(c, vec3(dot(c, vec3(0.33))), uFx[1] * 0.6);                                 /* grief drains colour */
        c *= 1.0 + 0.35 * uFx[3];
        c += vec3(1.0, 0.95, 0.8) * uFx[8] * pow(aRand, 5.0) * (0.5 + 0.5 * sin(uTime * 6.0 + aRand * 40.0)); /* sparkle */
        c = mix(c, vec3(0.88, 0.9, 0.95), uFx[13] * hp * 0.6);                           /* smoke whitens */
        c = mix(c, vec3(1.0, 0.86, 0.45), uFx[14] * (0.25 + 0.5 * hp * fallT));           /* golden descent */
        c = mix(c, vec3(dot(c, vec3(0.3))) * 0.8, uFx[15] * hp * ashT);                   /* burnt to grey ash */
        c += vec3(1.0, 0.38, 0.08) * uFx[15] * pow(1.0 - ashT, 6.0) * 1.5;                  /* last embers */
        c *= 1.0 + 0.25 * uFx[16] * breath;
        c += vec3(1.0, 0.9, 0.6) * uFx[19] * 0.25;
        c *= mix(1.0, 0.35 + 0.95 * day, uFx[20]);
        float vp = uTime * 0.8 + pos.y * 3.0;                                                 /* the three gunas shimmer through the veil */
        c = mix(c, 0.55 + 0.45 * vec3(sin(vp), sin(vp + 2.1), sin(vp + 4.2)), uFx[21] * 0.45);
        c += vec3(1.0, 0.92, 0.75) * uFx[18] * hp * 0.6;                                      /* the gathered point glows */
        c = mix(c, vec3(1.0), pow(aRand, 14.0) + f * 0.4);
        vColor = c;
        vAlpha = (0.5 + f * 0.4 + burst * 0.15) * (1.0 - hp * riseT * uFx[13] * 0.8) * (1.0 - hp * ashT * uFx[15] * 0.7) * (1.0 - uFx[20] * hp * (1.0 - day) * 0.85);
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = pow(smoothstep(0.5, 0.0, d), 1.8);
        gl_FragColor = vec4(vColor, a * vAlpha);
      }`,
  });
  const points = new THREE.Points(geo, material);
  scene.add(points);

  /* ---------- Chapter V: the cosmos resting in Krishna's palm ---------- */
  const faders = [];
  const fade = (m, base = 1) => { m.transparent = true; m.depthWrite = false; faders.push([m, base]); return m; };
  const glowTex = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,248,220,1)');
    gr.addColorStop(0.18, 'rgba(255,214,130,0.85)');
    gr.addColorStop(0.5, 'rgba(255,170,80,0.22)');
    gr.addColorStop(1, 'rgba(255,150,60,0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();

  const cosmos = new THREE.Group();
  cosmos.rotation.set(0.42, 0, -0.08); /* look at the orbital plane from slightly above */
  points.add(cosmos);
  cosmos.add(new THREE.Mesh(new THREE.SphereGeometry(0.15, 32, 16), fade(new THREE.MeshBasicMaterial({ color: '#fff4cf' }))));
  const glows = [[1.5, 1], [3.6, 0.35]].map(([s, o]) => {
    const sp = new THREE.Sprite(fade(new THREE.SpriteMaterial({ map: glowTex, color: '#ffd27a', blending: THREE.AdditiveBlending }), o));
    sp.scale.setScalar(s);
    cosmos.add(sp);
    return sp;
  });
  const sunLight = new THREE.PointLight('#ffe2a8', 0, 0, 0);
  cosmos.add(sunLight);
  const ambient = new THREE.AmbientLight('#5b6fd6', 0);
  scene.add(ambient);

  const planets = [
    [0.45, 0.032, '#c9c2b8', 1.7],
    [0.68, 0.05, '#e8c48a', 1.25],
    [0.92, 0.055, '#4f8cff', 0.95],
    [1.15, 0.042, '#e06a3c', 0.78],
    [1.45, 0.11, '#d9a46a', 0.5],
    [1.78, 0.09, '#e9d3a0', 0.36, true],
  ].map(([r, size, color, speed, ringed], i) => {
    const pivot = new THREE.Group();
    pivot.rotation.y = i * 1.7;
    const planet = new THREE.Mesh(new THREE.SphereGeometry(size, 24, 16), fade(new THREE.MeshStandardMaterial({ color, roughness: 0.8 })));
    planet.position.x = r;
    if (ringed) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(size * 1.35, size * 2.3, 48), fade(new THREE.MeshBasicMaterial({ color: '#e9d3a0', side: THREE.DoubleSide }), 0.65));
      ring.rotation.x = 1.25;
      planet.add(ring);
    }
    pivot.add(planet);
    cosmos.add(pivot);
    const orbit = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(Array.from({ length: 128 }, (_, k) => new THREE.Vector3(Math.cos((k / 128) * TAU) * r, 0, Math.sin((k / 128) * TAU) * r))),
      fade(new THREE.LineBasicMaterial({ color: '#ffe3a3', blending: THREE.AdditiveBlending }), 0.22)
    );
    cosmos.add(orbit);
    return { pivot, speed, base: i * 1.7 };
  });
  /* asteroid belt between the inner and outer planets */
  const belt = new Float32Array(900 * 3);
  for (let i = 0; i < 900; i++) {
    const a = rnd() * TAU, r = 1.27 + rnd() * 0.09;
    belt.set([Math.cos(a) * r, (rnd() - 0.5) * 0.03, Math.sin(a) * r], i * 3);
  }
  const beltGeo = new THREE.BufferGeometry();
  beltGeo.setAttribute('position', new THREE.BufferAttribute(belt, 3));
  const beltPts = new THREE.Points(beltGeo, fade(new THREE.PointsMaterial({ color: '#f3d9a6', size: 0.014, blending: THREE.AdditiveBlending }), 0.8));
  cosmos.add(beltPts);

  /* constellations drifting behind the scene */
  const sky = new THREE.Group();
  sky.position.z = -1.6;
  scene.add(sky);
  const constellations = [
    [[-2.5, 2.1], [-2.1, 1.8], [-1.6, 1.95], [-1.2, 1.6], [-0.8, 1.75], [-0.9, 1.3], [-1.3, 1.2]],
    [[2.0, 2.3], [2.4, 1.8], [2.2, 1.3], [2.7, 0.9], [1.9, 0.85]],
    [[-2.9, -2.4], [-2.4, -2.8], [-1.9, -2.5], [-2.1, -2.0], [-2.9, -2.4]],
    [[2.3, -2.3], [2.8, -2.7], [3.3, -2.4], [3.0, -1.9], [2.6, -2.0]],
  ];
  const segs = [], stars = [];
  constellations.forEach((c) => c.forEach(([x, y], k) => {
    stars.push(x, y, 0);
    if (k) segs.push(c[k - 1][0], c[k - 1][1], 0, x, y, 0);
  }));
  const segGeo = new THREE.BufferGeometry();
  segGeo.setAttribute('position', new THREE.Float32BufferAttribute(segs, 3));
  sky.add(new THREE.LineSegments(segGeo, fade(new THREE.LineBasicMaterial({ color: '#cfe3ff', blending: THREE.AdditiveBlending }), 0.28)));
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(stars, 3));
  sky.add(new THREE.Points(starGeo, fade(new THREE.PointsMaterial({ color: '#ffffff', size: 0.06, blending: THREE.AdditiveBlending }), 0.9)));

  function updateCosmos(w) {
    const on = w > 0.01;
    cosmos.visible = sky.visible = on;
    if (!on) return;
    faders.forEach(([m, base]) => { m.opacity = base * w; });
    sunLight.intensity = 3.2 * w;
    ambient.intensity = 0.5 * w;
    /* the cosmos rises into the palm as the chapter arrives */
    cosmos.position.set(-0.35, -0.8 + 0.75 * w, 0.3);
    cosmos.scale.setScalar(0.4 + 0.35 * w);
    planets.forEach((p) => { p.pivot.rotation.y = p.base + time * p.speed * 0.7; });
    beltPts.rotation.y = time * 0.12;
    const pulse = 1 + Math.sin(time * 2.2) * 0.04;
    glows[0].scale.setScalar(1.5 * pulse);
    glows[1].scale.setScalar(3.6 * pulse);
    sky.position.x = points.position.x;
    sky.rotation.z = Math.sin(time * 0.05) * 0.05;
  }

  /* ---------- Layout ---------- */
  let offsetX = 3.1, narrow = false;
  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    uniforms.uAspect.value = camera.aspect;
    const wide = innerWidth >= 900;
    /* keep the object beside the text column on wide screens, centred behind it on narrow ones */
    offsetX = wide ? Math.min(3.4, 3.73 * camera.aspect * 0.48) : 0;
    narrow = !wide;
  }
  resize();
  addEventListener('resize', resize);

  let anchors = [];
  const measure = () => { anchors = sections.map((s) => s.offsetTop + s.offsetHeight / 2); };
  measure();
  new ResizeObserver(measure).observe(document.body);

  const clamp01 = (x) => Math.max(0, Math.min(1, x));
  function scrollTarget() {
    const c = scrollY + innerHeight / 2;
    let i = 0;
    while (i < anchors.length - 2 && c >= anchors[i + 1]) i++;
    const t = clamp01((c - anchors[i]) / (anchors[i + 1] - anchors[i]));
    /* hold the shape while its chapter is centred, morph in the gap between chapters */
    return { i, t: clamp01((t - 0.25) / 0.5) };
  }

  let pair = -1;
  function setPair(i) {
    loadPair(shapes[shapeAt(i)], shapes[shapeAt(i + 1)]);
    pair = i;
  }
  /* Prologue cycles through its symbol list (captions in the markup); other chapters have one shape */
  const captions = [...document.querySelectorAll('.st-symbols li')].filter((li) => shapes[li.dataset.symbol]);
  const heroShapes = captions.length ? captions.map((li) => li.dataset.symbol) : [sections[0].dataset.shape];
  let heroIdx = 0, heroNext = 0, heroT = 0, heroMorph = -1;
  const HERO_HOLD = 4.2, HERO_MORPH = 2.4;
  const showCaption = (k) => captions.forEach((li, j) => { li.classList.toggle('active', j === k); li.hidden = j !== k; });
  const shapeAt = (i) => (i === 0 ? heroShapes[heroIdx] : sections[i].dataset.shape);
  function loadPair(a, b) {
    aFrom.array.set(a.pos); aColA.array.set(a.col);
    aTo.array.set(b.pos); aColB.array.set(b.col);
    aFrom.needsUpdate = aTo.needsUpdate = aColA.needsUpdate = aColB.needsUpdate = true;
  }
  const sideX = (i) => (sections[i].dataset.side === 'right' ? -offsetX : offsetX);

  /* ---------- Pointer ---------- */
  const mouse = new THREE.Vector2(9, 9), tilt = new THREE.Vector2();
  addEventListener('pointermove', (e) => {
    mouse.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    tilt.copy(mouse);
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { mouse.set(9, 9); tilt.set(0, 0); });

  /* ---------- Loop ---------- */
  const clock = new THREE.Clock();
  let introT = 0, prog = 0, spinZ = 0, time = 0;
  let canvasShown = false, lastOpacity = 1;
  canvas.style.opacity = '0';
  requestAnimationFrame(() => { canvas.style.opacity = '1'; canvasShown = true; });
  showCaption(0);

  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.05);
    time += dt;
    uniforms.uTime.value = time;
    uniforms.uMouse.value.lerp(mouse, 0.12);

    const target = scrollTarget();
    let p;
    if (pair === -1) {
      /* intro: a scattered cloud gathers into ॐ, unless the reader is already scrolling */
      introT = Math.min(1, introT + dt / 2.4);
      p = 1 - Math.pow(1 - introT, 3);
      if (introT >= 1 || target.i > 0 || target.t > 0.02) { setPair(target.i); prog = target.t; p = prog; }
    } else {
      const atHero = pair === 0 && target.i === 0 && target.t === 0 && prog < 0.01;
      if (heroMorph >= 0 && !atHero) {
        /* reader scrolled mid-morph: settle on whichever symbol was closer, then follow the scroll */
        if (heroMorph > 0.5) heroIdx = heroNext;
        heroMorph = -1; heroT = 0;
        showCaption(heroIdx);
        setPair(target.i);
        prog = 0;
      }
      if (atHero && heroShapes.length > 1) {
        heroT += dt;
        if (heroMorph < 0 && heroT > HERO_HOLD) {
          heroNext = (heroIdx + 1) % heroShapes.length;
          loadPair(shapes[heroShapes[heroIdx]], shapes[heroShapes[heroNext]]);
          heroMorph = 0;
          showCaption(heroNext);
        }
        if (heroMorph >= 0) {
          heroMorph = Math.min(1, heroMorph + dt / HERO_MORPH);
          if (heroMorph >= 1) { heroIdx = heroNext; heroMorph = -1; heroT = 0; setPair(0); }
        }
        p = heroMorph >= 0 ? heroMorph : 0;
      } else {
        if (target.i !== pair) {
          const delta = target.i - pair;
          setPair(target.i);
          prog = Math.abs(delta) === 1 ? clamp01(prog - delta) : target.t;
        }
        prog += (target.t - prog) * Math.min(1, dt * 5);
        p = prog;
      }
    }
    uniforms.uProgress.value = p;

    const cur = pair === -1 ? 0 : pair;
    const nxt = Math.min(cur + 1, sections.length - 1);
    const heroing = pair === -1 || heroMorph >= 0;
    const wA = heroing ? 1 : 1 - p, wB = heroing ? 0 : p;
    const heroW = cur === 0 ? wA : 0;
    const weight = (name) => (shapeAt(cur) === name ? wA : 0) + (shapeAt(nxt) === name ? wB : 0);

    /* Sudarshan Chakra spins; when it leaves, the rotation settles back to upright */
    /* fade each shloka's effect in, and the previous one out */
    const fxv = uniforms.uFx.value;
    for (let k = 0; k < FX.length; k++) fxv[k] += ((FX[k] === activeFx ? 1 : 0) - fxv[k]) * Math.min(1, dt * 2.5);
    /* Sudarshan Chakra (and the 'spin' shloka effect) turns; when it stops, the rotation settles back to upright */
    const wc = Math.max(weight('chakra'), fxv[SPIN]);
    const upright = Math.round(spinZ / TAU) * TAU;
    spinZ += dt * 1.8 * wc + (upright - spinZ) * 0.04 * (1 - wc);
    uniforms.uPulse.value = weight('neural');
    const wPalm = weight('palm');
    updateCosmos(wPalm);

    const x = sideX(cur) * wA + sideX(nxt) * wB;
    points.position.x += (x - points.position.x) * 0.06;
    /* phones: the prologue figures get their own stage above the text instead of sitting behind it */
    const y = narrow ? heroW * 1.75 : 0;
    points.position.y += (y - points.position.y) * 0.06;
    const sc = narrow ? 0.78 - 0.23 * heroW : 1;
    points.scale.setScalar(sc);
    const op = narrow ? 0.6 + 0.4 * heroW : 1;
    if (canvasShown && Math.abs(op - lastOpacity) > 0.02) { canvas.style.opacity = op.toFixed(2); lastOpacity = op; }
    /* flat drawings (palm, figures) foreshorten badly when swayed, so calm the sway for them */
    const flat = Math.min(1, wPalm + heroW * 0.6);
    points.rotation.set(-tilt.y * 0.15, (Math.sin(time * 0.25) * 0.35 + tilt.x * 0.25) * (1 - 0.75 * flat), spinZ);
    renderer.render(scene, camera);
  });
}

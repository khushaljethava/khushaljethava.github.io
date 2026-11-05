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

/* ---------- Chapter rail ---------- */
const sections = [...document.querySelectorAll('[data-shape]')];
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
  const roles = ['Machine Learning Engineer', 'Generative AI Specialist', 'LLM & RAG Developer', 'Computer Vision Engineer', 'AI Agent Builder'];
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

  const shapes = {
    om: sample2D(drawOm),
    flute: sample2D(drawFlute, 2.1),
    feather: sample2D(drawFeather, 2.6),
    chakra: sample2D(drawChakra, 2.2, 0.25),
    neural: neural(),
    palm: sample2D(drawPalm, 2.4, 0.12),
    lotus: sample2D(drawLotus, 2.6),
  };
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
  const aTo = new THREE.BufferAttribute(shapes.om.pos.slice(), 3);
  const aColA = new THREE.BufferAttribute(intro.col.slice(), 3);
  const aColB = new THREE.BufferAttribute(shapes.om.col.slice(), 3);
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
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      uniform float uTime, uProgress, uSize, uPixelRatio, uAspect, uPulse;
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
        pos += vec3(sin(uTime * 0.8 + pos.y * 2.0), cos(uTime * 0.6 + pos.x * 2.0), sin(uTime * 0.7 + pos.z * 2.0)) * 0.022;
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
        c = mix(c, vec3(1.0), pow(aRand, 14.0) + f * 0.4);
        vColor = c;
        vAlpha = 0.5 + f * 0.4 + burst * 0.15;
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
  let offsetX = 3.1;
  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    uniforms.uAspect.value = camera.aspect;
    const wide = innerWidth >= 900;
    /* keep the object beside the text column on wide screens, centred behind it on narrow ones */
    offsetX = wide ? Math.min(3.4, 3.73 * camera.aspect * 0.48) : 0;
    points.scale.setScalar(wide ? 1 : 0.78);
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
    const a = shapes[sections[i].dataset.shape], b = shapes[sections[i + 1].dataset.shape];
    aFrom.array.set(a.pos); aColA.array.set(a.col);
    aTo.array.set(b.pos); aColB.array.set(b.col);
    aFrom.needsUpdate = aTo.needsUpdate = aColA.needsUpdate = aColB.needsUpdate = true;
    pair = i;
  }
  const shapeAt = (i) => sections[i].dataset.shape;
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
  canvas.style.opacity = '0';
  requestAnimationFrame(() => { canvas.style.opacity = '1'; });

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
      if (target.i !== pair) {
        const delta = target.i - pair;
        setPair(target.i);
        prog = Math.abs(delta) === 1 ? clamp01(prog - delta) : target.t;
      }
      prog += (target.t - prog) * Math.min(1, dt * 5);
      p = prog;
    }
    uniforms.uProgress.value = p;

    const cur = pair === -1 ? 0 : pair;
    const nxt = Math.min(cur + 1, sections.length - 1);
    const wA = pair === -1 ? 1 : 1 - p, wB = pair === -1 ? 0 : p;
    const weight = (name) => (shapeAt(cur) === name ? wA : 0) + (shapeAt(nxt) === name ? wB : 0);

    /* Sudarshan Chakra spins; when it leaves, the rotation settles back to upright */
    const wc = weight('chakra');
    const upright = Math.round(spinZ / TAU) * TAU;
    spinZ += dt * 1.8 * wc + (upright - spinZ) * 0.04 * (1 - wc);
    uniforms.uPulse.value = weight('neural');
    const wPalm = weight('palm');
    updateCosmos(wPalm);

    const x = sideX(cur) * wA + sideX(nxt) * wB;
    points.position.x += (x - points.position.x) * 0.06;
    /* flat drawings (the palm) foreshorten badly when swayed, so calm the sway for them */
    points.rotation.set(-tilt.y * 0.15, (Math.sin(time * 0.25) * 0.35 + tilt.x * 0.25) * (1 - 0.75 * wPalm), spinZ);
    renderer.render(scene, camera);
  });
}

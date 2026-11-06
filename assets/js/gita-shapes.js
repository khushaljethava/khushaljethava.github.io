/* Gita Gyan scenes: one particle drawing per scene of Chapters 1 to 13.
   Loaded only on Gita chapter pages by story.js; each draw(g, S) paints a 512x512 canvas
   that story.js samples into particles (colour comes from the pixels). */
const TAU = Math.PI * 2;
const rnd = Math.random;
const line = (g, pts, w, c) => {
  g.strokeStyle = c; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(pts[0], pts[1]);
  for (let i = 2; i < pts.length; i += 2) g.lineTo(pts[i], pts[i + 1]);
  g.stroke();
};
const curve = (g, p, w, c) => {
  g.strokeStyle = c; g.lineWidth = w; g.lineCap = 'round';
  g.beginPath(); g.moveTo(p[0], p[1]); g.bezierCurveTo(p[2], p[3], p[4], p[5], p[6], p[7]); g.stroke();
};
const dot = (g, x, y, r, c) => { g.fillStyle = c; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); };
const fillPoly = (g, pts, c) => {
  g.fillStyle = c; g.beginPath(); g.moveTo(pts[0], pts[1]);
  for (let i = 2; i < pts.length; i += 2) g.lineTo(pts[i], pts[i + 1]);
  g.closePath(); g.fill();
};
const ring = (g, x, y, r, w, c, a0 = 0, a1 = TAU) => { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.arc(x, y, r, a0, a1); g.stroke(); };
const erase = (g, fn) => { g.globalCompositeOperation = 'destination-out'; fn(); g.globalCompositeOperation = 'source-over'; };
const drop = (g, x, y, s, c) => {
  g.fillStyle = c; g.beginPath(); g.moveTo(x, y - s);
  g.bezierCurveTo(x + s * 0.9, y - s * 0.1, x + s * 0.7, y + s * 0.8, x, y + s * 0.8);
  g.bezierCurveTo(x - s * 0.7, y + s * 0.8, x - s * 0.9, y - s * 0.1, x, y - s); g.fill();
};
const flame = (g, x, y, w, h, c1, c2) => {
  const gr = g.createLinearGradient(0, y, 0, y - h); gr.addColorStop(0, c1); gr.addColorStop(1, c2);
  g.fillStyle = gr; g.beginPath(); g.moveTo(x, y - h);
  g.bezierCurveTo(x + w, y - h * 0.45, x + w * 0.8, y, x, y);
  g.bezierCurveTo(x - w * 0.8, y, x - w, y - h * 0.45, x, y - h); g.fill();
};

/* ---------- Chapter 1 ---------- */

/* 1.1: Sanjaya's divine sight, the eye that sees the distant field */
export function drawDivyaDrishti(g, S) {
  const c = S / 2;
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * TAU, r0 = 150, r1 = 190 + (i % 3) * 26;
    line(g, [c + Math.cos(a) * r0, c + Math.sin(a) * r0 * 0.78, c + Math.cos(a) * r1, c + Math.sin(a) * r1 * 0.78], i % 3 ? 2.5 : 4, i % 2 ? '#f5c15c' : '#ffe7a8');
  }
  g.fillStyle = 'rgba(255, 240, 200, 0.9)';
  g.beginPath(); g.moveTo(c - 170, c);
  g.bezierCurveTo(c - 90, c - 110, c + 90, c - 110, c + 170, c);
  g.bezierCurveTo(c + 90, c + 110, c - 90, c + 110, c - 170, c); g.fill();
  const iris = g.createRadialGradient(c, c, 10, c, c, 66);
  iris.addColorStop(0, '#9ef3ea'); iris.addColorStop(0.6, '#19c3b4'); iris.addColorStop(1, '#2f56e0');
  g.fillStyle = iris; g.beginPath(); g.arc(c, c, 66, 0, TAU); g.fill();
  /* the battlefield seen in the iris: a tiny chariot wheel */
  erase(g, () => { ring(g, c, c, 34, 4, '#000'); for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU; line(g, [c, c, c + Math.cos(a) * 32, c + Math.sin(a) * 32], 2.5, '#000'); } });
  dot(g, c, c, 6, '#fff6dc');
  erase(g, () => { g.lineWidth = 5; g.beginPath(); g.moveTo(c - 170, c); g.bezierCurveTo(c - 90, c - 110, c + 90, c - 110, c + 170, c); g.stroke(); });
  curve(g, [c - 175, c, c - 90, c - 118, c + 90, c - 118, c + 175, c], 7, '#f5c15c');
  curve(g, [c - 175, c, c - 90, c + 114, c + 90, c + 114, c + 175, c], 5, '#f5c15c');
  dot(g, c, c - 128, 9, '#ff7a33'); /* tilak */
}

/* 1.1–1.11: two armies drawn up, facing each other across the field */
export function drawArmies(g, S) {
  line(g, [20, 330, 492, 330], 2, 'rgba(245, 193, 92, 0.6)');
  const army = (x0, x1, dir, body, flag) => {
    for (let row = 0; row < 4; row++) {
      const y = 300 - row * 34, sc = 1 - row * 0.16, step = 22 * sc;
      for (let x = x0; dir > 0 ? x < x1 : x > x1; x += dir * step) {
        const xx = x + (row % 2) * step * 0.5 * dir, h = 52 * sc;
        line(g, [xx, y, xx, y - h], 2.4 * sc, body);
        dot(g, xx, y - h * 0.55, 5 * sc, body);
        line(g, [xx + dir * 2, y - h, xx + dir * 2, y - h - 26 * sc], 1.6, '#e8ecf8');
        if (Math.round(x / step) % 5 === 0) fillPoly(g, [xx + dir * 2, y - h - 26 * sc, xx + dir * 22 * sc, y - h - 20 * sc, xx + dir * 2, y - h - 13 * sc], flag);
      }
    }
    /* chariot wheels at the front line */
    for (let k = 0; k < 4; k++) { const xx = x0 + dir * (24 + k * 46); ring(g, xx, 318, 13, 3, flag); line(g, [xx - 13, 318, xx + 13, 318], 2, flag); }
  };
  army(16, 222, 1, '#ff9a4d', '#ff4d6d');
  army(496, 292, -1, '#f5c15c', '#19c3b4');
  /* dust of the open ground between them */
  for (let i = 0; i < 60; i++) dot(g, 230 + rnd() * 52, 300 + rnd() * 30, 1.6, 'rgba(255, 231, 168, 0.8)');
}

/* 1.12–1.19: the conches named in the Gita sound one after another */
export function drawConchChorus(g, S) {
  const c = S / 2, n = 7;
  const conch = (x, y, a, big) => {
    g.save(); g.translate(x, y); g.rotate(a); const k = big ? 1.25 : 1;
    g.scale(k, k);
    const pearl = g.createLinearGradient(0, -20, 0, 20); pearl.addColorStop(0, '#fffaf0'); pearl.addColorStop(1, '#d9b98a');
    g.fillStyle = pearl;
    g.beginPath(); g.moveTo(-26, 0); g.bezierCurveTo(-22, -24, 18, -22, 40, -2); g.lineTo(40, 3); g.bezierCurveTo(16, 22, -22, 24, -26, 0); g.fill();
    [[-30, 13], [-40, 9], [-47, 6]].forEach(([dx, r]) => dot(g, dx, 0, r, '#fbf1dc'));
    erase(g, () => { for (let i = 0; i < 3; i++) curve(g, [-10 + i * 12, -15, -2 + i * 12, -4, -2 + i * 12, 6, -12 + i * 12, 15], 2.4, '#000'); });
    fillPoly(g, [38, -4, 50, 0, 38, 5], '#f5c15c');
    g.restore();
  };
  for (let k = 0; k < n; k++) {
    const a = Math.PI + (k / (n - 1)) * Math.PI, R = 186;
    const x = c + Math.cos(a) * R, y = 340 + Math.sin(a) * R * 0.85;
    conch(x, y, a + Math.PI, k === 3);
    for (let r = 0; r < 3; r++) ring(g, x, y, 40 + r * 15, 2.4, k % 2 ? 'rgba(25, 195, 180, 0.9)' : 'rgba(245, 193, 92, 0.9)', a + Math.PI - 0.5, a + Math.PI + 0.5);
  }
  for (let r = 0; r < 5; r++) ring(g, c, 340, 34 + r * 20, 3 - r * 0.4, r % 2 ? '#19c3b4' : '#f5c15c', Math.PI, TAU);
  dot(g, c, 340, 10, '#fff6dc');
}

/* 1.20–1.27: the field from above; Krishna drives the chariot into the middle */
export function drawFieldMap(g, S) {
  const grid = (y0, color) => { for (let r = 0; r < 5; r++) for (let x = 40; x <= 472; x += 18) dot(g, x + (r % 2) * 9, y0 + r * 16, 3, color); };
  grid(30, '#ff9a4d');
  grid(402, '#f5c15c');
  g.setLineDash([10, 12]); curve(g, [256, 396, 180, 350, 330, 330, 256, 300], 3, '#e8ecf8'); g.setLineDash([]);
  /* the chariot from above: body, two wheels, the Hanuman banner, four white horses */
  g.save(); g.translate(256, 250); g.scale(1.7, 1.7); g.translate(-256, -250);
  fillPoly(g, [234, 238, 278, 238, 284, 268, 228, 268], '#f5c15c');
  fillPoly(g, [222, 246, 230, 246, 230, 262, 222, 262], '#ffe7a8'); fillPoly(g, [282, 246, 290, 246, 290, 262, 282, 262], '#ffe7a8');
  line(g, [256, 238, 256, 222], 3, '#f5c15c'); line(g, [256, 222, 256, 196], 2, '#f5c15c');
  fillPoly(g, [256, 196, 288, 203, 256, 212], '#ff9a4d');
  for (let k = 0; k < 4; k++) { const x = 241 + k * 10; fillPoly(g, [x - 3, 236, x + 3, 236, x + 3, 214, x - 3, 214], '#e8ecf8'); dot(g, x, 211, 3.5, '#e8ecf8'); }
  g.restore();
  ring(g, 256, 252, 92, 2, 'rgba(25, 195, 180, 0.7)');
}

/* 1.28–1.47: the Gandiva on the ground, arrows scattered, a tear falling */
export function drawFallenBow(g, S) {
  line(g, [30, 380, 482, 380], 3, 'rgba(245, 193, 92, 0.55)');
  g.strokeStyle = '#f5c15c'; g.lineWidth = 9; g.lineCap = 'round';
  g.beginPath(); g.moveTo(80, 368); g.quadraticCurveTo(256, 300, 432, 368); g.stroke();
  curve(g, [80, 368, 150, 378, 360, 378, 432, 368], 2, '#fff3cf'); /* slack string */
  const arrows = [[130, 352, -0.25], [196, 362, 0.12], [262, 350, -0.08], [330, 360, 0.3], [380, 346, -0.4], [168, 340, 0.55]];
  arrows.forEach(([x, y, a]) => {
    g.save(); g.translate(x, y); g.rotate(a);
    line(g, [-48, 0, 46, 0], 3, '#fff3cf'); fillPoly(g, [46, -6, 62, 0, 46, 6], '#f5c15c');
    fillPoly(g, [-48, 0, -60, -7, -54, 0, -60, 7], '#ff6b6b');
    g.restore();
  });
  /* tipped quiver */
  g.save(); g.translate(420, 330); g.rotate(1.1); g.fillStyle = '#c98a3a'; g.fillRect(-12, -40, 24, 74); g.restore();
  drop(g, 256, 170, 30, '#45e3d3');
  drop(g, 226, 120, 13, 'rgba(69, 227, 211, 0.75)');
  drop(g, 288, 96, 9, 'rgba(69, 227, 211, 0.6)');
}

/* ---------- Chapter 2 ---------- */

/* 2.10 onward: Krishna's hand in jnana mudra, the teacher's gesture */
export function drawJnanaMudra(g, S) {
  const blue = '#6f93f5';
  for (let i = 0; i < 28; i++) { const a = (i / 28) * TAU; line(g, [256 + Math.cos(a) * 178, 236 + Math.sin(a) * 178, 256 + Math.cos(a) * 204, 236 + Math.sin(a) * 204], 3, i % 2 ? '#f5c15c' : '#ffe7a8'); }
  ring(g, 256, 236, 160, 3, '#f5c15c');
  const finger = (x0, y0, x1, y1, w) => line(g, [x0, y0, x1, y1], w, blue);
  /* palm */
  g.fillStyle = blue; g.beginPath(); g.moveTo(196, 268); g.bezierCurveTo(196, 230, 316, 226, 318, 262);
  g.lineTo(312, 352); g.bezierCurveTo(300, 390, 214, 392, 204, 352); g.closePath(); g.fill();
  /* middle, ring and little fingers raised */
  finger(254, 250, 258, 118, 30); finger(286, 256, 296, 138, 27); finger(312, 270, 330, 170, 23);
  /* index curled down to meet the thumb: the circle of jnana mudra */
  ring(g, 210, 250, 30, 22, blue, -2.4, 1.7);
  finger(198, 300, 182, 262, 26);
  erase(g, () => { dot(g, 210, 250, 12, '#000'); });
  /* wrist and bangle */
  g.fillStyle = blue; g.fillRect(212, 350, 92, 90);
  line(g, [206, 372, 310, 372], 14, '#f5c15c');
  for (let i = 0; i < 7; i++) dot(g, 214 + i * 15, 372, 3.5, '#ffe7a8');
  dot(g, 256, 300, 10, '#ff8fb1'); /* lotus mark on the palm */
}

/* 2.1–2.10: "I am your disciple": Arjuna kneels with folded hands */
export function drawNamaskar(g, S) {
  const skin = '#ffd08a', gold = '#f5c15c', cloth = '#ff9a4d';
  line(g, [70, 424, 450, 424], 2, 'rgba(245, 193, 92, 0.5)');
  /* the Gandiva laid on the ground before Krishna */
  g.strokeStyle = gold; g.lineWidth = 6; g.lineCap = 'round';
  g.beginPath(); g.moveTo(300, 418); g.quadraticCurveTo(380, 392, 456, 418); g.stroke();
  line(g, [300, 418, 456, 418], 1.5, '#fff3cf');
  /* kneeling: back shin flat on the ground, front knee raised */
  line(g, [178, 340, 150, 412, 96, 418], 22, skin);
  line(g, [206, 336, 258, 332, 262, 418], 21, skin);
  line(g, [262, 418, 284, 420], 10, skin);
  /* dhoti */
  g.fillStyle = cloth; g.beginPath(); g.moveTo(166, 290); g.lineTo(226, 290);
  g.bezierCurveTo(250, 310, 262, 330, 262, 346); g.lineTo(160, 352); g.bezierCurveTo(156, 330, 158, 306, 166, 290); g.fill();
  /* torso, leaning slightly forward */
  g.fillStyle = skin; g.beginPath(); g.moveTo(176, 200); g.lineTo(226, 196);
  g.bezierCurveTo(232, 236, 230, 266, 228, 292); g.lineTo(166, 292); g.bezierCurveTo(166, 260, 168, 230, 176, 200); g.fill();
  /* uttariya over the shoulder */
  curve(g, [180, 204, 150, 240, 160, 290, 132, 330], 6, gold);
  /* head bowed towards Krishna, with crown */
  g.save(); g.translate(214, 168); g.rotate(0.35);
  dot(g, 0, 0, 22, skin);
  fillPoly(g, [-22, -10, 22, -10, 16, -32, 9, -24, 0, -56, -9, -24, -16, -32], gold);
  dot(g, 0, -58, 4, gold);
  g.restore();
  /* folded hands (namaskar): forearms meet at the chest, palms pressed, fingertips up */
  line(g, [184, 214, 212, 254, 250, 240], 12, skin);
  line(g, [222, 210, 236, 250, 250, 240], 11, skin);
  g.fillStyle = skin; g.beginPath(); g.moveTo(244, 246); g.bezierCurveTo(240, 220, 252, 196, 262, 186);
  g.bezierCurveTo(268, 204, 266, 230, 258, 248); g.closePath(); g.fill();
  /* grace falling gently from above, not a beam */
  for (let i = 0; i < 40; i++) dot(g, 150 + rnd() * 160, 40 + rnd() * 90, 1.2 + rnd() * 2.2, 'rgba(255, 231, 168, 0.85)');
  ring(g, 214, 160, 56, 2, 'rgba(245, 193, 92, 0.6)');
}

/* 2.11–2.30: the Self as an undying flame. Weapons, fire, water and wind cannot reach it (2.23) */
export function drawAtmaFlame(g, S) {
  const c = 256;
  g.setLineDash([6, 10]); ring(g, c, 260, 104, 2.5, 'rgba(245, 193, 92, 0.8)'); g.setLineDash([]);
  flame(g, c, 300, 46, 150, '#ff9a4d', '#fff6dc');
  flame(g, c, 296, 22, 82, '#ffd27a', '#ffffff');
  /* the diya */
  g.fillStyle = '#c98a3a'; g.beginPath(); g.moveTo(196, 300); g.quadraticCurveTo(256, 360, 316, 300); g.closePath(); g.fill();
  line(g, [196, 300, 316, 300], 5, '#f5c15c');
  /* sword: top-left */
  g.save(); g.translate(100, 110); g.rotate(-0.75);
  fillPoly(g, [-5, -70, 5, -70, 6, 40, 0, 52, -6, 40], '#e8ecf8'); line(g, [-22, 40, 22, 40], 7, '#f5c15c'); line(g, [0, 44, 0, 68], 8, '#c98a3a');
  g.restore();
  /* fire: top-right */
  flame(g, 404, 150, 22, 70, '#ff4d6d', '#ffd166'); flame(g, 432, 158, 16, 50, '#ff4d6d', '#ffd166'); flame(g, 378, 160, 14, 44, '#ff4d6d', '#ffd166');
  /* water: bottom-left */
  drop(g, 96, 392, 24, '#4d7cf7'); drop(g, 132, 420, 16, '#45e3d3'); drop(g, 70, 434, 12, '#45e3d3');
  /* wind: bottom-right */
  [[396, 400, 34], [430, 430, 22]].forEach(([x, y, r]) => ring(g, x, y, r, 4, '#19c3b4', 0, Math.PI * 1.5));
  curve(g, [350, 448, 390, 446, 430, 452, 470, 440], 4, '#19c3b4');
}

/* 2.31–2.38: pleasure and pain, gain and loss, victory and defeat held level (2.38) */
export function drawScales(g, S) {
  const gold = '#f5c15c';
  line(g, [256, 96, 256, 420], 8, gold);
  fillPoly(g, [196, 440, 316, 440, 290, 418, 222, 418], gold);
  dot(g, 256, 92, 12, '#ffe7a8');
  line(g, [96, 130, 416, 130], 7, gold);
  const pan = (x, item) => {
    line(g, [x, 130, x - 52, 262], 2, '#ffe7a8'); line(g, [x, 130, x + 52, 262], 2, '#ffe7a8');
    g.fillStyle = gold; g.beginPath(); g.moveTo(x - 70, 262); g.quadraticCurveTo(x, 314, x + 70, 262); g.closePath(); g.fill();
    item(x, 240);
  };
  /* sun (joy, victory) and crescent moon (sorrow, defeat), perfectly level */
  pan(116, (x, y) => { dot(g, x, y, 22, '#ffb347'); for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; line(g, [x + Math.cos(a) * 28, y + Math.sin(a) * 28, x + Math.cos(a) * 38, y + Math.sin(a) * 38], 3, '#ffd166'); } });
  pan(396, (x, y) => { dot(g, x, y, 24, '#bcd2ff'); erase(g, () => dot(g, x + 12, y - 8, 21, '#000')); });
  dot(g, 256, 130, 10, '#ffe7a8');
}

/* 2.39–2.53: act, and let the fruit go (2.47). A tree releasing its fruit */
export function drawFruitTree(g, S) {
  const bark = '#c98a3a';
  /* roots */
  for (let i = -3; i <= 3; i++) curve(g, [256, 400, 256 + i * 20, 420, 256 + i * 40, 430, 256 + i * 62, 446], 4, bark);
  /* trunk and branches */
  fillPoly(g, [238, 404, 274, 404, 266, 250, 246, 250], bark);
  [[256, 270, 170, 190], [256, 262, 344, 186], [256, 252, 256, 150], [256, 290, 132, 250], [256, 286, 382, 246]].forEach(([x0, y0, x1, y1]) => line(g, [x0, y0, x1, y1], 10, bark));
  /* canopy */
  for (let i = 0; i < 70; i++) {
    const a = rnd() * TAU, r = Math.sqrt(rnd()) * 150;
    dot(g, 256 + Math.cos(a) * r * 1.1, 200 + Math.sin(a) * r * 0.62, 16 + rnd() * 12, `hsl(${135 + rnd() * 30}, 60%, ${32 + rnd() * 14}%)`);
  }
  /* fruit: some still hanging, some already let go and drifting down */
  [[190, 190], [320, 170], [240, 140], [150, 240], [362, 232]].forEach(([x, y]) => dot(g, x, y, 11, '#ff9a4d'));
  [[402, 300, 0.7], [430, 360, 0.55], [452, 420, 0.4]].forEach(([x, y, a]) => {
    dot(g, x, y, 10, `rgba(255, 154, 77, ${a + 0.25})`);
    line(g, [x - 16, y - 30, x - 4, y - 12], 2, `rgba(255, 231, 168, ${a})`);
  });
}

/* 2.54–2.61: like a tortoise drawing in its limbs, the wise withdraw the senses (2.58) */
export function drawTortoise(g, S) {
  const shell = g.createRadialGradient(256, 250, 20, 256, 260, 170);
  shell.addColorStop(0, '#d9b84a'); shell.addColorStop(0.6, '#4f9a55'); shell.addColorStop(1, '#2f6f4a');
  /* limbs, only just showing, half drawn in */
  [[150, 180], [362, 180], [150, 330], [362, 330]].forEach(([x, y]) => dot(g, x, y, 22, '#9ad18b'));
  g.fillStyle = '#9ad18b'; g.beginPath(); g.ellipse(256, 92, 26, 22, 0, 0, TAU); g.fill();
  dot(g, 256, 430, 8, '#9ad18b');
  /* shell, seen from above, with its plates */
  g.fillStyle = shell; g.beginPath(); g.ellipse(256, 256, 130, 160, 0, 0, TAU); g.fill();
  erase(g, () => {
    const hex = (x, y, r) => { g.lineWidth = 4; g.beginPath(); for (let k = 0; k <= 6; k++) { const a = (k / 6) * TAU + Math.PI / 6; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; k ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); };
    hex(256, 256, 40);
    [[256, 172], [256, 340], [184, 214], [328, 214], [184, 298], [328, 298]].forEach(([x, y]) => hex(x, y, 36));
  });
  g.strokeStyle = '#f5c15c'; g.lineWidth = 4; g.beginPath(); g.ellipse(256, 256, 130, 160, 0, 0, TAU); g.stroke();
}

/* 2.62–2.72: the ocean stays full and still while rivers keep pouring in (2.70) */
export function drawOcean(g, S) {
  /* mountains on the horizon */
  fillPoly(g, [20, 180, 90, 90, 150, 170, 210, 70, 290, 180], 'rgba(188, 210, 255, 0.75)');
  fillPoly(g, [250, 180, 330, 96, 392, 160, 450, 84, 500, 180], 'rgba(188, 210, 255, 0.6)');
  /* rivers winding down into the sea */
  [[90, 100, 120, 220, 60, 290, 150, 330], [210, 80, 250, 200, 200, 270, 250, 330], [330, 106, 300, 210, 360, 270, 320, 330], [450, 96, 470, 220, 400, 280, 420, 330]]
    .forEach((p) => curve(g, p, 6, '#45e3d3'));
  /* the calm ocean */
  for (let r = 0; r < 9; r++) {
    const y = 336 + r * 18, a = 1 - r * 0.07;
    g.strokeStyle = `rgba(${77 + r * 6}, ${124 + r * 6}, 247, ${a})`; g.lineWidth = 4; g.beginPath();
    for (let x = 0; x <= 512; x += 8) { const yy = y + Math.sin(x / 34 + r) * 3; x ? g.lineTo(x, yy) : g.moveTo(x, yy); }
    g.stroke();
  }
  /* full moon and its path on the water */
  dot(g, 400, 220, 26, '#fff1c9');
  for (let r = 0; r < 6; r++) line(g, [370 + r * 4, 344 + r * 20, 430 - r * 4, 344 + r * 20], 4, 'rgba(255, 241, 201, 0.8)');
}

/* ---------- Chapter 3 ---------- */
const cos = Math.cos, sin = Math.sin;

/* Chapter 3: the sun never stops working. A Konark sun wheel, rays all round */
export function drawSunWheel(g, S) {
  const c = 256;
  for (let i = 0; i < 48; i++) { const a = (i / 48) * TAU, r1 = 204 + (i % 2) * 34; line(g, [c + cos(a) * 178, c + sin(a) * 178, c + cos(a) * r1, c + sin(a) * r1], i % 2 ? 2.5 : 4.5, i % 2 ? '#ffd166' : '#ff9a4d'); }
  ring(g, c, c, 160, 16, '#f5c15c');
  ring(g, c, c, 138, 4, '#ffe7a8');
  for (let i = 0; i < 32; i++) { const a = (i / 32) * TAU; dot(g, c + cos(a) * 160, c + sin(a) * 160, 4, '#fff6dc'); }
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * TAU;
    line(g, [c + cos(a) * 32, c + sin(a) * 32, c + cos(a) * 138, c + sin(a) * 138], i % 2 ? 4 : 11, i % 2 ? '#ffe7a8' : '#f5c15c');
    if (!(i % 2)) dot(g, c + cos(a) * 90, c + sin(a) * 90, 10, '#ff9a4d');
  }
  dot(g, c, c, 32, '#ff9a4d'); ring(g, c, c, 32, 4, '#fff6dc'); dot(g, c, c, 11, '#fff6dc');
}

/* 3.1–3.8: no one stays still even for a moment; the three gunas braid every life into motion (3.5) */
export function drawGunaBraid(g, S) {
  const cols = ['#fff6dc', '#ff4d6d', '#5b7cff']; /* sattva, rajas, tamas */
  for (let k = 0; k < 3; k++) {
    const x = 256 + (k - 1) * 130;
    dot(g, x, 70, 28, cols[k]); ring(g, x, 70, 40, 2, cols[k]);
    const pts = [];
    for (let y = 70; y <= 470; y += 5) {
      const t = (y - 70) / 400, conv = Math.min(1, t * 3.2);
      pts.push(x * (1 - conv) + 256 * conv + conv * 52 * sin(y / 24 + (k * TAU) / 3), y);
    }
    line(g, pts, 13, cols[k]);
  }
  /* sparks thrown off by the braid: nothing in it is ever still */
  for (let i = 0; i < 50; i++) { const y = 200 + rnd() * 270; dot(g, 256 + (rnd() - 0.5) * 220, y, 1.5 + rnd() * 2, cols[i % 3]); }
}

/* 3.9–3.16: the wheel of yajna: action → offering → rain → grain → beings → action (3.14) */
export function drawYajnaChakra(g, S) {
  const c = 256, R = 186;
  g.setLineDash([12, 10]); ring(g, c, c, R, 3, 'rgba(245, 193, 92, 0.85)'); g.setLineDash([]);
  /* arrowheads, clockwise */
  for (let k = 0; k < 4; k++) {
    const a = -Math.PI / 4 + (k * TAU) / 4, x = c + cos(a) * R, y = c + sin(a) * R, t = a + Math.PI / 2;
    fillPoly(g, [x + cos(t) * 14, y + sin(t) * 14, x + cos(t + 2.5) * 12, y + sin(t + 2.5) * 12, x + cos(t - 2.5) * 12, y + sin(t - 2.5) * 12], '#f5c15c');
  }
  /* top: rain cloud */
  [[-26, 0, 22], [0, -12, 28], [26, 0, 22]].forEach(([dx, dy, r]) => dot(g, c + dx, 70 + dy, r, '#bcd2ff'));
  for (let i = 0; i < 6; i++) line(g, [c - 30 + i * 12, 100, c - 36 + i * 12, 122], 2.5, '#45e3d3');
  /* right: grain */
  for (let k = -1; k <= 1; k++) {
    const x = c + R + k * 16;
    line(g, [x, 300, x + k * 6, 214], 3, '#9ad18b');
    for (let j = 0; j < 5; j++) { g.fillStyle = '#ffd166'; g.beginPath(); g.ellipse(x + k * 6 - 6, 222 + j * 12, 6, 4, -0.6, 0, TAU); g.ellipse(x + k * 6 + 6, 222 + j * 12, 6, 4, 0.6, 0, TAU); g.fill(); }
  }
  /* bottom: beings */
  for (let k = -1; k <= 1; k++) { const x = c + k * 34, h = k ? 1 : 1.2; dot(g, x, 418 - 30 * h, 9 * h, '#ffd08a'); line(g, [x, 422 - 22 * h, x, 450], 9 * h, '#ff9a4d'); }
  /* left: the work, a hand-held ladle (sruva) */
  line(g, [c - R - 34, 216, c - R + 22, 284], 6, '#c98a3a'); dot(g, c - R + 26, 290, 14, '#f5c15c');
  /* centre: the fire altar, its smoke rising to become the cloud */
  fillPoly(g, [196, 330, 316, 330, 300, 306, 212, 306], '#c98a3a');
  fillPoly(g, [212, 306, 300, 306, 288, 288, 224, 288], '#e0a458');
  flame(g, c, 290, 30, 96, '#ff6a2b', '#ffe7a8'); flame(g, c - 24, 290, 14, 54, '#ff4d6d', '#ffd166'); flame(g, c + 24, 290, 14, 54, '#ff4d6d', '#ffd166');
  curve(g, [c, 186, c - 24, 160, c + 24, 140, c, 118], 4, 'rgba(232, 236, 248, 0.8)');
}

/* 3.17–3.26: whatever the best person does, others follow (3.21). One lamp lights the next */
export function drawDiyaChain(g, S) {
  const pts = [];
  for (let i = 0; i < 9; i++) { const t = i / 8; pts.push([96 + t * 330 + sin(t * 5) * 30, 410 - t * 300, 1 - t * 0.68]); }
  /* the flame passes from lamp to lamp */
  for (let i = 0; i < pts.length - 1; i++) { const [x0, y0, k0] = pts[i], [x1, y1, k1] = pts[i + 1]; curve(g, [x0, y0 - 70 * k0, x0 + 30, y0 - 110 * k0, x1 - 20, y1 - 80 * k1, x1, y1 - 46 * k1], 2, 'rgba(255, 209, 102, 0.75)'); }
  pts.forEach(([x, y, k], i) => {
    g.fillStyle = '#c98a3a'; g.beginPath(); g.moveTo(x - 38 * k, y); g.quadraticCurveTo(x, y + 40 * k, x + 38 * k, y); g.closePath(); g.fill();
    line(g, [x - 38 * k, y, x + 38 * k, y], 4 * k + 1, '#f5c15c');
    flame(g, x, y - 2, 16 * k + 3, 62 * k + 10, i ? '#ff9a4d' : '#ff6a2b', '#fff6dc');
  });
  /* the first lamp burns brightest: it set the example */
  ring(g, pts[0][0], pts[0][1] - 34, 64, 2, 'rgba(255, 231, 168, 0.7)');
}

/* 3.27–3.35: the gunas pull the strings, and the ego says "I am the doer" (3.27) */
export function drawPuppet(g, S) {
  const skin = '#ffd08a', gold = '#f5c15c', cols = ['#fff6dc', '#ff4d6d', '#5b7cff'];
  /* the control bar, held from above */
  line(g, [150, 60, 362, 60], 9, gold); line(g, [256, 30, 256, 100], 9, gold);
  /* the puppet, mid-dance */
  const head = [256, 176], handL = [150, 236], handR = [370, 196], kneeL = [214, 380], kneeR = [312, 352];
  const anchors = [[150, 60], [362, 60], [256, 100], [190, 60], [330, 60]];
  [[anchors[0], handL], [anchors[1], handR], [anchors[2], head], [anchors[3], kneeL], [anchors[4], kneeR]].forEach(([a, b], i) => line(g, [a[0], a[1], b[0], b[1] - (i === 2 ? 30 : 0)], 1.6, cols[i % 3]));
  line(g, [256, 206, 256, 300], 22, '#ff9a4d');                     /* body */
  line(g, [244, 222, 196, 250, handL[0], handL[1]], 9, skin);       /* arms */
  line(g, [268, 222, 320, 214, handR[0], handR[1]], 9, skin);
  line(g, [248, 300, kneeL[0], kneeL[1], 190, 444], 11, skin);      /* legs */
  line(g, [264, 300, kneeR[0], kneeR[1], 338, 430], 11, skin);
  fillPoly(g, [228, 280, 284, 280, 300, 330, 212, 330], '#ff9a4d'); /* dhoti */
  dot(g, head[0], head[1], 26, skin);
  /* the crown of ego, a little too big */
  fillPoly(g, [222, 160, 290, 160, 300, 112, 280, 132, 256, 96, 232, 132, 212, 112], gold);
  dot(g, 256, 96, 6, '#ff4d6d');
  for (let i = 0; i < 3; i++) curve(g, [130 + i * 8, 300 + i * 30, 110, 320 + i * 30, 104, 290 + i * 30, 88, 310 + i * 30], 2, 'rgba(255, 231, 168, 0.6)'); /* the dance */
}

/* 3.36–3.43: wisdom veiled by desire, as fire by smoke, a mirror by dust, a child by the womb (3.38) */
export function drawVeiledFire(g, S) {
  /* fire wrapped in smoke */
  flame(g, 256, 230, 46, 150, '#ff6a2b', '#ffe7a8'); flame(g, 256, 226, 20, 78, '#ffd27a', '#ffffff');
  for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.42, r = 92 + (i % 2) * 14; ring(g, 256 + cos(a) * r * 0.9, 170 + sin(a) * r * 0.75, 30 + (i % 3) * 6, 6, 'rgba(170, 176, 196, 0.85)', 0, Math.PI * 1.4); }
  /* mirror half-hidden by dust */
  const mx = 130, my = 372;
  ring(g, mx, my, 62, 9, '#f5c15c'); line(g, [mx, my + 70, mx, my + 116], 10, '#c98a3a');
  g.fillStyle = 'rgba(188, 210, 255, 0.9)'; g.beginPath(); g.arc(mx, my, 56, 0, TAU); g.fill();
  for (let i = 0; i < 140; i++) { const a = rnd() * TAU, r = Math.sqrt(rnd()) * 56; if (cos(a) < 0.2) dot(g, mx + cos(a) * r, my + sin(a) * r, 2.2, 'rgba(150, 120, 90, 0.95)'); }
  /* the unborn child, curled inside the womb */
  const wx = 384, wy = 380;
  g.fillStyle = 'rgba(255, 143, 177, 0.85)'; g.beginPath(); g.ellipse(wx, wy, 62, 76, 0.2, 0, TAU); g.fill();
  erase(g, () => { g.beginPath(); g.ellipse(wx, wy, 50, 64, 0.2, 0, TAU); g.fill(); });
  dot(g, wx + 6, wy - 26, 20, '#ffd08a');
  ring(g, wx - 2, wy + 10, 30, 14, '#ffd08a', -0.6, 2.6);
  dot(g, wx + 6, wy - 26, 4, '#fff6dc');
}

/* ---------- Chapter 4 ---------- */

/* Chapter 4 (4.42): with the sword of knowledge, cut the knot of doubt and stand up */
export function drawJnanaSword(g, S) {
  /* the knot of doubt, already cut in two */
  const knot = (cx, sx) => {
    g.strokeStyle = 'rgba(177, 120, 255, 0.85)'; g.lineWidth = 3; g.beginPath(); g.moveTo(cx, 256);
    for (let i = 0; i < 26; i++) { const a = rnd() * TAU, r = 30 + rnd() * 70; g.quadraticCurveTo(cx + sx * rnd() * 90, 256 + (rnd() - 0.5) * 140, cx + cos(a) * r * 0.6 + sx * 30, 256 + sin(a) * r); }
    g.stroke();
  };
  knot(176, -1); knot(336, 1);
  /* loose ends falling away */
  curve(g, [196, 330, 190, 380, 160, 400, 150, 450], 3, 'rgba(177, 120, 255, 0.6)');
  curve(g, [316, 330, 322, 380, 352, 400, 362, 450], 3, 'rgba(177, 120, 255, 0.6)');
  /* the blade of light */
  const blade = g.createLinearGradient(0, 40, 0, 400); blade.addColorStop(0, '#ffffff'); blade.addColorStop(1, '#9ef3ea');
  g.fillStyle = blade; g.beginPath(); g.moveTo(256, 30); g.lineTo(272, 80); g.lineTo(270, 390); g.lineTo(242, 390); g.lineTo(240, 80); g.closePath(); g.fill();
  line(g, [256, 60, 256, 380], 2, '#19c3b4');
  line(g, [200, 396, 312, 396], 12, '#f5c15c'); dot(g, 200, 396, 9, '#ffe7a8'); dot(g, 312, 396, 9, '#ffe7a8');
  line(g, [256, 404, 256, 462], 14, '#c98a3a'); dot(g, 256, 470, 11, '#f5c15c');
  for (let i = 0; i < 18; i++) { const a = (i / 18) * TAU; line(g, [256 + cos(a) * 24, 220 + sin(a) * 24, 256 + cos(a) * 44, 220 + sin(a) * 44], 2, '#fff6dc'); }
}

/* 4.1–4.3: handed down: the sun to Manu, Manu to Ikshvaku, and lost over time (4.2) */
export function drawLineage(g, S) {
  dot(g, 256, 70, 34, '#ffb347');
  for (let i = 0; i < 16; i++) { const a = (i / 16) * TAU; line(g, [256 + cos(a) * 42, 70 + sin(a) * 42, 256 + cos(a) * 58, 70 + sin(a) * 58], 3, '#ffd166'); }
  const sage = (x, y, k) => {
    dot(g, x, y, 18 * k, '#ffd08a');
    fillPoly(g, [x - 16 * k, y - 10 * k, x + 16 * k, y - 10 * k, x + 11 * k, y - 34 * k, x, y - 24 * k, x - 11 * k, y - 34 * k], '#f5c15c');
    g.fillStyle = '#ff9a4d'; g.beginPath(); g.ellipse(x, y + 40 * k, 30 * k, 22 * k, 0, Math.PI, TAU); g.fill();
  };
  const nodes = [[256, 70], [150, 196, 1], [362, 300, 0.9], [200, 410, 0.8]];
  /* the thread of teaching thins out with time */
  for (let i = 0; i < 3; i++) {
    const [x0, y0] = nodes[i], [x1, y1] = nodes[i + 1];
    g.setLineDash([14 - i * 3, 6 + i * 12]); line(g, [x0, y0 + 40, x1, y1 - 40], 5 - i, '#ffe7a8'); g.setLineDash([]);
  }
  nodes.slice(1).forEach(([x, y, k]) => sage(x, y, k));
  /* and given again, today: a small chariot banner at the end of the line */
  line(g, [340, 470, 340, 400], 3, '#f5c15c'); fillPoly(g, [340, 400, 384, 410, 340, 424], '#ff9a4d');
  curve(g, [230, 440, 270, 470, 300, 470, 334, 450], 4, 'rgba(255, 231, 168, 0.9)');
}

/* 4.4–4.10: whenever dharma declines, I come forth, age after age (4.7–8). The ten avatars around a descending light */
export function drawAvatara(g, S) {
  const c = 256, R = 184, gold = '#f5c15c', soft = '#ffe7a8';
  /* the light descending into a lotus */
  const beam = g.createLinearGradient(0, 0, 0, 290); beam.addColorStop(0, 'rgba(255, 246, 220, 0)'); beam.addColorStop(1, 'rgba(255, 246, 220, 0.95)');
  g.fillStyle = beam; fillPoly(g, [236, 0, 276, 0, 296, 286, 216, 286], beam);
  for (let k = 0; k < 8; k++) { const a = Math.PI + (k / 7) * Math.PI; g.fillStyle = k % 2 ? '#ff8fb1' : '#ffb3c8'; g.beginPath(); g.ellipse(c + cos(a) * 40, 300 + sin(a) * 24, 30, 11, a, 0, TAU); g.fill(); }
  dot(g, c, 290, 14, '#fff6dc');
  const icons = [
    (x, y) => { g.fillStyle = '#45e3d3'; g.beginPath(); g.ellipse(x, y, 22, 10, 0, 0, TAU); g.fill(); fillPoly(g, [x + 18, y, x + 34, y - 12, x + 34, y + 12], '#45e3d3'); },           /* Matsya */
    (x, y) => { g.fillStyle = '#9ad18b'; g.beginPath(); g.arc(x, y + 6, 22, Math.PI, TAU); g.fill(); dot(g, x + 26, y + 2, 6, '#9ad18b'); },                                                   /* Kurma */
    (x, y) => { ring(g, x, y, 20, 6, soft, 0.3, Math.PI - 0.3); dot(g, x, y - 6, 12, '#5b7cff'); },                                                                                           /* Varaha lifting the earth */
    (x, y) => { dot(g, x, y, 13, '#ffb347'); for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; line(g, [x + cos(a) * 15, y + sin(a) * 15, x + cos(a) * 26, y + sin(a) * 26], 4, '#ff9a4d'); } }, /* Narasimha */
    (x, y) => { g.fillStyle = gold; g.beginPath(); g.arc(x, y, 24, Math.PI, TAU); g.fill(); line(g, [x, y, x, y + 26], 3, soft); },                                                              /* Vamana's umbrella */
    (x, y) => { line(g, [x - 16, y + 22, x + 12, y - 18], 4, '#c98a3a'); fillPoly(g, [x + 4, y - 26, x + 26, y - 18, x + 18, y + 2], '#e8ecf8'); },                                           /* Parashurama's axe */
    (x, y) => { ring(g, x + 10, y, 26, 4, gold, Math.PI / 2 + 0.3, (3 * Math.PI) / 2 - 0.3); line(g, [x + 10 + cos(Math.PI / 2 + 0.3) * 26, y + sin(Math.PI / 2 + 0.3) * 26, x + 10 + cos(1.5 * Math.PI - 0.3) * 26, y + sin(1.5 * Math.PI - 0.3) * 26], 1.5, soft); }, /* Rama's bow */
    (x, y) => { line(g, [x - 20, y - 20, x + 6, y + 18, x + 24, y + 18], 5, '#c98a3a'); },                                                                                                    /* Balarama's plough */
    (x, y) => { line(g, [x - 26, y + 8, x + 26, y - 8], 5, '#ffd166'); g.fillStyle = '#21b37c'; g.beginPath(); g.ellipse(x + 20, y - 22, 7, 14, 0.4, 0, TAU); g.fill(); dot(g, x + 21, y - 24, 4, '#5b7cff'); }, /* Krishna's flute and feather */
    (x, y) => { fillPoly(g, [x - 4, y - 28, x + 4, y - 28, x + 4, y + 12, x, y + 18, x - 4, y + 12], '#e8ecf8'); line(g, [x - 12, y + 14, x + 12, y + 14], 4, gold); },                         /* Kalki's sword */
  ];
  icons.forEach((draw, i) => { const a = -Math.PI / 2 + 0.5 + (i / (icons.length - 1)) * (TAU - 1); /* leave the top open for the descending light */ draw(c + cos(a) * R, c + sin(a) * R); });
  ring(g, c, c, R + 44, 2, 'rgba(245, 193, 92, 0.55)');
}

/* 4.11–4.15: however people come to me, so I receive them (4.11). Many paths, one centre */
export function drawAllPaths(g, S) {
  const c = 256;
  for (let k = 0; k < 12; k++) {
    const a0 = (k / 12) * TAU, turn = (k % 2 ? 1 : -1) * (1.2 + (k % 3) * 0.5), col = `hsl(${(k * 30 + 20) % 360}, 85%, 68%)`;
    const pts = [];
    for (let t = 0; t <= 1.001; t += 0.02) { const r = 236 * (1 - t) + 26 * t, a = a0 + turn * t + 0.05 * sin(t * 6 + k); pts.push(c + cos(a) * r, c + sin(a) * r); }
    line(g, pts, 3.5, col);
    /* a traveller on each path, each at a different point of the journey */
    const t = 0.2 + ((k * 7) % 12) / 16, r = 236 * (1 - t) + 26 * t, a = a0 + turn * t + 0.05 * sin(t * 6 + k);
    dot(g, c + cos(a) * r, c + sin(a) * r, 7, '#fff6dc');
  }
  dot(g, c, c, 26, '#fff6dc'); ring(g, c, c, 38, 3, '#f5c15c');
}

/* 4.16–4.23: inaction in action (4.18). The potter's wheel whirls; its centre does not move */
export function drawStillHub(g, S) {
  const c = 256;
  for (let i = 0; i < 26; i++) {
    const r = 70 + i * 7, a0 = rnd() * TAU, len = 0.6 + rnd() * 1.6;
    ring(g, c, c, r, 3 + (i % 3), `hsl(${22 + (i % 4) * 6}, 70%, ${52 + (i % 3) * 8}%)`, a0, a0 + len);
  }
  /* motion streaks at the rim */
  for (let i = 0; i < 10; i++) { const a = (i / 10) * TAU; ring(g, c, c, 250, 2, 'rgba(255, 231, 168, 0.7)', a, a + 0.35); }
  /* the still centre */
  ring(g, c, c, 54, 3, '#fff6dc');
  dot(g, c, c, 22, '#fff6dc');
  for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU; g.fillStyle = 'rgba(255, 246, 220, 0.8)'; g.beginPath(); g.ellipse(c + cos(a) * 36, c + sin(a) * 36, 10, 4, a, 0, TAU); g.fill(); }
}

/* 4.24–4.33: brahmarpanam (4.24): the ladle, the ghee, the fire are all Brahman. And the many offerings */
export function drawYajnaLadle(g, S) {
  /* the ladle, tilted, pouring a stream of ghee */
  line(g, [460, 70, 320, 196], 9, '#c98a3a');
  g.fillStyle = '#f5c15c'; g.beginPath(); g.ellipse(306, 210, 30, 18, -0.7, 0, TAU); g.fill();
  for (let i = 0; i < 9; i++) dot(g, 290 - i * 3, 236 + i * 12, 5 - i * 0.25, '#ffe7a8');
  /* the fire altar */
  fillPoly(g, [160, 420, 352, 420, 330, 384, 182, 384], '#c98a3a');
  fillPoly(g, [182, 384, 330, 384, 314, 360, 198, 360], '#e0a458');
  flame(g, 256, 362, 56, 140, '#ff6a2b', '#ffe7a8'); flame(g, 214, 362, 22, 74, '#ff4d6d', '#ffd166'); flame(g, 298, 362, 22, 74, '#ff4d6d', '#ffd166');
  /* the many offerings (4.26–4.29): wealth, study, breath, the senses */
  [[70, 120], [86, 108], [102, 120]].forEach(([x, y]) => { ring(g, x, y, 12, 4, '#ffd166'); dot(g, x, y, 4, '#ffd166'); });
  g.fillStyle = '#e0c48c'; g.fillRect(40, 240, 96, 30); for (let i = 0; i < 3; i++) line(g, [48, 248 + i * 8, 128, 248 + i * 8], 1.5, '#8a5a2b');
  for (let i = 0; i < 2; i++) ring(g, 440 + i * 8, 300, 26 - i * 12, 4, '#19c3b4', 0, Math.PI * 1.6);
  curve(g, [400, 330, 430, 336, 460, 330, 490, 340], 3, '#19c3b4');
  g.fillStyle = '#fff6dc'; g.beginPath(); g.moveTo(52, 380); g.quadraticCurveTo(90, 350, 128, 380); g.quadraticCurveTo(90, 410, 52, 380); g.fill();
  dot(g, 90, 380, 12, '#5b7cff');
  /* every offering travels into the one fire */
  [[100, 140, 200, 300], [136, 256, 196, 330], [420, 310, 320, 330], [128, 380, 186, 372]].forEach(([x0, y0, x1, y1]) => { g.setLineDash([4, 10]); line(g, [x0, y0, x1, y1], 2, 'rgba(255, 231, 168, 0.7)'); g.setLineDash([]); });
}

/* 4.34–4.42: the boat of knowledge crosses every wrong (4.36); its lamp is the fire that turns karma to ash (4.37) */
export function drawJnanaBoat(g, S) {
  /* dark, choppy water */
  for (let r = 0; r < 7; r++) {
    const y = 330 + r * 24;
    g.strokeStyle = `rgba(${120 - r * 8}, ${90 + r * 6}, ${220 - r * 10}, ${0.95 - r * 0.08})`; g.lineWidth = 4; g.beginPath();
    for (let x = 0; x <= 512; x += 6) { const yy = y + Math.abs(sin(x / 22 + r * 1.7)) * -14; x ? g.lineTo(x, yy) : g.moveTo(x, yy); }
    g.stroke();
  }
  /* the hull */
  g.fillStyle = '#f5c15c'; g.beginPath(); g.moveTo(130, 300); g.quadraticCurveTo(256, 380, 382, 300); g.lineTo(350, 300); g.quadraticCurveTo(256, 346, 162, 300); g.closePath(); g.fill();
  fillPoly(g, [130, 300, 110, 270, 140, 296], '#f5c15c'); fillPoly(g, [382, 300, 402, 270, 372, 296], '#f5c15c');
  /* mast and a sail made of light */
  line(g, [256, 320, 256, 92], 5, '#c98a3a');
  const sail = g.createLinearGradient(0, 100, 0, 290); sail.addColorStop(0, '#ffffff'); sail.addColorStop(1, '#9ef3ea');
  g.fillStyle = sail; g.beginPath(); g.moveTo(264, 100); g.quadraticCurveTo(360, 190, 352, 286); g.lineTo(264, 286); g.closePath(); g.fill();
  /* the lamp at the prow: the fire of knowledge */
  flame(g, 156, 286, 14, 52, '#ff6a2b', '#fff6dc');
  ring(g, 156, 260, 30, 2, 'rgba(255, 231, 168, 0.7)');
  /* the far shore and a guiding star */
  line(g, [404, 330, 512, 316], 3, 'rgba(158, 243, 234, 0.7)');
  dot(g, 430, 80, 7, '#fff6dc');
  for (let i = 0; i < 4; i++) { const a = (i / 4) * TAU; line(g, [430 + cos(a) * 10, 80 + sin(a) * 10, 430 + cos(a) * 24, 80 + sin(a) * 24], 2, '#fff6dc'); }
}

/* ---------- Chapter 5 ---------- */

/* Chapter 5 (5.10): like a lotus leaf, water beads on it and rolls off; it never gets wet */
export function drawLotusLeaf(g, S) {
  for (let r = 0; r < 4; r++) { g.strokeStyle = `rgba(69, 227, 211, ${0.75 - r * 0.15})`; g.lineWidth = 2.5; g.beginPath(); g.ellipse(256, 372, 180 + r * 36, 44 + r * 12, 0, 0, TAU); g.stroke(); }
  const leaf = g.createRadialGradient(256, 250, 10, 256, 260, 200); leaf.addColorStop(0, '#9ad18b'); leaf.addColorStop(1, '#2f8f5a');
  g.fillStyle = leaf; g.beginPath(); g.ellipse(256, 260, 204, 122, 0, 0, TAU); g.fill();
  erase(g, () => {
    fillPoly(g, [256, 260, 462, 242, 462, 280], '#000');
    for (let i = 0; i < 14; i++) { const a = (i / 14) * TAU + 0.2; line(g, [256, 260, 256 + cos(a) * 196, 260 + sin(a) * 116], 2, '#000'); }
  });
  /* drops bead up and never soak in */
  [[196, 228, 17], [304, 286, 23], [236, 306, 12], [334, 216, 11], [166, 292, 9], [282, 196, 8]].forEach(([x, y, r]) => { dot(g, x, y, r, '#4d9cff'); dot(g, x - r * 0.35, y - r * 0.35, r * 0.3, '#ffffff'); });
  drop(g, 452, 330, 15, '#45e3d3');  /* one rolling off the edge */
  drop(g, 470, 380, 8, 'rgba(69, 227, 211, 0.7)');
  line(g, [104, 400, 92, 236], 4, '#2f8f5a');
  g.fillStyle = '#ff8fb1'; g.beginPath(); g.moveTo(92, 168); g.quadraticCurveTo(128, 214, 92, 242); g.quadraticCurveTo(56, 214, 92, 168); g.fill();
}

/* 5.1–5.6: renunciation and the yoga of action are one; whoever sees this, sees (5.5). Two rivers, one water */
export function drawTwoRivers(g, S) {
  fillPoly(g, [16, 160, 100, 40, 184, 160], 'rgba(188, 210, 255, 0.8)');
  fillPoly(g, [328, 160, 412, 40, 496, 160], 'rgba(255, 209, 102, 0.75)');
  curve(g, [100, 80, 110, 210, 200, 236, 252, 300], 14, '#5b9cff');
  curve(g, [412, 80, 402, 210, 312, 236, 260, 300], 14, '#ffd166');
  curve(g, [256, 300, 226, 350, 286, 400, 256, 448], 28, '#9ef3ea');
  for (let i = 0; i < 5; i++) curve(g, [246 + i * 5, 310, 222 + i * 5, 352, 280 + i * 3, 398, 252 + i * 2, 440], 1.5, '#ffffff');
  dot(g, 256, 470, 22, '#fff6dc');
  for (let i = 0; i < 12; i++) { const a = Math.PI + (i / 11) * Math.PI; line(g, [256 + cos(a) * 30, 470 + sin(a) * 30, 256 + cos(a) * 48, 470 + sin(a) * 48], 3, '#ffe7a8'); }
}

/* 5.7–5.13: the embodied one rests in the city of nine gates, neither acting nor causing action (5.13) */
export function drawNineGates(g, S) {
  const c = 256, R = 184;
  for (let i = 0; i < 9; i++) {
    const ag = -Math.PI / 2 + (i / 9) * TAU, a0 = ag + 0.17, a1 = ag + TAU / 9 - 0.17;
    ring(g, c, c, R, 24, '#c98a3a', a0, a1);
    ring(g, c, c, R + 16, 3, '#f5c15c', a0, a1);
    const am = (a0 + a1) / 2; dot(g, c + cos(am) * (R + 22), c + sin(am) * (R + 22), 7, '#f5c15c'); /* turret */
    /* the senses flow in and out through each gate */
    for (let k = 0; k < 4; k++) dot(g, c + cos(ag) * (R - 40 + k * 26), c + sin(ag) * (R - 40 + k * 26), 4 - k * 0.6, 'rgba(255, 231, 168, 0.9)');
  }
  /* the dweller, at peace in the middle */
  g.setLineDash([5, 9]); ring(g, c, c, 84, 2, 'rgba(158, 243, 234, 0.8)'); g.setLineDash([]);
  g.fillStyle = '#c98a3a'; g.beginPath(); g.moveTo(206, 284); g.quadraticCurveTo(256, 330, 306, 284); g.closePath(); g.fill();
  flame(g, c, 284, 26, 104, '#ff9a4d', '#fff6dc');
}

/* 5.14–5.17: knowledge covered by ignorance; when ignorance goes, it shines like the sun (5.15–16) */
export function drawEclipse(g, S) {
  const c = 256;
  for (let i = 0; i < 90; i++) { const a = (i / 90) * TAU, r1 = 150 + rnd() * 80; line(g, [c + cos(a) * 118, c + sin(a) * 118, c + cos(a) * r1, c + sin(a) * r1], 1.5 + rnd() * 2, i % 3 ? 'rgba(255, 209, 102, 0.8)' : 'rgba(255, 246, 220, 0.9)'); }
  dot(g, c, c, 118, '#ffd166');
  erase(g, () => dot(g, c - 14, c + 6, 112, '#000'));  /* the veil slides away */
  /* the diamond: the first point of light breaking through */
  const x = c + 100, y = c - 52;
  dot(g, x, y, 14, '#ffffff');
  for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU, r = i % 2 ? 26 : 56; line(g, [x, y, x + cos(a) * r, y + sin(a) * r], i % 2 ? 2 : 3.5, '#fff6dc'); }
}

/* 5.18–5.23: the wise see with an equal eye the learned, a cow, an elephant, a dog and an outcaste (5.18) */
export function drawSamaDarshi(g, S) {
  const col = '#ffd08a', ground = 410;
  line(g, [20, ground, 492, ground], 2, 'rgba(245, 193, 92, 0.5)');
  /* one light, equal rays to all */
  dot(g, 256, 70, 24, '#fff6dc'); ring(g, 256, 70, 36, 2, '#f5c15c');
  const tops = [[66, 270], [158, 314], [272, 250], [386, 344], [458, 280]];
  tops.forEach(([x, y]) => { g.setLineDash([6, 8]); line(g, [256, 100, x, y - 20], 1.5, 'rgba(255, 231, 168, 0.75)'); g.setLineDash([]); });
  const person = (x, top, extra) => { dot(g, x, top + 14, 13, col); line(g, [x, top + 30, x, ground - 54], 14, col); line(g, [x - 5, ground - 54, x - 12, ground], 7, col); line(g, [x + 5, ground - 54, x + 12, ground], 7, col); extra(x, top); };
  person(66, 270, (x, t) => { dot(g, x, t - 2, 5, col); g.fillStyle = '#ff9a4d'; g.fillRect(x + 8, t + 46, 22, 16); }); /* scholar with topknot and book */
  /* cow */
  g.fillStyle = col; g.beginPath(); g.ellipse(158, 350, 46, 24, 0, 0, TAU); g.fill();
  [134, 146, 170, 182].forEach((x) => line(g, [x, 368, x, ground], 6, col));
  dot(g, 112, 330, 14, col); line(g, [104, 318, 96, 304], 3, col); line(g, [120, 318, 128, 304], 3, col);
  curve(g, [204, 344, 216, 360, 212, 380, 218, 392], 3, col);
  /* elephant */
  g.beginPath(); g.ellipse(276, 316, 66, 50, 0, 0, TAU); g.fill();
  [236, 258, 294, 316].forEach((x) => line(g, [x, 350, x, ground], 16, col));
  dot(g, 212, 300, 34, col);
  curve(g, [186, 314, 170, 350, 176, 380, 192, 392], 11, col);
  g.fillStyle = '#e8b56a'; g.beginPath(); g.ellipse(226, 300, 16, 26, 0.2, 0, TAU); g.fill();
  /* dog */
  g.fillStyle = col; g.beginPath(); g.ellipse(388, 376, 28, 12, 0, 0, TAU); g.fill();
  [370, 380, 398, 406].forEach((x) => line(g, [x, 384, x, ground], 4, col));
  dot(g, 360, 362, 9, col); fillPoly(g, [354, 356, 358, 344, 364, 356], col); curve(g, [414, 372, 424, 362, 428, 352, 424, 344], 3, col);
  person(458, 280, () => {});
}

/* 5.24–5.29: gaze between the brows, the in- and out-breath made even (5.27); lit from within (5.24) */
export function drawBhrumadhya(g, S) {
  const skin = '#6f93f5';
  g.fillStyle = skin; g.beginPath(); g.ellipse(256, 256, 118, 150, 0, 0, TAU); g.fill();
  erase(g, () => {
    curve(g, [190, 220, 204, 236, 226, 236, 240, 220], 4, '#000');  /* closed eyes */
    curve(g, [272, 220, 286, 236, 308, 236, 322, 220], 4, '#000');
    line(g, [256, 228, 250, 290, 262, 296], 3, '#000');
    curve(g, [228, 336, 244, 346, 268, 346, 284, 336], 4, '#000');  /* a slight smile */
  });
  /* the light between the brows */
  dot(g, 256, 186, 12, '#ffd166');
  for (let i = 0; i < 16; i++) { const a = (i / 16) * TAU; line(g, [256 + cos(a) * 18, 186 + sin(a) * 18, 256 + cos(a) * (i % 2 ? 30 : 44), 186 + sin(a) * (i % 2 ? 30 : 44)], 2, '#fff6dc'); }
  /* two breaths, perfectly even */
  curve(g, [244, 300, 200, 330, 160, 300, 120, 336], 4, '#45e3d3');
  curve(g, [268, 300, 312, 330, 352, 300, 392, 336], 4, '#45e3d3');
  /* outer contacts, left outside */
  for (let i = 0; i < 40; i++) { const a = rnd() * TAU, r = 200 + rnd() * 50; dot(g, 256 + cos(a) * r, 256 + sin(a) * r, 1.5 + rnd() * 2, 'rgba(255, 154, 77, 0.8)'); }
}

/* ---------- Chapter 6 ---------- */

/* Chapter 6: the yogi seated in meditation, spine straight, aura still */
export function drawDhyani(g, S) {
  const blue = '#6f93f5', gold = '#f5c15c';
  for (let r = 0; r < 4; r++) ring(g, 256, 236, 120 + r * 34, 3 - r * 0.5, r % 2 ? 'rgba(25, 195, 180, 0.8)' : 'rgba(245, 193, 92, 0.85)');
  g.fillStyle = blue;
  g.beginPath(); g.ellipse(256, 392, 150, 46, 0, 0, TAU); g.fill();      /* crossed legs */
  g.beginPath(); g.moveTo(206, 380); g.lineTo(306, 380); g.bezierCurveTo(316, 300, 300, 220, 286, 200); g.lineTo(226, 200); g.bezierCurveTo(212, 220, 196, 300, 206, 380); g.fill(); /* torso */
  line(g, [226, 214, 172, 300, 150, 372], 20, blue);  /* arms resting on the knees */
  line(g, [286, 214, 340, 300, 362, 372], 20, blue);
  ring(g, 146, 378, 9, 4, '#ffe7a8'); ring(g, 366, 378, 9, 4, '#ffe7a8');  /* jnana mudra */
  line(g, [256, 192, 256, 176], 24, blue);
  dot(g, 256, 140, 40, blue);
  g.fillStyle = blue; g.beginPath(); g.ellipse(256, 98, 22, 16, 0, 0, TAU); g.fill();  /* hair knot */
  dot(g, 256, 128, 5, '#ffd166');
  ring(g, 256, 140, 56, 3, gold);
}

/* 6.1–6.9: lift yourself by yourself (6.5). Climbing to yoga: action is the means for the climb, calm for the summit (6.3) */
export function drawAscent(g, S) {
  fillPoly(g, [10, 470, 256, 90, 502, 470], 'rgba(111, 147, 245, 0.55)');
  fillPoly(g, [200, 176, 256, 90, 312, 176, 280, 160, 256, 180, 230, 160], 'rgba(232, 236, 248, 0.9)');
  /* the zig-zag path up */
  const path = [80, 460, 330, 400, 150, 330, 300, 270, 200, 210, 256, 120];
  g.setLineDash([10, 8]); line(g, path, 4, '#f5c15c'); g.setLineDash([]);
  /* the climber, reaching for the next step */
  const x = 250, y = 296;
  dot(g, x, y - 34, 9, '#ffd08a'); line(g, [x, y - 24, x - 4, y + 6], 7, '#ff9a4d');
  line(g, [x - 4, y + 6, x - 16, y + 30], 5, '#ffd08a'); line(g, [x - 4, y + 6, x + 12, y + 22], 5, '#ffd08a');
  line(g, [x, y - 18, x + 20, y - 44], 4, '#ffd08a'); line(g, [x, y - 18, x - 18, y - 4], 4, '#ffd08a');
  /* the summit: the one who has climbed sits in calm */
  dot(g, 256, 74, 10, '#fff6dc'); g.fillStyle = '#fff6dc'; g.beginPath(); g.ellipse(256, 98, 18, 9, 0, 0, TAU); g.fill();
  for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; line(g, [256 + cos(a) * 26, 84 + sin(a) * 26, 256 + cos(a) * 42, 84 + sin(a) * 42], 2.5, '#ffd166'); }
  /* clod, stone and gold, all the same to him (6.8) */
  dot(g, 400, 444, 10, '#8a5a2b'); dot(g, 430, 446, 10, '#9aa3b5'); dot(g, 460, 444, 10, '#ffd166');
}

/* 6.10–6.17: the seat of kusha grass, deerskin and cloth (6.11); body, head and neck held straight (6.13) */
export function drawSpine(g, S) {
  for (let i = 0; i < 40; i++) { const x = 120 + i * 7; line(g, [x, 440, x + (rnd() - 0.5) * 16, 404 - rnd() * 14], 2, '#9ad18b'); }  /* kusha grass */
  g.fillStyle = '#c98a3a'; g.beginPath(); g.ellipse(256, 410, 128, 22, 0, 0, TAU); g.fill();  /* deerskin */
  for (let i = 0; i < 14; i++) dot(g, 160 + rnd() * 190, 402 + rnd() * 16, 3, '#ffe7a8');
  fillPoly(g, [150, 392, 362, 392, 352, 378, 160, 378], '#ff4d6d');  /* cloth */
  /* the seated outline, very faint */
  g.setLineDash([4, 8]);
  g.strokeStyle = 'rgba(188, 210, 255, 0.6)'; g.lineWidth = 2;
  g.beginPath(); g.ellipse(256, 360, 120, 26, 0, 0, TAU); g.stroke();
  g.beginPath(); g.moveTo(206, 350); g.bezierCurveTo(200, 260, 220, 200, 230, 184); g.moveTo(306, 350); g.bezierCurveTo(312, 260, 292, 200, 282, 184); g.stroke();
  ring(g, 256, 138, 40, 2, 'rgba(188, 210, 255, 0.6)');
  g.setLineDash([]);
  /* the straight spine and its seven centres */
  line(g, [256, 360, 256, 92], 3, '#fff6dc');
  ['#ff4d6d', '#ff9a4d', '#ffd166', '#21b37c', '#45e3d3', '#5b7cff', '#b178ff'].forEach((c, i) => { dot(g, 256, 352 - i * 42, 9, c); ring(g, 256, 352 - i * 42, 15, 1.5, c); });
  dot(g, 256, 70, 10, '#ffffff');
}

/* 6.18–6.28: like a lamp in a windless place, which does not flicker (6.19) */
export function drawWindlessLamp(g, S) {
  /* wind swirls everywhere, stopping at the edge of the still circle */
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * TAU, r = 200 + (i % 3) * 18, x = 256 + cos(a) * r, y = 256 + sin(a) * r;
    ring(g, x, y, 16 + (i % 2) * 8, 3, 'rgba(25, 195, 180, 0.85)', a, a + Math.PI * 1.3);
  }
  ring(g, 256, 256, 160, 2, 'rgba(245, 193, 92, 0.7)');
  /* the diya and its perfectly upright flame */
  g.fillStyle = '#c98a3a'; g.beginPath(); g.moveTo(186, 330); g.quadraticCurveTo(256, 392, 326, 330); g.closePath(); g.fill();
  line(g, [186, 330, 326, 330], 5, '#f5c15c');
  flame(g, 256, 330, 26, 210, '#ff9a4d', '#ffffff');
  flame(g, 256, 326, 11, 110, '#ffd27a', '#ffffff');
  line(g, [256, 330, 256, 316], 3, '#5a3a1a');
}

/* 6.29–6.32: the Self in all beings, and all beings in the Self (6.29). A net of jewels, each holding the others */
export function drawJewelNet(g, S) {
  const nodes = [];
  for (let r = 0; r < 7; r++) for (let q = 0; q < 7; q++) { const x = 76 + q * 60 + (r % 2) * 30, y = 76 + r * 60; if (x < 470) nodes.push([x, y]); }
  nodes.forEach(([x, y], i) => nodes.forEach(([x2, y2], j) => { if (j > i && Math.hypot(x2 - x, y2 - y) < 70) line(g, [x, y, x2, y2], 1.2, 'rgba(188, 210, 255, 0.55)'); }));
  const dist = ([x, y]) => Math.hypot(x - 256, y - 256);
  const mid = nodes.reduce((b, n) => (dist(n) < dist(b) ? n : b));
  nodes.forEach(([x, y]) => {
    const centre = x === mid[0] && y === mid[1], r = centre ? 20 : 10;
    dot(g, x, y, r, centre ? '#fff6dc' : '#45e3d3');
    ring(g, x, y, r + 4, 1.5, '#f5c15c');
    dot(g, x - r * 0.3, y - r * 0.3, r * 0.3, '#ffffff');  /* each jewel reflects the light of the others */
  });
}

/* 6.33–6.36: the mind is as hard to hold as the wind (6.34); held by practice and detachment (6.35). A kite on its string */
export function drawKite(g, S) {
  for (let i = 0; i < 7; i++) curve(g, [180 + i * 40, 60 + (i % 3) * 30, 230 + i * 40, 30 + (i % 3) * 30, 260 + i * 40, 90 + (i % 3) * 30, 300 + i * 40, 60 + (i % 3) * 30], 2.5, 'rgba(25, 195, 180, 0.8)');
  const kx = 360, ky = 170;
  fillPoly(g, [kx, ky - 80, kx + 58, ky, kx, ky + 90, kx - 58, ky], '#ff9a4d');
  fillPoly(g, [kx, ky - 80, kx + 58, ky, kx, ky], '#ff4d6d');
  line(g, [kx, ky - 80, kx, ky + 90], 3, '#ffe7a8'); line(g, [kx - 58, ky, kx + 58, ky], 3, '#ffe7a8');
  /* the tail, whipping in the wind */
  const tail = []; for (let t = 0; t <= 1; t += 0.05) tail.push(kx + t * 40 + sin(t * 12) * 18, ky + 90 + t * 150);
  line(g, tail, 2, '#ffe7a8');
  for (let t = 0.15; t < 1; t += 0.2) fillPoly(g, [kx + t * 40 + sin(t * 12) * 18 - 9, ky + 90 + t * 150, kx + t * 40 + sin(t * 12) * 18 + 9, ky + 90 + t * 150 - 6, kx + t * 40 + sin(t * 12) * 18 + 9, ky + 90 + t * 150 + 6], '#ffd166');
  /* the string, held steady from below: practice (abhyasa) */
  curve(g, [kx, ky + 10, 270, 300, 170, 360, 104, 430], 2, '#fff6dc');
  /* the one holding it, seated and calm */
  dot(g, 92, 400, 12, '#ffd08a'); g.fillStyle = '#6f93f5'; g.beginPath(); g.ellipse(92, 448, 34, 22, 0, Math.PI, TAU); g.fill();
  line(g, [92, 420, 92, 446], 14, '#6f93f5'); line(g, [96, 426, 104, 430], 6, '#ffd08a');
}

/* 6.37–6.47: no effort is ever lost (6.40). A torn cloud above, and practice that grows again, birth after birth (6.43–45) */
export function drawSeedSpiral(g, S) {
  /* the torn cloud of 6.38 */
  [[74, 70, 18], [100, 60, 24], [128, 72, 16]].forEach(([x, y, r]) => dot(g, x, y, r, 'rgba(188, 210, 255, 0.8)'));
  [[160, 64, 10], [182, 80, 7], [200, 60, 5]].forEach(([x, y, r]) => dot(g, x, y, r, 'rgba(188, 210, 255, 0.55)'));
  /* the spiral of lives */
  const pts = [], sprouts = [];
  for (let t = 0; t <= 1; t += 0.005) {
    const a = t * TAU * 2.4, r = 200 * (1 - t) + 20;
    pts.push(256 + cos(a) * r, 270 + sin(a) * r * 0.8);
  }
  line(g, pts, 3, 'rgba(245, 193, 92, 0.75)');
  for (let k = 0; k < 9; k++) { const t = 0.04 + k * 0.1, a = t * TAU * 2.4, r = 200 * (1 - t) + 20; sprouts.push([256 + cos(a) * r, 270 + sin(a) * r * 0.8, 0.4 + k * 0.1]); }
  /* each sprout taller than the last: the practice carries over */
  sprouts.forEach(([x, y, k]) => {
    line(g, [x, y, x, y - 40 * k], 3, '#21b37c');
    g.fillStyle = '#9ad18b'; g.beginPath(); g.ellipse(x - 9 * k, y - 26 * k, 10 * k, 5 * k, -0.5, 0, TAU); g.ellipse(x + 9 * k, y - 32 * k, 10 * k, 5 * k, 0.5, 0, TAU); g.fill();
    dot(g, x, y, 4, '#c98a3a');
  });
  /* at the centre, the highest goal (6.45): a lotus in bloom */
  for (let k = 0; k < 8; k++) { const a = Math.PI + (k / 7) * Math.PI; g.fillStyle = k % 2 ? '#ff8fb1' : '#ffb3c8'; g.beginPath(); g.ellipse(256 + cos(a) * 26, 262 + sin(a) * 16, 22, 8, a, 0, TAU); g.fill(); }
  dot(g, 256, 252, 10, '#fff6dc');
}

/* ---------- Chapter 7 ---------- */

/* Chapter 7 (7.7): all this is strung on me like pearls on a thread */
export function drawPearlThread(g, S) {
  const c = 256, cy = 230, n = 27;
  for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (i / n) * TAU; g.setLineDash([3, 9]); line(g, [c, cy, c + cos(a) * 166, cy + sin(a) * 156], 1, 'rgba(245, 193, 92, 0.45)'); g.setLineDash([]); }
  g.strokeStyle = '#f5c15c'; g.lineWidth = 3; g.beginPath(); g.ellipse(c, cy, 182, 172, 0, 0, TAU); g.stroke();
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i / n) * TAU, x = c + cos(a) * 182, y = cy + sin(a) * 172;
    const pr = g.createRadialGradient(x - 5, y - 5, 1, x, y, 15); pr.addColorStop(0, '#ffffff'); pr.addColorStop(1, '#c9cfff');
    g.fillStyle = pr; g.beginPath(); g.arc(x, y, 14, 0, TAU); g.fill();
  }
  dot(g, c, cy, 12, '#fff6dc'); ring(g, c, cy, 22, 2, '#f5c15c');
  /* the clasp, a jewel and a tassel */
  line(g, [c, cy + 186, c, cy + 206], 3, '#f5c15c');
  dot(g, c, cy + 222, 18, '#45e3d3'); ring(g, c, cy + 222, 22, 3, '#f5c15c');
  for (let k = -3; k <= 3; k++) line(g, [c, cy + 242, c + k * 7, cy + 278], 2, '#f5c15c');
}

/* 7.1–7.7: my lower nature, eightfold (7.4), and the higher, the life that holds the world (7.5) */
export function drawAshtaPrakriti(g, S) {
  const c = 256, R = 172;
  g.setLineDash([8, 10]); ring(g, c, c, R, 2, 'rgba(245, 193, 92, 0.7)'); g.setLineDash([]);
  const icons = [
    (x, y) => { fillPoly(g, [x - 22, y - 22, x + 22, y - 22, x + 22, y + 22, x - 22, y + 22], '#ffd166'); },                     /* earth: the square */
    (x, y) => { dot(g, x, y, 24, '#bcd2ff'); erase(g, () => dot(g, x, y - 12, 22, '#000')); },                                    /* water: the crescent */
    (x, y) => { fillPoly(g, [x, y + 22, x + 26, y - 20, x - 26, y - 20], '#ff4d6d'); },                                          /* fire: the triangle */
    (x, y) => { for (let k = 0; k < 6; k++) { const a = (k / 6) * TAU; dot(g, x + cos(a) * 18, y + sin(a) * 18, 7, '#45e3d3'); } }, /* air: a ring of motion */
    (x, y) => { ring(g, x, y, 22, 3, '#e8ecf8'); dot(g, x, y, 4, '#e8ecf8'); },                                                  /* space: the empty circle */
    (x, y) => { const p = []; for (let t = 0; t <= TAU + 0.01; t += 0.1) p.push(x + cos(t) * (18 + 4 * sin(t * 5)), y + sin(t) * (18 + 4 * sin(t * 5))); line(g, p, 3, '#b178ff'); }, /* mind: restless rim */
    (x, y) => { dot(g, x, y, 9, '#fff6dc'); for (let k = 0; k < 8; k++) { const a = (k / 8) * TAU; line(g, [x + cos(a) * 13, y + sin(a) * 13, x + cos(a) * 24, y + sin(a) * 24], 2.5, '#fff6dc'); } }, /* intellect: a small sun */
    (x, y) => { fillPoly(g, [x - 22, y + 14, x + 22, y + 14, x + 26, y - 14, x + 11, y - 2, x, y - 22, x - 11, y - 2, x - 26, y - 14], '#ff9a4d'); }, /* ego: the crown */
  ];
  icons.forEach((draw, i) => { const a = -Math.PI / 2 + (i / 8) * TAU; draw(c + cos(a) * R, c + sin(a) * R); });
  /* the higher nature: the living spark at the centre, holding all eight */
  for (let i = 0; i < 8; i++) { const a = -Math.PI / 2 + (i / 8) * TAU; line(g, [c + cos(a) * 40, c + sin(a) * 40, c + cos(a) * (R - 36), c + sin(a) * (R - 36)], 1.5, 'rgba(158, 243, 234, 0.75)'); }
  dot(g, c, c, 26, '#9ef3ea'); ring(g, c, c, 36, 3, '#fff6dc'); dot(g, c, c, 10, '#ffffff');
}

/* 7.8–7.12: I am the taste in water, the light of sun and moon, the fragrance of earth, the seed of all beings (7.8–10) */
export function drawEssences(g, S) {
  const c = 256;
  const spots = [[110, 100], [402, 100], [70, 270], [442, 270], [120, 430], [392, 430]];
  spots.forEach(([x, y]) => { g.setLineDash([5, 9]); line(g, [c, 300, x, y], 1.5, 'rgba(255, 231, 168, 0.6)'); g.setLineDash([]); });
  /* the light of the sun and of the moon */
  dot(g, 110, 100, 26, '#ffb347'); for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; line(g, [110 + cos(a) * 32, 100 + sin(a) * 32, 110 + cos(a) * 44, 100 + sin(a) * 44], 3, '#ffd166'); }
  dot(g, 402, 100, 28, '#e8ecf8'); erase(g, () => dot(g, 416, 90, 24, '#000'));
  /* the taste in water */
  drop(g, 70, 262, 28, '#4d9cff'); dot(g, 62, 256, 6, '#ffffff');
  /* the brilliance in fire */
  flame(g, 442, 296, 26, 76, '#ff4d6d', '#ffe7a8');
  /* the fragrance of the earth */
  line(g, [120, 470, 120, 430], 3, '#21b37c'); for (let k = 0; k < 6; k++) { const a = (k / 6) * TAU; g.fillStyle = '#ff8fb1'; g.beginPath(); g.ellipse(120 + cos(a) * 12, 424 + sin(a) * 12, 11, 6, a, 0, TAU); g.fill(); }
  for (let k = 0; k < 3; k++) curve(g, [110 + k * 10, 404, 96 + k * 10, 380, 124 + k * 10, 370, 112 + k * 10, 346], 2, 'rgba(255, 179, 200, 0.75)');
  /* the sound in space */
  for (let r = 0; r < 4; r++) ring(g, 392, 430, 12 + r * 12, 3 - r * 0.5, '#45e3d3', -0.9, 0.9);
  dot(g, 380, 430, 6, '#45e3d3');
  /* and at the centre, the eternal seed, already sprouting (7.10) */
  g.fillStyle = '#c98a3a'; g.beginPath(); g.ellipse(c, 312, 30, 20, 0, 0, TAU); g.fill();
  curve(g, [c, 296, c - 6, 260, c + 10, 230, c, 196], 5, '#21b37c');
  g.fillStyle = '#9ad18b'; g.beginPath(); g.ellipse(c - 24, 214, 24, 10, -0.5, 0, TAU); g.ellipse(c + 24, 204, 24, 10, 0.5, 0, TAU); g.fill();
  ring(g, c, 290, 70, 2, 'rgba(255, 231, 168, 0.7)');
}

/* 7.13–7.15: this divine maya of the three gunas is hard to cross; those who take refuge in me cross over (7.14) */
export function drawMayaVeil(g, S) {
  const c = 256, cols = ['#fff6dc', '#ff4d6d', '#5b7cff'];
  const light = g.createRadialGradient(c, 250, 4, c, 250, 120); light.addColorStop(0, 'rgba(255, 246, 220, 1)'); light.addColorStop(1, 'rgba(255, 246, 220, 0)');
  g.fillStyle = light; g.beginPath(); g.arc(c, 250, 120, 0, TAU); g.fill();
  for (let y = 50, k = 0; y <= 470; y += 13, k++) {
    const t = (y - 50) / 420, w = 92 * Math.sin(Math.PI * Math.min(1, t * 1.05));  /* the curtain parts in the middle */
    const left = [], right = [];
    for (let x = 0; x <= 512; x += 8) {
      const yy = y + 5 * sin(x / 30 + k * 0.8);
      if (x < c - w) left.push(x - (w * 0.4) * (x / (c - w + 1)) ** 4, yy);
      else if (x > c + w) right.push(x + (w * 0.4) * ((512 - x) / (512 - c - w + 1)) ** 4, yy);
    }
    if (left.length > 3) line(g, left, 3.5, cols[k % 3]);
    if (right.length > 3) line(g, right, 3.5, cols[k % 3]);
  }
  /* one who surrenders, walking through */
  const x = c, y = 420;
  dot(g, x, y - 46, 10, '#ffd08a'); line(g, [x, y - 34, x, y], 10, '#ff9a4d');
  line(g, [x - 4, y, x - 10, y + 30], 5, '#ffd08a'); line(g, [x + 4, y, x + 10, y + 30], 5, '#ffd08a');
  line(g, [x - 10, y - 22, x, y - 44], 4, '#ffd08a'); line(g, [x + 10, y - 22, x, y - 44], 4, '#ffd08a');
}

/* 7.16–7.19: four kinds of people worship me: the distressed, the seeker of knowledge, the seeker of wealth, and the wise (7.16) */
export function drawFourDevotees(g, S) {
  const top = [256, 80];
  dot(g, top[0], top[1], 28, '#fff6dc');
  for (let i = 0; i < 24; i++) { const a = (i / 24) * TAU; line(g, [256 + cos(a) * 36, 80 + sin(a) * 36, 256 + cos(a) * (i % 2 ? 50 : 66), 80 + sin(a) * (i % 2 ? 50 : 66)], 2, '#ffd166'); }
  const skin = '#ffd08a';
  const arm = (x0, x1, y1) => { curve(g, [x0, 500, x0, 420, x1, y1 + 80, x1, y1], 16, skin); dot(g, x1, y1 - 4, 12, skin); };
  /* the distressed: a tear */
  arm(96, 120, 320); drop(g, 120, 280, 18, '#45e3d3');
  /* the seeker of knowledge: an open book */
  arm(196, 200, 290); fillPoly(g, [170, 268, 198, 274, 198, 238, 170, 232], '#e8ecf8'); fillPoly(g, [230, 268, 202, 274, 202, 238, 230, 232], '#e8ecf8');
  /* the seeker of wealth: coins */
  arm(416, 392, 310); [[380, 280], [396, 270], [412, 282]].forEach(([x, y]) => { dot(g, x, y, 11, '#ffd166'); ring(g, x, y, 7, 2, '#c98a3a'); });
  /* the wise: folded hands, nearest the light, asking for nothing */
  curve(g, [312, 500, 312, 400, 300, 300, 300, 210], 16, skin);
  curve(g, [336, 500, 336, 400, 312, 300, 304, 210], 14, skin);
  g.fillStyle = skin; g.beginPath(); g.moveTo(296, 214); g.bezierCurveTo(292, 186, 302, 166, 304, 154); g.bezierCurveTo(312, 170, 314, 192, 310, 214); g.closePath(); g.fill();
  ring(g, 304, 190, 34, 2, 'rgba(255, 231, 168, 0.85)');
  g.setLineDash([4, 8]); line(g, [304, 152, 262, 108], 2, 'rgba(255, 231, 168, 0.85)'); g.setLineDash([]);
}

/* 7.20–7.30: I know all beings past, present and to come, but no one knows me (7.26); veiled by yogamaya (7.25) */
export function drawHourglass(g, S) {
  const gold = '#f5c15c';
  line(g, [150, 150, 362, 150], 10, gold); line(g, [150, 470, 362, 470], 10, gold);
  line(g, [164, 150, 164, 470], 4, '#c98a3a'); line(g, [348, 150, 348, 470], 4, '#c98a3a');
  g.strokeStyle = 'rgba(188, 210, 255, 0.9)'; g.lineWidth = 4; g.beginPath();
  g.moveTo(186, 160); g.bezierCurveTo(186, 260, 250, 290, 250, 310); g.bezierCurveTo(250, 330, 186, 360, 186, 460);
  g.moveTo(326, 160); g.bezierCurveTo(326, 260, 262, 290, 262, 310); g.bezierCurveTo(262, 330, 326, 360, 326, 460); g.stroke();
  /* what is to come, what is, what has been */
  fillPoly(g, [206, 214, 306, 214, 262, 290, 250, 290], '#ffd166');
  for (let i = 0; i < 12; i++) dot(g, 256 + (rnd() - 0.5) * 3, 300 + i * 10, 2.5, '#ffe7a8');
  fillPoly(g, [196, 458, 316, 458, 284, 410, 256, 392, 228, 410], '#ffb347');
  /* the eye above that sees it all, its upper lid lost behind the veil */
  g.fillStyle = '#e8ecf8'; g.beginPath(); g.moveTo(176, 80); g.quadraticCurveTo(256, 20, 336, 80); g.quadraticCurveTo(256, 140, 176, 80); g.fill();
  dot(g, 256, 80, 24, '#5b7cff'); erase(g, () => dot(g, 256, 80, 9, '#000')); dot(g, 248, 72, 5, '#ffffff');
  for (let k = 0; k < 4; k++) { const p = []; for (let x = 140; x <= 372; x += 8) p.push(x, 40 + k * 10 + 4 * sin(x / 20 + k)); line(g, p, 2.5, ['#fff6dc', '#ff4d6d', '#5b7cff', '#b178ff'][k]); }
}

/* ---------- Chapter 8 ---------- */

/* Chapter 8: the imperishable (akshara), drawn as a yantra: interlocking triangles round a single point */
export function drawYantra(g, S) {
  const c = 256, cy = 256, gold = '#f5c15c';
  /* the outer square with its four gates */
  g.strokeStyle = gold; g.lineWidth = 4; g.strokeRect(36, 36, 440, 440);
  [[256, 36, 0], [476, 256, 1], [256, 476, 0], [36, 256, 1]].forEach(([x, y, v]) => { if (v) { erase(g, () => line(g, [x, y - 34, x, y + 34], 9, '#000')); line(g, [x - 10, y - 34, x + 10, y - 34], 3, gold); line(g, [x - 10, y + 34, x + 10, y + 34], 3, gold); } else { erase(g, () => line(g, [x - 34, y, x + 34, y], 9, '#000')); line(g, [x - 34, y - 10, x - 34, y + 10], 3, gold); line(g, [x + 34, y - 10, x + 34, y + 10], 3, gold); } });
  /* two rings of lotus petals, 16 and 8 */
  const petals = (n, r0, r1, col) => { for (let i = 0; i < n; i++) { const a = (i / n) * TAU, a2 = ((i + 1) / n) * TAU, am = (a + a2) / 2; g.strokeStyle = col; g.lineWidth = 2.5; g.beginPath(); g.moveTo(c + cos(a) * r0, cy + sin(a) * r0); g.quadraticCurveTo(c + cos(am) * (r1 + 16), cy + sin(am) * (r1 + 16), c + cos(a2) * r0, cy + sin(a2) * r0); g.stroke(); } };
  ring(g, c, cy, 196, 2, gold); petals(16, 168, 192, '#ff8fb1'); ring(g, c, cy, 166, 2, gold); petals(8, 134, 158, '#ffb3c8'); ring(g, c, cy, 132, 3, gold);
  /* four triangles pointing up, five pointing down */
  const tri = (apex, base, up, col) => { const hw = Math.abs(base - apex) * 0.62; g.strokeStyle = col; g.lineWidth = 3; g.beginPath(); g.moveTo(c, cy + apex); g.lineTo(c + hw, cy + base); g.lineTo(c - hw, cy + base); g.closePath(); g.stroke(); };
  [[-122, 64], [-92, 98], [-64, 42], [-30, 84]].forEach(([a, b]) => tri(a, b, true, '#ff4d6d'));
  [[120, -66], [98, -100], [70, -44], [34, -86], [16, -20]].forEach(([a, b]) => tri(a, b, false, '#ffd166'));
  dot(g, c, cy, 9, '#ffffff');
}

/* 8.1–8.4: Arjuna's seven questions: Brahman, the Self within, action, the realm of beings, of gods, the lord of sacrifice, and the hour of death */
export function drawSevenPetals(g, S) {
  const c = 256, hues = ['#ff4d6d', '#ff9a4d', '#ffd166', '#21b37c', '#45e3d3', '#5b7cff', '#b178ff'];
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI / 2 + (i / 7) * TAU, x = c + cos(a) * 112, y = c + sin(a) * 112;
    g.fillStyle = hues[i]; g.beginPath(); g.ellipse(x, y, 92, 40, a, 0, TAU); g.fill();
    erase(g, () => { g.beginPath(); g.ellipse(x, y, 78, 28, a, 0, TAU); g.fill(); });
    /* each question, a small light at the tip of its petal */
    dot(g, c + cos(a) * 214, c + sin(a) * 214, 8, hues[i]);
  }
  g.setLineDash([4, 10]); ring(g, c, c, 236, 2, 'rgba(245, 193, 92, 0.7)'); g.setLineDash([]);
  /* the answer at the centre: the imperishable (8.3) */
  dot(g, c, c, 30, '#fff6dc'); ring(g, c, c, 40, 3, '#f5c15c');
}

/* 8.5–8.8: whatever one remembers at the last, to that one goes (8.6). The bird leaves its cage, toward the light */
export function drawBirdCage(g, S) {
  /* the light it flies to */
  dot(g, 420, 92, 34, '#fff6dc');
  for (let i = 0; i < 20; i++) { const a = (i / 20) * TAU; line(g, [420 + cos(a) * 42, 92 + sin(a) * 42, 420 + cos(a) * 60, 92 + sin(a) * 60], 2.5, '#ffd166'); }
  /* the cage, its door open */
  const cx = 150, base = 440, top = 250;
  g.strokeStyle = '#c98a3a'; g.lineWidth = 4; g.beginPath(); g.ellipse(cx, base, 90, 18, 0, 0, TAU); g.stroke();
  for (let k = -4; k <= 4; k++) { const x = cx + k * 20; if (k === 2 || k === 3) continue; curve(g, [x, base, x, top + 60, cx + k * 6, top + 10, cx, top], 3, '#c98a3a'); }
  dot(g, cx, top - 10, 9, '#f5c15c'); ring(g, cx, top - 28, 14, 3, '#f5c15c');
  line(g, [cx + 40, base - 6, cx + 96, base - 70, cx + 96, base - 150], 3, '#c98a3a');  /* the swung-open door */
  /* the bird, in flight, and the path it took */
  g.setLineDash([3, 10]); curve(g, [cx + 50, 360, 220, 280, 270, 260, 320, 196], 2.5, 'rgba(255, 231, 168, 0.8)'); g.setLineDash([]);
  const bx = 330, by = 186;
  g.fillStyle = '#fff6dc'; g.beginPath(); g.ellipse(bx, by, 22, 11, -0.6, 0, TAU); g.fill();
  fillPoly(g, [bx - 4, by - 4, bx - 36, by - 54, bx + 14, by - 16], '#ffe7a8');
  fillPoly(g, [bx + 2, by - 2, bx + 40, by - 40, bx + 18, by + 4], '#ffd166');
  dot(g, bx + 18, by - 14, 7, '#fff6dc'); fillPoly(g, [bx + 24, by - 16, bx + 34, by - 20, bx + 25, by - 10], '#ff9a4d');
}

/* 8.9–8.14: smaller than the atom, coloured like the sun, beyond all darkness (8.9) */
export function drawAtomSun(g, S) {
  const c = 256;
  for (let k = 0; k < 9; k++) {
    const p = [];
    for (let t = 0; t <= TAU * 1.6; t += 0.05) { const r = 70 + k * 20 + t * 6; p.push(c + cos(t + k * 0.7) * r, c + sin(t + k * 0.7) * r); }
    line(g, p, 3, `rgba(${90 + k * 8}, ${70 + k * 6}, ${200 - k * 6}, ${0.85 - k * 0.05})`);
  }
  erase(g, () => dot(g, c, c, 56, '#000'));
  /* the point of light and its rays, cutting clean through the dark */
  for (let i = 0; i < 24; i++) { const a = (i / 24) * TAU; line(g, [c + cos(a) * 18, c + sin(a) * 18, c + cos(a) * (i % 2 ? 120 : 250), c + sin(a) * (i % 2 ? 120 : 250)], i % 2 ? 1.5 : 2.5, i % 2 ? '#ffe7a8' : '#ffd166'); }
  dot(g, c, c, 13, '#ffffff'); ring(g, c, c, 20, 3, '#ffb347');
}

/* 8.15–8.22: a day of Brahma is a thousand ages; at dawn all things emerge, at night they dissolve (8.17–19) */
export function drawBrahmaDay(g, S) {
  const c = 256, R = 196;
  /* day */
  const day = g.createLinearGradient(c - R, 0, c, 0); day.addColorStop(0, '#ffd166'); day.addColorStop(1, '#ff9a4d');
  g.fillStyle = day; g.beginPath(); g.arc(c, c, R, Math.PI / 2, (3 * Math.PI) / 2); g.closePath(); g.fill();
  erase(g, () => { for (let i = 0; i < 70; i++) { const a = Math.PI / 2 + rnd() * Math.PI, r = rnd() * (R - 10); dot(g, c + cos(a) * r, c + sin(a) * r, 2 + rnd() * 3.5, '#000'); } });
  /* night */
  g.fillStyle = 'rgba(70, 90, 190, 0.85)'; g.beginPath(); g.arc(c, c, R, -Math.PI / 2, Math.PI / 2); g.closePath(); g.fill();
  for (let i = 0; i < 40; i++) { const a = -Math.PI / 2 + rnd() * Math.PI, r = 20 + rnd() * (R - 30); dot(g, c + cos(a) * r, c + sin(a) * r, 1 + rnd() * 1.6, `rgba(255, 246, 220, ${0.3 + rnd() * 0.6})`); }
  dot(g, c + 110, c - 80, 26, '#e8ecf8'); erase(g, () => dot(g, c + 122, c - 90, 22, '#000'));
  /* a thousand ages around the rim */
  for (let i = 0; i < 100; i++) { const a = (i / 100) * TAU, r1 = i % 10 ? 210 : 226; line(g, [c + cos(a) * 202, c + sin(a) * 202, c + cos(a) * r1, c + sin(a) * r1], i % 10 ? 1.5 : 3, '#f5c15c'); }
  /* Brahma's lotus on the seam */
  for (let k = 0; k < 8; k++) { const a = Math.PI + (k / 7) * Math.PI; g.fillStyle = k % 2 ? '#ff8fb1' : '#ffb3c8'; g.beginPath(); g.ellipse(c + cos(a) * 30, c + 10 + sin(a) * 18, 26, 9, a, 0, TAU); g.fill(); }
  dot(g, c, c, 10, '#fff6dc');
}

/* 8.23–8.28: two paths: fire, light, day, the bright fortnight, the northern sun, never to return; smoke, night, the moon, and return (8.24–26) */
export function drawLightSmoke(g, S) {
  const sx = 256, sy = 462;
  flame(g, sx, sy, 16, 46, '#ff9a4d', '#fff6dc');
  /* the bright path rises and does not return */
  curve(g, [sx + 6, sy - 40, 300, 330, 380, 220, 420, 92], 6, '#ffd166');
  dot(g, 432, 70, 32, '#ffb347');
  for (let i = 0; i < 16; i++) { const a = (i / 16) * TAU; line(g, [432 + cos(a) * 38, 70 + sin(a) * 38, 432 + cos(a) * 52, 70 + sin(a) * 52], 3, '#ffd166'); }
  [[300, 336, '#ff6a2b'], [344, 270, '#fff6dc'], [380, 210, '#ffd166'], [404, 150, '#ffffff']].forEach(([x, y, col]) => dot(g, x, y, 8, col));
  /* the dark path: smoke, up to the moon, and back down again */
  curve(g, [sx - 6, sy - 40, 210, 330, 120, 230, 112, 120], 5, 'rgba(170, 176, 196, 0.85)');
  curve(g, [112, 120, 96, 220, 160, 300, 214, 420], 3, 'rgba(170, 176, 196, 0.55)');
  fillPoly(g, [200, 410, 222, 420, 206, 432], 'rgba(170, 176, 196, 0.8)');
  [[200, 340, 14], [150, 270, 12], [118, 200, 10]].forEach(([x, y, r]) => ring(g, x, y, r, 3, 'rgba(170, 176, 196, 0.85)', 0, Math.PI * 1.4));
  dot(g, 100, 78, 28, '#e8ecf8'); erase(g, () => dot(g, 114, 68, 24, '#000'));
}


/* ---------- Chapter 9 ---------- */

/* Chapter 9 (9.26): a leaf, a flower, a fruit, a little water, offered with love */
export function drawLeafFlowerFruit(g, S) {
  ring(g, 256, 256, 210, 2, 'rgba(245, 193, 92, 0.6)');
  /* leaf */
  g.fillStyle = '#21b37c'; g.beginPath(); g.moveTo(110, 200); g.quadraticCurveTo(150, 100, 236, 120); g.quadraticCurveTo(200, 210, 110, 200); g.fill();
  line(g, [116, 196, 226, 126], 2, '#9ad18b');
  /* flower */
  for (let k = 0; k < 6; k++) { const a = (k / 6) * TAU; g.fillStyle = '#ff8fb1'; g.beginPath(); g.ellipse(360 + cos(a) * 30, 160 + sin(a) * 30, 28, 14, a, 0, TAU); g.fill(); }
  dot(g, 360, 160, 14, '#ffd166');
  /* fruit */
  dot(g, 160, 352, 52, '#ff9a4d'); dot(g, 142, 334, 14, 'rgba(255, 231, 168, 0.8)');
  line(g, [160, 300, 168, 276], 4, '#8a5a2b'); g.fillStyle = '#21b37c'; g.beginPath(); g.ellipse(184, 280, 16, 7, -0.4, 0, TAU); g.fill();
  /* a little water */
  g.fillStyle = '#c98a3a'; g.beginPath(); g.moveTo(306, 330); g.quadraticCurveTo(360, 420, 414, 330); g.closePath(); g.fill();
  g.fillStyle = '#4d9cff'; g.beginPath(); g.ellipse(360, 332, 52, 10, 0, 0, TAU); g.fill();
  drop(g, 360, 286, 16, '#45e3d3');
  dot(g, 256, 256, 8, '#fff6dc');
}

/* 9.1–9.6: as the mighty wind moves everywhere yet rests in space, all beings rest in me (9.6) */
export function drawSkyWind(g, S) {
  const c = 256;
  ring(g, c, c, 220, 3, '#f5c15c'); ring(g, c, c, 230, 1.5, 'rgba(245, 193, 92, 0.5)');
  for (let i = 0; i < 60; i++) { const a = rnd() * TAU, r = rnd() * 210; dot(g, c + cos(a) * r, c + sin(a) * r, 1 + rnd() * 1.6, 'rgba(188, 210, 255, 0.7)'); }
  for (let k = 0; k < 9; k++) {
    const p = [], y0 = 110 + k * 34, ph = k * 0.9;
    for (let x = 70; x <= 442; x += 6) { const r = Math.hypot(x - c, y0 - c); if (r > 205) continue; p.push(x, y0 + 16 * sin(x / 40 + ph)); }
    if (p.length > 4) line(g, p, 3, k % 2 ? '#45e3d3' : '#9ef3ea');
    const x = 120 + ((k * 53) % 260), y = y0 + 16 * sin(x / 40 + ph);
    ring(g, x, y - 10, 10, 2.5, '#e8ecf8', 0, Math.PI * 1.5);
  }
}

/* 9.7–9.10: at the end of a cycle beings return to my nature, and are sent forth again (9.7) */
export function drawGalaxy(g, S) {
  const c = 256;
  for (let arm = 0; arm < 3; arm++) {
    for (let i = 0; i < 700; i++) {
      const t = i / 700, a = arm * (TAU / 3) + t * 5.2, r = 14 + t * 220, j = (rnd() - 0.5) * 34 * t;
      dot(g, c + cos(a) * r + j, c + sin(a) * r * 0.82 + j, 2 + (1 - t) * 3 * rnd(), t < 0.3 ? '#fff6dc' : `hsl(${200 + arm * 60 + t * 40}, 85%, ${70 - t * 20}%)`);
    }
  }
  const core = g.createRadialGradient(c, c, 2, c, c, 46); core.addColorStop(0, '#ffffff'); core.addColorStop(1, 'rgba(255, 209, 102, 0)');
  g.fillStyle = core; g.beginPath(); g.arc(c, c, 46, 0, TAU); g.fill();
}

/* 9.11–9.19: I give heat; I hold back the rain and send it forth (9.19) */
export function drawHeatRain(g, S) {
  dot(g, 160, 160, 62, '#ffb347');
  for (let i = 0; i < 20; i++) { const a = (i / 20) * TAU; line(g, [160 + cos(a) * 72, 160 + sin(a) * 72, 160 + cos(a) * (i % 2 ? 92 : 108), 160 + sin(a) * (i % 2 ? 92 : 108)], 3, '#ffd166'); }
  [[300, 190, 40], [350, 168, 52], [404, 192, 40], [352, 214, 40]].forEach(([x, y, r]) => dot(g, x, y, r, '#bcd2ff'));
  for (let i = 0; i < 14; i++) { const x = 300 + i * 9; line(g, [x, 252, x - 8, 290 + (i % 3) * 12], 2.5, '#45e3d3'); }
  /* the fields that both feed */
  for (let r = 0; r < 4; r++) curve(g, [30, 370 + r * 30, 180, 350 + r * 30, 330, 390 + r * 30, 482, 366 + r * 30], 4, r % 2 ? '#21b37c' : '#9ad18b');
  for (let i = 0; i < 18; i++) { const x = 50 + i * 24; line(g, [x, 360 + (i % 3) * 10, x, 336 + (i % 3) * 10], 2.5, '#9ad18b'); }
}

/* 9.20–9.25: heaven won by ritual, and when the merit is spent, back down again (9.21) */
export function drawReturnStairs(g, S) {
  [[256, 92, 54], [196, 108, 40], [318, 108, 40]].forEach(([x, y, r]) => dot(g, x, y, r, 'rgba(232, 236, 248, 0.85)'));
  dot(g, 256, 70, 14, '#ffd166');
  for (let i = 0; i < 10; i++) { const x = 60 + i * 18, y = 470 - i * 30; line(g, [x, y, x + 18, y], 6, '#f5c15c'); line(g, [x + 18, y, x + 18, y - 30], 3, 'rgba(245, 193, 92, 0.6)'); }
  for (let i = 0; i < 10; i++) { const x = 270 + i * 18, y = 170 + i * 30; line(g, [x, y, x + 18, y], 6, 'rgba(188, 210, 255, 0.85)'); line(g, [x + 18, y, x + 18, y + 30], 3, 'rgba(188, 210, 255, 0.5)'); }
  const fig = (x, y, col) => { dot(g, x, y - 30, 7, col); line(g, [x, y - 22, x, y - 4], 5, col); line(g, [x, y - 4, x - 6, y + 8], 3, col); line(g, [x, y - 4, x + 6, y + 8], 3, col); };
  fig(150, 290, '#ffd08a'); fig(390, 380, 'rgba(255, 208, 138, 0.6)');
}

/* 9.26–9.29: cupped hands holding water, a leaf floating on it */
export function drawOfferingHands(g, S) {
  const skin = '#ffd08a';
  g.fillStyle = skin;
  g.beginPath(); g.moveTo(96, 250); g.bezierCurveTo(110, 370, 200, 400, 256, 400); g.lineTo(256, 360); g.bezierCurveTo(200, 356, 150, 320, 136, 250); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(416, 250); g.bezierCurveTo(402, 370, 312, 400, 256, 400); g.lineTo(256, 360); g.bezierCurveTo(312, 356, 362, 320, 376, 250); g.closePath(); g.fill();
  for (let k = 0; k < 4; k++) { dot(g, 104 + k * 8, 250 - k * 10, 10, skin); dot(g, 408 - k * 8, 250 - k * 10, 10, skin); }
  g.fillStyle = '#4d9cff'; g.beginPath(); g.ellipse(256, 300, 118, 34, 0, 0, TAU); g.fill();
  for (let r = 0; r < 3; r++) { g.strokeStyle = 'rgba(158, 243, 234, 0.8)'; g.lineWidth = 2; g.beginPath(); g.ellipse(256, 300, 30 + r * 26, 8 + r * 7, 0, 0, TAU); g.stroke(); }
  g.fillStyle = '#21b37c'; g.beginPath(); g.moveTo(220, 296); g.quadraticCurveTo(256, 262, 300, 290); g.quadraticCurveTo(256, 314, 220, 296); g.fill();
  for (let i = 0; i < 30; i++) dot(g, 160 + rnd() * 190, 80 + rnd() * 150, 1.2 + rnd() * 2, 'rgba(255, 231, 168, 0.85)');
}

/* 9.30–9.34: even the worst who turns to me soon becomes good (9.30–31). The lotus rises out of the mud */
export function drawLotusMud(g, S) {
  for (let i = 0; i < 160; i++) dot(g, 30 + rnd() * 452, 420 + rnd() * 70, 3 + rnd() * 5, `rgba(${110 + rnd() * 30}, ${80 + rnd() * 20}, 50, 0.9)`);
  for (let r = 0; r < 4; r++) { const p = []; for (let x = 20; x <= 492; x += 8) p.push(x, 300 + r * 22 + 4 * sin(x / 26 + r)); line(g, p, 2.5, `rgba(69, 156, 255, ${0.8 - r * 0.15})`); }
  curve(g, [256, 440, 246, 380, 266, 320, 256, 250], 6, '#21b37c');
  g.fillStyle = '#2f8f5a'; g.beginPath(); g.ellipse(150, 300, 70, 16, 0, 0, TAU); g.fill();
  for (let k = 0; k < 9; k++) {
    const a = Math.PI + (k / 8) * Math.PI;
    g.fillStyle = k % 2 ? '#ff8fb1' : '#ffb3c8'; g.beginPath(); g.ellipse(256 + cos(a) * 46, 214 + sin(a) * 40, 42, 15, a, 0, TAU); g.fill();
  }
  dot(g, 256, 214, 16, '#ffd166');
  for (let i = 0; i < 12; i++) { const a = Math.PI + (i / 11) * Math.PI; line(g, [256 + cos(a) * 110, 200 + sin(a) * 100, 256 + cos(a) * 128, 200 + sin(a) * 118], 2, '#fff6dc'); }
}


/* ---------- Chapter 10 ---------- */

/* Chapter 10: Krishna's peacock feather, a single glory that holds every colour */
export function drawPeacockFeather(g, S) {
  curve(g, [180, 486, 220, 380, 250, 260, 290, 120], 4, '#f5c15c');
  for (let i = 0; i < 70; i++) {
    const t = i / 70, x = 180 + (290 - 180) * t + 30 * sin(t * Math.PI) * 0.6, y = 486 - (486 - 120) * t, len = 30 + 70 * sin(t * Math.PI * 0.9);
    line(g, [x, y, x - len * 0.9, y - len * 0.5], 1.6, `hsl(${150 + t * 40}, 70%, ${45 + t * 15}%)`);
    line(g, [x, y, x + len * 0.9, y - len * 0.6], 1.6, `hsl(${150 + t * 40}, 70%, ${45 + t * 15}%)`);
  }
  const ex = 296, ey = 120;
  g.fillStyle = '#f5c15c'; g.beginPath(); g.ellipse(ex, ey, 66, 84, 0.25, 0, TAU); g.fill();
  g.fillStyle = '#21b37c'; g.beginPath(); g.ellipse(ex, ey + 4, 52, 66, 0.25, 0, TAU); g.fill();
  g.fillStyle = '#45e3d3'; g.beginPath(); g.ellipse(ex, ey + 10, 34, 44, 0.25, 0, TAU); g.fill();
  g.fillStyle = '#2f56e0'; g.beginPath(); g.ellipse(ex + 2, ey + 14, 22, 28, 0.25, 0, TAU); g.fill();
  dot(g, ex + 4, ey + 20, 9, '#0f2a80');
}

/* 10.1–10.11: dwelling in their hearts, I destroy the darkness with the shining lamp of knowledge (10.11) */
export function drawHeartLamp(g, S) {
  const heart = () => { g.beginPath(); g.moveTo(256, 452); g.bezierCurveTo(80, 330, 40, 180, 150, 120); g.bezierCurveTo(210, 90, 250, 130, 256, 170); g.bezierCurveTo(262, 130, 302, 90, 362, 120); g.bezierCurveTo(472, 180, 432, 330, 256, 452); g.closePath(); };
  heart(); g.strokeStyle = '#ff6b8a'; g.lineWidth = 6; g.stroke();
  for (let i = 0; i < 90; i++) { const a = rnd() * TAU, r = 230 + rnd() * 30; dot(g, 256 + cos(a) * r, 270 + sin(a) * r * 0.9, 2 + rnd() * 3, 'rgba(110, 80, 200, 0.8)'); }
  for (let i = 0; i < 16; i++) { const a = (i / 16) * TAU; line(g, [256 + cos(a) * 60, 250 + sin(a) * 60, 256 + cos(a) * 120, 250 + sin(a) * 120], 2, 'rgba(255, 231, 168, 0.75)'); }
  g.fillStyle = '#c98a3a'; g.beginPath(); g.moveTo(200, 330); g.quadraticCurveTo(256, 390, 312, 330); g.closePath(); g.fill();
  flame(g, 256, 330, 30, 130, '#ff9a4d', '#ffffff');
}

/* 10.12–10.18: "How may I know you? In what forms should I think of you?" (10.17) */
export function drawStargazer(g, S) {
  for (let i = 0; i < 260; i++) dot(g, rnd() * 512, rnd() * 380, rnd() < 0.08 ? 3 : 1 + rnd() * 1.3, `rgba(255, ${230 + rnd() * 25}, ${200 + rnd() * 55}, ${0.5 + rnd() * 0.5})`);
  const stars = [[300, 80], [350, 110], [390, 96], [420, 140], [380, 180], [330, 170]];
  line(g, stars.flat(), 1.5, 'rgba(158, 243, 234, 0.7)'); stars.forEach(([x, y]) => dot(g, x, y, 5, '#9ef3ea'));
  dot(g, 120, 110, 30, '#fff1c9');
  g.fillStyle = 'rgba(111, 147, 245, 0.7)'; g.beginPath(); g.moveTo(0, 512); g.quadraticCurveTo(160, 400, 330, 460); g.quadraticCurveTo(420, 490, 512, 470); g.lineTo(512, 512); g.closePath(); g.fill();
  const x = 170, y = 420;
  dot(g, x, y - 46, 11, '#ffd08a'); line(g, [x, y - 34, x - 4, y], 10, '#ff9a4d');
  line(g, [x - 4, y, x - 12, y + 24], 5, '#ffd08a'); line(g, [x - 4, y, x + 8, y + 24], 5, '#ffd08a');
  line(g, [x, y - 26, x + 18, y - 52], 4, '#ffd08a');
}

/* 10.19–10.29: the sun among lights, the moon among stars, the Himalaya among immovable things (10.21, 10.25) */
export function drawHimalayas(g, S) {
  dot(g, 110, 110, 38, '#ffb347'); for (let i = 0; i < 16; i++) { const a = (i / 16) * TAU; line(g, [110 + cos(a) * 46, 110 + sin(a) * 46, 110 + cos(a) * 62, 110 + sin(a) * 62], 3, '#ffd166'); }
  dot(g, 410, 100, 30, '#fff1c9'); erase(g, () => dot(g, 424, 90, 26, '#000'));
  fillPoly(g, [0, 420, 120, 230, 190, 320, 290, 150, 380, 300, 430, 240, 512, 400, 512, 470, 0, 470], 'rgba(111, 147, 245, 0.8)');
  fillPoly(g, [250, 210, 290, 150, 330, 214, 306, 200, 290, 222, 272, 200], '#ffffff');
  fillPoly(g, [96, 270, 120, 230, 144, 268, 128, 258, 118, 274], '#ffffff');
  fillPoly(g, [412, 266, 430, 240, 452, 270, 436, 262], '#ffffff');
  fillPoly(g, [0, 470, 160, 360, 250, 420, 360, 340, 512, 450, 512, 512, 0, 512], 'rgba(69, 100, 200, 0.85)');
}

/* 10.30–10.38: among birds, Garuda; among rivers, the Ganga (10.30–31) */
export function drawGaruda(g, S) {
  curve(g, [0, 470, 160, 400, 330, 500, 512, 420], 18, 'rgba(69, 227, 211, 0.85)');
  curve(g, [0, 490, 160, 420, 330, 520, 512, 440], 3, 'rgba(158, 243, 234, 0.7)');
  const gold = '#ffb347';
  for (const side of [-1, 1]) {
    g.fillStyle = gold; g.beginPath(); g.moveTo(256, 230);
    g.bezierCurveTo(256 + side * 80, 150, 256 + side * 170, 120, 256 + side * 236, 150);
    for (let k = 0; k < 6; k++) { const x = 256 + side * (236 - k * 26), y = 150 + k * 22; g.lineTo(x, y + 30); g.lineTo(x - side * 14, y + 16); }
    g.lineTo(256, 290); g.closePath(); g.fill();
    for (let k = 0; k < 5; k++) curve(g, [256 + side * 30, 240 + k * 6, 256 + side * 90, 190 + k * 12, 256 + side * 150, 170 + k * 16, 256 + side * 200, 170 + k * 20], 1.5, '#ff9a4d');
  }
  g.fillStyle = '#ff9a4d'; g.beginPath(); g.ellipse(256, 280, 34, 70, 0, 0, TAU); g.fill();
  fillPoly(g, [226, 340, 286, 340, 300, 400, 256, 384, 212, 400], '#ff6a2b');
  dot(g, 256, 196, 26, gold); fillPoly(g, [256, 206, 286, 220, 258, 226], '#ffe7a8');
  erase(g, () => dot(g, 264, 190, 4, '#000'));
  fillPoly(g, [240, 176, 256, 140, 272, 176], '#ff4d6d');
}

/* 10.39–10.42: whatever is glorious is a spark of my splendour (10.41); one fragment holds up the universe (10.42) */
export function drawTejasAmsha(g, S) {
  const c = 256;
  for (let i = 0; i < 90; i++) { const a = rnd() * TAU, r = 120 + rnd() * 130; const x = c + cos(a) * r, y = 210 + sin(a) * r * 0.9; dot(g, x, y, 1.5 + rnd() * 2.5, i % 3 ? '#ffd166' : '#ffffff'); }
  g.fillStyle = 'rgba(77, 124, 247, 0.85)'; g.beginPath(); g.arc(c, 200, 110, 0, TAU); g.fill();
  erase(g, () => { for (let i = 0; i < 70; i++) { const a = rnd() * TAU, r = rnd() * 100; dot(g, c + cos(a) * r, 200 + sin(a) * r, 1.6, '#000'); } });
  g.strokeStyle = 'rgba(158, 243, 234, 0.8)'; g.lineWidth = 2; g.beginPath(); g.ellipse(c, 200, 150, 30, -0.3, 0, TAU); g.stroke();
  for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; line(g, [c + cos(a) * 14, 400 + sin(a) * 14, c + cos(a) * (i % 2 ? 30 : 52), 400 + sin(a) * (i % 2 ? 30 : 52)], 2.5, '#fff6dc'); }
  dot(g, c, 400, 12, '#ffffff');
  line(g, [c, 386, c, 312], 3, 'rgba(255, 246, 220, 0.85)');
}


/* ---------- Chapter 11 ---------- */

/* Chapter 11: the universal form, crowned, with arms beyond counting */
export function drawVishvarupa(g, S) {
  const c = 256, blue = '#6f93f5';
  for (let r = 0; r < 4; r++) ring(g, c, 200, 150 + r * 26, 2.5, r % 2 ? 'rgba(255, 106, 43, 0.8)' : 'rgba(255, 209, 102, 0.85)');
  const tips = [(x, y) => ring(g, x, y, 12, 4, '#ffd166'), (x, y) => dot(g, x, y, 10, '#fff6dc'), (x, y) => { g.fillStyle = '#ff8fb1'; g.beginPath(); g.ellipse(x, y, 12, 7, 0, 0, TAU); g.fill(); }, (x, y) => dot(g, x, y, 9, '#c98a3a')];
  for (let i = 0; i < 18; i++) {
    const a = Math.PI + 0.15 + (i / 17) * (Math.PI - 0.3), x = c + cos(a) * 190, y = 250 + sin(a) * 170;
    line(g, [c + cos(a) * 40, 250 + sin(a) * 30, x, y], 9, blue);
    tips[i % 4](x + cos(a) * 14, y + sin(a) * 14);
  }
  g.fillStyle = blue; g.beginPath(); g.moveTo(206, 250); g.lineTo(306, 250); g.lineTo(330, 480); g.lineTo(182, 480); g.closePath(); g.fill();
  erase(g, () => { for (let i = 0; i < 80; i++) dot(g, 200 + rnd() * 112, 270 + rnd() * 200, 1.4 + rnd() * 1.4, '#000'); });
  dot(g, c, 200, 44, blue);
  fillPoly(g, [214, 176, 298, 176, 310, 120, 284, 146, 256, 100, 228, 146, 202, 120], '#ffd166');
  dot(g, 240, 200, 6, '#fff6dc'); dot(g, 272, 200, 6, '#fff6dc'); dot(g, 256, 178, 5, '#ff4d6d');
}

/* 11.1–11.8: behold the whole universe gathered in my body (11.7) */
export function drawUniverseBody(g, S) {
  const blue = '#4d6cf7';
  g.fillStyle = blue;
  dot(g, 256, 96, 44, blue);
  g.beginPath(); g.moveTo(196, 148); g.lineTo(316, 148); g.bezierCurveTo(350, 220, 340, 320, 320, 400); g.lineTo(300, 490); g.lineTo(212, 490); g.lineTo(192, 400); g.bezierCurveTo(172, 320, 162, 220, 196, 148); g.fill();
  line(g, [200, 160, 140, 260, 130, 340], 22, blue); line(g, [312, 160, 372, 260, 382, 340], 22, blue);
  erase(g, () => { for (let i = 0; i < 260; i++) { const x = 140 + rnd() * 240, y = 60 + rnd() * 430; dot(g, x, y, 0.8 + rnd() * 1.6, '#000'); } });
  for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 120; i++) { const t = i / 120, a = arm * Math.PI + t * 4.5, r = 6 + t * 56; dot(g, 256 + cos(a) * r, 300 + sin(a) * r * 0.6, 1.3, t < 0.3 ? '#ffffff' : '#ff8fb1'); }
  dot(g, 256, 300, 7, '#ffffff');
  dot(g, 220, 220, 9, '#ffb347'); dot(g, 296, 236, 6, '#e8ecf8'); dot(g, 236, 400, 5, '#9ef3ea');
  ring(g, 256, 96, 58, 2, 'rgba(255, 209, 102, 0.8)');
}

/* 11.9–11.14: if the light of a thousand suns blazed forth at once (11.12) */
export function drawThousandSuns(g, S) {
  const suns = [];
  for (let i = 0; i < 26; i++) { const a = rnd() * TAU, r = Math.sqrt(rnd()) * 170; suns.push([256 + cos(a) * r, 256 + sin(a) * r, 14 + rnd() * 26]); }
  suns.forEach(([x, y, r]) => { for (let k = 0; k < 12; k++) { const a = (k / 12) * TAU; line(g, [x + cos(a) * (r + 4), y + sin(a) * (r + 4), x + cos(a) * (r + 18), y + sin(a) * (r + 18)], 2, 'rgba(255, 209, 102, 0.8)'); } });
  suns.forEach(([x, y, r]) => { const gr = g.createRadialGradient(x, y, 1, x, y, r); gr.addColorStop(0, '#ffffff'); gr.addColorStop(1, '#ffb347'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); });
  dot(g, 256, 256, 46, '#ffffff');
}

/* 11.15–11.25: the sun and moon your eyes, your mouth a blazing fire (11.19) */
export function drawSunMoonEyes(g, S) {
  ring(g, 256, 270, 190, 4, '#f5c15c');
  fillPoly(g, [150, 110, 362, 110, 384, 40, 340, 80, 300, 20, 256, 70, 212, 20, 172, 80, 128, 40], '#ffd166');
  dot(g, 180, 220, 46, '#ffb347'); for (let i = 0; i < 14; i++) { const a = (i / 14) * TAU; line(g, [180 + cos(a) * 52, 220 + sin(a) * 52, 180 + cos(a) * 66, 220 + sin(a) * 66], 3, '#ffd166'); }
  dot(g, 332, 220, 46, '#e8ecf8'); erase(g, () => dot(g, 352, 206, 40, '#000'));
  g.fillStyle = '#ff6a2b'; g.beginPath(); g.moveTo(150, 340); g.quadraticCurveTo(256, 470, 362, 340); g.quadraticCurveTo(256, 380, 150, 340); g.fill();
  for (let i = 0; i < 7; i++) flame(g, 176 + i * 27, 372 + Math.abs(3 - i) * -6, 12, 40 + (3 - Math.abs(3 - i)) * 10, '#ff4d6d', '#ffd166');
  for (let i = 0; i < 40; i++) { const a = rnd() * TAU, r = 205 + rnd() * 40; dot(g, 256 + cos(a) * r, 270 + sin(a) * r, 2 + rnd() * 3, i % 2 ? '#ffd166' : '#ff9a4d'); }
}

/* 11.26–11.31: as moths rush into a blazing flame to their destruction (11.29) */
export function drawMothsFlame(g, S) {
  flame(g, 256, 440, 90, 330, '#ff4d6d', '#fff6dc');
  flame(g, 256, 436, 44, 190, '#ffd27a', '#ffffff');
  for (let k = 0; k < 18; k++) {
    const a = (k / 18) * TAU, r = 200 + (k % 3) * 22, x = 256 + cos(a) * r, y = 260 + sin(a) * r * 0.85, toward = Math.atan2(260 - y, 256 - x);
    g.save(); g.translate(x, y); g.rotate(toward);
    g.fillStyle = '#e8ecf8'; g.beginPath(); g.ellipse(-4, -9, 9, 13, -0.5, 0, TAU); g.ellipse(-4, 9, 9, 13, 0.5, 0, TAU); g.fill();
    line(g, [-10, 0, 8, 0], 3, '#c9cfff');
    g.restore();
    g.setLineDash([3, 8]); line(g, [x, y, x + cos(toward) * 50, y + sin(toward) * 50], 1.5, 'rgba(255, 231, 168, 0.6)'); g.setLineDash([]);
  }
}

/* 11.32–11.34: I am Time, the destroyer of worlds (11.32). A ring of tusks, everything spiralling in */
export function drawKalaMouth(g, S) {
  const c = 256;
  for (let i = 0; i < 1200; i++) { const t = i / 1200, a = t * 2 * TAU + (i % 3) * (TAU / 3), r = 30 + t * 180 + (rnd() - 0.5) * 14; dot(g, c + cos(a) * r, c + sin(a) * r, 1.4 + t * 2.5, t < 0.4 ? '#ff4d6d' : '#ffd166'); }
  ring(g, c, c, 232, 10, '#c0392b');
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * TAU, w = 0.12;
    fillPoly(g, [c + cos(a - w) * 226, c + sin(a - w) * 226, c + cos(a + w) * 226, c + sin(a + w) * 226, c + cos(a) * (i % 2 ? 176 : 150), c + sin(a) * (i % 2 ? 176 : 150)], '#fff6dc');
  }
  dot(g, c, c, 22, '#ff4d6d');
}

/* 11.35–11.46: "Take that four-armed form, with crown, mace and discus" (11.46) */
export function drawChaturbhuja(g, S) {
  const blue = '#6f93f5';
  for (let r = 0; r < 3; r++) ring(g, 256, 180, 90 + r * 22, 2, 'rgba(255, 209, 102, 0.75)');
  g.fillStyle = blue; g.beginPath(); g.moveTo(216, 210); g.lineTo(296, 210); g.lineTo(320, 470); g.lineTo(192, 470); g.closePath(); g.fill();
  g.fillStyle = '#ffd166'; g.fillRect(196, 360, 120, 110);
  line(g, [214, 222, 150, 180, 120, 120], 16, blue); line(g, [298, 222, 362, 180, 392, 120], 16, blue);
  line(g, [214, 240, 140, 300, 126, 360], 16, blue); line(g, [298, 240, 372, 300, 386, 360], 16, blue);
  /* discus, conch, mace, lotus */
  ring(g, 120, 96, 26, 6, '#ffd166'); for (let k = 0; k < 8; k++) { const a = (k / 8) * TAU; line(g, [120, 96, 120 + cos(a) * 22, 96 + sin(a) * 22], 2, '#ffe7a8'); }
  g.fillStyle = '#fff6dc'; g.beginPath(); g.moveTo(374, 110); g.bezierCurveTo(380, 80, 410, 74, 420, 100); g.lineTo(404, 140); g.closePath(); g.fill();
  line(g, [126, 370, 126, 430], 6, '#c98a3a'); dot(g, 126, 360, 18, '#e0a458');
  for (let k = 0; k < 6; k++) { const a = Math.PI + (k / 5) * Math.PI; g.fillStyle = '#ff8fb1'; g.beginPath(); g.ellipse(386 + cos(a) * 14, 360 + sin(a) * 10, 14, 6, a, 0, TAU); g.fill(); }
  dot(g, 256, 170, 40, blue);
  fillPoly(g, [222, 148, 290, 148, 300, 100, 278, 120, 256, 82, 234, 120, 212, 100], '#ffd166');
}

/* 11.47–11.55: the gentle form again; a friend's hand in a friend's hand (11.44, 11.51) */
export function drawClasp(g, S) {
  const blue = '#6f93f5', skin = '#ffd08a';
  for (let i = 0; i < 14; i++) { const a = Math.PI + (i / 13) * Math.PI; line(g, [256 + cos(a) * 140, 250 + sin(a) * 140, 256 + cos(a) * 170, 250 + sin(a) * 170], 2.5, 'rgba(255, 231, 168, 0.8)'); }
  line(g, [20, 340, 200, 280], 54, blue);
  line(g, [492, 340, 312, 280], 54, skin);
  g.fillStyle = skin; g.beginPath(); g.ellipse(270, 270, 64, 40, -0.2, 0, TAU); g.fill();
  g.fillStyle = blue; g.beginPath(); g.ellipse(240, 262, 58, 34, 0.25, 0, TAU); g.fill();
  for (let k = 0; k < 4; k++) line(g, [214 + k * 16, 240, 230 + k * 16, 300], 12, blue);
  line(g, [292, 244, 250, 232], 14, skin);
  line(g, [180, 300, 220, 290], 6, '#ffd166');
  g.fillStyle = '#21b37c'; g.beginPath(); g.ellipse(250, 120, 14, 34, 0.3, 0, TAU); g.fill();
  dot(g, 252, 112, 8, '#45e3d3'); dot(g, 253, 112, 4, '#2f56e0');
}


/* ---------- Chapter 12 ---------- */

/* Chapter 12: devotion as a dance, the circle of the rasa around the flute-player */
export function drawRasaCircle(g, S) {
  const c = 256, R = 172, blue = '#6f93f5';
  ring(g, c, c, R + 46, 2, 'rgba(255, 209, 102, 0.6)');
  ring(g, c, c, R - 10, 2, 'rgba(255, 143, 177, 0.5)');
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * TAU - Math.PI / 2, x = c + cos(a) * R, y = c + sin(a) * R, col = i % 2 ? blue : '#ff8fb1';
    g.save(); g.translate(x, y); g.rotate(a + Math.PI / 2);
    dot(g, 0, -26, 9, '#ffd08a');
    fillPoly(g, [-4, -16, 4, -16, 16, 20, -16, 20], col);
    g.restore();
    const a2 = ((i + 0.5) / 12) * TAU - Math.PI / 2;
    ring(g, c + cos(a2) * (R + 4), c + sin(a2) * (R + 4), 16, 3, '#ffd08a', a2 - 2.2, a2 - 0.9);
  }
  dot(g, c, c - 30, 18, blue);
  fillPoly(g, [c - 8, c - 12, c + 8, c - 12, c + 26, c + 60, c - 26, c + 60], '#ffd166');
  line(g, [c - 40, c - 10, c + 30, c - 26], 4, '#ffd166');
  g.fillStyle = '#21b37c'; g.beginPath(); g.ellipse(c + 8, c - 60, 6, 14, 0.4, 0, TAU); g.fill();
}

/* 12.1–12.7: for those whose minds enter into me, I become the one who lifts them out of the ocean (12.7) */
export function drawRescueHand(g, S) {
  for (let r = 0; r < 8; r++) { const p = []; for (let x = 0; x <= 512; x += 8) p.push(x, 320 + r * 24 + 10 * sin(x / 30 + r * 1.3)); line(g, p, 3.5, `rgba(${60 + r * 6}, ${90 + r * 8}, ${220 - r * 10}, ${0.95 - r * 0.07})`); }
  const x = 236, y = 330;
  dot(g, x, y - 10, 12, '#ffd08a'); line(g, [x, y, x + 8, y + 20], 10, '#ff9a4d'); line(g, [x + 4, y - 4, x + 20, y - 60], 5, '#ffd08a');
  for (let i = 0; i < 14; i++) { const a = -Math.PI / 2 + (i - 6.5) * 0.18; line(g, [270 + cos(a) * 40, 120 + sin(a) * 40, 270 + cos(a) * 110, 120 + sin(a) * 110], 2, 'rgba(255, 231, 168, 0.7)'); }
  const blue = '#6f93f5';
  line(g, [330, 0, 290, 150], 46, blue);
  g.fillStyle = blue; g.beginPath(); g.ellipse(276, 186, 34, 42, 0.3, 0, TAU); g.fill();
  for (let k = 0; k < 4; k++) line(g, [252 + k * 12, 210, 246 + k * 10, 252 - (k === 0 ? 6 : 0)], 10, blue);
  line(g, [296, 176, 272, 252], 11, blue);
}

/* 12.8–12.12: fix your mind on me; if not, practise; if not, work for me; if not, give up the fruits (12.8–11) */
export function drawFourSteps(g, S) {
  const steps = [[60, 450], [160, 370], [260, 290], [360, 210]];
  steps.forEach(([x, y], i) => { fillPoly(g, [x, y, x + 120, y, x + 120, y + 18, x, y + 18], `rgba(245, 193, 92, ${0.55 + i * 0.12})`); line(g, [x + 120, y + 18, x + 120, 470], 2, 'rgba(245, 193, 92, 0.35)'); });
  /* give up the fruit: an open hand, the fruit falling free */
  line(g, [92, 430, 132, 420], 9, '#ffd08a'); dot(g, 150, 396, 11, '#ff9a4d'); dot(g, 162, 360, 7, 'rgba(255, 154, 77, 0.6)');
  /* work for me: a hammer on the anvil */
  line(g, [200, 350, 238, 312], 6, '#c98a3a'); fillPoly(g, [228, 300, 254, 322, 244, 332, 218, 310], '#e8ecf8');
  /* practice: a string of beads */
  for (let k = 0; k < 12; k++) { const a = (k / 12) * TAU; dot(g, 320 + cos(a) * 24, 254 + sin(a) * 24, 5, '#ff8fb1'); }
  /* mind on me: the light at the top */
  flame(g, 420, 196, 22, 80, '#ff9a4d', '#ffffff');
  for (let i = 0; i < 16; i++) { const a = (i / 16) * TAU; line(g, [420 + cos(a) * 56, 150 + sin(a) * 56, 420 + cos(a) * 76, 150 + sin(a) * 76], 2, '#ffe7a8'); }
}

/* 12.13–12.20: by whom the world is not disturbed, and who is not disturbed by the world (12.15). A swan on still water */
export function drawSwanLake(g, S) {
  dot(g, 400, 90, 30, '#fff1c9');
  for (let r = 0; r < 6; r++) line(g, [40 + r * 12, 300 + r * 26, 472 - r * 12, 300 + r * 26], 1.5, `rgba(69, 156, 255, ${0.6 - r * 0.07})`);
  const swan = (sy) => {
    g.save(); g.translate(0, 300); g.scale(1, sy); g.translate(0, -300);
    g.fillStyle = sy > 0 ? '#ffffff' : 'rgba(232, 236, 248, 0.45)';
    g.beginPath(); g.moveTo(170, 296); g.bezierCurveTo(180, 240, 290, 230, 330, 270); g.bezierCurveTo(340, 286, 330, 296, 300, 298); g.closePath(); g.fill();
    g.strokeStyle = g.fillStyle; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(300, 270); g.bezierCurveTo(330, 230, 290, 180, 310, 150); g.stroke();
    dot(g, 318, 146, 12, g.fillStyle);
    fillPoly(g, [326, 142, 350, 150, 326, 154], sy > 0 ? '#ff9a4d' : 'rgba(255, 154, 77, 0.4)');
    g.restore();
  };
  swan(1); swan(-1);
  g.fillStyle = '#2f8f5a'; g.beginPath(); g.ellipse(100, 330, 40, 10, 0, 0, TAU); g.ellipse(420, 350, 34, 8, 0, 0, TAU); g.fill();
}


/* ---------- Chapter 13 ---------- */

/* Chapter 13 (13.34): as the one sun lights up the whole world */
export function drawOneSunWorld(g, S) {
  dot(g, 256, 90, 46, '#ffb347'); ring(g, 256, 90, 56, 3, '#ffd166');
  for (let i = 0; i < 25; i++) { const a = Math.PI * 0.12 + (i / 24) * Math.PI * 0.76; line(g, [256 + cos(a) * 64, 90 + sin(a) * 64, 256 + cos(a) * 340, 90 + sin(a) * 340], i % 2 ? 1.2 : 2.2, 'rgba(255, 209, 102, 0.55)'); }
  g.fillStyle = 'rgba(77, 124, 247, 0.85)'; g.beginPath(); g.arc(256, 900, 520, 0, TAU); g.fill();
  const lit = '#ffe7a8';
  [[110, 392], [170, 384], [230, 380], [300, 380], [360, 384], [420, 392]].forEach(([x, y], i) => {
    if (i % 2) { line(g, [x, y, x, y - 30], 4, '#8a5a2b'); dot(g, x, y - 38, 16, '#21b37c'); }
    else { fillPoly(g, [x - 16, y, x + 16, y, x + 16, y - 22, x, y - 36, x - 16, y - 22], lit); }
  });
}

/* 13.1–13.7: this body is the field, and the one who knows it is the knower of the field (13.2) */
export function drawFieldGrid(g, S) {
  const rows = 7, cols = 8, top = 220, bot = 480;
  for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
    const t0 = r / rows, t1 = (r + 1) / rows, w0 = 120 + 260 * t0, w1 = 120 + 260 * t1, y0 = top + (bot - top) * t0, y1 = top + (bot - top) * t1;
    const x00 = 256 - w0 + (2 * w0 * q) / cols, x01 = 256 - w0 + (2 * w0 * (q + 1)) / cols, x10 = 256 - w1 + (2 * w1 * q) / cols, x11 = 256 - w1 + (2 * w1 * (q + 1)) / cols;
    fillPoly(g, [x00 + 2, y0 + 2, x01 - 2, y0 + 2, x11 - 2, y1 - 2, x10 + 2, y1 - 2], ['#21b37c', '#9ad18b', '#ffd166', '#c98a3a', '#2f8f5a'][(r * 3 + q * 2) % 5]);
  }
  /* the knower: a still point of light above the field, watching */
  dot(g, 256, 96, 18, '#fff6dc'); ring(g, 256, 96, 30, 3, '#f5c15c'); ring(g, 256, 96, 44, 1.5, 'rgba(245, 193, 92, 0.6)');
  g.setLineDash([4, 8]); line(g, [256, 130, 256, 214], 2, 'rgba(255, 231, 168, 0.8)'); line(g, [240, 128, 160, 214], 1.5, 'rgba(255, 231, 168, 0.5)'); line(g, [272, 128, 352, 214], 1.5, 'rgba(255, 231, 168, 0.5)'); g.setLineDash([]);
}

/* 13.8–13.12: knowledge begins with humility (13.8). Reeds that bow and do not break */
export function drawBowedReeds(g, S) {
  for (let r = 0; r < 4; r++) { const p = []; for (let x = 0; x <= 512; x += 8) p.push(x, 430 + r * 18 + 4 * sin(x / 24 + r)); line(g, p, 2.5, `rgba(69, 156, 255, ${0.8 - r * 0.15})`); }
  for (let i = 0; i < 18; i++) {
    const x = 40 + i * 25 + (i % 3) * 4, h = 200 + (i % 4) * 40, bend = 60 + (i % 3) * 30;
    curve(g, [x, 430, x, 430 - h * 0.5, x + bend * 0.6, 430 - h, x + bend, 430 - h + 30], 3, i % 2 ? '#9ad18b' : '#21b37c');
    g.fillStyle = '#c98a3a'; g.beginPath(); g.ellipse(x + bend, 430 - h + 44, 6, 16, 0.3, 0, TAU); g.fill();
  }
  drop(g, 300, 210, 10, '#9ef3ea');
}

/* 13.13–13.19: with hands and feet everywhere, eyes, heads and faces everywhere (13.14) */
export function drawEyesEverywhere(g, S) {
  ring(g, 256, 256, 210, 3, '#f5c15c');
  const eye = (x, y, s) => {
    g.fillStyle = '#e8ecf8'; g.beginPath(); g.moveTo(x - 20 * s, y); g.quadraticCurveTo(x, y - 16 * s, x + 20 * s, y); g.quadraticCurveTo(x, y + 16 * s, x - 20 * s, y); g.fill();
    dot(g, x, y, 7 * s, '#5b7cff'); erase(g, () => dot(g, x, y, 3 * s, '#000'));
  };
  for (let ring_ = 0; ring_ < 4; ring_++) {
    const n = [1, 7, 13, 19][ring_], r = [0, 66, 128, 182][ring_], s = [1.6, 1.15, 0.95, 0.8][ring_];
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU + ring_ * 0.3; eye(256 + cos(a) * r, 256 + sin(a) * r * 0.9, s); }
  }
  for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; dot(g, 256 + cos(a) * 226, 256 + sin(a) * 226, 7, '#ffd08a'); }
}

/* 13.20–13.27: nature dances; the Person is the witness (13.23) */
export function drawWitnessDance(g, S) {
  /* the witness, still, in a circle of light */
  ring(g, 150, 250, 100, 3, 'rgba(255, 246, 220, 0.85)');
  dot(g, 150, 196, 20, '#fff6dc');
  g.fillStyle = '#fff6dc'; g.beginPath(); g.moveTo(124, 220); g.lineTo(176, 220); g.lineTo(190, 300); g.lineTo(110, 300); g.closePath(); g.fill();
  g.beginPath(); g.ellipse(150, 306, 60, 18, 0, 0, TAU); g.fill();
  /* nature, dancing, trailing her three colours */
  const cols = ['#fff6dc', '#ff4d6d', '#5b7cff'];
  cols.forEach((c, k) => { const p = []; for (let t = 0; t <= 1; t += 0.02) p.push(380 + 90 * sin(t * 7 + k * 2) * t, 120 + t * 330 + 20 * cos(t * 9 + k)); line(g, p, 4, c); });
  dot(g, 372, 160, 16, '#ffd08a');
  fillPoly(g, [366, 176, 380, 176, 420, 290, 330, 290], '#ff8fb1');
  line(g, [370, 190, 320, 150, 300, 120], 6, '#ffd08a'); line(g, [376, 190, 430, 220, 460, 200], 6, '#ffd08a');
  line(g, [360, 290, 340, 350], 7, '#ffd08a'); line(g, [390, 290, 420, 340, 440, 330], 7, '#ffd08a');
  g.setLineDash([4, 10]); line(g, [250, 250, 320, 230], 2, 'rgba(255, 231, 168, 0.7)'); g.setLineDash([]);
}

/* 13.28–13.35: as space everywhere is never stained, so the Self (13.33). The same sky inside every pot */
export function drawSpaceInPots(g, S) {
  for (let i = 0; i < 200; i++) dot(g, rnd() * 512, rnd() * 300, 0.8 + rnd() * 1.6, `rgba(255, 246, 220, ${0.4 + rnd() * 0.6})`);
  line(g, [20, 450, 492, 450], 2, 'rgba(245, 193, 92, 0.5)');
  const pot = (x, w, h, broken) => {
    g.fillStyle = '#c98a3a'; g.beginPath(); g.moveTo(x - w * 0.35, 450 - h); g.quadraticCurveTo(x - w * 1.1, 450 - h * 0.45, x - w * 0.4, 450); g.lineTo(x + w * 0.4, 450); g.quadraticCurveTo(x + w * 1.1, 450 - h * 0.45, x + w * 0.35, 450 - h); g.closePath(); g.fill();
    line(g, [x - w * 0.45, 450 - h, x + w * 0.45, 450 - h], 8, '#e0a458');
    erase(g, () => { g.beginPath(); g.ellipse(x, 450 - h * 0.48, w * 0.48, h * 0.3, 0, 0, TAU); g.fill(); if (broken) fillPoly(g, [x + w * 0.1, 450 - h, x + w * 0.8, 450 - h * 0.7, x + w * 0.4, 450 - h * 0.4], '#000'); });
    for (let i = 0; i < 18; i++) { const a = rnd() * TAU, r = Math.sqrt(rnd()); dot(g, x + cos(a) * r * w * 0.42, 450 - h * 0.48 + sin(a) * r * h * 0.26, 1.2, '#fff6dc'); }
  };
  pot(100, 70, 140, false); pot(240, 90, 190, false); pot(380, 66, 120, true);
  dot(g, 460, 70, 16, '#fff1c9');
}

/* story.js calls this with its sampler; returns lazily-sampled shapes keyed by name */
export default function gitaShapes({ sample2D }) {
  return {
    divyaDrishti: () => sample2D(drawDivyaDrishti, 2.45, 0.25),
    armies: () => sample2D(drawArmies, 2.7, 0.6),
    conchChorus: () => sample2D(drawConchChorus, 2.6, 0.3),
    fieldMap: () => sample2D(drawFieldMap, 2.5, 0.2),
    fallenBow: () => sample2D(drawFallenBow, 2.5, 0.25),
    jnanaMudra: () => sample2D(drawJnanaMudra, 2.45, 0.2),
    namaskar: () => sample2D(drawNamaskar, 2.45, 0.2),
    atmaFlame: () => sample2D(drawAtmaFlame, 2.5, 0.25),
    scales: () => sample2D(drawScales, 2.45, 0.2),
    fruitTree: () => sample2D(drawFruitTree, 2.5, 0.35),
    tortoise: () => sample2D(drawTortoise, 2.4, 0.3),
    ocean: () => sample2D(drawOcean, 2.6, 0.3),
    sunWheel: () => sample2D(drawSunWheel, 2.45, 0.2),
    gunaBraid: () => sample2D(drawGunaBraid, 2.5, 0.35),
    yajnaChakra: () => sample2D(drawYajnaChakra, 2.55, 0.25),
    diyaChain: () => sample2D(drawDiyaChain, 2.5, 0.3),
    puppet: () => sample2D(drawPuppet, 2.45, 0.2),
    veiledFire: () => sample2D(drawVeiledFire, 2.5, 0.25),
    jnanaSword: () => sample2D(drawJnanaSword, 2.45, 0.25),
    lineage: () => sample2D(drawLineage, 2.5, 0.25),
    avatara: () => sample2D(drawAvatara, 2.6, 0.25),
    allPaths: () => sample2D(drawAllPaths, 2.55, 0.3),
    stillHub: () => sample2D(drawStillHub, 2.5, 0.2),
    yajnaLadle: () => sample2D(drawYajnaLadle, 2.55, 0.25),
    jnanaBoat: () => sample2D(drawJnanaBoat, 2.6, 0.3),
    lotusLeaf: () => sample2D(drawLotusLeaf, 2.6, 0.25),
    twoRivers: () => sample2D(drawTwoRivers, 2.5, 0.25),
    nineGates: () => sample2D(drawNineGates, 2.5, 0.25),
    eclipse: () => sample2D(drawEclipse, 2.5, 0.2),
    samaDarshi: () => sample2D(drawSamaDarshi, 2.6, 0.25),
    bhrumadhya: () => sample2D(drawBhrumadhya, 2.45, 0.2),
    dhyani: () => sample2D(drawDhyani, 2.45, 0.2),
    ascent: () => sample2D(drawAscent, 2.6, 0.3),
    spine: () => sample2D(drawSpine, 2.45, 0.2),
    windlessLamp: () => sample2D(drawWindlessLamp, 2.5, 0.2),
    jewelNet: () => sample2D(drawJewelNet, 2.5, 0.3),
    kite: () => sample2D(drawKite, 2.55, 0.25),
    seedSpiral: () => sample2D(drawSeedSpiral, 2.55, 0.3),
    pearlThread: () => sample2D(drawPearlThread, 2.5, 0.25),
    ashtaPrakriti: () => sample2D(drawAshtaPrakriti, 2.5, 0.25),
    essences: () => sample2D(drawEssences, 2.55, 0.25),
    mayaVeil: () => sample2D(drawMayaVeil, 2.6, 0.3),
    fourDevotees: () => sample2D(drawFourDevotees, 2.5, 0.25),
    hourglass: () => sample2D(drawHourglass, 2.45, 0.2),
    yantra: () => sample2D(drawYantra, 2.5, 0.2),
    sevenPetals: () => sample2D(drawSevenPetals, 2.5, 0.25),
    birdCage: () => sample2D(drawBirdCage, 2.55, 0.25),
    atomSun: () => sample2D(drawAtomSun, 2.6, 0.3),
    brahmaDay: () => sample2D(drawBrahmaDay, 2.5, 0.25),
    lightSmoke: () => sample2D(drawLightSmoke, 2.55, 0.25),

    leafFlowerFruit: () => sample2D(drawLeafFlowerFruit, 2.5, 0.25),
    skyWind: () => sample2D(drawSkyWind, 2.55, 0.25),
    galaxy: () => sample2D(drawGalaxy, 2.6, 0.35),
    heatRain: () => sample2D(drawHeatRain, 2.55, 0.25),
    returnStairs: () => sample2D(drawReturnStairs, 2.5, 0.25),
    offeringHands: () => sample2D(drawOfferingHands, 2.5, 0.2),
    lotusMud: () => sample2D(drawLotusMud, 2.55, 0.25),

    peacockFeather: () => sample2D(drawPeacockFeather, 2.55, 0.25),
    heartLamp: () => sample2D(drawHeartLamp, 2.5, 0.2),
    stargazer: () => sample2D(drawStargazer, 2.65, 0.35),
    himalayas: () => sample2D(drawHimalayas, 2.6, 0.25),
    garuda: () => sample2D(drawGaruda, 2.6, 0.25),
    tejasAmsha: () => sample2D(drawTejasAmsha, 2.55, 0.3),

    vishvarupa: () => sample2D(drawVishvarupa, 2.6, 0.3),
    universeBody: () => sample2D(drawUniverseBody, 2.55, 0.25),
    thousandSuns: () => sample2D(drawThousandSuns, 2.6, 0.35),
    sunMoonEyes: () => sample2D(drawSunMoonEyes, 2.6, 0.25),
    mothsFlame: () => sample2D(drawMothsFlame, 2.6, 0.3),
    kalaMouth: () => sample2D(drawKalaMouth, 2.6, 0.3),
    chaturbhuja: () => sample2D(drawChaturbhuja, 2.55, 0.2),
    clasp: () => sample2D(drawClasp, 2.5, 0.2),

    rasaCircle: () => sample2D(drawRasaCircle, 2.55, 0.25),
    rescueHand: () => sample2D(drawRescueHand, 2.6, 0.25),
    fourSteps: () => sample2D(drawFourSteps, 2.55, 0.25),
    swanLake: () => sample2D(drawSwanLake, 2.6, 0.25),

    oneSunWorld: () => sample2D(drawOneSunWorld, 2.6, 0.25),
    fieldGrid: () => sample2D(drawFieldGrid, 2.55, 0.25),
    bowedReeds: () => sample2D(drawBowedReeds, 2.6, 0.3),
    eyesEverywhere: () => sample2D(drawEyesEverywhere, 2.55, 0.3),
    witnessDance: () => sample2D(drawWitnessDance, 2.55, 0.25),
    spaceInPots: () => sample2D(drawSpaceInPots, 2.6, 0.25),
  };
}

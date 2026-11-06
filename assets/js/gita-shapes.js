/* Gita Gyan scenes: one particle drawing per scene of Chapters 1 to 4.
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
  };
}

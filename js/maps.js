'use strict';

// ─── Map definitions ──────────────────────────────────────────────────────────
const MAP_DEFS = [
  {
    id: 'ironhold',
    name: 'Айронхолд',
    difficulty: 'Нормальная',
    diffColor: '#2ecc71',
    desc: 'Классический извилистый путь. Идеально для новичков.',
    bonusDesc: 'Стандартные условия',
    goldMult:   1,
    speedMult:  1,
    damageMult: 1,
    enemyMult:  1,
    expertMode: false,
    coords: [
      [0,2],[1,2],[2,2],[3,2],[4,2],[5,2],
      [5,3],[5,4],[5,5],[5,6],
      [6,6],[7,6],[8,6],[9,6],[10,6],[11,6],
      [11,5],[11,4],[11,3],[11,2],
      [12,2],[13,2],[14,2],[15,2],
      [15,3],[15,4],[15,5],[15,6],[15,7],[15,8],
      [14,8],[13,8],[12,8],[11,8],[10,8],[9,8],[8,8],
      [8,9],[8,10],[8,11],
      [9,11],[10,11],[11,11],[12,11],[13,11],[14,11],[15,11],[16,11],[17,11],
      [17,10],[17,9],[17,8],[17,7],[17,6],
      [18,6],[19,6],[20,6],[21,6],
    ],
  },
  {
    id: 'gorge',
    name: 'Ущелье теней',
    difficulty: 'Сложная',
    diffColor: '#f39c12',
    desc: 'Короткий путь — враги добегают быстро. Больше золота за убийство.',
    bonusDesc: '+25% золото · враги +20% скорость',
    goldMult:   1.25,
    speedMult:  1.20,
    damageMult: 1,
    enemyMult:  1,
    expertMode: false,
    coords: [
      [0,7],[1,7],[2,7],[3,7],[4,7],
      [4,6],[4,5],[4,4],[4,3],
      [5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],[12,3],[13,3],[14,3],[15,3],[16,3],[17,3],
      [17,4],[17,5],[17,6],[17,7],[17,8],[17,9],[17,10],
      [18,10],[19,10],[20,10],[21,10],
    ],
  },
  {
    id: 'maze',
    name: 'Лабиринт',
    difficulty: 'Эксперт',
    diffColor: '#e74c3c',
    desc: 'Длинный запутанный путь. Много места для башен, но враги очень сильны.',
    bonusDesc: 'Башни −15% урон · врагов −20% за волну',
    goldMult:   1,
    speedMult:  1,
    damageMult: 0.85,
    enemyMult:  0.8,
    expertMode: true,
    coords: [
      [0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],
      [10,1],[11,1],[12,1],[13,1],[14,1],[15,1],[16,1],[17,1],[18,1],[19,1],
      [19,2],[19,3],[19,4],
      [18,4],[17,4],[16,4],[15,4],[14,4],[13,4],[12,4],[11,4],[10,4],[9,4],[8,4],[7,4],[6,4],[5,4],[4,4],[3,4],[2,4],
      [2,5],[2,6],[2,7],[2,8],
      [3,8],[4,8],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[15,8],[16,8],[17,8],[18,8],[19,8],
      [19,9],[19,10],[19,11],
      [20,11],[21,11],
    ],
  },
];

// ─── Map selection screen ─────────────────────────────────────────────────────
class MapSelectScreen {
  constructor(game, onSelect) {
    this.game     = game;
    this.onSelect = onSelect;
    this._el      = null;
  }

  show() {
    const el = document.createElement('div');
    el.id = 'mapSelectModal';

    const box = document.createElement('div');
    box.id = 'mapSelectBox';

    const title = document.createElement('h2');
    title.textContent = '⚔ Выбери поле битвы';
    box.appendChild(title);

    const cards = document.createElement('div');
    cards.id = 'mapSelectCards';
    box.appendChild(cards);

    el.appendChild(box);
    document.body.appendChild(el);
    this._el = el;

    MAP_DEFS.forEach(map => {
      const card = this._buildCard(map);
      cards.appendChild(card);
    });

    // Trigger entry animation
    requestAnimationFrame(() => el.classList.add('map-select--visible'));
  }

  _buildCard(map) {
    const card = document.createElement('div');
    card.className = 'map-card';

    // Name
    const name = document.createElement('div');
    name.className = 'map-card-name';
    name.textContent = map.name;
    card.appendChild(name);

    // Path preview canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'map-preview';
    canvas.width  = 198;
    canvas.height = 112;
    card.appendChild(canvas);

    // Draw preview on next frame so canvas is in DOM
    requestAnimationFrame(() => this._drawPreview(canvas, map));

    // Difficulty badge
    const diff = document.createElement('div');
    diff.className = 'map-diff';
    diff.style.color = map.diffColor;
    diff.textContent = map.difficulty;
    card.appendChild(diff);

    // Description
    const desc = document.createElement('div');
    desc.className = 'map-desc';
    desc.textContent = map.desc;
    card.appendChild(desc);

    // Bonus
    const bonus = document.createElement('div');
    bonus.className = 'map-bonus';
    bonus.textContent = map.bonusDesc;
    card.appendChild(bonus);

    // Select button
    const btn = document.createElement('button');
    btn.className = 'map-select-btn';
    btn.textContent = 'Выбрать';
    btn.addEventListener('click', () => this._pick(map));
    card.appendChild(btn);

    return card;
  }

  _drawPreview(canvas, map) {
    const ctx  = canvas.getContext('2d');
    const W    = canvas.width;
    const H    = canvas.height;
    const COLS = 22, ROWS = 14;
    const cw   = W / COLS;
    const ch   = H / ROWS;

    // Dark grass background
    ctx.fillStyle = '#1e3a1a';
    ctx.fillRect(0, 0, W, H);

    // Faint grid
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 0.5;
    for (let c = 1; c < COLS; c++) {
      ctx.beginPath(); ctx.moveTo(c * cw, 0); ctx.lineTo(c * cw, H); ctx.stroke();
    }
    for (let r = 1; r < ROWS; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * ch); ctx.lineTo(W, r * ch); ctx.stroke();
    }

    // Path cells (sandy fill)
    ctx.fillStyle = '#b89a55';
    map.coords.forEach(([c, r]) => {
      ctx.fillRect(c * cw + 0.5, r * ch + 0.5, cw - 1, ch - 1);
    });

    // Path centre-line
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth   = 1.5;
    ctx.lineJoin    = 'round';
    ctx.lineCap     = 'round';
    ctx.beginPath();
    map.coords.forEach(([c, r], i) => {
      const x = c * cw + cw / 2, y = r * ch + ch / 2;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Start dot (green)
    const [sc, sr] = map.coords[0];
    ctx.fillStyle = '#27ae60';
    ctx.beginPath();
    ctx.arc(sc * cw + cw / 2, sr * ch + ch / 2, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // End dot (red)
    const [ec, er] = map.coords[map.coords.length - 1];
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(ec * cw + cw / 2, er * ch + ch / 2, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Path length label
    const len = map.coords.length;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(W - 54, H - 17, 52, 16);
    ctx.fillStyle = '#ccc';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${len} клеток`, W - 3, H - 5);
  }

  _pick(mapDef) {
    if (this._el) {
      this._el.classList.remove('map-select--visible');
      this._el.classList.add('map-select--hiding');
      setTimeout(() => {
        if (this._el) { this._el.remove(); this._el = null; }
        this.onSelect(mapDef);
      }, 380);
    } else {
      this.onSelect(mapDef);
    }
  }
}

// ─── Deterministic pseudo-random (maps.js copy — CELL/COLS/ROWS from game.js) ─
function _sr(a, b, s = 0) {
  const x = Math.sin(a * 127.1 + b * 311.7 + s * 74.3) * 43758.5453;
  return x - Math.floor(x);
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ПУСТЫНЯ РУИН  (gorge)
// ═══════════════════════════════════════════════════════════════════════════════

function _gorgeInit(game) {
  const { pathSet, pathCoords } = game;
  const corners = new Set();
  [[0,0],[19,0],[0,11],[19,11]].forEach(([cc,cr]) => {
    for (let dc = 0; dc < 3; dc++) for (let dr = 0; dr < 3; dr++) corners.add(`${cc+dc},${cr+dr}`);
  });

  // Sandy floor colors
  game.gorgeColors = {};
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    if (pathSet.has(`${c},${r}`)) continue;
    const v = 0.78 + _sr(c, r, 0) * 0.44;
    game.gorgeColors[`${c},${r}`] = `rgb(${Math.round(210*v)},${Math.round(168*v)},${Math.round(98*v)})`;
  }

  // Path direction map + arrow cells (same logic as ironhold)
  game.pathDirMap = {};
  pathCoords.forEach(([c,r], i) => {
    const nxt = pathCoords[i+1], prv = pathCoords[i-1];
    let dx = 0, dy = 0;
    if (nxt) { dx = nxt[0]-c; dy = nxt[1]-r; } else if (prv) { dx = c-prv[0]; dy = r-prv[1]; }
    game.pathDirMap[`${c},${r}`] = { dx, dy };
  });
  game.arrowCells = new Set();
  for (let i = 2; i < pathCoords.length - 1; i++) {
    const [c0,r0] = pathCoords[i-1], [c1,r1] = pathCoords[i], [c2,r2] = pathCoords[i+1];
    if (c1-c0 === c2-c1 && r1-r0 === r2-r1 && i % 3 === 2) game.arrowCells.add(`${c1},${r1}`);
  }

  // Small desert decors
  const taken = new Set([...pathSet, ...corners]);
  game.gorgeDecors = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    if (taken.has(`${c},${r}`)) continue;
    if (_sr(c, r, 1) < 0.18) {
      const type = Math.floor(_sr(c, r, 2) * 3); // 0=pebble 1=dry grass 2=dark sand
      game.gorgeDecors.push({
        type, x: c*CELL + 5 + _sr(c,r,3)*(CELL-10), y: r*CELL + 5 + _sr(c,r,4)*(CELL-10),
        size: type===0 ? 2+_sr(c,r,5)*2 : type===1 ? 3+_sr(c,r,5)*3 : 5+_sr(c,r,5)*4,
      });
    }
  }

  // Broken columns
  game.gorgeColumns = [];
  for (let seed = 0; game.gorgeColumns.length < 7 && seed < 400; seed++) {
    const c = Math.floor(_sr(seed,0,10)*COLS), r = Math.floor(_sr(seed,1,10)*ROWS);
    const key = `${c},${r}`;
    if (taken.has(key)) continue;
    taken.add(key);
    game.gorgeColumns.push({ x: c*CELL+CELL/2, y: r*CELL+CELL/2,
      h: 12+_sr(c,r,6)*16, broken: _sr(c,r,7) > 0.5 });
  }

  // Cacti
  game.gorgeCacti = [];
  for (let seed = 100; game.gorgeCacti.length < 8 && seed < 500; seed++) {
    const c = Math.floor(_sr(seed,0,11)*COLS), r = Math.floor(_sr(seed,1,11)*ROWS);
    const key = `${c},${r}`;
    if (taken.has(key)) continue;
    taken.add(key);
    game.gorgeCacti.push({ x: c*CELL+CELL/2, y: r*CELL+CELL/2, h: 16+_sr(c,r,8)*14 });
  }

  // Dead trees
  game.gorgeDeadTrees = [];
  for (let seed = 200; game.gorgeDeadTrees.length < 5 && seed < 600; seed++) {
    const c = Math.floor(_sr(seed,0,12)*COLS), r = Math.floor(_sr(seed,1,12)*ROWS);
    const key = `${c},${r}`;
    if (taken.has(key)) continue;
    taken.add(key);
    game.gorgeDeadTrees.push({ x: c*CELL+CELL/2, y: r*CELL+CELL/2,
      trunk: 3+_sr(c,r,9)*2, h: 18+_sr(c,r,10)*16 });
  }

  // Sand rocks
  game.gorgeRocks = [];
  for (let seed = 300; game.gorgeRocks.length < 6 && seed < 700; seed++) {
    const c = Math.floor(_sr(seed,0,13)*COLS), r = Math.floor(_sr(seed,1,13)*ROWS);
    const key = `${c},${r}`;
    if (taken.has(key)) continue;
    taken.add(key);
    const n = 5 + Math.floor(_sr(c,r,11)*3);
    const pts = Array.from({length:n}, (_,p) => {
      const a = (p/n)*Math.PI*2, rd = 8+_sr(c+p,r,12)*7;
      return { dx: Math.cos(a)*rd, dy: Math.sin(a)*rd };
    });
    game.gorgeRocks.push({ x: c*CELL+CELL/2, y: r*CELL+CELL/2, pts });
  }

  // Road cracks
  game.gorgeRoadCracks = [];
  pathCoords.forEach(([c,r]) => {
    if (_sr(c,r,20) < 0.45) {
      const n = 2 + Math.floor(_sr(c,r,21)*3);
      for (let i = 0; i < n; i++) {
        game.gorgeRoadCracks.push({
          x: c*CELL + 4 + _sr(c+i,r,22)*(CELL-8),
          y: r*CELL + 4 + _sr(c+i,r,23)*(CELL-8),
          len: 6 + _sr(c+i,r,24)*12,
          angle: _sr(c+i,r,25)*Math.PI,
        });
      }
    }
  });

  // Sand particles (drift right-to-left)
  game.gorgeParticles = Array.from({length:40}, () => ({
    x: Math.random()*COLS*CELL, y: Math.random()*ROWS*CELL,
    vx: -(0.5 + Math.random()*1.5), vy: (Math.random()-0.5)*0.4,
    size: 1+Math.random()*2, alpha: 0.2+Math.random()*0.4,
    life: Math.random()*200, maxLife: 150+Math.random()*100,
  }));

  // Dust clouds (sandy colour)
  game.clouds = Array.from({length:2}, (_,i) => ({
    x: _sr(i,0,50)*COLS*CELL, y: 15+_sr(i,1,50)*55,
    w: 85+_sr(i,2,50)*65, h: 22+_sr(i,3,50)*14, speed: 0.1+_sr(i,4,50)*0.12,
  }));

  // Spawn camp: bones and skulls
  const [sc0, sr0] = pathCoords[0];
  const scx0 = sc0*CELL, scy0 = sr0*CELL + CELL/2;
  game.gorgeSpawnBones = Array.from({length:9}, (_,i) => ({
    x: scx0 + 4 + _sr(i,0,60)*64, y: scy0 + (_sr(i,1,60)-0.5)*CELL*2.6,
    len: 8 + _sr(i,2,60)*13, angle: _sr(i,3,60)*Math.PI,
  }));
  game.gorgeSpawnSkulls = Array.from({length:3}, (_,i) => ({
    x: scx0 + 6 + _sr(i,4,60)*44, y: scy0 + (_sr(i,5,60)-0.5)*CELL*2.2,
  }));
}

// ─── Gorge corner art ─────────────────────────────────────────────────────────
function _gorgeTL(ctx) {
  // Broken desert temple (top-left)
  const ox = 0, oy = 0;
  ctx.fillStyle = '#c4a060'; ctx.fillRect(ox, oy, 108, 108);
  // Cracked floor
  ctx.fillStyle = '#c8a868'; ctx.fillRect(ox+8, oy+58, 92, 50);
  ctx.strokeStyle = '#8a7040'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(ox+22,oy+72); ctx.lineTo(ox+42,oy+92); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox+62,oy+66); ctx.lineTo(ox+86,oy+76); ctx.stroke();
  // Left column (standing)
  ctx.fillStyle = '#d4bc7a'; ctx.fillRect(ox+12,oy+28,14,80);
  ctx.fillStyle = '#b09050'; ctx.fillRect(ox+22,oy+28,4,80);
  ctx.fillStyle = '#d4bc7a'; ctx.fillRect(ox+8,oy+20,22,10); // capital
  // Right column (broken, fallen)
  ctx.fillStyle = '#d4bc7a'; ctx.fillRect(ox+78,oy+44,14,64);
  ctx.save(); ctx.translate(ox+68, oy+54); ctx.rotate(0.5);
  ctx.fillStyle = '#d4bc7a'; ctx.fillRect(-7,-22,14,22); ctx.restore();
  // Lintel (top beam, broken in middle)
  ctx.fillStyle = '#c8b068';
  ctx.fillRect(ox+12,oy+20,36,10); ctx.fillRect(ox+60,oy+28,36,10);
  // Sand dunes at base
  ctx.fillStyle = '#debb6e';
  ctx.beginPath(); ctx.ellipse(ox+30,oy+108,42,18,0,Math.PI,0); ctx.fill();
  ctx.beginPath(); ctx.ellipse(ox+88,oy+108,26,12,0,Math.PI,0); ctx.fill();
}

function _gorgeTR(ctx) {
  // Cracked obelisk (top-right)
  const ox = 19*CELL, oy = 0;
  ctx.fillStyle = '#c4a060'; ctx.fillRect(ox, oy, 3*CELL, 108);
  const cx = ox + 3*CELL/2;
  // Base blocks
  ctx.fillStyle = '#c8b068'; ctx.fillRect(cx-18, oy+76, 36, 32); ctx.fillRect(cx-14, oy+66, 28, 12);
  // Shaft (tapered)
  ctx.fillStyle = '#d4bc7a';
  ctx.beginPath(); ctx.moveTo(cx-10,oy+66); ctx.lineTo(cx+10,oy+66);
  ctx.lineTo(cx+5,oy+16); ctx.lineTo(cx-5,oy+16); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#b09050'; ctx.fillRect(cx+2,oy+16,3,50);
  // Tip
  ctx.fillStyle = '#e0cc88';
  ctx.beginPath(); ctx.moveTo(cx-5,oy+16); ctx.lineTo(cx+5,oy+16); ctx.lineTo(cx,oy+5); ctx.closePath(); ctx.fill();
  // Crack
  ctx.strokeStyle = '#8a7040'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx-2,oy+38); ctx.lineTo(cx+4,oy+52); ctx.lineTo(cx-1,oy+62); ctx.stroke();
  // Glyphs
  ctx.strokeStyle = 'rgba(100,80,20,0.4)'; ctx.lineWidth = 0.8;
  [26,38,50].forEach(gy => { ctx.beginPath(); ctx.moveTo(cx-5,oy+gy); ctx.lineTo(cx+5,oy+gy); ctx.stroke(); });
  // Sand drift
  ctx.fillStyle = '#debb6e';
  ctx.beginPath(); ctx.ellipse(cx, oy+108, 38, 14, 0, Math.PI, 0); ctx.fill();
}

function _gorgeBL(ctx) {
  // Fortress wall ruins (bottom-left)
  const ox = 0, oy = 11*CELL;
  ctx.fillStyle = '#c4a060'; ctx.fillRect(ox, oy, 108, 3*CELL);
  // Wall body
  ctx.fillStyle = '#b09050'; ctx.fillRect(ox+4, oy+10, 100, 50);
  // Battlements (some missing)
  [0,2,3,5,7].forEach(m => { ctx.fillStyle='#b09050'; ctx.fillRect(ox+6+m*14,oy+1,10,11); });
  // Cracks
  ctx.strokeStyle = '#7a6030'; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(ox+32,oy+12); ctx.lineTo(ox+38,oy+58); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox+72,oy+12); ctx.lineTo(ox+66,oy+42); ctx.stroke();
  // Rubble at base
  ctx.fillStyle = '#c8a860'; ctx.fillRect(ox+4, oy+58, 100, 3*CELL-60);
  [[18,62,16,10],[52,68,14,10],[78,64,12,8],[32,76,10,8]].forEach(([x,y,w,h]) => {
    ctx.fillStyle = '#b09050'; ctx.fillRect(ox+x,oy+y,w,h);
    ctx.strokeStyle='rgba(0,0,0,0.18)'; ctx.lineWidth=0.5; ctx.strokeRect(ox+x,oy+y,w,h);
  });
  // Sand drift
  ctx.fillStyle = '#debb6e';
  ctx.beginPath(); ctx.ellipse(ox+54, oy+3*CELL, 58, 16, 0, Math.PI, 0); ctx.fill();
}

function _gorgeBR(ctx) {
  // Giant stone skull monument (bottom-right)
  const ox = 19*CELL, oy = 11*CELL;
  ctx.fillStyle = '#c4a060'; ctx.fillRect(ox, oy, 3*CELL, 3*CELL);
  const cx = ox + 3*CELL/2, cy = oy + 3*CELL/2 - 12;
  const r = 32;
  // Cranium
  ctx.fillStyle = '#c8b570';
  ctx.beginPath(); ctx.ellipse(cx, cy-4, r, r*0.85, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#b8a560';
  ctx.beginPath(); ctx.ellipse(cx+r*0.25,cy-r*0.4,r*0.28,r*0.22,-0.3,0,Math.PI*2); ctx.fill();
  // Jaw
  ctx.fillStyle = '#c0aa64';
  ctx.beginPath(); ctx.moveTo(cx-r*0.65,cy+r*0.25);
  ctx.quadraticCurveTo(cx,cy+r*0.82,cx+r*0.65,cy+r*0.25);
  ctx.lineTo(cx+r*0.5,cy+r*0.15);
  ctx.quadraticCurveTo(cx,cy+r*0.62,cx-r*0.5,cy+r*0.15);
  ctx.closePath(); ctx.fill();
  // Eyes
  ctx.fillStyle = '#402810';
  ctx.beginPath(); ctx.ellipse(cx-r*0.35,cy-r*0.1,r*0.19,r*0.22,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+r*0.35,cy-r*0.1,r*0.19,r*0.22,0,0,Math.PI*2); ctx.fill();
  // Nose
  ctx.fillStyle = '#5a3818';
  ctx.beginPath(); ctx.moveTo(cx-6,cy+r*0.18); ctx.lineTo(cx+6,cy+r*0.18); ctx.lineTo(cx,cy+r*0.36); ctx.closePath(); ctx.fill();
  // Teeth
  ctx.fillStyle = '#d4c87a';
  [-2,-1,0,1,2].forEach(t => { ctx.fillRect(cx+t*11-4,cy+r*0.44,8,12); });
  // Crack
  ctx.strokeStyle = '#8a7040'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx-3,cy-r*0.78); ctx.lineTo(cx+2,cy-r*0.3); ctx.stroke();
  // Base
  ctx.fillStyle = '#b09050'; ctx.fillRect(cx-r*0.6,oy+3*CELL-20,r*1.2,20);
}

// ─── Gorge draw ───────────────────────────────────────────────────────────────
function _gorgeDraw(ctx, game) {
  const W = game.canvas.width, H = game.canvas.height;
  const { pathSet, pathCoords, pathDirMap, arrowCells } = game;

  // 1. Sandy ground
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    if (pathSet.has(`${c},${r}`)) continue;
    ctx.fillStyle = game.gorgeColors[`${c},${r}`] || '#d4a855';
    ctx.fillRect(c*CELL, r*CELL, CELL, CELL);
  }

  // 2. Desert decors (pebbles / dry grass / dark sand)
  game.gorgeDecors.forEach(d => {
    if (d.type === 0) {
      ctx.fillStyle = '#b89060';
      ctx.beginPath(); ctx.arc(d.x, d.y, d.size, 0, Math.PI*2); ctx.fill();
    } else if (d.type === 1) {
      ctx.strokeStyle = '#c8a840'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(d.x, d.y+d.size); ctx.lineTo(d.x-d.size*0.5, d.y-d.size*0.5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(d.x, d.y+d.size); ctx.lineTo(d.x+d.size*0.5, d.y-d.size*0.7); ctx.stroke();
    } else {
      ctx.fillStyle = 'rgba(150,100,40,0.25)';
      ctx.fillRect(d.x-d.size/2, d.y-d.size/2, d.size, d.size);
    }
  });

  // 3. Death stains
  game.deathStains.forEach(s => {
    ctx.save(); ctx.globalAlpha = (s.life/s.maxLife)*0.3;
    ctx.fillStyle = '#5a3010';
    ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); ctx.restore();
  });

  // 4. Sand rocks
  game.gorgeRocks.forEach(rock => {
    ctx.fillStyle = '#c0955a';
    ctx.beginPath(); ctx.moveTo(rock.x+rock.pts[0].dx, rock.y+rock.pts[0].dy);
    rock.pts.forEach(p => ctx.lineTo(rock.x+p.dx, rock.y+p.dy));
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,220,150,0.28)';
    ctx.beginPath(); ctx.moveTo(rock.x+rock.pts[0].dx*0.6, rock.y+rock.pts[0].dy*0.6);
    rock.pts.slice(0,3).forEach(p => ctx.lineTo(rock.x+p.dx*0.6, rock.y+p.dy*0.6));
    ctx.closePath(); ctx.fill();
  });

  // 5. Broken columns
  game.gorgeColumns.forEach(({x,y,h,broken}) => {
    // Base
    ctx.fillStyle = '#d4c090'; ctx.fillRect(x-6,y+h/2-2,12,4);
    // Shaft
    ctx.fillStyle = '#c8b078'; ctx.fillRect(x-4,y-h/2,8,h);
    ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(x+2,y-h/2,2,h);
    if (broken) {
      ctx.save(); ctx.translate(x+10,y-h/2+6); ctx.rotate(0.8);
      ctx.fillStyle = '#c8b078'; ctx.fillRect(-4,-h*0.35,8,h*0.35); ctx.restore();
      ctx.strokeStyle = '#8a7040'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x-2,y-h/2+2); ctx.lineTo(x+3,y-h/2+8); ctx.stroke();
    } else {
      ctx.fillStyle = '#d4c090'; ctx.fillRect(x-7,y-h/2-4,14,5);
    }
  });

  // 6. Dead trees
  game.gorgeDeadTrees.forEach(({x,y,trunk,h}) => {
    ctx.fillStyle = '#7a5a38'; ctx.fillRect(x-trunk/2, y-h*0.6, trunk, h*0.6);
    ctx.strokeStyle = '#6a4a28'; ctx.lineWidth = trunk*0.6;
    [[-0.8,-0.9,-1.2,-1.1],[0.6,-0.8,1.0,-0.95],[-0.4,-0.6,-0.8,-0.75],[0.3,-0.5,0.7,-0.6]].forEach(([bx1,by1,bx2,by2]) => {
      ctx.beginPath();
      ctx.moveTo(x+bx1*h*0.3, y+by1*h*0.6);
      ctx.lineTo(x+bx2*h*0.36, y+by2*h*0.6);
      ctx.stroke();
    });
  });

  // 7. Cacti
  game.gorgeCacti.forEach(({x,y,h}) => {
    ctx.fillStyle = '#5a8a3a';
    ctx.fillRect(x-4, y-h/2, 8, h);        // trunk
    ctx.fillRect(x-10, y-h*0.1, 6, 4);      // left arm base
    ctx.fillRect(x-10, y-h*0.42, 4, h*0.33); // left arm up
    ctx.fillRect(x+4, y+h*0.06, 6, 4);       // right arm base
    ctx.fillRect(x+6, y-h*0.24, 4, h*0.3);   // right arm up
    ctx.strokeStyle = '#8ab85a'; ctx.lineWidth = 0.8;
    for (let sp = 0; sp < 4; sp++) {
      const sy = y - h/2 + sp*(h/4);
      ctx.beginPath(); ctx.moveTo(x-4,sy); ctx.lineTo(x-8,sy-2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x+4,sy); ctx.lineTo(x+8,sy-2); ctx.stroke();
    }
  });

  // 8. Desert road
  for (let i = 0; i < pathCoords.length; i++) {
    const [c,r] = pathCoords[i];
    const px = c*CELL, py = r*CELL;
    ctx.fillStyle = '#c8996a'; ctx.fillRect(px,py,CELL,CELL);
    // Orange-brown edge
    ctx.fillStyle = '#a0724a';
    [[-1,0,0,0,3,CELL],[1,0,CELL-3,0,3,CELL],[0,-1,0,0,CELL,3],[0,1,0,CELL-3,CELL,3]]
      .forEach(([dc,dr,ex,ey,ew,eh]) => {
        if (!pathSet.has(`${c+dc},${r+dr}`)) ctx.fillRect(px+ex,py+ey,ew,eh);
      });
    // Ruts
    const dir = pathDirMap[`${c},${r}`];
    if (dir) {
      ctx.fillStyle = 'rgba(0,0,0,0.10)';
      const cx = px+CELL/2, cy = py+CELL/2;
      if (dir.dx !== 0) { ctx.fillRect(px,cy-9,CELL,3); ctx.fillRect(px,cy+6,CELL,3); }
      else              { ctx.fillRect(cx-9,py,3,CELL); ctx.fillRect(cx+6,py,3,CELL); }
    }
    // Arrows
    if (arrowCells.has(`${c},${r}`) && dir) {
      ctx.save(); ctx.translate(px+CELL/2,py+CELL/2); ctx.rotate(Math.atan2(dir.dy,dir.dx));
      ctx.fillStyle = 'rgba(120,80,30,0.28)';
      ctx.beginPath(); ctx.moveTo(7,0); ctx.lineTo(-5,-5); ctx.lineTo(-5,5); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
  }

  // 9. Road cracks
  ctx.strokeStyle = 'rgba(100,60,20,0.4)'; ctx.lineWidth = 1;
  game.gorgeRoadCracks.forEach(cr => {
    ctx.beginPath(); ctx.moveTo(cr.x, cr.y);
    ctx.lineTo(cr.x+Math.cos(cr.angle)*cr.len, cr.y+Math.sin(cr.angle)*cr.len);
    ctx.stroke();
  });

  // 10. Corner art (all four gorge corners are clear of the path)
  _gorgeTL(ctx); _gorgeTR(ctx); _gorgeBL(ctx); _gorgeBR(ctx);

  // 10.5. Spawn camp (nomad tent)
  _gorgeDrawSpawn(ctx, game);

  // 11. Entry gate (broken stone arch with skull pillars)
  _gorgeDrawEntry(ctx, game);

  // 12. Grid (sandy, very subtle)
  ctx.strokeStyle = 'rgba(100,70,20,0.07)'; ctx.lineWidth = 0.5;
  for (let r = 0; r <= ROWS; r++) { ctx.beginPath(); ctx.moveTo(0,r*CELL); ctx.lineTo(W,r*CELL); ctx.stroke(); }
  for (let c = 0; c <= COLS; c++) { ctx.beginPath(); ctx.moveTo(c*CELL,0); ctx.lineTo(c*CELL,H); ctx.stroke(); }

  // 13. Border
  ctx.strokeStyle = '#7a5520'; ctx.lineWidth = 4; ctx.strokeRect(2,2,W-4,H-4);

  // 14. Desert day overlay (warm permanent tint)
  ctx.fillStyle = 'rgba(255,175,55,0.09)'; ctx.fillRect(0,0,W,H);

  // 15. Mirage shimmer over road
  const mT = game.frame * 0.04;
  pathCoords.forEach(([c,r], idx) => {
    const sh = Math.sin(mT + idx*0.3)*0.5 + 0.5;
    if (sh > 0.72) {
      ctx.save(); ctx.globalAlpha = (sh-0.72)*0.07;
      ctx.fillStyle = '#fffbe0'; ctx.fillRect(c*CELL,r*CELL,CELL,CELL); ctx.restore();
    }
  });

  // 16. Sand particles
  game.gorgeParticles.forEach(p => {
    ctx.save(); ctx.globalAlpha = p.alpha*(p.life/p.maxLife);
    ctx.fillStyle = '#e0c070';
    ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill(); ctx.restore();
  });

  // 17. Dust clouds
  game.clouds.forEach(cl => {
    ctx.save(); ctx.globalAlpha = 0.16; ctx.fillStyle = '#e8d080';
    ctx.beginPath(); ctx.ellipse(cl.x,cl.y,cl.w/2,cl.h/2,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cl.x-cl.w*0.27,cl.y+5,cl.w*0.33,cl.h*0.48,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cl.x+cl.w*0.27,cl.y+7,cl.w*0.28,cl.h*0.42,0,0,Math.PI*2); ctx.fill();
    ctx.restore();
  });
}

// ─── Gorge spawn: nomad tent ──────────────────────────────────────────────────
function _gorgeDrawSpawn(ctx, game) {
  const [ec, er] = game.pathCoords[0];
  const ox = ec * CELL;          // 0
  const oy = er * CELL;          // e.g. 7*36
  const cy = oy + CELL / 2;
  const t  = game.frame;

  // Camp ground — darker oval of sand
  ctx.fillStyle = '#9e7440';
  ctx.beginPath();
  ctx.ellipse(ox + 24, cy, 66, 54, 0, 0, Math.PI * 2);
  ctx.fill();

  // Sand footprint tracks on first 3 path cells
  for (let i = 0; i < 3; i++) {
    const tx = ox + i * CELL;
    ctx.fillStyle = 'rgba(80,50,10,0.18)';
    [[tx+9, cy-8],[tx+21, cy-8],[tx+9, cy+8],[tx+21, cy+8]].forEach(([fx,fy]) => {
      ctx.beginPath(); ctx.ellipse(fx, fy, 4, 2.2, 0.3, 0, Math.PI*2); ctx.fill();
    });
  }

  // Bones
  ctx.lineCap = 'round';
  game.gorgeSpawnBones.forEach(b => {
    ctx.strokeStyle = '#d4c882'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(b.x, b.y);
    ctx.lineTo(b.x + b.len*Math.cos(b.angle), b.y + b.len*Math.sin(b.angle));
    ctx.stroke();
    ctx.fillStyle = '#d4c882';
    ctx.beginPath(); ctx.arc(b.x, b.y, 3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(b.x+b.len*Math.cos(b.angle), b.y+b.len*Math.sin(b.angle), 3, 0, Math.PI*2); ctx.fill();
  });

  // Skulls
  game.gorgeSpawnSkulls.forEach(sk => { _miniSkull(ctx, sk.x, sk.y, '#c8b870'); });

  // ── Tent body ──────────────────────────────────────────────────────────────
  const peakX = ox + 8, peakY = cy - 44;
  const tentW = 60;
  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.beginPath();
  ctx.moveTo(ox, cy-36); ctx.lineTo(ox+tentW, cy-14);
  ctx.lineTo(ox+tentW+2, cy+14); ctx.lineTo(ox, cy+36);
  ctx.closePath(); ctx.fill();
  // Back wall (dark left edge)
  ctx.fillStyle = '#8a6830'; ctx.fillRect(ox, cy-36, 13, 72);
  // Roof left panel (shadow side)
  ctx.fillStyle = '#b89048';
  ctx.beginPath();
  ctx.moveTo(peakX, peakY);
  ctx.lineTo(ox, cy-36); ctx.lineTo(ox, cy+36);
  ctx.lineTo(ox+12, cy+40); ctx.lineTo(ox+tentW-10, cy+14);
  ctx.lineTo(ox+tentW-12, cy-14); ctx.closePath(); ctx.fill();
  // Roof right panel (lit face)
  ctx.fillStyle = '#d0aa60';
  ctx.beginPath();
  ctx.moveTo(peakX, peakY);
  ctx.lineTo(ox+tentW-12, cy-14); ctx.lineTo(ox+tentW, cy);
  ctx.lineTo(ox+tentW-12, cy+14); ctx.lineTo(ox+12, cy+40);
  ctx.closePath(); ctx.fill();
  // Seam / ridge lines
  ctx.strokeStyle = 'rgba(0,0,0,0.18)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(peakX, peakY); ctx.lineTo(ox+tentW-12, cy-14); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(peakX, peakY); ctx.lineTo(ox+12, cy+40); ctx.stroke();
  // Wear patches
  ctx.fillStyle = 'rgba(100,68,18,0.22)';
  ctx.fillRect(ox+22, cy-18, 13, 11); ctx.fillRect(ox+38, cy+6, 9, 9);
  // Ridge pole
  ctx.strokeStyle = '#5a3a10'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(peakX, peakY); ctx.lineTo(ox+10, cy+6); ctx.stroke();

  // ── Flag poles ─────────────────────────────────────────────────────────────
  const poles = [
    { px: ox+2,    py: cy-52, fw: 15, fh: 9,  col: '#c04418' },
    { px: ox+2,    py: cy+44, fw: 13, fh: 8,  col: '#882aaa' },
    { px: ox+64,   py: cy-22, fw: 13, fh: 8,  col: '#c04418' },
  ];
  poles.forEach(({px,py,fw,fh,col}, i) => {
    ctx.strokeStyle = '#6a4a20'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(px, py+28); ctx.lineTo(px, py); ctx.stroke();
    const w1 = Math.sin(t*0.08 + i*1.3)*3;
    const w2 = Math.sin(t*0.12 + i*1.8 + 0.6)*2;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px+fw+w1, py+w2); ctx.lineTo(px+fw+w1, py+fh+w2);
    ctx.lineTo(px, py+fh);
    ctx.closePath(); ctx.fill();
    // Tattered edge notch
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.moveTo(px+fw-3+w1, py+3+w2); ctx.lineTo(px+fw+w1, py+w2);
    ctx.lineTo(px+fw-5+w1, py+6+w2); ctx.closePath(); ctx.fill();
  });

  // ── Torches flanking entrance ───────────────────────────────────────────────
  [[ox+tentW-1, cy-20], [ox+tentW-1, cy+20]].forEach(([tx,ty], i) => {
    // Pole
    ctx.strokeStyle = '#5a3a10'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(tx, ty+16); ctx.lineTo(tx, ty-5); ctx.stroke();
    // Torch head
    ctx.fillStyle = '#7a5020'; ctx.fillRect(tx-3, ty-9, 6, 8);
    // Glow
    const fl = 0.65 + Math.sin(t*0.22 + i*1.9)*0.35;
    const fl2 = 0.5  + Math.sin(t*0.31 + i*2.3 + 0.7)*0.5;
    ctx.save();
    const gr = ctx.createRadialGradient(tx, ty-13, 0, tx, ty-13, 13*fl);
    gr.addColorStop(0,'rgba(255,180,0,0.55)'); gr.addColorStop(1,'rgba(255,80,0,0)');
    ctx.fillStyle = gr;
    ctx.beginPath(); ctx.arc(tx, ty-13, 13*fl, 0, Math.PI*2); ctx.fill();
    ctx.restore();
    // Flame
    ctx.fillStyle = 'rgba(255,210,0,0.92)';
    ctx.beginPath();
    ctx.moveTo(tx-4*fl2, ty-9);
    ctx.quadraticCurveTo(tx-2*fl2, ty-16*fl, tx, ty-22*fl);
    ctx.quadraticCurveTo(tx+2*fl2, ty-16*fl, tx+4*fl2, ty-9);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,110,0,0.7)';
    ctx.beginPath();
    ctx.moveTo(tx-2, ty-9);
    ctx.quadraticCurveTo(tx, ty-14*fl, tx, ty-19*fl);
    ctx.quadraticCurveTo(tx+2, ty-14*fl, tx+2, ty-9);
    ctx.closePath(); ctx.fill();
  });
}

function _gorgeDrawEntry(ctx, game) {
  const [, entryRow] = game.pathCoords[0];
  const ey = entryRow * CELL;
  // Left skull pillar
  ctx.fillStyle = '#c0a068';
  ctx.fillRect(0, ey-CELL*0.55, 9, CELL*0.55);
  // Right skull pillar
  ctx.fillRect(0, ey+CELL, 9, CELL*0.55);
  // Skull on top of left pillar
  _miniSkull(ctx, 4, ey-CELL*0.55-7, '#d4c07a');
  // Skull on bottom of right pillar
  _miniSkull(ctx, 4, ey+CELL+CELL*0.55+6, '#d4c07a');
  // Broken stone arch
  ctx.strokeStyle = '#b8a060'; ctx.lineWidth = 7;
  ctx.beginPath(); ctx.moveTo(9, ey-CELL*0.55);
  ctx.quadraticCurveTo(32, ey+CELL/2, 9, ey+CELL); ctx.stroke();
  // "ВХОД" label
  ctx.fillStyle = '#f0c050'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('ВХОД', CELL/2, ey+CELL-4);
}

function _gorgeDrawExit(ctx, game) {
  const g = game.gate;
  const [exitCol, exitRow] = game.pathCoords[game.pathCoords.length-1];
  const GX = exitCol*CELL, pathY = exitRow*CELL;
  const GY = Math.max(0, exitRow-2)*CELL;
  const GW = game.canvas.width - GX;
  const GH = 4*CELL;

  // Broken state: sandy rubble
  if (g.broken) {
    g.debris.forEach(d => {
      ctx.save(); ctx.globalAlpha = d.alpha; ctx.translate(d.x,d.y); ctx.rotate(d.rot);
      ctx.fillStyle = '#c8a860'; ctx.fillRect(-d.w/2,-d.h/2,d.w,d.h); ctx.restore();
    });
    ctx.fillStyle = '#c8a060';
    ctx.fillRect(GX, GY, GW, 14); ctx.fillRect(GX, GY+GH-16, GW, 16);
    [[GX+3,GY+12,10,7],[GX+16,GY+8,8,5],[GX+5,GY+GH-22,11,6]].forEach(([rx,ry,rw,rh]) => {
      ctx.fillStyle = '#d4b070'; ctx.fillRect(rx,ry,rw,rh);
    });
    return;
  }

  let sx = 0, sy = 0;
  if (g.shake > 0) {
    const pct = g.shake/(g.flashBoss?38:20);
    sx = Math.sin(game.frame*2.6)*g.shakeMag*pct;
    sy = Math.cos(game.frame*1.9)*g.shakeMag*0.5*pct;
  }
  ctx.save(); ctx.translate(sx, sy);

  // Sandy stone wall
  ctx.fillStyle = '#c8a868'; ctx.fillRect(GX, GY, GW, GH);
  // Brickwork
  ctx.strokeStyle = 'rgba(0,0,0,0.15)'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(GX,GY+i*36); ctx.lineTo(GX+GW,GY+i*36); ctx.stroke(); }
  // Gate opening
  ctx.fillStyle = '#180c00'; ctx.fillRect(GX+2, pathY+1, GW-2, CELL-1);
  // Bone arch over opening
  ctx.strokeStyle = '#d4c078'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(GX+GW/2, pathY+CELL/2, CELL*0.52, Math.PI*0.5, Math.PI*1.5); ctx.stroke();
  // Bone joints
  ctx.fillStyle = '#d4c078';
  ctx.beginPath(); ctx.arc(GX+GW/2, pathY, 6, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(GX+GW/2, pathY+CELL, 6, 0, Math.PI*2); ctx.fill();
  // Stone highlight
  ctx.fillStyle = 'rgba(255,220,150,0.12)'; ctx.fillRect(GX, GY, 3, GH);
  // Skull decoration above gate
  _miniSkull(ctx, GX+GW/2, pathY-10, '#d4bc68');

  // Blink when enemy approaches
  if (game.exitBlinkTimer > 0 && Math.floor(game.frame/4)%2 === 0) {
    ctx.save(); ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#ffdd88'; ctx.fillRect(GX+1, pathY-2, GW-1, CELL+4); ctx.restore();
  }
  ctx.restore();
}

function _miniSkull(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.beginPath(); ctx.ellipse(x-2, y-0.5, 1.5, 2, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(x+2, y-0.5, 1.5, 2, 0, 0, Math.PI*2); ctx.fill();
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ТЁМНОЕ ЦАРСТВО  (maze)
// ═══════════════════════════════════════════════════════════════════════════════

function _mazeInit(game) {
  const { pathSet, pathCoords } = game;
  const corners = new Set();
  [[0,0],[19,0],[0,11],[19,11]].forEach(([cc,cr]) => {
    for (let dc = 0; dc < 3; dc++) for (let dr = 0; dr < 3; dr++) corners.add(`${cc+dc},${cr+dr}`);
  });

  // Dark purple floor colors
  game.mazeColors = {};
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    if (pathSet.has(`${c},${r}`)) continue;
    const v = 0.72 + _sr(c,r,0)*0.56;
    game.mazeColors[`${c},${r}`] = `rgb(${Math.round(36*v)},${Math.round(16*v)},${Math.round(58*v)})`;
  }

  // Path direction map + arrow cells
  game.pathDirMap = {};
  pathCoords.forEach(([c,r], i) => {
    const nxt = pathCoords[i+1], prv = pathCoords[i-1];
    let dx = 0, dy = 0;
    if (nxt) { dx = nxt[0]-c; dy = nxt[1]-r; } else if (prv) { dx = c-prv[0]; dy = r-prv[1]; }
    game.pathDirMap[`${c},${r}`] = { dx, dy };
  });
  game.arrowCells = new Set();
  for (let i = 2; i < pathCoords.length-1; i++) {
    const [c0,r0] = pathCoords[i-1], [c1,r1] = pathCoords[i], [c2,r2] = pathCoords[i+1];
    if (c1-c0 === c2-c1 && r1-r0 === r2-r1 && i%3 === 2) game.arrowCells.add(`${c1},${r1}`);
  }

  const taken = new Set([...pathSet, ...corners]);

  // Road cracks (glowing red)
  game.mazeCracks = [];
  pathCoords.forEach(([c,r]) => {
    const n = 2 + Math.floor(_sr(c,r,30)*3);
    for (let i = 0; i < n; i++) {
      game.mazeCracks.push({
        x: c*CELL+3+_sr(c+i,r,31)*(CELL-6),
        y: r*CELL+3+_sr(c+i,r,32)*(CELL-6),
        len: 5+_sr(c+i,r,33)*10,
        angle: _sr(c+i,r,34)*Math.PI,
      });
    }
  });

  // Demon statues
  game.mazeDemonStatues = [];
  for (let seed = 0; game.mazeDemonStatues.length < 6 && seed < 400; seed++) {
    const c = Math.floor(_sr(seed,0,20)*COLS), r = Math.floor(_sr(seed,1,20)*ROWS);
    const key = `${c},${r}`;
    if (taken.has(key)) continue;
    taken.add(key);
    game.mazeDemonStatues.push({ x: c*CELL+CELL/2, y: r*CELL+CELL/2 });
  }

  // Lava pools
  game.mazeLavaPools = [];
  for (let seed = 100; game.mazeLavaPools.length < 5 && seed < 500; seed++) {
    const c = Math.floor(_sr(seed,0,21)*COLS), r = Math.floor(_sr(seed,1,21)*ROWS);
    const key = `${c},${r}`;
    if (taken.has(key)) continue;
    taken.add(key);
    game.mazeLavaPools.push({ x: c*CELL+CELL/2, y: r*CELL+CELL/2,
      rx: 12+_sr(c,r,35)*8, ry: 6+_sr(c,r,36)*5 });
  }

  // Portals
  game.mazePortals = [];
  for (let seed = 200; game.mazePortals.length < 3 && seed < 600; seed++) {
    const c = Math.floor(_sr(seed,0,22)*COLS), r = Math.floor(_sr(seed,1,22)*ROWS);
    const key = `${c},${r}`;
    if (taken.has(key)) continue;
    taken.add(key);
    game.mazePortals.push({ x: c*CELL+CELL/2, y: r*CELL+CELL/2 });
  }

  // Skull poles
  game.mazeSkullPoles = [];
  for (let seed = 300; game.mazeSkullPoles.length < 8 && seed < 700; seed++) {
    const c = Math.floor(_sr(seed,0,23)*COLS), r = Math.floor(_sr(seed,1,23)*ROWS);
    const key = `${c},${r}`;
    if (taken.has(key)) continue;
    taken.add(key);
    game.mazeSkullPoles.push({ x: c*CELL+CELL/2, y: r*CELL+CELL/2,
      count: 1+Math.floor(_sr(c,r,37)*2) });
  }

  // Stalactites
  game.mazeStalactites = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    if (taken.has(`${c},${r}`)) continue;
    if (_sr(c,r,38) < 0.14) {
      game.mazeStalactites.push({
        x: c*CELL+4+_sr(c,r,39)*(CELL-8), y: r*CELL,
        len: 5+_sr(c,r,40)*14,
      });
    }
  }

  // Ash particles (fall down)
  game.mazeParticles = Array.from({length:50}, () => ({
    x: Math.random()*COLS*CELL, y: Math.random()*ROWS*CELL,
    vx: (Math.random()-0.5)*0.5, vy: 0.4+Math.random()*0.8,
    size: 0.8+Math.random()*2, alpha: 0.12+Math.random()*0.28,
    life: Math.random()*250, maxLife: 200+Math.random()*150,
  }));

  game.mazeLightningTimer = 200 + Math.random()*300;
  game.mazeLightningFlash = 0;
  game.clouds = []; // no clouds in dark realm

  // Spawn portal: cracked ground + sparks
  const [pc0, pr0] = pathCoords[0];
  const pCX = pc0*CELL + 22, pCY = pr0*CELL + CELL/2;
  game.mazeSpawnCracks = Array.from({length:14}, (_,i) => {
    const a = (i/14)*Math.PI*2 + _sr(i,0,70)*0.4;
    const d = 22 + _sr(i,1,70)*28;
    return {
      x: pCX + Math.cos(a)*d, y: pCY + Math.sin(a)*d*0.65,
      dx: Math.cos(a)*(6+_sr(i,2,70)*14), dy: Math.sin(a)*(4+_sr(i,3,70)*8),
    };
  });
  game.mazeSpawnSparks = Array.from({length:28}, () => ({
    angle: Math.random()*Math.PI*2, dist: 4 + Math.random()*8,
    speed: 0.7 + Math.random()*2.2,
    life: Math.random()*35, maxLife: 16 + Math.random()*28,
    size: 0.8 + Math.random()*2, isRed: Math.random() < 0.5,
  }));
}

// ─── Maze corner art ──────────────────────────────────────────────────────────
function _mazeBL(ctx) {
  // Mountain of skulls (bottom-left — only safe corner for maze)
  const ox = 0, oy = 11*CELL;
  ctx.fillStyle = '#1a0828'; ctx.fillRect(ox, oy, 108, 3*CELL);
  // Dark mountain
  ctx.fillStyle = '#0e0418';
  ctx.beginPath(); ctx.moveTo(ox, oy+3*CELL);
  ctx.lineTo(ox, oy+62); ctx.lineTo(ox+26,oy+30); ctx.lineTo(ox+56,oy+16);
  ctx.lineTo(ox+82,oy+36); ctx.lineTo(ox+108,oy+26); ctx.lineTo(ox+108, oy+3*CELL);
  ctx.closePath(); ctx.fill();
  // Skulls embedded in mountain
  [[18,62],[40,54],[64,48],[86,58],[28,80],[56,74],[80,70]].forEach(([sx,sy]) => {
    ctx.fillStyle = '#c0b48c';
    ctx.beginPath(); ctx.arc(ox+sx, oy+sy, 9, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#b0a47c';
    ctx.beginPath(); ctx.arc(ox+sx, oy+sy+7, 5.5, 0, Math.PI); ctx.fill();
    ctx.fillStyle = '#1c0010';
    ctx.beginPath(); ctx.ellipse(ox+sx-3.5,oy+sy-1,1.8,2.2,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(ox+sx+3.5,oy+sy-1,1.8,2.2,0,0,Math.PI*2); ctx.fill();
    // Glowing red eyes
    ctx.save(); ctx.shadowColor='#ff0000'; ctx.shadowBlur=5;
    ctx.fillStyle = '#aa0000';
    ctx.beginPath(); ctx.arc(ox+sx-3.5,oy+sy-1,1,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(ox+sx+3.5,oy+sy-1,1,0,Math.PI*2); ctx.fill();
    ctx.restore();
  });
  // Lava drips
  ctx.fillStyle = '#cc4400';
  [[14,76],[36,82],[66,78],[92,72]].forEach(([x,y]) => {
    ctx.beginPath(); ctx.moveTo(ox+x-3,oy+y-9); ctx.lineTo(ox+x+3,oy+y-9); ctx.lineTo(ox+x,oy+y+4); ctx.closePath(); ctx.fill();
  });
}

// ─── Maze draw ────────────────────────────────────────────────────────────────
function _mazeDraw(ctx, game) {
  const W = game.canvas.width, H = game.canvas.height;
  const { pathSet, pathCoords, pathDirMap, arrowCells } = game;
  const t = game.frame;

  // 1. Dark purple floor
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    if (pathSet.has(`${c},${r}`)) continue;
    ctx.fillStyle = game.mazeColors[`${c},${r}`] || '#240e3a';
    ctx.fillRect(c*CELL, r*CELL, CELL, CELL);
  }

  // 2. Stalactites
  game.mazeStalactites.forEach(st => {
    ctx.fillStyle = '#12041e';
    ctx.beginPath(); ctx.moveTo(st.x-3,st.y); ctx.lineTo(st.x+3,st.y); ctx.lineTo(st.x,st.y+st.len); ctx.closePath(); ctx.fill();
  });

  // 3. Lava pools (pulsing)
  game.mazeLavaPools.forEach(lp => {
    const pulse = 0.85 + Math.sin(t*0.06 + lp.x*0.01)*0.15;
    const grad = ctx.createRadialGradient(lp.x,lp.y,0,lp.x,lp.y,lp.rx*1.8*pulse);
    grad.addColorStop(0,'rgba(255,100,0,0.65)');
    grad.addColorStop(0.5,'rgba(200,40,0,0.3)');
    grad.addColorStop(1,'rgba(150,0,0,0)');
    ctx.save(); ctx.fillStyle = grad;
    ctx.beginPath(); ctx.ellipse(lp.x,lp.y,lp.rx*2*pulse,lp.ry*2*pulse,0,0,Math.PI*2); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#ff6600';
    ctx.beginPath(); ctx.ellipse(lp.x,lp.y,lp.rx*pulse,lp.ry*pulse,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ff9930';
    ctx.beginPath(); ctx.ellipse(lp.x-lp.rx*0.25,lp.y-lp.ry*0.2,lp.rx*0.5*pulse,lp.ry*0.4*pulse,0,0,Math.PI*2); ctx.fill();
  });

  // 4. Portals (rotating)
  game.mazePortals.forEach((portal, pi) => {
    const angle = t*0.04 + pi*Math.PI*2/3;
    ctx.save(); ctx.translate(portal.x, portal.y);
    ctx.strokeStyle = '#8800cc'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(0,0,14,0,Math.PI*2); ctx.stroke();
    for (let i = 0; i < 6; i++) {
      const a = angle + (i/6)*Math.PI*2;
      ctx.fillStyle = i%2===0 ? '#cc44ff' : '#6600aa';
      ctx.beginPath(); ctx.arc(Math.cos(a)*11, Math.sin(a)*11, 2.2, 0, Math.PI*2); ctx.fill();
    }
    const grad = ctx.createRadialGradient(0,0,0,0,0,10);
    grad.addColorStop(0,'rgba(180,0,255,0.75)'); grad.addColorStop(1,'rgba(80,0,150,0)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(0,0,10,0,Math.PI*2); ctx.fill();
    ctx.restore();
  });

  // 5. Death stains (blood-red for maze)
  game.deathStains.forEach(s => {
    ctx.save(); ctx.globalAlpha = (s.life/s.maxLife)*0.35;
    ctx.fillStyle = '#cc0000';
    ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); ctx.restore();
  });

  // 6. Demon statues
  game.mazeDemonStatues.forEach(({x,y}) => {
    // Pedestal
    ctx.fillStyle = '#1e0e2e'; ctx.fillRect(x-8,y+10,16,8); ctx.fillRect(x-6,y+4,12,8);
    // Body
    ctx.fillStyle = '#2e1040'; ctx.fillRect(x-6,y-12,12,18);
    // Wings
    ctx.fillStyle = '#1a0830';
    ctx.beginPath(); ctx.moveTo(x-6,y-8); ctx.lineTo(x-19,y-22); ctx.lineTo(x-12,y+2); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+6,y-8); ctx.lineTo(x+19,y-22); ctx.lineTo(x+12,y+2); ctx.closePath(); ctx.fill();
    // Head
    ctx.fillStyle = '#2e1040';
    ctx.beginPath(); ctx.arc(x,y-16,7,0,Math.PI*2); ctx.fill();
    // Horns
    ctx.fillStyle = '#4a1a5a';
    ctx.beginPath(); ctx.moveTo(x-5,y-21); ctx.lineTo(x-9,y-31); ctx.lineTo(x-2,y-23); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+5,y-21); ctx.lineTo(x+9,y-31); ctx.lineTo(x+2,y-23); ctx.closePath(); ctx.fill();
    // Glowing eyes
    ctx.save(); ctx.shadowColor='#ff0000'; ctx.shadowBlur=8;
    ctx.fillStyle = '#ff2020';
    ctx.beginPath(); ctx.arc(x-2.5,y-17,2.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+2.5,y-17,2.2,0,Math.PI*2); ctx.fill();
    ctx.restore();
  });

  // 7. Skull poles
  game.mazeSkullPoles.forEach(({x,y,count}) => {
    ctx.fillStyle = '#180a1e'; ctx.fillRect(x-2, y-26*count, 4, 26*count+8);
    for (let i = 0; i < count; i++) {
      const sy = y - 12 - i*22;
      ctx.fillStyle = '#d4c8a0';
      ctx.beginPath(); ctx.arc(x, sy, 6.5, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#1a0808';
      ctx.beginPath(); ctx.ellipse(x-2.5,sy-1,1.5,2,0,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(x+2.5,sy-1,1.5,2,0,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = '#a09070'; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.arc(x,sy+4,4.5,0,Math.PI); ctx.stroke();
    }
  });

  // 8. Black road with glowing red cracks
  for (let i = 0; i < pathCoords.length; i++) {
    const [c,r] = pathCoords[i];
    const px = c*CELL, py = r*CELL;
    ctx.fillStyle = '#0c040f'; ctx.fillRect(px,py,CELL,CELL);
    // Dark edge
    ctx.fillStyle = '#1a0828';
    [[-1,0,0,0,3,CELL],[1,0,CELL-3,0,3,CELL],[0,-1,0,0,CELL,3],[0,1,0,CELL-3,CELL,3]]
      .forEach(([dc,dr,ex,ey,ew,eh]) => {
        if (!pathSet.has(`${c+dc},${r+dr}`)) ctx.fillRect(px+ex,py+ey,ew,eh);
      });
    // Ruts (dark crimson)
    const dir = pathDirMap[`${c},${r}`];
    if (dir) {
      ctx.fillStyle = 'rgba(180,0,0,0.14)';
      const cx = px+CELL/2, cy = py+CELL/2;
      if (dir.dx !== 0) { ctx.fillRect(px,cy-9,CELL,3); ctx.fillRect(px,cy+6,CELL,3); }
      else              { ctx.fillRect(cx-9,py,3,CELL); ctx.fillRect(cx+6,py,3,CELL); }
    }
    // Arrows
    if (arrowCells.has(`${c},${r}`) && dir) {
      ctx.save(); ctx.translate(px+CELL/2,py+CELL/2); ctx.rotate(Math.atan2(dir.dy,dir.dx));
      ctx.fillStyle = 'rgba(180,0,0,0.28)';
      ctx.beginPath(); ctx.moveTo(7,0); ctx.lineTo(-5,-5); ctx.lineTo(-5,5); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
  }

  // 9. Glowing cracks
  ctx.save(); ctx.shadowColor = '#ff0000'; ctx.shadowBlur = 5;
  game.mazeCracks.forEach(cr => {
    const glow = 0.35 + Math.sin(t*0.05+cr.x*0.02)*0.3;
    ctx.globalAlpha = glow;
    ctx.strokeStyle = '#cc1100'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cr.x,cr.y);
    ctx.lineTo(cr.x+Math.cos(cr.angle)*cr.len, cr.y+Math.sin(cr.angle)*cr.len);
    ctx.stroke();
  });
  ctx.restore();

  // 10. Corner art: only BL is free (path occupies TL, TR, BR zones)
  const _inZone = (cs,ce,rs,re) => pathCoords.some(([c,r]) => c>=cs&&c<=ce&&r>=rs&&r<=re);
  if (!_inZone(0,2,11,13)) _mazeBL(ctx);

  // 10.5. Spawn portal (Malkhar's gate)
  _mazeDrawSpawn(ctx, game);

  // 11. Entry gate (hell gate at left edge)
  _mazeDrawEntry(ctx, game);

  // 12. Grid (purple-tinted)
  ctx.strokeStyle = 'rgba(120,0,180,0.09)'; ctx.lineWidth = 0.5;
  for (let r = 0; r <= ROWS; r++) { ctx.beginPath(); ctx.moveTo(0,r*CELL); ctx.lineTo(W,r*CELL); ctx.stroke(); }
  for (let c = 0; c <= COLS; c++) { ctx.beginPath(); ctx.moveTo(c*CELL,0); ctx.lineTo(c*CELL,H); ctx.stroke(); }

  // 13. Border (dark crimson)
  ctx.strokeStyle = '#550018'; ctx.lineWidth = 4; ctx.strokeRect(2,2,W-4,H-4);

  // 14. Permanent dark red overlay
  ctx.fillStyle = 'rgba(55,0,0,0.20)'; ctx.fillRect(0,0,W,H);

  // 15. Lightning flash
  if (game.mazeLightningFlash > 0) {
    ctx.save(); ctx.globalAlpha = game.mazeLightningFlash/9;
    ctx.fillStyle = '#ffffdd'; ctx.fillRect(0,0,W,H); ctx.restore();
  }

  // 16. Ash particles
  game.mazeParticles.forEach(p => {
    ctx.save(); ctx.globalAlpha = p.alpha*(p.life/p.maxLife);
    ctx.fillStyle = '#aaaaaa';
    ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill(); ctx.restore();
  });
}

// ─── Maze spawn: portal of Malkhar ───────────────────────────────────────────
function _mazeDrawSpawn(ctx, game) {
  const [ec, er] = game.pathCoords[0];
  const pCX = ec*CELL + 22;   // portal ring center x
  const pCY = er*CELL + CELL/2;
  const pR  = 28;             // ring radius
  const t   = game.frame;

  // ── Cracked ground with red glow ──────────────────────────────────────────
  ctx.save();
  ctx.shadowColor = '#ff0000'; ctx.shadowBlur = 6;
  ctx.strokeStyle = '#bb0a00'; ctx.lineWidth = 1;
  game.mazeSpawnCracks.forEach(cr => {
    ctx.globalAlpha = 0.28 + Math.sin(t*0.06 + cr.x*0.04)*0.28;
    ctx.beginPath(); ctx.moveTo(cr.x, cr.y);
    ctx.lineTo(cr.x+cr.dx, cr.y+cr.dy); ctx.stroke();
  });
  ctx.restore();

  // ── Chains from top of portal ──────────────────────────────────────────────
  [-14, 0, 14].forEach(xOff => {
    const cx2 = pCX + xOff;
    const chainTop = pCY - pR - 2;
    ctx.strokeStyle = '#3a0a44'; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let seg = 0; seg <= 5; seg++) {
      const px = cx2 + (seg-2.5)*1.5;
      const py = chainTop - 28 + seg*6;
      if (seg === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
    // Link ovals
    for (let seg = 0; seg < 5; seg++) {
      const lx = cx2 + (seg-2.5)*1.5;
      const ly = chainTop - 28 + seg*6 + 3;
      ctx.strokeStyle = '#55195a'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.ellipse(lx, ly, 2, 3.5, 0, 0, Math.PI*2); ctx.stroke();
    }
  });

  // ── Portal outer ring ──────────────────────────────────────────────────────
  ctx.strokeStyle = '#1a0030'; ctx.lineWidth = 10;
  ctx.beginPath(); ctx.arc(pCX, pCY, pR, 0, Math.PI*2); ctx.stroke();

  // Inner void gradient
  const vGrad = ctx.createRadialGradient(pCX, pCY, 2, pCX, pCY, pR-5);
  vGrad.addColorStop(0,'rgba(120,0,255,0.75)');
  vGrad.addColorStop(0.45,'rgba(70,0,180,0.45)');
  vGrad.addColorStop(1,'rgba(30,0,60,0.08)');
  ctx.fillStyle = vGrad;
  ctx.beginPath(); ctx.arc(pCX, pCY, pR-5, 0, Math.PI*2); ctx.fill();

  // Pulsing inner shimmer
  const pulse = 0.7 + Math.sin(t*0.08)*0.3;
  ctx.save(); ctx.globalAlpha = 0.25*pulse;
  ctx.fillStyle = '#cc44ff';
  ctx.beginPath(); ctx.arc(pCX, pCY, (pR-8)*pulse, 0, Math.PI*2); ctx.fill();
  ctx.restore();

  // ── Rotating rune nodes ────────────────────────────────────────────────────
  const rot = t * 0.038;
  for (let i = 0; i < 8; i++) {
    const a = rot + (i/8)*Math.PI*2;
    const rx = pCX + Math.cos(a)*pR;
    const ry = pCY + Math.sin(a)*pR;
    const col = i%2===0 ? '#cc44ff' : '#ff2244';
    ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = 8;
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.arc(rx, ry, 2.8, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  }

  // Ring glow
  ctx.save(); ctx.shadowColor='#8800cc'; ctx.shadowBlur=18;
  ctx.strokeStyle = '#6600bb'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(pCX, pCY, pR, 0, Math.PI*2); ctx.stroke();
  ctx.restore();

  // ── Sparks ────────────────────────────────────────────────────────────────
  game.mazeSpawnSparks.forEach(sp => {
    const sx = pCX + Math.cos(sp.angle)*sp.dist;
    const sy = pCY + Math.sin(sp.angle)*sp.dist;
    const fade = Math.max(0, 1 - sp.life/sp.maxLife);
    ctx.save(); ctx.globalAlpha = fade * 0.9;
    ctx.fillStyle = sp.isRed ? '#ff2020' : '#cc44ff';
    ctx.beginPath(); ctx.arc(sx, sy, sp.size, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  });

  // ── Demon guards flanking portal ───────────────────────────────────────────
  [pCX - pR - 16, pCX + pR + 16].forEach(gx => {
    const gy = pCY;
    // Pedestal
    ctx.fillStyle = '#120420'; ctx.fillRect(gx-7,gy+10,14,9);
    ctx.fillRect(gx-5,gy+4,10,8);
    // Body
    ctx.fillStyle = '#200a34'; ctx.fillRect(gx-5,gy-12,10,18);
    // Wings
    ctx.fillStyle = '#100220';
    ctx.beginPath(); ctx.moveTo(gx-5,gy-7); ctx.lineTo(gx-18,gy-19); ctx.lineTo(gx-11,gy+4); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(gx+5,gy-7); ctx.lineTo(gx+18,gy-19); ctx.lineTo(gx+11,gy+4); ctx.closePath(); ctx.fill();
    // Head
    ctx.fillStyle = '#200a34'; ctx.beginPath(); ctx.arc(gx,gy-16,6,0,Math.PI*2); ctx.fill();
    // Horns
    ctx.fillStyle = '#3a1050';
    ctx.beginPath(); ctx.moveTo(gx-4,gy-20); ctx.lineTo(gx-7,gy-30); ctx.lineTo(gx-1,gy-22); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(gx+4,gy-20); ctx.lineTo(gx+7,gy-30); ctx.lineTo(gx+1,gy-22); ctx.closePath(); ctx.fill();
    // Glowing eyes
    ctx.save(); ctx.shadowColor='#ff0000'; ctx.shadowBlur=10;
    ctx.fillStyle = '#ff1010';
    ctx.beginPath(); ctx.arc(gx-2,gy-17,2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(gx+2,gy-17,2,0,Math.PI*2); ctx.fill();
    ctx.restore();
  });

  // ── "ВЛАДЕНИЯ МАЛЬКАРА" rune text ─────────────────────────────────────────
  const textY = er*CELL - 8;
  ctx.save();
  ctx.shadowColor='#ff0000'; ctx.shadowBlur=10;
  ctx.fillStyle = '#cc1111';
  ctx.font = 'bold 9px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ВЛАДЕНИЯ', pCX, textY - 8);
  ctx.fillText('МАЛЬКАРА', pCX, textY + 2);
  ctx.restore();
}

function _mazeDrawEntry(ctx, game) {
  const [, entryRow] = game.pathCoords[0];
  const ey = entryRow * CELL;
  // Dark stone pillars
  ctx.fillStyle = '#180a1e';
  ctx.fillRect(0, ey-CELL*0.65, 10, CELL*0.65);
  ctx.fillRect(0, ey+CELL, 10, CELL*0.65);
  // Red veins on pillars
  ctx.strokeStyle = '#880000'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(3, ey-CELL*0.6); ctx.lineTo(7, ey-5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(3, ey+CELL+5); ctx.lineTo(7, ey+CELL+CELL*0.55); ctx.stroke();
  // Dark arch
  ctx.strokeStyle = '#660000'; ctx.lineWidth = 7;
  ctx.beginPath(); ctx.moveTo(10,ey-CELL*0.65);
  ctx.quadraticCurveTo(36,ey+CELL/2, 10,ey+CELL); ctx.stroke();
  // Glowing arch inner line
  ctx.save(); ctx.shadowColor='#ff0000'; ctx.shadowBlur=10;
  ctx.strokeStyle = '#cc1515'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(10,ey-CELL*0.65);
  ctx.quadraticCurveTo(36,ey+CELL/2, 10,ey+CELL); ctx.stroke();
  ctx.restore();
  // Skull crown
  _miniSkull(ctx, 24, ey+CELL/2, '#c8b890');
  // Label
  ctx.fillStyle = '#cc4444'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('ВХОД', CELL/2, ey+CELL-4);
}

function _mazeDrawExit(ctx, game) {
  const g = game.gate;
  const [exitCol, exitRow] = game.pathCoords[game.pathCoords.length-1];
  const GX = exitCol*CELL, pathY = exitRow*CELL;
  const GY = Math.max(0, exitRow-2)*CELL;
  const GW = game.canvas.width - GX;
  const GH = 4*CELL;

  // Broken state: dark rubble with ash
  if (g.broken) {
    g.debris.forEach(d => {
      ctx.save(); ctx.globalAlpha = d.alpha; ctx.translate(d.x,d.y); ctx.rotate(d.rot);
      ctx.fillStyle = '#2a0a3a'; ctx.fillRect(-d.w/2,-d.h/2,d.w,d.h); ctx.restore();
    });
    ctx.fillStyle = '#1a0828';
    ctx.fillRect(GX,GY,GW,14); ctx.fillRect(GX,GY+GH-16,GW,16);
    [[GX+3,GY+12,10,7],[GX+16,GY+8,8,5],[GX+5,GY+GH-22,11,6]].forEach(([rx,ry,rw,rh]) => {
      ctx.fillStyle = '#2e1040'; ctx.fillRect(rx,ry,rw,rh);
    });
    return;
  }

  let sx = 0, sy = 0;
  if (g.shake > 0) {
    const pct = g.shake/(g.flashBoss?38:20);
    sx = Math.sin(game.frame*2.6)*g.shakeMag*pct;
    sy = Math.cos(game.frame*1.9)*g.shakeMag*0.5*pct;
  }
  ctx.save(); ctx.translate(sx, sy);

  // Dark stone wall
  ctx.fillStyle = '#1a0a24'; ctx.fillRect(GX, GY, GW, GH);
  // Stone texture lines
  ctx.strokeStyle = 'rgba(80,0,120,0.25)'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(GX,GY+i*36); ctx.lineTo(GX+GW,GY+i*36); ctx.stroke(); }
  // Gate opening
  ctx.fillStyle = '#060006'; ctx.fillRect(GX+2, pathY+1, GW-2, CELL-1);
  // Ruined arch over opening
  ctx.strokeStyle = '#1a0828'; ctx.lineWidth = 8;
  ctx.beginPath(); ctx.arc(GX+GW/2, pathY+CELL/2, CELL*0.52, Math.PI*0.5, Math.PI*1.5); ctx.stroke();
  // Red glow on arch
  ctx.save(); ctx.shadowColor='#ff0000'; ctx.shadowBlur=12;
  ctx.strokeStyle = '#770000'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(GX+GW/2, pathY+CELL/2, CELL*0.52-3, Math.PI*0.5, Math.PI*1.5); ctx.stroke();
  ctx.restore();
  // Skull crown
  _miniSkull(ctx, GX+GW/2, pathY-10, '#c0b488');
  // Edge highlight (dark purple)
  ctx.fillStyle = 'rgba(150,0,200,0.06)'; ctx.fillRect(GX,GY,3,GH);

  // Blink when enemy approaches
  if (game.exitBlinkTimer > 0 && Math.floor(game.frame/4)%2 === 0) {
    ctx.save(); ctx.globalAlpha = 0.35;
    ctx.fillStyle = '#ff0000'; ctx.fillRect(GX+1, pathY-2, GW-1, CELL+4); ctx.restore();
  }
  ctx.restore();
}

// ─── Dispatch tables ──────────────────────────────────────────────────────────
const MAP_INIT = {
  gorge: _gorgeInit,
  maze:  _mazeInit,
};

const MAP_DRAW = {
  gorge: _gorgeDraw,
  maze:  _mazeDraw,
};

const MAP_DRAW_EXIT = {
  gorge: _gorgeDrawExit,
  maze:  _mazeDrawExit,
};

const MAP_UPDATE = {
  gorge(game) {
    const W = COLS*CELL, H = ROWS*CELL;
    // Sand drifts left
    game.gorgeParticles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.life++;
      if (p.life >= p.maxLife || p.x < -10) {
        p.x = W+5; p.y = Math.random()*H; p.life = 0;
        p.vx = -(0.5+Math.random()*1.5); p.vy = (Math.random()-0.5)*0.4;
      }
    });
    // Dust clouds drift left
    game.clouds.forEach(cl => {
      cl.x -= cl.speed;
      if (cl.x + cl.w/2 < 0) cl.x = W + cl.w/2;
    });
  },
  maze(game) {
    const H = ROWS*CELL;
    // Ash falls down
    game.mazeParticles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.life++;
      if (p.life >= p.maxLife || p.y > H+10) {
        p.x = Math.random()*COLS*CELL; p.y = -5; p.life = 0;
        p.vy = 0.4+Math.random()*0.8; p.vx = (Math.random()-0.5)*0.5;
      }
    });
    // Lightning strike
    if (game.mazeLightningTimer > 0) {
      game.mazeLightningTimer--;
    } else {
      game.mazeLightningFlash = 9;
      game.mazeLightningTimer = 320 + Math.random()*380;
    }
    if (game.mazeLightningFlash > 0) game.mazeLightningFlash--;

    // Portal sparks
    game.mazeSpawnSparks.forEach(sp => {
      sp.dist += sp.speed; sp.life++;
      if (sp.life >= sp.maxLife || sp.dist > 52) {
        sp.angle = Math.random()*Math.PI*2;
        sp.dist  = 4 + Math.random()*8;
        sp.life  = 0; sp.maxLife = 16 + Math.random()*28;
        sp.speed = 0.7 + Math.random()*2.2;
        sp.size  = 0.8 + Math.random()*2;
        sp.isRed = Math.random() < 0.5;
      }
    });
  },
};

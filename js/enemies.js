// ─── Enemy definitions ────────────────────────────────────────────────────────
// HP ×1.5, speed ×1.2 от исходных значений
const ENEMY_DEFS = {
  soldier:     { name:'Солдат',     baseHP:38,   speed:1.2, reward:5,   startWave:1,  size:9  },
  scout:       { name:'Разведчик',  baseHP:27,   speed:2.2, reward:6,   startWave:2,  size:7  },
  shieldbearer:{ name:'Щитоносец', baseHP:60,   speed:1.0, reward:8,   startWave:3,  size:11, armor:0.25 },
  runner:      { name:'Бегун',      baseHP:23,   speed:2.6, reward:8,   startWave:4,  size:7  },
  archer:      { name:'Лучник',     baseHP:33,   speed:1.3, reward:6,   startWave:5,  size:9  },
  knight:      { name:'Рыцарь',     baseHP:120,  speed:1.1, reward:12,  startWave:4,  size:13, armor:0.30 },
  berserker:   { name:'Берсерк',    baseHP:83,   speed:1.8, reward:13,  startWave:5,  size:11 },
  mage:        { name:'Маг',        baseHP:68,   speed:1.4, reward:14,  startWave:6,  size:10 },
  rider:       { name:'Всадник',    baseHP:105,  speed:2.0, reward:16,  startWave:7,  size:12 },
  sapper:      { name:'Сапёр',      baseHP:90,   speed:1.2, reward:13,  startWave:7,  size:11 },
  golem:       { name:'Голем',      baseHP:270,  speed:0.7, reward:23,  startWave:8,  size:16, armor:0.40 },
  vampire:     { name:'Вампир',     baseHP:135,  speed:1.9, reward:25,  startWave:9,  size:11, regenPct:2.0 },
  werewolf:    { name:'Оборотень',  baseHP:165,  speed:2.3, reward:26,  startWave:10, size:12, regenPct:3.0 },
  mechanic:    { name:'Механик',    baseHP:195,  speed:1.0, reward:27,  startWave:11, size:14, armor:0.35 },
  necromancer: { name:'Некромант',  baseHP:143,  speed:1.3, reward:29,  startWave:12, size:11, regenPct:1.5 },
  dragon:      { name:'Дракон',     baseHP:375,  speed:1.6, reward:39,  startWave:13, size:15, regenPct:1.0 },
  giant:       { name:'Великан',    baseHP:525,  speed:0.6, reward:42,  startWave:14, size:17 },
  demon:       { name:'Демон',      baseHP:300,  speed:2.0, reward:45,  startWave:15, size:13, regenPct:2.5 },
  guardian:    { name:'Страж',      baseHP:420,  speed:0.8, reward:49,  startWave:16, size:15, armor:0.45 },
  overlord:    { name:'Повелитель', baseHP:900,  speed:0.6, reward:150, startWave:10, size:20, isBoss:true, armor:0.50, regenPct:1.0 },
  // ── Air enemies ──────────────────────────────────────────────────────────
  drone:    { name:'Дрон',    baseHP:45,  hpPerWave:8,  speed:2.2, reward:10, startWave:4,  size:8,  air:true, linearHP:true },
  gryphon:  { name:'Грифон',  baseHP:120, hpPerWave:15, speed:1.8, reward:16, startWave:8,  size:12, air:true, linearHP:true },
  airdragon:{ name:'Дракон',  baseHP:300, hpPerWave:23, speed:1.4, reward:33, startWave:14, size:15, air:true, linearHP:true },
  // ── Final bosses (wave 60, one per map) ─────────────────────────────────────
  vortex: { name:'Вортекс',         baseHP:2000, speed:0.6,  reward:0, startWave:60, size:28, isFinalBoss:true, armor:0.40, regenPct:2.0 },
  ksara:  { name:'Ксара',           baseHP:3500, speed:0.9,  reward:0, startWave:60, size:24, isFinalBoss:true, armor:0.35, regenPct:2.0 },
  malkar: { name:'Малькар Истинный', baseHP:8000, speed:0.45, reward:0, startWave:60, size:36, isFinalBoss:true, armor:0.55, regenPct:2.0 },
  zarok:  { name:'Зарок',           baseHP:1500, speed:0.8,  reward:0, startWave:60, size:20, isFinalBoss:true, armor:0.30 },
  // ── Gorge-only enemies ───────────────────────────────────────────────────────
  lancer:           { name:'Копьеносец',          baseHP:68,  speed:1.5, reward:11, startWave:3,  size:10, mapOnly:'gorge', deathExplosion:{ damage:20, radius:36 } },
  // ── Map 2 desert enemies (15 unique types) ──────────────────────────────────
  trader:           { name:'Торговец',             baseHP:20,  speed:1.8, reward:20, startWave:1,  size:8,  mapOnly:'gorge', doubleGold:true },
  camel_rider:      { name:'Верблюжий всадник',    baseHP:35,  speed:1.3, reward:12, startWave:1,  size:11, mapOnly:'gorge', spawnOnDeath:'rider_foot' },
  rider_foot:       { name:'Пеший всадник',        baseHP:15,  speed:1.1, reward:0,  startWave:1,  size:8,  mapOnly:'gorge', noWaveSpawn:true },
  mummy:            { name:'Мумия',                baseHP:50,  speed:0.7, reward:10, startWave:2,  size:10, mapOnly:'gorge', regenPct:4.0, fireDmgMult:1.5 },
  sand_spirit:      { name:'Песчаный дух',         baseHP:25,  speed:1.5, reward:12, startWave:2,  size:8,  mapOnly:'gorge', shortRangeInvis:true },
  spearman:         { name:'Копьеносец',           baseHP:40,  speed:1.0, reward:10, startWave:3,  size:9,  mapOnly:'gorge', armor:0.20, deathExplosion:{ damage:20, radius:36 } },
  pharaoh:          { name:'Фараон',               baseHP:70,  speed:0.9, reward:18, startWave:4,  size:11, mapOnly:'gorge', speedAura:{ mult:1.2, radius:72 } },
  anubis:           { name:'Анубис',               baseHP:80,  speed:1.1, reward:22, startWave:5,  size:11, mapOnly:'gorge', revive:true },
  sphinx:           { name:'Сфинкс',               baseHP:90,  speed:1.4, reward:25, startWave:6,  size:12, mapOnly:'gorge', armor:0.25, air:true },
  desert_giant:     { name:'Пустынный великан',    baseHP:350, speed:0.5, reward:30, startWave:7,  size:18, mapOnly:'gorge', armor:0.35 },
  ra_priest:        { name:'Жрец Ра',              baseHP:65,  speed:1.0, reward:20, startWave:8,  size:10, mapOnly:'gorge', healer:{ pct:0.03, radius:72 } },
  scarab:           { name:'Скарабей',             baseHP:20,  speed:2.0, reward:8,  startWave:9,  size:6,  mapOnly:'gorge', spawnGroup:5 },
  sand_golem:       { name:'Песчаный голем',       baseHP:450, speed:0.6, reward:40, startWave:10, size:16, mapOnly:'gorge', armor:0.45, spawnOnDeath:'sand_golem_mini' },
  sand_golem_mini:  { name:'Малый голем',          baseHP:80,  speed:0.8, reward:0,  startWave:1,  size:9,  mapOnly:'gorge', armor:0.20, noWaveSpawn:true },
  dark_mage:        { name:'Тёмный маг',           baseHP:100, speed:1.0, reward:35, startWave:11, size:10, mapOnly:'gorge', teleportInterval:10 },
  tomb_guardian:    { name:'Хранитель гробниц',    baseHP:130, speed:1.1, reward:38, startWave:12, size:11, mapOnly:'gorge', armor:0.30, startInvis:5.0 },
  desert_dragon:    { name:'Пустынный дракон',     baseHP:500, speed:1.2, reward:55, startWave:13, size:16, mapOnly:'gorge', armor:0.30, regenPct:2.0, air:true },
};

// HP scaling: +25% every 2 waves (карты 1 и 3)
function calcHP(baseHP, wave) {
  return Math.round(baseHP * Math.pow(1.25, Math.floor((wave - 1) / 2)));
}
// HP scaling: +20% every 2 waves (карта 2 — горж)
function calcHPGorge(baseHP, wave) {
  return Math.round(baseHP * Math.pow(1.20, Math.floor((wave - 1) / 2)));
}

// ─── Pixel-art enemy sprites ──────────────────────────────────────────────────
function drawEnemySprite(ctx, type, size, tick, enemy) {
  const t = tick * 0.07;
  const R = (x,y,w,h,c) => { ctx.fillStyle=c; ctx.fillRect(x,y,w,h); };
  const C = (x,y,r,c)   => { ctx.fillStyle=c; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); };

  switch (type) {

    case 'soldier': {
      // Red armored pawn with blue shield
      R(-3,-2,8,8,'#c0392b');
      R(-3,-8,7,5,'#922b21');      // helmet
      C(0,-4,3,'#f0a080');         // face visor slit
      R(-8,-3,4,7,'#1a5276');      // shield
      R(-8,-3,4,1,'#2980b9');      // shield top
      R(-2,6,2,4,'#7b241c');       // legs
      R(1,6,2,4,'#7b241c');
      break;
    }

    case 'scout': {
      // Thin orange fast unit, leaning forward
      R(-2,-2,5,7,'#e67e22');
      C(1,-5,3,'#f0c090');         // head
      R(-4,-1,3,2,'#d35400');      // back arm
      R(3,-1,3,2,'#d35400');       // front arm
      R(-1,5,2,4,'#d35400');       // left leg
      R(2,4,2,4,'#d35400');        // right leg (stride)
      R(-1,-8,3,2,'#e67e22');      // hair/cap
      break;
    }

    case 'shieldbearer': {
      // Blue unit with large shield on left
      R(-2,-3,8,10,'#2471a3');
      C(2,-6,4,'#aed6f1');         // head
      R(-2,-6,4,3,'#1a5276');      // helmet
      R(-10,-8,5,14,'#2980b9');    // big shield
      R(-10,-8,5,2,'#5dade2');     // shield highlight
      R(0,-8,2,2,'#5dade2');       // shoulder
      R(4,-2,2,2,'#5dade2');       // shoulder right
      R(0,7,2,4,'#1a5276');        // legs
      R(3,7,2,4,'#1a5276');
      break;
    }

    case 'runner': {
      // Small yellow sprinter
      const legOff = Math.sin(t*2) * 3;
      R(-2,-1,5,6,'#f39c12');
      C(0,-4,3,'#f8d7a0');         // head
      R(-4,1,3,2,'#e67e22');       // arm
      R(2,1,3,2,'#e67e22');
      R(-2,5,2,3+legOff,'#e67e22');  // animated legs
      R(1,5,2,3-legOff,'#e67e22');
      break;
    }

    case 'archer': {
      // Green unit with bow
      R(-2,-2,6,8,'#1e8449');
      C(1,-5,3,'#a9dfbf');
      R(-2,-5,4,3,'#145a32');      // hood
      // Bow (arc)
      ctx.strokeStyle='#8d6e47'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(7,0,6,Math.PI*0.6,Math.PI*1.4); ctx.stroke();
      // Arrow
      ctx.strokeStyle='#8d6e47'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(2,0); ctx.lineTo(10,0); ctx.stroke();
      R(-3,6,2,4,'#145a32');       // legs
      R(2,6,2,4,'#145a32');
      break;
    }

    case 'knight': {
      // Grey heavy armored warrior
      R(-5,-3,12,12,'#717d7e');
      R(-6,-9,13,7,'#566573');     // helmet
      R(-3,-9,7,3,'#85929e');      // visor top
      R(-2,-6,5,3,'#2c3e50');      // visor slit
      R(-7,-1,3,8,'#5d6d7e');      // left pauldron
      R(5,-1,3,8,'#5d6d7e');       // right pauldron
      R(-2,9,3,4,'#566573');       // legs
      R(2,9,3,4,'#566573');
      R(-4,1,3,6,'#85929e');       // sword
      break;
    }

    case 'berserker': {
      // Dark red wild warrior
      R(-5,-2,12,10,'#922b21');
      C(1,-6,4,'#c0392b');         // head
      // Spikes on shoulders
      ctx.fillStyle='#7b241c';
      ctx.beginPath(); ctx.moveTo(-6,-4); ctx.lineTo(-10,-8); ctx.lineTo(-4,-2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(8,-4);  ctx.lineTo(12,-8);  ctx.lineTo(6,-2);  ctx.fill();
      // Axes
      R(-10,0,4,8,'#85929e');
      R(-12,-1,7,3,'#aab7b8');
      R(7,0,4,8,'#85929e');
      R(6,-1,7,3,'#aab7b8');
      R(-2,8,2,4,'#7b241c');
      R(2,8,2,4,'#7b241c');
      break;
    }

    case 'mage': {
      // Purple wizard with staff
      ctx.fillStyle='#6c3483';
      ctx.beginPath(); ctx.moveTo(0,-10); ctx.lineTo(-7,8); ctx.lineTo(7,8); ctx.closePath(); ctx.fill();
      C(0,-8,4,'#d7bde2');          // face
      R(-1,-12,3,3,'#8e44ad');      // hat tip
      ctx.fillStyle='#5b2c6f';
      ctx.beginPath(); ctx.moveTo(-5,-10); ctx.lineTo(-9,-6); ctx.lineTo(9,-6); ctx.lineTo(5,-10); ctx.closePath(); ctx.fill(); // hat brim
      // Staff
      R(9,-10,2,18,'#8d6e47');
      C(10,-11,3,'#d7bde2');        // orb
      ctx.fillStyle='rgba(180,100,220,0.6)';
      ctx.beginPath(); ctx.arc(10,-11,5,0,Math.PI*2); ctx.fill(); // glow
      break;
    }

    case 'rider': {
      // Brown rider on horse
      // Horse body
      R(-10,2,20,8,'#7d6608');
      R(-12,6,5,6,'#6e5e07');      // front legs
      R(-6,6,5,6,'#6e5e07');
      R(4,6,5,6,'#6e5e07');
      R(9,6,5,6,'#6e5e07');
      R(10,0,6,5,'#5d4e37');       // horse head
      // Rider
      R(-3,-7,6,9,'#a0522d');
      C(0,-10,3,'#f0a060');
      R(-3,-11,6,4,'#7b3f00');     // rider helmet
      R(6,-4,2,6,'#7b3f00');       // lance
      R(8,-6,1,10,'#a0522d');
      break;
    }

    case 'sapper': {
      // Yellow unit with bomb backpack
      R(-3,-2,7,9,'#d4ac0d');
      C(1,-5,3,'#f8e08a');
      R(-3,-5,6,3,'#b7950b');      // helmet
      // Bomb on back
      C(-6,1,5,'#1a1a1a');
      R(-8,-1,3,2,'#27ae60');      // fuse
      C(-10,-3,2,'#e74c3c');       // fuse tip
      R(-2,7,2,4,'#b7950b');       // legs
      R(2,7,2,4,'#b7950b');
      break;
    }

    case 'golem': {
      // Huge stone block creature
      R(-13,-12,26,24,'#717d7e');
      // Stone texture blocks
      R(-13,-12,13,12,'#808b96');
      R(0,0,13,12,'#808b96');
      R(-1,-1,2,2,'#5d6d7e');      // center crack
      R(-13,-1,26,2,'#5d6d7e');    // horizontal crack
      R(-1,-12,2,24,'#5d6d7e');    // vertical crack
      // Glowing eyes
      C(-5,-4,3,'#e74c3c');
      C(5,-4,3,'#e74c3c');
      C(-5,-4,1.5,'#ff8080');
      C(5,-4,1.5,'#ff8080');
      // Arms
      R(-17,-5,5,8,'#616a6b');
      R(12,-5,5,8,'#616a6b');
      break;
    }

    case 'vampire': {
      // Dark crimson with cape
      const wing = Math.sin(t) * 3;
      // Cape/wings
      ctx.fillStyle='#1c2833';
      ctx.beginPath();
      ctx.moveTo(0,6); ctx.lineTo(-12,-2+wing); ctx.lineTo(-8,-8); ctx.lineTo(0,-2); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0,6); ctx.lineTo(12,-2-wing);  ctx.lineTo(8,-8);  ctx.lineTo(0,-2); ctx.fill();
      // Body
      R(-3,-3,7,10,'#6e2b2b');
      C(0,-6,4,'#f5cba7');         // pale face
      R(-2,-8,5,3,'#2c3e50');      // hair
      // Fangs
      R(-1,-3,1,3,'#ffffff');
      R(1,-3,1,3,'#ffffff');
      // Red eyes
      C(-1,-7,1,'#e74c3c');
      C(2,-7,1,'#e74c3c');
      break;
    }

    case 'werewolf': {
      // Grey hunched beast
      const snarl = Math.sin(t*1.5) * 1;
      R(-5,-2,12,9,'#616a6b');
      // Wolf head (elongated snout)
      R(-2,-8,9,7,'#717d7e');
      R(4,-7,6,4,'#616a6b');       // snout
      R(2,-5,4,1,'#2c3e50');       // nostril/mouth
      // Ears
      ctx.fillStyle='#5d6d7e';
      ctx.beginPath(); ctx.moveTo(-2,-8); ctx.lineTo(-6,-14+snarl); ctx.lineTo(1,-8); ctx.fill();
      ctx.beginPath(); ctx.moveTo(5,-8);  ctx.lineTo(9,-14+snarl);  ctx.lineTo(12,-8); ctx.fill();
      // Claws
      R(-7,5,4,2,'#85929e');
      R(-7,7,2,2,'#aab7b8'); R(-5,7,2,2,'#aab7b8'); R(-3,7,2,2,'#aab7b8');
      R(9,5,4,2,'#85929e');
      R(9,7,2,2,'#aab7b8');  R(11,7,2,2,'#aab7b8'); R(13,7,2,2,'#aab7b8');
      // Yellow eyes
      C(0,-4,1.5,'#f39c12');
      C(5,-4,1.5,'#f39c12');
      break;
    }

    case 'mechanic': {
      // Steel robot
      R(-7,-7,15,14,'#85929e');    // torso
      R(-8,-12,16,7,'#717d7e');    // head
      R(-5,-10,11,5,'#2980b9');    // visor
      C(-2,-8,1.5,'#00e5ff');      // visor lights
      C(3,-8,1.5,'#00e5ff');
      // Joints/rivets
      C(-7,-7,2,'#566573'); C(7,-7,2,'#566573');
      C(-7,7,2,'#566573');  C(7,7,2,'#566573');
      // Antenna
      R(4,-15,2,4,'#aab7b8');
      C(5,-16,2,'#f39c12');
      // Arms (mechanical)
      R(-12,-4,6,5,'#717d7e');
      R(-12,-4,6,2,'#566573');
      R(8,-4,6,5,'#717d7e');
      R(8,-4,6,2,'#566573');
      // Legs
      R(-5,7,4,6,'#717d7e');
      R(2,7,4,6,'#717d7e');
      R(-6,13,4,2,'#566573');
      R(3,13,4,2,'#566573');
      break;
    }

    case 'necromancer': {
      // Black robe skull mage
      ctx.fillStyle='#17202a';
      ctx.beginPath(); ctx.moveTo(0,-12); ctx.lineTo(-8,10); ctx.lineTo(8,10); ctx.closePath(); ctx.fill();
      // Skull head
      C(0,-10,5,'#ecf0f1');
      R(-4,-10,3,3,'#17202a');     // eye sockets
      R(2,-10,3,3,'#17202a');
      R(-3,-6,7,2,'#17202a');      // teeth
      R(-2,-6,1,2,'#ecf0f1'); R(0,-6,1,2,'#ecf0f1'); R(2,-6,1,2,'#ecf0f1');
      // Staff
      R(10,-14,2,22,'#1a1a2e');
      const orbPulse = 0.8 + Math.sin(t)*0.2;
      ctx.fillStyle=`rgba(142,68,173,${orbPulse})`;
      ctx.beginPath(); ctx.arc(11,-14,5,0,Math.PI*2); ctx.fill();
      C(11,-14,3,'#d7bde2');
      // Robe detail
      ctx.strokeStyle='#2e4057'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(0,-8); ctx.lineTo(-4,10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,-8); ctx.lineTo(4,10); ctx.stroke();
      break;
    }

    case 'dragon': {
      // Green dragon with wings
      const flap = Math.sin(t) * 5;
      // Wings
      ctx.fillStyle='#1e8449';
      ctx.beginPath();
      ctx.moveTo(-3,-2); ctx.lineTo(-16,-8+flap); ctx.lineTo(-14,4+flap); ctx.lineTo(-6,4); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(3,-2);  ctx.lineTo(16,-8-flap);  ctx.lineTo(14,4-flap);  ctx.lineTo(6,4); ctx.fill();
      // Body
      R(-5,-4,12,10,'#27ae60');
      // Head
      R(5,-7,9,7,'#1e8449');
      R(11,-5,6,3,'#145a32');      // jaw
      // Spine
      ctx.fillStyle='#145a32';
      for(let i=0;i<4;i++) { ctx.beginPath(); ctx.moveTo(-5+i*2,-4); ctx.lineTo(-3+i*2,-9); ctx.lineTo(-1+i*2,-4); ctx.fill(); }
      // Tail
      R(-13,2,10,5,'#27ae60');
      R(-18,4,7,3,'#1e8449');
      // Eye
      C(10,-5,1.5,'#f39c12');
      // Fire breath
      ctx.fillStyle='rgba(231,76,60,0.7)';
      ctx.beginPath(); ctx.arc(19,-4,4,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='rgba(241,196,15,0.8)';
      ctx.beginPath(); ctx.arc(18,-4,2,0,Math.PI*2); ctx.fill();
      break;
    }

    case 'giant': {
      // Huge navy humanoid
      R(-12,-8,26,22,'#1a5276');
      R(-13,-16,27,11,'#154360');  // head
      // Eyes
      R(-8,-13,5,4,'#2e86c1');
      R(4,-13,5,4,'#2e86c1');
      C(-6,-11,2,'#aed6f1'); C(6,-11,2,'#aed6f1');
      // Nose / mouth
      R(-2,-8,5,3,'#0e3460');
      // Shoulders / arms
      R(-18,-6,8,18,'#154360');
      R(12,-6,8,18,'#154360');
      // Club in right hand
      R(17,4,4,12,'#8d6e47');
      R(14,4,9,5,'#5d4e37');
      // Legs
      R(-10,14,9,10,'#154360');
      R(2,14,9,10,'#154360');
      break;
    }

    case 'demon': {
      // Dark demon with horns and wings
      const wflap = Math.sin(t*0.8)*4;
      // Wings
      ctx.fillStyle='#1c2833';
      ctx.beginPath(); ctx.moveTo(-2,0); ctx.lineTo(-15,-5+wflap); ctx.lineTo(-12,8+wflap); ctx.lineTo(-3,6); ctx.fill();
      ctx.beginPath(); ctx.moveTo(2,0);  ctx.lineTo(15,-5-wflap);  ctx.lineTo(12,8-wflap);  ctx.lineTo(3,6); ctx.fill();
      // Body
      R(-5,-3,12,12,'#6e2f1a');
      // Head
      C(1,-7,5,'#922b21');
      // Horns
      ctx.fillStyle='#4a235a';
      ctx.beginPath(); ctx.moveTo(-3,-11); ctx.lineTo(-6,-18); ctx.lineTo(0,-11); ctx.fill();
      ctx.beginPath(); ctx.moveTo(4,-11);  ctx.lineTo(7,-18);  ctx.lineTo(10,-11); ctx.fill();
      // Eyes
      C(-1,-8,1.5,'#e74c3c'); C(4,-8,1.5,'#e74c3c');
      C(-1,-8,0.7,'#ff6060'); C(4,-8,0.7,'#ff6060');
      // Tail
      R(-9,6,8,3,'#6e2f1a');
      R(-14,6,6,2,'#5b2333');
      ctx.fillStyle='#c0392b';
      ctx.beginPath(); ctx.moveTo(-16,5); ctx.lineTo(-20,2); ctx.lineTo(-16,9); ctx.fill(); // tail spike
      break;
    }

    case 'guardian': {
      // Golden armored warrior with halo
      // Halo
      ctx.strokeStyle='rgba(255,215,0,0.7)'; ctx.lineWidth=3;
      ctx.beginPath(); ctx.arc(0,-13,7,0,Math.PI*2); ctx.stroke();
      // Body
      R(-6,-3,13,13,'#d4ac0d');
      // Shoulders / pauldrons
      R(-9,-5,5,8,'#b7950b');
      R(6,-5,5,8,'#b7950b');
      // Helmet
      R(-6,-10,13,9,'#f4d03f');
      R(-4,-8,9,5,'#1a1a2e');      // visor
      C(0,-6,2,'#3498db');         // gem in helmet
      // Shield (left)
      R(-12,-4,5,12,'#d4ac0d');
      R(-12,-4,5,3,'#f4d03f');
      C(-10,2,2,'#3498db');        // shield gem
      // Sword (right)
      R(9,-10,3,18,'#c0c0c0');
      R(6,-1,8,2,'#d4ac0d');       // crossguard
      // Legs
      R(-5,10,5,6,'#b7950b');
      R(1,10,5,6,'#b7950b');
      break;
    }

    case 'overlord': {
      // Massive black boss with red eyes
      const pulse = 0.6 + Math.sin(t*0.5)*0.4;
      // Outer glow
      ctx.shadowColor='#e74c3c'; ctx.shadowBlur=20*pulse;
      // Massive body
      R(-16,-14,33,30,'#0d0d0d');
      ctx.shadowBlur=0;
      // Armor plates
      R(-16,-14,33,8,'#1a1a1a');
      R(-16,0,33,8,'#1c1c1c');
      R(-16,10,33,8,'#1a1a1a');
      // Crown spikes
      ctx.fillStyle='#4a235a';
      for(let i=0;i<5;i++){
        const sx=-12+i*6; const sh=8+Math.sin(t+i)*2;
        ctx.beginPath(); ctx.moveTo(sx,-14); ctx.lineTo(sx+3,-14-sh); ctx.lineTo(sx+6,-14); ctx.fill();
      }
      // Multiple red eyes (3 pairs)
      const ey = Math.sin(t*0.3)*1;
      C(-8,-7+ey,3,'#e74c3c'); C(8,-7-ey,3,'#e74c3c');
      C(-8,-7+ey,1.5,'#ff4444'); C(8,-7-ey,1.5,'#ff4444');
      C(0,-7,4,'#e74c3c');     // center eye (larger)
      C(0,-7,2,'#ff6666');
      // Rune marks on body
      ctx.strokeStyle='#8e44ad'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(-8,2); ctx.lineTo(-4,8); ctx.lineTo(0,2); ctx.lineTo(4,8); ctx.lineTo(8,2); ctx.stroke();
      // Arms
      R(-22,-4,8,12,'#0d0d0d');
      R(15,-4,8,12,'#0d0d0d');
      // Clawed hands
      const claw = ['#1a1a1a','#0a0a0a'];
      for(let i=0;i<3;i++){ R(-24,8+i*2,3,3,claw[i%2]); R(22,8+i*2,3,3,claw[i%2]); }
      break;
    }

    // ── Air enemies ────────────────────────────────────────────────────────
    case 'drone': {
      // Quadrotor drone: grey frame + spinning propellers + blink light
      R(-2,-2,4,4,'#95a5a6');       // center body
      R(-1,-1,2,2,'#bdc3c7');       // inner plate
      R(-7,-1,14,2,'#7f8c8d');      // horizontal arm
      R(-1,-7,2,14,'#7f8c8d');      // vertical arm
      // Propeller hubs at 4 corners
      C(-6,-6,2,'#566573'); C(6,-6,2,'#566573');
      C(-6, 6,2,'#566573'); C(6, 6,2,'#566573');
      // Spinning propellers (rotate via tick)
      ctx.save();
      ctx.rotate(tick * 0.35);
      ctx.strokeStyle='#aab7b8'; ctx.lineWidth=1.5;
      [[-6,-6],[6,-6],[-6,6],[6,6]].forEach(([px,py])=>{
        ctx.beginPath(); ctx.moveTo(px-4,py); ctx.lineTo(px+4,py); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(px,py-4); ctx.lineTo(px,py+4); ctx.stroke();
      });
      ctx.restore();
      // Blinking red LED
      if (Math.sin(tick * 0.4) > 0) {
        C(0,0,1.5,'#e74c3c');
        ctx.save(); ctx.shadowColor='#e74c3c'; ctx.shadowBlur=6;
        C(0,0,1,'#ff8080');
        ctx.restore();
      }
      break;
    }

    case 'gryphon': {
      // Blue eagle-lion hybrid
      const gw = Math.sin(tick * 0.15) * 5;
      // Wings
      ctx.fillStyle='#2471a3';
      ctx.beginPath(); ctx.moveTo(-2,1); ctx.lineTo(-14,-5+gw); ctx.lineTo(-11,7+gw); ctx.lineTo(-2,4); ctx.fill();
      ctx.beginPath(); ctx.moveTo(2,1);  ctx.lineTo(14,-5-gw);  ctx.lineTo(11,7-gw);  ctx.lineTo(2,4);  ctx.fill();
      // Wing highlights
      ctx.fillStyle='#5dade2';
      ctx.beginPath(); ctx.moveTo(-2,1); ctx.lineTo(-12,-3+gw); ctx.lineTo(-9,3+gw); ctx.fill();
      ctx.beginPath(); ctx.moveTo(2,1);  ctx.lineTo(12,-3-gw);  ctx.lineTo(9,3-gw);  ctx.fill();
      // Body
      R(-4,-2,9,8,'#2980b9');
      // Head (eagle)
      C(-1,-5,4,'#2471a3');
      R(-5,-6,4,2,'#f39c12');       // beak
      C(-2,-6,1.2,'#fff');          // eye
      C(-2,-6,0.6,'#1a1a1a');       // pupil
      // Lion tail
      R(4,4,5,2,'#2980b9');
      R(8,3,3,4,'#1a5276');
      ctx.fillStyle='#2471a3';
      ctx.beginPath(); ctx.moveTo(10,3); ctx.lineTo(13,-1); ctx.lineTo(13,5); ctx.fill();
      break;
    }

    // ── Final bosses ──────────────────────────────────────────────────────────
    case 'vortex': {
      const phase2v = enemy && enemy._bossP2;
      const runeClr = phase2v ? '#e74c3c' : '#3498db';
      const shrdSpd = phase2v ? 0.07 : 0.035;
      // Сломанные крылья (рисуем первыми — за телом)
      ctx.fillStyle = '#2c3e50';
      ctx.beginPath(); ctx.moveTo(-6,2); ctx.lineTo(-24,-16); ctx.lineTo(-27,-9); ctx.lineTo(-20,0); ctx.lineTo(-10,6); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = runeClr; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(-8,1); ctx.lineTo(-20,-12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-6,-1); ctx.lineTo(-15,-8); ctx.stroke();
      ctx.strokeStyle = '#1a252f'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(-15,-9); ctx.lineTo(-17,-2); ctx.stroke();
      ctx.fillStyle = '#2c3e50';
      ctx.beginPath(); ctx.moveTo(6,2); ctx.lineTo(24,-16); ctx.lineTo(27,-9); ctx.lineTo(20,0); ctx.lineTo(10,6); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = runeClr; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(8,1); ctx.lineTo(20,-12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(6,-1); ctx.lineTo(15,-8); ctx.stroke();
      ctx.strokeStyle = '#1a252f'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(15,-9); ctx.lineTo(17,-2); ctx.stroke();
      // Тело — чёрный круг
      ctx.fillStyle = '#080808';
      ctx.beginPath(); ctx.arc(0,0,18,0,Math.PI*2); ctx.fill();
      // Руны по периметру (8 рун)
      for (let i=0;i<8;i++) {
        const a=(i/8)*Math.PI*2;
        const rx=Math.cos(a)*18, ry=Math.sin(a)*18;
        ctx.save(); ctx.translate(rx,ry); ctx.rotate(a);
        ctx.fillStyle=runeClr;
        ctx.fillRect(-1.5,-3,3,6); ctx.fillRect(-3,-1,6,2);
        ctx.restore();
      }
      // Меч — синяя светящаяся линия
      ctx.save();
      ctx.shadowColor='#3498db'; ctx.shadowBlur=12;
      ctx.strokeStyle='#5dade2'; ctx.lineWidth=3; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(-15,15); ctx.lineTo(15,-15); ctx.stroke();
      ctx.restore();
      // Глаза — два синих горящих
      ctx.save();
      ctx.shadowColor=runeClr; ctx.shadowBlur=10;
      ctx.fillStyle=runeClr;
      ctx.beginPath(); ctx.arc(-5,-3,3.5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(5,-3,3.5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#aed6f1';
      ctx.beginPath(); ctx.arc(-5,-3,1.5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(5,-3,1.5,0,Math.PI*2); ctx.fill();
      ctx.restore();
      // 4 вращающихся осколка
      for (let i=0;i<4;i++) {
        const a=tick*shrdSpd+(i/4)*Math.PI*2;
        const sx=Math.cos(a)*24, sy=Math.sin(a)*24;
        ctx.save(); ctx.translate(sx,sy); ctx.rotate(a+Math.PI*0.25);
        ctx.fillStyle=runeClr; ctx.shadowColor=runeClr; ctx.shadowBlur=5;
        ctx.beginPath(); ctx.moveTo(0,-4); ctx.lineTo(3,0); ctx.lineTo(0,4); ctx.lineTo(-3,0); ctx.closePath(); ctx.fill();
        ctx.restore();
      }
      break;
    }

    case 'ksara': {
      const t5 = tick * 0.05;
      // 20 песчаных частиц вокруг (вращаются)
      for (let i=0;i<20;i++) {
        const a=(i/20)*Math.PI*2+t5;
        const r=22+Math.sin(a*3+t5)*3;
        const px=Math.cos(a)*r, py=Math.sin(a)*r;
        const pa=0.25+Math.sin(a+t5*2)*0.2;
        ctx.save(); ctx.globalAlpha=Math.max(0.1,pa);
        ctx.fillStyle='#d4ac0d';
        ctx.beginPath(); ctx.arc(px,py,1.5,0,Math.PI*2); ctx.fill();
        ctx.restore();
      }
      // Тело — вытянутый золотисто-песочный силуэт
      ctx.fillStyle='#c9a227';
      ctx.beginPath(); ctx.ellipse(0,2,10,16,0,0,Math.PI*2); ctx.fill();
      // Четыре тонкие руки с посохами
      ctx.strokeStyle='#b7860b'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(-5,-5); ctx.lineTo(-17,-16); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(5,-5);  ctx.lineTo(17,-16);  ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-5,2);  ctx.lineTo(-16,9);   ctx.stroke();
      ctx.beginPath(); ctx.moveTo(5,2);   ctx.lineTo(16,9);    ctx.stroke();
      // Посохи (вертикальные линии на концах)
      ctx.strokeStyle='#f0c040'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(-17,-12); ctx.lineTo(-17,-20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(17,-12);  ctx.lineTo(17,-20);  ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-16,6); ctx.lineTo(-16,13); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(16,6);  ctx.lineTo(16,13);  ctx.stroke();
      // Светящиеся орбы на посохах
      ctx.save();
      ctx.shadowColor='#f1c40f'; ctx.shadowBlur=8;
      ctx.fillStyle='#f1c40f';
      ctx.beginPath(); ctx.arc(-17,-20,2.5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(17,-20,2.5,0,Math.PI*2); ctx.fill();
      ctx.restore();
      // Маска — золотой овал
      ctx.fillStyle='#d4ac0d';
      ctx.beginPath(); ctx.ellipse(0,-9,8,10,0,0,Math.PI*2); ctx.fill();
      // Пустые чёрные глазницы
      ctx.fillStyle='#0a0a0a';
      ctx.beginPath(); ctx.ellipse(-3,-10,2.5,3,0,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(3,-10,2.5,3,0,0,Math.PI*2); ctx.fill();
      // Декор маски
      ctx.strokeStyle='#f4d03f'; ctx.lineWidth=0.8;
      ctx.beginPath(); ctx.moveTo(0,-4); ctx.lineTo(0,-17); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-6,-9); ctx.lineTo(6,-9); ctx.stroke();
      // Вспышка призыва
      if (enemy && enemy.summonFlashTimer > 0) {
        ctx.save();
        ctx.globalAlpha = enemy.summonFlashTimer / 20 * 0.65;
        ctx.fillStyle='#f1c40f';
        ctx.beginPath(); ctx.arc(0,0,32,0,Math.PI*2); ctx.fill();
        ctx.restore();
      }
      break;
    }

    case 'malkar': {
      const t6 = tick * 0.04;
      const ph4 = enemy && enemy._bossP4;
      const rPulse = ph4 ? (0.5+Math.sin(tick*0.15)*0.5) : 0;
      // Мантия — неровные края (тёмно-фиолетовый)
      ctx.fillStyle='#1a0030';
      ctx.beginPath();
      for (let i=0;i<20;i++) {
        const a=(i/20)*Math.PI*2;
        const r=30+Math.sin(i*2.7+t6*0.5)*7;
        const px=Math.cos(a)*r, py=Math.sin(a)*r;
        if (i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
      }
      ctx.closePath(); ctx.fill();
      // Тело — тёмно-фиолетовый круг
      const bodyR = ph4 ? Math.round(80+rPulse*100) : 60;
      ctx.fillStyle=`rgb(${bodyR},0,${Math.round(80+rPulse*40)})`;
      if (!ph4) ctx.fillStyle='#5b2d8e';
      ctx.beginPath(); ctx.arc(0,0,24,0,Math.PI*2); ctx.fill();
      // Три пары крыльев (угловатые чёрные линии)
      ctx.strokeStyle='#150020'; ctx.lineWidth=2.5;
      for (let p=0;p<3;p++) {
        const wy=-12+p*12, wf=Math.sin(t6*1.5+p)*3;
        ctx.beginPath(); ctx.moveTo(-12,wy); ctx.lineTo(-32,wy-10+wf); ctx.lineTo(-28,wy+7+wf); ctx.lineTo(-10,wy+4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(12,wy);  ctx.lineTo(32,wy-10-wf);  ctx.lineTo(28,wy+7-wf);  ctx.lineTo(10,wy+4);  ctx.stroke();
      }
      // Корона — чёрные зубцы с красными огоньками
      for (let i=0;i<5;i++) {
        const a=Math.PI+(i/(5-1))*Math.PI;
        const cx2=Math.cos(a)*24, cy2=Math.sin(a)*24;
        const ix=Math.cos(a)*32, iy=Math.sin(a)*32;
        ctx.fillStyle='#0a0a0a';
        ctx.beginPath(); ctx.moveTo(cx2,cy2); ctx.lineTo(ix-2,iy); ctx.lineTo(ix+2,iy); ctx.closePath(); ctx.fill();
        ctx.save(); ctx.shadowColor='#e74c3c'; ctx.shadowBlur=8;
        ctx.fillStyle='#e74c3c';
        ctx.beginPath(); ctx.arc(ix,iy,2.2,0,Math.PI*2); ctx.fill();
        ctx.restore();
      }
      // Щупальца (6 штук, волновое движение)
      ctx.strokeStyle='#2c0050'; ctx.lineWidth=2.5;
      for (let i=0;i<6;i++) {
        const a=(i/6)*Math.PI*2+t6*0.4;
        const wv=Math.sin(t6*2+i*1.2)*9;
        const ex=Math.cos(a)*38+wv*Math.cos(a+Math.PI/2);
        const ey=Math.sin(a)*38+wv*Math.sin(a+Math.PI/2);
        ctx.beginPath();
        ctx.moveTo(Math.cos(a)*22,Math.sin(a)*22);
        ctx.quadraticCurveTo(Math.cos(a)*30+wv*0.4*Math.cos(a+Math.PI/2),Math.sin(a)*30+wv*0.4*Math.sin(a+Math.PI/2),ex,ey);
        ctx.stroke();
      }
      // Глаза — два больших красных горящих
      ctx.save();
      ctx.shadowColor='#e74c3c'; ctx.shadowBlur=14;
      ctx.fillStyle='#e74c3c';
      ctx.beginPath(); ctx.arc(-8,-5,6,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(8,-5,6,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#ff6666';
      ctx.beginPath(); ctx.arc(-8,-5,2.5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(8,-5,2.5,0,Math.PI*2); ctx.fill();
      ctx.restore();
      // Фиолетовые молнии (меняются каждые ~30 тиков)
      if ((tick>>3)%4<2) {
        const lseed=tick>>3;
        const lx1=(((lseed*37)%40)-20), ly1=(((lseed*71)%40)-20);
        const lx2=lx1+(((lseed*53)%20)-10), ly2=ly1+(((lseed*89)%20)-10);
        ctx.save();
        ctx.strokeStyle='rgba(138,43,226,0.65)'; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.moveTo(lx1,ly1); ctx.lineTo(lx2,ly2); ctx.stroke();
        ctx.restore();
      }
      break;
    }

    case 'zarok': {
      const t7 = tick * 0.09;
      // Тело — тёмно-красный
      ctx.fillStyle='#7d0a0a';
      ctx.beginPath(); ctx.arc(0,0,15,0,Math.PI*2); ctx.fill();
      // Рога (два треугольника сверху)
      ctx.fillStyle='#3a0505';
      ctx.beginPath(); ctx.moveTo(-5,-13); ctx.lineTo(-9,-24); ctx.lineTo(-2,-13); ctx.fill();
      ctx.beginPath(); ctx.moveTo(5,-13);  ctx.lineTo(9,-24);  ctx.lineTo(2,-13);  ctx.fill();
      // Детали тела
      ctx.fillStyle='#5a0808';
      ctx.fillRect(-7,-7,14,11);
      // Горящие глаза
      ctx.save();
      ctx.shadowColor='#ff4444'; ctx.shadowBlur=10;
      ctx.fillStyle='#e74c3c';
      ctx.beginPath(); ctx.arc(-4,-3,3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(4,-3,3,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#ff8080';
      ctx.beginPath(); ctx.arc(-4,-3,1.2,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(4,-3,1.2,0,Math.PI*2); ctx.fill();
      ctx.restore();
      // Когти
      ctx.strokeStyle='#3a0505'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(-11,4); ctx.lineTo(-17,0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-11,4); ctx.lineTo(-17,9); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(11,4); ctx.lineTo(17,0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(11,4); ctx.lineTo(17,9); ctx.stroke();
      break;
    }

    case 'airdragon': {
      // Green wyvern (air variant, more wing-dominant)
      const af = Math.sin(tick * 0.13) * 7;
      // Large wings
      ctx.fillStyle='#1e8449';
      ctx.beginPath(); ctx.moveTo(-3,-1); ctx.lineTo(-19,-9+af); ctx.lineTo(-17,7+af); ctx.lineTo(-5,5); ctx.fill();
      ctx.beginPath(); ctx.moveTo(3,-1);  ctx.lineTo(19,-9-af);  ctx.lineTo(17,7-af);  ctx.lineTo(5,5);  ctx.fill();
      // Wing membrane texture
      ctx.strokeStyle='#145a32'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(-3,2); ctx.lineTo(-15,-3+af); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-3,2); ctx.lineTo(-12,5+af);  ctx.stroke();
      ctx.beginPath(); ctx.moveTo(3,2);  ctx.lineTo(15,-3-af);  ctx.stroke();
      ctx.beginPath(); ctx.moveTo(3,2);  ctx.lineTo(12,5-af);   ctx.stroke();
      // Body
      R(-5,-4,12,9,'#27ae60');
      // Head with long neck
      R(5,-7,10,7,'#1e8449');
      R(12,-5,6,3,'#145a32');       // jaw
      C(9,-6,1.5,'#f39c12');        // eye
      // Spine ridges
      ctx.fillStyle='#145a32';
      for(let i=0;i<4;i++){ ctx.beginPath(); ctx.moveTo(-5+i*2,-4); ctx.lineTo(-3+i*2,-9); ctx.lineTo(-1+i*2,-4); ctx.fill(); }
      // Tail
      R(-14,1,10,4,'#27ae60');
      R(-19,2,6,3,'#1e8449');
      ctx.fillStyle='#1e8449';
      ctx.beginPath(); ctx.moveTo(-20,2); ctx.lineTo(-24,-1); ctx.lineTo(-20,6); ctx.fill();
      break;
    }

    case 'lancer': {
      // Desert warrior with spear
      const legOff = Math.sin(t * 1.8) * 2;
      R(-3,-2,7,8,'#7d5a3c');       // body
      C(1,-6,3.5,'#c8a882');        // head
      R(-3,-8,7,4,'#5a3a1a');       // helmet
      R(-4,-2,2,2,'#5a3a1a');       // left shoulder pad
      R(5,-2,2,2,'#5a3a1a');        // right shoulder pad
      // Spear
      ctx.strokeStyle='#8b6914'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(4,-9); ctx.lineTo(4,12); ctx.stroke();
      ctx.fillStyle='#d4ac0d';
      ctx.beginPath(); ctx.moveTo(2,-9); ctx.lineTo(4,-17); ctx.lineTo(6,-9); ctx.closePath(); ctx.fill();
      // Legs
      R(-3,6,2,3+legOff,'#6b4226');
      R(2,6,2,3-legOff,'#6b4226');
      break;
    }

    // ── Map 2 Desert enemies ──────────────────────────────────────────────────

    case 'trader': {
      // Orange merchant with bag
      const bob = Math.sin(t * 1.2) * 1;
      R(-3,-2+bob,7,8,'#e67e22');    // body
      C(1,-5+bob,3.5,'#f0c060');     // head
      R(-3,-7+bob,7,3,'#d35400');    // cap
      // Bag on back
      C(-6,1+bob,5,'#8d6e47');
      C(-6,1+bob,3,'#a0845c');
      R(-4,4+bob,3,2,'#6b4226');     // strap
      R(-3,6,2,3,'#d35400');         // left leg
      R(2,6,2,3,'#d35400');
      // Coin glint
      ctx.fillStyle='#f1c40f';
      ctx.beginPath(); ctx.arc(-6,1+bob,1.5,0,Math.PI*2); ctx.fill();
      break;
    }

    case 'camel_rider': {
      // Brown camel with rider on top
      // Camel body
      R(-9,3,18,7,'#c8a25e');
      // Hump
      ctx.fillStyle='#b8902e';
      ctx.beginPath(); ctx.arc(0,-1,7,Math.PI,0); ctx.fill();
      R(-8,3,5,5,'#c8a25e');  // front leg
      R(4,3,5,5,'#c8a25e');   // rear leg
      R(10,1,5,4,'#b8902e');  // neck
      C(13,-1,3,'#c8a25e');   // camel head
      // Rider
      R(-3,-10,6,8,'#7b3f00');
      C(0,-13,3,'#f0a060');
      R(-2,-15,4,3,'#5a2d00');  // turban
      break;
    }

    case 'rider_foot': {
      // Dismounted rider walking
      const step = Math.sin(t * 2.0) * 2;
      R(-2,-2,6,8,'#7b3f00');
      C(1,-5,3,'#f0a060');
      R(-2,-8,5,3,'#5a2d00');
      R(-3,6,2,3+step,'#5a1f00');
      R(2,6,2,3-step,'#5a1f00');
      break;
    }

    case 'mummy': {
      // White mummy with bandages
      R(-4,-3,9,11,'#e8e0c8');
      C(1,-6,4,'#f0ead8');
      // Bandage lines
      ctx.strokeStyle='#c8bc9a'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(-4,-2); ctx.lineTo(5,-2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-4,1); ctx.lineTo(5,1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-4,4); ctx.lineTo(5,4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-4,-5); ctx.lineTo(5,-5); ctx.stroke();
      // Eye slit (glowing)
      R(-2,-7,5,2,'#2c3e50');
      ctx.fillStyle='rgba(180,220,50,0.8)';
      ctx.beginPath(); ctx.arc(0,-6,1.5,0,Math.PI*2); ctx.fill();
      // Dragging wraps
      R(-4,8,2,4,'#e0d8b8');
      R(3,8,2,4,'#e0d8b8');
      break;
    }

    case 'sand_spirit': {
      // Semi-transparent yellow wisp
      ctx.save();
      ctx.globalAlpha = 0.55;
      const sw = Math.sin(t * 0.6) * 2;
      ctx.fillStyle='#f1c40f';
      ctx.beginPath(); ctx.arc(0,0,7,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='rgba(255,230,50,0.7)';
      ctx.beginPath(); ctx.arc(sw,-2,4,0,Math.PI*2); ctx.fill();
      // Swirl trails
      ctx.strokeStyle='rgba(255,200,0,0.5)'; ctx.lineWidth=1.5;
      for (let i=0;i<3;i++) {
        const a = i*Math.PI*2/3+t*0.3;
        ctx.beginPath(); ctx.arc(0,0,9,a,a+Math.PI*0.7); ctx.stroke();
      }
      ctx.restore();
      break;
    }

    case 'spearman': {
      // Red-brown warrior with spear, different from lancer
      const sleg = Math.sin(t * 1.5) * 2;
      R(-4,-2,9,9,'#8b3a0a');
      C(0,-6,3.5,'#c88055');
      R(-4,-9,9,4,'#5a1a00');
      // Round shield
      ctx.fillStyle='#c0392b'; ctx.beginPath(); ctx.arc(-7,0,5,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle='#922b21'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.arc(-7,0,5,0,Math.PI*2); ctx.stroke();
      // Spear (diagonal)
      ctx.strokeStyle='#8b6914'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(3,-11); ctx.lineTo(7,10); ctx.stroke();
      ctx.fillStyle='#d4ac0d';
      ctx.beginPath(); ctx.moveTo(1,-11); ctx.lineTo(3,-18); ctx.lineTo(5,-11); ctx.closePath(); ctx.fill();
      R(-3,7,2,3+sleg,'#6b1a00');
      R(2,7,2,3-sleg,'#6b1a00');
      break;
    }

    case 'pharaoh': {
      // Gold pharaoh with crown, pulsing aura
      const aura = 0.3 + Math.abs(Math.sin(t*0.5))*0.3;
      ctx.save(); ctx.globalAlpha=aura;
      ctx.fillStyle='#f1c40f';
      ctx.beginPath(); ctx.arc(0,0,14,0,Math.PI*2); ctx.fill();
      ctx.restore();
      R(-5,-3,11,11,'#d4ac0d');
      // Nemes crown
      R(-5,-11,11,9,'#f1c40f');
      R(-7,-6,3,9,'#d4ac0d');
      R(5,-6,3,9,'#d4ac0d');
      R(-4,-11,9,4,'#2c3e50');  // blue stripe
      // Face
      R(-3,-5,7,5,'#c8a25e');
      R(-2,-4,5,2,'#2c3e50');   // eye stripe
      // Crook & flail symbols
      ctx.strokeStyle='#8b6914'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(5,-1); ctx.lineTo(5,8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(4,-1); ctx.arc(4,-3,2,Math.PI/2,3*Math.PI/2,true); ctx.stroke();
      break;
    }

    case 'anubis': {
      // Dark blue, jackal head
      R(-4,-2,9,11,'#1a237e');
      // Jackal head (elongated snout)
      R(-4,-10,9,8,'#283593');
      R(2,-8,6,4,'#1a237e');    // snout
      // Pointed ears
      ctx.fillStyle='#1a237e';
      ctx.beginPath(); ctx.moveTo(-4,-10); ctx.lineTo(-7,-17); ctx.lineTo(-1,-10); ctx.fill();
      ctx.beginPath(); ctx.moveTo(3,-10);  ctx.lineTo(6,-17);  ctx.lineTo(9,-10);  ctx.fill();
      // Golden eyes
      C(-1,-7,1.5,'#f1c40f'); C(4,-7,1.5,'#f1c40f');
      // Staff of Anubis
      ctx.strokeStyle='#d4ac0d'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(8,-12); ctx.lineTo(8,9); ctx.stroke();
      C(8,-13,3,'#d4ac0d');
      // Revive glow if applicable
      if (enemy && enemy._revived) {
        ctx.save(); ctx.shadowColor='#f1c40f'; ctx.shadowBlur=12;
        ctx.strokeStyle='rgba(241,196,15,0.6)'; ctx.lineWidth=2;
        ctx.beginPath(); ctx.arc(0,0,12,0,Math.PI*2); ctx.stroke();
        ctx.restore();
      }
      break;
    }

    case 'sphinx': {
      // Golden winged lion (air)
      const sf = Math.sin(t * 0.12) * 5;
      // Wings
      ctx.fillStyle='#d4ac0d';
      ctx.beginPath(); ctx.moveTo(-2,-1); ctx.lineTo(-15,-8+sf); ctx.lineTo(-12,5+sf); ctx.lineTo(-3,3); ctx.fill();
      ctx.beginPath(); ctx.moveTo(2,-1);  ctx.lineTo(15,-8-sf);  ctx.lineTo(12,5-sf);  ctx.lineTo(3,3);  ctx.fill();
      ctx.fillStyle='#f1c40f';
      ctx.beginPath(); ctx.moveTo(-2,-1); ctx.lineTo(-12,-4+sf); ctx.lineTo(-9,2+sf); ctx.fill();
      ctx.beginPath(); ctx.moveTo(2,-1);  ctx.lineTo(12,-4-sf);  ctx.lineTo(9,2-sf);  ctx.fill();
      // Lion body
      R(-5,-1,12,8,'#c8a25e');
      // Human head
      C(1,-6,4,'#c8a25e');
      R(-3,-9,7,4,'#d4ac0d');   // nemes headdress
      R(-2,-8,5,3,'#2c3e50');   // eye stripe
      C(-1,-7,1,'#27ae60'); C(3,-7,1,'#27ae60');
      // Lion paws
      R(-6,7,4,3,'#b8902e');
      R(5,7,4,3,'#b8902e');
      break;
    }

    case 'desert_giant': {
      // Huge sand-coloured humanoid
      R(-14,-10,29,24,'#c8a25e');
      R(-15,-18,30,11,'#b8902e');   // head
      C(-6,-13,3,'#8b6914'); C(6,-13,3,'#8b6914');  // eyes
      C(-6,-13,1.5,'#e74c3c'); C(6,-13,1.5,'#e74c3c');  // iris
      R(-4,-9,9,4,'#a07830');       // nose area
      R(-7,-5,15,3,'#a07830');      // mouth
      R(-20,-6,8,18,'#b8902e');     // arms
      R(13,-6,8,18,'#b8902e');
      // Rock fists
      R(-21,8,8,8,'#8b7355');
      R(14,8,8,8,'#8b7355');
      R(-12,14,10,10,'#b8902e');    // legs
      R(3,14,10,10,'#b8902e');
      break;
    }

    case 'ra_priest': {
      // White robe, sun disc staff
      ctx.fillStyle='#ecf0f1';
      ctx.beginPath(); ctx.moveTo(0,-10); ctx.lineTo(-6,9); ctx.lineTo(6,9); ctx.closePath(); ctx.fill();
      C(0,-9,4,'#f0c060');          // face
      R(-1,-12,2,3,'#d4ac0d');      // neck/collar
      // Sun disc on staff
      ctx.strokeStyle='#f1c40f'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(9,-12); ctx.lineTo(9,9); ctx.stroke();
      const sp = 0.7 + Math.sin(t*0.4)*0.3;
      ctx.save(); ctx.shadowColor='#f39c12'; ctx.shadowBlur=10*sp;
      C(9,-13,5,'#f1c40f');
      C(9,-13,3,'#f39c12');
      // Sun rays
      ctx.strokeStyle='#f1c40f'; ctx.lineWidth=1;
      for(let i=0;i<8;i++){
        const ra=i*Math.PI/4;
        ctx.beginPath(); ctx.moveTo(9+Math.cos(ra)*5,-13+Math.sin(ra)*5); ctx.lineTo(9+Math.cos(ra)*9,-13+Math.sin(ra)*9); ctx.stroke();
      }
      ctx.restore();
      // Robe detail
      ctx.strokeStyle='#d4ac0d'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(0,-7); ctx.lineTo(-4,9); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,-7); ctx.lineTo(4,9); ctx.stroke();
      break;
    }

    case 'scarab': {
      // Small dark green beetle
      R(-4,-2,8,5,'#1e6f00');      // shell
      // Wing split
      ctx.strokeStyle='#145a00'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(0,-2); ctx.lineTo(0,3); ctx.stroke();
      // Head
      C(0,-4,2,'#1e6f00');
      // Antennae
      ctx.strokeStyle='#145a00'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(-1,-5); ctx.lineTo(-4,-8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(1,-5); ctx.lineTo(4,-8); ctx.stroke();
      // Legs (3 pairs)
      ctx.strokeStyle='#1e6f00'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(-4,-1); ctx.lineTo(-7,1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-4,1); ctx.lineTo(-7,3); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(4,-1); ctx.lineTo(7,1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(4,1); ctx.lineTo(7,3); ctx.stroke();
      break;
    }

    case 'sand_golem': {
      // Large sand stone golem
      R(-12,-9,25,22,'#c8a25e');
      // Stone texture chunks
      R(-12,-9,13,11,'#b8902e');
      R(1,2,12,11,'#b8902e');
      R(-1,-1,2,2,'#8b6914');
      R(-12,-1,25,2,'#8b6914');
      R(-1,-9,2,22,'#8b6914');
      // Glowing sand eyes
      C(-4,-3,3,'#f39c12'); C(5,-3,3,'#f39c12');
      C(-4,-3,1.5,'#f1c40f'); C(5,-3,1.5,'#f1c40f');
      // Heavy arms
      R(-17,-4,6,9,'#b8902e');
      R(12,-4,6,9,'#b8902e');
      break;
    }

    case 'sand_golem_mini': {
      // Small sand stone golem
      R(-6,-5,13,11,'#c8a25e');
      R(-6,-5,7,5,'#b8902e');
      R(1,1,6,5,'#b8902e');
      C(-2,-1,1.5,'#f39c12'); C(3,-1,1.5,'#f39c12');
      R(-9,-2,4,5,'#b8902e');
      R(6,-2,4,5,'#b8902e');
      break;
    }

    case 'dark_mage': {
      // Purple teleporting mage
      ctx.fillStyle='#4a235a';
      ctx.beginPath(); ctx.moveTo(0,-10); ctx.lineTo(-6,8); ctx.lineTo(6,8); ctx.closePath(); ctx.fill();
      C(0,-8,4,'#d2b4de');
      R(-1,-12,2,3,'#8e44ad');
      ctx.fillStyle='#3d1a57';
      ctx.beginPath(); ctx.moveTo(-5,-10); ctx.lineTo(-8,-6); ctx.lineTo(8,-6); ctx.lineTo(5,-10); ctx.closePath(); ctx.fill();
      // Teleport staff (dark, crackling)
      R(9,-11,2,19,'#1a1a2e');
      const tp = 0.8 + Math.sin(t*1.2)*0.2;
      ctx.save(); ctx.shadowColor='#8e44ad'; ctx.shadowBlur=14*tp;
      ctx.fillStyle=`rgba(142,68,173,${tp})`;
      ctx.beginPath(); ctx.arc(10,-12,5,0,Math.PI*2); ctx.fill();
      C(10,-12,2.5,'#d7bde2');
      ctx.restore();
      // Robe seams
      ctx.strokeStyle='#7d3c98'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(0,-7); ctx.lineTo(-3,8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,-7); ctx.lineTo(3,8); ctx.stroke();
      break;
    }

    case 'tomb_guardian': {
      // Dark gold armored guardian
      R(-5,-3,11,12,'#9a7d0a');     // body armour
      R(-6,-10,13,9,'#b7950b');     // helmet
      R(-4,-8,9,5,'#1a1a2e');       // visor
      C(0,-6,2,'#e74c3c');          // gem in visor
      R(-8,-2,4,9,'#8d7000');       // left pauldron
      R(5,-2,4,9,'#8d7000');
      // Khepesh sword
      ctx.strokeStyle='#d4ac0d'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(9,-10); ctx.lineTo(9,4); ctx.lineTo(15,2); ctx.stroke();
      ctx.fillStyle='#d4ac0d';
      ctx.beginPath(); ctx.moveTo(8,-10); ctx.lineTo(9,-16); ctx.lineTo(10,-10); ctx.closePath(); ctx.fill();
      // Shield
      R(-12,-5,5,13,'#b7950b');
      R(-12,-5,5,3,'#d4ac0d');
      // Legs
      R(-4,9,4,6,'#8d7000');
      R(1,9,4,6,'#8d7000');
      break;
    }

    case 'desert_dragon': {
      // Large sand-toned winged dragon (air)
      const df = Math.sin(t * 0.11) * 6;
      // Wings
      ctx.fillStyle='#b8902e';
      ctx.beginPath(); ctx.moveTo(-3,-1); ctx.lineTo(-18,-9+df); ctx.lineTo(-15,7+df); ctx.lineTo(-5,4); ctx.fill();
      ctx.beginPath(); ctx.moveTo(3,-1);  ctx.lineTo(18,-9-df);  ctx.lineTo(15,7-df);  ctx.lineTo(5,4);  ctx.fill();
      ctx.fillStyle='#d4ac0d';
      ctx.beginPath(); ctx.moveTo(-3,-1); ctx.lineTo(-14,-4+df); ctx.lineTo(-11,3+df); ctx.fill();
      ctx.beginPath(); ctx.moveTo(3,-1);  ctx.lineTo(14,-4-df);  ctx.lineTo(11,3-df);  ctx.fill();
      // Body
      R(-5,-3,12,10,'#c8a25e');
      // Head
      R(5,-6,9,7,'#b8902e');
      R(11,-4,6,3,'#8b6914');       // jaw
      // Spine ridges
      ctx.fillStyle='#8b6914';
      for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(-5+i*2,-3);ctx.lineTo(-3+i*2,-8);ctx.lineTo(-1+i*2,-3);ctx.fill();}
      // Tail
      R(-14,2,10,5,'#c8a25e');
      R(-19,3,7,4,'#b8902e');
      ctx.fillStyle='#b8902e';
      ctx.beginPath(); ctx.moveTo(-20,3); ctx.lineTo(-24,-1); ctx.lineTo(-20,7); ctx.fill();
      // Eye (amber)
      C(9,-4,1.5,'#e67e22');
      // Flame breath
      ctx.fillStyle='rgba(210,140,30,0.7)';
      ctx.beginPath(); ctx.arc(19,-3,4,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='rgba(241,196,15,0.8)';
      ctx.beginPath(); ctx.arc(18,-3,2,0,Math.PI*2); ctx.fill();
      break;
    }
  }
}

// ─── Main draw function ───────────────────────────────────────────────────────
function drawEnemy(ctx, enemy) {
  const { x, y, type, slowTimer, hp, maxHP, size, tick, air } = enemy;

  // Малькар: тёмный след за движением
  if (enemy.posHistory && enemy.posHistory.length > 0) {
    enemy.posHistory.forEach((p, i) => {
      const alpha = (1 - i / enemy.posHistory.length) * 0.2;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#1a0030';
      ctx.beginPath(); ctx.arc(p.x, p.y, size * 0.7, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });
  }

  if (air) {
    // Altitude shadow (far below, faint — suggests flying height)
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    ctx.ellipse(x + 2, y + size * 3, size * 0.75, size * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    // Subtle air glow ring
    ctx.save();
    ctx.strokeStyle = 'rgba(150,210,255,0.18)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x, y, size + 4, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  } else {
    // Ground shadow
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(x + 2, y + size * 0.7, size * 0.85, size * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Sprite
  ctx.save();
  if (enemy.invis) ctx.globalAlpha = 0.2; // Ксара: невидимость
  ctx.translate(x, y);
  drawEnemySprite(ctx, type, size, tick || 0, enemy);

  // Slow tint
  if (slowTimer > 0) {
    ctx.fillStyle = 'rgba(0,188,212,0.35)';
    ctx.beginPath();
    ctx.arc(0, 0, size + 2, 0, Math.PI * 2);
    ctx.fill();
    // Ice crystals
    ctx.strokeStyle = 'rgba(100,220,255,0.7)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a) * (size + 4), Math.sin(a) * (size + 4));
      ctx.stroke();
    }
  }
  ctx.restore();

  // Burn overlay
  if (enemy.burnTimer > 0) {
    ctx.save(); ctx.translate(x, y);
    ctx.fillStyle = 'rgba(231,76,60,0.3)';
    ctx.beginPath(); ctx.arc(0, 0, size + 2, 0, Math.PI*2); ctx.fill();
    const ft = Date.now() * 0.005;
    ctx.fillStyle = '#e67e22';
    for (let i = 0; i < 3; i++) {
      const fa = ft + i * 2.1;
      ctx.beginPath(); ctx.arc(Math.cos(fa)*(size-1), Math.sin(fa)*(size-1)-2, 2.5, 0, Math.PI*2); ctx.fill();
    }
    ctx.restore();
  }

  // Poison overlay
  if (enemy.poisonTimer > 0) {
    ctx.save(); ctx.translate(x, y);
    ctx.fillStyle = 'rgba(39,174,96,0.32)';
    ctx.beginPath(); ctx.arc(0, 0, size + 2, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = 'rgba(39,174,96,0.7)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(0, 0, size + 2, 0, Math.PI*2); ctx.stroke();
    ctx.restore();
  }

  // Элитная золотая обводка
  if (enemy.elite) {
    ctx.save();
    ctx.translate(x, y);
    ctx.shadowColor = '#f1c40f';
    ctx.shadowBlur  = 10;
    ctx.strokeStyle = '#f39c12';
    ctx.lineWidth   = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, size + 3.5, 0, Math.PI * 2);
    ctx.stroke();
    // Иконка типа элиты
    ctx.shadowBlur = 0;
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f1c40f';
    const eliteIcon = { shield:'🛡', speedBoost:'⚡', invis:'👁' }[enemy.elite.type] || '★';
    ctx.fillText(eliteIcon, 0, -size - 3);
    ctx.restore();
  }

  // HP bar
  const bw = Math.max(size * 2.4, 22);
  const bh = 4;
  const bx = x - bw / 2;
  const by = y - size - 10;
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(bx - 1, by - 1, bw + 2, bh + 2);
  ctx.fillStyle = '#222';
  ctx.fillRect(bx, by, bw, bh);
  const ratio = hp / maxHP;
  // Элиты — золотая HP-полоса
  if (enemy.elite) {
    ctx.fillStyle = '#f1c40f';
  } else {
    ctx.fillStyle = ratio > 0.6 ? '#2ecc71' : ratio > 0.3 ? '#f39c12' : '#e74c3c';
  }
  ctx.fillRect(bx, by, bw * ratio, bh);

  // Regen pulse on HP bar
  if (enemy.regen > 0 && hp < maxHP) {
    const pulse = 0.5 + Math.abs(Math.sin(enemy.tick * 0.08)) * 0.5;
    ctx.fillStyle = `rgba(46,204,113,${pulse * 0.55})`;
    ctx.fillRect(bx + bw * ratio, by, Math.min(bw * 0.08, bw * (1 - ratio)), bh);
    const regenLabel = enemy.regenPct ? `+${enemy.regenPct}%/с` : '+/с';
    ctx.fillStyle = `rgba(46,204,113,${pulse})`;
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(regenLabel, bx + bw, by - 2);
    ctx.textAlign = 'center';
  }

  // Имя финального босса над полоской HP
  if (enemy.isFinalBoss) {
    const bossNameColor = { vortex:'#3498db', ksara:'#d4ac0d', malkar:'#e74c3c', zarok:'#c0392b' }[type] || '#fff';
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = 'bold 11px sans-serif';
    ctx.shadowColor = bossNameColor; ctx.shadowBlur = 8;
    ctx.fillStyle = bossNameColor;
    ctx.fillText(enemy.name, x, by - 8);
    ctx.shadowBlur = 0;
    ctx.restore();
  }
}

// ─── Enemy class ──────────────────────────────────────────────────────────────
class Enemy {
  constructor(type, wave, path, elite) {
    const def = ENEMY_DEFS[type];
    this.type = type;
    this.name = def.name;
    this.maxHP = def.isFinalBoss
      ? def.baseHP
      : def.isBoss
        ? (def.baseHP + wave * 80) * 2
        : def.linearHP
          ? def.baseHP + wave * (def.hpPerWave || 0)
          : def.mapOnly === 'gorge'
            ? calcHPGorge(def.baseHP, wave)
            : calcHP(def.baseHP, wave);
    this.hp    = this.maxHP;
    // % рег. от maxHP в секунду
    this.regen = def.regenPct ? def.regenPct / 100 * this.maxHP : 0;
    this.regenPct = def.regenPct || 0;
    // Скорость: финальные боссы фиксированные; горж-враги +5%/5 волн; остальные +8%/5 волн
    this.speed = def.isFinalBoss ? def.speed
      : def.mapOnly === 'gorge'
        ? def.speed * Math.pow(1.05, Math.floor((wave - 1) / 5))
        : def.speed * Math.pow(1.08, Math.floor((wave - 1) / 5));
    this.baseSpeed = this.speed;
    this.armor  = def.armor || 0;
    this.lastArmorBlock = 0;
    this.reward = def.reward;
    this.size = def.size;
    this.air  = def.air || false;
    this.path = path;
    this.pathIndex = 0;
    this.x = path[0].x;
    this.y = path[0].y;
    this.dead = false;
    this.reached = false;
    this.slowTimer = 0;
    this.slowFactor = 1;
    this.distanceTraveled = 0;
    this.tick = 0;
    this.burnTimer = 0;
    this.burnDps   = 0;
    this.poisonTimer = 0;
    this.poisonDps   = 0;
    // Элитные свойства
    this.elite = elite || null;
    this.eliteShieldTimer  = (elite?.type === 'shield')     ? 5   : 0;
    this.eliteSpeedBoosted = false;
    // Финальные боссы
    this.isFinalBoss     = def.isFinalBoss || false;
    this.pendingSummon   = null;       // { type, count, hpMult? }
    this.towerDebuffPending = false;   // Малькар 50% HP
    this._bossP2         = false;      // фаза 2 активирована
    this._bossP3         = false;      // фаза 3 активирована
    this._bossP4         = false;      // фаза 4 активирована
    this.summonFlashTimer = 0;
    this.invis           = false;
    this.invisTimer      = 0;
    this.ksaraSummonTimer = (type === 'ksara') ? 15.0 : 0;
    this.posHistory      = [];         // Малькар: след движения
    // ── Map 2 mechanics ───────────────────────────────────────────────────────
    this.blocked       = false; this.blockTimer = 0; this.blockedFactor = 1;
    this.cursed        = false; this.curseTimer = 0; this.curseFactor   = 1;
    this.scorpionStacks = 0;    this.scorpionStackTimer = 0;
    // ── Map 2 desert enemy specials ──────────────────────────────────────────
    this.gorgeSpeedMult    = 1;     // pharaoh speed aura multiplier (reset each frame)
    this._revived          = false; // anubis: revived once flag
    this.teleportTimer     = def.teleportInterval || 0;  // dark mage teleport
    this._deathSpawnDone   = false; // camel_rider / sand_golem death spawn flag
    // Tomb guardian: start invisible for N seconds
    if (def.startInvis) {
      this.invis         = true;
      this.startInvisTimer = def.startInvis;
    } else {
      this.startInvisTimer = 0;
    }
  }

  update(dt) {
    this.tick++;

    // Регенерация HP
    if (this.regen > 0 && this.hp > 0 && this.hp < this.maxHP) {
      this.hp = Math.min(this.maxHP, this.hp + this.regen * dt);
    }

    // Элитный щит: таймер
    if (this.eliteShieldTimer > 0) this.eliteShieldTimer -= dt;

    // Элитное ускорение: когда HP < 50%
    if (this.elite?.type === 'speedBoost' && !this.eliteSpeedBoosted && this.hp < this.maxHP * 0.5) {
      this.speed = this.baseSpeed * 1.5;
      this.eliteSpeedBoosted = true;
    }

    // Фазовые переходы финальных боссов
    if (this.isFinalBoss && !this.dead) {
      const hpPct = this.hp / this.maxHP;

      if (this.type === 'vortex' && !this._bossP2 && hpPct <= 0.5) {
        this._bossP2 = true;
        this.speed = this.baseSpeed * 1.5;
        this.armor = 0;
      }

      if (this.type === 'ksara') {
        // Таймер призыва солдат каждые 15 сек
        this.ksaraSummonTimer -= dt;
        if (this.ksaraSummonTimer <= 0) {
          this.ksaraSummonTimer = 15.0;
          this.pendingSummon = { type: 'soldier', count: 3, hpMult: 1.5 };
          this.summonFlashTimer = 20;
        }
        // На 30% HP: невидимость 5 сек (один раз)
        if (!this._bossP2 && hpPct <= 0.3) {
          this._bossP2 = true;
          this.invis = true;
          this.invisTimer = 5.0;
        }
        // Обратный отсчёт невидимости
        if (this.invis) {
          this.invisTimer -= dt;
          if (this.invisTimer <= 0) { this.invis = false; }
        }
        // Флеш призыва
        if (this.summonFlashTimer > 0) this.summonFlashTimer = Math.max(0, this.summonFlashTimer - dt * 60);
      }

      if (this.type === 'malkar') {
        // Тёмный след
        if (this.tick % 5 === 0) {
          this.posHistory.unshift({ x: this.x, y: this.y });
          if (this.posHistory.length > 8) this.posHistory.pop();
        }
        // На 75% HP: призвать Зарока
        if (!this._bossP2 && hpPct <= 0.75) {
          this._bossP2 = true;
          this.pendingSummon = { type: 'zarok', count: 1 };
        }
        // На 50% HP: ослабить башни
        if (!this._bossP3 && hpPct <= 0.5) {
          this._bossP3 = true;
          this.towerDebuffPending = true;
        }
        // На 25% HP: скорость ×2, броня 0, регенерация 5%
        if (!this._bossP4 && hpPct <= 0.25) {
          this._bossP4 = true;
          this.speed = this.baseSpeed * 2;
          this.armor = 0;
          this.regen = 0.05 * this.maxHP;
          this.regenPct = 5.0;
        }
      }
    }

    // DoT effects
    if (this.burnTimer > 0) {
      this.burnTimer -= dt;
      this.takeDamage(this.burnDps * dt);
      if (this.dead) return;
    }
    if (this.poisonTimer > 0) {
      this.poisonTimer -= dt;
      this.takeDamage(this.poisonDps * dt);
      if (this.dead) return;
    }

    if (this.slowTimer > 0) {
      this.slowTimer -= dt;
      if (this.slowTimer <= 0) this.slowFactor = 1;
    }

    // ── Map 2 desert specials ─────────────────────────────────────────────────
    // Tomb guardian: start invis countdown
    if (this.startInvisTimer > 0) {
      this.startInvisTimer -= dt;
      if (this.startInvisTimer <= 0) { this.startInvisTimer = 0; this.invis = false; }
    }
    // Dark mage: teleport forward every N seconds
    if (this.teleportTimer > 0 && !this.dead) {
      this.teleportTimer -= dt;
      if (this.teleportTimer <= 0) {
        this.teleportTimer = ENEMY_DEFS[this.type].teleportInterval;
        this.pathIndex = Math.min(this.pathIndex + 5, this.path.length - 2);
        this.x = this.path[this.pathIndex].x;
        this.y = this.path[this.pathIndex].y;
      }
    }

    // ── Map 2 DoTs / states ───────────────────────────────────────────────────
    if (this.scorpionStacks > 0) {
      this.scorpionStackTimer -= dt;
      if (this.scorpionStackTimer <= 0) { this.scorpionStacks = 0; }
      else { this.takeDamage(this.scorpionStacks * 0.02 * this.maxHP * dt, true); if (this.dead) return; }
    }
    if (this.cursed) { this.curseTimer -= dt; if (this.curseTimer <= 0) { this.cursed = false; this.curseFactor = 1; } }
    if (this.blocked) {
      this.blockTimer -= dt;
      if (this.blockTimer <= 0) { this.blocked = false; this.blockedFactor = 1; }
      return; // skip movement while blocked
    }

    const spd = this.speed * this.slowFactor * (this.gorgeSpeedMult || 1);

    if (this.pathIndex >= this.path.length - 1) {
      this.reached = true;
      return;
    }

    const target = this.path[this.pathIndex + 1];
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const move = spd * dt * 60;

    if (move >= dist) {
      this.x = target.x;
      this.y = target.y;
      this.distanceTraveled += dist;
      this.pathIndex++;
    } else {
      this.x += (dx / dist) * move;
      this.y += (dy / dist) * move;
      this.distanceTraveled += move;
    }
  }

  applySlow(factor, duration) {
    // Малькар: иммунитет к замедлению 50% (замедление вдвое слабее)
    if (this.type === 'malkar') {
      factor = 1 - (1 - factor) * 0.5;
    }
    if (factor >= 1) return; // эффекта нет
    if (factor <= this.slowFactor) {
      // Same or stronger slow — update factor and extend timer
      this.slowFactor = factor;
      this.slowTimer  = Math.max(this.slowTimer, duration);
    } else if (this.slowTimer <= 0) {
      // Weaker slow, but current effect has already expired — apply fresh
      this.slowFactor = factor;
      this.slowTimer  = duration;
    }
    // Weaker slow while a stronger one is still active — don't touch the timer
  }

  applyBurn(dps, duration) {
    const mult = ENEMY_DEFS[this.type]?.fireDmgMult || 1;
    this.burnDps   = Math.max(this.burnDps, dps * mult);
    this.burnTimer = Math.max(this.burnTimer, duration);
  }

  applyPoison(dps, duration) {
    this.poisonDps   = Math.max(this.poisonDps, dps);
    this.poisonTimer = Math.max(this.poisonTimer, duration);
  }

  takeDamage(dmg, armorPierce = false) {
    const armorBlock = armorPierce ? 0 : dmg * this.armor;
    dmg -= armorBlock;
    if (this.eliteShieldTimer > 0) dmg *= 0.5;
    if (this.cursed)                dmg *= this.curseFactor;
    if (this.blocked && this.blockedFactor > 1) dmg *= this.blockedFactor;
    this.lastArmorBlock = armorBlock;
    this.hp -= dmg;
    if (this.hp <= 0) {
      // Анубис: воскрешение один раз с 30% HP
      if (ENEMY_DEFS[this.type]?.revive && !this._revived) {
        this._revived = true;
        this.hp = Math.round(this.maxHP * 0.3);
        return;
      }
      this.hp = 0;
      this.dead = true;
    }
  }

  applyBlock(duration, damageFactor = 1) {
    this.blocked      = true;
    this.blockTimer   = Math.max(this.blockTimer, duration);
    this.blockedFactor= Math.max(this.blockedFactor, damageFactor);
  }

  applyCurse(factor, duration) {
    this.cursed      = true;
    this.curseFactor = Math.max(this.curseFactor, factor);
    this.curseTimer  = Math.max(this.curseTimer, duration);
  }

  applyScorpionStack(maxStacks, resetDuration) {
    this.scorpionStacks     = Math.min((this.scorpionStacks || 0) + 1, maxStacks);
    this.scorpionStackTimer = resetDuration;
  }

  draw(ctx) {
    drawEnemy(ctx, this);
  }
}

// ─── Wave builder ─────────────────────────────────────────────────────────────
const ELITE_BUFFS = ['shield', 'speedBoost', 'invis'];

function buildWave(wave, enemyMult = 1, mapId = 'ironhold') {
  const queue = [];
  let t = 0;
  const INTERVAL   = 30;
  const totalCount = Math.min(Math.round((6 + wave * 3) * enemyMult), 45);
  const dualSpawn  = wave >= 15;

  // Волна 60: финальный босс вместо обычного
  if (wave === 60) {
    const FINAL_BOSS_MAP = { ironhold: 'vortex', gorge: 'ksara', maze: 'malkar' };
    const bossType = FINAL_BOSS_MAP[mapId] || 'overlord';
    queue.push({ type: bossType, time: t });
    t += INTERVAL * 4;
  } else if (wave % 10 === 0) {
    queue.push({ type: 'overlord', time: t });
    t += INTERVAL * 4;
  }

  // Карта 2 (горж): только свои уникальные враги, карта 1 не появляется
  const isGorge = mapId === 'gorge';
  const ground = Object.keys(ENEMY_DEFS).filter(k => {
    const d = ENEMY_DEFS[k];
    if (k === 'overlord' || d.air || d.isFinalBoss || d.noWaveSpawn) return false;
    if (d.startWave > wave) return false;
    if (isGorge) return d.mapOnly === 'gorge';
    return !d.mapOnly || d.mapOnly === mapId;
  });
  const air = Object.keys(ENEMY_DEFS).filter(k => {
    const d = ENEMY_DEFS[k];
    if (!d.air || d.isFinalBoss || d.noWaveSpawn) return false;
    if (d.startWave > wave) return false;
    if (isGorge) return d.mapOnly === 'gorge';
    return true;
  });
  const available = air.length > 0 ? [...ground, ...air] : ground;

  for (let i = 0; i < totalCount; i++) {
    const type1 = available[i % available.length];
    const def1  = ENEMY_DEFS[type1];
    // Скарабей: появляется группой по 5
    const groupSize = def1?.spawnGroup || 1;
    for (let g = 0; g < groupSize; g++) {
      queue.push({ type: type1, time: t + g * 4 });
    }

    if (dualSpawn && available.length >= 2) {
      const offset = Math.floor(available.length / 2);
      const type2  = available[(i + offset) % available.length];
      const def2   = ENEMY_DEFS[type2];
      const g2     = def2?.spawnGroup || 1;
      for (let g = 0; g < g2; g++) {
        queue.push({ type: type2, time: t + 3 + g * 4 });
      }
    }

    t += INTERVAL;
  }

  queue.sort((a, b) => a.time - b.time);

  // Элитные враги — каждые 3 волны
  if (wave % 3 === 0) {
    const eliteCount = Math.max(1, Math.floor(totalCount / 6));
    const candidates = queue.filter(e => e.type !== 'overlord');
    // Случайный выбор без повторений
    const chosen = [];
    const pool = [...candidates];
    for (let i = 0; i < eliteCount && pool.length; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      chosen.push(pool.splice(idx, 1)[0]);
    }
    const buffType = ELITE_BUFFS[Math.floor(Math.random() * ELITE_BUFFS.length)];
    chosen.forEach(e => { e.elite = { type: buffType }; });
  }

  return queue;
}

// ─── Base tower definitions (no upgrades array — paths are in TOWER_PATHS) ────
const TOWER_DEFS = {
  basic: {
    name: 'Базовая', cost: 50,
    color: '#3498db', accentColor: '#2980b9',
    damage: 20, range: 120, fireRate: 40,
    bulletColor: '#3498db', bulletSize: 4, bulletSpeed: 12,
    description: 'Универсальная башня',
    legendary: { name: 'Крепостная пушка', cost: 400, desc: 'Урон ×3 · Каждый 5-й выстрел пробивает насквозь' },
  },
  sniper: {
    name: 'Снайпер', cost: 100,
    color: '#27ae60', accentColor: '#1e8449',
    damage: 42, range: 240, fireRate: 105,
    bulletColor: '#2ecc71', bulletSize: 3, bulletSpeed: 18,
    description: 'Высокий урон, большой радиус',
    legendary: { name: 'Аннигилятор', cost: 600, desc: 'Выстрелы создают зоны излучения — 5% maxHP/сек, 3 сек · макс. 3 зоны' },
  },
  explosion: {
    name: 'Взрыв', cost: 125,
    color: '#e67e22', accentColor: '#d35400',
    damage: 18, range: 110, fireRate: 75,
    bulletColor: '#e67e22', bulletSize: 6, bulletSpeed: 4,
    splashRadius: 60,
    description: 'Урон по области',
    legendary: { name: 'Метеорит', cost: 550, desc: 'Раз в 15 сек метеорит бьёт в случайную точку пути (радиус 3 клетки)' },
  },
  antiair: {
    name: 'Зенитка', cost: 150,
    color: '#7f8c8d', accentColor: '#566573',
    damage: 20, range: 144, fireRate: 40,
    bulletColor: '#bdc3c7', bulletSize: 3, bulletSpeed: 13,
    description: 'Атакует только воздушных врагов',
    legendary: { name: 'Орбитальный удар', cost: 500, desc: 'Раз в 20 сек мгновенно уничтожает сильнейшего воздушного врага' },
    linearUpgrades: [
      { name: 'Урон +40%',             desc: '+8 урон',       cost: 160, damageMult: 1.4 },
      { name: 'Радиус +25%',           desc: '+36 радиус',    cost: 200, rangeMult:  1.25 },
      { name: 'Скорострельность +25%', desc: 'Скорость ×1.25',cost: 240, fireRateMult: 1/1.25 },
    ],
  },
  mine: {
    name: 'Шахта', cost: 200,
    color: '#7d5a2c', accentColor: '#5a3e1b',
    damage: 0, range: 0, fireRate: 9999,
    bulletColor: '#f39c12', bulletSize: 0, bulletSpeed: 0,
    description: 'Пассивный доход +15g за волну',
    isMine: true,
    mineIncome: 25,
    linearUpgrades: [
      { name: 'Улучшенная шахта', desc: '+20g за каждую волну', cost: 150, mineIncome: 20 },
      { name: 'Золотая шахта',    desc: '+30g за каждую волну', cost: 300, mineIncome: 30 },
    ],
  },
  slow: {
    name: 'Замедление', cost: 80,
    color: '#00bcd4', accentColor: '#0097a7',
    damage: 6, range: 130, fireRate: 50,
    bulletColor: '#00bcd4', bulletSize: 5, bulletSpeed: 5,
    slowFactor: 0.4, slowDuration: 90,
    description: 'Замедляет врагов',
    legendary: { name: 'Проклятие', cost: 450, desc: 'Яд распространяется на врагов в радиусе 1 клетки' },
  },
  lightning: {
    name: 'Молния', cost: 200,
    color: '#f1c40f', accentColor: '#f39c12',
    damage: 22, range: 144, fireRate: 55,
    bulletColor: '#f1c40f', bulletSize: 4, bulletSpeed: 10,
    description: 'Цепная молния: поражает 3 врага',
    chainTargets: 3,
    unlockWave: 12,
    linearUpgrades: [
      { name: 'Мощный разряд', desc: 'Урон +50%',       cost: 220, damageMult: 1.5 },
      { name: 'Длинная цепь',  desc: '+2 цели в цепи',  cost: 280, chainTargets: 2 },
      { name: 'Широкий охват', desc: 'Радиус +40%',     cost: 340, rangeMult: 1.4 },
    ],
    legendary: { name: 'Шаровая молния', cost: 480, desc: 'Раз в 20 сек шар молнии летит по пути, поражая всех врагов' },
  },
  time: {
    name: 'Время', cost: 250,
    color: '#9b59b6', accentColor: '#8e44ad',
    damage: 0, range: 144, fireRate: 9999,
    bulletColor: '#9b59b6', bulletSize: 0, bulletSpeed: 0,
    description: 'Аура: замедляет всех врагов в радиусе на 40%',
    auraSlowFactor: 0.6,
    isAura: true,
    unlockWave: 20,
    linearUpgrades: [
      { name: 'Расширение',  desc: 'Радиус +30%',                    cost: 250, rangeMult: 1.3 },
      { name: 'Углубление',  desc: 'Замедление 55%',                 cost: 310, auraSlowFactor: 0.45 },
      { name: 'Время стоит', desc: 'Замедление 70% · Радиус +20%',   cost: 380, auraSlowFactor: 0.30, rangeMult: 1.2 },
    ],
    legendary: { name: 'Остановка времени', cost: 500, desc: 'Раз в 30 сек замораживает всех врагов на 3 секунды' },
  },
};

// ─── Upgrade paths (A / B) ────────────────────────────────────────────────────
const TOWER_PATHS = {
  basic: {
    A: {
      name: 'Пулемёт', letter: 'А',
      desc: 'Скорость ×4 · Урон −10%',
      color: '#5dade2', accentColor: '#2e86c1', bulletColor: '#aed6f1',
      cost: 100,
      apply: { fireRateMult: 0.25, damageMult: 0.9 },
      upgrades: [
        { name: 'Автомат II',      desc: 'Ещё ×1.5 скорость',       cost: 140, fireRateMult: 1/1.5 },
        { name: 'Разрывные пули',  desc: 'Урон +8 · Скорость ×1.2',  cost: 220, damage: 8, fireRateMult: 1/1.2 },
      ],
    },
    B: {
      name: 'Снайпер', letter: 'Б',
      desc: 'Урон +100% · Радиус +40%',
      color: '#1a3a6e', accentColor: '#0d2137', bulletColor: '#2c7fbf',
      cost: 150,
      apply: { damageMult: 2.0, rangeMult: 1.4 },
      upgrades: [
        { name: 'Бронебойные',    desc: 'Урон +15',               cost: 180, damage: 15 },
        { name: 'Сверхдальний',   desc: 'Радиус +32 · Урон +10',  cost: 280, damage: 10, range: 32 },
      ],
    },
  },
  sniper: {
    A: {
      name: 'Рельсотрон', letter: 'А',
      desc: 'Урон +100% · Пробивает всех насквозь',
      color: '#8e44ad', accentColor: '#6c3483', bulletColor: '#d7bde2',
      cost: 200,
      apply: { damageMult: 2.0, pierce: true },
      upgrades: [
        { name: 'Перегрузка',      desc: 'Урон +35',              cost: 260, damage: 35 },
        { name: 'Сверхпроводник',  desc: 'Урон ×1.3',             cost: 400, damageMult: 1.3 },
      ],
    },
    B: {
      name: 'Дальнобойный', letter: 'Б',
      desc: 'Радиус +50% · Урон +30%',
      color: '#5b2c6f', accentColor: '#4a235a', bulletColor: '#a569bd',
      cost: 180,
      apply: { rangeMult: 1.5, damageMult: 1.3 },
      upgrades: [
        { name: 'Оптика',            desc: 'Радиус +56',          cost: 220, range: 56 },
        { name: 'Последний выстрел', desc: 'Урон ×1.4',           cost: 340, damageMult: 1.4 },
      ],
    },
  },
  explosion: {
    A: {
      name: 'Напалм', letter: 'А',
      desc: 'Область +40% · Поджигает на 3 сек',
      color: '#e67e22', accentColor: '#d35400', bulletColor: '#f39c12',
      cost: 220,
      apply: { splashMult: 1.4, burn: true, burnDps: 6, burnDuration: 3 },
      upgrades: [
        { name: 'Огнемёт',        desc: 'Урон +14',               cost: 280, damage: 14 },
        { name: 'Адский огонь',   desc: 'Ожог 5 сек · Урон +20',  cost: 420, damage: 20, burnDuration: 5 },
      ],
    },
    B: {
      name: 'Ядерный', letter: 'Б',
      desc: 'Урон +150% · Перезарядка 10 сек · Область ×2',
      color: '#c0392b', accentColor: '#922b21', bulletColor: '#e74c3c',
      cost: 300,
      apply: { damageMult: 2.5, fireRateFixed: 420, splashMult: 2.0, nuclear: true },
      upgrades: [
        { name: 'Термоядерный',   desc: 'Урон ×1.3',              cost: 460, damageMult: 1.3 },
        { name: 'Апокалипсис',    desc: 'Урон ×1.4 · Область ×1.3',cost: 680, damageMult: 1.4, splashMult: 1.3 },
      ],
    },
  },
  slow: {
    A: {
      name: 'Заморозка', letter: 'А',
      desc: 'Замедление 90% · Урон +30%',
      color: '#85c1e9', accentColor: '#2e86c1', bulletColor: '#aed6f1',
      cost: 160,
      apply: { slowFactor: 0.10, damageMult: 1.3 },
      upgrades: [
        { name: 'Абсолютный ноль', desc: 'Замедление 95%',        cost: 220, slowFactor: 0.05 },
        { name: 'Ледяная буря',    desc: 'Урон +7 · Радиус +14',  cost: 300, damage: 7, range: 14 },
      ],
    },
    B: {
      name: 'Отравление', letter: 'Б',
      desc: 'Яд 3% maxHP/сек · Замедление 30%',
      color: '#27ae60', accentColor: '#1e8449', bulletColor: '#82e0aa',
      cost: 140,
      apply: { slowFactor: 0.7, poison: true, poisonPct: 0.03, poisonDuration: 5 },
      upgrades: [
        { name: 'Нейротоксин',    desc: 'Яд +2% maxHP/сек',       cost: 190, poisonPct: 0.02 },
        { name: 'Биооружие',      desc: 'Яд 8 сек · Урон +8',     cost: 320, poisonDuration: 8, damage: 8 },
      ],
    },
  },
};

// ─── Combo system ────────────────────────────────────────────────────────────
function _giveCombo(tower, partner, label, bonuses) {
  if (!tower.activeComboTypes.includes(label)) tower.activeComboTypes.push(label);
  if (!tower.comboPartners.includes(partner))  tower.comboPartners.push(partner);
  if (bonuses.damage    !== undefined) tower.comboMult.damage    *= bonuses.damage;
  if (bonuses.range     !== undefined) tower.comboMult.range     *= bonuses.range;
  if (bonuses.fireRate  !== undefined) tower.comboMult.fireRate  *= bonuses.fireRate;
  if (bonuses.armorPierce)             tower.comboMult.armorPierce = true;
  if (bonuses.chainBonus)              tower.comboMult.chainBonus += bonuses.chainBonus;
}

function _applyPairCombo(a, b) {
  const ta = a.type, tb = b.type;
  // Снайпер + Взрыв: оба +25% урон
  if ((ta==='sniper'&&tb==='explosion')||(ta==='explosion'&&tb==='sniper')) {
    _giveCombo(a, b, 'Снайпер+Взрыв: +25% урон', { damage: 1.25 });
    _giveCombo(b, a, 'Снайпер+Взрыв: +25% урон', { damage: 1.25 });
  }
  // Замедление + Базовая: базовая +40% скорострельность
  if ((ta==='basic'&&tb==='slow')||(ta==='slow'&&tb==='basic')) {
    const basic = ta==='basic' ? a : b;
    const slow  = ta==='slow'  ? a : b;
    _giveCombo(basic, slow, 'Замед+База: +40% скорость', { fireRate: 1 / 1.4 });
  }
  // Башня Времени + любая: та +20% урон
  if (ta==='time' && tb!=='time') _giveCombo(b, a, 'Башня Времени: +20% урон', { damage: 1.2 });
  if (tb==='time' && ta!=='time') _giveCombo(a, b, 'Башня Времени: +20% урон', { damage: 1.2 });
  // Две Базовых: обе +15% урон и радиус
  if (ta==='basic' && tb==='basic') {
    _giveCombo(a, b, 'Две Базовых: +15% урон/радиус', { damage: 1.15, range: 1.15 });
    _giveCombo(b, a, 'Две Базовых: +15% урон/радиус', { damage: 1.15, range: 1.15 });
  }
  // Снайпер + Башня Времени: снайпер игнорирует броню
  if ((ta==='sniper'&&tb==='time')||(ta==='time'&&tb==='sniper')) {
    const sniper = ta==='sniper' ? a : b;
    const time   = ta==='time'   ? a : b;
    _giveCombo(sniper, time, 'Снайпер+Время: игнорирует броню', { armorPierce: true });
  }
  // Молния + Зенитка: зенитка +1 цепной удар
  if ((ta==='lightning'&&tb==='antiair')||(ta==='antiair'&&tb==='lightning')) {
    const antiair   = ta==='antiair'   ? a : b;
    const lightning = ta==='lightning' ? a : b;
    _giveCombo(antiair, lightning, 'Молния+Зенитка: цепной удар', { chainBonus: 1 });
  }
}

function recalculateCombos(towers) {
  towers.forEach(t => {
    t.comboMult        = { damage: 1, range: 1, fireRate: 1, armorPierce: false, chainBonus: 0 };
    t.activeComboTypes = [];
    t.comboPartners    = [];
  });
  for (let i = 0; i < towers.length; i++) {
    for (let j = i + 1; j < towers.length; j++) {
      const a = towers[i], b = towers[j];
      const dx = a.gridX - b.gridX, dy = a.gridY - b.gridY;
      if (Math.sqrt(dx*dx + dy*dy) <= 2) _applyPairCombo(a, b);
    }
  }
}

// ─── Apply an effect object to a tower ───────────────────────────────────────
function applyEffect(tower, effect) {
  if (effect.damageMult    !== undefined) tower.damage       = Math.max(1, Math.floor(tower.damage * effect.damageMult));
  if (effect.damage        !== undefined) tower.damage      += effect.damage;
  if (effect.rangeMult     !== undefined) tower.range        = Math.floor(tower.range * effect.rangeMult);
  if (effect.range         !== undefined) tower.range       += effect.range;
  if (effect.fireRateMult  !== undefined) tower.fireRate     = Math.max(5, Math.floor(tower.fireRate * effect.fireRateMult));
  if (effect.fireRateFixed !== undefined) tower.fireRate     = effect.fireRateFixed;
  if (effect.splashMult    !== undefined) tower.splashRadius = Math.floor((tower.splashRadius || 60) * effect.splashMult);
  if (effect.pierce        !== undefined) tower.pierce       = effect.pierce;
  if (effect.burn          !== undefined) tower.burn         = effect.burn;
  if (effect.burnDps       !== undefined) tower.burnDps      = effect.burnDps;
  if (effect.burnDuration  !== undefined) tower.burnDuration = effect.burnDuration;
  if (effect.nuclear       !== undefined) tower.nuclear      = effect.nuclear;
  if (effect.poison        !== undefined) tower.poison       = effect.poison;
  if (effect.poisonDps     !== undefined) tower.poisonDps    = (tower.poisonDps || 0) + effect.poisonDps;
  if (effect.poisonPct     !== undefined) tower.poisonPct    = (tower.poisonPct || 0) + effect.poisonPct;
  if (effect.poisonDuration!== undefined) tower.poisonDuration = effect.poisonDuration;
  if (effect.slowFactor    !== undefined) tower.slowFactor   = effect.slowFactor;
  if (effect.mineIncome    !== undefined) tower.mineIncome  += effect.mineIncome;
  if (effect.chainTargets  !== undefined) tower.chainTargets = (tower.chainTargets || 0) + effect.chainTargets;
  if (effect.auraSlowFactor!== undefined) tower.auraSlowFactor = effect.auraSlowFactor;
}

// ─── Pierce bullet (travels straight, hits all enemies in path) ───────────────
class PierceBullet {
  constructor(x, y, angle, def) {
    this.x = x; this.y = y;
    this.vx = Math.cos(angle) * 14;
    this.vy = Math.sin(angle) * 14;
    this.damage      = def.damage;
    this.color       = def.bulletColor;
    this.armorPierce = def.armorPierce || false;
    this.size   = 5;
    this.dead   = false;
    this.hit    = new Set();
    this.life   = 0;
    this.px = x; this.py = y;
    this.annihilator = def.annihilator || false;
    this._zonePos    = null;
  }

  update(enemies) {
    this.px = this.x; this.py = this.y;
    this.x += this.vx; this.y += this.vy;
    this.life++;
    if (this.life > 65) { this.dead = true; return []; }

    const hits = [];
    enemies.forEach(e => {
      if (e.dead || e.reached || this.hit.has(e)) return;
      const dx = e.x - this.x, dy = e.y - this.y;
      if (Math.sqrt(dx*dx + dy*dy) < e.size + this.size) {
        e.takeDamage(this.damage, this.armorPierce);
        this.hit.add(e);
        hits.push(e);
        if (this.annihilator && !this._zonePos) this._zonePos = { x: e.x, y: e.y };
      }
    });
    return hits;
  }

  draw(ctx) {
    ctx.save();
    ctx.shadowColor = '#9b59b6'; ctx.shadowBlur = 16;
    // Trail
    ctx.strokeStyle = 'rgba(155,89,182,0.55)'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(this.px - this.vx, this.py - this.vy); ctx.lineTo(this.x, this.y); ctx.stroke();
    // Head
    ctx.fillStyle = '#d7bde2';
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  }
}

// ─── Chain-lightning bullet ───────────────────────────────────────────────────
class ChainBullet {
  constructor(x, y, primary, def, chainTargets, allEnemies) {
    this.dead = false;
    this.chains = [];
    this._pendingHits = [];

    const alive = allEnemies.filter(e => !e.dead && !e.reached);
    const hit = new Set();
    let dmg = def.damage;
    let prevX = x, prevY = y;
    let cur = primary;

    for (let i = 0; i < chainTargets; i++) {
      if (!cur) break;
      this.chains.push({ x1: prevX, y1: prevY, x2: cur.x, y2: cur.y });
      cur.takeDamage(dmg);
      this._pendingHits.push(cur);
      hit.add(cur);
      prevX = cur.x; prevY = cur.y;
      dmg = Math.round(dmg * 0.7);
      // Find nearest unhit enemy within 144px
      let next = null, nextDist = 144;
      alive.forEach(e => {
        if (hit.has(e)) return;
        const dx = e.x - prevX, dy = e.y - prevY;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < nextDist) { nextDist = d; next = e; }
      });
      cur = next;
    }
    this.life = 10;
  }

  update() {
    this.life--;
    if (this.life <= 0) this.dead = true;
    const hits = this._pendingHits;
    this._pendingHits = [];
    return hits;
  }

  draw(ctx) {
    const t = this.life / 10;
    ctx.save();
    ctx.globalAlpha = t;
    ctx.strokeStyle = '#f1c40f';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#f1c40f';
    ctx.shadowBlur = 12;
    this.chains.forEach(arc => {
      ctx.beginPath();
      ctx.moveTo(arc.x1, arc.y1);
      // Slight jagged midpoint for lightning look
      const mx = (arc.x1 + arc.x2) / 2 + (Math.random() - 0.5) * 14;
      const my = (arc.y1 + arc.y2) / 2 + (Math.random() - 0.5) * 14;
      ctx.quadraticCurveTo(mx, my, arc.x2, arc.y2);
      ctx.stroke();
    });
    ctx.restore();
  }
}

// ─── Radiation zone (Аннигилятор легендарное) ────────────────────────────────
class RadiationZone {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.radius   = 36;       // 1 клетка
    this.dps      = 0.05; // 5% от maxHP/сек
    this.life     = 3;
    this.maxLife  = 3;
    this.dead     = false;
  }

  update(dt, enemies) {
    this.life -= dt;
    if (this.life <= 0) { this.dead = true; return []; }
    const hits = [];
    enemies.forEach(e => {
      if (e.dead || e.reached) return;
      const dx = e.x - this.x, dy = e.y - this.y;
      if (Math.sqrt(dx * dx + dy * dy) <= this.radius + e.size * 0.5) {
        e.takeDamage(e.maxHP * this.dps * dt);
        hits.push(e);
      }
    });
    return hits;
  }

  draw(ctx) {
    const a     = this.life / this.maxLife;
    const pulse = 1 + Math.sin(Date.now() * 0.008) * 0.05;
    ctx.save();
    ctx.globalAlpha = a * 0.82;
    ctx.shadowColor = '#9b59b6'; ctx.shadowBlur = 20;
    ctx.strokeStyle = '#d7bde2'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(155,89,182,0.14)'; ctx.fill();
    ctx.globalAlpha = a * 0.4;
    ctx.shadowBlur = 8;
    ctx.fillStyle = 'rgba(215,189,226,0.35)';
    ctx.beginPath(); ctx.arc(this.x, this.y, this.radius * 0.45 * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
}

// ─── Standard bullet ─────────────────────────────────────────────────────────
class Bullet {
  constructor(x, y, target, def, towerType, splashRadius) {
    this.x = x; this.y = y;
    this.target = target;
    this.damage = def.damage;
    this.speed  = def.bulletSpeed;
    this.color  = def.bulletColor;
    this.size   = def.bulletSize;
    this.towerType   = towerType;
    this.splashRadius = splashRadius || 0;
    this.slowFactor   = def.slowFactor   || 1;
    this.slowDuration = def.slowDuration || 0;
    this.burn         = def.burn    || false;
    this.burnDps      = def.burnDps || 8;
    this.burnDuration = def.burnDuration || 3;
    this.poison         = def.poison         || false;
    this.poisonDps      = def.poisonDps      || 0;
    this.poisonPct      = def.poisonPct      || 0;
    this.poisonDuration = def.poisonDuration || 5;
    this.poisonSpread   = def.poisonSpread   || false;
    this.nuclear     = def.nuclear     || false;
    this.armorPierce = def.armorPierce || false;
    this.dead     = false;
    this.hitX = 0; this.hitY = 0;
    this.annihilator = def.annihilator || false;
    this._zonePos    = null;
    this.exploding   = false;
    this.explodeTimer = 0;
  }

  _onHit(e) {
    if (this.slowFactor < 1) {
      // Башня Замедления: максимум 60% замедления (slowFactor не ниже 0.4)
      const sf = this.towerType === 'slow' ? Math.max(this.slowFactor, 0.4) : this.slowFactor;
      e.applySlow(sf, this.slowDuration);
    }
    if (this.burn)             e.applyBurn(this.burnDps, this.burnDuration);
    if (this.poison) {
      const dps = this.poisonPct > 0 ? e.maxHP * this.poisonPct : this.poisonDps;
      e.applyPoison(dps, this.poisonDuration);
    }
  }

  update(enemies) {
    if (this.exploding) {
      this.explodeTimer++;
      if (this.explodeTimer > 14) this.dead = true;
      return [];
    }
    if (!this.target || this.target.dead || this.target.reached) { this.dead = true; return []; }

    const dx = this.target.x - this.x, dy = this.target.y - this.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < this.speed + 4) {
      const hits = [];
      if (this.splashRadius > 0) {
        this.hitX = this.target.x; this.hitY = this.target.y;
        this.exploding = true;
        enemies.forEach(e => {
          if (e.dead || e.reached) return;
          const ex = e.x - this.hitX, ey = e.y - this.hitY;
          if (Math.sqrt(ex*ex + ey*ey) <= this.splashRadius) {
            e.takeDamage(this.damage, this.armorPierce);
            this._onHit(e);
            hits.push(e);
          }
        });
      } else {
        this.target.takeDamage(this.damage, this.armorPierce);
        this._onHit(this.target);
        hits.push(this.target);
        if (this.annihilator) this._zonePos = { x: this.target.x, y: this.target.y };
        this.dead = true;
      }
      return hits;
    }
    this.x += (dx / dist) * this.speed;
    this.y += (dy / dist) * this.speed;
    return [];
  }

  draw(ctx) {
    if (this.exploding) {
      const r  = this.splashRadius * (this.explodeTimer / 14);
      const op = 1 - this.explodeTimer / 14;
      ctx.save();
      ctx.globalAlpha = op;
      ctx.strokeStyle = this.nuclear ? '#e74c3c' : '#f39c12';
      ctx.lineWidth = this.nuclear ? 5 : 3;
      ctx.beginPath(); ctx.arc(this.hitX, this.hitY, r, 0, Math.PI*2); ctx.stroke();
      ctx.fillStyle = this.nuclear ? `rgba(231,76,60,0.18)` : `rgba(243,156,18,0.18)`;
      ctx.fill();
      if (this.nuclear) {
        ctx.fillStyle = `rgba(241,196,15,${0.5*op})`;
        ctx.beginPath(); ctx.arc(this.hitX, this.hitY, r * 0.35, 0, Math.PI*2); ctx.fill();
      }
      ctx.restore();
      return;
    }

    ctx.save();
    if (this.nuclear) {
      // Large glowing nuclear ball
      ctx.shadowColor = '#e74c3c'; ctx.shadowBlur = 22;
      const pulse = 1 + Math.sin(Date.now() * 0.012) * 0.25;
      ctx.fillStyle = '#f39c12';
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size * pulse * 2, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size * pulse * 1.3, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI*2); ctx.fill();
    } else {
      if (this.towerType === 'slow' || this.towerType === 'sniper') {
        ctx.shadowColor = this.color; ctx.shadowBlur = 8;
      }
      ctx.fillStyle = this.color;
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
      if (this.towerType === 'sniper') {
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI*2); ctx.fill();
      }
    }
    ctx.restore();
  }
}

// ─── Tower class ─────────────────────────────────────────────────────────────
class Tower {
  constructor(type, gridX, gridY, cellSize, game = null) {
    const def = TOWER_DEFS[type];
    this.type = type;
    this.name = def.name;
    this.gridX = gridX; this.gridY = gridY;
    this.x = gridX * cellSize + cellSize / 2;
    this.y = gridY * cellSize + cellSize / 2;
    this.cellSize = cellSize;

    // Stats
    this.damage      = def.damage;
    this.range       = def.range;
    this.fireRate    = def.fireRate;
    this.bulletColor = def.bulletColor;
    this.bulletSize  = def.bulletSize;
    this.bulletSpeed = def.bulletSpeed;
    this.color       = def.color;
    this.accentColor = def.accentColor;
    this.splashRadius  = def.splashRadius  || 0;
    this.slowFactor    = def.slowFactor    || 1;
    this.slowDuration  = def.slowDuration  || 0;

    // Path system
    this.chosenPath  = null;   // null | 'A' | 'B'
    this.upgradeLevel = 0;     // 0=none, 1=path chosen, 2=up1, 3=up2 (max)

    // Special flags
    this.pierce      = false;
    this.burn        = false;
    this.burnDps     = 0;
    this.burnDuration = 3;
    this.nuclear     = false;
    this.poison         = false;
    this.poisonDps      = 0;
    this.poisonPct      = 0;
    this.poisonDuration = 5;
    this.poisonSpread   = false;
    // Legendary upgrade
    this.legendary      = false;
    this.legendaryTimer = 0;
    this.shotCount      = 0;
    this.annihilator    = false;

    // Combo system
    this.comboMult        = { damage: 1, range: 1, fireRate: 1, armorPierce: false, chainBonus: 0 };
    this.activeComboTypes = [];
    this.comboPartners    = [];

    // Lightning / time tower fields
    this.chainTargets    = def.chainTargets   || 0;
    this.auraSlowFactor  = def.auraSlowFactor || 1;
    this.isAura          = def.isAura         || false;
    this.unlockWave      = def.unlockWave     || 0;

    // Mine / anti-air / linear-upgrade flags
    this.isMine      = def.isMine      || false;
    this.mineIncome  = def.mineIncome  || 0;
    this.antiairOnly = (type === 'antiair');
    this.isLinear    = !!(def.linearUpgrades);

    // Meta
    this.totalSpent  = def.cost;
    this.cooldown    = 0;
    this.selected    = false;
    this.angle       = 0;
    this.game        = game;
  }

  // Choose upgrade path (A or B). Returns false if already chosen.
  choosePath(key) {
    if (this.chosenPath !== null) return false;
    const path = TOWER_PATHS[this.type][key];
    this.chosenPath    = key;
    this.color         = path.color;
    this.accentColor   = path.accentColor;
    this.bulletColor   = path.bulletColor;
    applyEffect(this, path.apply);
    this.totalSpent   += path.cost;
    this.upgradeLevel  = 1;
    return true;
  }

  // Next upgrade (linear or path-based).
  upgrade() {
    if (this.isLinear) {
      const ups = TOWER_DEFS[this.type].linearUpgrades;
      if (this.upgradeLevel >= ups.length) return false;
      applyEffect(this, ups[this.upgradeLevel]);
      this.totalSpent += ups[this.upgradeLevel].cost;
      this.upgradeLevel++;
      return true;
    }
    if (!this.chosenPath) return false;
    const ups = TOWER_PATHS[this.type][this.chosenPath].upgrades;
    const idx = this.upgradeLevel - 1;
    if (idx >= ups.length) return false;
    applyEffect(this, ups[idx]);
    this.totalSpent  += ups[idx].cost;
    this.upgradeLevel++;
    return true;
  }

  getNextUpgrade() {
    if (this.isLinear) {
      const ups = TOWER_DEFS[this.type].linearUpgrades;
      return this.upgradeLevel < ups.length ? ups[this.upgradeLevel] : null;
    }
    if (!this.chosenPath) return null;
    const ups = TOWER_PATHS[this.type][this.chosenPath].upgrades;
    const idx = this.upgradeLevel - 1;
    return idx < ups.length ? ups[idx] : null;
  }

  isMaxed() {
    if (this.isLinear) {
      return this.upgradeLevel >= TOWER_DEFS[this.type].linearUpgrades.length;
    }
    if (!this.chosenPath) return false;
    return this.upgradeLevel - 1 >= TOWER_PATHS[this.type][this.chosenPath].upgrades.length;
  }

  getSellValue() { return Math.floor(this.totalSpent * 0.4); }

  buyLegendary() {
    const leg = TOWER_DEFS[this.type]?.legendary;
    if (!leg || this.legendary || !this.isMaxed()) return false;
    this.legendary    = true;
    this.totalSpent  += leg.cost;
    if (this.type === 'basic')     this.damage = Math.round(this.damage * 3);
    if (this.type === 'sniper')    this.annihilator = true;
    if (this.type === 'slow')      this.poisonSpread = true;
    if (this.type === 'explosion') this.legendaryTimer = 15;
    if (this.type === 'antiair')   this.legendaryTimer = 20;
    if (this.type === 'lightning') this.legendaryTimer = 20;
    if (this.type === 'time')      this.legendaryTimer = 30;
    return true;
  }

  // Returns { type, x, y, hits, radius? } or null. Call once per frame from game.js.
  updateLegendary(dt, enemies, pathPoints, globalTimeFreezeCD = 0) {
    if (!this.legendary) return null;

    if (this.type === 'explosion') {
      this.legendaryTimer -= dt;
      if (this.legendaryTimer <= 0) {
        this.legendaryTimer = 15;
        const pt  = pathPoints[Math.floor(Math.random() * pathPoints.length)];
        const rad = 3 * 36;          // 3 cells = 108 px
        const hits = [];
        enemies.forEach(e => {
          if (e.dead || e.reached) return;
          const dx = e.x - pt.x, dy = e.y - pt.y;
          if (Math.sqrt(dx*dx + dy*dy) <= rad) { e.takeDamage(this.damage * 8); hits.push(e); }
        });
        return { type: 'meteor', x: pt.x, y: pt.y, radius: rad, hits };
      }
    }

    if (this.type === 'antiair') {
      this.legendaryTimer -= dt;
      if (this.legendaryTimer <= 0) {
        this.legendaryTimer = 20;
        const air = enemies.filter(e => e.air && !e.dead && !e.reached);
        if (air.length > 0) {
          const target = air.reduce((best, e) => e.hp > best.hp ? e : best);
          target.hp   = 0;
          target.dead = true;
          return { type: 'orbital', x: target.x, y: target.y, hits: [target] };
        }
      }
    }

    if (this.type === 'lightning') {
      this.legendaryTimer -= dt;
      if (this.legendaryTimer <= 0) {
        this.legendaryTimer = 20;
        return { type: 'lightball', x: this.x, y: this.y, hits: [] };
      }
    }

    if (this.type === 'time') {
      // legendaryTimer синхронизируется с глобальным кулдауном из game.js
      this.legendaryTimer = globalTimeFreezeCD;
      if (globalTimeFreezeCD <= 0) {
        const frozen = [];
        enemies.forEach(e => { if (!e.dead && !e.reached) { e.applySlow(0, 3); frozen.push(e); } });
        return { type: 'timefreeze', x: this.x, y: this.y, hits: frozen };
      }
    }

    return null;
  }

  getDef() {
    const cm       = this.comboMult;
    const mapDmgMult = (this.game ? this.game.mapDamageMult : 1);
    return {
      damage: Math.round(this.damage * cm.damage * mapDmgMult),
      range: this.range,
      bulletColor: this.bulletColor, bulletSize: this.bulletSize,
      bulletSpeed: this.bulletSpeed, splashRadius: this.splashRadius,
      slowFactor: this.slowFactor, slowDuration: this.slowDuration,
      burn: this.burn, burnDps: this.burnDps, burnDuration: this.burnDuration,
      poison: this.poison, poisonDps: this.poisonDps, poisonPct: this.poisonPct, poisonDuration: this.poisonDuration, poisonSpread: this.poisonSpread,
      nuclear: this.nuclear,
      chainTargets: this.chainTargets + cm.chainBonus,
      armorPierce: cm.armorPierce,
      annihilator: this.annihilator,
    };
  }

  update(enemies) {
    if (this.isMine || this.isAura) return null;
    if (this.cooldown > 0) { this.cooldown--; return null; }

    let best = null, bestProgress = -1;
    enemies.forEach(e => {
      if (e.dead || e.reached) return;
      if (this.antiairOnly && !e.air) return;   // зенитка бьёт только воздушных
      if (!this.antiairOnly && e.air) return;   // наземные башни игнорируют воздушных
      if (e.invis) return;                      // Ксара невидима — башни не атакуют
      const dx = e.x - this.x, dy = e.y - this.y;
      const effRange = Math.floor(this.range * this.comboMult.range);
      const visRange = (e.elite?.type === 'invis') ? Math.min(effRange, 54) : effRange;
      if (Math.sqrt(dx*dx + dy*dy) <= visRange) {
        const ni = Math.min(e.pathIndex + 1, e.path.length - 1);
        const rdx = e.path[ni].x - e.x, rdy = e.path[ni].y - e.y;
        const p = e.pathIndex + (1 - Math.sqrt(rdx*rdx + rdy*rdy) / 36);
        if (p > bestProgress) { bestProgress = p; best = e; }
      }
    });
    if (!best) return null;

    this.angle   = Math.atan2(best.y - this.y, best.x - this.x);
    this.cooldown = Math.max(5, Math.round(this.fireRate * this.comboMult.fireRate));

    const def = this.getDef();
    if (this.pierce) return new PierceBullet(this.x, this.y, this.angle, def);
    if (this.legendary && this.type === 'basic') {
      this.shotCount++;
      if (this.shotCount % 5 === 0) return new PierceBullet(this.x, this.y, this.angle, def);
    }
    if (this.type === 'lightning' || def.chainTargets > 0) {
      return new ChainBullet(this.x, this.y, best, def, def.chainTargets, enemies);
    }
    return new Bullet(this.x, this.y, best, def, this.type, this.splashRadius);
  }

  updateAura(dt, enemies) {
    if (!this.isAura) return;
    const effRange = Math.floor(this.range * this.comboMult.range);
    enemies.forEach(e => {
      if (e.dead || e.reached) return;
      const dx = e.x - this.x, dy = e.y - this.y;
      if (Math.sqrt(dx * dx + dy * dy) <= effRange) {
        e.applySlow(this.auraSlowFactor, 0.12);
      }
    });
  }

  draw(ctx) {
    const effRange = Math.floor(this.range * this.comboMult.range);

    // Aura ring for time tower (always visible)
    if (this.isAura) {
      ctx.save();
      ctx.strokeStyle = 'rgba(155,89,182,0.3)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.arc(this.x, this.y, effRange, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(155,89,182,0.06)';
      ctx.beginPath(); ctx.arc(this.x, this.y, effRange, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    // Range ring + combo lines when selected
    if (this.selected) {
      ctx.beginPath(); ctx.arc(this.x, this.y, effRange, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.45)'; ctx.lineWidth = 1; ctx.stroke();

      // Green lines to combo partners
      if (this.comboPartners.length > 0) {
        ctx.save();
        ctx.strokeStyle = 'rgba(46,204,113,0.7)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 4]);
        ctx.shadowColor = '#2ecc71'; ctx.shadowBlur = 6;
        this.comboPartners.forEach(p => {
          ctx.beginPath(); ctx.moveTo(this.x, this.y); ctx.lineTo(p.x, p.y); ctx.stroke();
        });
        ctx.setLineDash([]);
        ctx.restore();
      }
    }

    drawTower(ctx, this.type, this.x, this.y, this.upgradeLevel, this.angle);

    // Legendary golden ring
    if (this.legendary) {
      ctx.save();
      ctx.shadowColor = '#f1c40f'; ctx.shadowBlur = 18;
      ctx.strokeStyle = '#f1c40f'; ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.arc(this.x, this.y, this.cellSize * 0.64, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f1c40f';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('★', this.x, this.y - this.cellSize * 0.72);
      ctx.restore();
    }

    // Path glow ring
    if (this.chosenPath) {
      const pathColor = TOWER_PATHS[this.type][this.chosenPath].color;
      ctx.save();
      ctx.shadowColor = pathColor; ctx.shadowBlur = 10;
      ctx.strokeStyle = pathColor; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(this.x, this.y, this.cellSize * 0.52, 0, Math.PI*2); ctx.stroke();
      ctx.restore();
    }

    // Selection dashed ring
    if (this.selected) {
      ctx.save();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.arc(this.x, this.y, this.cellSize * 0.58, 0, Math.PI*2); ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }
  }
}

// ─── Pixel-art tower drawing ──────────────────────────────────────────────────
function drawTower(ctx, type, cx, cy, level, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  if (level >= 3) {
    const gc = { basic:'#3498db', sniper:'#2ecc71', explosion:'#e67e22', slow:'#00e5ff', lightning:'#f1c40f', time:'#9b59b6' }[type];
    if (gc) { ctx.shadowColor = gc; ctx.shadowBlur = 14; }
  }
  switch (type) {
    case 'basic':     _drawBasic(ctx, level, angle);     break;
    case 'sniper':    _drawSniper(ctx, level, angle);    break;
    case 'explosion': _drawExplosion(ctx, level, angle); break;
    case 'slow':      _drawSlow(ctx, level, angle);      break;
    case 'antiair':   _drawAntiAir(ctx, level, angle);  break;
    case 'mine':      _drawMine(ctx, level);             break;
    case 'lightning': _drawLightning(ctx, level, angle); break;
    case 'time':      _drawTime(ctx, level);             break;
  }
  ctx.shadowBlur = 0;
  ctx.restore();
}

function _drawBasic(ctx, level, angle) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const h = level >= 2 ? 14 : 12;
  R(-h,-h,h*2,h*2,level>=3?'#1c2833':'#555');
  R(-h,-h,h,h,'#636e72'); R(0,0,h,h,'#636e72');
  R(0,-h,h,h,'#4a5568');  R(-h,0,h,h,'#4a5568');
  R(-h,-1,h*2,2,'#333');  R(-1,-h,2,h*2,'#333');
  const mc=level>=3?'#2c3e50':'#444';
  R(-h-3,-h-3,5,5,mc); R(h-2,-h-3,5,5,mc); R(-h-3,h-2,5,5,mc); R(h-2,h-2,5,5,mc);
  if (level>=2) {
    ctx.fillStyle='#7f8c8d';
    for(let i=0;i<4;i++){const a=i*Math.PI/2+Math.PI/4;const bx=Math.cos(a)*(h+3),by=Math.sin(a)*(h+3);ctx.beginPath();ctx.moveTo(bx-3,by-3);ctx.lineTo(bx+3,by-3);ctx.lineTo(bx,by+5);ctx.fill();}
  }
  if (level>=1){ctx.strokeStyle='#f39c12';ctx.lineWidth=2;ctx.strokeRect(-h-1,-h-1,h*2+2,h*2+2);}
  C(0,0,6,level>=3?'#00bcd4':'#3498db'); C(-2,-2,3,'#5dade2');
  ctx.save(); ctx.rotate(angle);
  if(level>=2){R(0,-5,h+4,10,'#2c3e50');}
  R(0,-3,h+6,6,'#2980b9'); R(h+2,-4,5,8,'#1a5276');
  ctx.restore();
  if (level>=3){
    ctx.shadowColor='#e67e22';ctx.shadowBlur=8;
    const now=Date.now()*0.004; ctx.fillStyle='#e67e22';
    [[-h,-h],[h,-h],[-h,h],[h,h]].forEach(([fx,fy],i)=>{ctx.beginPath();ctx.arc(fx,fy+Math.sin(now+i)*2,3,0,Math.PI*2);ctx.fill();});
    ctx.shadowBlur=0;
  }
}

function _drawSniper(ctx, level, angle) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const tw=level>=2?8:6;
  R(-tw,-14,tw*2,28,level>=3?'#1a1a2e':'#2c3e50');
  R(-tw,-14,tw,14,'#2e4057'); R(0,0,tw,14,'#2e4057');
  R(-tw,0,tw,14,'#253547');   R(0,-14,tw,14,'#253547');
  R(-tw+2,-6,tw*2-4,6,'#1abc9c'); C(0,-3,3,'#48c9b0');
  if(level>=1){ctx.strokeStyle='#f39c12';ctx.lineWidth=2;ctx.strokeRect(-tw-1,-15,tw*2+2,30);}
  if(level>=2){R(-tw-5,-10,5,6,'#1a252f');R(tw,-10,5,6,'#1a252f');R(-tw-5,4,5,6,'#1a252f');R(tw,4,5,6,'#1a252f');}
  ctx.save(); ctx.rotate(angle);
  if(level>=2){R(0,-3,28,6,'#1a252f');}
  R(0,-2,30,4,'#27ae60'); R(24,-3,8,6,'#145a32'); R(10,-5,6,3,'#1e8449');
  if(level>=3){ctx.shadowColor='#2ecc71';ctx.shadowBlur=12;ctx.strokeStyle='rgba(46,204,113,0.4)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(30,0);ctx.stroke();}
  ctx.restore();
}

function _drawExplosion(ctx, level, angle) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const bw=level>=2?16:13, bh=level>=2?10:8;
  R(-bw,-bh,bw*2,bh*2,level>=3?'#1c0a00':'#4a2800');
  R(-bw,-bh,bw,bh,'#5d3317'); R(0,0,bw,bh,'#5d3317');
  R(0,-bh,bw,bh,'#4a2800');   R(-bw,0,bw,bh,'#4a2800');
  R(-bw-3,-4,4,8,'#3d2000'); R(-bw-3,-4,4,2,'#e67e22');
  R(bw-1,-4,4,8,'#3d2000');  R(bw-1,-4,4,2,'#e67e22');
  if(level>=1){ctx.strokeStyle='#f39c12';ctx.lineWidth=2;ctx.strokeRect(-bw-1,-bh-1,bw*2+2,bh*2+2);}
  if(level>=2){ctx.fillStyle='#6e3517';ctx.beginPath();ctx.moveTo(-bw,-bh);ctx.lineTo(-bw-6,-bh-5);ctx.lineTo(-bw+4,-bh);ctx.fill();ctx.beginPath();ctx.moveTo(bw,-bh);ctx.lineTo(bw+6,-bh-5);ctx.lineTo(bw-4,-bh);ctx.fill();}
  ctx.save(); ctx.rotate(angle);
  if(level>=2){R(0,-7,18,14,'#2c1a00');}
  R(0,-5,20,10,'#c0392b'); R(0,-4,20,8,'#e74c3c'); R(16,-7,8,14,'#7b241c'); R(4,-6,3,12,'#922b21'); R(10,-6,3,12,'#922b21');
  ctx.restore();
  if(level>=3){const now=Date.now()*0.003;for(let i=0;i<6;i++){const a=(i/6)*Math.PI*2+now,fr=bw+4;ctx.fillStyle=i%2===0?'#e67e22':'#e74c3c';ctx.shadowColor='#e67e22';ctx.shadowBlur=6;ctx.beginPath();ctx.arc(Math.cos(a)*fr,Math.sin(a)*fr,3,0,Math.PI*2);ctx.fill();}ctx.shadowBlur=0;}
}

function _drawSlow(ctx, level, angle) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const r=level>=2?12:10;
  const oct=(rad)=>{ctx.beginPath();for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2-Math.PI/8;i===0?ctx.moveTo(Math.cos(a)*rad,Math.sin(a)*rad):ctx.lineTo(Math.cos(a)*rad,Math.sin(a)*rad);}ctx.closePath();};
  ctx.fillStyle=level>=3?'#0a1a2e':'#1a3a4a'; oct(r); ctx.fill();
  ctx.fillStyle='#16404e'; oct(r-3); ctx.fill();
  if(level>=1){ctx.strokeStyle='#f39c12';ctx.lineWidth=2;oct(r+2);ctx.stroke();}
  if(level>=2){ctx.fillStyle='#b3ecf7';for(let i=0;i<4;i++){const a=(i/4)*Math.PI*2,sx=Math.cos(a)*(r+2),sy=Math.sin(a)*(r+2);ctx.save();ctx.translate(sx,sy);ctx.rotate(a);ctx.beginPath();ctx.moveTo(-2,0);ctx.lineTo(0,-7);ctx.lineTo(2,0);ctx.fill();ctx.restore();}}
  const now=Date.now()*0.002, pulse=0.85+Math.sin(now)*0.15;
  ctx.save(); ctx.scale(pulse,pulse);
  ctx.fillStyle='#00e5ff'; ctx.beginPath(); ctx.moveTo(0,-8);ctx.lineTo(4,-2);ctx.lineTo(0,8);ctx.lineTo(-4,-2);ctx.closePath();ctx.fill();
  ctx.fillStyle='#80f0ff'; ctx.beginPath(); ctx.moveTo(0,-5);ctx.lineTo(2,0);ctx.lineTo(0,5);ctx.lineTo(-2,0);ctx.closePath();ctx.fill();
  ctx.restore();
  ctx.strokeStyle='rgba(100,230,255,0.45)';ctx.lineWidth=1;
  for(let i=0;i<4;i++){const a=(i/4)*Math.PI*2+now*0.3;ctx.beginPath();ctx.moveTo(Math.cos(a)*3,Math.sin(a)*3);ctx.lineTo(Math.cos(a)*(r-2),Math.sin(a)*(r-2));ctx.stroke();}
  ctx.save(); ctx.rotate(angle);
  if(level>=2){R(0,-4,r+6,8,'#0d2137');}
  R(0,-3,r+8,6,'#00bcd4'); R(r+4,-4,5,8,'#0097a7');
  if(level>=3){ctx.shadowColor='#00e5ff';ctx.shadowBlur=10;ctx.strokeStyle='rgba(0,229,255,0.5)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(r+8,0);ctx.stroke();ctx.shadowBlur=0;}
  ctx.restore();
}

function _drawMine(ctx, level) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const s = 13;
  // Shadow
  ctx.fillStyle='rgba(0,0,0,0.25)'; ctx.fillRect(-s+2,-s+2,s*2,s*2);
  // Main body
  R(-s,-s,s*2,s*2, level>=2?'#8B6914':'#7d5a2c');
  // Inner shading stripes
  ctx.fillStyle='rgba(0,0,0,0.18)';
  for(let i=0;i<4;i++) ctx.fillRect(-s+i*7,-s,3,s*2);
  // Top highlight
  ctx.fillStyle='rgba(255,255,255,0.08)';
  ctx.fillRect(-s,-s,s*2,4);
  // Gold border
  ctx.strokeStyle = level>=1?'#f39c12':'#a07840';
  ctx.lineWidth = level>=1?2.5:1.5;
  ctx.strokeRect(-s,-s,s*2,s*2);
  // Corner bolts
  const boltColor = level>=2?'#ffd700':'#c8922a';
  [[-s+2,-s+2],[s-2,-s+2],[-s+2,s-2],[s-2,s-2]].forEach(([bx,by])=>{
    ctx.fillStyle=boltColor; ctx.beginPath(); ctx.arc(bx,by,2,0,Math.PI*2); ctx.fill();
  });
  // $ symbol
  if(level>=2){ctx.shadowColor='#ffd700'; ctx.shadowBlur=10;}
  ctx.fillStyle = level>=2?'#ffd700':'#f39c12';
  ctx.font = `bold ${level>=1?18:16}px serif`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('$',0,1);
  ctx.shadowBlur=0;
}

function _drawAntiAir(ctx, level, angle) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const r=level>=2?12:10;

  // Octagonal base
  const oct=(rad,fill)=>{
    ctx.fillStyle=fill; ctx.beginPath();
    for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2-Math.PI/8;i===0?ctx.moveTo(Math.cos(a)*rad,Math.sin(a)*rad):ctx.lineTo(Math.cos(a)*rad,Math.sin(a)*rad);}
    ctx.closePath(); ctx.fill();
  };
  oct(r, level>=3?'#1c2533':'#5d6d7e');
  oct(r-3,'#717d7e');
  // Cross reinforcement
  R(-r,-1,r*2,2,'#4a5568'); R(-1,-r,2,r*2,'#4a5568');

  // Level 1: gold trim
  if(level>=1){
    ctx.strokeStyle='#f39c12'; ctx.lineWidth=2;
    ctx.beginPath(); for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2-Math.PI/8;i===0?ctx.moveTo(Math.cos(a)*(r+2),Math.sin(a)*(r+2)):ctx.lineTo(Math.cos(a)*(r+2),Math.sin(a)*(r+2));} ctx.closePath(); ctx.stroke();
  }
  // Level 2: radar dish
  if(level>=2){
    R(-1,-r+1,2,r-5,'#aab7b8');           // mast
    ctx.strokeStyle='#95a5a6'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(0,-r+2,4,Math.PI*1.1,Math.PI*1.9); ctx.stroke(); // dish arc
  }

  // Twin rotating barrels
  ctx.save();
  ctx.rotate(angle);
  const bl=level>=2?17:14;
  // Shared mount
  R(0,-4,7,8,'#566573');
  // Left barrel
  R(5,-5,bl,3,level>=3?'#2c3e50':'#4a5568');
  R(5+bl,-6,4,5,'#2c3e50');   // muzzle
  // Right barrel
  R(5, 2,bl,3,level>=3?'#2c3e50':'#4a5568');
  R(5+bl, 1,4,5,'#2c3e50');   // muzzle
  // Level 3: energy glow on barrels
  if(level>=3){
    ctx.shadowColor='#85c1e9'; ctx.shadowBlur=10;
    ctx.strokeStyle='rgba(133,193,233,0.6)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(7,-3); ctx.lineTo(5+bl,-3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(7, 4); ctx.lineTo(5+bl, 4); ctx.stroke();
    ctx.shadowBlur=0;
  }
  ctx.restore();

  // Center sensor dome
  C(0,0,4,'#85929e'); C(0,0,2,'#aab7b8'); C(-1,-1,1,'#d5dbdb');
}

function _drawLightning(ctx, level, angle) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const s=level>=2?12:10;
  // Base platform
  R(-s,-s,s*2,s*2,level>=3?'#1a1500':'#2c2500');
  R(-s,-s,s,s,'#3a3000'); R(0,0,s,s,'#3a3000');
  R(0,-s,s,s,'#2c2500'); R(-s,0,s,s,'#2c2500');
  if(level>=1){ctx.strokeStyle='#f39c12';ctx.lineWidth=2;ctx.strokeRect(-s-1,-s-1,s*2+2,s*2+2);}
  // Central coil
  C(0,0,5,'#f1c40f'); C(0,0,2.5,'#fff');
  // Rotating sparks (level 2+)
  if(level>=2){
    const now=Date.now()*0.008;
    ctx.shadowColor='#f1c40f'; ctx.shadowBlur=8; ctx.fillStyle='#f1c40f';
    for(let i=0;i<4;i++){const a=i*Math.PI/2+now;C(Math.cos(a)*9,Math.sin(a)*9,2,'#f1c40f');}
    ctx.shadowBlur=0;
  }
  // Barrel
  ctx.save(); ctx.rotate(angle);
  if(level>=2){R(0,-4,s+4,8,'#b7950b');}
  R(0,-3,s+6,6,'#d4ac0d'); R(s+2,-4,5,8,'#9a7d0a');
  // Lightning fork tip
  if(level>=3){
    ctx.strokeStyle='#fff'; ctx.lineWidth=1.5;
    ctx.shadowColor='#f1c40f'; ctx.shadowBlur=10;
    const tx=s+7;
    ctx.beginPath(); ctx.moveTo(tx-4,0); ctx.lineTo(tx,0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(tx-2,-2); ctx.lineTo(tx+4,-5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(tx-2,2);  ctx.lineTo(tx+4,5);  ctx.stroke();
    ctx.shadowBlur=0;
  }
  ctx.restore();
}

function _drawTime(ctx, level) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  // Base
  R(-10,-12,20,24,level>=3?'#1a0030':'#2c0050');
  if(level>=1){ctx.strokeStyle='#9b59b6';ctx.lineWidth=2;ctx.strokeRect(-11,-13,22,26);}
  // Hourglass frame
  ctx.strokeStyle='#9b59b6'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(-7,-10); ctx.lineTo(7,-10); ctx.lineTo(3,0); ctx.lineTo(7,10); ctx.lineTo(-7,10); ctx.lineTo(-3,0); ctx.closePath(); ctx.stroke();
  // Upper sand
  ctx.fillStyle='rgba(241,196,15,0.5)';
  ctx.beginPath(); ctx.moveTo(-6,-9); ctx.lineTo(6,-9); ctx.lineTo(2.5,-0.5); ctx.lineTo(-2.5,-0.5); ctx.closePath(); ctx.fill();
  // Lower sand
  ctx.fillStyle='rgba(241,196,15,0.5)';
  ctx.beginPath(); ctx.moveTo(-2.5,0.5); ctx.lineTo(2.5,0.5); ctx.lineTo(6,9); ctx.lineTo(-6,9); ctx.closePath(); ctx.fill();
  // Center pinch line
  R(-7,-1,14,2,'#8e44ad');
  // Orbiting particles (level 2+)
  if(level>=2){
    const now=Date.now()*0.003;
    ctx.shadowColor='#9b59b6'; ctx.shadowBlur=8;
    for(let i=0;i<3;i++){const a=i*Math.PI*2/3+now;C(Math.cos(a)*14,Math.sin(a)*14,2.5,'#d7bde2');}
    ctx.shadowBlur=0;
  }
}

const COLS = 22;
const ROWS = 14;
const CELL = 36;

// Детерминированный псевдорандом по координатам
function sr(a, b, s = 0) {
  const x = Math.sin(a * 127.1 + b * 311.7 + s * 74.3) * 43758.5453;
  return x - Math.floor(x);
}

// Winding path as grid coordinates
const PATH_COORDS = [
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
  [18,6],[19,6],[20,6],[21,6]
];

// Convert grid coords to pixel path (center of each cell)
function buildPath(coords) {
  return coords.map(([col, row]) => ({
    x: col * CELL + CELL / 2,
    y: row * CELL + CELL / 2,
  }));
}

// Global defaults (Ironhold) — used before map selection
const PATH_SET = new Set(PATH_COORDS.map(([c, r]) => `${c},${r}`));

// ─── Случайные события (каждые 5 волн) ─────────────────────────────────────
const EVENTS = [
  {
    id: 'treasure',
    title: '💎 Клад',
    desc: 'Ваши разведчики нашли спрятанное золото!',
    choices: [
      { label: 'Забрать (+120g)', fn: g => { g.gold += 120; } }
    ]
  },
  {
    id: 'merchant',
    title: '🛒 Торговец',
    desc: 'Странник предлагает сделку: вы платите 100g сейчас, и после следующей волны получаете 260g.',
    choices: [
      { label: 'Принять (−100g)', fn: g => { if (g.gold >= 100) { g.gold -= 100; g.merchantReward = 260; } else { g.ui.showMessage('Недостаточно золота!'); } } },
      { label: 'Отказать', fn: () => {} }
    ]
  },
  {
    id: 'raid',
    title: '⚔ Усиленный набег',
    desc: 'Враги этой волны на 40% крепче — но приносят вдвое больше золота!',
    choices: [
      { label: 'Принять вызов', fn: g => { g.raidActive = true; } }
    ]
  },
  {
    id: 'plague',
    title: '☠ Зараза',
    desc: 'Болезнь поражает механизмы башен: −25% урона на 3 волны.',
    choices: [
      { label: 'Принять', fn: g => { g.plagueWavesLeft = 3; } }
    ]
  },
  {
    id: 'smith',
    title: '⚒ Кузнец',
    desc: 'Мастер-кузнец укрепляет все ваши башни: каждая получает +3 урона навсегда.',
    choices: [
      { label: 'Принять (бесплатно)', fn: g => { g.towers.forEach(t => { if (!t.isMine) t.damage += 3; }); } }
    ]
  },
];

// ─── Налог на содержание башен (g / волна) ─────────────────────────────────
const MAINTENANCE = {
  basic: 2, sniper: 4, explosion: 3, slow: 2, antiair: 3, mine: 1, lightning: 5, time: 6,
  torch: 2, catapult: 3, scorpion: 3, sandstorm: 4, tombguard: 4, obelisk: 5, snakecharmer: 5, sunmirror: 6,
};

class LightningBallEffect {
  constructor(pathPoints) {
    this.pathPoints = pathPoints;
    this.pathIdx = 0;
    this.x = pathPoints[0].x;
    this.y = pathPoints[0].y;
    this.speed = 2.5;
    this.dead = false;
    this.hitSet = new Set();
  }

  update(enemies) {
    if (this.dead) return [];
    // Advance along path
    const target = this.pathPoints[this.pathIdx];
    const dx = target.x - this.x, dy = target.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < this.speed) {
      this.pathIdx++;
      if (this.pathIdx >= this.pathPoints.length) { this.dead = true; return []; }
    } else {
      this.x += (dx / dist) * this.speed;
      this.y += (dy / dist) * this.speed;
    }
    // Zap nearby enemies (radius 50px), each enemy only once
    const hits = [];
    enemies.forEach(e => {
      if (e.dead || e.reached || this.hitSet.has(e)) return;
      const ex = e.x - this.x, ey = e.y - this.y;
      if (Math.sqrt(ex*ex + ey*ey) <= 50) {
        e.takeDamage(70);
        this.hitSet.add(e);
        hits.push(e);
      }
    });
    return hits;
  }

  draw(ctx) {
    const now = Date.now() * 0.01;
    ctx.save();
    ctx.shadowColor = '#f1c40f'; ctx.shadowBlur = 22;
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(this.x, this.y, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f1c40f';
    ctx.beginPath(); ctx.arc(this.x, this.y, 6, 0, Math.PI * 2); ctx.fill();
    // Orbiting sparks
    ctx.strokeStyle = 'rgba(255,220,50,0.7)'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 5; i++) {
      const a = i * Math.PI * 2 / 5 + now;
      const r = 9 + Math.sin(now * 3 + i) * 3;
      ctx.beginPath(); ctx.arc(this.x + Math.cos(a)*r, this.y + Math.sin(a)*r, 2, 0, Math.PI*2); ctx.fill();
    }
    ctx.restore();
  }
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    canvas.width = COLS * CELL;
    canvas.height = ROWS * CELL;

    // Active map (set during map selection; default = Ironhold)
    this.currentMap   = MAP_DEFS[0];
    this.pathCoords   = MAP_DEFS[0].coords;
    this.pathSet      = new Set(MAP_DEFS[0].coords.map(([c,r]) => `${c},${r}`));
    this.path         = buildPath(MAP_DEFS[0].coords);
    // Map bonus multipliers
    this.mapGoldMult   = 1;
    this.mapSpeedMult  = 1;
    this.mapDamageMult = 1;
    this.mapEnemyMult  = 1;

    this.towers = [];
    this.enemies = [];
    this.bullets = [];
    this.particles = [];
    this.gold = 200;
    this.lives = 25;
    this.autoWaveCountdown = 0;
    this.wave = 0;
    this.score = 0;
    this.startTime = null;
    this.waveInProgress = false;
    this.spawnQueue = [];
    this.spawnTimer = 0;
    this.selectedTower = null;
    this.gameOver = false;
    this.victory = false;

    this.deathStains = [];
    this.dayPhase = 0;
    this.exitBlinkTimer = 0;

    // Economy / boost state
    this.furyActive      = false;
    this.freezeActive    = false;
    this.fortifyActive   = false;
    this.raidActive      = false;
    this.plagueWavesLeft = 0;
    this.merchantReward  = 0;
    this.freezeSpawnCount = 0;
    this.healUsedCount   = 0; // heals used this pause (max 3)

    this.lightningBalls      = [];
    this.radiationZones      = [];
    this.snakes              = [];
    this._unlockNotified     = new Set();
    this.paused              = false;
    this._timeFreezeGlobalCD = 0;
    this.expertMode          = false;

    this.achievements = new AchievementSystem();

    this.ui = new UI(this);
    this.frame = 0;
    this.storyReady      = false;
    this.gameOverTimer   = 0;
    this.gameOverPending = false;
    this.gateLabels      = [];

    // Финальные боссы
    this.bossTitleEffect       = null; // { text, color, flashColor, flashTimer, timer, maxTimer }
    this.towerDamageDebuffTimer = 0;   // Малькар 50% HP ослабление башен (в сек)

    this.initMap();
    this._initGate();

    this.canvas.addEventListener('click', e => this.handleClick(e));

    document.addEventListener('keydown', e => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        this.togglePause();
      }
    });

    // Показываем пролог, затем выбор карты
    this.story = new StoryManager(this);
    setTimeout(() => this.story.showPrologue(() => {
      const mapSelect = new MapSelectScreen(this, mapDef => {
        this.applyMap(mapDef);
        const mapNum = MAP_DEFS.indexOf(mapDef) + 1; // 1 = Айронхолд, 2 = Пустыня руин, 3 = Тёмное царство
        this.story.showMapPrologue(mapNum, () => { this.startTime = Date.now(); this.storyReady = true; });
      });
      mapSelect.show();
      if (typeof GameAudio !== 'undefined') GameAudio.playTitle();
    }), 400);

    this.loop();
  }

  handleClick(e) {
    if (!this.storyReady) return;
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;
    const col = Math.floor(mx / CELL);
    const row = Math.floor(my / CELL);

    // Check if clicking on existing tower
    const clicked = this.towers.find(t => t.gridX === col && t.gridY === row);
    if (clicked) {
      if (this.selectedTower === clicked) {
        this.deselectTower();
      } else {
        this.deselectTower();
        this.selectedTower = clicked;
        clicked.selected = true;
        this.ui.showUpgradePanel(clicked);
        this.ui.deselect();
      }
      return;
    }

    // Place tower
    if (this.ui.selectedTowerType) {
      const type = this.ui.selectedTowerType;
      if (this.pathSet.has(`${col},${row}`)) {
        this.ui.showMessage('Нельзя строить на пути!');
        return;
      }
      if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return;
      if (this.towers.find(t => t.gridX === col && t.gridY === row)) {
        this.ui.showMessage('Здесь уже есть башня!');
        return;
      }
      if (type === 'mine') {
        const mineCount = this.towers.filter(t => t.isMine).length;
        if (mineCount >= 5) {
          this.ui.showMessage('Максимум 5 шахт!');
          return;
        }
      }
      if (type === 'time') {
        const timeCount = this.towers.filter(t => t.type === 'time').length;
        if (timeCount >= 2) {
          this.ui.showMessage('Максимум 2 башни времени на карте!');
          return;
        }
      }
      const def = TOWER_DEFS[type];
      if (def.unlockWave && this.wave < def.unlockWave) {
        this.ui.showMessage(`Башня ${def.name} откроется с волны ${def.unlockWave}!`);
        return;
      }
      const cost = def.cost;
      if (this.gold < cost) {
        this.ui.showMessage('Недостаточно золота!');
        return;
      }
      this.gold -= cost;
      this.towers.push(new Tower(type, col, row, CELL, this));
      recalculateCombos(this.towers);
      this.achievements.onTowerBuilt(type, this);
      return;
    }

    // Deselect
    this.deselectTower();
  }

  deselectTower() {
    if (this.selectedTower) {
      this.selectedTower.selected = false;
      this.selectedTower = null;
    }
    this.ui.hideUpgradePanel();
  }

  applyMap(mapDef) {
    if (typeof GameAudio !== 'undefined') GameAudio.startMap(mapDef.id);
    if (this.ui) this.ui.switchPanel(mapDef.id);
    this.currentMap    = mapDef;
    this.pathCoords    = mapDef.coords;
    this.pathSet       = new Set(mapDef.coords.map(([c,r]) => `${c},${r}`));
    this.path          = buildPath(mapDef.coords);
    this.mapGoldMult   = mapDef.goldMult;
    this.mapSpeedMult  = mapDef.speedMult;
    this.mapDamageMult = mapDef.damageMult;
    this.mapEnemyMult  = mapDef.enemyMult;
    this.expertMode    = mapDef.expertMode;
    this.gold          = mapDef.startGold ?? 200;
    this.initMap();
    this._initGate();
  }

  // Переход на следующую карту без возврата на экран выбора
  loadNextMap(mapNum) {
    const mapDef = MAP_DEFS[mapNum - 1];
    if (!mapDef) return;

    // Сбросить игровое состояние
    this.towers              = [];
    this.enemies             = [];
    this.bullets             = [];
    this.particles           = [];
    this.lightningBalls      = [];
    this.radiationZones      = [];
    this.snakes              = [];
    this.deathStains         = [];
    this.gateLabels          = [];
    this.gold                = mapDef.startGold ?? 200;
    this.lives               = 25;
    this.wave                = 0;
    this.score               = 0;
    this.startTime           = null;
    this.waveInProgress      = false;
    this.spawnQueue          = [];
    this.spawnTimer          = 0;
    this.selectedTower       = null;
    this.gameOver            = false;
    this.victory             = false;
    this.gameOverPending     = false;
    this.gameOverTimer       = 0;
    this.autoWaveCountdown   = 0;
    this.paused              = false;
    this.healUsedCount       = 0;
    this.furyActive          = false;
    this.freezeActive        = false;
    this.fortifyActive       = false;
    this.raidActive          = false;
    this.plagueWavesLeft     = 0;
    this.merchantReward      = 0;
    this.freezeSpawnCount    = 0;
    this.bossTitleEffect     = null;
    this.towerDamageDebuffTimer = 0;
    this._unlockNotified     = new Set();
    this._timeFreezeGlobalCD = 0;
    this.dayPhase            = 0;
    this.exitBlinkTimer      = 0;
    this.storyReady          = false;

    // Скрыть UI-панели прошлой карты
    this.ui.hideUpgradePanel();

    // Применить новую карту (включая запуск музыки)
    this.applyMap(mapDef);

    // Сбросить story и показать пролог новой карты
    this.story.lastShownWave = -1;
    this.story.showMapPrologue(mapNum, () => {
      this.startTime = Date.now();
      this.storyReady = true;
    });
  }

  togglePause() {
    if (!this.waveInProgress || this.gameOver || this.gameOverPending) return;
    this.paused = !this.paused;
    this.ui.updatePauseBtn();
  }

  removeTower(tower) {
    this.towers = this.towers.filter(t => t !== tower);
    recalculateCombos(this.towers);
  }

  startWave() {
    this.wave++;
    this.waveInProgress = true;
    this.spawnQueue = buildWave(this.wave, this.mapEnemyMult, this.currentMap?.id);
    this.spawnTimer = 0;
    this.autoWaveCountdown = 0;
    this.freezeSpawnCount = 0;
    this.healUsedCount = 0;

    // Налог на содержание башен
    const tax = this._calcMaintenance();
    if (tax > 0) {
      this.gold = Math.max(0, this.gold - tax);
    }

    // Торговец: выплата после прошлой волны
    if (this.merchantReward > 0) {
      this.gold += this.merchantReward;
      const r = this.merchantReward;
      this.merchantReward = 0;
      setTimeout(() => this.ui.showMessage(`Торговец вернул долг: +${r}g`, 2200), 600);
    }

    // Фортификация: +5 жизней на эту волну
    if (this.fortifyActive) {
      this.lives += 5;
      this.fortifyActive = false;
    }

    // Decrement plague counter
    if (this.plagueWavesLeft > 0) {
      this.plagueWavesLeft--;
      if (this.plagueWavesLeft === 0) {
        setTimeout(() => this.ui.showMessage('Зараза прошла! Башни восстановлены.', 2000), 800);
      }
    }

    const newPhase = this.wave >= 22 ? 3 : this.wave >= 15 ? 2 : this.wave >= 8 ? 1 : 0;
    if (newPhase !== this.dayPhase) {
      this.dayPhase = newPhase;
      const msgs = ['', 'Наступает закат...', 'Наступает вечер...', 'Наступает ночь...'];
      if (msgs[newPhase]) setTimeout(() => this.ui.showMessage(msgs[newPhase], 3000), 1800);
    }

    // Unlock notifications for new towers
    const UNLOCK_MSGS = { lightning: '⚡ Башня Молнии разблокирована!', time: '⏳ Башня Времени разблокирована!' };
    for (const [type, msg] of Object.entries(UNLOCK_MSGS)) {
      const def = TOWER_DEFS[type];
      if (def.unlockWave === this.wave && !this._unlockNotified.has(type)) {
        this._unlockNotified.add(type);
        setTimeout(() => this.ui.showMessage(msg, 3500), 2600);
      }
    }

    this.achievements.onWaveStart(this);
    if (typeof GameAudio !== 'undefined') GameAudio.onWave(this.wave, this.currentMap?.id);

    let waveMsg = `Волна ${this.wave}!`;
    if (tax > 0) waveMsg += ` Налог: −${tax}g`;
    if (this.furyActive) waveMsg += ' ⚔ ЯРОСТЬ!';
    if (this.freezeActive) waveMsg += ' ❄ Заморозка!';
    if (this.raidActive) waveMsg += ' ⚔ Набег!';
    this.ui.showMessage(waveMsg, 2000);
  }

  _calcMaintenance() {
    return this.towers.reduce((sum, t) => sum + (MAINTENANCE[t.type] || 0), 0);
  }

  _enemyGold(e) {
    const base = e._raidReward ? e.reward * 2 : e.reward;
    const cap  = this.currentMap?.bossGoldCap;
    if (cap && e.isBoss) return e._raidReward ? cap * 2 : cap;
    return Math.round(base * this.mapGoldMult);
  }

  spawnEnemies(dt) {
    if (!this.waveInProgress) return;
    this.spawnTimer += dt * 60;

    while (this.spawnQueue.length > 0 && this.spawnTimer >= this.spawnQueue[0].time) {
      const spawn = this.spawnQueue.shift();
      const enemy = new Enemy(spawn.type, this.wave, this.path, spawn.elite || null);
      // Бонус карты: скорость
      if (this.mapSpeedMult !== 1) enemy.speed *= this.mapSpeedMult;
      // Набег: враги +40% HP, но двойная награда
      if (this.raidActive) {
        enemy.hp = Math.floor(enemy.hp * 1.4);
        enemy.maxHP = Math.floor(enemy.maxHP * 1.4);
        enemy._raidReward = true;
      }
      // Заморозка: первые 8 врагов начинают замедленными
      if (this.freezeActive && this.freezeSpawnCount < 8) {
        enemy.speed *= 0.5;
        this.freezeSpawnCount++;
      }
      this.enemies.push(enemy);
      // Эффект появления финального босса
      if (enemy.isFinalBoss && enemy.type !== 'zarok') {
        this._triggerFinalBossAppearance(enemy.type);
      }
    }

    if (this.spawnQueue.length === 0 && this.enemies.every(e => e.dead || e.reached)) {
      this.waveInProgress = false;
      this.achievements.onWaveComplete(this);
      // Сбрасываем однoволновые бусты
      this.furyActive   = false;
      this.freezeActive = false;
      this.raidActive   = false;

      const bonus = this.currentMap?.id === 'gorge'
        ? 40 + this.wave * 10
        : 5 + this.wave * 3;
      this.gold += bonus;
      this.score += this.wave * 50;
      const mineGold = this.towers.filter(t => t.isMine).reduce((s, t) => s + t.mineIncome, 0);
      if (mineGold > 0) {
        this.gold += mineGold;
        this.ui.showMessage(`Волна ${this.wave} пройдена! +${bonus}g | +${mineGold}g от шахт`, 2500);
      } else {
        this.ui.showMessage(`Волна ${this.wave} пройдена! +${bonus}g`, 2000);
      }

      // Победа после волны 60
      if (this.wave >= 60) {
        this.victory = true;
        setTimeout(() => {
          this.story.handleVictory(this.score, this.wave, this.startTime);
        }, 2200);
        return;
      }

      // Сюжетный диалог после волны (1.8 сек задержки)
      setTimeout(() => {
        if (this.story) this.story.checkWave(this.wave, () => {});
      }, 1800);

      // Автозапуск с волны 15
      if (this.wave >= 15) {
        this.autoWaveCountdown = 20 * 60;
      }
    }
  }

  update(dt) {
    this.frame++;

    // Gate animations and floating labels run even during end-sequence
    this._updateGate();
    this.gateLabels = this.gateLabels.filter(l => {
      l.y -= 1.5; l.life--;
      l.alpha = l.life / l.maxLife;
      return l.life > 0;
    });

    if (this.gameOver) return;

    // Пауза: останавливаем всю игровую логику
    if (this.paused) {
      this.ui.update();
      return;
    }

    // Gate-break animation plays for 1.5 sec before overlay appears
    if (this.gameOverPending) {
      this.gameOverTimer++;
      if (this.gameOverTimer >= 90) this.gameOver = true;
      return;
    }

    // Автозапуск волны (с волны 15)
    if (this.autoWaveCountdown > 0 && !this.waveInProgress) {
      this.autoWaveCountdown--;
      if (this.autoWaveCountdown <= 0) this.startWave();
    }

    this.spawnEnemies(dt);

    // Update enemies
    this.enemies.forEach(e => e.update(dt));

    // Check reached
    this.enemies.forEach(e => {
      if (e.reached && !e._counted) {
        e._counted = true;
        const isBoss = e.type === 'overlord' || (ENEMY_DEFS[e.type] && ENEMY_DEFS[e.type].isFinalBoss);
        const dmg = isBoss ? 5 : 1;
        this._gateHit(isBoss);
        this.lives -= dmg;
        if (this.lives <= 0 && !this.gameOverPending) {
          this.lives = 0;
          this.gameOverPending = true;
          this.gameOverTimer = 0;
          this._gateBreak();
        }
      }
    });

    // Глобальный кулдаун легендарки Башни Времени
    if (this._timeFreezeGlobalCD > 0) {
      this._timeFreezeGlobalCD = Math.max(0, this._timeFreezeGlobalCD - dt);
    }

    // Таймер ослабления башен от Малькара
    if (this.towerDamageDebuffTimer > 0) {
      this.towerDamageDebuffTimer = Math.max(0, this.towerDamageDebuffTimer - dt);
    }

    // Таймер эффекта появления босса
    if (this.bossTitleEffect) {
      this.bossTitleEffect.timer -= dt;
      if (this.bossTitleEffect.flashTimer > 0) this.bossTitleEffect.flashTimer -= dt;
    }

    // Боссовые призывы и специальные эффекты
    this.enemies.slice().forEach(e => {
      if (e.pendingSummon) {
        const summon = e.pendingSummon;
        e.pendingSummon = null;
        for (let i = 0; i < summon.count; i++) {
          const minion = new Enemy(summon.type, this.wave, this.path);
          if (summon.hpMult) {
            minion.maxHP = Math.round(minion.maxHP * summon.hpMult);
            minion.hp    = minion.maxHP;
          }
          minion.pathIndex = Math.min(e.pathIndex, this.path.length - 1);
          minion.x = e.x + (Math.random() - 0.5) * 18;
          minion.y = e.y + (Math.random() - 0.5) * 18;
          this.enemies.push(minion);
        }
        if (summon.type === 'zarok') {
          this.ui.showMessage('Зарок призван!', 2500);
          this.bossTitleEffect = { text:'ЗАРОК ПРИЗВАН!', color:'#e74c3c', flashColor:'rgba(160,0,0,0.35)', flashTimer:0.6, timer:1.5, maxTimer:1.5 };
        }
      }
      if (e.towerDebuffPending) {
        e.towerDebuffPending = false;
        this.towerDamageDebuffTimer = 10;
        this.ui.showMessage('Малькар кричит — башни слабеют!', 3500);
      }
    });

    // Towers shoot + legendary effects
    this.towers.forEach(t => {
      t.updateAura(dt, this.enemies);
      const bullet = t.update(this.enemies);
      if (bullet) {
        if (!(bullet instanceof BeamEffect)) {
          if (this.furyActive)                bullet.damage = Math.round(bullet.damage * 1.5);
          if (this.plagueWavesLeft > 0)       bullet.damage = Math.round(bullet.damage * 0.75);
          if (this.towerDamageDebuffTimer > 0) bullet.damage = Math.round(bullet.damage * 0.7);
        }
        this.bullets.push(bullet);
      }
      const special = t.updateLegendary(dt, this.enemies, this.path, this._timeFreezeGlobalCD);
      if (special) this._handleLegendaryEffect(special);
      // Map 2 specials (snake charmer)
      const snake = t.updateMap2(dt, this.enemies, this.path);
      if (snake) {
        snake.activeSnakesRef = t; // for tracking count
        t._activeSnakeCount = (t._activeSnakeCount || 0) + 1;
        this.snakes.push(snake);
      }
    });

    // Update snakes (map 2 snake charmer)
    this.snakes = this.snakes.filter(sn => {
      const hits = sn.update(dt, this.enemies);
      hits.forEach(e => {
        if (e.dead) {
          this.gold  += this._enemyGold(e);
          this.score += e.reward * 2;
          this.spawnParticles(e.x, e.y, '#2ecc71');
          this.deathStains.push({ x: e.x, y: e.y, r: e.size * 2, life: 180, maxLife: 180 });
          this.achievements.onEnemyKilled(e);
          // Snake charmer legendary: poison explosion on kill
          if (sn.poisonExplode) {
            this.enemies.forEach(near => {
              if (near === e || near.dead || near.reached) return;
              const dx = near.x - e.x, dy = near.y - e.y;
              if (Math.sqrt(dx*dx+dy*dy) <= 54) near.applyPoison(near.maxHP * 0.04, 3);
            });
          }
        }
      });
      if (sn.dead && sn.activeSnakesRef) sn.activeSnakesRef._activeSnakeCount = Math.max(0, (sn.activeSnakesRef._activeSnakeCount || 1) - 1);
      return !sn.dead;
    });

    // Update lightning balls
    this.lightningBalls = this.lightningBalls.filter(lb => {
      const hits = lb.update(this.enemies);
      hits.forEach(e => {
        if (e.dead) {
          this.gold  += this._enemyGold(e);
          this.score += e.reward * 2;
          this.spawnParticles(e.x, e.y, '#f1c40f');
          this.deathStains.push({ x: e.x, y: e.y, r: e.size * 2, life: 180, maxLife: 180 });
          this.achievements.onEnemyKilled(e);
        }
      });
      return !lb.dead;
    });

    // Update bullets
    this.bullets.forEach(b => {
      const hits = b.update(this.enemies);
      hits.forEach(e => {
        // Частицы брони при попадании
        if (e.lastArmorBlock > 0) {
          this.spawnArmorParticles(e.x, e.y);
          e.lastArmorBlock = 0;
        }
        if (e.dead) {
          const reward = this._enemyGold(e);
          this.gold += reward;
          this.score += reward * 2;
          this.spawnParticles(e.x, e.y, e.color || '#aaa');
          this.deathStains.push({ x: e.x, y: e.y, r: e.size * 2, life: 180, maxLife: 180 });
          this.achievements.onEnemyKilled(e);
        }
        // Яд-проклятие: распространяется на соседей (радиус 1 клетки)
        if (b.poisonSpread && !e.dead && e.poisonTimer > 0) {
          this.enemies.forEach(near => {
            if (near === e || near.dead || near.reached) return;
            const dx = near.x - e.x, dy = near.y - e.y;
            if (Math.sqrt(dx*dx + dy*dy) <= 36) near.applyPoison(e.poisonDps, 5);
          });
        }
        // Факельник легендарный: огонь распространяется на соседей в 1 клетке
        if (b.fireLegendary && !e.dead && e.burnTimer > 0) {
          this.enemies.forEach(near => {
            if (near === e || near.dead || near.reached) return;
            const dx = near.x - e.x, dy = near.y - e.y;
            if (Math.sqrt(dx*dx + dy*dy) <= 36) near.applyBurn(e.burnDps, 3);
          });
        }
        // Обелиск легендарный: проклятие на всех в 2 клетках от цели
        if (b.curseLegendary && !e.dead) {
          this.enemies.forEach(near => {
            if (near === e || near.dead || near.reached) return;
            const dx = near.x - e.x, dy = near.y - e.y;
            if (Math.sqrt(dx*dx + dy*dy) <= 72) near.applyCurse(b.curseFactor || 1.6, b.curseDuration || 8);
          });
        }
        // Скорпион: добавить стак яда
        if (b.isScorpion && !e.dead) {
          e.applyScorpionStack(b.maxScorpionStacks || 5, 3);
          if (b.scorpionLegendary && e.scorpionStacks >= (b.maxScorpionStacks || 5)) {
            this.enemies.forEach(near => {
              if (near === e || near.dead || near.reached) return;
              const dx = near.x - e.x, dy = near.y - e.y;
              if (Math.sqrt(dx*dx + dy*dy) <= 36) {
                near.applyPoison(near.maxHP * 0.02, 3);
                near.applyScorpionStack(b.maxScorpionStacks || 5, 3);
              }
            });
            this.spawnParticles(e.x, e.y, '#8dde26');
          }
        }
      });
      // Аннигилятор: создать зону излучения на месте попадания
      if (b._zonePos) {
        this._addRadiationZone(b._zonePos.x, b._zonePos.y);
        b._zonePos = null;
      }
    });

    // Radiation zones (Аннигилятор)
    this.radiationZones = this.radiationZones.filter(z => {
      const zhits = z.update(dt, this.enemies);
      zhits.forEach(e => {
        if (e.dead) {
          this.gold  += this._enemyGold(e);
          this.score += e.reward * 2;
          this.spawnParticles(e.x, e.y, '#9b59b6');
          this.deathStains.push({ x: e.x, y: e.y, r: e.size * 2, life: 180, maxLife: 180 });
          this.achievements.onEnemyKilled(e);
        }
      });
      return !z.dead;
    });

    // Проверка достижений (каждые 60 кадров)
    if (this.frame % 60 === 0) this.achievements.onStateCheck(this);

    // Частицы регенерации (каждые 25 кадров)
    if (this.frame % 25 === 0) {
      this.enemies.forEach(e => {
        if (e.regen > 0 && e.hp < e.maxHP && !e.dead) {
          this.spawnRegenParticle(e.x, e.y);
        }
      });
    }

    // Cleanup
    this.enemies = this.enemies.filter(e => !e.dead && !e.reached);
    this.bullets = this.bullets.filter(b => !b.dead);
    this.deathStains = this.deathStains.filter(s => { s.life--; return s.life > 0; });

    // Облака (только Айронхолд — другие карты управляют своими частицами)
    if (!this.currentMap?.id || this.currentMap.id === 'ironhold') {
      this.clouds.forEach(cl => {
        cl.x += cl.speed;
        if (cl.x > this.canvas.width + 120) cl.x = -180;
      });
    }

    // Per-map ambient update (sand particles, ash, lightning…)
    if (typeof MAP_UPDATE !== 'undefined' && MAP_UPDATE[this.currentMap?.id]) {
      MAP_UPDATE[this.currentMap.id](this);
    }

    // Update particles
    this.particles = this.particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1;
      p.life--;
      p.alpha = p.life / p.maxLife;
      return p.life > 0;
    });

    this.ui.update();
    if (this.selectedTower) this.ui.updateUpgradePanel(this.selectedTower);
  }

  _addRadiationZone(x, y) {
    if (this.radiationZones.length >= 3) this.radiationZones.shift();
    this.radiationZones.push(new RadiationZone(x, y));
  }

  spawnArmorParticles(x, y) {
    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        color: '#aab7b8',
        life: 12 + Math.random() * 8,
        maxLife: 20,
        alpha: 1,
        size: 2 + Math.random() * 2,
      });
    }
  }

  spawnRegenParticle(x, y) {
    for (let i = 0; i < 2; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 10,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -1 - Math.random() * 1.5,
        color: '#2ecc71',
        life: 18 + Math.random() * 10,
        maxLife: 28,
        alpha: 1,
        size: 2 + Math.random() * 2,
      });
    }
  }

  spawnParticles(x, y, color) {
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 2;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color,
        life: 20 + Math.random() * 15,
        maxLife: 35,
        alpha: 1,
        size: 3 + Math.random() * 3,
      });
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawMap(ctx);
    // Radiation zones drawn on the ground before towers
    this.radiationZones.forEach(z => z.draw(ctx));
    // Ночной режим / Тёмное царство: свечение башен
    const isMaze = this.currentMap?.id === 'maze';
    if (this.dayPhase >= 3 || isMaze) {
      this.towers.forEach(t => {
        ctx.save();
        ctx.globalAlpha = 0.45;
        const glowColor = isMaze ? '#cc1818' : t.color;
        ctx.shadowColor = glowColor; ctx.shadowBlur = 18;
        ctx.fillStyle = glowColor;
        ctx.beginPath(); ctx.arc(t.x, t.y, 5, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
    }
    this.towers.forEach(t => t.draw(ctx));
    // Ground enemies first, air enemies on top
    this.enemies.filter(e => !e.air).forEach(e => e.draw(ctx));
    this.bullets.forEach(b => b.draw(ctx));
    this.lightningBalls.forEach(lb => lb.draw(ctx));
    this.snakes.forEach(sn => sn.draw(ctx));
    this.enemies.filter(e => e.air).forEach(e => e.draw(ctx));
    // Exit gate — themed per map
    if (typeof MAP_DRAW_EXIT !== 'undefined' && MAP_DRAW_EXIT[this.currentMap?.id]) {
      MAP_DRAW_EXIT[this.currentMap.id](ctx, this);
    } else {
      this._drawExitGate(ctx);
    }
    this.drawParticles(ctx);
    this._drawGateLabels(ctx); // floating damage numbers on top
    this._drawBossTitleEffect(ctx);

    if (this.gameOver) this.drawOverlay(ctx);

    if (this.paused) this._drawPauseOverlay(ctx);
  }

  drawMap(ctx) {
    // Dispatch to per-map draw (gorge / maze)
    if (typeof MAP_DRAW !== 'undefined' && MAP_DRAW[this.currentMap?.id]) {
      MAP_DRAW[this.currentMap.id](ctx, this); return;
    }

    const W = this.canvas.width, H = this.canvas.height;

    // 1. Трава с вариацией цвета
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (this.pathSet.has(`${c},${r}`)) continue;
        ctx.fillStyle = this.grassColors[`${c},${r}`] || '#4a7c3f';
        ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
      }
    }

    // 2. Декор травы (цветы, камушки, тёмные пятна)
    this.grassDecors.forEach(d => {
      ctx.fillStyle = d.color;
      if (d.type === 2) {
        ctx.fillRect(d.x - d.size / 2, d.y - d.size / 2, d.size, d.size);
      } else {
        ctx.beginPath(); ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2); ctx.fill();
      }
    });

    // 3. Путь — дорога с колеями и обводкой
    for (let i = 0; i < this.pathCoords.length; i++) {
      const [c, r] = this.pathCoords[i];
      const px = c * CELL, py = r * CELL;
      ctx.fillStyle = '#c4a96b';
      ctx.fillRect(px, py, CELL, CELL);

      // Тёмная обводка по краям дороги (где граничит с травой)
      ctx.fillStyle = '#8b7355';
      [[-1,0,0,0,3,CELL],[1,0,CELL-3,0,3,CELL],[0,-1,0,0,CELL,3],[0,1,0,CELL-3,CELL,3]]
        .forEach(([dc,dr,ex,ey,ew,eh]) => {
          if (!this.pathSet.has(`${c+dc},${r+dr}`)) ctx.fillRect(px+ex, py+ey, ew, eh);
        });

      // Колеи
      const dir = this.pathDirMap[`${c},${r}`];
      if (dir) {
        ctx.fillStyle = 'rgba(0,0,0,0.13)';
        const cx = px + CELL / 2, cy = py + CELL / 2;
        if (dir.dx !== 0) {
          ctx.fillRect(px, cy - 9, CELL, 3); ctx.fillRect(px, cy + 6, CELL, 3);
        } else {
          ctx.fillRect(cx - 9, py, 3, CELL); ctx.fillRect(cx + 6, py, 3, CELL);
        }
      }

      // Стрелки направления
      if (this.arrowCells.has(`${c},${r}`) && dir) {
        ctx.save();
        ctx.translate(px + CELL / 2, py + CELL / 2);
        ctx.rotate(Math.atan2(dir.dy, dir.dx));
        ctx.fillStyle = 'rgba(0,0,0,0.22)';
        ctx.beginPath(); ctx.moveTo(7,0); ctx.lineTo(-5,-5); ctx.lineTo(-5,5); ctx.closePath(); ctx.fill();
        ctx.restore();
      }
    }

    // 4. Пятна смерти
    this.deathStains.forEach(s => {
      ctx.save();
      ctx.globalAlpha = (s.life / s.maxLife) * 0.32;
      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });

    // 5. Камни
    this.rocks.forEach(rock => {
      ctx.fillStyle = '#7f8c8d';
      ctx.beginPath();
      ctx.moveTo(rock.x + rock.pts[0].dx, rock.y + rock.pts[0].dy);
      rock.pts.forEach(p => ctx.lineTo(rock.x + p.dx, rock.y + p.dy));
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.beginPath();
      ctx.moveTo(rock.x + rock.pts[0].dx * 0.65, rock.y + rock.pts[0].dy * 0.65);
      rock.pts.slice(0, 3).forEach(p => ctx.lineTo(rock.x + p.dx * 0.65, rock.y + p.dy * 0.65));
      ctx.closePath(); ctx.fill();
    });

    // 6. Кусты
    this.bushes.forEach(b => {
      ctx.fillStyle = '#256325';
      ctx.beginPath(); ctx.arc(b.x - b.r2 * 0.5, b.y + 2, b.r2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(b.x + b.r3 * 0.5, b.y + 3, b.r3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#37803a';
      ctx.beginPath(); ctx.arc(b.x, b.y - 1, b.r1, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.09)';
      ctx.beginPath(); ctx.arc(b.x - 3, b.y - b.r1 * 0.45, b.r1 * 0.42, 0, Math.PI * 2); ctx.fill();
    });

    // 7. Деревья (покачивание)
    const swayT = this.frame * 0.022;
    this.trees.forEach(tr => {
      const sway = Math.sin(swayT + tr.swayOff) * (3 * Math.PI / 180);
      ctx.save();
      ctx.translate(tr.x, tr.y + tr.crown * 0.3);
      // Ствол
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(-tr.trunk / 2, 0, tr.trunk, tr.crown * 0.65);
      // Крона (с покачиванием)
      ctx.rotate(sway);
      ctx.translate(0, -tr.crown * 0.25);
      // Тень кроны
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.beginPath(); ctx.ellipse(4, 5, tr.crown * 0.82, tr.crown * 0.6, 0, 0, Math.PI * 2); ctx.fill();
      // Тёмный слой
      ctx.fillStyle = '#1e6b1e';
      ctx.beginPath(); ctx.arc(0, 0, tr.crown, 0, Math.PI * 2); ctx.fill();
      // Светлый слой
      ctx.fillStyle = '#2d9a2d';
      ctx.beginPath(); ctx.arc(-tr.crown * 0.2, -tr.crown * 0.15, tr.crown * 0.72, 0, Math.PI * 2); ctx.fill();
      // Блик
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.beginPath(); ctx.arc(-tr.crown * 0.32, -tr.crown * 0.38, tr.crown * 0.28, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });

    // 8. Угловые объекты (пропустить если путь проходит через зону)
    const _inZone = (cs, ce, rs, re) =>
      this.pathCoords.some(([c,r]) => c >= cs && c <= ce && r >= rs && r <= re);
    if (!_inZone(0, 2, 0, 1))   this._drawCastle(ctx);
    if (!_inZone(19, 21, 0, 1)) this._drawStatue(ctx);
    if (!_inZone(0, 2, 12, 13)) this._drawRuins(ctx);
    if (!_inZone(19, 21, 11, 13)) this._drawCemetery(ctx);

    // 9. Ворота входа и выхода
    this._drawGates(ctx);

    // 10. Сетка (едва заметная)
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(W, r * CELL); ctx.stroke();
    }
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, H); ctx.stroke();
    }

    // 11. Рамка карты
    ctx.strokeStyle = '#2c4a1e';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, W - 4, H - 4);

    // 12. Overlay времени суток
    const overlays = [null, 'rgba(255,100,0,0.15)', 'rgba(50,50,100,0.25)', 'rgba(0,0,30,0.4)'];
    if (this.dayPhase > 0) {
      ctx.fillStyle = overlays[this.dayPhase];
      ctx.fillRect(0, 0, W, H);
    }

    // 13. Облака
    this.clouds.forEach(cl => {
      ctx.save();
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.ellipse(cl.x, cl.y, cl.w / 2, cl.h / 2, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cl.x - cl.w * 0.27, cl.y + 5, cl.w * 0.33, cl.h * 0.48, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cl.x + cl.w * 0.27, cl.y + 7, cl.w * 0.28, cl.h * 0.42, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });
  }

  initMap() {
    // Dispatch to per-map init (gorge / maze)
    if (typeof MAP_INIT !== 'undefined' && MAP_INIT[this.currentMap?.id]) {
      MAP_INIT[this.currentMap.id](this); return;
    }
    // Угловые зоны (зарезервированы)
    const corners = new Set();
    [[0,0],[19,0],[0,11],[19,11]].forEach(([cc,cr]) => {
      for (let dc = 0; dc < 3; dc++) for (let dr = 0; dr < 3; dr++) corners.add(`${cc+dc},${cr+dr}`);
    });

    // Цвета травы (вариация ±18%)
    this.grassColors = {};
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      if (this.pathSet.has(`${c},${r}`)) continue;
      const v = 0.82 + sr(c, r, 0) * 0.36;
      this.grassColors[`${c},${r}`] = `rgb(${Math.round(74*v)},${Math.round(124*v)},${Math.round(63*v)})`;
    }

    // Мелкий декор травы (15% клеток)
    this.grassDecors = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      if (this.pathSet.has(`${c},${r}`) || corners.has(`${c},${r}`)) continue;
      if (sr(c, r, 1) < 0.15) {
        const type = Math.floor(sr(c, r, 2) * 3); // 0=цветок 1=камушек 2=тёмное пятно
        this.grassDecors.push({
          type,
          x: c * CELL + 5 + sr(c, r, 3) * (CELL - 10),
          y: r * CELL + 5 + sr(c, r, 4) * (CELL - 10),
          color: type === 0 ? (sr(c,r,5) < 0.5 ? '#fffff0' : '#ffe082') : type === 1 ? '#8d9a9a' : '#2a5a24',
          size: type === 0 ? 1.5 + sr(c,r,6)*1.5 : type === 1 ? 3+sr(c,r,6)*3 : 7+sr(c,r,6)*6,
        });
      }
    }

    // Направления пути
    this.pathDirMap = {};
    this.pathCoords.forEach(([c,r], i) => {
      const nxt = this.pathCoords[i+1], prv = this.pathCoords[i-1];
      let dx = 0, dy = 0;
      if (nxt) { dx = nxt[0]-c; dy = nxt[1]-r; }
      else if (prv) { dx = c-prv[0]; dy = r-prv[1]; }
      this.pathDirMap[`${c},${r}`] = { dx, dy };
    });

    // Клетки со стрелками (прямые участки, каждая 3-я)
    this.arrowCells = new Set();
    for (let i = 2; i < this.pathCoords.length - 1; i++) {
      const [c0,r0] = this.pathCoords[i-1], [c1,r1] = this.pathCoords[i], [c2,r2] = this.pathCoords[i+1];
      if ((c1-c0 === c2-c1) && (r1-r0 === r2-r1) && i % 3 === 2) this.arrowCells.add(`${c1},${r1}`);
    }

    // Декоративные объекты
    const taken = new Set([...this.pathSet, ...corners]);

    // Деревья
    this.trees = [];
    for (let seed = 0; this.trees.length < 9 && seed < 400; seed++) {
      const c = Math.floor(sr(seed,0,40) * COLS), r = Math.floor(sr(seed,1,40) * ROWS);
      const key = `${c},${r}`;
      if (taken.has(key)) continue;
      taken.add(key);
      this.trees.push({ x: c*CELL+CELL/2, y: r*CELL+CELL/2,
        trunk: 4+sr(c,r,7)*3, crown: 13+sr(c,r,8)*9,
        swayOff: sr(c,r,9)*Math.PI*2 });
    }

    // Кусты
    this.bushes = [];
    for (let seed = 100; this.bushes.length < 13 && seed < 500; seed++) {
      const c = Math.floor(sr(seed,0,41) * COLS), r = Math.floor(sr(seed,1,41) * ROWS);
      const key = `${c},${r}`;
      if (taken.has(key)) continue;
      taken.add(key);
      this.bushes.push({ x: c*CELL+CELL/2, y: r*CELL+CELL/2,
        r1: 7+sr(c,r,10)*5, r2: 4+sr(c,r,11)*4, r3: 5+sr(c,r,12)*4 });
    }

    // Камни
    this.rocks = [];
    for (let seed = 200; this.rocks.length < 9 && seed < 600; seed++) {
      const c = Math.floor(sr(seed,0,42) * COLS), r = Math.floor(sr(seed,1,42) * ROWS);
      const key = `${c},${r}`;
      if (taken.has(key)) continue;
      taken.add(key);
      const n = 5 + Math.floor(sr(c,r,13)*3);
      const pts = Array.from({length:n}, (_,p) => {
        const a = (p/n)*Math.PI*2, rd = 6+sr(c+p,r,14)*5;
        return { dx: Math.cos(a)*rd, dy: Math.sin(a)*rd };
      });
      this.rocks.push({ x: c*CELL+CELL/2, y: r*CELL+CELL/2, pts });
    }

    // Облака
    this.clouds = Array.from({length:3}, (_,i) => ({
      x:  sr(i,0,50) * COLS * CELL,
      y:  15 + sr(i,1,50) * 55,
      w:  85 + sr(i,2,50) * 65,
      h:  22 + sr(i,3,50) * 14,
      speed: 0.12 + sr(i,4,50) * 0.18,
    }));
  }

  // ─── Замок (верхний левый угол) ──────────────────────────────────────────────
  _drawCastle(ctx) {
    const ox = 0, oy = 0;
    ctx.fillStyle = '#394e38'; ctx.fillRect(ox, oy, 108, 108);
    // Главная стена
    ctx.fillStyle = '#8a8a8a'; ctx.fillRect(ox+14, oy+42, 80, 66);
    ctx.fillStyle = '#767676'; ctx.fillRect(ox+14, oy+42, 80, 7);
    // Кладка (горизонтальные линии)
    ctx.strokeStyle = 'rgba(0,0,0,0.18)'; ctx.lineWidth = 1;
    for (let j = 0; j < 5; j++) { ctx.beginPath(); ctx.moveTo(ox+14,oy+50+j*12); ctx.lineTo(ox+94,oy+50+j*12); ctx.stroke(); }
    // Ворота
    ctx.fillStyle = '#1c1c1c'; ctx.fillRect(ox+39, oy+65, 30, 43);
    ctx.fillStyle = '#282828'; ctx.beginPath(); ctx.arc(ox+54, oy+65, 15, Math.PI, 0); ctx.fill();
    // Решётка ворот
    ctx.strokeStyle = '#5a3a18'; ctx.lineWidth = 2;
    for (let gx = 0; gx < 4; gx++) { ctx.beginPath(); ctx.moveTo(ox+42+gx*7,oy+65); ctx.lineTo(ox+42+gx*7,oy+108); ctx.stroke(); }
    for (let gy = 0; gy < 3; gy++) { ctx.beginPath(); ctx.moveTo(ox+39,oy+72+gy*12); ctx.lineTo(ox+69,oy+72+gy*12); ctx.stroke(); }
    // Левая башня
    ctx.fillStyle = '#979797'; ctx.fillRect(ox+4, oy+24, 28, 84);
    ctx.fillStyle = '#7a7a7a'; ctx.fillRect(ox+4, oy+24, 28, 6);
    for (let bx = 0; bx < 3; bx++) { ctx.fillStyle='#b2b2b2'; ctx.fillRect(ox+5+bx*9,oy+13,7,13); }
    // Правая башня
    ctx.fillStyle = '#979797'; ctx.fillRect(ox+76, oy+24, 28, 84);
    ctx.fillStyle = '#7a7a7a'; ctx.fillRect(ox+76, oy+24, 28, 6);
    for (let bx = 0; bx < 3; bx++) { ctx.fillStyle='#b2b2b2'; ctx.fillRect(ox+77+bx*9,oy+13,7,13); }
    // Зубцы главной стены
    [0,1,4,5].forEach(bx => { ctx.fillStyle='#b2b2b2'; ctx.fillRect(ox+14+bx*13,oy+31,9,13); });
    // Бойницы
    ctx.fillStyle = '#1c1c1c';
    [[10,44],[10,60],[10,76],[93,44],[93,60],[93,76]].forEach(([bx,by]) => ctx.fillRect(ox+bx,oy+by,5,9));
    // Флаги
    ctx.strokeStyle = '#7a5a18'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ox+11,oy+13); ctx.lineTo(ox+11,oy+5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox+82,oy+13); ctx.lineTo(ox+82,oy+5); ctx.stroke();
    ctx.fillStyle = '#c0392b';
    ctx.beginPath(); ctx.moveTo(ox+11,oy+13); ctx.lineTo(ox+22,oy+18); ctx.lineTo(ox+11,oy+23); ctx.fill();
    ctx.beginPath(); ctx.moveTo(ox+82,oy+13); ctx.lineTo(ox+93,oy+18); ctx.lineTo(ox+82,oy+23); ctx.fill();
  }

  // ─── Статуя героя (верхний правый угол) ──────────────────────────────────────
  _drawStatue(ctx) {
    const ox = 19 * CELL, oy = 0;
    ctx.fillStyle = '#394e38'; ctx.fillRect(ox, oy, 108, 108);
    // Постамент
    ctx.fillStyle = '#9a9a9a'; ctx.fillRect(ox+22, oy+68, 64, 40);
    ctx.fillStyle = '#b0b0b0'; ctx.fillRect(ox+18, oy+63, 72, 9);
    ctx.fillStyle = '#787878'; ctx.fillRect(ox+22, oy+100, 64, 8);
    ctx.strokeStyle = 'rgba(0,0,0,0.18)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(ox+22,oy+80); ctx.lineTo(ox+86,oy+80); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ox+22,oy+90); ctx.lineTo(ox+86,oy+90); ctx.stroke();
    ctx.fillStyle = '#585858'; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('HERO', ox+54, oy+97);
    // Фигура воина — тело
    ctx.fillStyle = '#909090';
    ctx.fillRect(ox+45, oy+36, 18, 28); // туловище
    ctx.beginPath(); ctx.arc(ox+54, oy+30, 10, 0, Math.PI*2); ctx.fill(); // голова
    // Плащ
    ctx.fillStyle = '#707070';
    ctx.beginPath(); ctx.moveTo(ox+45,oy+40); ctx.lineTo(ox+33,oy+63); ctx.lineTo(ox+45,oy+63); ctx.fill();
    ctx.beginPath(); ctx.moveTo(ox+63,oy+40); ctx.lineTo(ox+75,oy+63); ctx.lineTo(ox+63,oy+63); ctx.fill();
    // Шлем с гребнем
    ctx.fillStyle = '#808080'; ctx.fillRect(ox+44,oy+20,20,12);
    ctx.fillStyle = '#c0392b'; ctx.fillRect(ox+50,oy+14,8,8);
    // Ноги
    ctx.fillStyle = '#909090';
    ctx.fillRect(ox+45,oy+54,8,14); ctx.fillRect(ox+57,oy+54,8,14);
    // Меч (поднят вверх)
    ctx.fillStyle = '#d4d4d4'; ctx.fillRect(ox+62,oy+4,4,36); // клинок
    ctx.fillStyle = '#8B6914'; ctx.fillRect(ox+57,oy+36,14,5); // гарда
    ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(ox+64,oy+3,4,0,Math.PI*2); ctx.fill();
    // Щит на левой руке
    ctx.fillStyle = '#1a5276';
    ctx.beginPath(); ctx.ellipse(ox+37,oy+46,9,12,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#f39c12'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(ox+37,oy+46,9,12,0,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle = '#f39c12'; ctx.beginPath(); ctx.arc(ox+37,oy+46,3,0,Math.PI*2); ctx.fill();
  }

  // ─── Руины (нижний левый угол) ───────────────────────────────────────────────
  _drawRuins(ctx) {
    const ox = 0, oy = 11 * CELL;
    ctx.fillStyle = '#2d5a2d'; ctx.fillRect(ox, oy, 108, 108);
    // Поваленная колонна
    ctx.fillStyle = '#8a8a8a';
    ctx.save(); ctx.translate(ox+54, oy+85); ctx.rotate(Math.PI/9);
    ctx.fillRect(-38, -7, 76, 14);
    ctx.fillStyle = '#6a6a6a'; ctx.fillRect(-38,-7,76,3);
    ctx.restore();
    // Колонна 1 — высокая
    ctx.fillStyle = '#9a9a9a'; ctx.fillRect(ox+8, oy+28, 14, 80);
    ctx.fillStyle = '#7a7a7a'; ctx.fillRect(ox+8, oy+28, 14, 5);
    ctx.fillStyle = '#b0b0b0'; ctx.fillRect(ox+5, oy+24, 20, 6);
    // Колонна 2 — средняя, сломана
    ctx.fillStyle = '#9a9a9a'; ctx.fillRect(ox+30, oy+48, 12, 60);
    ctx.fillStyle = '#7a7a7a'; ctx.fillRect(ox+30, oy+48, 12, 4);
    ctx.fillStyle = '#b0b0b0'; ctx.fillRect(ox+27, oy+44, 18, 5);
    // Колонна 3 — короткая
    ctx.fillStyle = '#8a8a8a'; ctx.fillRect(ox+55, oy+63, 11, 45);
    ctx.fillStyle = '#6a6a6a'; ctx.fillRect(ox+55, oy+63, 11, 4);
    // Колонна 4 — с капителью
    ctx.fillStyle = '#9a9a9a'; ctx.fillRect(ox+76, oy+38, 13, 70);
    ctx.fillStyle = '#b0b0b0'; ctx.fillRect(ox+73, oy+34, 19, 6);
    // Обломки камней
    [[14,96,9,5],[42,91,7,4],[63,86,8,5],[87,97,6,4],[50,105,10,5]].forEach(([rx,ry,rw,rh]) => {
      ctx.fillStyle = '#787878';
      ctx.beginPath(); ctx.ellipse(ox+rx, oy+ry, rw, rh, 0, 0, Math.PI*2); ctx.fill();
    });
    // Мох на колоннах
    ctx.fillStyle = 'rgba(40,110,40,0.28)';
    ctx.fillRect(ox+8, oy+52, 5, 40); ctx.fillRect(ox+30, oy+68, 4, 32); ctx.fillRect(ox+76, oy+58, 4, 42);
  }

  // ─── Кладбище (нижний правый угол) ───────────────────────────────────────────
  _drawCemetery(ctx) {
    const ox = 19 * CELL, oy = 11 * CELL;
    ctx.fillStyle = '#2d5a1b'; ctx.fillRect(ox, oy, 108, 108);
    // Мёртвые деревья
    ctx.strokeStyle = '#3d2b1a';
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ox+12,oy+108); ctx.lineTo(ox+12,oy+42); ctx.stroke();
    ctx.lineWidth = 1.5;
    [[ox+12,oy+65,ox+2,oy+52],[ox+12,oy+56,ox+25,oy+44],[ox+12,oy+76,ox+0,oy+68]].forEach(([x1,y1,x2,y2]) => {
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    });
    ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(ox+92,oy+108); ctx.lineTo(ox+92,oy+48); ctx.stroke();
    ctx.lineWidth = 1.5;
    [[ox+92,oy+66,ox+80,oy+56],[ox+92,oy+58,ox+103,oy+48],[ox+92,oy+76,ox+104,oy+68]].forEach(([x1,y1,x2,y2]) => {
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    });
    // Надгробия
    // 1 — прямоугольное с аркой
    ctx.fillStyle = '#7a7a8a';
    ctx.fillRect(ox+20,oy+57,16,24); ctx.beginPath(); ctx.arc(ox+28,oy+57,8,Math.PI,0); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('RIP', ox+28, oy+72);
    // 2 — крест
    ctx.fillStyle = '#6a6a7a';
    ctx.fillRect(ox+43,oy+60,8,26); ctx.fillRect(ox+37,oy+66,20,8);
    // 3 — округлое
    ctx.fillStyle = '#7a7a8a';
    ctx.fillRect(ox+59,oy+60,14,22); ctx.beginPath(); ctx.arc(ox+66,oy+60,7,Math.PI,0); ctx.fill();
    // 4 — обелиск
    ctx.fillStyle = '#6a6a7a';
    ctx.beginPath(); ctx.moveTo(ox+84,oy+46); ctx.lineTo(ox+78,oy+78); ctx.lineTo(ox+90,oy+78); ctx.closePath(); ctx.fill();
    // 5 — маленькое
    ctx.fillStyle = '#8a8a9a'; ctx.fillRect(ox+34,oy+84,10,14);
    ctx.beginPath(); ctx.arc(ox+39,oy+84,5,Math.PI,0); ctx.fill();
    // Туман
    ctx.fillStyle = 'rgba(20,0,30,0.22)'; ctx.fillRect(ox, oy+82, 108, 26);
  }

  // ─── Ворота входа (левый край, враги появляются здесь) ───────────────────────
  _drawGates(ctx) {
    if (this.currentMap?.id && this.currentMap.id !== 'ironhold') return;
    const [, entryRow] = this.pathCoords[0];
    const ex = 0, ey = entryRow * CELL;
    ctx.fillStyle = '#7b2d00';
    ctx.fillRect(ex, ey, 5, CELL); ctx.fillRect(ex+CELL-5, ey, 5, CELL);
    ctx.fillRect(ex, ey, CELL, 5);
    ctx.fillStyle = '#ecf0f1';
    ctx.beginPath(); ctx.arc(ex+CELL/2, ey+10, 6, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#7b2d00';
    ctx.fillRect(ex+CELL/2-4, ey+6, 3, 3); ctx.fillRect(ex+CELL/2+1, ey+6, 3, 3);
    ctx.fillRect(ex+CELL/2-3, ey+11, 2, 3); ctx.fillRect(ex+CELL/2+1, ey+11, 2, 3);
    ctx.fillStyle = '#2ecc71'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('ВХОД', ex+CELL/2, ey+CELL-4);
  }

  drawParticles(ctx) {
    this.particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  _drawPauseOverlay(ctx) {
    const W = this.canvas.width, H = this.canvas.height;
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(0, 0, W, H);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(W/2 - 120, H/2 - 50, 240, 100);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(W/2 - 120, H/2 - 50, 240, 100);
    ctx.shadowColor = '#fff'; ctx.shadowBlur = 18;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px sans-serif';
    ctx.fillText('⏸ ПАУЗА', W/2, H/2 - 8);
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '15px sans-serif';
    ctx.fillText('Пробел или ▶ Продолжить', W/2, H/2 + 28);
    ctx.restore();
  }

  drawOverlay(ctx) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ИГРА ОКОНЧЕНА', this.canvas.width / 2, this.canvas.height / 2 - 20);
    ctx.fillStyle = '#fff';
    ctx.font = '24px sans-serif';
    ctx.fillText(`Счёт: ${this.score} | Волна: ${this.wave}`, this.canvas.width / 2, this.canvas.height / 2 + 25);
    ctx.font = '18px sans-serif';
    ctx.fillText('Нажмите F5 для перезапуска', this.canvas.width / 2, this.canvas.height / 2 + 60);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── Final boss appearance effects ─────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════

  _triggerFinalBossAppearance(type) {
    const configs = {
      vortex: {
        text: 'ВОРТЕКС — ЧЕМПИОН МАЛЬКАРА',
        color: '#3498db',
        flashColor: 'rgba(30,100,210,0.55)',
        flashTimer: 1.0,
        timer: 3.0,
        maxTimer: 3.0,
      },
      ksara: {
        text: 'КСАРА — СТРАЖ РУИН',
        color: '#d4ac0d',
        flashColor: 'rgba(180,140,0,0.42)',
        flashTimer: 3.0,
        timer: 3.0,
        maxTimer: 3.0,
      },
      malkar: {
        text: 'МАЛЬКАР ЯВИЛСЯ — ФИНАЛЬНАЯ БИТВА',
        color: '#e74c3c',
        flashColor: 'rgba(0,0,0,0.88)',
        flashTimer: 2.0,
        timer: 4.0,
        maxTimer: 4.0,
      },
    };
    const cfg = configs[type];
    if (!cfg) return;
    this.bossTitleEffect = { ...cfg };
  }

  _drawBossTitleEffect(ctx) {
    const eff = this.bossTitleEffect;
    if (!eff || eff.timer <= 0) return;
    const W = this.canvas.width, H = this.canvas.height;

    // Overlay вспышка
    if (eff.flashTimer > 0) {
      ctx.fillStyle = eff.flashColor;
      ctx.fillRect(0, 0, W, H);
    }

    // Текст с плавным появлением/исчезновением
    const elapsed = eff.maxTimer - eff.timer;
    let alpha = 1;
    if (elapsed < 0.4) alpha = elapsed / 0.4;
    else if (eff.timer < 0.5) alpha = eff.timer / 0.5;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = eff.color;
    ctx.shadowBlur = 24;
    ctx.fillStyle = eff.color;
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText(eff.text, W / 2, H / 2);
    ctx.restore();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── Exit gate system ──────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════

  _initGate() {
    this.gate = {
      shake: 0, shakeMag: 0,
      flash: 0, flashBoss: false,
      knights: [
        { tilt: 0, tiltTimer: 0, recovering: false, fallen: false },
        { tilt: 0, tiltTimer: 0, recovering: false, fallen: false },
      ],
      broken: false,
      debris: [],
    };
  }

  _updateGate() {
    const g = this.gate;
    if (g.shake > 0) g.shake--;

    // Knight tilt → hold → recover
    g.knights.forEach(k => {
      if (k.fallen) return;
      if (k.tilt !== 0 && !k.recovering) {
        k.tiltTimer++;
        if (k.tiltTimer > 10) { k.recovering = true; k.tiltTimer = 0; }
      } else if (k.recovering) {
        k.tilt *= 0.80;
        if (Math.abs(k.tilt) < 0.008) { k.tilt = 0; k.recovering = false; }
      }
    });

    // Debris physics (game over)
    if (g.broken) {
      g.debris.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        d.vy += 0.22; d.rot += d.rotSpeed;
        d.life--;
        d.alpha = Math.min(1, d.life / 25);
      });
      g.debris = g.debris.filter(d => d.life > 0);
    }
  }

  // Called when an enemy reaches the exit
  _gateHit(isBoss) {
    const g = this.gate;
    const exitCoord = this.pathCoords[this.pathCoords.length - 1];
    const GCX = exitCoord[0] * CELL + CELL / 2;
    const GCY = exitCoord[1] * CELL + CELL / 2;

    g.shake     = isBoss ? 38 : 20;
    g.shakeMag  = isBoss ? 5.5 : 2.8;
    g.flash     = isBoss ? 15 : 8;
    g.flashBoss = isBoss;

    // Knight stagger
    if (isBoss) {
      g.knights[0].tilt = -0.44; g.knights[0].tiltTimer = 0; g.knights[0].recovering = false;
      g.knights[1].tilt =  0.44; g.knights[1].tiltTimer = 0; g.knights[1].recovering = false;
    } else {
      const k = g.knights[this.frame % 2];
      k.tilt = (this.frame % 2 === 0) ? -0.30 : 0.30;
      k.tiltTimer = 0; k.recovering = false;
    }

    // Floating damage label
    this.gateLabels.push({
      text: isBoss ? '-5' : '-1',
      x: GCX + (Math.random() - 0.5) * 16,
      y: GCY - 8,
      color: isBoss ? '#ff2200' : '#ff8833',
      size: isBoss ? 24 : 16,
      life: 58, maxLife: 58, alpha: 1,
    });

    // Sparks burst
    const cnt = isBoss ? 20 : 9;
    for (let i = 0; i < cnt; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd   = 1.5 + Math.random() * (isBoss ? 4.5 : 3);
      this.particles.push({
        x: GCX - 4 + Math.random() * 8, y: GCY + (Math.random() - 0.5) * 16,
        vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd - 1.5,
        color: i % 3 === 0 ? '#ffcc00' : i % 3 === 1 ? '#ff6600' : '#ffffff',
        life: 18 + Math.random() * 20, maxLife: 38, alpha: 1,
        size: 1.5 + Math.random() * 2.5,
      });
    }

    // Brief flash circle at gate opening
    this.particles.push({
      x: GCX - 6, y: GCY,
      vx: 0, vy: 0,
      color: isBoss ? '#ff2200' : '#ffaa33',
      life: 7, maxLife: 7, alpha: 0.75,
      size: isBoss ? 24 : 18,
    });
  }

  // Called when lives reach 0
  _gateBreak() {
    const g = this.gate;
    g.broken   = true;
    g.shake    = 60;
    g.shakeMag = 8;

    const exitCoord2 = this.pathCoords[this.pathCoords.length - 1];
    const GX = exitCoord2[0] * CELL;
    const GY = Math.max(0, exitCoord2[1] - 2) * CELL;   // top of gate structure

    // Stone + wood debris
    for (let i = 0; i < 18; i++) {
      const px = GX + Math.random() * 36;
      const py = GY + Math.random() * 144;
      g.debris.push({
        x: px, y: py,
        vx: (Math.random() - 0.55) * 7,
        vy: -2.5 - Math.random() * 5,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.20,
        w: 8 + Math.random() * 14, h: 5 + Math.random() * 10,
        color: Math.random() < 0.35 ? '#5d3a1a' : '#808090',
        life: 85 + Math.random() * 45, alpha: 1,
      });
    }

    // Both knights fall outward
    g.knights[0].fallen = true;
    g.knights[1].fallen = true;

    // Explosion sparks
    for (let i = 0; i < 35; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd   = 2 + Math.random() * 6;
      this.particles.push({
        x: GX + 18, y: GY + 72,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 3,
        color: i % 3 === 0 ? '#ff6600' : i % 3 === 1 ? '#ffcc00' : '#ff2200',
        life: 30 + Math.random() * 35, maxLife: 65, alpha: 1,
        size: 2 + Math.random() * 4,
      });
    }
  }

  // ── Gate rendering ──────────────────────────────────────────────────────────

  _drawExitGate(ctx) {
    const g    = this.gate;
    const exitCoord = this.pathCoords[this.pathCoords.length - 1];
    const exitRow   = exitCoord[1];
    const GX   = exitCoord[0] * CELL;
    const pathY = exitRow * CELL;
    const GY   = Math.max(0, exitRow - 2) * CELL;
    const GW   = this.canvas.width - GX;
    const GH   = 4 * CELL;
    const cx   = GX + GW / 2;

    // ── Shake offset ──
    let sx = 0, sy = 0;
    if (g.shake > 0 && !g.broken) {
      const pct = g.shake / (g.flashBoss ? 38 : 20);
      sx = Math.sin(this.frame * 2.6) * g.shakeMag * pct;
      sy = Math.cos(this.frame * 1.9) * g.shakeMag * 0.5 * pct;
    }

    // ── Broken gate: rubble + fallen knights + flying debris ──
    if (g.broken) {
      ctx.save();
      // Crumbled rubble at top and bottom
      ctx.fillStyle = '#55555e';
      ctx.fillRect(GX, GY, GW, 14);
      ctx.fillRect(GX, GY + GH - 18, GW, 18);
      // Scattered stone chunks
      [[GX+4,GY+12,10,7],[GX+18,GY+8,8,5],[GX+6,GY+GH-24,12,6]].forEach(([rx,ry,rw,rh]) => {
        ctx.fillStyle = '#70707a'; ctx.fillRect(rx, ry, rw, rh);
      });
      // Debris pieces
      g.debris.forEach(d => {
        ctx.save();
        ctx.globalAlpha = d.alpha;
        ctx.translate(d.x, d.y); ctx.rotate(d.rot);
        ctx.fillStyle = d.color;
        ctx.fillRect(-d.w / 2, -d.h / 2, d.w, d.h);
        ctx.restore();
      });
      // Fallen knight 1 (top) — lying face-left
      ctx.save();
      ctx.translate(cx, GY + 22);
      ctx.rotate(-Math.PI / 2);
      this._drawKnight(ctx);
      ctx.restore();
      // Fallen knight 2 (bottom) — lying face-right
      ctx.save();
      ctx.translate(cx, GY + GH - 22);
      ctx.rotate(Math.PI / 2);
      this._drawKnight(ctx);
      ctx.restore();
      ctx.restore();
      return;
    }

    ctx.save();
    ctx.translate(sx, sy);

    // ── Stone wall (4 rows, full height) ──
    ctx.fillStyle = '#7a7a84';
    ctx.fillRect(GX, GY, GW, GH);

    // Brickwork texture
    ctx.strokeStyle = 'rgba(0,0,0,0.20)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      ctx.beginPath(); ctx.moveTo(GX, GY + i * 36); ctx.lineTo(GX + GW, GY + i * 36); ctx.stroke();
    }
    [GY+7, GY+19, GY+43, GY+55, GY+79, GY+91, GY+115, GY+127].forEach(by => {
      ctx.beginPath(); ctx.moveTo(GX + GW / 2, by); ctx.lineTo(GX + GW / 2, by + 12); ctx.stroke();
    });
    // Stone highlight on left edge
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.fillRect(GX, GY, 3, GH);

    // ── Gate opening (dark passage, row 6) ──
    ctx.fillStyle = '#120a00';
    ctx.fillRect(GX + 3, pathY + 1, GW - 3, CELL - 1);

    // ── Wooden door (half-open, pushed to right/canvas edge) ──
    ctx.fillStyle = '#6b4020';
    ctx.fillRect(GX + 21, pathY + 2, GW - 22, CELL - 3);
    ctx.strokeStyle = '#3d200a'; ctx.lineWidth = 1;
    for (let pi = 0; pi < 5; pi++) {
      ctx.beginPath(); ctx.moveTo(GX + 21, pathY + 5 + pi * 6); ctx.lineTo(GX + GW, pathY + 5 + pi * 6); ctx.stroke();
    }
    // Iron reinforcement band
    ctx.fillStyle = '#383838'; ctx.fillRect(GX + 21, pathY + 17, GW - 21, 3);
    // Hinges
    ctx.fillStyle = '#484848';
    ctx.fillRect(GX + 19, pathY + 5,  4, 5);
    ctx.fillRect(GX + 19, pathY + 25, 4, 5);
    ctx.fillStyle = '#909090';
    ctx.beginPath(); ctx.arc(GX + 21, pathY + 7,  1.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(GX + 21, pathY + 27, 1.5, 0, Math.PI * 2); ctx.fill();

    // ── Stone arch over opening ──
    const archTop = pathY - 9;
    ctx.fillStyle = '#8a8a94';
    // Pillar edges
    ctx.fillRect(GX, pathY, 4, CELL);
    // Arch fill
    ctx.beginPath();
    ctx.moveTo(GX + 3, pathY);
    ctx.lineTo(GX + 3, archTop + 3);
    ctx.quadraticCurveTo(cx, archTop - 5, GX + GW, archTop + 3);
    ctx.lineTo(GX + GW, pathY);
    ctx.fill();
    // Arch highlight
    ctx.strokeStyle = '#b4b4be'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(GX + 5, pathY - 1);
    ctx.quadraticCurveTo(cx, archTop - 2, GX + GW - 2, pathY - 1);
    ctx.stroke();
    // Keystone (gold-edged)
    ctx.fillStyle = '#686872';
    ctx.beginPath();
    ctx.moveTo(cx - 5, archTop - 1);
    ctx.lineTo(cx + 5, archTop - 1);
    ctx.lineTo(cx + 3, pathY);
    ctx.lineTo(cx - 3, pathY);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#c8a020'; ctx.lineWidth = 1;
    ctx.stroke();

    // ── Battlements on top ──
    ctx.fillStyle = '#8a8a94';
    ctx.fillRect(GX, GY - 6, GW, 7);  // base
    [GX + 3, GX + 17].forEach(bx => {
      ctx.fillRect(bx, GY - 14, 10, 9);
    });

    // ── Crest (row 4 upper half) ──
    this._drawGateCrest(ctx, cx, GY + 18);

    // ── Top knight (row 5 centre) ──
    const k0 = g.knights[0];
    ctx.save();
    ctx.translate(cx, GY + 54);
    ctx.rotate(k0.tilt);
    this._drawKnight(ctx);
    ctx.restore();

    // ── Bottom knight (row 7 centre) ──
    const k1 = g.knights[1];
    ctx.save();
    ctx.translate(cx, GY + 126);
    ctx.rotate(k1.tilt);
    this._drawKnight(ctx);
    ctx.restore();

    // ── Hit flash overlay ──
    if (g.flash > 0) {
      const maxF  = g.flashBoss ? 15 : 8;
      const alpha = (g.flash / maxF) * (g.flashBoss ? 0.52 : 0.32);
      ctx.fillStyle = g.flashBoss ? `rgba(255,20,0,${alpha})` : `rgba(255,130,20,${alpha})`;
      ctx.fillRect(GX, GY - 14, GW, GH + 14);
      g.flash--;
    }

    ctx.restore();
  }

  // ── Knight sprite (drawn at ctx origin, caller handles translate/rotate) ──
  _drawKnight(ctx) {
    // Wings
    ctx.fillStyle = '#e0eaff';
    ctx.beginPath();
    ctx.moveTo(-4, -6); ctx.lineTo(-18, -15); ctx.lineTo(-15, -1); ctx.lineTo(-6, 2);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#c8a020'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(4, -6); ctx.lineTo(18, -15); ctx.lineTo(15, -1); ctx.lineTo(6, 2);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    // Wing gold feather lines
    ctx.strokeStyle = 'rgba(200,160,32,0.5)'; ctx.lineWidth = 0.8;
    [[-14,-12,-8,0],[-10,-13,-5,-1]].forEach(([x1,y1,x2,y2]) => {
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    });
    [[14,-12,8,0],[10,-13,5,-1]].forEach(([x1,y1,x2,y2]) => {
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    });

    // Torso / breastplate
    ctx.fillStyle = '#b2bcc8'; ctx.fillRect(-5, -2, 10, 10);
    ctx.fillStyle = '#ccd4de'; ctx.fillRect(-3, -1, 6, 7);
    // Cross insignia
    ctx.strokeStyle = '#c8a020'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0,-1); ctx.lineTo(0,8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-3,3); ctx.lineTo(3,3); ctx.stroke();
    // Pauldrons
    ctx.fillStyle = '#909aa6';
    ctx.fillRect(-7,-3,4,3); ctx.fillRect(3,-3,4,3);

    // Helmet
    ctx.fillStyle = '#909aa6'; ctx.fillRect(-4,-12,8,10);
    ctx.fillStyle = '#606870'; ctx.fillRect(-3,-10,6,4);
    // Eye-slit glow
    ctx.fillStyle = '#ffe880'; ctx.fillRect(-2.5,-9,5,1.5);
    // Crest
    ctx.fillStyle = '#c0392b'; ctx.fillRect(-1.5,-19,3,8);

    // Shield (left arm)
    ctx.fillStyle = '#1a4a8a';
    ctx.beginPath();
    ctx.moveTo(-12,-3); ctx.lineTo(-7,-3); ctx.lineTo(-7,5);
    ctx.quadraticCurveTo(-12,9,-12,5); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#c8a020'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#c8a020'; ctx.beginPath(); ctx.arc(-9.5,1.5,1.5,0,Math.PI*2); ctx.fill();

    // Sword (right arm, upright)
    ctx.strokeStyle = '#d4e0ec'; ctx.lineWidth = 2; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(9,10); ctx.lineTo(9,-22); ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(6,-16); ctx.lineTo(12,-16); ctx.stroke();
    ctx.fillStyle = '#c8a020'; ctx.beginPath(); ctx.arc(9,11,2,0,Math.PI*2); ctx.fill();

    // Legs / boots
    ctx.fillStyle = '#909aa6';
    ctx.fillRect(-4,8,3,8); ctx.fillRect(1,8,3,8);
    ctx.fillStyle = '#707880';
    ctx.fillRect(-4,15,3,2); ctx.fillRect(1,15,3,2);
  }

  // ── Ironhold crest (shield + crown + sword) drawn at (cx, cy) ──
  _drawGateCrest(ctx, cx, cy) {
    ctx.save();
    ctx.translate(cx, cy);

    // Shield body
    ctx.fillStyle = '#1a3a6a';
    ctx.beginPath();
    ctx.moveTo(-10,-12); ctx.lineTo(10,-12); ctx.lineTo(10,2);
    ctx.quadraticCurveTo(10,13, 0,16);
    ctx.quadraticCurveTo(-10,13,-10,2);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#c8a020'; ctx.lineWidth = 1.5; ctx.stroke();

    // Sword on shield
    ctx.strokeStyle = '#c8d4e0'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0,11); ctx.lineTo(0,-8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-5,-2); ctx.lineTo(5,-2); ctx.stroke();
    ctx.fillStyle = '#c8a020'; ctx.beginPath(); ctx.arc(0,12,2,0,Math.PI*2); ctx.fill();

    // Crown
    ctx.fillStyle = '#c8a020';
    ctx.beginPath();
    ctx.moveTo(-9,-12); ctx.lineTo(-9,-18);
    ctx.lineTo(-4,-14); ctx.lineTo(0,-21);
    ctx.lineTo(4,-14);  ctx.lineTo(9,-18);
    ctx.lineTo(9,-12);
    ctx.fill();
    ctx.fillStyle = '#e74c3c'; ctx.beginPath(); ctx.arc(0,-19,2,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#c8a020'; ctx.beginPath(); ctx.arc(-5,-16,1.2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(5,-16,1.2,0,Math.PI*2); ctx.fill();

    ctx.restore();
  }

  // ── Floating damage labels near the gate ──
  _drawGateLabels(ctx) {
    this.gateLabels.forEach(l => {
      ctx.save();
      ctx.globalAlpha = l.alpha;
      ctx.font        = `bold ${l.size}px sans-serif`;
      ctx.textAlign   = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor  = '#000';
      ctx.shadowBlur   = 5;
      ctx.fillStyle    = l.color;
      ctx.fillText(l.text, l.x, l.y);
      ctx.restore();
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════

  _handleLegendaryEffect(eff) {
    eff.hits.forEach(e => {
      if (e.dead) {
        this.gold  += this._enemyGold(e);
        this.score += e.reward * 2;
        this.spawnParticles(e.x, e.y, eff.type === 'orbital' ? '#00ccff' : '#ff4500');
        this.deathStains.push({ x: e.x, y: e.y, r: e.size * 2, life: 180, maxLife: 180 });
        this.achievements.onEnemyKilled(e);
      }
    });
    if (eff.type === 'meteor')    this._spawnMeteorEffect(eff.x, eff.y, eff.radius);
    if (eff.type === 'orbital')   this._spawnOrbitalEffect(eff.x, eff.y);
    if (eff.type === 'lightball') {
      this.lightningBalls.push(new LightningBallEffect(this.path));
      this.ui.showMessage('⚡ Шаровая молния!', 2200);
    }
    if (eff.type === 'timefreeze') {
      this._timeFreezeGlobalCD = 30;
      this._spawnTimeFreezeEffect();
    }
  }

  _spawnMeteorEffect(x, y, radius) {
    // Ударная волна (большая вспышка)
    this.particles.push({ x, y, vx: 0, vy: 0, color: '#ff4500', life: 22, maxLife: 22, alpha: 0.85, size: radius * 0.9 });
    this.particles.push({ x, y, vx: 0, vy: 0, color: '#ffcc00', life: 12, maxLife: 12, alpha: 0.7,  size: radius * 0.45 });
    // Осколки
    for (let i = 0; i < 28; i++) {
      const a = Math.random() * Math.PI * 2, spd = 2 + Math.random() * 6;
      this.particles.push({
        x: x + (Math.random()-0.5)*20, y: y + (Math.random()-0.5)*20,
        vx: Math.cos(a)*spd, vy: Math.sin(a)*spd - 3,
        color: i%3===0?'#ff6600':i%3===1?'#ffcc00':'#ff2200',
        life: 30+Math.random()*30, maxLife: 60, alpha: 1, size: 3+Math.random()*5,
      });
    }
    // След сверху
    for (let i = 0; i < 10; i++) {
      this.particles.push({
        x: x + (Math.random()-0.5)*12, y: y - i*14,
        vx: (Math.random()-0.5)*0.6, vy: 4+Math.random()*2,
        color: i<4?'#ff2200':'#ff6600', life: 12+i*2, maxLife: 28, alpha: 0.8, size: 5-i*0.4,
      });
    }
    this.ui.showMessage('☄ Метеорит!', 1800);
  }

  _spawnOrbitalEffect(x, y) {
    // Луч сверху
    for (let i = 0; i < 18; i++) {
      this.particles.push({
        x: x + (Math.random()-0.5)*10, y: i * 12,
        vx: 0, vy: 9,
        color: i%2===0?'#00aaff':'#ffffff',
        life: 18, maxLife: 18, alpha: 0.9, size: 4+Math.random()*3,
      });
    }
    // Вспышка в точке удара
    this.particles.push({ x, y, vx: 0, vy: 0, color: '#00ccff', life: 28, maxLife: 28, alpha: 0.9, size: 44 });
    for (let i = 0; i < 16; i++) {
      const a = Math.random()*Math.PI*2, spd = 1.5+Math.random()*4;
      this.particles.push({
        x, y,
        vx: Math.cos(a)*spd, vy: Math.sin(a)*spd,
        color: i%2===0?'#00aaff':'#ffffff',
        life: 20+Math.random()*20, maxLife: 40, alpha: 1, size: 2+Math.random()*4,
      });
    }
    this.ui.showMessage('⚡ Орбитальный удар!', 1800);
  }

  _spawnTimeFreezeEffect() {
    // Full-screen purple flash
    this.particles.push({ x: this.canvas.width/2, y: this.canvas.height/2, vx:0, vy:0, color:'#9b59b6', life:35, maxLife:35, alpha:0.3, size:500 });
    for (let i = 0; i < 24; i++) {
      const a = Math.random()*Math.PI*2, spd = 2+Math.random()*5;
      this.particles.push({
        x: this.canvas.width/2, y: this.canvas.height/2,
        vx: Math.cos(a)*spd, vy: Math.sin(a)*spd,
        color: i%2===0?'#9b59b6':'#d7bde2',
        life: 25+Math.random()*25, maxLife:50, alpha:1, size:3+Math.random()*4,
      });
    }
    this.ui.showMessage('⏳ Остановка времени! Все враги заморожены!', 3000);
  }

  loop() {
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      this.update(dt);
      this.draw();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}

window.addEventListener('load', () => {
  const canvas = document.getElementById('gameCanvas');
  window.game = new Game(canvas);
});

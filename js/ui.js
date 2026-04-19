class UI {
  constructor(game) {
    this.game = game;
    this.selectedTowerType = null;
    this.goldEl    = document.getElementById('gold');
    this.livesEl   = document.getElementById('lives');
    this.waveEl    = document.getElementById('wave');
    this.scoreEl   = document.getElementById('score');
    this.startBtn  = document.getElementById('startWave');
    this.messageEl = document.getElementById('message');
    this.upgradePanel = document.getElementById('upgradePanel');
    this.towerButtons = {};
    this.initButtons();
  }

  initButtons() {
    // Tower placement buttons
    document.querySelectorAll('.tower-btn').forEach(btn => {
      const type = btn.dataset.type;
      this.towerButtons[type] = btn;
      btn.addEventListener('click', () => {
        if (this.selectedTowerType === type) {
          this.selectedTowerType = null;
          btn.classList.remove('active');
        } else {
          this.selectedTowerType = type;
          Object.values(this.towerButtons).forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.game.deselectTower();
        }
      });
    });

    // Start wave (with optional event modal at waves divisible by 5)
    this.startBtn.addEventListener('click', () => {
      if (this.game.waveInProgress) return;
      const nextWave = this.game.wave + 1;
      if (nextWave > 0 && nextWave % 5 === 0) {
        const ev = EVENTS[Math.floor(Math.random() * EVENTS.length)];
        this.showEventModal(ev, () => this.game.startWave());
      } else {
        this.game.startWave();
      }
    });

    // Sell
    document.getElementById('sellTower').addEventListener('click', () => {
      const t = this.game.selectedTower;
      if (!t) return;
      this.game.gold += t.getSellValue();
      this.game.removeTower(t);
      this.game.deselectTower();
    });

    // Within-path upgrade button
    document.getElementById('upgradeTower').addEventListener('click', () => {
      const t = this.game.selectedTower;
      if (!t || (!t.chosenPath && !t.isLinear)) return;
      const up = t.getNextUpgrade();
      if (!up || this.game.gold < up.cost) return;
      this.game.gold -= up.cost;
      t.upgrade();
      this.updateUpgradePanel(t);
    });

    // Path choice buttons (A and B)
    document.getElementById('pathABtn').addEventListener('click', () => this._pickPath('A'));
    document.getElementById('pathBBtn').addEventListener('click', () => this._pickPath('B'));

    // Legendary upgrade
    document.getElementById('legendaryUpgrade').addEventListener('click', () => {
      const t = this.game.selectedTower;
      if (!t) return;
      const leg = TOWER_DEFS[t.type]?.legendary;
      if (!leg || t.legendary) return;
      if (this.game.gold < leg.cost) { this.showMessage('Недостаточно золота!'); return; }
      this.game.gold -= leg.cost;
      t.buyLegendary();
      this.game.achievements.onLegendaryBought();
      this.updateUpgradePanel(t);
      this.showMessage(`★ ${leg.name} активировано!`, 2500);
    });

    // Pause button
    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) pauseBtn.addEventListener('click', () => this.game.togglePause());

    // Achievement button
    document.getElementById('achBtn').addEventListener('click', () => this.game.achievements.showScreen());
    document.getElementById('achCloseBtn').addEventListener('click', () => {
      document.getElementById('achModal').style.display = 'none';
    });

    // Upgrade popup close button
    document.getElementById('upgradePanelClose').addEventListener('click', () => {
      this.game.deselectTower();
    });

    this.initKnowledgeBook();
    this.initHealButton();
    this.initBoostsPanel();
  }

  initHealButton() {
    document.getElementById('healBtn').addEventListener('click', () => {
      const g = this.game;
      if (g.waveInProgress) return;
      if (g.healUsedCount >= 3) { this.showMessage('Лимит лечения (3/3)!'); return; }
      if (g.gold < 60) { this.showMessage('Недостаточно золота!'); return; }
      g.gold -= 60;
      g.lives++;
      g.healUsedCount++;
      this.showMessage(`❤ Лечение! +1 жизнь (${g.healUsedCount}/3)`, 1500);
    });
  }

  initBoostsPanel() {
    document.getElementById('furyBtn').addEventListener('click', () => {
      const g = this.game;
      if (g.waveInProgress || g.furyActive) return;
      if (g.gold < 80) { this.showMessage('Недостаточно золота!'); return; }
      g.gold -= 80;
      g.furyActive = true;
      g.achievements.onBoostUsed();
      this.showMessage('⚔ Ярость активна! +50% урона на эту волну', 2000);
    });
    document.getElementById('freezeBtn').addEventListener('click', () => {
      const g = this.game;
      if (g.waveInProgress || g.freezeActive) return;
      if (g.gold < 60) { this.showMessage('Недостаточно золота!'); return; }
      g.gold -= 60;
      g.freezeActive = true;
      g.achievements.onBoostUsed();
      this.showMessage('❄ Заморозка! Первые 8 врагов замедлены', 2000);
    });
    document.getElementById('fortifyBtn').addEventListener('click', () => {
      const g = this.game;
      if (g.waveInProgress || g.fortifyActive) return;
      if (g.gold < 90) { this.showMessage('Недостаточно золота!'); return; }
      g.gold -= 90;
      g.fortifyActive = true;
      g.achievements.onBoostUsed();
      this.showMessage('🛡 Фортификация! +5 жизней на следующую волну', 2000);
    });
  }

  showEventModal(ev, onDone) {
    const modal    = document.getElementById('eventModal');
    const titleEl  = document.getElementById('eventTitle');
    const descEl   = document.getElementById('eventDesc');
    const choicesEl= document.getElementById('eventChoices');

    titleEl.textContent  = ev.title;
    descEl.textContent   = ev.desc;
    choicesEl.innerHTML  = '';
    modal.style.display  = 'flex';

    ev.choices.forEach(ch => {
      const btn = document.createElement('button');
      btn.className   = 'event-choice-btn';
      btn.textContent = ch.label;
      btn.addEventListener('click', () => {
        ch.fn(this.game);
        modal.style.display = 'none';
        onDone();
      });
      choicesEl.appendChild(btn);
    });
  }

  _pickPath(key) {
    const t = this.game.selectedTower;
    if (!t || t.chosenPath !== null) return;
    const path = TOWER_PATHS[t.type][key];
    if (this.game.gold < path.cost) { this.showMessage('Недостаточно золота!'); return; }
    this.game.gold -= path.cost;
    t.choosePath(key);
    this.updateUpgradePanel(t);
  }

  updatePauseBtn() {
    const btn = document.getElementById('pauseBtn');
    if (!btn) return;
    const canPause = this.game.waveInProgress && !this.game.gameOver && !this.game.gameOverPending;
    btn.disabled = !canPause;
    btn.textContent = this.game.paused ? '▶ Продолжить' : '⏸ Пауза';
    btn.classList.toggle('active', this.game.paused);
  }

  deselect() {
    this.selectedTowerType = null;
    Object.values(this.towerButtons).forEach(b => b.classList.remove('active'));
  }

  update() {
    this.goldEl.textContent  = this.game.gold;
    this.livesEl.textContent = this.game.lives;
    this.waveEl.textContent  = this.game.wave;
    this.scoreEl.textContent = this.game.score;
    const mapNameEl = document.getElementById('mapName');
    if (mapNameEl && this.game.currentMap) mapNameEl.textContent = this.game.currentMap.name;
    this.startBtn.disabled   = this.game.waveInProgress || !this.game.storyReady || this.game.victory;
    this.updatePauseBtn();
    this.startBtn.textContent = this.game.waveInProgress
      ? `Волна ${this.game.wave}...`
      : `Начать волну ${this.game.wave + 1}`;

    const mineCount = this.game.towers.filter(t => t.isMine).length;
    const timeCount = this.game.towers.filter(t => t.type === 'time').length;
    Object.entries(this.towerButtons).forEach(([type, btn]) => {
      const def = TOWER_DEFS[type];
      const locked = !!(def.unlockWave && this.game.wave < def.unlockWave);
      const tooExpensive = !locked && this.game.gold < def.cost;
      const mineFull = type === 'mine' && mineCount >= 5;
      const timeFull = type === 'time' && timeCount >= 2;
      btn.classList.toggle('tower-locked', locked);
      btn.classList.toggle('cant-afford', !locked && (tooExpensive || mineFull || timeFull));
      btn.disabled = locked;
      if (locked) btn.title = `Открывается с волны ${def.unlockWave}`;
      else if (type === 'mine') btn.title = mineFull ? 'Максимум 5 шахт' : '';
      else if (type === 'time') btn.title = timeFull ? 'Максимум 2 башни времени' : '';
      else btn.title = '';
    });

    // Air warning indicator
    const hasAir = this.game.enemies.some(e => e.air && !e.dead && !e.reached);
    const airWrap = document.getElementById('airWrap');
    if (airWrap) airWrap.style.display = hasAir ? 'flex' : 'none';

    // Heal & Boosts panels — only between waves (and after first wave started)
    const betweenWaves = !this.game.waveInProgress && this.game.wave > 0;
    const healPanel    = document.getElementById('healPanel');
    const boostsPanel  = document.getElementById('boostsPanel');
    if (healPanel)   healPanel.style.display   = betweenWaves ? 'block' : 'none';
    if (boostsPanel) boostsPanel.style.display = betweenWaves ? 'block' : 'none';

    // Heal button state
    const healBtn = document.getElementById('healBtn');
    if (healBtn) {
      const hUsed = this.game.healUsedCount;
      healBtn.textContent = `💊 Лечение (+1 ❤) — 60g  [${3-hUsed}/3]`;
      healBtn.disabled = hUsed >= 3 || this.game.gold < 60;
    }

    // Boost button states
    const g = this.game;
    const furyBtn    = document.getElementById('furyBtn');
    const freezeBtn  = document.getElementById('freezeBtn');
    const fortifyBtn = document.getElementById('fortifyBtn');
    if (furyBtn) {
      furyBtn.disabled    = g.furyActive || g.gold < 80;
      furyBtn.textContent = g.furyActive ? '⚔ Ярость — активна' : '⚔ Ярость — 80g (+50% урон)';
    }
    if (freezeBtn) {
      freezeBtn.disabled    = g.freezeActive || g.gold < 60;
      freezeBtn.textContent = g.freezeActive ? '❄ Заморозка — активна' : '❄ Заморозка — 60g (замед. 8 врагов)';
    }
    if (fortifyBtn) {
      fortifyBtn.disabled    = g.fortifyActive || g.gold < 90;
      fortifyBtn.textContent = g.fortifyActive ? '🛡 Фортификация — активна' : '🛡 Фортификация — 90g (+5 ❤)';
    }

    // HUD active boost indicator
    const boostHUD  = document.getElementById('boostHUD');
    const boostText = document.getElementById('boostHUDText');
    if (boostHUD && boostText) {
      const tags = [];
      if (g.furyActive)          tags.push('⚔ Ярость');
      if (g.freezeActive)        tags.push('❄ Заморозка');
      if (g.fortifyActive)       tags.push('🛡 Форт.');
      if (g.raidActive)          tags.push('⚔ Набег');
      if (g.plagueWavesLeft > 0) tags.push(`☠ Чума(${g.plagueWavesLeft})`);
      if (tags.length > 0) {
        boostHUD.style.display  = 'flex';
        boostText.textContent   = tags.join(' | ');
      } else {
        boostHUD.style.display  = 'none';
      }
    }

    // Автоволна: обратный отсчёт
    const cdWrap = document.getElementById('countdownWrap');
    const cdEl   = document.getElementById('countdown');
    if (cdWrap && cdEl) {
      const cd = this.game.autoWaveCountdown;
      if (cd > 0 && !this.game.waveInProgress) {
        cdWrap.style.display = 'flex';
        cdEl.textContent = Math.ceil(cd / 60);
      } else {
        cdWrap.style.display = 'none';
      }
    }
  }

  showUpgradePanel(tower) {
    this.upgradePanel.style.display = 'block';
    this._positionPanel(tower);
    this.updateUpgradePanel(tower);
  }

  _positionPanel(tower) {
    const panel  = this.upgradePanel;
    const canvas = this.game.canvas;
    const rect   = canvas.getBoundingClientRect();
    // Scale factor between canvas attribute size and CSS rendered size
    const sx = rect.width  / canvas.width;
    const sy = rect.height / canvas.height;
    // Tower centre in CSS px relative to the canvasWrap content area
    const tx = tower.x * sx;
    const ty = tower.y * sy;
    const canvasW = rect.width;
    const canvasH = rect.height;
    const pw   = 210;    // panel CSS width
    const ph   = 290;    // approx panel height (for bottom-clamping)
    const half = (CELL * sx) / 2;
    const gap  = 6;
    // Prefer right side; fall back to left
    let left = tx + half + gap;
    if (left + pw > canvasW - 4) left = tx - half - pw - gap;
    left = Math.max(4, Math.min(canvasW - pw - 4, left));
    // Align top with tower, clamp vertically
    let top = ty - half;
    top = Math.max(4, Math.min(canvasH - ph - 4, top));
    panel.style.left = Math.round(left) + 'px';
    panel.style.top  = Math.round(top)  + 'px';
  }

  updateUpgradePanel(tower) {
    // Header
    document.getElementById('towerName').textContent = tower.name +
      (tower.chosenPath ? ` · ${TOWER_PATHS[tower.type][tower.chosenPath].name}` : '');

    // Stats line
    let statsHTML;
    if (tower.isMine) {
      statsHTML = `Доход: <b style="color:#f39c12">+${tower.mineIncome}g</b> за волну`;
    } else if (tower.isAura) {
      statsHTML = `Аура: <b style="color:#9b59b6">${Math.round((1 - tower.auraSlowFactor) * 100)}% замедление</b> | Радиус: <b>${tower.range}</b>`;
    } else {
      statsHTML = `Урон: <b>${tower.damage}</b> | Радиус: <b>${tower.range}</b> | Скорость: <b>${tower.fireRate}</b>`;
      if (tower.pierce)  statsHTML += ' | <span style="color:#9b59b6">⚡ Пробивание</span>';
      if (tower.burn)    statsHTML += ' | <span style="color:#e67e22">🔥 Ожог</span>';
      if (tower.poison)  statsHTML += ' | <span style="color:#27ae60">☠ Яд</span>';
      if (tower.nuclear) statsHTML += ' | <span style="color:#e74c3c">☢ Ядерный</span>';
    }
    document.getElementById('towerStats').innerHTML = statsHTML;

    // Sell button
    document.getElementById('sellTower').textContent = `Продать (${tower.getSellValue()}g)`;

    const pathChoose  = document.getElementById('pathChoose');
    const pathChosen  = document.getElementById('pathChosen');
    const upgBtn      = document.getElementById('upgradeTower');
    const badge       = document.getElementById('chosenBadge');
    const list        = document.getElementById('upgradeList');

    if (tower.isLinear) {
      // ── Linear upgrades (e.g. Anti-air) — no path selection ─────
      pathChoose.style.display = 'none';
      pathChosen.style.display = 'block';
      if (tower.isMine) {
        badge.textContent      = '⛏ Шахта';
        badge.style.background = '#2a1a00';
        badge.style.borderColor= '#c8922a';
        badge.style.color      = '#f39c12';
      } else if (tower.type === 'lightning') {
        badge.textContent      = '⚡ Башня Молнии';
        badge.style.background = '#2a1f00';
        badge.style.borderColor= '#f1c40f';
        badge.style.color      = '#f1c40f';
      } else if (tower.type === 'time') {
        badge.textContent      = '⏳ Башня Времени';
        badge.style.background = '#1a0030';
        badge.style.borderColor= '#9b59b6';
        badge.style.color      = '#9b59b6';
      } else {
        badge.textContent      = '✈ Зенитная башня';
        badge.style.background = '#1c2533';
        badge.style.borderColor= '#7f8c8d';
        badge.style.color      = '#bdc3c7';
      }

      const ups = TOWER_DEFS[tower.type].linearUpgrades;
      list.innerHTML = '';
      ups.forEach((up, i) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${i+1}. ${up.name}</span><span style="color:#f39c12">${up.cost}g</span>`;
        li.style.display = 'flex'; li.style.justifyContent = 'space-between';
        li.className = i < tower.upgradeLevel ? 'done' : i === tower.upgradeLevel ? 'next' : '';
        list.appendChild(li);
        const dl = document.createElement('li');
        dl.className = 'up-desc'; dl.textContent = up.desc;
        list.appendChild(dl);
      });

      if (tower.isMaxed()) {
        upgBtn.textContent = '✓ Максимум'; upgBtn.disabled = true;
      } else {
        const up = tower.getNextUpgrade();
        upgBtn.textContent = `Улучшить: ${up.name} (${up.cost}g)`;
        upgBtn.disabled    = this.game.gold < up.cost;
      }

    } else if (tower.chosenPath === null) {
      // ── Show path selection ──────────────────────────────────────
      pathChoose.style.display = 'block';
      pathChosen.style.display = 'none';

      const paths = TOWER_PATHS[tower.type];
      ['A','B'].forEach(key => {
        const path = paths[key];
        const btn  = document.getElementById(`path${key}Btn`);
        btn.querySelector('.pc-name').textContent  = `${path.letter}: ${path.name}`;
        btn.querySelector('.pc-desc').textContent  = path.desc;
        btn.querySelector('.pc-cost').textContent  = `${path.cost}g`;
        btn.style.borderColor = path.color;
        const canAfford = this.game.gold >= path.cost;
        btn.classList.toggle('cant-afford', !canAfford);
        btn.title = canAfford ? '' : 'Недостаточно золота';
      });

    } else {
      // ── Show chosen-path upgrades ────────────────────────────────
      pathChoose.style.display = 'none';
      pathChosen.style.display = 'block';

      const path = TOWER_PATHS[tower.type][tower.chosenPath];

      // Chosen-path badge
      badge.textContent        = `${path.letter}: ${path.name}`;
      badge.style.background   = path.color + '33';
      badge.style.borderColor  = path.color;
      badge.style.color        = path.color;

      // Upgrade list (2 sub-upgrades)
      list.innerHTML = '';
      path.upgrades.forEach((up, i) => {
        const subLevel = tower.upgradeLevel - 1; // how many sub-upgrades done
        const li = document.createElement('li');
        li.innerHTML = `<span>${i + 1}. ${up.name}</span><span style="color:#f39c12">${up.cost}g</span>`;
        li.style.display = 'flex'; li.style.justifyContent = 'space-between';
        li.className = i < subLevel ? 'done' : i === subLevel ? 'next' : '';
        list.appendChild(li);
        const descLi = document.createElement('li');
        descLi.className = 'up-desc';
        descLi.textContent = up.desc;
        list.appendChild(descLi);
      });

      // Upgrade button
      if (tower.isMaxed()) {
        upgBtn.textContent = '✓ Максимум';
        upgBtn.disabled    = true;
      } else {
        const up = tower.getNextUpgrade();
        upgBtn.textContent = `Улучшить: ${up.name} (${up.cost}g)`;
        upgBtn.disabled    = this.game.gold < up.cost;
      }
    }

    // ── Active combos ─────────────────────────────────────────────────────
    let comboEl = document.getElementById('comboBonuses');
    if (!comboEl) {
      comboEl = document.createElement('div');
      comboEl.id = 'comboBonuses';
      comboEl.style.cssText = 'margin:6px 0 4px;font-size:0.75rem;';
      document.getElementById('legendaryUpgrade').before(comboEl);
    }
    if (tower.activeComboTypes.length > 0) {
      comboEl.innerHTML = tower.activeComboTypes
        .map(c => `<div style="color:#2ecc71">⚡ ${c}</div>`)
        .join('');
      comboEl.style.display = 'block';
    } else {
      comboEl.style.display = 'none';
    }

    // ── Legendary upgrade button ───────────────────────────────────────────
    const legDef = TOWER_DEFS[tower.type]?.legendary;
    const legBtn = document.getElementById('legendaryUpgrade');
    if (legBtn) {
      if (!legDef) {
        legBtn.style.display = 'none';
      } else if (tower.legendary) {
        legBtn.style.display = 'block';
        legBtn.disabled      = true;
        if (['explosion', 'antiair', 'lightning', 'time'].includes(tower.type)) {
          const rem = Math.ceil(tower.legendaryTimer);
          legBtn.textContent = rem > 0 ? `★ ${legDef.name} — ${rem}с` : `★ ${legDef.name} — ГОТОВ!`;
        } else {
          legBtn.textContent = `★ ${legDef.name} — активно`;
        }
      } else if (tower.isMaxed()) {
        legBtn.style.display = 'block';
        legBtn.disabled      = this.game.gold < legDef.cost;
        legBtn.textContent   = `★ ${legDef.name} (${legDef.cost}g)`;
        legBtn.title         = legDef.desc;
      } else {
        legBtn.style.display = 'none';
      }
    }
  }

  hideUpgradePanel() {
    this.upgradePanel.style.display = 'none';
  }

  showMessage(text, duration = 2000) {
    this.messageEl.textContent = text;
    this.messageEl.style.opacity = '1';
    clearTimeout(this._msgTimer);
    this._msgTimer = setTimeout(() => { this.messageEl.style.opacity = '0'; }, duration);
  }

  // ─── Knowledge Book ────────────────────────────────────────────────────────
  initKnowledgeBook() {
    document.getElementById('kbBtn').addEventListener('click', () => this.showKnowledgeBook());
    document.getElementById('kbClose').addEventListener('click', () => {
      document.getElementById('kbModal').style.display = 'none';
    });
    document.getElementById('kbModal').addEventListener('click', e => {
      if (e.target === document.getElementById('kbModal'))
        document.getElementById('kbModal').style.display = 'none';
    });
    document.querySelectorAll('.kb-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.kb-tab').forEach(t => t.classList.remove('kb-active'));
        document.querySelectorAll('.kb-section').forEach(s => s.classList.remove('kb-active'));
        tab.classList.add('kb-active');
        document.getElementById('kb-' + tab.dataset.tab).classList.add('kb-active');
      });
    });
    this._buildKBTowers();
    this._buildKBEnemies();
    this._buildKBSynergies();
  }

  showKnowledgeBook() {
    document.getElementById('kbModal').style.display = 'flex';
  }

  _buildKBTowers() {
    const towers = [
      {
        name: 'Базовая башня', color: '#3498db', cost: 50, tax: 2,
        stats: [['Урон','20'],['Радиус','3'],['Скорострельность','Высокая']],
        effective: 'Быстрые враги, группы лёгкой пехоты',
        paths: {
          A: { name: 'Пулемёт',  desc: 'Скорострельность ×4 · Идеально против быстрых врагов' },
          B: { name: 'Снайпер',  desc: 'Урон ×2, радиус +40% · Для дальней поддержки' }
        },
        legendary: { name: 'Крепостная пушка', desc: 'Урон ×3 · Каждый 5-й выстрел пробивает насквозь' }
      },
      {
        name: 'Снайпер', color: '#27ae60', cost: 100, tax: 4,
        stats: [['Урон','42'],['Радиус','6'],['Скорострельность','Низкая']],
        effective: 'Танки, боссы, бронированные враги',
        paths: {
          A: { name: 'Рельсотрон',    desc: 'Пробивает всех врагов на линии · Урон ×5' },
          B: { name: 'Дальнобойный',  desc: 'Радиус ×2 · Контроль всей карты' }
        },
        legendary: { name: 'Аннигилятор', desc: 'Выстрелы создают зоны излучения: 5% maxHP/сек, 3 сек, макс. 3 зоны одновременно' }
      },
      {
        name: 'Взрыв', color: '#e67e22', cost: 125, tax: 4,
        stats: [['Урон','18 (площадь)'],['Радиус','2.5'],['Скорострельность','Средняя']],
        effective: 'Группы врагов, медленные танки',
        paths: {
          A: { name: 'Напалм',   desc: 'Поджигает врагов · Урон по времени' },
          B: { name: 'Ядерный',  desc: 'Огромный урон раз в 7 сек · Большая область' }
        },
        legendary: { name: 'Метеорит', desc: 'Раз в 15 сек метеорит бьёт в случайную точку пути (радиус 3 клетки)' }
      },
      {
        name: 'Замедление', color: '#00bcd4', cost: 80, tax: 3,
        stats: [['Урон','6'],['Радиус','3'],['Замедление','до 60%']],
        effective: 'Быстрые враги, поддержка других башен',
        paths: {
          A: { name: 'Заморозка',    desc: 'Замедление 90% · Синергирует с любой башней' },
          B: { name: 'Отравление',   desc: 'Яд 3% макс.HP/сек · Эффективен против танков и боссов' }
        },
        legendary: { name: 'Проклятие', desc: 'Яд распространяется на соседних врагов' }
      },
      {
        name: 'Зенитка', color: '#7f8c8d', cost: 150, tax: 3,
        stats: [['Урон','20'],['Радиус','4'],['Цели','Только воздушные']],
        effective: 'Дрон (вол.4), Грифон (вол.8), Воздушный дракон (вол.14)',
        linearUpgrades: ['Урон +60%','Радиус +40%','Скорострельность +50%'],
        legendary: { name: 'Орбитальный удар', desc: 'Мгновенно уничтожает сильнейшего воздушного врага раз в 20 сек' }
      },
      {
        name: 'Шахта', color: '#7d5a2c', cost: 200, tax: 1,
        stats: [['Доход','+25g/волну'],['Атака','—'],['Лимит','5 шт.']],
        linearUpgrades: ['+20g (150g)','+30g (300g)'],
        note: 'Стройте в безопасных углах карты как можно раньше'
      },
      {
        name: 'Башня Молнии', color: '#f1c40f', cost: 200, tax: 5, unlock: 'С волны 12',
        stats: [['Урон','30 (цепной)'],['Радиус','3.5'],['Прыжки','3 врага, −30%/прыжок']],
        effective: 'Плотные группы врагов',
        linearUpgrades: ['Урон +50%','+2 цели','Радиус +40%'],
        legendary: { name: 'Шаровая молния', desc: 'Шар летит по всему пути и бьёт всех врагов раз в 20 сек' }
      },
      {
        name: 'Башня Времени', color: '#9b59b6', cost: 250, tax: 6, unlock: 'С волны 20',
        stats: [['Урон','—'],['Радиус','4'],['Аура','Замедляет 40% постоянно']],
        effective: 'Поддержка всех башен в зоне действия',
        linearUpgrades: ['Замедление 60%','Радиус +50%','Добавить урон 15/сек'],
        warning: 'Максимум 2 башни на карте · Откат "Остановки" общий для обеих',
        legendary: { name: 'Остановка времени', desc: 'Замораживает всех врагов на 3 сек (откат 30 сек, общий для обеих башен)' }
      }
    ];

    const html = towers.map(t => {
      const meta = [`${t.cost}g`, `Налог: ${t.tax}g`];
      if (t.unlock) meta.push(t.unlock);

      const statsHtml = t.stats.map(([k,v]) => `<span><b>${v}</b> ${k}</span>`).join('');

      let upgradesHtml = '';
      if (t.paths) {
        upgradesHtml = `<div class="kb-paths">
          <div class="kb-path"><div class="kb-path-name">А: ${t.paths.A.name}</div><div class="kb-path-desc">${t.paths.A.desc}</div></div>
          <div class="kb-path"><div class="kb-path-name">Б: ${t.paths.B.name}</div><div class="kb-path-desc">${t.paths.B.desc}</div></div>
        </div>`;
      } else if (t.linearUpgrades) {
        upgradesHtml = `<div style="font-size:0.71rem;color:#556;margin-bottom:8px">Улучшения: ${t.linearUpgrades.map(u=>`<span style="color:#9aa">${u}</span>`).join(' → ')}</div>`;
      }

      const effHtml  = t.effective ? `<div class="kb-effective"><span>Эффективна против:</span> ${t.effective}</div>` : '';
      const noteHtml = t.note    ? `<div style="font-size:0.71rem;color:#e8c44a;margin-bottom:8px">💡 ${t.note}</div>` : '';
      const warnHtml = t.warning ? `<div style="font-size:0.71rem;color:#e74c3c;margin-bottom:8px">⚠ ${t.warning}</div>` : '';
      const legHtml  = t.legendary
        ? `<div class="kb-legendary"><div class="kb-legendary-hdr">★ Легендарное: ${t.legendary.name}</div><div class="kb-legendary-desc">${t.legendary.desc}</div></div>`
        : '';

      return `<div class="kb-tower-card">
        <div class="kb-card-hdr">
          <div class="kb-dot" style="background:${t.color}"></div>
          <div><div class="kb-card-name">${t.name}</div><div class="kb-card-meta">${meta.join(' · ')}</div></div>
        </div>
        <div class="kb-stats-row">${statsHtml}</div>
        ${effHtml}${noteHtml}${warnHtml}${upgradesHtml}${legHtml}
      </div>`;
    }).join('');

    document.getElementById('kb-towers').innerHTML = html;
  }

  _buildKBEnemies() {
    const sections = [
      {
        title: 'Волны 1–5: Лёгкая пехота',
        enemies: [
          { name: 'Солдат',     color: '#c0392b', wave: 1,  hp: 25,   speed: 'средняя',        warn: [],                              kill: 'Любая башня' },
          { name: 'Разведчик',  color: '#e67e22', wave: 2,  hp: 18,   speed: 'высокая',         warn: [],                              kill: 'Пулемёт или Молния' },
          { name: 'Щитоносец',  color: '#2471a3', wave: 3,  hp: 40,   speed: 'низкая',          warn: ['броня 25%'],                   kill: 'Взрыв игнорирует часть брони' },
          { name: 'Бегун',      color: '#f39c12', wave: 4,  hp: 15,   speed: 'очень высокая',   warn: [],                              kill: 'Пулемёт или Заморозка — обязательны' },
          { name: 'Лучник',     color: '#27ae60', wave: 5,  hp: 22,   speed: 'средняя',         warn: [],                              kill: 'Стандартный противник' },
        ]
      },
      {
        title: 'Волны 4–7: Средние враги',
        enemies: [
          { name: 'Рыцарь',    color: '#c8a020', wave: 4,  hp: 80,   speed: 'низкая',          warn: ['броня 30%'],                   kill: 'Снайпер или Отравление' },
          { name: 'Берсерк',   color: '#e74c3c', wave: 5,  hp: 55,   speed: 'высокая',         warn: [],                              kill: 'Заморозка + Базовая башня' },
          { name: 'Маг',       color: '#8e44ad', wave: 6,  hp: 45,   speed: 'средняя',         warn: [],                              kill: 'Любая башня' },
          { name: 'Всадник',   color: '#a04000', wave: 7,  hp: 70,   speed: 'высокая',         warn: [],                              kill: 'Заморозка обязательна' },
          { name: 'Сапёр',     color: '#566573', wave: 7,  hp: 60,   speed: 'средняя',         warn: [],                              kill: 'Стандартный противник' },
        ]
      },
      {
        title: 'Волны 8–12: Тяжёлые враги',
        enemies: [
          { name: 'Голем',      color: '#717d7e', wave: 8,  hp: 180,  speed: 'очень низкая',   warn: ['броня 40%'],                   kill: 'Отравление 3%/сек + Снайпер' },
          { name: 'Вампир',     color: '#7b241c', wave: 9,  hp: 90,   speed: 'высокая',        warn: ['регенерация 2%/сек'],          kill: 'Убивать быстро — Пулемёт + Молния' },
          { name: 'Оборотень',  color: '#5d6d7e', wave: 10, hp: 110,  speed: 'очень высокая',  warn: ['регенерация 3%/сек'],          kill: 'Заморозка + массовый урон' },
          { name: 'Механик',    color: '#9b59b6', wave: 11, hp: 130,  speed: 'средняя',        warn: ['броня 35%'],                   kill: 'Взрыв + Снайпер' },
          { name: 'Некромант',  color: '#1a5276', wave: 12, hp: 95,   speed: 'средняя',        warn: ['регенерация 1.5%/сек'],        kill: 'Концентрированный огонь' },
        ]
      },
      {
        title: 'Волны 13–19: Элита',
        enemies: [
          { name: 'Дракон',  color: '#c0392b', wave: 13, hp: 250,  speed: 'средняя',           warn: ['регенерация 1%/сек'],          kill: 'Все башни + Отравление' },
          { name: 'Великан', color: '#884ea0', wave: 15, hp: 350,  speed: 'очень низкая',      warn: [],                              kill: 'Отравление незаменимо' },
          { name: 'Демон',   color: '#e74c3c', wave: 17, hp: 200,  speed: 'высокая',           warn: ['регенерация 2.5%/сек'],        kill: 'Заморозка + Молния' },
          { name: 'Страж',   color: '#2e86c1', wave: 19, hp: 280,  speed: 'средняя',           warn: ['броня 45%'],                   kill: 'Снайпер Рельсотрон игнорирует броню' },
        ]
      },
      {
        title: 'Воздушные враги (атакует только Зенитка)',
        enemies: [
          { name: 'Дрон',             color: '#85c1e9', wave: 4,  hp: 30,  speed: 'высокая',   warn: [],  kill: 'Только Зенитка' },
          { name: 'Грифон',           color: '#a9cce3', wave: 8,  hp: 80,  speed: 'средняя',   warn: [],  kill: 'Только Зенитка' },
          { name: 'Воздушный дракон', color: '#2471a3', wave: 14, hp: 200, speed: 'средняя',   warn: [],  kill: 'Зенитка + Орбитальный удар' },
        ]
      },
      {
        title: 'Боссы',
        enemies: [
          { name: 'Повелитель',       color: '#111', border: '#e74c3c', wave: '10, 20, 30...', hp: 'Растёт', speed: 'средняя', warn: ['броня 50%','регенерация 1%/сек'],    kill: 'Все башни — особенно Отравление и Снайпер' },
          { name: 'Вортекс',          color: '#1a237e',               wave: '60 (карта 1)',   hp: 2000,     speed: 'средняя', warn: ['броня 40%','на 50% HP ускоряется'], kill: 'Заморозка при ускорении' },
          { name: 'Ксара',            color: '#3d0040',               wave: '60 (карта 2)',   hp: 3500,     speed: 'средняя', warn: ['призывает солдат','уходит в невидимость'], kill: 'Взрыв по площади + все башни' },
          { name: 'Малькар Истинный', color: '#1a1a1a', border: '#c8a020', wave: '60 (карта 3)', hp: 8000, speed: 'средняя', warn: ['иммунитет к замедлению 50%'],       kill: 'Все лучшие башни с легендарными улучшениями' },
        ]
      }
    ];

    const html = sections.map(sec => {
      const cardsHtml = sec.enemies.map(e => {
        const dotStyle = e.border
          ? `background:${e.color};border-color:${e.border}`
          : `background:${e.color}`;
        const warnHtml = e.warn.length
          ? ' · ' + e.warn.map(w => `<span class="warn">${w}</span>`).join(' · ')
          : '';
        return `<div class="kb-enemy-card">
          <div class="kb-enemy-hdr">
            <div class="kb-dot" style="${dotStyle}"></div>
            <div><div class="kb-enemy-name">${e.name}</div><div class="kb-enemy-wave">С волны ${e.wave}</div></div>
          </div>
          <div class="kb-enemy-stats">HP: <b>${e.hp}</b> · Скорость: <b>${e.speed}</b>${warnHtml}</div>
          <div class="kb-enemy-kill"><span>Как убивать:</span> ${e.kill}</div>
        </div>`;
      }).join('');
      return `<div class="kb-section-title">${sec.title}</div><div class="kb-enemy-grid">${cardsHtml}</div>`;
    }).join('');

    document.getElementById('kb-enemies').innerHTML = html;
  }

  _buildKBSynergies() {
    const C = { basic:'#3498db', sniper:'#27ae60', explosion:'#e67e22', slow:'#00bcd4', antiair:'#7f8c8d', mine:'#7d5a2c', lightning:'#f1c40f', time:'#9b59b6' };

    const synergies = [
      { types:['sniper','explosion'],   names:['Снайпер','Взрыв'],               bonus: '+25% урон обеим башням',                                tip: 'Ставьте рядом на прямых участках пути' },
      { types:['slow','basic'],         names:['Замедление','Базовая'],           bonus: 'Базовая +40% скорострельность',                         tip: 'Замедление тормозит врагов — Базовая успевает больше выстрелов' },
      { types:['time',null],            names:['Башня Времени','любая башня'],    bonus: 'Соседняя башня +20% урон',                              tip: 'Ставьте башню времени в центре группы башен для максимального эффекта' },
      { types:['basic','basic'],        names:['Базовая','Базовая'],              bonus: 'Обе башни +15% урон и радиус',                          tip: 'Эффективно на ранних волнах' },
      { types:['sniper','time'],        names:['Снайпер','Башня Времени'],        bonus: 'Снайпер игнорирует броню врагов',                       tip: 'Лучшая комбинация против бронированных боссов' },
      { types:['lightning','antiair'],  names:['Молния','Зенитка'],              bonus: 'Зенитка получает цепной эффект на 1 доп. врага',        tip: 'Эффективно когда летят группы воздушных врагов' },
    ];

    const synHtml = synergies.map(s => {
      const dots = s.types.map((t, i) => {
        const col = t ? C[t] : '#444';
        return `<div class="kb-dot" style="background:${col}"></div>${i < s.types.length-1 ? '<span style="color:#445;font-size:0.8rem;padding:0 1px">+</span>' : ''}`;
      }).join('');
      return `<div class="kb-synergy-card">
        <div class="kb-synergy-pair">${dots}<div class="kb-syn-name">${s.names.join(' + ')}</div></div>
        <div class="kb-synergy-bonus">⚡ ${s.bonus}</div>
        <div class="kb-synergy-tip">${s.tip}</div>
      </div>`;
    }).join('');

    const recommendations = [
      'Против быстрых: Заморозка в центре + Пулемёты вокруг',
      'Против боссов: Снайпер + Башня Времени + Отравление',
      'Пассивный доход: 3–5 Шахт в углах + Молния для групп',
      'Универсальная: Башня Времени в центре + все типы башен вокруг',
    ];

    const noticeHtml = `<div style="font-size:0.73rem;color:#7f8c8d;margin-bottom:14px;padding:9px 12px;background:#0a0f18;border-radius:7px;border:1px solid #1a2a3a;line-height:1.6">
      <b style="color:#bbb">Правильное расположение башен усиливает их.</b><br>
      Синергии работают, когда башни стоят в <b style="color:#fff">радиусе 2 клеток</b> друг от друга.
    </div>`;
    const recHtml = `<div class="kb-rec-title">📌 Рекомендуемые расстановки</div>
    <ul class="kb-rec-list">${recommendations.map(r => `<li>"${r}"</li>`).join('')}</ul>`;

    document.getElementById('kb-synergies').innerHTML = noticeHtml + synHtml + recHtml;
  }
}

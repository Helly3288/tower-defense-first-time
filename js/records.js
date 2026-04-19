'use strict';

// ─── Achievement definitions ───────────────────────────────────────────────────
const ACHIEVEMENTS = [
  // Боевые
  { id: 'first_blood',  name: 'Первая кровь',          icon: '🩸', desc: 'Убить первого врага',                          cat: 'Боевые'    },
  { id: 'killer',       name: 'Истребитель',            icon: '⚔️', desc: 'Убить 100 врагов за одну игру',               cat: 'Боевые'    },
  { id: 'genocide',     name: 'Геноцид',                icon: '💀', desc: 'Убить 1000 врагов за одну игру',              cat: 'Боевые'    },
  { id: 'boss_hunter',  name: 'Охотник на боссов',      icon: '🐉', desc: 'Убить 3 босса за одну игру',                  cat: 'Боевые'    },
  { id: 'legend_boss',  name: 'Легенда',                icon: '👑', desc: 'Убить 10 боссов суммарно (копится между играми)', cat: 'Боевые' },
  // Башни
  { id: 'builder',      name: 'Строитель',              icon: '🏗️', desc: 'Построить 10 башен за одну игру',            cat: 'Башни'     },
  { id: 'architect',    name: 'Архитектор',             icon: '🏰', desc: 'Построить 25 башен за одну игру',            cat: 'Башни'     },
  { id: 'legendary_b',  name: 'Легендарный строитель',  icon: '⭐', desc: 'Получить легендарное улучшение башни',        cat: 'Башни'     },
  { id: 'combinator',   name: 'Комбинатор',             icon: '🔗', desc: 'Активировать 3 комбо-эффекта у одной башни', cat: 'Башни'     },
  { id: 'electrician',  name: 'Электрик',               icon: '⚡', desc: 'Построить башню молнии',                      cat: 'Башни'     },
  // Экономика
  { id: 'miser',        name: 'Скупердяй',              icon: '💰', desc: 'Накопить 500 золота одновременно',            cat: 'Экономика' },
  { id: 'magnate',      name: 'Магнат',                 icon: '💎', desc: 'Накопить 2000 золота одновременно',           cat: 'Экономика' },
  { id: 'miner',        name: 'Шахтёр',                 icon: '⛏️', desc: 'Построить 3 шахты',                          cat: 'Экономика' },
  { id: 'tactician',    name: 'Тактик',                 icon: '🎯', desc: 'Использовать усиление перед волной 5 раз',   cat: 'Экономика' },
  // Выживание
  { id: 'invincible',   name: 'Неуязвимый',             icon: '🛡️', desc: 'Пройти 10 волн подряд без потери жизней',    cat: 'Выживание' },
  { id: 'on_edge',      name: 'На волоске',              icon: '❤️', desc: 'Выжить имея 1 жизнь',                       cat: 'Выживание' },
  { id: 'resilient',    name: 'Стойкий',                 icon: '🏅', desc: 'Дойти до волны 30',                         cat: 'Выживание' },
  { id: 'veteran',      name: 'Ветеран',                 icon: '🎖️', desc: 'Дойти до волны 50',                         cat: 'Выживание' },
  { id: 'ironhold',     name: 'Легенда Айронхолда',     icon: '🏆', desc: 'Пройти все 60 волн',                        cat: 'Выживание' },
  { id: 'conqueror',    name: 'Покоритель',              icon: '🌟', desc: 'Пройти все 60 волн на карте Эксперт',       cat: 'Выживание' },
];

// ─── AchievementSystem ────────────────────────────────────────────────────────
class AchievementSystem {
  constructor() {
    // Persistent across games
    const saved           = JSON.parse(localStorage.getItem('ach_save') || '{}');
    this.unlocked         = new Set(saved.unlocked       || []);
    this.unlockDates      = saved.unlockDates            || {};
    this.totalBossKills   = saved.totalBossKills         || 0;

    // Per-game counters (reset on construction = new game)
    this.gameKills        = 0;
    this.gameBossKills    = 0;
    this.gameTowersBuilt  = 0;
    this.gameBoostsUsed   = 0;
    this.waveNoLossStreak = 0;
    this._livesAtWaveStart= 0;

    // Notification queue
    this._queue     = [];
    this._notifying = false;
  }

  // ── Persistence ─────────────────────────────────────────────────────────────
  _save() {
    localStorage.setItem('ach_save', JSON.stringify({
      unlocked:       [...this.unlocked],
      unlockDates:    this.unlockDates,
      totalBossKills: this.totalBossKills,
    }));
  }

  // ── Unlock ───────────────────────────────────────────────────────────────────
  unlock(id) {
    if (this.unlocked.has(id)) return;
    this.unlocked.add(id);
    this.unlockDates[id] = new Date().toLocaleDateString('ru-RU');
    this._save();
    const def = ACHIEVEMENTS.find(a => a.id === id);
    if (def) this._enqueue(def);
  }

  // ── Notification queue ───────────────────────────────────────────────────────
  _enqueue(def) {
    this._queue.push(def);
    if (!this._notifying) this._showNext();
  }

  _showNext() {
    if (!this._queue.length) { this._notifying = false; return; }
    this._notifying = true;
    const def = this._queue.shift();

    const el = document.createElement('div');
    el.className = 'ach-notify';
    el.innerHTML =
      `<div class="ach-notify-icon">${def.icon}</div>` +
      `<div class="ach-notify-body">` +
        `<div class="ach-notify-label">Достижение получено!</div>` +
        `<div class="ach-notify-name">${def.name}</div>` +
      `</div>`;
    document.body.appendChild(el);

    // Trigger enter animation on next two frames
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('ach-notify--show')));

    setTimeout(() => {
      el.classList.remove('ach-notify--show');
      el.classList.add('ach-notify--hide');
      el.addEventListener('transitionend', () => {
        el.remove();
        setTimeout(() => this._showNext(), 150);
      }, { once: true });
    }, 3000);
  }

  // ── Game event hooks ─────────────────────────────────────────────────────────

  onEnemyKilled(enemy) {
    this.gameKills++;
    this.unlock('first_blood');
    if (this.gameKills >= 100)  this.unlock('killer');
    if (this.gameKills >= 1000) this.unlock('genocide');

    if (enemy.type === 'overlord') {
      this.gameBossKills++;
      this.totalBossKills++;
      this._save();  // persist boss kills immediately
      if (this.gameBossKills >= 3)   this.unlock('boss_hunter');
      if (this.totalBossKills >= 10) this.unlock('legend_boss');
    }
  }

  onTowerBuilt(type, game) {
    this.gameTowersBuilt++;
    if (this.gameTowersBuilt >= 10) this.unlock('builder');
    if (this.gameTowersBuilt >= 25) this.unlock('architect');
    if (type === 'lightning') this.unlock('electrician');
    if (type === 'mine') {
      const mines = game.towers.filter(t => t.isMine).length;
      if (mines >= 3) this.unlock('miner');
    }
  }

  onLegendaryBought() {
    this.unlock('legendary_b');
  }

  onBoostUsed() {
    this.gameBoostsUsed++;
    if (this.gameBoostsUsed >= 5) this.unlock('tactician');
  }

  onWaveStart(game) {
    // Record lives AFTER fortify bonus so "no loss" is measured correctly
    this._livesAtWaveStart = game.lives;
  }

  onWaveComplete(game) {
    if (game.lives >= this._livesAtWaveStart) {
      this.waveNoLossStreak++;
    } else {
      this.waveNoLossStreak = 0;
    }
    if (this.waveNoLossStreak >= 10) this.unlock('invincible');
    if (game.wave >= 30) this.unlock('resilient');
    if (game.wave >= 50) this.unlock('veteran');
    if (game.wave >= 60) {
      this.unlock('ironhold');
      if (game.expertMode) this.unlock('conqueror');
    }
  }

  // Called every 60 frames — checks passive conditions
  onStateCheck(game) {
    if (game.gold >= 500)  this.unlock('miser');
    if (game.gold >= 2000) this.unlock('magnate');
    if (game.lives === 1)  this.unlock('on_edge');
    // Combinator: any tower with 3+ simultaneous combos
    if (game.towers.some(t => t.activeComboTypes && t.activeComboTypes.length >= 3)) {
      this.unlock('combinator');
    }
  }

  // ── Achievement screen ───────────────────────────────────────────────────────
  showScreen() {
    this._renderGrid();
    document.getElementById('achModal').style.display = 'flex';
  }

  _renderGrid() {
    const total    = ACHIEVEMENTS.length;
    const got      = this.unlocked.size;
    const pct      = Math.round(got / total * 100);

    document.getElementById('achProgressText').textContent = `${got} из ${total} получено`;
    document.getElementById('achProgressFill').style.width = `${pct}%`;

    const grid = document.getElementById('achGrid');
    grid.innerHTML = '';

    ACHIEVEMENTS.forEach(def => {
      const done = this.unlocked.has(def.id);
      const date = done ? (this.unlockDates[def.id] || '') : '';
      const card = document.createElement('div');
      card.className = 'ach-card' + (done ? ' ach-card--done' : '');
      card.title = done ? `${def.desc}\n${date}` : def.desc;
      card.innerHTML =
        `<div class="ach-card-icon">${done ? def.icon : '🔒'}</div>` +
        `<div class="ach-card-name">${def.name}</div>` +
        `<div class="ach-card-sub">${done ? date : def.cat}</div>`;
      grid.appendChild(card);
    });
  }
}

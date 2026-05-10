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

// ─── Map 2 tower definitions ──────────────────────────────────────────────────
Object.assign(TOWER_DEFS, {
  torch: {
    name: 'Факельник', cost: 100, maxHP: 100, mapOnly: 'gorge',
    color: '#d35400', accentColor: '#e67e22',
    damage: 15, range: 90, fireRate: 45,
    bulletColor: '#ff6b35', bulletSize: 5, bulletSpeed: 8,
    description: 'Поджигает: 3% maxHP/сек на 4 сек',
    burnPct: 0.03, burnDuration: 4,
    legendary: { name: 'Живой огонь', cost: 350, desc: 'Огонь перекидывается на врагов в радиусе 1 клетки' },
  },
  catapult: {
    name: 'Катапульта', cost: 125, maxHP: 130, mapOnly: 'gorge',
    color: '#6b4226', accentColor: '#8b5e3c',
    damage: 60, range: 126, fireRate: 180,
    bulletColor: '#7f8c8d', bulletSize: 8, bulletSpeed: 5,
    splashRadius: 54,
    description: 'Большой урон по площади, снаряд по дуге',
    isArc: true,
    legendary: { name: 'Огненный камень', cost: 400, desc: 'Каждый 4-й выстрел поджигает всю область (3% maxHP/сек)' },
  },
  scorpion: {
    name: 'Скорпион', cost: 150, maxHP: 100, mapOnly: 'gorge',
    color: '#b7950b', accentColor: '#9a7d0a',
    damage: 8, range: 108, fireRate: 35,
    bulletColor: '#8dde26', bulletSize: 4, bulletSpeed: 9,
    description: 'Стаки яда: до 5 стаков × 2% maxHP/сек',
    isScorpion: true, maxScorpionStacks: 5,
    legendary: { name: 'Смертельное жало', cost: 450, desc: 'При максимальных стаках враг взрывается ядом (радиус 1 клетки)' },
  },
  sandstorm: {
    name: 'Песч. Вихрь', cost: 175, maxHP: 120, mapOnly: 'gorge',
    color: '#c8a060', accentColor: '#a07840',
    damage: 0, range: 126, fireRate: 9999,
    bulletColor: '#c8a060', bulletSize: 0, bulletSpeed: 0,
    description: 'Аура: замедл. 35% + 2% maxHP/сек всем в радиусе',
    isSandstorm: true, isAura: true,
    sandstormSlowFactor: 0.65, sandstormDpsPct: 0.02,
    legendary: { name: 'Ока Пустыни', cost: 500, desc: 'Соседние башни (≤2 кл.) получают +30% урон' },
  },
  tombguard: {
    name: 'Стражник', cost: 200, maxHP: 150, mapOnly: 'gorge',
    color: '#d4a520', accentColor: '#a07800',
    damage: 35, range: 108, fireRate: 300,
    bulletColor: '#d4a520', bulletSize: 4, bulletSpeed: 10,
    description: 'Блокирует ВСЕХ врагов в радиусе 3 кл. на 3 сек · Перезарядка 5 сек',
    isGuard: true, guardBlockDuration: 3,
    legendary: { name: 'Печать Гробницы', cost: 400, desc: 'Заблокированные враги получают ×3 урона от всех башен в радиусе 4 клеток' },
  },
  obelisk: {
    name: 'Обелиск', cost: 225, maxHP: 110, mapOnly: 'gorge',
    color: '#c8a020', accentColor: '#9b7800',
    damage: 5, range: 144, fireRate: 90,
    bulletColor: '#9b59b6', bulletSize: 5, bulletSpeed: 7,
    description: 'Проклятие: +60% входящего урона на 8 сек',
    isCurse: true, curseFactor: 1.6, curseDuration: 8,
    legendary: { name: 'Великое Проклятие', cost: 550, desc: 'Проклятие распространяется на всех врагов в 2 клетках от цели' },
  },
  snakecharmer: {
    name: 'Заклинатель', cost: 250, maxHP: 100, mapOnly: 'gorge',
    color: '#27ae60', accentColor: '#1e8449',
    damage: 0, range: 0, fireRate: 9999,
    bulletColor: '#27ae60', bulletSize: 0, bulletSpeed: 0,
    description: 'Раз в 5 сек — змея: 20 урона + яд 2%/сек',
    isSnakeCharmer: true,
    snakeDamage: 20, snakePoisonPct: 0.02, snakePoisonDuration: 3,
    snakeDistance: 8, snakeInterval: 5, maxSnakes: 3,
    legendary: { name: 'Взрыв яда', cost: 500, desc: 'Змеи взрываются ядом (4%/сек, 3 сек, радиус 1.5 кл.) при смерти врага' },
  },
  falconer: {
    name: 'Соколятник', cost: 175, maxHP: 90, mapOnly: 'gorge',
    color: '#8B5E3C', accentColor: '#5C3A1E',
    damage: 25, range: 180, fireRate: 50,
    bulletColor: '#c8843a', bulletSize: 5, bulletSpeed: 9,
    description: 'Атакует только воздушных врагов · Пускает сокола к цели',
    isFalconer: true, antiairOnly: true, unlockWave: 4,
    legendary: { name: 'Тройной охват', cost: 400, desc: 'Сокол атакует сразу 3 воздушных врага одновременно' },
  },
  sunmirror: {
    name: 'Зеркало', cost: 300, maxHP: 120, mapOnly: 'gorge',
    color: '#f1c40f', accentColor: '#d4ac0d',
    damage: 45, range: 180, fireRate: 80,
    bulletColor: '#fffaaa', bulletSize: 4, bulletSpeed: 20,
    description: 'Луч — бьёт всех врагов на одном отрезке пути',
    isSunMirror: true, unlockWave: 8,
    mirrorDmgDecay: 0.85,
    legendary: { name: 'Солнечная пушка', cost: 600, desc: 'Луч поджигает всех врагов в линии на 5 сек (3% maxHP/сек)' },
  },
});

// ─── Map 3 tower definitions ──────────────────────────────────────────────────
Object.assign(TOWER_DEFS, {
  bone_cannon: {
    name: 'Костяная пушка', cost: 75, mapOnly: 'maze',
    color: '#888888', accentColor: '#666666',
    damage: 45, range: 108, fireRate: 50,
    bulletColor: '#cccccc', bulletSize: 5, bulletSpeed: 13,
    description: 'Снаряд пробивает всех врагов по линии',
    pierce: true, isBoneCannon: true,
    legendary: { name: 'Дождь костей', cost: 350, desc: 'Каждый 4-й выстрел — дождь костей (200 урона, р=80px)' },
  },
  curse_tower: {
    name: 'Башня проклятий', cost: 100, mapOnly: 'maze',
    color: '#1a0033', accentColor: '#330066',
    damage: 0, range: 108, fireRate: 9999,
    bulletColor: '#9933ff', bulletSize: 0, bulletSpeed: 0,
    description: 'Аура: −40% брони и −20% скорости всем в радиусе',
    isAura: true, isCurseTower: true,
    curseArmorFactor: 0.6, curseTowerSlowFactor: 0.8,
    legendary: { name: 'Проклятие прилипает', cost: 450, desc: 'Дебафф сохраняется 6 сек после выхода из ауры' },
  },
  shadow_blade: {
    name: 'Теневой клинок', cost: 125, mapOnly: 'maze',
    color: '#1a0022', accentColor: '#330044',
    damage: 35, range: 126, fireRate: 30,
    bulletColor: '#bb00ff', bulletSize: 5, bulletSpeed: 14,
    description: 'Одновременно атакует 3 ближайших врага',
    isShadowBlade: true, shadowBladeTargets: 3,
    legendary: { name: 'Пять клинков', cost: 500, desc: '5 целей + каждый удар −10% брони цели на 4 сек (стакается)' },
  },
  fear_gate: {
    name: 'Врата ужаса', cost: 150, mapOnly: 'maze',
    color: '#330000', accentColor: '#660000',
    damage: 0, range: 144, fireRate: 480,
    bulletColor: '#ff0000', bulletSize: 0, bulletSpeed: 0,
    description: 'Раз в 8 сек парализует всех в радиусе на 3 сек',
    isParalyzeTower: true, paralyzeDuration: 3,
    legendary: { name: 'Абсолютный ужас', cost: 500, desc: 'Паника 5 сек + парализованные берут +50% урона' },
  },
  soul_trap: {
    name: 'Душехват', cost: 175, mapOnly: 'maze',
    color: '#0a0a2a', accentColor: '#1a1a4a',
    damage: 30, range: 108, fireRate: 40,
    bulletColor: '#3399ff', bulletSize: 5, bulletSpeed: 12,
    description: '+3g за убийство · 5 убийств → тройной удар по площади',
    isSoulTrap: true, soulGoldBonus: 3,
    legendary: { name: 'Взрыв душ', cost: 480, desc: 'При 5 душах — взрыв наносит урон ВСЕМ врагам на экране' },
  },
  obsidian_tower: {
    name: 'Обсидиан', cost: 200, mapOnly: 'maze',
    color: '#0a0a0a', accentColor: '#111133',
    damage: 0, range: 144, fireRate: 360,
    bulletColor: '#00ccff', bulletSize: 0, bulletSpeed: 0,
    description: 'Луч замораживает всех врагов на линии на 3 сек',
    isObsidian: true, obsidianFreezeDuration: 3, obsidianDmg: 0, obsidianFrozenDmgMult: 1,
    legendary: { name: 'Хрупкий лёд', cost: 550, desc: 'Замороженные при получении урона взрываются (150 урона, р=60px)' },
  },
  void_rift: {
    name: 'Разрыв тьмы', cost: 225, mapOnly: 'maze',
    color: '#0d0011', accentColor: '#220033',
    damage: 0, range: 144, fireRate: 600,
    bulletColor: '#9933ff', bulletSize: 0, bulletSpeed: 0,
    description: 'Раз в 10 сек — 4% maxHP всем врагам на экране',
    isVoidRift: true, voidRiftDmgPct: 0.04, voidRiftSlowAll: false,
    legendary: { name: 'Зона тьмы', cost: 600, desc: 'После взрыва — зона тьмы 5 сек: замедляет всех на 40%' },
  },
  dark_vortex: {
    name: 'Тёмный вихрь', cost: 300, mapOnly: 'maze',
    color: '#0d0033', accentColor: '#1a0055',
    damage: 0, range: 144, fireRate: 9999,
    bulletColor: '#cc00ff', bulletSize: 0, bulletSpeed: 0,
    description: 'Аура: замедляет всех в радиусе на 60%',
    isAura: true, isDarkVortex: true,
    darkVortexSlowFactor: 0.4, darkVortexDpsPct: 0,
    legendary: { name: 'Чёрная дыра', cost: 650, desc: 'Враги в радиусе теряют 2% maxHP/сек' },
  },
});

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

  // ── Map 2: Desert towers ────────────────────────────────────────────────────
  torch: {
    A: {
      name: 'Адский огонь', letter: 'А',
      desc: 'Урон +50% · Ожог 5% HP/сек',
      color: '#e74c3c', accentColor: '#c0392b', bulletColor: '#ff6b35',
      cost: 140,
      apply: { damageMult: 1.5, burnPctBonus: 0.02 },
      upgrades: [
        { name: 'Жаркое пламя',  desc: 'Ожог 8 сек',                    cost: 180, burnDuration: 8 },
        { name: 'Инферно',       desc: 'Урон ×1.5 · Ожог 7% HP/сек',   cost: 280, damageMult: 1.5, burnPctBonus: 0.02 },
      ],
    },
    B: {
      name: 'Смоляной', letter: 'Б',
      desc: 'Радиус +50% · Ожог 7 сек',
      color: '#7d3c98', accentColor: '#6c3483', bulletColor: '#a569bd',
      cost: 130,
      apply: { rangeMult: 1.5, burnDuration: 7 },
      upgrades: [
        { name: 'Вязкая смола',  desc: 'Урон +70%',                     cost: 180, damageMult: 1.7 },
        { name: 'Смоляное море', desc: 'Радиус +40% · Ожог 10 сек',     cost: 260, rangeMult: 1.4, burnDuration: 10 },
      ],
    },
  },
  catapult: {
    A: {
      name: 'Требушет', letter: 'А',
      desc: 'Урон +60% · Радиус +40%',
      color: '#922b21', accentColor: '#7b241c', bulletColor: '#e74c3c',
      cost: 180,
      apply: { damageMult: 1.6, rangeMult: 1.4 },
      upgrades: [
        { name: 'Тяжёлый снаряд', desc: 'Урон ×1.4',                   cost: 240, damageMult: 1.4 },
        { name: 'Осадная машина', desc: 'Урон ×1.5 · Радиус +30%',     cost: 360, damageMult: 1.5, rangeMult: 1.3 },
      ],
    },
    B: {
      name: 'Шрапнель', letter: 'Б',
      desc: 'Площадь +60% · Скорость +40%',
      color: '#7f8c8d', accentColor: '#5d6d7e', bulletColor: '#bdc3c7',
      cost: 200,
      apply: { splashMult: 1.6, fireRateMult: 1/1.4 },
      upgrades: [
        { name: 'Широкий взрыв',      desc: 'Площадь +50%',             cost: 260, splashMult: 1.5 },
        { name: 'Шрапнельный шторм',  desc: 'Урон +50% · Площадь +50%', cost: 380, damageMult: 1.5, splashMult: 1.5 },
      ],
    },
  },
  scorpion: {
    A: {
      name: 'Королевский', letter: 'А',
      desc: 'Макс. стаков +3 · Урон стака 3%',
      color: '#d4ac0d', accentColor: '#a07800', bulletColor: '#f1c40f',
      cost: 190,
      apply: { maxScorpionStacks: 3, scorpionPctBonus: 0.01 },
      upgrades: [
        { name: 'Императорский яд',  desc: 'Макс. стаков +2',                cost: 250, maxScorpionStacks: 2 },
        { name: 'Королевское жало',  desc: 'Урон стака 4% · Радиус +40%',    cost: 360, scorpionPctBonus: 0.01, rangeMult: 1.4 },
      ],
    },
    B: {
      name: 'Парализующий', letter: 'Б',
      desc: 'Урон +50% · Радиус +40%',
      color: '#8e44ad', accentColor: '#6c3483', bulletColor: '#c39bd3',
      cost: 170,
      apply: { damageMult: 1.5, rangeMult: 1.4 },
      upgrades: [
        { name: 'Нервный яд',        desc: 'Урон +50%',                       cost: 220, damageMult: 1.5 },
        { name: 'Тотальный паралич', desc: 'Радиус +40% · Макс. стаков +2',   cost: 320, rangeMult: 1.4, maxScorpionStacks: 2 },
      ],
    },
  },
  sandstorm: {
    A: {
      name: 'Буря', letter: 'А',
      desc: 'Урон 4% HP/сек · Радиус +40%',
      color: '#e67e22', accentColor: '#d35400', bulletColor: '#f39c12',
      cost: 210,
      apply: { sandstormDpsPctBonus: 0.02, rangeMult: 1.4 },
      upgrades: [
        { name: 'Ураган',             desc: 'Урон 5% HP/сек',                 cost: 260, sandstormDpsPctBonus: 0.01 },
        { name: 'Смертоносный шторм', desc: 'Урон 6% HP/сек · Радиус +50%',   cost: 380, sandstormDpsPctBonus: 0.01, rangeMult: 1.5 },
      ],
    },
    B: {
      name: 'Пескоструй', letter: 'Б',
      desc: 'Замедление 55% · Радиус +50%',
      color: '#c8a060', accentColor: '#a07840', bulletColor: '#d4aa6a',
      cost: 200,
      apply: { sandstormSlowBonus: 0.2, rangeMult: 1.5 },
      upgrades: [
        { name: 'Абразивный', desc: 'Замедление 65%',                         cost: 240, sandstormSlowBonus: 0.1 },
        { name: 'Стеклорез',  desc: 'Замедление 75% · Радиус +40%',           cost: 340, sandstormSlowBonus: 0.1, rangeMult: 1.4 },
      ],
    },
  },
  tombguard: {
    A: {
      name: 'Фараон', letter: 'А',
      desc: 'Урон +70% · Блок 5 сек',
      color: '#d4a520', accentColor: '#a07800', bulletColor: '#f0c040',
      cost: 240,
      apply: { damageMult: 1.7, guardBlockBonus: 2 },
      upgrades: [
        { name: 'Жезл Фараона', desc: 'Урон ×1.4',                           cost: 280, damageMult: 1.4 },
        { name: 'Воля Богов',   desc: 'Блок +3 сек · Урон ×1.5',             cost: 400, guardBlockBonus: 3, damageMult: 1.5 },
      ],
    },
    B: {
      name: 'Двойник', letter: 'Б',
      desc: 'Радиус +50% · Урон +50%',
      color: '#1abc9c', accentColor: '#148f77', bulletColor: '#76d7c4',
      cost: 260,
      apply: { rangeMult: 1.5, damageMult: 1.5 },
      upgrades: [
        { name: 'Страж Пустыни',  desc: 'Радиус +40%',                       cost: 300, rangeMult: 1.4 },
        { name: 'Двойная стража', desc: 'Блок +2 сек · Радиус +40%',         cost: 400, guardBlockBonus: 2, rangeMult: 1.4 },
      ],
    },
  },
  obelisk: {
    A: {
      name: 'Древнее проклятие', letter: 'А',
      desc: 'Урон +100% · Проклятие 12 сек',
      color: '#9b59b6', accentColor: '#7d3c98', bulletColor: '#c39bd3',
      cost: 270,
      apply: { damageMult: 2.0, curseDurationBonus: 4 },
      upgrades: [
        { name: 'Тёмные руны',      desc: 'Радиус +50%',                     cost: 300, rangeMult: 1.5 },
        { name: 'Вечное проклятие', desc: 'Урон ×2 · Проклятие +6 сек',      cost: 440, damageMult: 2.0, curseDurationBonus: 6 },
      ],
    },
    B: {
      name: 'Цепное проклятие', letter: 'Б',
      desc: 'Радиус +50% · Проклятие 10 сек',
      color: '#1a237e', accentColor: '#0d1652', bulletColor: '#5c6bc0',
      cost: 250,
      apply: { rangeMult: 1.5, curseDurationBonus: 2 },
      upgrades: [
        { name: 'Чёрный обелиск', desc: 'Радиус +50%',                       cost: 320, rangeMult: 1.5 },
        { name: 'Древняя мощь',   desc: 'Урон ×2.5 · Радиус +40%',           cost: 480, damageMult: 2.5, rangeMult: 1.4 },
      ],
    },
  },
  snakecharmer: {
    A: {
      name: 'Кобра', letter: 'А',
      desc: 'Яд 4%/сек · Змея 15 клеток',
      color: '#27ae60', accentColor: '#1e8449', bulletColor: '#58d68d',
      cost: 280,
      apply: { snakePoisonBonus: 0.02, snakeDistanceBonus: 7 },
      upgrades: [
        { name: 'Кобра-царь',      desc: 'Яд +2%/сек',                       cost: 320, snakePoisonBonus: 0.02 },
        { name: 'Смертельный укус', desc: 'Змея +5 кл. · Яд 8%/сек',         cost: 460, snakeDistanceBonus: 5, snakePoisonBonus: 0.02 },
      ],
    },
    B: {
      name: 'Гнездо', letter: 'Б',
      desc: '+1 змея · Яд 4%/сек',
      color: '#e67e22', accentColor: '#d35400', bulletColor: '#f39c12',
      cost: 300,
      apply: { maxSnakesBonus: 1, snakePoisonBonus: 0.02 },
      upgrades: [
        { name: 'Клубок',         desc: '+1 змея одновременно',               cost: 360, maxSnakesBonus: 1 },
        { name: 'Змеиное гнездо', desc: '+1 змея · Яд 6%/сек',               cost: 500, maxSnakesBonus: 1, snakePoisonBonus: 0.02 },
      ],
    },
  },
  falconer: {
    A: {
      name: 'Орёл', letter: 'А',
      desc: 'Урон +60% · Радиус +50%',
      color: '#d4a520', accentColor: '#a07800', bulletColor: '#f0c040',
      cost: 220,
      apply: { damageMult: 1.6, rangeMult: 1.5 },
      upgrades: [
        { name: 'Боевой орёл',    desc: 'Урон +60%',                         cost: 260, damageMult: 1.6 },
        { name: 'Имперский орёл', desc: 'Радиус +50% · Урон ×1.5',           cost: 380, rangeMult: 1.5, damageMult: 1.5 },
      ],
    },
    B: {
      name: 'Стая', letter: 'Б',
      desc: 'Скорострельность +40% · Радиус +50%',
      color: '#3498db', accentColor: '#2471a3', bulletColor: '#85c1e9',
      cost: 250,
      apply: { fireRateMult: 1/1.4, rangeMult: 1.5 },
      upgrades: [
        { name: 'Быстрые крылья', desc: 'Скорострельность +40%',              cost: 280, fireRateMult: 1/1.4 },
        { name: 'Стая соколов',   desc: 'Скорострельность +30% · Урон +60%',  cost: 380, fireRateMult: 1/1.3, damageMult: 1.6 },
      ],
    },
  },
  sunmirror: {
    A: {
      name: 'Солнечная пушка', letter: 'А',
      desc: 'Урон +50% · Без снижения по цепи',
      color: '#e74c3c', accentColor: '#c0392b', bulletColor: '#f39c12',
      cost: 350,
      apply: { damageMult: 1.5, mirrorNoPenalty: true },
      upgrades: [
        { name: 'Прямой удар',       desc: 'Урон ×1.4',                      cost: 380, damageMult: 1.4 },
        { name: 'Солнечная батарея', desc: 'Урон ×1.5 · Радиус +50%',        cost: 540, damageMult: 1.5, rangeMult: 1.5 },
      ],
    },
    B: {
      name: 'Рассеянный свет', letter: 'Б',
      desc: 'Радиус +60% · Урон +50%',
      color: '#f1c40f', accentColor: '#d4ac0d', bulletColor: '#fffaaa',
      cost: 320,
      apply: { rangeMult: 1.6, damageMult: 1.5 },
      upgrades: [
        { name: 'Широкий луч',  desc: 'Радиус +50%',                          cost: 380, rangeMult: 1.5 },
        { name: 'Тысяча солнц', desc: 'Урон ×1.5 · Радиус +50%',             cost: 540, damageMult: 1.5, rangeMult: 1.5 },
      ],
    },
  },

  // ── Map 3: Dark Kingdom towers ───────────────────────────────────────────────
  bone_cannon: {
    A: {
      name: 'Тяжёлые кости', letter: 'А',
      desc: 'Урон ×1.7 · Радиус +36',
      color: '#aaaaaa', accentColor: '#888888', bulletColor: '#dddddd',
      cost: 125,
      apply: { damageMult: 1.7, range: 36 },
      upgrades: [
        { name: 'Костяная дробь', desc: 'Урон +30',    cost: 160, damage: 30 },
        { name: 'Адская кость',   desc: 'Урон ×1.3',   cost: 250, damageMult: 1.3 },
      ],
    },
    B: {
      name: 'Взрыв костей', letter: 'Б',
      desc: 'Осколочный взрыв (радиус 80px) · Урон ×1.5',
      color: '#774422', accentColor: '#553311', bulletColor: '#cc8844',
      cost: 150,
      apply: { damageMult: 1.5, splashBone: 80 },
      upgrades: [
        { name: 'Костяной взрыв', desc: 'Взрыв +30px',             cost: 190, splashBoneBonus: 30 },
        { name: 'Ударная волна',  desc: 'Взрыв ×1.4 · Урон ×1.2', cost: 280, damageMult: 1.2, splashBoneMult: 1.4 },
      ],
    },
  },
  curse_tower: {
    A: {
      name: 'Ужас', letter: 'А',
      desc: 'Броня −60% · Радиус +30%',
      color: '#440066', accentColor: '#220044', bulletColor: '#aa44ff',
      cost: 160,
      apply: { curseArmorSet: 0.4, rangeMult: 1.3 },
      upgrades: [
        { name: 'Глубокое проклятие', desc: 'Броня −75%',              cost: 200, curseArmorSet: 0.25 },
        { name: 'Вечная немощь',      desc: 'Также замедляет на 30%', cost: 300, curseTowerSlowSet: 0.7 },
      ],
    },
    B: {
      name: 'Тёмный зов', letter: 'Б',
      desc: 'Также накладывает проклятие (×1.4 урона) · Радиус +20%',
      color: '#1a0044', accentColor: '#330066', bulletColor: '#7744cc',
      cost: 180,
      apply: { curseTowerAddCurse: true, rangeMult: 1.2 },
      upgrades: [
        { name: 'Тёмные руны',              desc: 'Радиус +30%',               cost: 220, rangeMult: 1.3 },
        { name: 'Всепроникающее проклятие', desc: 'Броня −65% · Проклятие ×1.6', cost: 320, curseArmorSet: 0.35, curseDmgFactor: 1.6 },
      ],
    },
  },
  shadow_blade: {
    A: {
      name: 'Триединство', letter: 'А',
      desc: '+1 цель · Урон ×1.3',
      color: '#440066', accentColor: '#330055', bulletColor: '#cc55ff',
      cost: 200,
      apply: { shadowBladeTargetsBonus: 1, damageMult: 1.3 },
      upgrades: [
        { name: 'Четыре клинка', desc: 'Урон +20',  cost: 240, damage: 20 },
        { name: 'Вихрь клинков', desc: 'Урон ×1.3', cost: 360, damageMult: 1.3 },
      ],
    },
    B: {
      name: 'Острота', letter: 'Б',
      desc: 'Урон ×1.8',
      color: '#220033', accentColor: '#110022', bulletColor: '#9900ff',
      cost: 175,
      apply: { damageMult: 1.8 },
      upgrades: [
        { name: 'Мастер клинков', desc: 'Урон +25 · Радиус +18', cost: 220, damage: 25, range: 18 },
        { name: 'Гильотина',      desc: 'Урон ×1.4',             cost: 340, damageMult: 1.4 },
      ],
    },
  },
  fear_gate: {
    A: {
      name: 'Паника', letter: 'А',
      desc: 'Паралич 5 сек · Радиус +20%',
      color: '#660000', accentColor: '#440000', bulletColor: '#ff4444',
      cost: 220,
      apply: { paralyzeDurationBonus: 2, rangeMult: 1.2 },
      upgrades: [
        { name: 'Великий страх',    desc: 'Паралич +1 сек',         cost: 260, paralyzeDurationBonus: 1 },
        { name: 'Тотальная паника', desc: 'Перезарядка −2 сек',     cost: 380, fearCooldownBonus: 120 },
      ],
    },
    B: {
      name: 'Большие врата', letter: 'Б',
      desc: 'Радиус ×1.5 · Перезарядка −3 сек',
      color: '#440000', accentColor: '#330000', bulletColor: '#ff2222',
      cost: 240,
      apply: { rangeMult: 1.5, fearCooldownBonus: 180 },
      upgrades: [
        { name: 'Монументальные врата', desc: 'Радиус +30%',    cost: 280, rangeMult: 1.3 },
        { name: 'Вечный страх',         desc: 'Паралич +2 сек', cost: 400, paralyzeDurationBonus: 2 },
      ],
    },
  },
  soul_trap: {
    A: {
      name: 'Алчность', letter: 'А',
      desc: '+5g за убийство · Радиус +30%',
      color: '#3366ff', accentColor: '#2255cc', bulletColor: '#55aaff',
      cost: 260,
      apply: { soulGoldBonusBonus: 5, rangeMult: 1.3 },
      upgrades: [
        { name: 'Жадность',      desc: '+4g за убийство',              cost: 300, soulGoldBonusBonus: 4 },
        { name: 'Золотая жатва', desc: 'Радиус +30% · +3g за убийство', cost: 420, rangeMult: 1.3, soulGoldBonusBonus: 3 },
      ],
    },
    B: {
      name: 'Тёмная сила', letter: 'Б',
      desc: 'Урон ×1.4 · Удар душ ×5 урона',
      color: '#0055cc', accentColor: '#004499', bulletColor: '#0099ff',
      cost: 240,
      apply: { damageMult: 1.4, soulPowerMultBonus: 2 },
      upgrades: [
        { name: 'Мощь душ',   desc: 'Урон ×1.4',                   cost: 280, damageMult: 1.4 },
        { name: 'Разрыв душ', desc: 'Урон ×1.4 · Радиус удара +50%', cost: 400, damageMult: 1.4, soulPowerRangeMult: 1.5 },
      ],
    },
  },
  obsidian_tower: {
    A: {
      name: 'Ледяной удар', letter: 'А',
      desc: 'Замороженные получают 50 урона',
      color: '#0066aa', accentColor: '#004488', bulletColor: '#00ddff',
      cost: 300,
      apply: { obsidianDmgBonus: 50 },
      upgrades: [
        { name: 'Кристальный удар', desc: '+30 урон замороженным',          cost: 360, obsidianDmgBonus: 30 },
        { name: 'Абсолютный лёд',   desc: '+50 урон · Заморозка +1 сек',   cost: 500, obsidianDmgBonus: 50, obsidianFreezeBonus: 1 },
      ],
    },
    B: {
      name: 'Ледяная уязвимость', letter: 'Б',
      desc: 'Замороженные берут ×2 урона от всех башен',
      color: '#003366', accentColor: '#002244', bulletColor: '#0099cc',
      cost: 280,
      apply: { obsidianFrozenDmgMult: 2.0 },
      upgrades: [
        { name: 'Хрупкий лёд',  desc: 'Радиус +30%',              cost: 340, rangeMult: 1.3 },
        { name: 'Лёд и пламя',  desc: 'Радиус +30% · Ожог 2%/сек', cost: 480, rangeMult: 1.3, obsidianBurn: true },
      ],
    },
  },
  void_rift: {
    A: {
      name: 'Ширящаяся тьма', letter: 'А',
      desc: 'Урон 6% maxHP',
      color: '#7700cc', accentColor: '#550099', bulletColor: '#bb44ff',
      cost: 350,
      apply: { voidDmgPctBonus: 0.02 },
      upgrades: [
        { name: 'Пропасть',      desc: 'Урон +1% maxHP',                      cost: 420, voidDmgPctBonus: 0.01 },
        { name: 'Тёмная бездна', desc: 'Урон +1% · Перезарядка −1 сек',      cost: 580, voidDmgPctBonus: 0.01, voidCooldownBonus: 60 },
      ],
    },
    B: {
      name: 'Цепная пустота', letter: 'Б',
      desc: 'После взрыва все враги замедлены 50% на 3 сек',
      color: '#440088', accentColor: '#330066', bulletColor: '#8833ff',
      cost: 320,
      apply: { voidSlowAll: true },
      upgrades: [
        { name: 'Тьма поглощает', desc: 'Замедление 65%',          cost: 380, voidSlowBonus: 0.15 },
        { name: 'Тотальная тьма', desc: 'Перезарядка −2 сек',       cost: 520, voidCooldownBonus: 120 },
      ],
    },
  },
  dark_vortex: {
    A: {
      name: 'Поглощение', letter: 'А',
      desc: 'Замедление 80% · Урон 1% maxHP/сек',
      color: '#6600cc', accentColor: '#4400aa', bulletColor: '#cc44ff',
      cost: 450,
      apply: { darkVortexSlowFactor: 0.2, darkVortexDpsPct: 0.01 },
      upgrades: [
        { name: 'Гравитация',  desc: 'Радиус +10% · Урон +0.5%/сек', cost: 520, rangeMult: 1.1, darkVortexDpsPct: 0.005 },
        { name: 'Чёрная дыра', desc: 'Урон +1% maxHP/сек',            cost: 700, darkVortexDpsPct: 0.01 },
      ],
    },
    B: {
      name: 'Расширение', letter: 'Б',
      desc: 'Радиус ×1.5',
      color: '#3300aa', accentColor: '#220088', bulletColor: '#9944ff',
      cost: 400,
      apply: { rangeMult: 1.5 },
      upgrades: [
        { name: 'Великий вихрь',     desc: 'Радиус ×1.3',                   cost: 480, rangeMult: 1.3 },
        { name: 'Бесконечный вихрь', desc: 'Радиус ×1.3 · Замедление 70%', cost: 620, rangeMult: 1.3, darkVortexSlowFactor: 0.3 },
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
  if (bonuses.catBurn)                 tower.comboMult.catBurn    = true;
  if (bonuses.doubleStacks)            tower.comboMult.doubleStacks = true;
  if (bonuses.blockBonus)              tower.comboMult.blockBonus = true;
  if (bonuses.mirrorCurse)             tower.comboMult.mirrorCurse = true;
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
  // ── Map 2 combos ─────────────────────────────────────────────────────────────
  // Факельник + Катапульта: катапульта поджигает при каждом попадании
  if ((ta==='torch'&&tb==='catapult')||(ta==='catapult'&&tb==='torch')) {
    const cat = ta==='catapult' ? a : b;
    _giveCombo(cat, ta==='torch'?a:b, 'Факельник+Катапульта: огонь', { catBurn: true });
  }
  // Скорпион + Обелиск: проклятые враги получают стаки в 2× быстрее
  if ((ta==='scorpion'&&tb==='obelisk')||(ta==='obelisk'&&tb==='scorpion')) {
    const sc = ta==='scorpion' ? a : b;
    _giveCombo(sc, ta==='obelisk'?a:b, 'Скорпион+Обелиск: двойные стаки', { doubleStacks: true });
  }
  // Стражник + любая: заблокированный враг получает ×2 урона
  if (ta==='tombguard' || tb==='tombguard') {
    const other = ta==='tombguard' ? b : a;
    const guard = ta==='tombguard' ? a : b;
    _giveCombo(other, guard, 'Стражник: ×2 по блокированным', { blockBonus: true });
  }
  // Зеркало + Обелиск: луч накладывает проклятие на всех в линии
  if ((ta==='sunmirror'&&tb==='obelisk')||(ta==='obelisk'&&tb==='sunmirror')) {
    const mirror = ta==='sunmirror' ? a : b;
    _giveCombo(mirror, ta==='obelisk'?a:b, 'Зеркало+Обелиск: луч проклинает', { mirrorCurse: true });
  }
  // Вихрь легендарный — проверяется динамически в _applyPairCombo при recalculate
  if ((ta==='sandstorm'&&a.legendary) || (tb==='sandstorm'&&b.legendary)) {
    const storm = ta==='sandstorm' ? a : b;
    const other = ta==='sandstorm' ? b : a;
    if (storm.legendary) _giveCombo(other, storm, 'Ока Пустыни: +30% урон', { damage: 1.3 });
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
  if (effect.burnPctBonus  !== undefined) tower.burnPct      = (tower.burnPct || 0) + effect.burnPctBonus;
  if (effect.nuclear       !== undefined) tower.nuclear      = effect.nuclear;
  if (effect.poison        !== undefined) tower.poison       = effect.poison;
  if (effect.poisonDps     !== undefined) tower.poisonDps    = (tower.poisonDps || 0) + effect.poisonDps;
  if (effect.poisonPct     !== undefined) tower.poisonPct    = (tower.poisonPct || 0) + effect.poisonPct;
  if (effect.poisonDuration!== undefined) tower.poisonDuration = effect.poisonDuration;
  if (effect.slowFactor    !== undefined) tower.slowFactor   = effect.slowFactor;
  if (effect.mineIncome    !== undefined) tower.mineIncome  += effect.mineIncome;
  if (effect.chainTargets  !== undefined) tower.chainTargets = (tower.chainTargets || 0) + effect.chainTargets;
  if (effect.auraSlowFactor   !== undefined) tower.auraSlowFactor = effect.auraSlowFactor;
  // Map 2 tower upgrade effects
  if (effect.maxScorpionStacks!== undefined) tower.maxScorpionStacks = (tower.maxScorpionStacks||5) + effect.maxScorpionStacks;
  if (effect.scorpionPctBonus !== undefined) tower.scorpionPctBonus  = (tower.scorpionPctBonus||0) + effect.scorpionPctBonus;
  if (effect.sandstormSlowBonus!==undefined) tower.sandstormSlowFactor= Math.max(0.1, (tower.sandstormSlowFactor||0.65) - effect.sandstormSlowBonus);
  if (effect.sandstormDpsPctBonus!==undefined) tower.sandstormDpsPct = (tower.sandstormDpsPct||0.02) + effect.sandstormDpsPctBonus;
  if (effect.guardBlockBonus  !== undefined) tower.guardBlockDuration = (tower.guardBlockDuration||3) + effect.guardBlockBonus;
  if (effect.curseDurationBonus!==undefined) tower.curseDuration = (tower.curseDuration||8) + effect.curseDurationBonus;
  if (effect.mirrorNoPenalty  !== undefined) tower.mirrorNoPenalty = true;
  if (effect.snakeDistanceBonus!==undefined) tower.snakeDistance = (tower.snakeDistance||8) + effect.snakeDistanceBonus;
  if (effect.snakePoisonBonus !== undefined) tower.snakePoisonPct = (tower.snakePoisonPct||0.02) + effect.snakePoisonBonus;
  if (effect.maxSnakesBonus   !== undefined) tower.maxSnakes = (tower.maxSnakes||3) + effect.maxSnakesBonus;
  if (effect.burnDuration     !== undefined) tower.burnDuration = effect.burnDuration;
  // Map 3 tower upgrade effects
  if (effect.shadowBladeTargetsBonus !== undefined) tower.shadowBladeTargets = (tower.shadowBladeTargets || 3) + effect.shadowBladeTargetsBonus;
  if (effect.paralyzeDurationBonus   !== undefined) tower.paralyzeDuration   = (tower.paralyzeDuration   || 3) + effect.paralyzeDurationBonus;
  if (effect.fearCooldownBonus       !== undefined) tower.fireRate            = Math.max(60, tower.fireRate - effect.fearCooldownBonus);
  if (effect.soulGoldBonusBonus      !== undefined) tower.soulGoldBonus      = (tower.soulGoldBonus      || 3) + effect.soulGoldBonusBonus;
  if (effect.soulPowerMultBonus      !== undefined) tower.soulPowerMult      = (tower.soulPowerMult      || 0) + effect.soulPowerMultBonus;
  if (effect.soulPowerRangeMult      !== undefined) tower.soulPowerRangeMult = (tower.soulPowerRangeMult || 1) * effect.soulPowerRangeMult;
  if (effect.obsidianDmgBonus        !== undefined) tower.obsidianDmg        = (tower.obsidianDmg        || 0) + effect.obsidianDmgBonus;
  if (effect.obsidianFreezeBonus     !== undefined) tower.obsidianFreezeDuration = (tower.obsidianFreezeDuration || 3) + effect.obsidianFreezeBonus;
  if (effect.obsidianFrozenDmgMult   !== undefined) tower.obsidianFrozenDmgMult  = Math.max(tower.obsidianFrozenDmgMult || 1, effect.obsidianFrozenDmgMult);
  if (effect.obsidianBurn            !== undefined) tower.obsidianBurn       = true;
  if (effect.voidDmgPctBonus         !== undefined) tower.voidRiftDmgPct     = (tower.voidRiftDmgPct     || 0.04) + effect.voidDmgPctBonus;
  if (effect.voidCooldownBonus       !== undefined) tower.fireRate            = Math.max(60, tower.fireRate - effect.voidCooldownBonus);
  if (effect.voidSlowAll             !== undefined) tower.voidRiftSlowAll    = true;
  if (effect.voidSlowBonus           !== undefined) tower.voidRiftSlowFactor = Math.max(0.1, (tower.voidRiftSlowFactor || 0.5) - effect.voidSlowBonus);
  if (effect.curseArmorSet           !== undefined) tower.curseArmorFactor   = effect.curseArmorSet;
  if (effect.curseTowerSlowSet       !== undefined) tower.curseTowerSlowFactor = effect.curseTowerSlowSet;
  if (effect.curseTowerAddCurse      !== undefined) tower.curseTowerAddCurse = true;
  if (effect.curseDmgFactor          !== undefined) tower.curseTowerDmgFactor = effect.curseDmgFactor;
  if (effect.splashBone              !== undefined) { tower.pierce = false; tower.boneSplashRadius = effect.splashBone; tower.splashRadius = effect.splashBone; }
  if (effect.splashBoneBonus         !== undefined) { tower.boneSplashRadius = (tower.boneSplashRadius || 80) + effect.splashBoneBonus; tower.splashRadius = tower.boneSplashRadius; }
  if (effect.splashBoneMult          !== undefined) { tower.boneSplashRadius = Math.round((tower.boneSplashRadius || 80) * effect.splashBoneMult); tower.splashRadius = tower.boneSplashRadius; }
  if (effect.darkVortexSlowFactor    !== undefined) tower.darkVortexSlowFactor = effect.darkVortexSlowFactor;
  if (effect.darkVortexDpsPct        !== undefined) tower.darkVortexDpsPct   = (tower.darkVortexDpsPct   || 0) + effect.darkVortexDpsPct;
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

// ─── Arc bullet (Катапульта) ─────────────────────────────────────────────────
class ArcBullet {
  constructor(x, y, target, def, splashRadius) {
    this.startX = x; this.startY = y;
    this.x = x; this.y = y;
    this.target = target;
    this.damage = def.damage;
    this.splashRadius = splashRadius || 54;
    this.color  = def.bulletColor;
    this.size   = def.bulletSize || 8;
    this.progress = 0;
    this.speed    = def.bulletSpeed || 5;
    this.dead     = false;
    this.exploding = false; this.explodeTimer = 0;
    this.hitX = 0; this.hitY = 0;
    this.burn = def.burn || false;
    this.burnPct = def.burnPct || 0;
    this.burnDuration = def.burnDuration || 4;
    this.fireShot = def.fireShot || false;
    this.armorPierce = def.armorPierce || false;
  }

  update(enemies) {
    if (this.exploding) {
      this.explodeTimer++;
      if (this.explodeTimer > 14) this.dead = true;
      return [];
    }
    if (!this.target || this.target.dead || this.target.reached) { this.dead = true; return []; }
    const dx = this.target.x - this.startX, dy = this.target.y - this.startY;
    const dist = Math.sqrt(dx*dx + dy*dy) || 1;
    this.progress += (this.speed * 60) / (dist * 60);
    if (this.progress >= 1) {
      this.hitX = this.target.x; this.hitY = this.target.y;
      this.exploding = true;
      const hits = [];
      enemies.forEach(e => {
        if (e.dead || e.reached) return;
        const ex = e.x - this.hitX, ey = e.y - this.hitY;
        if (Math.sqrt(ex*ex + ey*ey) <= this.splashRadius) {
          e.takeDamage(this.damage, this.armorPierce);
          if (this.burnPct > 0) e.applyBurn(e.maxHP * this.burnPct, this.burnDuration);
          else if (this.burn)   e.applyBurn(this.damage * 0.5, this.burnDuration);
          hits.push(e);
        }
      });
      return hits;
    }
    const t = this.progress;
    this.x = this.startX + dx * t;
    this.y = this.startY + dy * t - 64 * 4 * t * (1 - t);
    return [];
  }

  draw(ctx) {
    if (this.exploding) {
      const r  = this.splashRadius * (this.explodeTimer / 14);
      const op = 1 - this.explodeTimer / 14;
      ctx.save(); ctx.globalAlpha = op;
      ctx.strokeStyle = this.fireShot ? '#e67e22' : '#888';
      ctx.lineWidth   = this.fireShot ? 4 : 3;
      ctx.beginPath(); ctx.arc(this.hitX, this.hitY, r, 0, Math.PI*2); ctx.stroke();
      ctx.fillStyle = this.fireShot ? 'rgba(230,120,0,0.18)' : 'rgba(120,120,120,0.18)';
      ctx.fill();
      ctx.restore(); return;
    }
    ctx.save();
    ctx.shadowColor = this.fireShot ? '#e67e22' : '#666'; ctx.shadowBlur = this.fireShot ? 10 : 4;
    ctx.fillStyle = this.fireShot ? '#e74c3c' : '#7f8c8d';
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
    if (this.fireShot) {
      ctx.globalAlpha = 0.5; ctx.fillStyle = '#f39c12';
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size + 3, 0, Math.PI*2); ctx.fill();
    }
    ctx.restore();
  }
}

// ─── Snake (Заклинатель Змей) ─────────────────────────────────────────────────
class Snake {
  constructor(path, startIndex, def) {
    this.path         = path;
    this.pathIndex    = Math.min(startIndex, path.length - 2);
    this.x = path[this.pathIndex]?.x || path[0].x;
    this.y = path[this.pathIndex]?.y || path[0].y;
    this.speed        = 1.5;                     // cells per second
    this.maxCells     = def.snakeDistance || 8;
    this.cellsTraveled= 0;
    this.dead         = false;
    this.hit          = new Set();
    this.damage       = def.snakeDamage   || 20;
    this.poisonPct    = def.snakePoisonPct   || 0.02;
    this.poisonDuration = def.snakePoisonDuration || 3;
    this.poisonExplode= def.poisonExplode || false;
    this.activeSnakesRef = null;
  }

  update(dt, enemies) {
    if (this.dead) return [];
    const step = this.speed * CELL * dt;
    this.cellsTraveled += step / CELL;
    if (this.cellsTraveled >= this.maxCells || this.pathIndex >= this.path.length - 1) {
      this.dead = true; return [];
    }
    const target = this.path[this.pathIndex + 1];
    const dx = target.x - this.x, dy = target.y - this.y;
    const dist = Math.sqrt(dx*dx + dy*dy) || 1;
    if (step >= dist) {
      this.x = target.x; this.y = target.y; this.pathIndex++;
    } else {
      this.x += (dx / dist) * step; this.y += (dy / dist) * step;
    }
    const hits = [];
    enemies.forEach(e => {
      if (e.dead || e.reached || this.hit.has(e)) return;
      const ex = e.x - this.x, ey = e.y - this.y;
      if (Math.sqrt(ex*ex + ey*ey) <= e.size + 12) {
        e.takeDamage(this.damage, true);
        e.applyPoison(e.maxHP * this.poisonPct, this.poisonDuration);
        this.hit.add(e); hits.push(e);
      }
    });
    return hits;
  }

  draw(ctx) {
    if (this.dead) return;
    const now = Date.now() * 0.006;
    ctx.save();
    ctx.shadowColor = '#27ae60'; ctx.shadowBlur = 8;
    // Body wave
    const wave = Math.sin(now) * 3;
    ctx.fillStyle = '#2ecc71';
    ctx.beginPath(); ctx.ellipse(this.x + wave, this.y, 8, 5, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#1e8449';
    ctx.beginPath(); ctx.ellipse(this.x + wave, this.y, 6, 3.5, 0, 0, Math.PI*2); ctx.fill();
    // Eyes
    ctx.shadowBlur = 0; ctx.fillStyle = '#f1c40f';
    ctx.beginPath(); ctx.arc(this.x + wave + 3,  this.y - 2, 1.5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(this.x + wave + 3,  this.y + 2, 1.5, 0, Math.PI*2); ctx.fill();
    // Tongue
    ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(this.x + wave + 7, this.y);
    ctx.lineTo(this.x + wave + 11, this.y - 2);
    ctx.moveTo(this.x + wave + 7, this.y);
    ctx.lineTo(this.x + wave + 11, this.y + 2); ctx.stroke();
    ctx.restore();
  }
}

// ─── Beam effect (Зеркало Солнца) ─────────────────────────────────────────────
class BeamEffect {
  constructor(x, y, angle, range, precomputedHits) {
    this.x = x; this.y = y;
    this.angle = angle;
    this.range = range;
    this._hits = precomputedHits;
    this._hitsDone = false;
    this.life = 10;
    this.dead = false;
    this.damage = 0; // damage already applied
  }

  update(enemies) {
    this.life--;
    if (this.life <= 0) this.dead = true;
    if (!this._hitsDone) { this._hitsDone = true; return this._hits; }
    return [];
  }

  draw(ctx) {
    const a = this.life / 10;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.shadowColor = '#f1c40f'; ctx.shadowBlur = 24;
    ctx.strokeStyle = '#fffaaa'; ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + Math.cos(this.angle) * this.range,
               this.y + Math.sin(this.angle) * this.range);
    ctx.stroke();
    // Inner bright core
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + Math.cos(this.angle) * this.range,
               this.y + Math.sin(this.angle) * this.range);
    ctx.stroke();
    ctx.restore();
  }
}

// ─── Ice Beam Effect (Обсидиановая башня) ────────────────────────────────────
class IceBeamEffect {
  constructor(x, y, angle, range, hits, dmg = 0, burn = false) {
    this.x = x; this.y = y;
    this.angle = angle; this.range = range;
    this._hits = hits;
    this.damage = dmg; // fury-modifiable
    this.burn = burn;
    this.life = 10; this.dead = false; this._done = false;
  }

  update(enemies) {
    this.life--;
    if (this.life <= 0) this.dead = true;
    if (!this._done) {
      this._done = true;
      if (this.damage > 0 || this.burn) {
        this._hits.forEach(e => {
          if (!e.dead && !e.reached) {
            if (this.damage > 0) e.takeDamage(this.damage);
            if (this.burn) e.applyBurn(e.maxHP * 0.02, 4);
          }
        });
      }
      return this._hits.filter(e => !e.dead && !e.reached).concat(this._hits.filter(e => e.dead));
    }
    return [];
  }

  draw(ctx) {
    const a = this.life / 10;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.shadowColor = '#00ccff'; ctx.shadowBlur = 28;
    ctx.strokeStyle = '#00eeff'; ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + Math.cos(this.angle) * this.range, this.y + Math.sin(this.angle) * this.range);
    ctx.stroke();
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + Math.cos(this.angle) * this.range, this.y + Math.sin(this.angle) * this.range);
    ctx.stroke();
    // Ice crystals along beam
    ctx.shadowColor = '#00ccff'; ctx.shadowBlur = 6;
    for (let i = 0.2; i < 1; i += 0.2) {
      const bx = this.x + Math.cos(this.angle) * this.range * i;
      const by = this.y + Math.sin(this.angle) * this.range * i;
      ctx.fillStyle = `rgba(0,220,255,${a * 0.6})`;
      ctx.beginPath(); ctx.arc(bx, by, 4, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }
}

// ─── Void Pulse (Разрыв тьмы) ────────────────────────────────────────────────
class VoidPulse {
  constructor(x, y, dmgPct, slowAll, slowFactor, allEnemies) {
    this.x = x; this.y = y;
    this.dmgPct = dmgPct; this.slowAll = slowAll; this.slowFactor = slowFactor;
    this._enemies = allEnemies;
    this.damage = 0; this.dead = false; this.life = 18; this._done = false;
  }

  update(enemies) {
    this.life--;
    if (this.life <= 0) this.dead = true;
    if (!this._done) {
      this._done = true;
      const hits = [];
      this._enemies.forEach(e => {
        if (!e.dead && !e.reached) {
          e.takeDamage(e.maxHP * this.dmgPct, true);
          if (this.slowAll) e.applySlow(this.slowFactor, 3);
          hits.push(e);
        }
      });
      return hits;
    }
    return [];
  }

  draw(ctx) {
    if (!this._done) return;
    const progress = 1 - this.life / 18;
    const r = 350 * progress;
    const a = (1 - progress) * 0.55;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.strokeStyle = '#9933ff'; ctx.lineWidth = 4;
    ctx.shadowColor = '#cc00ff'; ctx.shadowBlur = 24;
    ctx.beginPath(); ctx.arc(this.x, this.y, r, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(100,0,150,0.08)'; ctx.fill();
    ctx.restore();
  }
}

// ─── Soul Burst (Душехват — заряженный выстрел) ───────────────────────────────
class SoulBurst {
  constructor(x, y, range, dmg, legendary, allEnemies) {
    this.x = x; this.y = y;
    this.range = range; this.damage = dmg;
    this.legendary = legendary;
    this._enemies = allEnemies;
    this.dead = false; this.life = 22; this._done = false;
  }

  update(enemies) {
    this.life--;
    if (this.life <= 0) this.dead = true;
    if (!this._done) {
      this._done = true;
      const hits = [];
      this._enemies.forEach(e => {
        if (!e.dead && !e.reached) {
          const dx = e.x - this.x, dy = e.y - this.y;
          if (this.legendary || Math.sqrt(dx*dx+dy*dy) <= this.range) {
            e.takeDamage(this.damage);
            hits.push(e);
          }
        }
      });
      return hits;
    }
    return [];
  }

  draw(ctx) {
    const progress = 1 - this.life / 22;
    const r = this.legendary ? 400 * progress : this.range * progress;
    const a = (1 - progress) * 0.7;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.shadowColor = '#3399ff'; ctx.shadowBlur = 28;
    ctx.strokeStyle = '#55bbff'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(this.x, this.y, r, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = `rgba(51,153,255,${a * 0.12})`; ctx.fill();
    // Soul particles
    for (let i = 0; i < 6; i++) {
      const ang = i * Math.PI / 3 + progress * Math.PI * 4;
      const pr = r * 0.8;
      ctx.fillStyle = `rgba(100,200,255,${a})`;
      ctx.beginPath(); ctx.arc(this.x + Math.cos(ang)*pr, this.y + Math.sin(ang)*pr, 4, 0, Math.PI*2); ctx.fill();
    }
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
    // Map 2 fields
    this.burnPct        = def.burnPct        || 0;
    this.isScorpion     = def.isScorpion     || false;
    this.maxScorpionStacks = def.maxScorpionStacks || 5;
    this.scorpionLegendary = def.scorpionLegendary || false;
    this.isCurse        = def.isCurse        || false;
    this.curseFactor    = def.curseFactor    || 1.6;
    this.curseDuration  = def.curseDuration  || 8;
    this.curseLegendary = def.curseLegendary || false;
    this.fireLegendary  = def.fireLegendary  || false;
    // Map 3 bullet fields
    this.shadowBladeArmorReduce = false;
    this.soulTrapTower = null;
    this.dead     = false;
    this.hitX = 0; this.hitY = 0;
    this.annihilator = def.annihilator || false;
    this._zonePos    = null;
    this.exploding   = false;
    this.explodeTimer = 0;
  }

  _onHit(e) {
    if (this.slowFactor < 1) {
      const sf = this.towerType === 'slow' ? Math.max(this.slowFactor, 0.4) : this.slowFactor;
      e.applySlow(sf, this.slowDuration);
    }
    if (this.burn)    e.applyBurn(this.burnDps, this.burnDuration);
    if (this.burnPct) e.applyBurn(e.maxHP * this.burnPct, this.burnDuration);
    if (this.poison) {
      const dps = this.poisonPct > 0 ? e.maxHP * this.poisonPct : this.poisonDps;
      e.applyPoison(dps, this.poisonDuration);
    }
    if (this.isCurse) e.applyCurse(this.curseFactor, this.curseDuration);
    if (this.shadowBladeArmorReduce) {
      e.applyArmorDebuff(Math.max(0.1, (e.armorDebuffFactor || 1) - 0.1), 4);
    }
    // blockBonus combo: заблокированные враги получают x2 от этой башни
    // (actual ×2 applied in takeDamage via enemy.blockedFactor when set by tombguard legendary)
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

// ─── Falcon bullet (bird-shaped projectile for Соколятник) ───────────────────
class FalconBullet {
  constructor(x, y, target, def) {
    this.x = x; this.y = y;
    this.target = target;
    this.damage = def.damage;
    this.speed  = def.bulletSpeed || 9;
    this.dead   = false;
    this.angle  = Math.atan2(target.y - y, target.x - x);
    this.wingPhase = 0;
  }

  update(enemies) {
    if (!this.target || this.target.dead || this.target.reached) { this.dead = true; return []; }
    const dx = this.target.x - this.x, dy = this.target.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    this.angle = Math.atan2(dy, dx);
    this.wingPhase++;
    if (dist < this.speed + 4) {
      this.target.takeDamage(this.damage, false);
      this.dead = true;
      return [this.target];
    }
    this.x += (dx / dist) * this.speed;
    this.y += (dy / dist) * this.speed;
    return [];
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    const wing = Math.sin(this.wingPhase * 0.45) * 3.5;
    // тело
    ctx.fillStyle = '#8B5E3C';
    ctx.beginPath(); ctx.ellipse(0, 0, 5, 2, 0, 0, Math.PI * 2); ctx.fill();
    // крылья
    ctx.fillStyle = '#5C3A1E';
    ctx.beginPath(); ctx.moveTo(-2, 0); ctx.lineTo(-7, -wing - 1); ctx.lineTo(-1, 0); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-2, 0); ctx.lineTo(-7,  wing + 1); ctx.lineTo(-1, 0); ctx.fill();
    // голова
    ctx.fillStyle = '#c8843a';
    ctx.beginPath(); ctx.arc(5, 0, 2, 0, Math.PI * 2); ctx.fill();
    // хвост
    ctx.fillStyle = '#7a4a20';
    ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(-9, -2); ctx.lineTo(-9, 2); ctx.fill();
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
    this.comboMult        = { damage: 1, range: 1, fireRate: 1, armorPierce: false, chainBonus: 0, catBurn: false, doubleStacks: false, blockBonus: false, mirrorCurse: false };
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
    this.antiairOnly = (type === 'antiair') || !!def.antiairOnly;
    this.isFalconer  = def.isFalconer  || false;
    this.isLinear    = !!(def.linearUpgrades);
    // Map 2 specific fields
    this.mapOnly          = def.mapOnly          || null;
    this.burnPct          = def.burnPct          || 0;
    this.isArc            = def.isArc            || false;
    this.isScorpion       = def.isScorpion       || false;
    this.maxScorpionStacks= def.maxScorpionStacks|| 5;
    this.scorpionPctBonus = 0;
    this.isSandstorm      = def.isSandstorm      || false;
    this.sandstormSlowFactor = def.sandstormSlowFactor || 0.65;
    this.sandstormDpsPct  = def.sandstormDpsPct  || 0.02;
    this.isGuard          = def.isGuard          || false;
    this.guardBlockDuration= def.guardBlockDuration || 3;
    this._guardBlocking   = [];
    this.isCurse          = def.isCurse          || false;
    this.curseFactor      = def.curseFactor      || 1.6;
    this.curseDuration    = def.curseDuration    || 8;
    this.isSnakeCharmer   = def.isSnakeCharmer   || false;
    this.snakeDamage      = def.snakeDamage      || 20;
    this.snakePoisonPct   = def.snakePoisonPct   || 0.02;
    this.snakePoisonDuration = def.snakePoisonDuration || 3;
    this.snakeDistance    = def.snakeDistance    || 8;
    this.snakeInterval    = def.snakeInterval    || 5;
    this.maxSnakes        = def.maxSnakes        || 3;
    this._snakeTimer      = 0;
    this._activeSnakeCount= 0;
    this.isSunMirror      = def.isSunMirror      || false;
    this.mirrorDmgDecay   = def.mirrorDmgDecay   || 0.85;
    this.mirrorNoPenalty  = false;

    // HP system (gorge map only — null means invulnerable)
    this.maxHP      = def.maxHP ?? null;
    this.hp         = this.maxHP;
    this.flashTimer = 0;

    // Meta
    this.totalSpent  = def.cost;
    this.cooldown    = 0;
    this.selected    = false;
    this.angle       = 0;
    this.game        = game;
    // Maze map specials
    this.mazeTowerDebuffTimer = 0; // void_mage: -40% damage for N seconds
    // Map 3 tower fields
    this.isBoneCannon      = def.isBoneCannon      || false;
    this.boneSplashRadius  = 0;
    this.isCurseTower      = def.isCurseTower      || false;
    this.curseArmorFactor  = def.curseArmorFactor  || 1;
    this.curseTowerSlowFactor = def.curseTowerSlowFactor || 0.8;
    this.curseTowerAddCurse= false;
    this.curseTowerDmgFactor = 1.4;
    this.isShadowBlade     = def.isShadowBlade     || false;
    this.shadowBladeTargets= def.shadowBladeTargets|| 3;
    this.shadowBladeArmorReduce = false;
    this.isParalyzeTower   = def.isParalyzeTower   || false;
    this.paralyzeDuration  = def.paralyzeDuration  || 3;
    this.isSoulTrap        = def.isSoulTrap        || false;
    this.soulCount         = 0;
    this.soulPowerReady    = false;
    this.soulGoldBonus     = def.soulGoldBonus     || 3;
    this.soulPowerMult     = 0;
    this.soulPowerRangeMult= 1;
    this.isObsidian        = def.isObsidian        || false;
    this.obsidianFreezeDuration = def.obsidianFreezeDuration || 3;
    this.obsidianDmg       = def.obsidianDmg       || 0;
    this.obsidianFrozenDmgMult = def.obsidianFrozenDmgMult || 1;
    this.obsidianBurn      = false;
    this.isVoidRift        = def.isVoidRift        || false;
    this.voidRiftDmgPct    = def.voidRiftDmgPct    || 0.04;
    this.voidRiftSlowAll   = def.voidRiftSlowAll   || false;
    this.voidRiftSlowFactor= 0.5;
    this.voidRiftLegendarySlowTimer = 0;
    this.isDarkVortex      = def.isDarkVortex      || false;
    this.darkVortexSlowFactor = def.darkVortexSlowFactor || 0.4;
    this.darkVortexDpsPct  = def.darkVortexDpsPct  || 0;
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

  takeDamage(amount) {
    if (this.maxHP === null) return;
    this.hp = Math.max(0, this.hp - amount);
    this.flashTimer = 12;
  }

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
    // Map 2 legendary activations (flags used in getDef / update)
    // torch: fireLegendary handled via getDef
    // catapult: fireShot every 4th handled in update
    // scorpion: scorpionLegendary handled via getDef + game.js
    // sandstorm: combo recalculated in ui.js after buy
    // tombguard: sealFactor = 3 in update (checks this.legendary)
    // obelisk: curseLegendary handled via getDef + game.js
    // snakecharmer: poisonExplode = this.legendary passed into Snake
    // sunmirror: burn beam handled in update (checks this.legendary)
    // Map 3 legendary activations
    if (this.type === 'bone_cannon')    this.shotCount = 0;
    if (this.type === 'fear_gate')      this.paralyzeDuration = Math.max(this.paralyzeDuration, 5);
    if (this.type === 'shadow_blade')   { this.shadowBladeTargets = Math.max(this.shadowBladeTargets, 5); this.shadowBladeArmorReduce = true; }
    if (this.type === 'dark_vortex')    this.darkVortexDpsPct = Math.max(this.darkVortexDpsPct, 0.02);
    return true;
  }

  // Returns { type, x, y, hits, radius? } or null. Call once per frame from game.js.
  updateLegendary(dt, enemies, pathPoints, globalTimeFreezeCD = 0) {
    if (!this.legendary) return null;
    if (this.maxHP !== null && this.hp <= 0) return null;

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

    // Map 3: bone_cannon legendary — every 4th shot, bone rain
    if (this.type === 'bone_cannon') {
      if (this.shotCount > 0 && this.shotCount % 4 === 0) {
        this.shotCount++;  // prevent re-trigger next frame
        const pt  = pathPoints[Math.floor(Math.random() * pathPoints.length)];
        const rad = 80;
        const hits = [];
        enemies.forEach(e => {
          if (e.dead || e.reached) return;
          const dx = e.x - pt.x, dy = e.y - pt.y;
          if (Math.sqrt(dx*dx + dy*dy) <= rad) { e.takeDamage(200, true); hits.push(e); }
        });
        return { type: 'meteor', x: pt.x, y: pt.y, radius: rad, hits };
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
      burnPct: this.burnPct,
      poison: this.poison, poisonDps: this.poisonDps, poisonPct: this.poisonPct, poisonDuration: this.poisonDuration, poisonSpread: this.poisonSpread,
      nuclear: this.nuclear,
      chainTargets: this.chainTargets + cm.chainBonus,
      armorPierce: cm.armorPierce,
      annihilator: this.annihilator,
      // Map 2
      isScorpion: this.isScorpion,
      maxScorpionStacks: this.maxScorpionStacks,
      scorpionLegendary: this.legendary && this.type === 'scorpion',
      isCurse: this.isCurse,
      curseFactor: this.curseFactor,
      curseDuration: this.curseDuration,
      curseLegendary: this.legendary && this.type === 'obelisk',
      fireLegendary: this.legendary && this.type === 'torch',
      catBurn: cm.catBurn || (this.legendary && this.type === 'catapult'),
    };
  }

  update(enemies) {
    if (this.isMine || this.isAura || this.isSnakeCharmer) return null;
    if (this.maxHP !== null && this.hp <= 0) return null;

    // ── Guard tower (melee block) ────────────────────────────────────────────
    if (this.isGuard) {
      if (this.cooldown > 0) { this.cooldown--; return null; }
      const effRange = Math.floor(this.range * this.comboMult.range * (this.game?.sandstormWavesLeft > 0 ? 0.7 : 1));
      const toBlock = [];
      enemies.forEach(e => {
        if (e.dead || e.reached || e.air || e.blocked) return;
        const dx = e.x - this.x, dy = e.y - this.y;
        if (Math.sqrt(dx*dx+dy*dy) <= effRange) toBlock.push(e);
      });
      if (toBlock.length === 0) return null;
      // Повернуться к ближайшему врагу из захваченных
      const nearest = toBlock.reduce((a, b) => {
        const da = (a.x-this.x)**2+(a.y-this.y)**2;
        const db = (b.x-this.x)**2+(b.y-this.y)**2;
        return da < db ? a : b;
      });
      this.angle = Math.atan2(nearest.y - this.y, nearest.x - this.x);
      this.cooldown = Math.max(5, Math.round(this.fireRate * this.comboMult.fireRate));
      const mapDmg = this.game?.mapDamageMult || 1;
      const dmg = Math.round(this.damage * this.comboMult.damage * mapDmg);
      const blockDur = this.guardBlockDuration;
      const sealFactor = this.legendary ? 3 : 1;
      toBlock.forEach(e => { e.takeDamage(dmg); e.applyBlock(blockDur, sealFactor); });
      return null;
    }

    // ── Sun Mirror (beam) ────────────────────────────────────────────────────
    if (this.isSunMirror) {
      if (this.cooldown > 0) { this.cooldown--; return null; }
      const effRange = Math.floor(this.range * this.comboMult.range * (this.game?.sandstormWavesLeft > 0 ? 0.7 : 1));
      let primary = null, bestP = -1;
      enemies.forEach(e => {
        if (e.dead || e.reached || e.air || e.invis) return;
        if (e.type === 'sand_spirit' && effRange < 72) return;
        const dx = e.x - this.x, dy = e.y - this.y;
        if (Math.sqrt(dx*dx+dy*dy) > effRange) return;
        const p = e.pathIndex + 0;
        if (p > bestP) { bestP = p; primary = e; }
      });
      if (!primary) return null;
      this.angle = Math.atan2(primary.y - this.y, primary.x - this.x);
      this.cooldown = Math.max(5, Math.round(this.fireRate * this.comboMult.fireRate));
      const mapDmg  = this.game?.mapDamageMult || 1;
      const baseDmg = Math.round(this.damage * this.comboMult.damage * mapDmg);
      const decay   = this.mirrorNoPenalty ? 1 : this.mirrorDmgDecay;
      const sinA = Math.sin(this.angle), cosA = Math.cos(this.angle);
      const hits = [];
      let beamDmg = baseDmg;
      const sorted = enemies
        .filter(e => !e.dead && !e.reached && !e.air)
        .sort((a,b) => {
          const da = (a.x-this.x)*cosA + (a.y-this.y)*sinA;
          const db = (b.x-this.x)*cosA + (b.y-this.y)*sinA;
          return da - db;
        });
      sorted.forEach(e => {
        const dx = e.x - this.x, dy = e.y - this.y;
        const dot   = dx * cosA + dy * sinA;
        const cross = Math.abs(dx * sinA - dy * cosA);
        if (dot <= 0 || dot > effRange || cross > 18) return;
        e.takeDamage(beamDmg, false);
        if (this.legendary) e.applyBurn(e.maxHP * 0.03, 5);
        if (this.comboMult.mirrorCurse) e.applyCurse(1.6, 6);
        hits.push(e);
        beamDmg = Math.round(beamDmg * decay);
      });
      return new BeamEffect(this.x, this.y, this.angle, effRange, hits);
    }

    // ── Paralyze tower (fear_gate) ───────────────────────────────────────────
    if (this.isParalyzeTower) {
      if (this.cooldown > 0) { this.cooldown--; return null; }
      const effRange = Math.floor(this.range * this.comboMult.range);
      const toParalyze = enemies.filter(e =>
        !e.dead && !e.reached && !e.air &&
        Math.sqrt((e.x-this.x)**2+(e.y-this.y)**2) <= effRange
      );
      if (toParalyze.length === 0) return null;
      this.angle = Math.atan2(toParalyze[0].y - this.y, toParalyze[0].x - this.x);
      this.cooldown = Math.max(60, Math.round(this.fireRate * this.comboMult.fireRate));
      const dur = this.paralyzeDuration;
      const dmgMult = this.legendary ? 1.5 : 1;
      toParalyze.forEach(e => e.applyParalyze(dur, dmgMult));
      if (this.game) this.game.spawnParticles(this.x, this.y, '#cc0000');
      return null;
    }

    // ── Obsidian tower (beam freeze) ─────────────────────────────────────────
    if (this.isObsidian) {
      if (this.cooldown > 0) { this.cooldown--; return null; }
      const effRange = Math.floor(this.range * this.comboMult.range);
      let primary = null, bestP = -1;
      enemies.forEach(e => {
        if (e.dead || e.reached || e.air || e.invis) return;
        const dx = e.x - this.x, dy = e.y - this.y;
        if (Math.sqrt(dx*dx+dy*dy) > effRange) return;
        if (e.pathIndex > bestP) { bestP = e.pathIndex; primary = e; }
      });
      if (!primary) return null;
      this.angle = Math.atan2(primary.y - this.y, primary.x - this.x);
      this.cooldown = Math.max(30, Math.round(this.fireRate * this.comboMult.fireRate));
      const cosA = Math.cos(this.angle), sinA = Math.sin(this.angle);
      const mapDmg = this.game?.mapDamageMult || 1;
      const hits = [];
      enemies
        .filter(e => !e.dead && !e.reached && !e.air)
        .forEach(e => {
          const dx = e.x - this.x, dy = e.y - this.y;
          const dot   = dx * cosA + dy * sinA;
          const cross = Math.abs(dx * sinA - dy * cosA);
          if (dot <= 0 || dot > effRange || cross > 18) return;
          e.applyParalyze(this.obsidianFreezeDuration, this.obsidianFrozenDmgMult);
          if (this.legendary) e.frozenByObsidianLeg = true;
          hits.push(e);
        });
      return new IceBeamEffect(
        this.x, this.y, this.angle, effRange, hits,
        Math.round(this.obsidianDmg * this.comboMult.damage * mapDmg),
        this.obsidianBurn
      );
    }

    // ── Void rift (global damage pulse) ──────────────────────────────────────
    if (this.isVoidRift) {
      if (this.cooldown > 0) { this.cooldown--; return null; }
      this.cooldown = Math.max(60, Math.round(this.fireRate * this.comboMult.fireRate));
      if (this.legendary) this.voidRiftLegendarySlowTimer = 5;
      return new VoidPulse(
        this.x, this.y,
        this.voidRiftDmgPct,
        this.voidRiftSlowAll,
        this.voidRiftSlowFactor || 0.5,
        enemies.slice() // snapshot
      );
    }

    if (this.cooldown > 0) { this.cooldown--; return null; }

    let best = null, bestProgress = -1;
    enemies.forEach(e => {
      if (e.dead || e.reached) return;
      if (this.antiairOnly && !e.air) return;   // зенитка бьёт только воздушных
      if (!this.antiairOnly && e.air) return;   // наземные башни игнорируют воздушных
      if (e.invis) return;                      // Ксара/хранитель гробниц невидимы
      const dx = e.x - this.x, dy = e.y - this.y;
      const effRange = Math.floor(this.range * this.comboMult.range * (this.game?.sandstormWavesLeft > 0 ? 0.7 : 1));
      // Песчаный дух: невидим для башен с радиусом меньше 2 клеток (72px)
      if (e.type === 'sand_spirit' && effRange < 72) return;
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
    if (this.pierce) {
      // Bone cannon legendary: count shots
      if (this.isBoneCannon && this.legendary) {
        this.shotCount = (this.shotCount || 0) + 1;
      }
      return new PierceBullet(this.x, this.y, this.angle, def);
    }
    if (this.legendary && this.type === 'basic') {
      this.shotCount++;
      if (this.shotCount % 5 === 0) return new PierceBullet(this.x, this.y, this.angle, def);
    }
    if (this.type === 'lightning' || def.chainTargets > 0) {
      return new ChainBullet(this.x, this.y, best, def, def.chainTargets, enemies);
    }
    // Катапульта: дуговой снаряд
    if (this.isArc) {
      this.shotCount = (this.shotCount || 0) + 1;
      const fireShot = (this.legendary && this.shotCount % 4 === 0);
      const arcDef = { ...def, fireShot, burnPct: fireShot ? 0.03 : 0, burnDuration: 4, bulletSpeed: TOWER_DEFS.catapult.bulletSpeed };
      return new ArcBullet(this.x, this.y, best, arcDef, this.splashRadius);
    }
    // Соколятник: сокол летит к воздушной цели; легендарное — 3 цели одновременно
    if (this.isFalconer) {
      if (this.legendary && this.game) {
        const airTargets = enemies
          .filter(e => !e.dead && !e.reached && e.air && !e.invis)
          .sort((a, b) => b.pathIndex - a.pathIndex)
          .slice(0, 3);
        if (airTargets.length === 0) return null;
        airTargets.slice(1).forEach(t => this.game.bullets.push(new FalconBullet(this.x, this.y, t, def)));
        return new FalconBullet(this.x, this.y, airTargets[0], def);
      }
      return new FalconBullet(this.x, this.y, best, def);
    }
    // Shadow blade: fires at N nearest enemies simultaneously
    if (this.isShadowBlade && this.game) {
      const n = this.shadowBladeTargets;
      const targets = enemies
        .filter(e => !e.dead && !e.reached && !e.air && !e.invis)
        .sort((a, b) => {
          const da = (a.x-this.x)**2+(a.y-this.y)**2;
          const db = (b.x-this.x)**2+(b.y-this.y)**2;
          return da - db;
        })
        .slice(0, n);
      if (targets.length === 0) return null;
      targets.forEach((t, i) => {
        const b2 = new Bullet(this.x, this.y, t, def, this.type, 0);
        if (this.shadowBladeArmorReduce) b2.shadowBladeArmorReduce = true;
        if (i === 0) { /* returned below */ } else this.game.bullets.push(b2);
      });
      const b0 = new Bullet(this.x, this.y, targets[0], def, this.type, 0);
      if (this.shadowBladeArmorReduce) b0.shadowBladeArmorReduce = true;
      return b0;
    }
    // Soul trap: power shot or normal bullet with soul tracking
    if (this.isSoulTrap) {
      if (this.soulPowerReady) {
        this.soulPowerReady = false;
        const powerDmg = Math.round(def.damage * (3 + this.soulPowerMult));
        const powerRange = Math.floor(this.range * this.comboMult.range * (this.soulPowerRangeMult || 1));
        return new SoulBurst(this.x, this.y, powerRange, powerDmg, this.legendary, enemies.slice());
      }
      const b = new Bullet(this.x, this.y, best, def, this.type, 0);
      b.soulTrapTower = this;
      return b;
    }
    return new Bullet(this.x, this.y, best, def, this.type, this.splashRadius);
  }

  updateAura(dt, enemies) {
    // Void rift legendary: dark zone slow after pulse (always active when timer > 0)
    if (this.isVoidRift && this.voidRiftLegendarySlowTimer > 0) {
      this.voidRiftLegendarySlowTimer -= dt;
      enemies.forEach(e => { if (!e.dead && !e.reached) e.applySlow(0.6, 0.12); });
    }

    if (!this.isAura) return;
    if (this.maxHP !== null && this.hp <= 0) return;
    const effRange = Math.floor(this.range * this.comboMult.range * (this.game?.sandstormWavesLeft > 0 ? 0.7 : 1));

    // ── Curse tower aura ──────────────────────────────────────────────────────
    if (this.isCurseTower) {
      const dur = this.legendary ? 6.0 : 0.12;
      enemies.forEach(e => {
        if (e.dead || e.reached) return;
        const dx = e.x - this.x, dy = e.y - this.y;
        if (Math.sqrt(dx*dx + dy*dy) <= effRange) {
          e.applyArmorDebuff(this.curseArmorFactor, dur);
          e.applySlow(this.curseTowerSlowFactor, dur);
          if (this.curseTowerAddCurse) e.applyCurse(this.curseTowerDmgFactor, dur);
        }
      });
      return;
    }

    // ── Dark vortex aura ──────────────────────────────────────────────────────
    if (this.isDarkVortex) {
      const mapDmg = this.game?.mapDamageMult || 1;
      enemies.forEach(e => {
        if (e.dead || e.reached) return;
        const dx = e.x - this.x, dy = e.y - this.y;
        if (Math.sqrt(dx*dx + dy*dy) <= effRange) {
          e.applySlow(this.darkVortexSlowFactor, 0.12);
          if (this.darkVortexDpsPct > 0) e.takeDamage(e.maxHP * this.darkVortexDpsPct * mapDmg * dt);
        }
      });
      return;
    }

    if (this.isSandstorm) {
      // Аура пустынного вихря: замедление + % от maxHP/сек
      const mapDmg = this.game?.mapDamageMult || 1;
      enemies.forEach(e => {
        if (e.dead || e.reached) return;
        const dx = e.x - this.x, dy = e.y - this.y;
        if (Math.sqrt(dx*dx + dy*dy) <= effRange) {
          e.applySlow(this.sandstormSlowFactor, 0.15);
          e.takeDamage(e.maxHP * this.sandstormDpsPct * mapDmg * dt);
        }
      });
      return;
    }

    // Стандартная аура (башня Времени)
    enemies.forEach(e => {
      if (e.dead || e.reached) return;
      const dx = e.x - this.x, dy = e.y - this.y;
      if (Math.sqrt(dx * dx + dy * dy) <= effRange) {
        e.applySlow(this.auraSlowFactor, 0.12);
      }
    });
  }

  // Специальный апдейт для башен карты 2 (вызывается из game.js)
  updateMap2(dt, enemies, path) {
    if (!this.isSnakeCharmer) return null;
    if (this.maxHP !== null && this.hp <= 0) return null;
    this._snakeTimer += dt;
    if (this._snakeTimer < this.snakeInterval) return null;
    if (this._activeSnakeCount >= this.maxSnakes) return null;
    this._snakeTimer = 0;
    // Находим ближайшую точку пути
    let closest = 0, closestDist = Infinity;
    path.forEach((pt, i) => {
      const dx = pt.x - this.x, dy = pt.y - this.y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < closestDist) { closestDist = d; closest = i; }
    });
    const snakeDef = {
      snakeDamage: this.snakeDamage,
      snakePoisonPct: this.snakePoisonPct,
      snakePoisonDuration: this.snakePoisonDuration,
      snakeDistance: this.snakeDistance,
      poisonExplode: this.legendary,
    };
    return new Snake(path, closest, snakeDef);
  }

  draw(ctx) {
    const effRange = Math.floor(this.range * this.comboMult.range * (this.game?.sandstormWavesLeft > 0 ? 0.7 : 1));

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

    if (this.maxHP !== null && this.hp <= 0) {
      ctx.save(); ctx.globalAlpha = 0.35;
      drawTower(ctx, this.type, this.x, this.y, this.upgradeLevel, this.angle);
      ctx.restore();
    } else {
      drawTower(ctx, this.type, this.x, this.y, this.upgradeLevel, this.angle);
    }

    // Damage flash (red overlay, decrements once per draw)
    if (this.flashTimer > 0) {
      this.flashTimer--;
      ctx.save();
      ctx.globalAlpha = (this.flashTimer / 12) * 0.55;
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath(); ctx.arc(this.x, this.y, this.cellSize * 0.6, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    // HP bar (only when damaged)
    if (this.maxHP !== null && this.hp < this.maxHP) {
      const bw = 28, bh = 3, bx = this.x - 14, by = this.y + this.cellSize * 0.54;
      const pct = this.hp / this.maxHP;
      ctx.fillStyle = '#111';
      ctx.fillRect(bx - 1, by - 1, bw + 2, bh + 2);
      ctx.fillStyle = pct > 0.5 ? '#2ecc71' : pct > 0.25 ? '#f39c12' : '#e74c3c';
      ctx.fillRect(bx, by, Math.round(bw * pct), bh);
    }

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
    case 'basic':        _drawBasic(ctx, level, angle);        break;
    case 'sniper':       _drawSniper(ctx, level, angle);       break;
    case 'explosion':    _drawExplosion(ctx, level, angle);    break;
    case 'slow':         _drawSlow(ctx, level, angle);         break;
    case 'antiair':      _drawAntiAir(ctx, level, angle);      break;
    case 'mine':         _drawMine(ctx, level);                break;
    case 'lightning':    _drawLightning(ctx, level, angle);    break;
    case 'time':         _drawTime(ctx, level);                break;
    // Map 2
    case 'torch':        _drawTorch(ctx, level, angle);        break;
    case 'catapult':     _drawCatapult(ctx, level, angle);     break;
    case 'scorpion':     _drawScorpion(ctx, level, angle);     break;
    case 'sandstorm':    _drawSandstorm(ctx, level);           break;
    case 'tombguard':    _drawTombGuard(ctx, level, angle);    break;
    case 'obelisk':      _drawObelisk(ctx, level);             break;
    case 'snakecharmer': _drawSnakeCharmer(ctx, level);        break;
    case 'falconer':     _drawFalconer(ctx, level, angle);     break;
    case 'sunmirror':    _drawSunMirror(ctx, level, angle);    break;
    // Map 3
    case 'bone_cannon':    _drawBoneCannon(ctx, level, angle);    break;
    case 'curse_tower':    _drawCurseTower(ctx, level);           break;
    case 'shadow_blade':   _drawShadowBlade(ctx, level, angle);   break;
    case 'fear_gate':      _drawFearGate(ctx, level);             break;
    case 'soul_trap':      _drawSoulTrap(ctx, level, angle);      break;
    case 'obsidian_tower': _drawObsidian(ctx, level);             break;
    case 'void_rift':      _drawVoidRift(ctx, level);             break;
    case 'dark_vortex':    _drawDarkVortex(ctx, level);           break;
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

// ─── Map 2 draw functions ─────────────────────────────────────────────────────

function _drawTorch(ctx, level, angle) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const s=level>=2?12:10;
  // Base — тёмно-оранжевый кирпич
  R(-s,-s,s*2,s*2,level>=3?'#1a0800':'#4a1e00');
  R(-s,-s,s,s,'#5a2800'); R(0,0,s,s,'#5a2800');
  R(0,-s,s,s,'#4a1e00'); R(-s,0,s,s,'#4a1e00');
  if(level>=1){ctx.strokeStyle='#e67e22';ctx.lineWidth=2;ctx.strokeRect(-s-1,-s-1,s*2+2,s*2+2);}
  // Ствол факела
  R(-2,-s-10,4,12,'#5a3a10');
  // Огонь
  const now=Date.now()*0.004;
  const flicker=Math.sin(now)*2;
  ctx.shadowColor='#e67e22'; ctx.shadowBlur=14;
  ctx.fillStyle='#f39c12';
  ctx.beginPath();
  ctx.moveTo(-5,-s-10+flicker); ctx.quadraticCurveTo(0,-s-26,5,-s-10+flicker);
  ctx.quadraticCurveTo(2,-s-14,0,-s-8); ctx.quadraticCurveTo(-2,-s-14,-5,-s-10+flicker);
  ctx.fill();
  ctx.fillStyle='#e74c3c'; ctx.shadowBlur=8;
  ctx.beginPath();
  ctx.moveTo(-3,-s-12+flicker); ctx.quadraticCurveTo(0,-s-22,3,-s-12+flicker);
  ctx.quadraticCurveTo(0,-s-14,-3,-s-12+flicker); ctx.fill();
  C(0,-s-8,2,'#fff9c4'); ctx.shadowBlur=0;
  // Ствол орудия
  ctx.save(); ctx.rotate(angle);
  if(level>=2){R(0,-4,s+4,8,'#3a1a00');}
  R(0,-3,s+6,6,'#d35400'); R(s+2,-4,5,8,'#b23a00');
  ctx.restore();
}

function _drawCatapult(ctx, level, angle) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const s=level>=2?12:10;
  // Деревянная платформа
  R(-s,-s*0.7,s*2,s*1.4,level>=3?'#1a0e00':'#3d2800');
  R(-s,-s*0.7,s,s*0.7,'#4a3210'); R(0,0,s,s*0.7,'#4a3210');
  if(level>=1){ctx.strokeStyle='#c8922a';ctx.lineWidth=2;ctx.strokeRect(-s-1,-s*0.7-1,s*2+2,s*1.4+2);}
  // Колёса
  ctx.strokeStyle='#5a3a10'; ctx.lineWidth=2;
  [-s+3,s-3].forEach(wx=>{
    ctx.fillStyle='#2a1800'; ctx.beginPath(); ctx.arc(wx,s*0.7-3,4,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='#8b6014'; ctx.beginPath(); ctx.arc(wx,s*0.7-3,4,0,Math.PI*2); ctx.stroke();
  });
  // Рычаг катапульты (вращается)
  ctx.save(); ctx.rotate(angle - Math.PI/4);
  ctx.strokeStyle='#6b4226'; ctx.lineWidth=4; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-s-8); ctx.stroke();
  // Ковш со снарядом
  ctx.fillStyle='#7f8c8d'; ctx.shadowColor='#666'; ctx.shadowBlur=4;
  ctx.beginPath(); ctx.arc(0,-s-8,5,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur=0;
  ctx.restore();
  C(0,0,4,'#8b6014');
}

function _drawScorpion(ctx, level, angle) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const s=level>=2?11:9;
  // Основание — жёлто-коричневый
  R(-s,-s,s*2,s*2,level>=3?'#1a1000':'#3a2800');
  R(-s,-s,s,s,'#4a3400'); R(0,0,s,s,'#4a3400');
  R(0,-s,s,s,'#3a2800'); R(-s,0,s,s,'#3a2800');
  if(level>=1){ctx.strokeStyle='#8dde26';ctx.lineWidth=2;ctx.strokeRect(-s-1,-s-1,s*2+2,s*2+2);}
  // Тело скорпиона
  ctx.fillStyle='#b7950b'; ctx.shadowColor='#8dde26'; ctx.shadowBlur=6;
  ctx.beginPath(); ctx.ellipse(0,2,7,5,0,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur=0;
  // Клешни
  ctx.strokeStyle='#b7950b'; ctx.lineWidth=2;
  [[-8,-4],[ 8,-4]].forEach(([cx])=>{
    ctx.beginPath(); ctx.moveTo(cx*0.5,-2); ctx.lineTo(cx,-4); ctx.stroke();
    C(cx,-4,2.5,'#9a7d0a');
  });
  // Хвост с жалом (изогнутый вверх)
  const now=Date.now()*0.003;
  const sw=Math.sin(now)*1.5;
  ctx.strokeStyle='#b7950b'; ctx.lineWidth=2.5; ctx.lineCap='round';
  ctx.beginPath();
  ctx.moveTo(0,4); ctx.quadraticCurveTo(6+sw,2,8+sw,-6);
  ctx.quadraticCurveTo(9+sw,-12,4+sw,-16); ctx.stroke();
  ctx.fillStyle='#8dde26'; ctx.shadowColor='#8dde26'; ctx.shadowBlur=8;
  ctx.beginPath(); ctx.arc(4+sw,-16,3,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur=0;
  // Прицел
  ctx.save(); ctx.rotate(angle);
  if(level>=2){R(0,-3,s+4,6,'#2a1800');}
  R(0,-2,s+6,4,'#8dde26'); R(s+2,-3,4,6,'#5aa010');
  ctx.restore();
}

function _drawSandstorm(ctx, level) {
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const s=level>=2?12:10;
  // Круглое основание
  ctx.fillStyle=level>=3?'#1a1200':'#3a2c10';
  ctx.beginPath(); ctx.arc(0,0,s,0,Math.PI*2); ctx.fill();
  if(level>=1){ctx.strokeStyle='#c8a060';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,s+1,0,Math.PI*2);ctx.stroke();}
  // Внутренний узор — спираль
  ctx.strokeStyle='#a07840'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.arc(0,0,s-3,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.arc(0,0,4,0,Math.PI*2); ctx.stroke();
  // Вращающиеся песчаные частицы
  const now=Date.now()*0.0025;
  ctx.shadowColor='#c8a060'; ctx.shadowBlur=8;
  for(let i=0;i<(level>=2?6:4);i++){
    const a=i*Math.PI*2/(level>=2?6:4)+now*(i%2===0?1:-1.3);
    const r=level>=2?s+3:s+2;
    C(Math.cos(a)*r,Math.sin(a)*r,level>=3?3:2,'#c8a060');
  }
  ctx.shadowBlur=0;
  // Центр
  ctx.fillStyle='#d4b870'; ctx.shadowColor='#d4b870'; ctx.shadowBlur=10;
  ctx.beginPath(); ctx.moveTo(0,-6); ctx.lineTo(4,3); ctx.lineTo(-4,3); ctx.closePath(); ctx.fill();
  ctx.shadowBlur=0;
}

function _drawTombGuard(ctx, level, angle) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const s=level>=2?11:9;
  // Тёмное каменное основание
  R(-s,-s,s*2,s*2,level>=3?'#0d0800':'#2a2000');
  R(-s,-s,s,s,'#362a10'); R(0,0,s,s,'#362a10');
  R(0,-s,s,s,'#2a2000'); R(-s,0,s,s,'#2a2000');
  if(level>=1){ctx.strokeStyle='#d4a520';ctx.lineWidth=2;ctx.strokeRect(-s-1,-s-1,s*2+2,s*2+2);}
  // Тело стражника — золотые доспехи
  ctx.fillStyle='#a07800'; ctx.beginPath();ctx.ellipse(0,4,6,8,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#d4a520';
  ctx.beginPath(); ctx.moveTo(-5,2); ctx.lineTo(5,2); ctx.lineTo(4,12); ctx.lineTo(-4,12); ctx.fill();
  // Шлем
  ctx.fillStyle='#b8940a';
  ctx.beginPath(); ctx.arc(0,-4,7,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#d4a520'; R(-7,-6,14,4,'#d4a520');
  // Гребень шлема
  ctx.fillStyle='#e74c3c'; R(-1,-12,2,8,'#e74c3c');
  // Глаза
  ctx.fillStyle='#fff'; C(-2.5,-5,1.5,'#fff'); C(2.5,-5,1.5,'#fff');
  ctx.fillStyle='#000'; C(-2.5,-5,0.8,'#000'); C(2.5,-5,0.8,'#000');
  // Копьё
  ctx.save(); ctx.rotate(angle);
  ctx.strokeStyle='#7d5a2c'; ctx.lineWidth=2.5; ctx.lineCap='butt';
  ctx.beginPath(); ctx.moveTo(4,-2); ctx.lineTo(s+10,-2); ctx.stroke();
  ctx.fillStyle='#bdc3c7'; ctx.shadowColor='#bdc3c7'; ctx.shadowBlur=6;
  ctx.beginPath(); ctx.moveTo(s+8,-4); ctx.lineTo(s+14,-2); ctx.lineTo(s+8,0); ctx.fill();
  ctx.shadowBlur=0;
  ctx.restore();
}

function _drawObelisk(ctx, level) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  // Основание обелиска
  R(-8,8,16,6,level>=3?'#1a1000':'#3a2c00');
  R(-6,4,12,5,'#4a3a00');
  // Столп — сужающийся к верху
  ctx.fillStyle='#c8a020';
  ctx.beginPath();
  ctx.moveTo(-7,9); ctx.lineTo(-5,-10); ctx.lineTo(5,-10); ctx.lineTo(7,9);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle='#d4b030';
  ctx.beginPath();
  ctx.moveTo(-7,9); ctx.lineTo(-5,-10); ctx.lineTo(-2,-10); ctx.lineTo(-1,9);
  ctx.closePath(); ctx.fill();
  // Иероглифы
  if(level>=1){
    ctx.strokeStyle='#5a2a80'; ctx.lineWidth=1;
    [[-3,-2],[-3,2],[-3,6]].forEach(([hx,hy])=>{
      ctx.beginPath(); ctx.moveTo(hx,hy); ctx.lineTo(hx+6,hy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(hx+3,hy-2); ctx.lineTo(hx+3,hy+2); ctx.stroke();
    });
  }
  // Кончик — фиолетовое свечение
  ctx.fillStyle='#c8a020';
  ctx.beginPath(); ctx.moveTo(-5,-10); ctx.lineTo(0,-18); ctx.lineTo(5,-10); ctx.fill();
  const now=Date.now()*0.003;
  const pulse=0.7+Math.sin(now)*0.3;
  ctx.shadowColor='#9b59b6'; ctx.shadowBlur=14*pulse; ctx.fillStyle='#b39ddb';
  ctx.beginPath(); ctx.arc(0,-14,3*pulse,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur=0;
  if(level>=2){
    for(let i=0;i<4;i++){
      const a=i*Math.PI/2+now*0.5;
      C(Math.cos(a)*10,Math.sin(a)*10+0,1.5,'rgba(180,120,255,0.6)');
    }
  }
}

function _drawSnakeCharmer(ctx, level) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  // Корзина/горшок
  ctx.fillStyle=level>=3?'#1a0e00':'#3d2800';
  ctx.beginPath();
  ctx.moveTo(-10,10); ctx.lineTo(-12,0); ctx.arc(0,0,12,Math.PI,0); ctx.lineTo(10,10);
  ctx.quadraticCurveTo(0,14,-10,10); ctx.fill();
  ctx.fillStyle='#6b4226';
  ctx.beginPath(); ctx.ellipse(0,0,12,4,0,0,Math.PI*2); ctx.fill();
  // Плетёный узор
  if(level>=1){
    ctx.strokeStyle='#8b5e3c'; ctx.lineWidth=1;
    for(let i=0;i<4;i++){
      ctx.beginPath();
      ctx.moveTo(-12+i*6,0); ctx.lineTo(-10+i*6,10); ctx.stroke();
    }
  }
  // Змея
  const now=Date.now()*0.004;
  const wave=Math.sin(now)*3;
  ctx.shadowColor='#27ae60'; ctx.shadowBlur=8;
  // Тело
  ctx.strokeStyle='#2ecc71'; ctx.lineWidth=5; ctx.lineCap='round';
  ctx.beginPath();
  ctx.moveTo(0,-1); ctx.quadraticCurveTo(wave,-8,2,-16); ctx.stroke();
  ctx.strokeStyle='#1e8449'; ctx.lineWidth=3;
  ctx.beginPath();
  ctx.moveTo(0,-1); ctx.quadraticCurveTo(wave,-8,2,-16); ctx.stroke();
  // Голова
  ctx.fillStyle='#27ae60';
  ctx.beginPath(); ctx.ellipse(2+wave,-18,5,4,0.3,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur=0;
  ctx.fillStyle='#f1c40f';
  C(4+wave,-20,1.5,'#f1c40f'); C(0+wave,-20,1.5,'#f1c40f');
  // Язык
  ctx.strokeStyle='#e74c3c'; ctx.lineWidth=1;
  ctx.beginPath();
  ctx.moveTo(5+wave,-18); ctx.lineTo(9+wave,-17);
  ctx.moveTo(5+wave,-18); ctx.lineTo(9+wave,-19); ctx.stroke();
}

function _drawSunMirror(ctx, level, angle) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const s=level>=2?10:8;
  // Основание
  R(-s,-s,s*2,s*2,level>=3?'#1a1400':'#3a2c00');
  if(level>=1){ctx.strokeStyle='#f1c40f';ctx.lineWidth=2;ctx.strokeRect(-s-1,-s-1,s*2+2,s*2+2);}
  C(0,0,4,'#c8a020');
  // Зеркало (вращается к цели)
  ctx.save(); ctx.rotate(angle);
  const now=Date.now()*0.003;
  // Рама зеркала
  ctx.strokeStyle='#d4ac0d'; ctx.lineWidth=3;
  ctx.beginPath(); ctx.arc(s+5,0,7,0,Math.PI*2); ctx.stroke();
  ctx.fillStyle='#fffaaa'; ctx.globalAlpha=0.85;
  ctx.beginPath(); ctx.arc(s+5,0,6,0,Math.PI*2); ctx.fill();
  ctx.globalAlpha=1;
  // Ручка зеркала
  R(s-2,-2,6,4,'#b8940a');
  // Солнечный луч — пульсирующий
  const glow=0.3+Math.sin(now)*0.15;
  ctx.shadowColor='#f1c40f'; ctx.shadowBlur=20*glow;
  ctx.strokeStyle=`rgba(255,250,150,${glow+0.4})`; ctx.lineWidth=3;
  ctx.beginPath(); ctx.moveTo(s+12,0); ctx.lineTo(s+22,0); ctx.stroke();
  ctx.shadowBlur=0;
  if(level>=2){
    // Солнечная корона
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*2+now;
      ctx.strokeStyle='rgba(255,220,50,0.5)'; ctx.lineWidth=1.5;
      ctx.beginPath();
      ctx.moveTo(s+5+Math.cos(a)*7, Math.sin(a)*7);
      ctx.lineTo(s+5+Math.cos(a)*11, Math.sin(a)*11); ctx.stroke();
    }
  }
  ctx.restore();
}

function _drawFalconer(ctx, level, angle) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const s=level>=2?10:8;
  // Основание — коричневое дерево
  R(-s,-s,s*2,s*2,level>=3?'#2a1a00':'#5C3A1E');
  R(-s,-s,s,s,'#7a4a20'); R(0,0,s,s,'#7a4a20');
  R(0,-s,s,s,'#5C3A1E'); R(-s,0,s,s,'#5C3A1E');
  if(level>=1){ctx.strokeStyle='#c8843a';ctx.lineWidth=2;ctx.strokeRect(-s-1,-s-1,s*2+2,s*2+2);}
  // Жердь (насест)
  ctx.strokeStyle='#7a4a20'; ctx.lineWidth=3;
  ctx.beginPath(); ctx.moveTo(-6,1); ctx.lineTo(6,1); ctx.stroke();
  // Силуэт сокола на насесте
  const now=Date.now()*0.003;
  const wing=Math.sin(now*1.8)*2;
  // Тело птицы
  ctx.fillStyle=level>=3?'#e8a040':'#8B5E3C';
  ctx.beginPath(); ctx.ellipse(0,-7,4,2.5,0,0,Math.PI*2); ctx.fill();
  // Голова
  C(3.5,-8,2.5,level>=3?'#f0b050':'#a06030');
  // Клюв
  ctx.fillStyle='#f0c040';
  ctx.beginPath(); ctx.moveTo(5.5,-8); ctx.lineTo(8,-8.5); ctx.lineTo(5.5,-7); ctx.fill();
  // Крылья (анимированные)
  ctx.fillStyle='#5C3A1E';
  ctx.beginPath(); ctx.moveTo(-1,-7); ctx.lineTo(-7,-4+wing); ctx.lineTo(-1,-5); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-1,-7); ctx.lineTo(-7,-10-wing); ctx.lineTo(-1,-9); ctx.fill();
  // Хвост
  ctx.fillStyle='#7a4a20';
  ctx.beginPath(); ctx.moveTo(-4,-7); ctx.lineTo(-8,-5.5); ctx.lineTo(-8,-8.5); ctx.fill();
  // Стрела направления выстрела
  ctx.save(); ctx.rotate(angle);
  ctx.strokeStyle='rgba(200,130,50,0.6)'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(s+2,0); ctx.lineTo(s+8,0); ctx.stroke();
  ctx.fillStyle='rgba(200,130,50,0.6)';
  ctx.beginPath(); ctx.moveTo(s+6,-2); ctx.lineTo(s+10,0); ctx.lineTo(s+6,2); ctx.fill();
  if(level>=2){
    ctx.shadowColor='#f0b050'; ctx.shadowBlur=8;
    ctx.strokeStyle='rgba(240,176,80,0.5)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(s+2,0); ctx.lineTo(s+12,0); ctx.stroke();
    ctx.shadowBlur=0;
  }
  ctx.restore();
}

// ──────────── MAP 3 DRAW FUNCTIONS ────────────

function _drawBoneCannon(ctx, level, angle) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const base = level>=3?'#6b6b6b':level>=2?'#555':'#444';
  R(-9,-9,18,18,base);
  R(-7,-7,14,14,level>=2?'#4a4a4a':'#333');
  C(0,-1,5,level>=3?'#e0d0c0':'#c8b8a0');
  ctx.fillStyle='#222';
  ctx.beginPath();ctx.ellipse(-2,-2,1.5,2,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(2,-2,1.5,2,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#222';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(-2,2);ctx.lineTo(-1,3);ctx.lineTo(0,2);ctx.lineTo(1,3);ctx.lineTo(2,2);ctx.stroke();
  ctx.save();ctx.rotate(angle);
  const bColor = level>=3?'#d0c0b0':'#a89880';
  R(4,-3,14,6,bColor);
  ctx.fillStyle=level>=2?'#c0b0a0':'#907060';
  for(let i=0;i<3;i++){ctx.fillRect(5+i*4,-4,3,8);}
  ctx.fillStyle='#e0d0c0';
  ctx.beginPath();ctx.moveTo(18,-3);ctx.lineTo(22,0);ctx.lineTo(18,3);ctx.fill();
  if(level>=3){ctx.shadowColor='#c8b8a0';ctx.shadowBlur=8;}
  ctx.restore();
}

function _drawCurseTower(ctx, level) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const now=Date.now()*0.002;
  R(-9,-9,18,18,level>=3?'#1a0030':'#110022');
  ctx.strokeStyle=level>=3?'#cc44ff':level>=2?'#9922cc':'#661199';
  ctx.lineWidth=2;ctx.strokeRect(-9,-9,18,18);
  ctx.font='bold 6px serif';
  ctx.fillStyle=level>=3?'#ff66ff':level>=2?'#cc44ff':'#9922cc';
  ctx.textAlign='center';ctx.textBaseline='middle';
  const runes=['ψ','Ω','φ','Σ'];
  const positions=[[-6,-5],[6,-5],[-6,4],[6,4]];
  if(level>=2){ctx.shadowColor='#cc44ff';ctx.shadowBlur=6;}
  positions.forEach((p,i)=>ctx.fillText(runes[i],p[0],p[1]));
  ctx.shadowBlur=0;
  const pulse=0.7+Math.sin(now*3)*0.3;
  C(0,-1,4*pulse,level>=3?'#ff44ff':level>=2?'#bb22ee':'#880088');
  C(0,-1,2*pulse,'rgba(255,100,255,0.6)');
  for(let i=0;i<3;i++){
    const a=now*2+i*Math.PI*2/3;
    const r=level>=2?8:7;
    C(Math.cos(a)*r,Math.sin(a)*r,1.5,level>=3?'#ff88ff':'#cc44ff');
  }
}

function _drawShadowBlade(ctx, level, angle) {
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const now=Date.now()*0.003;
  C(0,0,9,level>=3?'#1a001a':'#110011');
  ctx.strokeStyle=level>=3?'#9900cc':level>=2?'#660099':'#440066';
  ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,9,0,Math.PI*2);ctx.stroke();
  const bladeAngle=now*1.5+angle;
  const bladeLen=level>=3?14:12;
  for(let i=0;i<3;i++){
    const a=bladeAngle+i*Math.PI*2/3;
    ctx.save();ctx.rotate(a);
    ctx.fillStyle=level>=3?'#cc00cc':level>=2?'#990099':'#660066';
    ctx.beginPath();ctx.moveTo(4,0);ctx.lineTo(bladeLen,-2);ctx.lineTo(bladeLen+4,0);ctx.lineTo(bladeLen,2);ctx.fill();
    if(level>=2){ctx.shadowColor='#cc44ff';ctx.shadowBlur=8;}
    C(bladeLen+2,0,2,level>=3?'#ff88ff':'#cc44ff');
    ctx.shadowBlur=0;
    ctx.restore();
  }
  C(0,0,3.5,level>=3?'#440044':'#330033');
  C(0,0,1.5,'#cc00ff');
}

function _drawFearGate(ctx, level) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const now=Date.now()*0.002;
  const stone=level>=3?'#3a3040':'#2a2030';
  R(-10,-10,5,20,stone);
  R(5,-10,5,20,stone);
  R(-10,-10,20,5,stone);
  const portalAlpha=0.6+Math.sin(now*2)*0.2;
  ctx.fillStyle=level>=3?`rgba(220,0,0,${portalAlpha})`:`rgba(160,0,0,${portalAlpha})`;
  ctx.beginPath();ctx.arc(0,-5,6,Math.PI,0);ctx.lineTo(6,5);ctx.lineTo(-6,5);ctx.closePath();ctx.fill();
  ctx.fillStyle=`rgba(255,80,80,${portalAlpha*0.5})`;
  ctx.beginPath();ctx.arc(0,-3,3,0,Math.PI*2);ctx.fill();
  if(level>=2){ctx.shadowColor='#ff0000';ctx.shadowBlur=8;}
  C(-7.5,-12,3,level>=3?'#d0c0b0':'#a08070');
  C(7.5,-12,3,level>=3?'#d0c0b0':'#a08070');
  ctx.fillStyle='#222';
  ctx.beginPath();ctx.ellipse(-8.5,-13,0.8,1,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(-6.5,-13,0.8,1,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(6.5,-13,0.8,1,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.ellipse(8.5,-13,0.8,1,0,0,Math.PI*2);ctx.fill();
  ctx.shadowBlur=0;
}

function _drawSoulTrap(ctx, level, angle) {
  const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const now=Date.now()*0.002;
  R(-7,2,14,8,level>=3?'#1a1a2a':'#111120');
  ctx.strokeStyle=level>=3?'#4444aa':level>=2?'#333388':'#222266';
  ctx.lineWidth=1.5;ctx.strokeRect(-7,2,14,8);
  R(-3,-10,6,14,level>=3?'#222244':'#1a1a33');
  ctx.fillStyle=level>=3?'#4444aa':'#333388';
  ctx.beginPath();ctx.moveTo(-3,-10);ctx.lineTo(0,-16);ctx.lineTo(3,-10);ctx.fill();
  const orbitR=level>=2?9:8;
  for(let i=0;i<3;i++){
    const a=now*1.8+i*Math.PI*2/3+angle*0.1;
    const px=Math.cos(a)*orbitR, py=Math.sin(a)*orbitR-2;
    if(level>=3){ctx.shadowColor='#4488ff';ctx.shadowBlur=10;}
    C(px,py,2.5,level>=3?'#88bbff':'#4477dd');
    C(px,py,1,'#ccddff');
    ctx.shadowBlur=0;
  }
  const pulse=0.8+Math.sin(now*4)*0.2;
  C(0,-16,2*pulse,level>=3?'#6688ff':'#4466cc');
}

function _drawObsidian(ctx, level) {
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const now=Date.now()*0.002;
  ctx.fillStyle=level>=3?'#050510':'#030308';
  ctx.beginPath();ctx.moveTo(0,-11);ctx.lineTo(8,-6);ctx.lineTo(8,6);ctx.lineTo(0,11);ctx.lineTo(-8,6);ctx.lineTo(-8,-6);ctx.closePath();ctx.fill();
  ctx.strokeStyle=level>=3?'#0066aa':level>=2?'#004488':'#002255';
  ctx.lineWidth=1.5;ctx.stroke();
  const crystals=[[-6,-4],[-5,-8],[5,-8],[6,-4],[0,-9]];
  crystals.forEach(([cx,cy])=>{
    ctx.fillStyle=level>=3?'#0088cc':level>=2?'#005588':'#003366';
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx-2,cy+4);ctx.lineTo(cx+2,cy+4);ctx.closePath();ctx.fill();
  });
  const pulse=0.7+Math.sin(now*3)*0.3;
  if(level>=2){ctx.shadowColor='#0099ff';ctx.shadowBlur=12*pulse;}
  C(0,-1,4*pulse,level>=3?'#0077cc':level>=2?'#005599':'#003377');
  C(0,-1,2*pulse,'rgba(100,200,255,0.7)');
  ctx.shadowBlur=0;
  ctx.fillStyle=level>=3?'#003355':'#002244';
  ctx.fillRect(-10,-10,3,3);ctx.fillRect(7,-10,3,3);
}

function _drawVoidRift(ctx, level) {
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const now=Date.now()*0.002;
  const wobble=Math.sin(now*2)*1.5;
  ctx.fillStyle=level>=3?'#0d0010':'#080008';
  ctx.beginPath();ctx.ellipse(0,wobble,10,7,0,0,Math.PI*2);ctx.fill();
  for(let i=0;i<3;i++){
    const r=6+i*4;
    const alpha=0.6-i*0.15;
    ctx.strokeStyle=level>=3?`rgba(150,0,255,${alpha})`:`rgba(100,0,200,${alpha})`;
    ctx.lineWidth=1.5-i*0.3;
    ctx.beginPath();ctx.ellipse(0,wobble,r,r*0.6,0,0,Math.PI*2);ctx.stroke();
  }
  for(let i=0;i<5;i++){
    const a=now*2+i*Math.PI*2/5;
    const r=8+Math.sin(now+i)*2;
    C(Math.cos(a)*r,Math.sin(a)*r*0.6+wobble,1.5,level>=3?'#cc00ff':'#8800cc');
  }
  if(level>=2){ctx.shadowColor='#8800ff';ctx.shadowBlur=12;}
  C(0,wobble,3.5,'#1a001a');
  C(0,wobble,1.5,level>=3?'#aa00ff':'#770099');
  ctx.shadowBlur=0;
}

function _drawDarkVortex(ctx, level) {
  const C=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
  const now=Date.now()*0.002;
  C(0,0,10,level>=3?'#080010':'#050008');
  ctx.strokeStyle=level>=3?'#660099':level>=2?'#440066':'#330044';
  ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,10,0,Math.PI*2);ctx.stroke();
  const spinAngle=now*2;
  for(let arm=0;arm<3;arm++){
    const baseA=spinAngle+arm*Math.PI*2/3;
    ctx.strokeStyle=level>=3?'rgba(150,0,255,0.8)':level>=2?'rgba(100,0,200,0.7)':'rgba(80,0,150,0.6)';
    ctx.lineWidth=1.5;
    ctx.beginPath();
    for(let t=0;t<=1;t+=0.1){
      const r=3+t*8;const a=baseA+t*Math.PI;
      const x=Math.cos(a)*r,y=Math.sin(a)*r;
      t===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.stroke();
  }
  if(level>=2){
    ctx.strokeStyle=level>=3?'rgba(200,100,255,0.7)':'rgba(150,50,200,0.5)';
    ctx.lineWidth=1;
    for(let i=0;i<2;i++){
      const a=spinAngle*1.5+i*Math.PI;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a)*5,Math.sin(a)*5);
      ctx.lineTo(Math.cos(a+0.4)*9,Math.sin(a+0.4)*9);
      ctx.stroke();
    }
  }
  if(level>=3){ctx.shadowColor='#9900ff';ctx.shadowBlur=10;}
  C(0,0,4,level>=3?'#1a0030':'#110020');
  C(0,0,2,level>=3?'#8800ff':'#550099');
  ctx.shadowBlur=0;
}


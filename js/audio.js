// ─── GameAudio — музыкальное сопровождение ──────────────────────────────────
const GameAudio = (() => {
  const TRACKS = {
    title:    'audio/Juhani Junkala [Retro Game Music Pack] Title Screen.wav',
    // Карта 1 — Айронхолд
    level1:   'audio/Map 1/Juhani Junkala [Retro Game Music Pack] Level 1.wav',
    level2:   'audio/Map 1/Juhani Junkala [Retro Game Music Pack] Level 2.wav',
    level3:   'audio/Map 1/Juhani Junkala [Retro Game Music Pack] Level 3.wav',
    // Карта 2 — Пустыня руин
    gorge1:   'audio/Map 2/the_eternal_sands.wav',
    gorge2:   'audio/Map 2/modern_eastern_arabian_princess_clement_panchout_2019.wav',
    gorge3:   'audio/Map 2/middle_eastern_arrangment_mix.mp3',
    // Карта 3 — Тёмное царство
    maze1:    'audio/Map 3/holy_sword_remixed.mp3',
    maze2:    'audio/Map 3/holy_sword_remixed2.mp3',
    maze3:    'audio/Map 3/Juhani Junkala - Epic Boss Battle [Seamlessly Looping].wav',
  };

  // Загружаем все треки заранее
  const audios = {};
  for (const [key, src] of Object.entries(TRACKS)) {
    const a = new Audio();
    a.preload = 'auto';
    a.loop    = true;
    a.src     = src;
    a.onerror = () => {};   // тихо игнорируем ошибки
    audios[key] = a;
  }

  // ── Настройки из localStorage ──────────────────────────────────────────────
  let enabled = localStorage.getItem('musicEnabled') !== 'false';
  let volume  = parseFloat(localStorage.getItem('musicVolume') ?? '70') / 100;

  // Текущий играющий трек
  let currentKey  = null;
  let fadeTimer   = null;

  // Восстанавливаем громкость при размытии/фокусе вкладки
  document.addEventListener('visibilitychange', () => {
    if (!currentKey || !enabled) return;
    if (document.hidden) {
      _setVol(audios[currentKey], volume * 0.1);
    } else {
      _setVol(audios[currentKey], volume);
    }
  });

  // ── Helpers ────────────────────────────────────────────────────────────────
  function _setVol(el, v) {
    try { el.volume = Math.max(0, Math.min(1, v)); } catch (_) {}
  }

  function _stopAll() {
    for (const a of Object.values(audios)) {
      a.pause();
      a.currentTime = 0;
    }
  }

  function _cancelFade() {
    if (fadeTimer) { clearInterval(fadeTimer); fadeTimer = null; }
  }

  function _play(key) {
    if (!key || !audios[key]) return;
    _setVol(audios[key], enabled ? volume : 0);
    audios[key].play().catch(() => {});
  }

  // Плавный переход: fade out текущего → fade in нового
  function _crossfade(fromKey, toKey, durationMs = 1000) {
    _cancelFade();
    const steps   = 20;
    const delay   = durationMs / steps;
    const fromEl  = fromKey ? audios[fromKey] : null;
    const toEl    = toKey   ? audios[toKey]   : null;
    const startVol = enabled ? volume : 0;
    let step = 0;

    if (toEl) {
      _setVol(toEl, 0);
      toEl.play().catch(() => {});
    }

    fadeTimer = setInterval(() => {
      step++;
      const t = step / steps;                // 0 → 1
      if (fromEl) _setVol(fromEl, startVol * (1 - t));
      if (toEl)   _setVol(toEl,   startVol * t);

      if (step >= steps) {
        _cancelFade();
        if (fromEl) { fromEl.pause(); fromEl.currentTime = 0; }
        currentKey = toKey;
      }
    }, delay);
  }

  // ── Публичный API ──────────────────────────────────────────────────────────

  // Воспроизвести трек главного меню
  function playTitle() {
    if (currentKey === 'title') return;
    _stopAll();
    _cancelFade();
    currentKey = 'title';
    _play('title');
  }

  // Остановить и перейти к музыке карты (вызывается при выборе карты)
  function startMap(mapId) {
    const key = _trackForWave(mapId, 1);
    if (!key) { _stopAll(); currentKey = null; return; }
    _crossfade(currentKey, key);
  }

  // Вызывается при начале каждой волны — при необходимости переключает трек
  function onWave(wave, mapId) {
    const key = _trackForWave(mapId, wave);
    if (!key || key === currentKey) return;
    _crossfade(currentKey, key);
  }

  // Определяем нужный трек по карте и номеру волны
  function _trackForWave(mapId, wave) {
    const tier = wave <= 20 ? 0 : wave <= 40 ? 1 : 2;
    const map = {
      ironhold: ['level1', 'level2', 'level3'],
      gorge:    ['gorge1', 'gorge2', 'gorge3'],
      maze:     ['maze1',  'maze2',  'maze3'],
    };
    return map[mapId]?.[tier] ?? null;
  }

  // ── Управление громкостью ──────────────────────────────────────────────────

  function setEnabled(val) {
    enabled = val;
    localStorage.setItem('musicEnabled', val);
    if (currentKey) {
      _setVol(audios[currentKey], enabled ? volume : 0);
      if (enabled && audios[currentKey].paused) {
        audios[currentKey].play().catch(() => {});
      }
    }
    _updateUI();
  }

  function setVolume(pct) {
    volume = Math.max(0, Math.min(1, pct / 100));
    localStorage.setItem('musicVolume', Math.round(volume * 100));
    if (currentKey && enabled) {
      _setVol(audios[currentKey], volume);
    }
    _updateUI();
  }

  function getVolumePct() { return Math.round(volume * 100); }
  function isEnabled()    { return enabled; }

  // ── HUD-контрол ───────────────────────────────────────────────────────────
  function _buildUI() {
    const hud = document.getElementById('hud');
    if (!hud) return;

    const wrap = document.createElement('div');
    wrap.className = 'hud-item';
    wrap.id = 'musicControl';
    wrap.style.cssText = 'gap:6px;align-items:center;';
    wrap.innerHTML = `
      <button id="musicToggleBtn" title="Вкл/выкл музыку"
        style="background:none;border:none;cursor:pointer;font-size:1.25rem;line-height:1;padding:0 2px;color:#fff;">
      </button>
      <input id="musicVolSlider" type="range" min="0" max="100" step="1"
        style="width:72px;accent-color:#f39c12;cursor:pointer;" title="Громкость музыки">
    `;
    hud.appendChild(wrap);

    const btn    = document.getElementById('musicToggleBtn');
    const slider = document.getElementById('musicVolSlider');

    slider.value = getVolumePct();
    _updateUI();

    btn.addEventListener('click', () => setEnabled(!enabled));
    slider.addEventListener('input', () => setVolume(parseInt(slider.value, 10)));
  }

  function _updateUI() {
    const btn    = document.getElementById('musicToggleBtn');
    const slider = document.getElementById('musicVolSlider');
    if (btn)    btn.textContent = enabled ? '🔊' : '🔇';
    if (slider) slider.value   = getVolumePct();
  }

  // Инициализируем UI после загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _buildUI);
  } else {
    _buildUI();
  }

  return { playTitle, startMap, onWave, setEnabled, setVolume, isEnabled, getVolumePct };
})();

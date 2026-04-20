// ─── Персонажи ────────────────────────────────────────────────────────────────
const CHARACTERS = {
  adris: {
    name: 'Адрис',
    bg: '#0d2244',
    accent: '#4a8fd4',
    textColor: '#7ec8ff',
    draw(ctx, s) {
      const cx = s / 2, cy = s / 2;
      // Body / breastplate
      ctx.fillStyle = '#2a5a9a';
      ctx.fillRect(cx - 13, cy + 4, 26, 20);
      // Pauldrons
      ctx.fillStyle = '#4a8fd4';
      ctx.beginPath(); ctx.arc(cx - 14, cy + 6, 7, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 14, cy + 6, 7, 0, Math.PI * 2); ctx.fill();
      // Breastplate cross
      ctx.strokeStyle = '#7ec8ff'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(cx, cy + 6); ctx.lineTo(cx, cy + 22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 10, cy + 12); ctx.lineTo(cx + 10, cy + 12); ctx.stroke();
      // Neck
      ctx.fillStyle = '#c09070'; ctx.fillRect(cx - 4, cy - 3, 8, 8);
      // Helmet
      ctx.fillStyle = '#3a6aaa'; ctx.beginPath();
      ctx.arc(cx, cy - 10, 14, 0, Math.PI * 2); ctx.fill();
      // Visor
      ctx.fillStyle = '#0d2244'; ctx.fillRect(cx - 8, cy - 16, 16, 8);
      ctx.fillStyle = '#4a8fd4';  ctx.fillRect(cx - 8, cy - 14, 16, 3);
      // Helmet crest
      ctx.fillStyle = '#e74c3c'; ctx.fillRect(cx - 2, cy - 26, 4, 12);
    }
  },
  thorn: {
    name: 'Торн',
    bg: '#1e1208',
    accent: '#a0714a',
    textColor: '#d4aa7a',
    draw(ctx, s) {
      const cx = s / 2, cy = s / 2;
      // Robe
      ctx.fillStyle = '#4a2e14';
      ctx.beginPath(); ctx.moveTo(cx - 14, cy + 24); ctx.lineTo(cx - 10, cy + 2); ctx.lineTo(cx + 10, cy + 2); ctx.lineTo(cx + 14, cy + 24); ctx.fill();
      // Hood
      ctx.fillStyle = '#3a2010';
      ctx.beginPath(); ctx.arc(cx, cy - 10, 16, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#3a2010';
      ctx.fillRect(cx - 16, cy - 10, 32, 14);
      // Face
      ctx.fillStyle = '#c8a07a'; ctx.beginPath(); ctx.arc(cx, cy - 10, 11, 0, Math.PI * 2); ctx.fill();
      // Beard
      ctx.fillStyle = '#ddd';
      ctx.beginPath(); ctx.ellipse(cx, cy + 1, 7, 10, 0, 0, Math.PI); ctx.fill();
      // Eyes
      ctx.fillStyle = '#664422';
      ctx.beginPath(); ctx.arc(cx - 4, cy - 11, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 4, cy - 11, 2, 0, Math.PI * 2); ctx.fill();
      // Staff
      ctx.strokeStyle = '#7a5530'; ctx.lineWidth = 3; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx + 13, cy - 22); ctx.lineTo(cx + 15, cy + 26); ctx.stroke();
      // Staff gem
      ctx.fillStyle = '#e67e22'; ctx.shadowColor = '#e67e22'; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.arc(cx + 13, cy - 24, 5, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    }
  },
  malkar: {
    name: 'Малькар',
    bg: '#100000',
    accent: '#8b0000',
    textColor: '#ff5555',
    draw(ctx, s) {
      const cx = s / 2, cy = s / 2;
      // Dark aura
      ctx.fillStyle = 'rgba(139,0,0,0.18)';
      ctx.beginPath(); ctx.arc(cx, cy, s * 0.48, 0, Math.PI * 2); ctx.fill();
      // Cloak
      ctx.fillStyle = '#0a0000';
      ctx.beginPath(); ctx.moveTo(cx - 18, cy + 28); ctx.lineTo(cx - 10, cy + 2); ctx.lineTo(cx + 10, cy + 2); ctx.lineTo(cx + 18, cy + 28); ctx.fill();
      // Horns
      ctx.fillStyle = '#4a0000';
      ctx.beginPath(); ctx.moveTo(cx - 10, cy - 14); ctx.lineTo(cx - 18, cy - 30); ctx.lineTo(cx - 4, cy - 16); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(cx + 10, cy - 14); ctx.lineTo(cx + 18, cy - 30); ctx.lineTo(cx + 4, cy - 16); ctx.closePath(); ctx.fill();
      // Hood
      ctx.fillStyle = '#1a0000';
      ctx.beginPath(); ctx.arc(cx, cy - 8, 15, 0, Math.PI * 2); ctx.fill();
      // Face shadow
      ctx.fillStyle = '#260000'; ctx.beginPath(); ctx.arc(cx, cy - 8, 11, 0, Math.PI * 2); ctx.fill();
      // Eyes — glowing red
      ctx.shadowColor = '#ff0000'; ctx.shadowBlur = 10; ctx.fillStyle = '#ff0000';
      ctx.beginPath(); ctx.arc(cx - 4, cy - 10, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 4, cy - 10, 3, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      // Grim slit mouth
      ctx.strokeStyle = '#550000'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(cx - 5, cy - 3); ctx.lineTo(cx + 5, cy - 3); ctx.stroke();
    }
  },
  herald: {
    name: 'Гонец',
    bg: '#181818',
    accent: '#888',
    textColor: '#bbb',
    draw(ctx, s) {
      const cx = s / 2, cy = s / 2;
      // Body — running lean
      ctx.fillStyle = '#666';
      ctx.beginPath(); ctx.ellipse(cx + 2, cy + 4, 9, 13, 0.25, 0, Math.PI * 2); ctx.fill();
      // Head
      ctx.fillStyle = '#c8a07a'; ctx.beginPath(); ctx.arc(cx - 2, cy - 10, 10, 0, Math.PI * 2); ctx.fill();
      // Cap
      ctx.fillStyle = '#555';
      ctx.beginPath(); ctx.ellipse(cx - 2, cy - 17, 11, 5, -0.15, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(cx - 13, cy - 19, 22, 4);
      // Arms — running pose
      ctx.strokeStyle = '#777'; ctx.lineWidth = 4; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx - 4, cy + 2); ctx.lineTo(cx - 14, cy + 12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 6, cy + 2); ctx.lineTo(cx + 14, cy - 2); ctx.stroke();
      // Legs
      ctx.beginPath(); ctx.moveTo(cx, cy + 16); ctx.lineTo(cx - 8, cy + 28); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 4, cy + 16); ctx.lineTo(cx + 12, cy + 26); ctx.stroke();
      // Scroll
      ctx.fillStyle = '#e8dcc8'; ctx.fillRect(cx + 11, cy - 5, 8, 10);
      ctx.strokeStyle = '#888'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx + 12, cy - 2); ctx.lineTo(cx + 18, cy - 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 12, cy + 1); ctx.lineTo(cx + 18, cy + 1); ctx.stroke();
    }
  },
  ally: {
    name: 'Союзник',
    bg: '#1a1400',
    accent: '#c8a020',
    textColor: '#f0d060',
    draw(ctx, s) {
      const cx = s / 2, cy = s / 2;
      // Body armor
      ctx.fillStyle = '#9a7818';
      ctx.fillRect(cx - 12, cy + 4, 22, 18);
      // Pauldrons
      ctx.fillStyle = '#c8a020';
      ctx.beginPath(); ctx.arc(cx - 12, cy + 6, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 10, cy + 6, 6, 0, Math.PI * 2); ctx.fill();
      // Shield
      ctx.fillStyle = '#c8a020';
      ctx.beginPath();
      ctx.moveTo(cx - 18, cy + 2); ctx.lineTo(cx - 18, cy + 18);
      ctx.quadraticCurveTo(cx - 18, cy + 28, cx - 11, cy + 30);
      ctx.lineTo(cx - 4, cy + 18); ctx.lineTo(cx - 4, cy + 2);
      ctx.fill();
      ctx.fillStyle = '#8a6e10';
      ctx.beginPath(); ctx.moveTo(cx - 11, cy + 10); ctx.lineTo(cx - 11, cy + 24); ctx.stroke();
      // Helmet
      ctx.fillStyle = '#b89018'; ctx.beginPath(); ctx.arc(cx, cy - 9, 14, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#8a6e10'; ctx.fillRect(cx - 6, cy - 16, 12, 9);
      ctx.fillStyle = '#c8a020'; ctx.fillRect(cx - 8, cy - 13, 16, 3);
      // Flag pole
      ctx.strokeStyle = '#8a6e10'; ctx.lineWidth = 2.5; ctx.lineCap = 'butt';
      ctx.beginPath(); ctx.moveTo(cx + 14, cy - 24); ctx.lineTo(cx + 14, cy + 22); ctx.stroke();
      // Flag
      ctx.fillStyle = '#c0392b';
      ctx.beginPath(); ctx.moveTo(cx + 14, cy - 24); ctx.lineTo(cx + 26, cy - 17); ctx.lineTo(cx + 14, cy - 10); ctx.fill();
    }
  },
  xara: {
    name: 'Ксара',
    bg: '#3d2800',
    accent: '#d4a020',
    textColor: '#f0c040',
    initials: 'КС',
    draw(ctx, s) {
      const cx = s / 2, cy = s / 2;
      // Золотой ореол
      const grad = ctx.createRadialGradient(cx, cy + 4, 6, cx, cy, s * 0.5);
      grad.addColorStop(0, 'rgba(220,160,0,0.22)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(cx, cy, s * 0.48, 0, Math.PI * 2); ctx.fill();
      // Мантия
      ctx.fillStyle = '#6a4800';
      ctx.beginPath();
      ctx.moveTo(cx - 14, cy + 28); ctx.lineTo(cx - 10, cy + 4);
      ctx.lineTo(cx + 10, cy + 4); ctx.lineTo(cx + 14, cy + 28);
      ctx.fill();
      // Маска — золотое лицо
      ctx.fillStyle = '#c8940c';
      ctx.beginPath(); ctx.ellipse(cx, cy - 8, 13, 16, 0, 0, Math.PI * 2); ctx.fill();
      // Пустые глазницы — обрамление
      ctx.fillStyle = '#3d2800';
      ctx.beginPath(); ctx.ellipse(cx - 5, cy - 12, 4, 5, -0.15, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx + 5, cy - 12, 4, 5, 0.15, 0, Math.PI * 2); ctx.fill();
      // Пустые глазницы — чёрная пустота
      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.ellipse(cx - 5, cy - 12, 3, 4, -0.15, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx + 5, cy - 12, 3, 4, 0.15, 0, Math.PI * 2); ctx.fill();
      // Прорезь рта
      ctx.strokeStyle = '#8a6000'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(cx - 5, cy + 1); ctx.lineTo(cx + 5, cy + 1); ctx.stroke();
      // Головной убор
      ctx.fillStyle = '#d4a020';
      ctx.fillRect(cx - 14, cy - 24, 28, 4);
      ctx.beginPath();
      ctx.moveTo(cx, cy - 34); ctx.lineTo(cx - 10, cy - 24); ctx.lineTo(cx + 10, cy - 24);
      ctx.closePath(); ctx.fill();
      // Самоцвет
      ctx.fillStyle = '#e74c3c'; ctx.shadowColor = '#ff4444'; ctx.shadowBlur = 5;
      ctx.beginPath(); ctx.arc(cx, cy - 30, 3, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    }
  },
  zarok_ghost: {
    name: 'Зарок (дух)',
    bg: '#0d0012',
    accent: '#6030a0',
    textColor: '#b070e0',
    initials: 'ЗА',
    draw(ctx, s) {
      const cx = s / 2, cy = s / 2;
      // Призрачный пурпурный ореол
      const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, s * 0.5);
      grad.addColorStop(0, 'rgba(120,50,180,0.25)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(cx, cy, s * 0.48, 0, Math.PI * 2); ctx.fill();
      // Полупрозрачная фигура
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = '#3a1060';
      ctx.beginPath();
      ctx.moveTo(cx - 16, cy + 28); ctx.lineTo(cx - 12, cy + 2);
      ctx.lineTo(cx + 12, cy + 2); ctx.lineTo(cx + 16, cy + 28);
      ctx.fill();
      ctx.fillStyle = '#4a1880';
      ctx.beginPath(); ctx.arc(cx, cy - 8, 14, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      // Призрачные рога (контуры)
      ctx.strokeStyle = 'rgba(150,80,220,0.5)'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 7, cy - 19);
      ctx.quadraticCurveTo(cx - 22, cy - 34, cx - 14, cy - 46);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + 7, cy - 19);
      ctx.quadraticCurveTo(cx + 22, cy - 34, cx + 14, cy - 46);
      ctx.stroke();
      // Глаза — пурпурное свечение
      ctx.shadowColor = '#9040ff'; ctx.shadowBlur = 8; ctx.fillStyle = 'rgba(160,80,255,0.7)';
      ctx.beginPath(); ctx.arc(cx - 5, cy - 10, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 5, cy - 10, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    }
  },
  zarok: {
    name: 'Зарок',
    bg: '#150000',
    accent: '#8b1515',
    textColor: '#cc4444',
    initials: 'ЗА',
    draw(ctx, s) {
      const cx = s / 2, cy = s / 2;
      // Тёмный ореол
      ctx.fillStyle = 'rgba(100,0,0,0.15)';
      ctx.beginPath(); ctx.arc(cx, cy, s * 0.48, 0, Math.PI * 2); ctx.fill();
      // Тело — тёмный силуэт
      ctx.fillStyle = '#1e0000';
      ctx.beginPath();
      ctx.moveTo(cx - 16, cy + 28); ctx.lineTo(cx - 12, cy + 2);
      ctx.lineTo(cx + 12, cy + 2); ctx.lineTo(cx + 16, cy + 28);
      ctx.fill();
      // Голова
      ctx.fillStyle = '#280000';
      ctx.beginPath(); ctx.arc(cx, cy - 8, 14, 0, Math.PI * 2); ctx.fill();
      // Рога — изогнутые
      ctx.fillStyle = '#3a0000';
      ctx.beginPath();
      ctx.moveTo(cx - 7, cy - 19);
      ctx.quadraticCurveTo(cx - 24, cy - 34, cx - 16, cy - 48);
      ctx.quadraticCurveTo(cx - 9, cy - 38, cx - 3, cy - 21);
      ctx.closePath(); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx + 7, cy - 19);
      ctx.quadraticCurveTo(cx + 24, cy - 34, cx + 16, cy - 48);
      ctx.quadraticCurveTo(cx + 9, cy - 38, cx + 3, cy - 21);
      ctx.closePath(); ctx.fill();
      // Глаза — тусклое красное свечение
      ctx.shadowColor = '#aa0000'; ctx.shadowBlur = 7; ctx.fillStyle = '#aa0000';
      ctx.beginPath(); ctx.arc(cx - 5, cy - 10, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 5, cy - 10, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      // Черта рта
      ctx.strokeStyle = '#5a0000'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(cx - 5, cy - 3); ctx.lineTo(cx + 5, cy - 3); ctx.stroke();
    }
  },
  xara_ghost: {
    name: 'Ксара (дух)',
    bg: '#050d18',
    accent: '#5080b0',
    textColor: '#90b8e8',
    initials: 'КС',
    draw(ctx, s) {
      const cx = s / 2, cy = s / 2;
      // Призрачный ореол
      const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, s * 0.5);
      grad.addColorStop(0, 'rgba(80,140,220,0.28)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(cx, cy, s * 0.48, 0, Math.PI * 2); ctx.fill();
      // Полупрозрачная фигура
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#4070a0';
      ctx.beginPath();
      ctx.moveTo(cx - 14, cy + 28); ctx.lineTo(cx - 10, cy + 4);
      ctx.lineTo(cx + 10, cy + 4); ctx.lineTo(cx + 14, cy + 28);
      ctx.fill();
      // Маска призрака
      ctx.fillStyle = '#7aaad4';
      ctx.beginPath(); ctx.ellipse(cx, cy - 8, 13, 16, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      // Пустые глазницы — синее свечение
      ctx.fillStyle = '#000a14';
      ctx.beginPath(); ctx.ellipse(cx - 5, cy - 12, 3.5, 4.5, -0.15, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx + 5, cy - 12, 3.5, 4.5, 0.15, 0, Math.PI * 2); ctx.fill();
      ctx.shadowColor = '#4090ff'; ctx.shadowBlur = 6;
      ctx.fillStyle = 'rgba(60,140,255,0.5)';
      ctx.beginPath(); ctx.ellipse(cx - 5, cy - 12, 2.5, 3.5, -0.15, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx + 5, cy - 12, 2.5, 3.5, 0.15, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      // Черта рта
      ctx.strokeStyle = '#5080a0'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx - 5, cy + 1); ctx.lineTo(cx + 5, cy + 1); ctx.stroke();
    }
  },
};

// ─── Карта 1: Айронхолд ───────────────────────────────────────────────────────
const storyMap1 = {
  1:  [{ char:'thorn',  text:'Генерал, первые лазутчики у ворот. Лёгкая добыча — но это лишь разведка.' }],
  3:  [{ char:'thorn',  text:'Они изучают наши позиции. Малькар умён — не недооценивай его.' }],
  5:  [{ char:'malkar', text:'Айронхолд... Как давно я мечтал видеть эти стены в руинах.' }],
  7:  [{ char:'thorn',  text:'Генерал! Среди врагов замечены рыцари в тёмных доспехах. Усиливай оборону!' }],
  10: [
    { char:'malkar', text:'Игрушки закончились. Выпускайте чемпионов!' },
    { char:'thorn',  text:'Держитесь! Это их сильнейший воин!' },
  ],
  12: [{ char:'thorn',  text:'Мы отбили первый натиск. Но разведчики говорят — это была лишь треть армии.' }],
  15: [
    { char:'herald', text:'Генерал! Южные деревни сожжены. Беженцы идут к замку. Нам нужно продержаться!' },
    { char:'adris',  text:'Мы продержимся. Айронхолд не падёт.' },
  ],
  16: [{ char:'thorn',  text:'Малькар призвал некромантов. Мертвецы встают из земли — готовьтесь к худшему.' }],
  18: [
    { char:'adris', text:'Торн, у нас заканчивается золото. Шахты работают на пределе.' },
    { char:'thorn', text:'Держите позиции — каждая монета на счету.' },
  ],
  20: [
    { char:'malkar', text:'Генерал Адрис. Я знаю твоё имя. Сдайся — и я сохраню жизнь твоим людям.' },
    { char:'adris',  text:'Айронхолд не сдаётся. Никогда.' },
    { char:'thorn',  text:'Держись, генерал! Это ловушка!' },
  ],
  22: [{ char:'thorn',  text:'Не верь ему, генерал. Малькар не знает пощады. Держись!' }],
  25: [
    { char:'herald', text:'С севера идут драконы! Зенитные башни — наш единственный шанс!' },
    { char:'thorn',  text:'Стройте зенитки — быстро!' },
  ],
  27: [
    { char:'thorn', text:'Генерал... мы потеряли восточную стену. Но замок ещё держится.' },
    { char:'adris', text:'Пока мы живы — замок держится.' },
  ],
  30: [
    { char:'malkar', text:'Довольно игр. Я выхожу сам!' },
    { char:'thorn',  text:'Это... невозможно. Генерал, будьте осторожны!' },
  ],
  31: [{ char:'thorn',  text:'Мы ранили его! Малькар отступил — но ненадолго. Укрепляйте позиции!' }],
  33: [
    { char:'adris', text:'Торн, у меня план. Если продержимся ещё 10 волн — подойдут союзники с юга.' },
    { char:'thorn', text:'Тогда держимся, генерал. Любой ценой.' },
  ],
  35: [
    {
      char:'ally', text:'Генерал Адрис! Армия Серебряного Ордена спешит на помощь. Держитесь!',
      action: g => {
        g.gold  += 200;
        g.lives += 5;
        setTimeout(() => g.ui.showMessage('⚔ Союзники прибыли! +200g +5❤', 3000), 400);
      }
    },
    { char:'adris', text:'Наконец-то. Айронхолд не один!' },
  ],
  38: [{ char:'malkar', text:'Союзники? Жалкие людишки. Я уничтожу вас всех вместе!' }],
  40: [{ char:'thorn',  text:'Малькар бросил в бой своих демонов. Это отчаяние — мы побеждаем!' }],
  42: [{ char:'adris',  text:'Я вижу страх в их рядах. Вперёд — не дадим им опомниться!' }],
  45: [
    { char:'thorn', text:'Генерал — разведка донесла. У Малькара остался последний резерв. Финальная битва близко.' },
    { char:'adris', text:'Готовьте все башни. Это будет жарко.' },
  ],
  46: [
    { char:'malkar', text:'Ты оказался достойным противником, Адрис. Но это конец.' },
    { char:'adris',  text:'Конец будет. Но не для Айронхолда.' },
  ],
  48: [{ char:'thorn',  text:'Генерал, они идут со всех сторон. Это последний натиск — или мы, или они!' }],
  50: [
    { char:'malkar', text:'ХВАТИТ! Я иду лично — и на этот раз вы не выстоите!' },
    { char:'thorn',  text:'Все на позиции! Это финальная битва!' },
  ],
  52: [
    { char:'adris', text:'Торн... сколько нас осталось?' },
    { char:'thorn', text:'Достаточно. Мы не сдадимся.' },
  ],
  55: [
    { char:'malkar', text:'Невозможно... как вы ещё стоите?!' },
    { char:'adris',  text:'Потому что мы защищаем свой дом.' },
  ],
  58: [
    { char:'thorn', text:'Генерал! Малькар отступает к своему порталу — если уйдёт, вернётся с новой армией!' },
    { char:'adris', text:'Не дадим ему уйти. Огонь по всем целям!' },
  ],
  59: [
    { char:'adris',  text:'Это заканчивается сегодня!' },
    { char:'malkar', text:'Ты пожалеешь об этом, Адрис!' },
  ],
  60: [
    { char:'malkar', text:'Айронхолд... ты выстоял. На этот раз.' },
    { char:'thorn',  text:'Генерал! Малькар отступает — его армия рассеяна!' },
    { char:'adris',  text:'Не уйдёт. Преследовать!' },
    { char:'thorn',  text:'Он открыл портал... Малькар бежит в восточные пески...' },
    { char:'adris',  text:'Тогда мы идём следом.' },
  ],
};

// ─── Эпилог (карта 1, больше не используется — оставлен как запасной) ──────────
const EPILOGUE_LINES = [
  'Малькар повержен.',
  'Его армия рассеяна.',
  'Айронхолд выстоял.',
  '',
  'Генерал Адрис стоит на стенах замка.',
  'Впервые за долгие недели — тишина.',
  '',
  'Королевство будет отстроено.',
  'И пока такие люди как ты стоят на страже —',
  'тьма не вернётся.',
  '',
  'ПОБЕДА',
];

// ─── Карта 2: Пустыня руин ────────────────────────────────────────────────────
const MAP_PROLOGUE = [
  // map 1 — используется в showPrologue() до выбора карты
  {
    lines:   ['Королевство Айронхолд стоит уже 500 лет.',
              'Но сегодня ночью тьма пришла с севера.',
              'Армия Тёмного Повелителя Малькара движется к воротам.',
              'Ты — генерал Адрис. Последняя надежда королевства.',
              'Держись.'],
    title:   'АЙРОНХОЛД',
    btn:     'Начать защиту',
    drawFn:  '_drawCrest',
  },
  // map 2
  {
    lines:   ['Малькар отступил. Но не сдался.',
              'Его следы ведут в Проклятые Пески — древние руины, где покоятся тысячи мёртвых.',
              'Генерал Адрис принял решение: преследовать врага до конца.',
              'Армия Айронхолда выступила на рассвете.'],
    title:   'ПУСТЫНЯ РУИН',
    btn:     'В поход!',
    drawFn:  '_drawDesertCrest',
  },
  // map 3
  {
    lines:   ['Тёмное царство. Здесь не светит солнце.',
              'Здесь не растут деревья. Здесь нет жизни.',
              'Только тьма. И Малькар.',
              'Это конец пути. Одного из нас.'],
    title:   'ТЁМНОЕ ЦАРСТВО',
    btn:     'Последняя битва',
    drawFn:  '_drawDarkCrest',
  },
];

const storyMap2 = {
  1: [
    { char: 'thorn', text: 'Генерал, эти земли прокляты. Мертвецы здесь не знают покоя.' },
    { char: 'adris', text: 'Малькар где-то впереди. Держать строй.' },
  ],
  3: [
    { char: 'thorn', text: 'Песчаные руины хранят древнее зло. Чувствуете — воздух здесь другой.' },
  ],
  5: [
    { char: 'xara',  text: 'Чужаки... вы осмелились войти в мои владения.' },
    { char: 'adris', text: 'Кто ты?' },
    { char: 'xara',  text: 'Я — Ксара. Страж этих руин. И ваша смерть.' },
  ],
  7: [
    { char: 'thorn', text: 'Генерал! Она поднимает мертвецов из песка — это некромантия древних!' },
  ],
  10: [
    { char: 'malkar', text: 'Ксара, уничтожь их. Мне нужно время.' },
    { char: 'xara',   text: 'С удовольствием, повелитель.' },
  ],
  12: [
    { char: 'adris', text: 'Торн, нам нужно прорваться. Малькар уходит вглубь руин!' },
    { char: 'thorn', text: 'Эти стены стоят тысячи лет — они не пустят нас просто так.' },
  ],
  15: [
    { char: 'xara',  text: 'Вы упрямы. Но упрямство не спасёт вас от песка.' },
    { char: 'adris', text: 'Песок или нет — мы идём вперёд.' },
  ],
  18: [
    { char: 'thorn', text: 'Генерал... наши потери велики. Но отступать некуда — позади только руины.' },
  ],
  20: [
    { char: 'xara',  text: 'Довольно. Я выхожу сама!' },
    { char: 'adris', text: 'Все башни — огонь!' },
    { char: 'thorn', text: 'Держитесь! Это её настоящая сила!' },
  ],
  22: [
    { char: 'xara',  text: 'Невозможно... как вы противостоите моей магии...' },
    { char: 'adris', text: 'Нас ведёт не магия. Нас ведёт долг.' },
  ],
  25: [
    { char: 'thorn', text: 'Генерал! Впереди вижу ворота — врата царства Малькара!' },
    { char: 'adris', text: 'Вот куда он бежал. Туда мы и идём.' },
  ],
  27: [
    { char: 'xara',   text: 'Малькар... они идут... прости меня...' },
    { char: 'malkar', text: 'Глупая ведьма. Ты была лишь инструментом.' },
  ],
  30: [
    { char: 'adris',  text: 'Малькар! Твои стражи пали. Выходи и сразись!' },
    { char: 'malkar', text: 'Смелые слова для тех, кто не видел настоящей тьмы.' },
  ],
  33: [
    { char: 'thorn', text: 'Генерал — эти руины древнее самого Айронхолда. Здесь погибли целые армии.' },
    { char: 'adris', text: 'Наша не погибнет.' },
  ],
  38: [
    { char: 'malkar', text: 'Вы прошли дальше, чем я ожидал. Добро пожаловать в преддверие ада.' },
  ],
  40: [
    { char: 'thorn', text: 'Ворота Тёмного царства — вот они! Мы почти у цели!' },
    { char: 'adris', text: 'Мы прошли пустыню. Теперь — последний шаг.' },
  ],
  45: [
    { char: 'malkar', text: 'За этими воротами — моя сила. Вы не войдёте.' },
    { char: 'adris',  text: 'Уже входим.' },
  ],
  50: [
    { char: 'xara_ghost', text: 'Генерал... Малькар предал меня. Идите вперёд — я покажу слабое место в его воротах.' },
    { char: 'adris',      text: 'Даже мёртвая — ты сильнее его.' },
  ],
  55: [
    { char: 'thorn',  text: 'Ворота слабеют! Ксара держит слово!' },
    { char: 'malkar', text: 'ПРЕДАТЕЛЬНИЦА!' },
  ],
  58: [
    { char: 'adris', text: 'Торн — как только ворота падут, мы входим. Без остановок.' },
    { char: 'thorn', text: 'Понял, генерал. Айронхолд с нами.' },
  ],
  59: [
    { char: 'malkar', text: 'Мои врата... нет... НЕЕЕТ!' },
    { char: 'adris',  text: 'Вперёд! За Айронхолд!' },
  ],
  60: [
    { char: 'malkar', text: 'Н-невозможно...' },
    { char: 'adris',  text: 'Ксара повержена. Ворота пали. Айронхолд не остановить.' },
    { char: 'thorn',  text: 'Генерал — впереди владения Малькара. Мы на пороге.' },
  ],
};

// ─── Карта 3: Тёмное царство ──────────────────────────────────────────────────
const storyMap3 = {
  1: [
    { char: 'thorn', text: 'Генерал... я никогда не видел такой тьмы. Даже факелы горят здесь иначе.' },
    { char: 'adris', text: 'Держитесь вместе. Малькар хочет чтобы мы испугались.' },
  ],
  3: [
    { char: 'malkar', text: 'Добро пожаловать в моё царство, Адрис. Здесь вы умрёте.' },
    { char: 'adris',  text: 'Мы слышали это раньше.' },
  ],
  5: [
    { char: 'zarok', text: 'Ничтожные смертные... я Зарок, правая рука Малькара. Вы не пройдёте.' },
    { char: 'thorn', text: 'Генерал — это архидемон. Будьте осторожны!' },
  ],
  7: [
    { char: 'malkar', text: 'Зарок — покажи им на что способны мои слуги.' },
    { char: 'zarok',  text: 'С радостью, повелитель.' },
  ],
  10: [
    { char: 'thorn', text: 'Их становится больше! Малькар бросает в бой всех кто у него есть!' },
    { char: 'adris', text: 'Значит он боится. Хороший знак.' },
  ],
  12: [
    { char: 'zarok', text: 'Вы разрушили наш мир. Теперь мы разрушим ваш!' },
    { char: 'adris', text: 'Ваш мир — тюрьма. Мы пришли закрыть её навсегда.' },
  ],
  15: [
    { char: 'malkar', text: 'Адрис... ты действительно думаешь что можешь победить меня здесь? В моём царстве?' },
    { char: 'adris',  text: 'Я уже побеждаю.' },
  ],
  18: [
    { char: 'thorn', text: 'Генерал — я вижу трон Малькара впереди. Мы почти у цели!' },
    { char: 'adris', text: 'Держать темп. Не останавливаться.' },
  ],
  20: [
    { char: 'zarok', text: 'ХВАТИТ! Я выхожу лично — никакие башни вас не спасут!' },
    { char: 'thorn', text: 'Это Зарок! Все башни на него!' },
  ],
  22: [
    { char: 'zarok', text: 'Невозможно... я... непобедим...' },
    { char: 'adris', text: 'Был.' },
  ],
  25: [
    { char: 'malkar', text: 'Зарок... мой верный слуга... ты тоже пал.' },
    { char: 'malkar', text: 'Что ж. Придётся заняться этим самому.' },
    { char: 'thorn',  text: 'Малькар идёт лично. Это финал.' },
  ],
  27: [
    { char: 'adris', text: 'Торн. Если мы не вернёмся...' },
    { char: 'thorn', text: 'Мы вернёмся, генерал. Я обещаю.' },
  ],
  30: [
    { char: 'malkar', text: '500 лет я ждал этого момента. 500 лет строил эту армию.' },
    { char: 'adris',  text: 'И за 500 лет ты так и не понял — тьма не побеждает свет. Никогда.' },
  ],
  33: [
    { char: 'thorn',  text: 'Его армия редеет — мы ломаем его!' },
    { char: 'malkar', text: 'НЕЕЕТ! Это невозможно!' },
  ],
  38: [
    { char: 'malkar', text: 'Адрис... встань рядом со мной. Вместе мы покорим всё.' },
    { char: 'adris',  text: 'Мне не нужна твоя сила. Мне нужен твой конец.' },
  ],
  40: [
    { char: 'thorn', text: 'Малькар слабеет! Его магия рассеивается!' },
    { char: 'adris', text: 'Финальный удар. Все башни — максимальный огонь!' },
  ],
  45: [
    { char: 'malkar',     text: 'Адрис... ты действительно силён. Но я ещё не закончил.' },
    { char: 'zarok_ghost', text: 'Повелитель... простите... я подвёл вас...' },
    { char: 'malkar',     text: 'Замолчи. Я сделаю это сам.' },
  ],
  50: [
    { char: 'malkar', text: 'ВСЁ. ХВАТИТ. Я выхожу лично!' },
    { char: 'thorn',  text: 'ГЕНЕРАЛ! ЭТО ОН! МАЛЬКАР ИСТИННЫЙ!' },
    { char: 'adris',  text: 'Все на позиции. Это конец — наш или его.' },
  ],
  52: [
    { char: 'malkar', text: 'Чувствуете? Это моя настоящая сила! Ваши башни — игрушки!' },
    { char: 'thorn',  text: 'Держимся! Не отступать!' },
  ],
  55: [
    { char: 'malkar', text: 'Как... как вы это делаете...' },
    { char: 'adris',  text: 'Мы защищаем тех кого любим. Ты никогда этого не поймёшь.' },
  ],
  57: [
    { char: 'thorn',  text: 'Его броня трескается!' },
    { char: 'malkar', text: 'НЕТ! Я не могу... проиграть... здесь...' },
  ],
  59: [
    { char: 'adris',  text: 'Малькар. Это конец.' },
    { char: 'malkar', text: 'Адрис... ты... достоин... уважения... но тьма... вернётся...' },
    { char: 'adris',  text: 'Может быть. Но не сегодня.' },
  ],
  60: [
    { char: 'malkar', text: 'Н-невозможно... нет... НЕЕЕТ...' },
    { char: 'thorn',  text: 'Генерал! Он падает! Малькар падает!' },
    { char: 'adris',  text: 'Держись, Торн. Почти.' },
    { char: 'malkar', text: '...темнота...' },
    { char: 'adris',  text: 'Всё. Кончено.' },
  ],
};

const MAP3_EPILOGUE_LINES = [
  { text: 'Малькар Истинный повержен.',     special: '' },
  { text: 'Тёмное царство рассыпалось в прах.', special: '' },
  { text: '',                                special: 'spacer' },
  { text: 'Генерал Адрис стоит среди руин угасающей тьмы.', special: '' },
  { text: 'Рядом — верный Торн. Живой.',    special: '' },
  { text: '',                                special: 'spacer' },
  { text: 'Где-то далеко рассветает над Айронхолдом.', special: '' },
  { text: 'Впервые за пятьсот лет — настоящий мир.', special: '' },
  { text: '',                                special: 'spacer' },
  { text: 'Они победили не силой башен.',   special: '' },
  { text: 'Они победили потому что было ради чего сражаться.', special: '' },
  { text: '',                                special: 'spacer' },
  { text: 'АЙРОНХОЛД НАВСЕГДА.',            special: 'subtitle' },
  { text: '',                                special: 'spacer' },
  { text: 'КОНЕЦ',                           special: 'victory' },
];

// ─── StoryManager ─────────────────────────────────────────────────────────────
// Таблица диалогов по номеру карты
const STORY_BY_MAP = { 1: storyMap1, 2: storyMap2, 3: storyMap3 };

class StoryManager {
  constructor(game) {
    this.game          = game;
    this.currentMapNum = 1;      // номер текущей карты (1 / 2 / 3)
    this._queue        = [];
    this._onDone       = null;
    this.lastShownWave = -1;
    this._typeTimer = null;
    this._typing    = false;
    this._charIdx   = 0;
    this._fullText  = '';

    this.dlgPanel   = document.getElementById('storyDialogue');
    this.dlgPortrait = document.getElementById('dlgPortrait');
    this.dlgName    = document.getElementById('dlgName');
    this.dlgText    = document.getElementById('dlgText');
    this.dlgNext    = document.getElementById('dlgNext');
    this.dlgHint    = document.getElementById('dlgHint');

    this.prologueEl  = document.getElementById('storyPrologue');
    this.epilogueEl  = document.getElementById('storyEpilogue');

    this._setupInput();
  }

  // ── Input ──────────────────────────────────────────────────────────────────
  _setupInput() {
    document.addEventListener('keydown', e => {
      if (e.code === 'Space' && this.dlgPanel && this.dlgPanel.style.display === 'flex') {
        e.preventDefault();
        this._advance();
      }
    });
    if (this.dlgNext)  this.dlgNext.addEventListener('click', e => { e.stopPropagation(); this._advance(); });
    if (this.dlgPanel) this.dlgPanel.addEventListener('click', () => this._advance());
  }

  // ── Dialogue ───────────────────────────────────────────────────────────────
  showDialogue(lines, onDone) {
    this._queue  = [...lines];
    this._onDone = onDone;
    this.dlgPanel.style.display = 'flex';
    this._nextLine();
  }

  _nextLine() {
    if (this._queue.length === 0) {
      this.dlgPanel.style.display = 'none';
      const cb = this._onDone;
      this._onDone = null;
      if (cb) cb();
      return;
    }
    const line = this._queue.shift();
    const ch   = CHARACTERS[line.char];
    if (!ch) { this._nextLine(); return; }

    // Fire optional game action on this line
    if (line.action) line.action(this.game);

    // Portrait
    this._drawPortrait(this.dlgPortrait, ch);

    // Name
    this.dlgName.textContent = ch.name;
    this.dlgName.style.color = ch.textColor;

    // Typewriter
    this.dlgText.textContent = '';
    this._fullText = line.text;
    this._charIdx  = 0;
    this._typing   = true;
    if (this.dlgNext) this.dlgNext.textContent = '▶▶';
    if (this.dlgHint) this.dlgHint.style.opacity = '0';
    this._typeNext();
  }

  _typeNext() {
    if (!this._typing) return;
    if (this._charIdx >= this._fullText.length) {
      this._typing = false;
      if (this.dlgNext) this.dlgNext.textContent = 'Далее ►';
      if (this.dlgHint) this.dlgHint.style.opacity = '0.5';
      return;
    }
    this.dlgText.textContent += this._fullText[this._charIdx++];
    this._typeTimer = setTimeout(() => this._typeNext(), 30);
  }

  _advance() {
    if (this._typing) {
      clearTimeout(this._typeTimer);
      this._typing = false;
      this.dlgText.textContent = this._fullText;
      if (this.dlgNext) this.dlgNext.textContent = 'Далее ►';
      if (this.dlgHint) this.dlgHint.style.opacity = '0.5';
    } else {
      this._nextLine();
    }
  }

  // ── Portrait drawing ───────────────────────────────────────────────────────
  _drawPortrait(canvas, ch) {
    if (!canvas) return;
    const size = canvas.width;
    const ctx  = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);

    // Background
    ctx.fillStyle = ch.bg;
    ctx.fillRect(0, 0, size, size);

    // Accent border
    ctx.strokeStyle = ch.accent;
    ctx.lineWidth   = 2;
    ctx.strokeRect(1, 1, size - 2, size - 2);

    // Character art
    ctx.save();
    ch.draw(ctx, size);
    ctx.restore();

    // Initials badge — bottom-right corner
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(size - 28, size - 19, 27, 18);
    ctx.fillStyle   = ch.accent;
    ctx.font        = 'bold 11px monospace';
    ctx.textAlign   = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(ch.initials || '', size - 3, size - 3);
  }

  checkWave(wave, onDone) {
    if (wave === this.lastShownWave) { onDone(); return; }
    const dialogues = STORY_BY_MAP[this.currentMapNum] || storyMap1;
    const lines = dialogues[wave];
    if (!lines) { onDone(); return; }
    this.lastShownWave = wave;
    this.showDialogue(lines, onDone);
  }

  handleVictory(score, wave, startTime) {
    const n = this.currentMapNum;
    const dialogues = STORY_BY_MAP[n] || storyMap1;
    const lines = dialogues[60] || [];
    if (n === 1) {
      this.showDialogue(lines, () => this.showMap1Transition(() => this.game.loadNextMap(2)));
    } else if (n === 2) {
      this.showDialogue(lines, () => this.showMap2Transition(() => this.game.loadNextMap(3)));
    } else {
      this.showDialogue(lines, () => this.showMap3Epilogue(score, wave, startTime));
    }
  }

  // ── Prologue ───────────────────────────────────────────────────────────────
  // Показывается один раз при запуске — до экрана выбора карты (всегда карта 1)
  showPrologue(onDone) {
    const cfg = MAP_PROLOGUE[0];
    this._showPrologueScreen(cfg.lines, cfg.title, cfg.btn, c => this._drawCrest(c), onDone);
  }

  // Вызывается после выбора карты; mapNum = 1 / 2 / 3
  showMapPrologue(mapNum, onDone) {
    this.currentMapNum = mapNum;
    this.lastShownWave = -1;
    if (mapNum === 1) {
      // Пролог карты 1 уже показан через showPrologue() — просто запускаем игру
      onDone();
      return;
    }
    const cfg = MAP_PROLOGUE[mapNum - 1];
    if (!cfg) { onDone(); return; }
    const drawFn = c => this[cfg.drawFn](c);
    this._showPrologueScreen(cfg.lines, cfg.title, cfg.btn, drawFn, onDone);
  }

  _showPrologueScreen(lines, title, btnText, drawFn, onDone) {
    const el = this.prologueEl;
    if (!el) { onDone(); return; }

    const titleEl = document.getElementById('prologueTitle');
    if (titleEl) titleEl.textContent = title;

    const crestCanvas = document.getElementById('prologueCrest');
    if (crestCanvas && drawFn) drawFn(crestCanvas);

    el.style.transition = '';
    el.style.display = 'flex';
    el.style.opacity = '1';

    const linesEl = document.getElementById('prologueLines');
    if (linesEl) {
      linesEl.innerHTML = '';
      let delay = 700;
      lines.forEach(line => {
        const p = document.createElement('p');
        p.className = 'prologue-line';
        p.textContent = line;
        linesEl.appendChild(p);
        setTimeout(() => { p.classList.add('visible'); }, delay);
        delay += 680;
      });
      setTimeout(() => {
        const startBtn = document.getElementById('prologueStart');
        if (startBtn) startBtn.classList.add('visible');
      }, delay + 400);
    }

    const startBtn = document.getElementById('prologueStart');
    if (startBtn) {
      startBtn.textContent = btnText;
      startBtn.className = '';         // сброс класса visible чтобы переанимировать
      startBtn.onclick = () => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.7s';
        setTimeout(() => { el.style.display = 'none'; onDone(); }, 700);
      };
    }
  }

  // ── Map 1 → Map 2 transition ──────────────────────────────────────────────
  showMap1Transition(onDone) {
    this._showTransitionScreen(
      [
        'Малькар отступил. Айронхолд выстоял.',
        'Но тёмный повелитель бежал — его следы ведут на восток.',
        'В Проклятые Пески. Туда, где тысячи мёртвых.',
        'Преследование продолжается.',
      ],
      'В Пустыню Руин',
      'linear-gradient(to bottom,#050500,#0d0a00,#150e00)',
      '#8b5e14',
      onDone
    );
  }

  // ── Map 2 transition screen ────────────────────────────────────────────────
  showMap2Transition(onDone) {
    this._showTransitionScreen(
      [
        'Ксара повержена. Ворота Тёмного царства пали.',
        'Армия Айронхолда стоит на пороге владений Малькара.',
        'Впереди — тьма. Но генерал Адрис не останавливается.',
        'Финальная битва близко.',
      ],
      'Войти в Тёмное царство',
      'linear-gradient(to bottom,#000005,#0a0012,#100008)',
      '#8b1515',
      onDone
    );
  }

  // ── Shared transition screen builder ──────────────────────────────────────
  _showTransitionScreen(lines, btnText, bg, borderColor, onDone) {
    const wrap = document.getElementById('canvasWrap') || document.body;
    const el   = document.createElement('div');
    el.style.cssText = [
      'position:absolute;inset:0;z-index:90',
      `background:${bg}`,
      'display:flex;flex-direction:column;align-items:center;justify-content:center',
      'font-family:"Courier New",monospace;color:#ccc;text-align:center;padding:40px 60px',
      'opacity:0;transition:opacity 0.7s',
    ].join(';');

    const linesDiv = document.createElement('div');
    linesDiv.style.cssText = 'max-width:520px;margin-bottom:10px';
    lines.forEach((txt, i) => {
      const p = document.createElement('p');
      p.textContent = txt;
      p.style.cssText = [
        'margin:12px 0;font-size:15px;letter-spacing:0.04em',
        'opacity:0;transform:translateY(10px)',
        'transition:opacity 0.7s,transform 0.7s',
      ].join(';');
      linesDiv.appendChild(p);
      setTimeout(() => { p.style.opacity = '1'; p.style.transform = 'translateY(0)'; }, 700 + i * 850);
    });

    const btn = document.createElement('button');
    btn.textContent = btnText;
    const btnBg = borderColor === '#8b1515' ? '#3a0000' : '#1a1000';
    btn.style.cssText = [
      'margin-top:32px;padding:10px 30px',
      `background:${btnBg};color:#ffccaa;border:1px solid ${borderColor}`,
      'font-family:"Courier New",monospace;font-size:13px;letter-spacing:0.08em',
      'cursor:pointer;opacity:0;transition:opacity 0.7s',
    ].join(';');
    btn.onmouseover = () => { btn.style.filter = 'brightness(1.3)'; };
    btn.onmouseout  = () => { btn.style.filter = 'brightness(1)'; };
    btn.onclick = () => {
      el.style.opacity = '0';
      setTimeout(() => { el.remove(); onDone(); }, 700);
    };
    setTimeout(() => { btn.style.opacity = '1'; }, 700 + lines.length * 850 + 400);

    el.appendChild(linesDiv);
    el.appendChild(btn);
    wrap.appendChild(el);
    requestAnimationFrame(() => { el.style.opacity = '1'; });
  }

  _drawCrest(canvas) {
    const size = canvas.width;
    const ctx  = canvas.getContext('2d');
    const cx   = size / 2, cy = size / 2;
    ctx.clearRect(0, 0, size, size);

    // Shield body
    ctx.fillStyle = '#0d1f3a';
    ctx.beginPath();
    ctx.moveTo(cx - 48, cy - 52);
    ctx.lineTo(cx + 48, cy - 52);
    ctx.lineTo(cx + 48, cy + 8);
    ctx.quadraticCurveTo(cx + 48, cy + 60, cx, cy + 70);
    ctx.quadraticCurveTo(cx - 48, cy + 60, cx - 48, cy + 8);
    ctx.closePath();
    ctx.fill();

    // Shield border
    ctx.strokeStyle = '#c8a020';
    ctx.lineWidth   = 3;
    ctx.stroke();

    // Crown atop shield
    ctx.fillStyle = '#c8a020';
    ctx.beginPath();
    ctx.moveTo(cx - 34, cy - 52);
    ctx.lineTo(cx - 34, cy - 66);
    ctx.lineTo(cx - 20, cy - 58);
    ctx.lineTo(cx,      cy - 72);
    ctx.lineTo(cx + 20, cy - 58);
    ctx.lineTo(cx + 34, cy - 66);
    ctx.lineTo(cx + 34, cy - 52);
    ctx.fill();
    // Crown gems
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath(); ctx.arc(cx, cy - 68, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#c8a020';
    ctx.beginPath(); ctx.arc(cx - 21, cy - 60, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 21, cy - 60, 3, 0, Math.PI * 2); ctx.fill();

    // Sword — vertical
    ctx.strokeStyle = '#c8d8f0'; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(cx, cy - 44); ctx.lineTo(cx, cy + 50); ctx.stroke();
    // Cross-guard
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(cx - 24, cy - 10); ctx.lineTo(cx + 24, cy - 10); ctx.stroke();
    // Blade highlight
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx + 2, cy - 42); ctx.lineTo(cx + 2, cy + 48); ctx.stroke();
    // Pommel
    ctx.fillStyle = '#c8a020'; ctx.shadowColor = '#c8a020'; ctx.shadowBlur = 6;
    ctx.beginPath(); ctx.arc(cx, cy + 52, 7, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
  }

  _drawDesertCrest(canvas) {
    const size = canvas.width;
    const ctx  = canvas.getContext('2d');
    const cx   = size / 2, cy = size / 2;
    ctx.clearRect(0, 0, size, size);

    // Тёмный песчаный фон
    ctx.fillStyle = '#1a0e00';
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = '#8b5e14';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, size - 4, size - 4);

    // Песчаные дюны (задний план)
    ctx.fillStyle = '#2a1800';
    ctx.beginPath();
    ctx.moveTo(0, cy + 28);
    ctx.quadraticCurveTo(cx * 0.5, cy + 10, cx, cy + 24);
    ctx.quadraticCurveTo(cx * 1.5, cy + 38, size, cy + 20);
    ctx.lineTo(size, size); ctx.lineTo(0, size);
    ctx.closePath(); ctx.fill();

    // Пирамида
    ctx.fillStyle = '#4a2e08';
    ctx.beginPath();
    ctx.moveTo(cx, cy - 50);
    ctx.lineTo(cx - 38, cy + 26);
    ctx.lineTo(cx + 38, cy + 26);
    ctx.closePath(); ctx.fill();
    // Грани пирамиды
    ctx.strokeStyle = '#8b6020'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx, cy - 50); ctx.lineTo(cx - 38, cy + 26); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - 50); ctx.lineTo(cx + 38, cy + 26); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - 38, cy + 26); ctx.lineTo(cx + 38, cy + 26); ctx.stroke();

    // Всевидящее Око (треугольник в пирамиде)
    ctx.fillStyle = '#c8880a';
    ctx.beginPath();
    ctx.moveTo(cx, cy - 22);
    ctx.lineTo(cx - 14, cy + 4);
    ctx.lineTo(cx + 14, cy + 4);
    ctx.closePath(); ctx.fill();
    // Зрачок — пустая глазница
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.ellipse(cx, cy - 8, 5, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.shadowColor = '#d4a020'; ctx.shadowBlur = 8;
    ctx.fillStyle = 'rgba(212,160,32,0.35)';
    ctx.beginPath(); ctx.ellipse(cx, cy - 8, 3, 4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    // Пески внизу
    ctx.fillStyle = '#5a3a10';
    ctx.fillRect(cx - 44, cy + 26, 88, 6);
  }

  _drawDarkCrest(canvas) {
    const size = canvas.width;
    const ctx  = canvas.getContext('2d');
    const cx   = size / 2, cy = size / 2;
    ctx.clearRect(0, 0, size, size);

    // Почти чёрный фон с красной аурой
    ctx.fillStyle = '#050000';
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = '#5a0808';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, size - 4, size - 4);

    // Красное зарево снизу
    const glow = ctx.createRadialGradient(cx, size, 10, cx, size, size * 0.8);
    glow.addColorStop(0, 'rgba(180,0,0,0.2)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, size, size);

    // Трон — центральный силуэт
    ctx.fillStyle = '#1a0000';
    // Спинка трона
    ctx.fillRect(cx - 24, cy - 50, 48, 70);
    // Боковые подлокотники
    ctx.fillRect(cx - 34, cy + 10, 14, 18);
    ctx.fillRect(cx + 20, cy + 10, 14, 18);
    // Ножки трона
    ctx.fillRect(cx - 24, cy + 28, 12, 18);
    ctx.fillRect(cx + 12, cy + 28, 12, 18);

    // Тёмная корона над троном
    ctx.fillStyle = '#3a0000';
    ctx.beginPath();
    ctx.moveTo(cx - 22, cy - 50);
    ctx.lineTo(cx - 22, cy - 66);
    ctx.lineTo(cx - 10, cy - 58);
    ctx.lineTo(cx,      cy - 72);
    ctx.lineTo(cx + 10, cy - 58);
    ctx.lineTo(cx + 22, cy - 66);
    ctx.lineTo(cx + 22, cy - 50);
    ctx.fill();

    // Красные глаза на троне (владелец ушёл, но его взгляд остался)
    ctx.shadowColor = '#ff0000'; ctx.shadowBlur = 10; ctx.fillStyle = '#cc0000';
    ctx.beginPath(); ctx.arc(cx - 8, cy - 16, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 8, cy - 16, 4, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;

    // Трещины по трону
    ctx.strokeStyle = '#8b0000'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx - 5, cy - 50); ctx.lineTo(cx - 12, cy + 28); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 8, cy - 45); ctx.lineTo(cx + 4, cy + 20);  ctx.stroke();
  }

  // ── Map 3 epilogue ─────────────────────────────────────────────────────────
  showMap3Epilogue(score, wave, startTime) {
    const wrap = document.getElementById('canvasWrap') || document.body;
    const el   = document.createElement('div');
    el.id = 'map3Epilogue';
    el.style.cssText = [
      'position:absolute;inset:0;z-index:90',
      'background:#000000',
      'display:flex;flex-direction:column;align-items:center;justify-content:center',
      'font-family:"Courier New",monospace;color:#b0b0b0;text-align:center;padding:40px 60px',
      'transition:background 4s ease',
      'overflow:hidden',
    ].join(';');

    // Герб — canvas в центре
    const crestCanvas = document.createElement('canvas');
    crestCanvas.width  = 140;
    crestCanvas.height = 140;
    crestCanvas.style.cssText = 'margin-bottom:22px;opacity:0;transition:opacity 1.5s';
    el.appendChild(crestCanvas);

    // Текстовый блок
    const linesDiv = document.createElement('div');
    linesDiv.style.cssText = 'max-width:560px;margin-bottom:18px';
    el.appendChild(linesDiv);

    // Блок статистики
    const statsDiv = document.createElement('div');
    statsDiv.style.cssText = [
      'margin-top:16px;padding:14px 28px;border:1px solid #555',
      'font-size:13px;letter-spacing:0.06em;color:#888',
      'opacity:0;transition:opacity 0.8s',
    ].join(';');
    el.appendChild(statsDiv);

    // Кнопка
    const btn = document.createElement('button');
    btn.textContent = 'Главное меню';
    btn.style.cssText = [
      'margin-top:22px;padding:10px 32px',
      'background:#1a1200;color:#c8a020;border:1px solid #c8a020',
      'font-family:"Courier New",monospace;font-size:13px;letter-spacing:0.08em',
      'cursor:pointer;opacity:0;transition:opacity 0.7s',
    ].join(';');
    btn.onmouseover = () => { btn.style.background = '#2a1e00'; };
    btn.onmouseout  = () => { btn.style.background = '#1a1200'; };
    btn.onclick = () => location.reload();
    el.appendChild(btn);

    wrap.appendChild(el);

    // Анимация: сначала тёмный, потом золотой рассвет
    let totalDelay = 800;

    MAP3_EPILOGUE_LINES.forEach(entry => {
      if (entry.special === 'spacer') {
        totalDelay += 300;
        return;
      }
      const p = document.createElement('p');
      p.style.cssText = [
        'margin:9px 0;opacity:0;transform:translateY(8px)',
        'transition:opacity 0.8s,transform 0.8s',
      ].join(';');
      if (entry.special === 'victory') {
        p.style.fontSize    = '26px';
        p.style.fontWeight  = 'bold';
        p.style.color       = '#c8a020';
        p.style.letterSpacing = '0.18em';
        p.style.marginTop   = '6px';
      } else if (entry.special === 'subtitle') {
        p.style.fontSize    = '15px';
        p.style.fontWeight  = 'bold';
        p.style.color       = '#d0c080';
        p.style.letterSpacing = '0.12em';
      } else {
        p.style.fontSize    = '14px';
        p.style.lineHeight  = '1.6';
      }
      p.textContent = entry.text;
      linesDiv.appendChild(p);
      setTimeout(() => {
        p.style.opacity   = '1';
        p.style.transform = 'translateY(0)';
      }, totalDelay);
      totalDelay += entry.special === 'victory' ? 1200 : 900;
    });

    // После последней строки — рассвет + герб + статы + кнопка
    const dawnDelay = totalDelay + 600;

    setTimeout(() => {
      // Рассвет: фон светлеет к золотому
      el.style.background = 'linear-gradient(to bottom, #0a0800, #1a1200, #2a1e00)';
    }, dawnDelay);

    setTimeout(() => {
      // Герб
      this._drawCrest(crestCanvas);
      crestCanvas.style.opacity = '1';
    }, dawnDelay + 800);

    // Форматирование времени
    let timeStr = '--:--';
    if (startTime) {
      const secs  = Math.floor((Date.now() - startTime) / 1000);
      const mm    = String(Math.floor(secs / 60)).padStart(2, '0');
      const ss    = String(secs % 60).padStart(2, '0');
      timeStr = `${mm}:${ss}`;
    }
    setTimeout(() => {
      statsDiv.innerHTML = [
        `Волн пройдено: <b style="color:#ccc">${wave}</b>`,
        `&nbsp;&nbsp;|&nbsp;&nbsp;Счёт: <b style="color:#ccc">${score}</b>`,
        `&nbsp;&nbsp;|&nbsp;&nbsp;Время: <b style="color:#ccc">${timeStr}</b>`,
      ].join('');
      statsDiv.style.opacity = '1';
    }, dawnDelay + 1800);

    setTimeout(() => { btn.style.opacity = '1'; }, dawnDelay + 2600);
  }

  // ── Epilogue ───────────────────────────────────────────────────────────────
  showEpilogue(score, onRestart) {
    const el = this.epilogueEl;
    if (!el) return;
    el.style.display = 'flex';

    const linesEl = document.getElementById('epilogueLines');
    if (linesEl) {
      linesEl.innerHTML = '';
      let delay = 600;
      EPILOGUE_LINES.forEach(line => {
        const p = document.createElement('p');
        if (line === 'ПОБЕДА') {
          p.className = 'epilogue-victory';
          p.textContent = line;
        } else if (line === '') {
          p.style.height = '12px';
          p.style.display = 'block';
        } else {
          p.className = 'epilogue-line';
          p.textContent = line;
        }
        linesEl.appendChild(p);
        setTimeout(() => { p.classList.add('visible'); }, delay);
        delay += line === '' ? 150 : 950;
      });

      setTimeout(() => {
        const scoreEl   = document.getElementById('epilogueScore');
        const restartEl = document.getElementById('epilogueRestart');
        if (scoreEl)   { scoreEl.textContent = `Счёт: ${score}`; scoreEl.classList.add('visible'); }
        if (restartEl) { restartEl.classList.add('visible'); }
      }, delay + 600);
    }

    // Background transitions to dawn
    setTimeout(() => {
      el.style.background = 'linear-gradient(to bottom, #050505, #1a1200, #2a2000)';
    }, 3500);

    const restartBtn = document.getElementById('epilogueRestart');
    if (restartBtn) restartBtn.addEventListener('click', () => location.reload());
  }
}

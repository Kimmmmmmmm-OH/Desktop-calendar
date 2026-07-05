/* ================================================================
   Settings Window Logic
   ================================================================ */

function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return `${Math.round(f(0) * 255)}, ${Math.round(f(8) * 255)}, ${Math.round(f(4) * 255)}`;
}

function applyColors(bgH, bgS, bgL, fgH, fgS, fgL) {
  const root = document.documentElement;
  root.style.setProperty('--bg-primary', `hsl(${bgH}, ${bgS}%, ${bgL}%)`);
  root.style.setProperty('--bg-secondary', `hsl(${bgH}, ${bgS}%, ${Math.min(bgL + 4, 95)}%)`);
  root.style.setProperty('--bg-tertiary', `hsl(${bgH}, ${bgS}%, ${Math.min(bgL + 8, 95)}%)`);
  root.style.setProperty('--bg-hover', `hsl(${bgH}, ${bgS}%, ${Math.min(bgL + 14, 95)}%)`);
  root.style.setProperty('--bg-primary-rgb', hslToRgb(bgH, bgS, bgL));
  root.style.setProperty('--accent', `hsl(${fgH}, ${fgS}%, ${fgL}%)`);
  root.style.setProperty('--accent-light', `hsl(${fgH}, ${fgS}%, ${Math.min(fgL + 10, 95)}%)`);
  root.style.setProperty('--accent-dark', `hsl(${fgH}, ${fgS}%, ${Math.max(fgL - 10, 5)}%)`);
  root.style.setProperty('--accent-rgb', hslToRgb(fgH, fgS, fgL));

  const isLight = bgL > 50;
  if (isLight) {
    root.style.setProperty('--text-primary', '#111111');
    root.style.setProperty('--text-secondary', '#555555');
    root.style.setProperty('--text-muted', '#888888');
    root.style.setProperty('--border', 'rgba(0,0,0,0.06)');
    root.style.setProperty('--border-strong', 'rgba(0,0,0,0.1)');
    root.style.setProperty('--shadow', '0 2px 12px rgba(0,0,0,0.06)');
    root.style.setProperty('--mini-card-bg', 'rgba(255, 255, 255, 0.55)');
    root.style.setProperty('--mini-card-hover', 'rgba(255, 255, 255, 0.85)');
  } else {
    root.style.setProperty('--text-primary', '#e8e6e3');
    root.style.setProperty('--text-secondary', '#9a98a0');
    root.style.setProperty('--text-muted', '#6a6870');
    root.style.setProperty('--border', 'rgba(255,255,255,0.08)');
    root.style.setProperty('--border-strong', 'rgba(255,255,255,0.14)');
    root.style.setProperty('--shadow', '0 2px 20px rgba(0,0,0,0.4)');
    root.style.setProperty('--mini-card-bg', 'rgba(255, 255, 255, 0.08)');
    root.style.setProperty('--mini-card-hover', 'rgba(255, 255, 255, 0.14)');
  }
}

const PRESETS = {
  default: { bgH: 0, bgS: 0, bgL: 96, fgH: 0, fgS: 0, fgL: 12 },
  gold:   { bgH: 240, bgS: 15, bgL: 12, fgH: 40, fgS: 40, fgL: 62 },
  blue:   { bgH: 215, bgS: 20, bgL: 12, fgH: 205, fgS: 40, fgL: 58 },
  purple: { bgH: 260, bgS: 18, bgL: 12, fgH: 270, fgS: 35, fgL: 60 },
  green:  { bgH: 160, bgS: 15, bgL: 12, fgH: 140, fgS: 30, fgL: 52 },
  light:  { bgH: 0, bgS: 0, bgL: 98, fgH: 0, fgS: 0, fgL: 18 }
};

const SYSTEM_FONTS = [
  'Microsoft YaHei', 'PingFang SC', 'SimSun', 'SimHei',
  'KaiTi', 'FangSong', 'DengXian', 'YouYuan',
  'Microsoft JhengHei', 'Helvetica Neue', 'Arial',
  'Segoe UI', 'Consolas', 'Courier New', 'Georgia',
  'Times New Roman', 'Verdana', 'Tahoma'
];

function updateAllSliderLabels() {
  document.getElementById('bg-hue-value').textContent = document.getElementById('bg-hue-slider').value + '°';
  document.getElementById('bg-sat-value').textContent = document.getElementById('bg-sat-slider').value + '%';
  document.getElementById('bg-light-value').textContent = document.getElementById('bg-light-slider').value + '%';
  document.getElementById('fg-hue-value').textContent = document.getElementById('fg-hue-slider').value + '°';
  document.getElementById('fg-sat-value').textContent = document.getElementById('fg-sat-slider').value + '%';
  document.getElementById('fg-light-value').textContent = document.getElementById('fg-light-slider').value + '%';
}

async function saveColors(bgH, bgS, bgL, fgH, fgS, fgL) {
  if (window.electronAPI) {
    await window.electronAPI.saveSettings({ bgHue: bgH, bgSat: bgS, bgLight: bgL, fgHue: fgH, fgSat: fgS, fgLight: fgL });
  }
}

function applyPreset(name) {
  const p = PRESETS[name] || PRESETS['default'];
  document.getElementById('bg-hue-slider').value = p.bgH;
  document.getElementById('bg-sat-slider').value = p.bgS;
  document.getElementById('bg-light-slider').value = p.bgL;
  document.getElementById('fg-hue-slider').value = p.fgH;
  document.getElementById('fg-sat-slider').value = p.fgS;
  document.getElementById('fg-light-slider').value = p.fgL;
  updateAllSliderLabels();
  applyColors(p.bgH, p.bgS, p.bgL, p.fgH, p.fgS, p.fgL);
}

async function resetAllSettings() {
  applyPreset('default');

  document.getElementById('bg-opacity-slider').value = 92;
  document.getElementById('bg-opacity-value').textContent = '92%';
  document.getElementById('text-opacity-slider').value = 100;
  document.getElementById('text-opacity-value').textContent = '100%';
  document.documentElement.style.setProperty('--text-opacity', '1');

  populateFontSelect('Microsoft YaHei');

  document.getElementById('month-font-slider').value = 72;
  document.getElementById('month-font-value').textContent = '72px';
  document.getElementById('year-font-slider').value = 18;
  document.getElementById('year-font-value').textContent = '18px';
  document.getElementById('date-font-slider').value = 22;
  document.getElementById('date-font-value').textContent = '22px';
  document.getElementById('weekday-font-slider').value = 15;
  document.getElementById('weekday-font-value').textContent = '15px';
  document.getElementById('lunar-font-slider').value = 15;
  document.getElementById('lunar-font-value').textContent = '15px';

  document.getElementById('todo-dot-size-slider').value = 8;
  document.getElementById('todo-dot-size-value').textContent = '8px';

  document.getElementById('toggle-ontop').checked = true;
  document.getElementById('toggle-autostart').checked = false;
  document.getElementById('toggle-titlebar').checked = false;

  document.getElementById('btn-clear-bg-image').classList.add('hidden');

  if (window.electronAPI) {
    await window.electronAPI.setAutoStart(false);
    await window.electronAPI.saveSettings({
      bgOpacity: 0.92,
      textOpacity: 1.0,
      fontFamily: 'Microsoft YaHei',
      bgHue: 0, bgSat: 0, bgLight: 96,
      fgHue: 0, fgSat: 0, fgLight: 12,
      monthFontSize: 72,
      yearFontSize: 18,
      dateFontSize: 22,
      weekdayFontSize: 15,
      lunarFontSize: 15,
      todoDotColor: '#111111',
      todoDotSize: 8,
      alwaysOnTop: true,
      autoStart: false,
      titlebarHidden: false,
      backgroundImage: ''
    });
  }
}

function populateFontSelect(selectedFont) {
  const select = document.getElementById('font-family-select');
  select.innerHTML = '';
  for (const font of SYSTEM_FONTS) {
    const opt = document.createElement('option');
    opt.value = font;
    opt.textContent = font;
    if (font === selectedFont) opt.selected = true;
    select.appendChild(opt);
  }
}

async function chooseBackgroundImage() {
  if (!window.electronAPI) return;
  const dataUrl = await window.electronAPI.openFileDialog();
  if (dataUrl) {
    await window.electronAPI.saveSettings({ backgroundImage: dataUrl });
    document.getElementById('btn-clear-bg-image').classList.remove('hidden');
  }
}

async function clearBackgroundImage() {
  document.getElementById('btn-clear-bg-image').classList.add('hidden');
  if (window.electronAPI) {
    await window.electronAPI.saveSettings({ backgroundImage: '' });
  }
}

async function init() {
  if (!window.electronAPI) return;

  const s = await window.electronAPI.getSettings();

  // Opacity
  const bgOpacity = s.bgOpacity ?? s.transparency ?? 0.92;
  document.getElementById('bg-opacity-slider').value = Math.round(bgOpacity * 100);
  document.getElementById('bg-opacity-value').textContent = Math.round(bgOpacity * 100) + '%';
  const textOpacity = (s.textOpacity !== undefined ? s.textOpacity : 1.0);
  document.getElementById('text-opacity-slider').value = Math.round(textOpacity * 100);
  document.getElementById('text-opacity-value').textContent = Math.round(textOpacity * 100) + '%';

  // Font family
  const fontFamily = s.fontFamily || SYSTEM_FONTS[0];
  populateFontSelect(fontFamily);

  // Background image
  if (s.backgroundImage) {
    document.getElementById('btn-clear-bg-image').classList.remove('hidden');
  }

  // Colors
  const bgH = s.bgHue !== undefined ? s.bgHue : 0;
  const bgS = s.bgSat !== undefined ? s.bgSat : 0;
  const bgL = s.bgLight !== undefined ? s.bgLight : 96;
  const fgH = s.fgHue !== undefined ? s.fgHue : 0;
  const fgS = s.fgSat !== undefined ? s.fgSat : 0;
  const fgL = s.fgLight !== undefined ? s.fgLight : 12;
  document.getElementById('bg-hue-slider').value = bgH;
  document.getElementById('bg-sat-slider').value = bgS;
  document.getElementById('bg-light-slider').value = bgL;
  document.getElementById('fg-hue-slider').value = fgH;
  document.getElementById('fg-sat-slider').value = fgS;
  document.getElementById('fg-light-slider').value = fgL;
  updateAllSliderLabels();
  applyColors(bgH, bgS, bgL, fgH, fgS, fgL);

  // Font sizes
  const fontSliders = [
    { id: 'month',   key: 'monthFontSize',   def: 72 },
    { id: 'year',    key: 'yearFontSize',    def: 18 },
    { id: 'date',    key: 'dateFontSize',    def: 22 },
    { id: 'weekday', key: 'weekdayFontSize', def: 15 },
    { id: 'lunar',   key: 'lunarFontSize',   def: 15 }
  ];
  for (const { id, key, def } of fontSliders) {
    const val = s[key] || def;
    document.getElementById(id + '-font-slider').value = val;
    document.getElementById(id + '-font-value').textContent = val + 'px';
  }

  // Todo dot
  const dotSize = s.todoDotSize || 8;
  document.getElementById('todo-dot-size-slider').value = dotSize;
  document.getElementById('todo-dot-size-value').textContent = dotSize + 'px';

  // Toggles
  document.getElementById('toggle-ontop').checked = s.alwaysOnTop !== false;
  document.getElementById('toggle-autostart').checked = s.autoStart === true;
  document.getElementById('toggle-titlebar').checked = s.titlebarHidden === true;

  // ==================== Event Listeners ====================

  document.getElementById('btn-settings-close').addEventListener('click', () => {
    if (window.electronAPI) window.electronAPI.closeSettings();
  });

  document.getElementById('bg-opacity-slider').addEventListener('input', (e) => {
    document.getElementById('bg-opacity-value').textContent = e.target.value + '%';
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ bgOpacity: parseInt(e.target.value) / 100 });
    }
  });

  document.getElementById('text-opacity-slider').addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    document.getElementById('text-opacity-value').textContent = val + '%';
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ textOpacity: val / 100 });
    }
  });

  document.getElementById('font-family-select').addEventListener('change', (e) => {
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ fontFamily: e.target.value });
    }
  });

  document.getElementById('btn-choose-bg-image').addEventListener('click', chooseBackgroundImage);
  document.getElementById('btn-clear-bg-image').addEventListener('click', clearBackgroundImage);

  // Font size sliders
  for (const { id, key } of fontSliders) {
    document.getElementById(id + '-font-slider').addEventListener('input', (e) => {
      document.getElementById(id + '-font-value').textContent = e.target.value + 'px';
      if (window.electronAPI) {
        window.electronAPI.saveSettings({ [key]: parseInt(e.target.value) });
      }
    });
  }

  // Todo dot
  document.getElementById('todo-dot-size-slider').addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    document.getElementById('todo-dot-size-value').textContent = val + 'px';
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ todoDotSize: val });
    }
  });

  // HSL sliders
  const hslSliders = ['bg-hue','bg-sat','bg-light','fg-hue','fg-sat','fg-light'];
  for (const id of hslSliders) {
    document.getElementById(id + '-slider').addEventListener('input', () => {
      updateAllSliderLabels();
      const bgH = parseInt(document.getElementById('bg-hue-slider').value);
      const bgS = parseInt(document.getElementById('bg-sat-slider').value);
      const bgL = parseInt(document.getElementById('bg-light-slider').value);
      const fgH = parseInt(document.getElementById('fg-hue-slider').value);
      const fgS = parseInt(document.getElementById('fg-sat-slider').value);
      const fgL = parseInt(document.getElementById('fg-light-slider').value);
      applyColors(bgH, bgS, bgL, fgH, fgS, fgL);
      saveColors(bgH, bgS, bgL, fgH, fgS, fgL);
    });
  }

  // Preset buttons
  document.querySelectorAll('.preset-btn').forEach(btn => {
    if (btn.classList.contains('preset-reset')) {
      btn.addEventListener('click', resetAllSettings);
    } else {
      btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
    }
  });

  // Save button
  document.getElementById('btn-save-settings').addEventListener('click', async () => {
    const settings = {
      bgOpacity: parseInt(document.getElementById('bg-opacity-slider').value) / 100,
      textOpacity: parseInt(document.getElementById('text-opacity-slider').value) / 100,
      fontFamily: document.getElementById('font-family-select').value,
      bgHue: parseInt(document.getElementById('bg-hue-slider').value),
      bgSat: parseInt(document.getElementById('bg-sat-slider').value),
      bgLight: parseInt(document.getElementById('bg-light-slider').value),
      fgHue: parseInt(document.getElementById('fg-hue-slider').value),
      fgSat: parseInt(document.getElementById('fg-sat-slider').value),
      fgLight: parseInt(document.getElementById('fg-light-slider').value),
      monthFontSize: parseInt(document.getElementById('month-font-slider').value),
      yearFontSize: parseInt(document.getElementById('year-font-slider').value),
      dateFontSize: parseInt(document.getElementById('date-font-slider').value),
      weekdayFontSize: parseInt(document.getElementById('weekday-font-slider').value),
      lunarFontSize: parseInt(document.getElementById('lunar-font-slider').value),
      todoDotSize: parseInt(document.getElementById('todo-dot-size-slider').value),
      alwaysOnTop: document.getElementById('toggle-ontop').checked,
      autoStart: document.getElementById('toggle-autostart').checked,
      titlebarHidden: document.getElementById('toggle-titlebar').checked
    };
    if (window.electronAPI) {
      await window.electronAPI.saveSettings(settings);
      const fb = document.getElementById('save-settings-feedback');
      fb.classList.remove('hidden');
      fb.classList.add('flash-once');
      setTimeout(() => {
        fb.classList.add('hidden');
        fb.classList.remove('flash-once');
      }, 1000);
    }
  });

  // Toggles
  document.getElementById('toggle-ontop').addEventListener('change', (e) => {
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ alwaysOnTop: e.target.checked });
    }
  });
  document.getElementById('toggle-autostart').addEventListener('change', (e) => {
    if (window.electronAPI) {
      window.electronAPI.setAutoStart(e.target.checked);
    }
  });
  document.getElementById('toggle-titlebar').addEventListener('change', (e) => {
    if (window.electronAPI) {
      window.electronAPI.saveSettings({ titlebarHidden: e.target.checked });
    }
  });

  // Resize window to fit content (avoid scrolling when possible)
  requestAnimationFrame(() => {
    if (window.electronAPI && window.electronAPI.resizeSettings) {
      const h = document.getElementById('settings-panel').scrollHeight;
      window.electronAPI.resizeSettings(480, h + 4);
    }
  });
}

document.addEventListener('DOMContentLoaded', init);

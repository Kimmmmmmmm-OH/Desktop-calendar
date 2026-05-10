const { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage, screen } = require('electron');
const path = require('path');
const fs = require('fs');

const SETTINGS_PATH = path.join(app.getPath('userData'), 'settings.json');
const TODOS_PATH = path.join(app.getPath('userData'), 'todos.json');

let mainWindow = null;
let tray = null;
let isQuitting = false;
let isPinned = false;
let baseWindowBounds = null; // bounds when no slide panels are open
let suppressBoundsSave = false; // prevent saving expanded bounds

function loadSettings() {
  try {
    return JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf-8'));
  } catch (e) { /* ignore */ }
  return {
    transparency: 0.92,
    alwaysOnTop: true,
    autoStart: false,
    width: 380,
    height: 620,
    x: undefined,
    y: undefined,
    titlebarHidden: false,
    todoHidden: false,
    bgHue: 240, bgSat: 15, bgLight: 12,
    fgHue: 40, fgSat: 40, fgLight: 62,
    monthFontSize: 17,
    dateFontSize: 14,
    weekdayFontSize: 10,
    cellTodoFontSize: 7,
    cellTodoColor: '#9a98a0',
    cellTodoBold: false,
    memoText: '',
    memoFontSize: 14,
    memoTextColor: '#e8e6e3',
    isPinned: false
  };
}

function saveSettings(settings) {
  try {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (e) { /* ignore */ }
}

function getStartupPath() {
  return path.join(app.getPath('home'), 'AppData', 'Roaming', 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Startup', '桌面日历清单.lnk');
}

function setAutoStart(enable) {
  const startupPath = getStartupPath();
  if (enable) {
    const exePath = process.execPath;
    const shortcutPath = startupPath;
    const args = process.argv.length > 1 && !process.execPath.endsWith('桌面日历清单.exe')
      ? `"${process.argv[1]}"` : '';
    const vbs = `
Set ws = WScript.CreateObject("WScript.Shell")
Set shortcut = ws.CreateShortcut("${shortcutPath.replace(/\\/g, '\\\\')}")
shortcut.TargetPath = "${exePath.replace(/\\/g, '\\\\')}"
shortcut.Arguments = "${args}"
shortcut.WorkingDirectory = "${__dirname.replace(/\\/g, '\\\\')}"
shortcut.Save()
    `;
    const tmpPath = path.join(app.getPath('temp'), 'startup_shortcut.vbs');
    fs.writeFileSync(tmpPath, vbs, 'utf-8');
    require('child_process').exec(`cscript //Nologo "${tmpPath}"`, () => {
      try { fs.unlinkSync(tmpPath); } catch (e) { /* ignore */ }
    });
  } else {
    try {
      fs.unlinkSync(startupPath);
    } catch (e) { /* ignore */ }
  }
}

function createWindow() {
  const settings = loadSettings();
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenW, height: screenH } = primaryDisplay.workAreaSize;

  const winW = settings.width || 380;
  const winH = settings.height || 620;
  const winX = settings.x !== undefined ? settings.x : screenW - winW - 40;
  const winY = settings.y !== undefined ? settings.y : Math.round((screenH - winH) / 2);

  mainWindow = new BrowserWindow({
    width: winW,
    height: winH,
    x: winX,
    y: winY,
    frame: false,
    transparent: true,
    backgroundColor: '#111118',
    alwaysOnTop: settings.alwaysOnTop,
    skipTaskbar: false,
    resizable: true,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.setOpacity(settings.transparency);
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  mainWindow.setTitle('桌面日历清单');

  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on('resize', () => {
    if (suppressBoundsSave) return;
    const [w, h] = mainWindow.getSize();
    const [x, y] = mainWindow.getPosition();
    settings.width = w;
    settings.height = h;
    settings.x = x;
    settings.y = y;
    saveSettings(settings);
  });

  mainWindow.on('move', () => {
    if (suppressBoundsSave) return;
    const [x, y] = mainWindow.getPosition();
    settings.x = x;
    settings.y = y;
    saveSettings(settings);
  });

  return settings;
}

function createTray() {
  const iconSize = 16;
  const canvas = Buffer.alloc(iconSize * iconSize * 4);
  // Draw a simple calendar icon in buffer
  for (let y = 0; y < iconSize; y++) {
    for (let x = 0; x < iconSize; x++) {
      const i = (y * iconSize + x) * 4;
      // Gold color #c9a96e
      if (x >= 2 && x <= 13 && y >= 2 && y <= 13) {
        canvas[i] = 201;     // R
        canvas[i + 1] = 169; // G
        canvas[i + 2] = 110; // B
        canvas[i + 3] = 255; // A
      } else {
        canvas[i + 3] = 0;   // transparent
      }
    }
  }
  const icon = nativeImage.createFromBuffer(canvas, { width: iconSize, height: iconSize });

  tray = new Tray(icon);
  tray.setToolTip('桌面日历清单');

  const updateMenu = () => {
    const settings = loadSettings();
    const menu = Menu.buildFromTemplate([
      {
        label: '显示/隐藏窗口', click: () => {
          if (mainWindow.isVisible()) {
            mainWindow.hide();
          } else {
            mainWindow.show();
            mainWindow.focus();
          }
        }
      },
      { type: 'separator' },
      {
        label: '窗口置顶', type: 'checkbox', checked: settings.alwaysOnTop,
        click: (item) => {
          settings.alwaysOnTop = item.checked;
          saveSettings(settings);
          mainWindow.setAlwaysOnTop(item.checked);
        }
      },
      {
        label: '开机自启', type: 'checkbox', checked: settings.autoStart,
        click: (item) => {
          settings.autoStart = item.checked;
          saveSettings(settings);
          setAutoStart(item.checked);
        }
      },
      { type: 'separator' },
      { label: '退出', click: () => { isQuitting = true; app.quit(); } }
    ]);
    tray.setContextMenu(menu);
  };

  tray.on('right-click', updateMenu);
  tray.on('double-click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  updateMenu();
}

ipcMain.handle('get-settings', () => loadSettings());

ipcMain.handle('save-settings', (_, newSettings) => {
  const current = loadSettings();
  const merged = { ...current, ...newSettings };
  saveSettings(merged);
  if (mainWindow) {
    if (newSettings.transparency !== undefined) {
      mainWindow.setOpacity(newSettings.transparency);
    }
    if (newSettings.alwaysOnTop !== undefined) {
      mainWindow.setAlwaysOnTop(newSettings.alwaysOnTop);
    }
  }
  return merged;
});

ipcMain.handle('get-todos', () => {
  try {
    return JSON.parse(fs.readFileSync(TODOS_PATH, 'utf-8'));
  } catch (e) { /* ignore */ }
  return {};
});

ipcMain.handle('save-todos', (_, todos) => {
  try {
    fs.writeFileSync(TODOS_PATH, JSON.stringify(todos, null, 2), 'utf-8');
    return true;
  } catch (e) { return false; }
});

ipcMain.handle('set-auto-start', (_, enable) => {
  const settings = loadSettings();
  settings.autoStart = enable;
  saveSettings(settings);
  setAutoStart(enable);
  return true;
});

ipcMain.handle('minimize-to-tray', () => {
  if (mainWindow) mainWindow.hide();
});

ipcMain.handle('toggle-fullscreen', () => {
  if (mainWindow) {
    const fs = mainWindow.isFullScreen();
    mainWindow.setFullScreen(!fs);
    return !fs;
  }
  return false;
});

ipcMain.handle('toggle-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
    return mainWindow.isMaximized();
  }
  return false;
});

ipcMain.handle('toggle-pin', () => {
  if (mainWindow) {
    isPinned = !isPinned;
    if (isPinned) {
      mainWindow.setResizable(false);
      mainWindow.setMovable(false);
    } else {
      mainWindow.setResizable(true);
      mainWindow.setMovable(true);
      // Restore alwaysOnTop from settings
      const settings = loadSettings();
      mainWindow.setAlwaysOnTop(settings.alwaysOnTop !== false);
    }
    // Save pinned state
    const settings = loadSettings();
    settings.isPinned = isPinned;
    saveSettings(settings);
    return isPinned;
  }
  return false;
});

ipcMain.handle('panel-state-changed', (_, state) => {
  // state = { leftOpen, rightOpen, leftWidth, rightWidth }
  if (!mainWindow) return false;

  // Save base bounds if not yet saved
  if (!baseWindowBounds) {
    baseWindowBounds = mainWindow.getBounds();
  }

  // Don't apply panel expansion if window is maximized or fullscreen
  if (mainWindow.isMaximized() || mainWindow.isFullScreen()) return false;

  let x = baseWindowBounds.x;
  let y = baseWindowBounds.y;
  let w = baseWindowBounds.width;
  let h = baseWindowBounds.height;

  if (state.leftOpen) {
    x -= state.leftWidth;
    w += state.leftWidth;
  }
  if (state.rightOpen) {
    w += state.rightWidth;
  }

  suppressBoundsSave = true;
  mainWindow.setBounds({ x, y, width: w, height: h });
  suppressBoundsSave = false;

  // Clear base bounds when all panels close
  if (!state.leftOpen && !state.rightOpen) {
    baseWindowBounds = null;
  }
  return true;
});

ipcMain.handle('get-pin-state', () => isPinned);

ipcMain.handle('quit-app', () => {
  isQuitting = true;
  app.quit();
});

app.whenReady().then(() => {
  const settings = createWindow();
  if (settings.isPinned) {
    isPinned = true;
    suppressBoundsSave = true;
    mainWindow.setResizable(false);
    mainWindow.setMovable(false);
    suppressBoundsSave = false;
  }

  createTray();

  if (settings.autoStart) setAutoStart(true);
});

app.on('window-all-closed', () => {});

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('activate', () => {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  }
});

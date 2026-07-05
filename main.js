const { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage, screen, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const SETTINGS_PATH = path.join(app.getPath('userData'), 'settings.json');
const TODOS_PATH = path.join(app.getPath('userData'), 'todos.json');
const MIN_WINDOW_SIZE = 800;
const MINI_SIZE = 80;

// 检查矩形是否在任一屏幕工作区内可见
function isRectVisibleOnAnyDisplay(px, py, pw, ph, displays) {
  return displays.some(d => {
    const { x, y, width, height } = d.workArea;
    return px < x + width && px + pw > x && py < y + height && py + ph > y;
  });
}

let mainWindow = null;
let settingsWindow = null;
let tray = null;
let isQuitting = false;
let isPinned = false;
let baseWindowBounds = null; // bounds when no slide panels are open
let suppressBoundsSave = false; // prevent saving expanded bounds
let tooltipWindow = null;
let currentSettings = null; // 模块级最新 settings，所有 handler 共享，避免闭包过期

function loadSettings() {
  try {
    return JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf-8'));
  } catch (e) { /* ignore */ }
  return {
    transparency: 0.92,
    bgOpacity: 0.92,
    textOpacity: 1.0,
    fontFamily: 'Microsoft YaHei',
    backgroundImage: '',
    alwaysOnTop: true,
    autoStart: false,
    width: MIN_WINDOW_SIZE,
    height: MIN_WINDOW_SIZE,
    x: undefined,
    y: undefined,
    titlebarHidden: false,
    bgHue: 0, bgSat: 0, bgLight: 96,
    fgHue: 0, fgSat: 0, fgLight: 12,
    monthFontSize: 72,
    yearFontSize: 18,
    dateFontSize: 22,
    weekdayFontSize: 15,
    lunarFontSize: 15,
    todoDotColor: '#111111',
    todoDotSize: 8,
    miniBounds: null,
    isPinned: false,
    isMiniMode: false,
    preMiniBounds: null,
    categoryColors: {
      event: '#6b9ed6',
      life: '#f0c040',
      love: '#e87d8a',
      birthday: '#e06070',
      festival: '#d4954a',
      entertainment: '#9b7ec4',
      study: '#0891b2',
      work: '#5a8bb5',
      sport: '#4caf50'
    },
    customCategories: []
  };
}

function saveSettings(settings) {
  try {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (e) { /* ignore */ }
}

// 统一保存窗口状态（迷你/正常模式嘅位置同尺寸），确保下次启动正确恢复
function saveWindowState() {
  if (!currentSettings || !mainWindow) return;
  const [x, y] = mainWindow.getPosition();
  const [w, h] = mainWindow.getSize();

  if (preMiniBounds) {
    // 当前係迷你模式：保存迷你状态、迷你位置、正常窗口边界
    currentSettings.isMiniMode = true;
    currentSettings.preMiniBounds = { ...preMiniBounds };
    currentSettings.miniBounds = { x, y };
    currentSettings.x = x;
    currentSettings.y = y;
    currentSettings.width = w;
    currentSettings.height = h;
  } else {
    // 当前係正常模式
    currentSettings.isMiniMode = false;
    currentSettings.x = x;
    currentSettings.y = y;
    currentSettings.width = w;
    currentSettings.height = h;
  }
  saveSettings(currentSettings);
}

const LOG_PATH = path.join(app.getPath('userData'), 'debug.log');
function debugLog(...args) {
  const line = `[${new Date().toISOString()}] ` + args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n';
  fs.appendFile(LOG_PATH, line, 'utf-8', () => {});
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
      ? process.argv[1] : '';
    const vbs = `
Set ws = WScript.CreateObject("WScript.Shell")
Set shortcut = ws.CreateShortcut(${JSON.stringify(shortcutPath)})
shortcut.TargetPath = ${JSON.stringify(exePath)}
shortcut.Arguments = ${JSON.stringify(args)}
shortcut.WorkingDirectory = ${JSON.stringify(__dirname)}
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
  // C01 要求：每次启动都不固定到桌面，忽略已保存的钉住状态
  settings.isPinned = false;
  currentSettings = settings; // 模块级引用，所有 handler 共享最新状态

  const displays = screen.getAllDisplays();

  // 计算所有屏幕最左边界，用于默认位置回退
  let totalMinX = Infinity;
  for (const d of displays) {
    if (d.workArea.x < totalMinX) totalMinX = d.workArea.x;
  }

  // 判断是否要以迷你模式启动
  const startInMini = settings.isMiniMode && settings.preMiniBounds;

  let winW, winH, winX, winY;
  if (startInMini) {
    winW = MINI_SIZE;
    winH = MINI_SIZE;
    const savedX = settings.miniBounds?.x ?? settings.x;
    const savedY = settings.miniBounds?.y ?? settings.y;
    if (savedX !== undefined && savedY !== undefined
        && isRectVisibleOnAnyDisplay(savedX, savedY, MINI_SIZE, MINI_SIZE, displays)) {
      winX = savedX;
      winY = savedY;
    }
    if (winX === undefined) {
      const pd = screen.getPrimaryDisplay();
      winX = pd.workArea.x + Math.round((pd.workArea.width - MINI_SIZE) / 2);
      winY = pd.workArea.y + Math.round((pd.workArea.height - MINI_SIZE) / 2);
    }
    preMiniBounds = settings.preMiniBounds;
  } else {
    winW = Math.max(settings.width || MIN_WINDOW_SIZE, MIN_WINDOW_SIZE);
    winH = Math.max(settings.height || MIN_WINDOW_SIZE, MIN_WINDOW_SIZE);
    if (settings.x !== undefined && settings.y !== undefined
        && isRectVisibleOnAnyDisplay(settings.x, settings.y, winW, winH, displays)) {
      winX = settings.x;
      winY = settings.y;
    }
    if (winX === undefined) {
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width: screenW, height: screenH } = primaryDisplay.workArea;
      winX = Math.max(totalMinX, screenW - winW - 40);
      winY = Math.round((screenH - winH) / 2);
    }
  }

  // 构建窗口选项
  const winOpts = {
    width: winW, height: winH, x: winX, y: winY,
    frame: false, transparent: true,
    alwaysOnTop: settings.alwaysOnTop,
    minWidth: MIN_WINDOW_SIZE, minHeight: MIN_WINDOW_SIZE,
    skipTaskbar: true, resizable: true,
  };
  if (startInMini) {
    Object.assign(winOpts, {
      alwaysOnTop: false,
      minWidth: MINI_SIZE, minHeight: MINI_SIZE,
      resizable: false
    });
  }

  mainWindow = new BrowserWindow({
    ...winOpts,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.setOpacity(settings.bgOpacity ?? settings.transparency ?? 0.92);
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  mainWindow.setTitle('桌面日历清单');

  // 窗口首次显示时保存初始设置，迷你模式启动时记住原始置顶状态
  mainWindow.once('ready-to-show', () => {
    if (startInMini) {
      preMiniAlwaysOnTop = settings.alwaysOnTop;
    }
    saveSettings(currentSettings);
  });

  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      // 隐藏前保存完整窗口状态（含迷你模式）
      saveWindowState();
      mainWindow.hide();
    } else {
      // 退出前保存最终状态
      saveWindowState();
    }
  });

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-state', 'maximized');
  });
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-state', 'restored');
  });

  mainWindow.on('resize', () => {
    if (suppressBoundsSave) return;
    const [w, h] = mainWindow.getSize();
    const [x, y] = mainWindow.getPosition();
    currentSettings.width = w;
    currentSettings.height = h;
    currentSettings.x = x;
    currentSettings.y = y;
    saveSettings(currentSettings);
    if (baseWindowBounds) {
      baseWindowBounds.width = w;
      baseWindowBounds.height = h;
      baseWindowBounds.x = x;
      baseWindowBounds.y = y;
    }
  });

  mainWindow.on('move', () => {
    if (suppressBoundsSave) return;
    const [x, y] = mainWindow.getPosition();
    if (preMiniBounds) {
      if (miniExpandedBounds) {
        lastMiniPosition = { x: miniExpandedBounds.x, y: miniExpandedBounds.y };
        debugLog('[MOVE] expanded: lastMiniPosition set to:', lastMiniPosition);
      } else {
        lastMiniPosition = { x, y };
        debugLog('[MOVE] lastMiniPosition updated:', lastMiniPosition);
      }
    } else {
      currentSettings.x = x;
      currentSettings.y = y;
      saveSettings(currentSettings);
    }
    if (baseWindowBounds) {
      baseWindowBounds.x = x;
      baseWindowBounds.y = y;
    }
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

/* ================================================================
   TOOLTIP WINDOW (independent from main window)
   ================================================================ */

function createSettingsWindow() {
  if (settingsWindow && !settingsWindow.isDestroyed()) {
    settingsWindow.show();
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 480,
    height: 580,
    frame: false,
    transparent: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: true,
    minWidth: 320,
    minHeight: 240,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  settingsWindow.loadFile(path.join(__dirname, 'renderer', 'settings.html'));
  settingsWindow.setMenuBarVisibility(false);

  settingsWindow.once('ready-to-show', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      const [mainX, mainY] = mainWindow.getPosition();
      const [mainW] = mainWindow.getSize();
      const gap = 8;
      settingsWindow.setPosition(mainX - 480 - gap, mainY);
    }
    settingsWindow.show();
  });

  settingsWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      settingsWindow.hide();
    }
  });

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
}

function createTooltipWindow() {
  tooltipWindow = new BrowserWindow({
    width: 360,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
    resizable: false,
    focusable: false,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload-tooltip.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  tooltipWindow.loadFile(path.join(__dirname, 'renderer', 'tooltip.html'));
  tooltipWindow.setIgnoreMouseEvents(true);

  tooltipWindow.on('closed', () => {
    tooltipWindow = null;
  });
}

function showTooltipWindow(bounds, data) {
  if (!tooltipWindow || tooltipWindow.isDestroyed()) {
    createTooltipWindow();
  }
  const doShow = () => {
    tooltipWindow.webContents.send('tooltip-data', data);
    tooltipWindow.setBounds({ x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height });
    tooltipWindow.setIgnoreMouseEvents(false);
    tooltipWindow.showInactive();
    tooltipWindow.moveTop();
  };
  if (tooltipWindow.webContents.isLoading()) {
    tooltipWindow.webContents.once('did-finish-load', doShow);
  } else {
    doShow();
  }
}

function hideTooltipWindow() {
  if (tooltipWindow && !tooltipWindow.isDestroyed()) {
    tooltipWindow.hide();
    tooltipWindow.setIgnoreMouseEvents(true);
  }
}

ipcMain.handle('get-settings', () => loadSettings());

ipcMain.handle('save-settings', (_, newSettings) => {
  const current = loadSettings();
  const merged = { ...current, ...newSettings };
  saveSettings(merged);
  // 同步更新模块级 currentSettings 为最新合并结果
  currentSettings = merged;
  if (mainWindow) {
    if (newSettings.bgOpacity !== undefined) {
      mainWindow.setOpacity(newSettings.bgOpacity);
    } else if (newSettings.transparency !== undefined) {
      mainWindow.setOpacity(newSettings.transparency);
    }
    if (newSettings.alwaysOnTop !== undefined) {
      mainWindow.setAlwaysOnTop(newSettings.alwaysOnTop);
    }
    // Forward settings changes to main window renderer for visual updates
    mainWindow.webContents.send('settings-changed', merged);
  }
  return merged;
});

ipcMain.handle('open-settings', () => {
  createSettingsWindow();
  return true;
});

ipcMain.handle('close-settings', () => {
  if (settingsWindow && !settingsWindow.isDestroyed()) {
    settingsWindow.hide();
  }
  return true;
});

ipcMain.handle('resize-settings', (_, width, height) => {
  if (settingsWindow && !settingsWindow.isDestroyed()) {
    const maxH = screen.getPrimaryDisplay().workArea.height - 40;
    settingsWindow.setBounds({
      width: Math.max(width, 320),
      height: Math.min(Math.max(height, 240), maxH)
    });
  }
  return true;
});

ipcMain.handle('open-file-dialog', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    title: '选择背景图片',
    properties: ['openFile'],
    filters: [
      { name: '图片文件', extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'] }
    ]
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  const filePath = result.filePaths[0];
  try {
    const img = nativeImage.createFromPath(filePath);
    if (img.isEmpty()) return null;
    const size = img.getSize();
    const maxDim = 1920;
    let resized = img;
    if (size.width > maxDim || size.height > maxDim) {
      const ratio = Math.min(maxDim / size.width, maxDim / size.height);
      resized = img.resize({
        width: Math.round(size.width * ratio),
        height: Math.round(size.height * ratio)
      });
    }
    const jpegBuffer = resized.toJPEG(85);
    return `data:image/jpeg;base64,${jpegBuffer.toString('base64')}`;
  } catch (e) {
    return null;
  }
});

ipcMain.handle('show-tooltip', (_, data) => {
  if (!mainWindow) return false;
  const [winX, winY] = mainWindow.getPosition();
  let x = winX + data.anchorRect.right + 12;
  let y = winY + data.anchorRect.top;
  const width = 360;

  // Screen boundary checks
  const currentDisplay = screen.getDisplayNearestPoint({ x: winX, y: winY });
  const work = currentDisplay.workArea;
  const pad = 8;

  if (x + width > work.x + work.width) {
    x = winX + data.anchorRect.left - width - 12;
  }
  if (x < work.x + pad) x = work.x + pad;
  if (y < work.y + pad) y = work.y + pad;

  showTooltipWindow({ x, y, width, height: data.bounds?.height || 200 }, data);
  return true;
});

ipcMain.handle('hide-tooltip', () => {
  hideTooltipWindow();
  return true;
});

ipcMain.on('tooltip-clicked', (_, dateKey) => {
  if (mainWindow) {
    mainWindow.webContents.send('open-detail-from-tooltip', dateKey);
  }
});

ipcMain.on('tooltip-hide-request', () => {
  hideTooltipWindow();
});

ipcMain.on('start-tooltip-timer', () => {
  if (tooltipWindow && !tooltipWindow.isDestroyed()) {
    tooltipWindow.webContents.send('start-tooltip-timer');
  }
});

ipcMain.on('cancel-tooltip-timer', () => {
  if (tooltipWindow && !tooltipWindow.isDestroyed()) {
    tooltipWindow.webContents.send('cancel-tooltip-timer');
  }
});

ipcMain.on('tooltip-resize', (_, height) => {
  if (tooltipWindow && !tooltipWindow.isDestroyed()) {
    const bounds = tooltipWindow.getBounds();
    const newHeight = Math.min(Math.max(height, 80), 800);
    tooltipWindow.setBounds({ ...bounds, height: newHeight });
  }
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

let preMaximizeBounds = null;

ipcMain.handle('toggle-maximize', () => {
  if (!mainWindow) return false;

  if (preMaximizeBounds) {
    // Restore previous bounds
    suppressBoundsSave = true;
    try {
      mainWindow.setBounds(preMaximizeBounds);
    } finally {
      suppressBoundsSave = false;
    }
    preMaximizeBounds = null;
    mainWindow.webContents.send('window-state', 'restored');
    return false;
  } else {
    // Save current bounds and maximize to the display the window is on
    preMaximizeBounds = mainWindow.getBounds();
    const currentDisplay = screen.getDisplayMatching(preMaximizeBounds);
    const { x, y, width, height } = currentDisplay.workArea;
    suppressBoundsSave = true;
    try {
      mainWindow.setBounds({ x, y, width, height });
    } finally {
      suppressBoundsSave = false;
    }
    mainWindow.webContents.send('window-state', 'maximized');
    return true;
  }
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
      mainWindow.setMinimumSize(MIN_WINDOW_SIZE, MIN_WINDOW_SIZE);
      mainWindow.setAlwaysOnTop(loadSettings().alwaysOnTop !== false);
    }
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
  try {
    mainWindow.setBounds({ x, y, width: w, height: h });
  } finally {
    suppressBoundsSave = false;
  }

  // Clear base bounds when all panels close
  if (!state.leftOpen && !state.rightOpen) {
    baseWindowBounds = null;
  }
  return true;
});

ipcMain.handle('get-pin-state', () => isPinned);

let preMiniBounds = null; // saved window bounds before entering mini mode
let lastMiniPosition = null; // in-memory last known mini window position
let preMiniAlwaysOnTop = null; // saved alwaysOnTop state before entering mini mode

ipcMain.handle('toggle-mini-mode', () => {
  if (!mainWindow) return false;

  if (preMiniBounds) {
    // Exit mini mode — remember mini position, then restore previous bounds
    // If preview is expanded, miniExpandedBounds holds the original icon position.
    let saveX, saveY;
    if (miniExpandedBounds) {
      saveX = miniExpandedBounds.x;
      saveY = miniExpandedBounds.y;
    } else {
      [saveX, saveY] = mainWindow.getPosition();
    }
    lastMiniPosition = { x: saveX, y: saveY };
    // 更新模块级 currentSettings：退出迷你模式，保存迷你位置
    currentSettings.isMiniMode = false;
    currentSettings.preMiniBounds = null;
    currentSettings.miniBounds = { x: saveX, y: saveY };
    saveSettings(currentSettings);
    debugLog('[EXIT-MINI] Saving miniBounds:', currentSettings.miniBounds, 'preMiniBounds:', preMiniBounds, 'hadExpandedBounds:', !!miniExpandedBounds);

    suppressBoundsSave = true;
    try {
      mainWindow.setResizable(true);
      mainWindow.setMovable(true);
      mainWindow.setBounds({
        x: preMiniBounds.x,
        y: preMiniBounds.y,
        width: Math.max(preMiniBounds.width, MIN_WINDOW_SIZE),
        height: Math.max(preMiniBounds.height, MIN_WINDOW_SIZE)
      });
      mainWindow.setMinimumSize(MIN_WINDOW_SIZE, MIN_WINDOW_SIZE);
      if (preMiniAlwaysOnTop !== null) {
        mainWindow.setAlwaysOnTop(preMiniAlwaysOnTop);
        preMiniAlwaysOnTop = null;
      }
      preMiniBounds = null;
      miniExpandedBounds = null;
    } finally {
      suppressBoundsSave = false;
    }
    return false;
  } else {
    // Enter mini mode — save current bounds, shrink to mini size
    preMiniBounds = mainWindow.getBounds();
    // 更新模块级 currentSettings，标记进入迷你模式并保存正常窗口边界
    currentSettings.isMiniMode = true;
    currentSettings.preMiniBounds = {
      x: preMiniBounds.x, y: preMiniBounds.y,
      width: preMiniBounds.width, height: preMiniBounds.height
    };
    saveSettings(currentSettings);

    let newX, newY;
    // Prefer in-memory position (same session), then disk settings, then center
    if (lastMiniPosition) {
      newX = lastMiniPosition.x;
      newY = lastMiniPosition.y;
      debugLog('[ENTER-MINI] Using in-memory lastMiniPosition:', lastMiniPosition);
    } else if (currentSettings.miniBounds) {
      newX = currentSettings.miniBounds.x;
      newY = currentSettings.miniBounds.y;
      debugLog('[ENTER-MINI] Using miniBounds from currentSettings:', currentSettings.miniBounds);
    } else {
      newX = preMiniBounds.x + Math.round((preMiniBounds.width - MINI_SIZE) / 2);
      newY = preMiniBounds.y + Math.round((preMiniBounds.height - MINI_SIZE) / 2);
      debugLog('[ENTER-MINI] No miniBounds, centering at:', { newX, newY });
    }
    // 验证位置在任一屏幕可见
    const displays = screen.getAllDisplays();
    if (!isRectVisibleOnAnyDisplay(newX, newY, MINI_SIZE, MINI_SIZE, displays)) {
      const pd = screen.getPrimaryDisplay();
      newX = pd.workArea.x + Math.round((pd.workArea.width - MINI_SIZE) / 2);
      newY = pd.workArea.y + Math.round((pd.workArea.height - MINI_SIZE) / 2);
      debugLog('[ENTER-MINI] Position not visible, fallback to center:', { newX, newY });
    }
    suppressBoundsSave = true;
    try {
      preMiniAlwaysOnTop = mainWindow.isAlwaysOnTop();
      mainWindow.setAlwaysOnTop(false);
      mainWindow.setMinimumSize(MINI_SIZE, MINI_SIZE);
      mainWindow.setResizable(false);
      mainWindow.setMovable(true);
      mainWindow.setBounds({ width: MINI_SIZE, height: MINI_SIZE });
      mainWindow.setPosition(newX, newY);
    } finally {
      suppressBoundsSave = false;
    }
    debugLog('[ENTER-MINI] Window set to:', { x: newX, y: newY, width: MINI_SIZE, height: MINI_SIZE });
    return true;
  }
});

ipcMain.handle('move-window-by', (_, dx, dy) => {
  if (!mainWindow) return;
  const [x, y] = mainWindow.getPosition();
  suppressBoundsSave = true;
  try {
    // Use fixed expected sizes instead of getBounds() to prevent
    // Windows border-rounding drift from accumulating on every drag frame.
    const expectedWidth = miniExpandedBounds ? 296 : 80;
    const expectedHeight = miniExpandedBounds ? 420 : 80;
    mainWindow.setBounds({
      x: x + dx,
      y: y + dy,
      width: expectedWidth,
      height: expectedHeight
    });
  } finally {
    suppressBoundsSave = false;
  }
  // If preview is expanded, keep miniExpandedBounds in sync so
  // the saved icon position reflects the user's dragged location.
  if (miniExpandedBounds) {
    miniExpandedBounds.x += dx;
    miniExpandedBounds.y += dy;
  }
});

let miniExpandedBounds = null;

ipcMain.handle('set-mini-expanded', (_, opts) => {
  // opts = { expanded: true/false, width?: number, height?: number }
  if (!mainWindow) return false;
  if (!preMiniBounds) return false;

  const expanded = (typeof opts === 'object') ? opts.expanded : opts;

  if (expanded) {
    if (miniExpandedBounds) return true;
    const currentBounds = mainWindow.getBounds();
    // Force exact 80x80 so collapse always restores the correct mini size
    miniExpandedBounds = { x: currentBounds.x, y: currentBounds.y, width: 80, height: 80 };
    debugLog('[EXPAND] Saved miniExpandedBounds:', miniExpandedBounds);
    const expandWidth = (typeof opts === 'object' && opts.width) ? opts.width : 280;
    const expandHeight = (typeof opts === 'object' && opts.height) ? opts.height : 400;
    // Center the expansion around current window position
    const newX = currentBounds.x - Math.round((expandWidth - currentBounds.width) / 2);
    const newY = currentBounds.y - Math.round((expandHeight - currentBounds.height) / 2);
    suppressBoundsSave = true;
    try {
      mainWindow.setBounds({
        x: newX,
        y: newY,
        width: expandWidth,
        height: expandHeight
      });
    } finally {
      suppressBoundsSave = false;
    }
    debugLog('[EXPAND] Window expanded to:', { x: newX, y: newY, width: expandWidth, height: expandHeight });
    return true;
  } else {
    if (!miniExpandedBounds) return false;
    suppressBoundsSave = true;
    try {
      mainWindow.setBounds(miniExpandedBounds);
    } finally {
      suppressBoundsSave = false;
    }
    debugLog('[COLLAPSE] Window collapsed to:', miniExpandedBounds);
    miniExpandedBounds = null;
    return false;
  }
});

ipcMain.handle('quit-app', () => {
  isQuitting = true;
  app.quit();
});

app.whenReady().then(() => {
  const settings = createWindow();
  // C01 要求：默认及开机时不固定到桌面，始终以可移动/可调大小状态启动
  // 忽略已保存的 isPinned 状态

  createTray();

  if (settings.autoStart) setAutoStart(true);
});

app.on('window-all-closed', () => {});

app.on('before-quit', () => {
  isQuitting = true;
  if (settingsWindow && !settingsWindow.isDestroyed()) {
    settingsWindow.close();
  }
});

app.on('activate', () => {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  }
});

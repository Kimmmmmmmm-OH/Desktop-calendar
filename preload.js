const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  getTodos: () => ipcRenderer.invoke('get-todos'),
  saveTodos: (todos) => ipcRenderer.invoke('save-todos', todos),
  setAutoStart: (enable) => ipcRenderer.invoke('set-auto-start', enable),
  minimizeToTray: () => ipcRenderer.invoke('minimize-to-tray'),
  toggleFullscreen: () => ipcRenderer.invoke('toggle-fullscreen'),
  toggleMaximize: () => ipcRenderer.invoke('toggle-maximize'),
  togglePin: () => ipcRenderer.invoke('toggle-pin'),
  getPinState: () => ipcRenderer.invoke('get-pin-state'),
  panelStateChanged: (state) => ipcRenderer.invoke('panel-state-changed', state),
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  toggleMiniMode: () => ipcRenderer.invoke('toggle-mini-mode'),
  setMiniExpanded: (opts) => ipcRenderer.invoke('set-mini-expanded', opts),
  moveWindowBy: (dx, dy) => ipcRenderer.invoke('move-window-by', dx, dy),
  quitApp: () => ipcRenderer.invoke('quit-app'),
  onWindowState: (callback) => ipcRenderer.on('window-state', (_, state) => callback(state)),
  showTooltip: (data) => ipcRenderer.invoke('show-tooltip', data),
  hideTooltip: () => ipcRenderer.invoke('hide-tooltip'),
  startTooltipTimer: () => ipcRenderer.send('start-tooltip-timer'),
  cancelTooltipTimer: () => ipcRenderer.send('cancel-tooltip-timer'),
  onOpenDetailFromTooltip: (callback) => ipcRenderer.on('open-detail-from-tooltip', (_, key) => callback(key))
});

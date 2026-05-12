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
  toggleMiniMode: () => ipcRenderer.invoke('toggle-mini-mode'),
  quitApp: () => ipcRenderer.invoke('quit-app')
});

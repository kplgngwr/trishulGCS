const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // File operations
  openFile: () => ipcRenderer.invoke('file:open'),
  saveFile: (content) => ipcRenderer.invoke('file:save', content),
  
  // Serial port operations
  listPorts: () => ipcRenderer.invoke('serial:list'),
  connectPort: (path, options) => ipcRenderer.invoke('serial:connect', path, options),
  writeToPort: (data) => ipcRenderer.invoke('serial:write', data),
  readFromPort: () => ipcRenderer.invoke('serial:read'),
  disconnectPort: () => ipcRenderer.invoke('serial:disconnect'),
  
  // Subscribe to port data events
  onPortData: (callback) => ipcRenderer.on('serial:data', (_, data) => callback(data)),
  removePortDataListener: () => ipcRenderer.removeAllListeners('serial:data')
});
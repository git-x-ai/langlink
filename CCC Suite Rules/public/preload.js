const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getRulesDirectory: () => ipcRenderer.invoke("get-rules-directory"),
  downloadSelectedRules: (selectedRules) =>
    ipcRenderer.invoke("download-selected-rules", selectedRules),
  openFileDialog: () => ipcRenderer.invoke("open-file-dialog"),
  // Window controls
  minimizeWindow: () => ipcRenderer.invoke("window-minimize"),
  maximizeWindow: () => ipcRenderer.invoke("window-maximize"),
  closeWindow: () => ipcRenderer.invoke("window-close"),
  isWindowMaximized: () => ipcRenderer.invoke("window-is-maximized"),
});

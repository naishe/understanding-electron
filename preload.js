const { contextBridge, ipcRenderer } = require('electron')
// const fs = require('fs');

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => {
    // console.log('>> accessing system: ' + fs.readdirSync('.'));
    console.log("in preload --> got ping")
    return ipcRenderer.invoke('ping')
  },
  // we can also expose variables, not just functions
});


contextBridge.exposeInMainWorld('main', {
  selectFolder: async () => {
    console.log("seelcte2");
    return ipcRenderer.invoke("selectFolder")
  }
});
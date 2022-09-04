const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const readFiles = (folderPath) => {
  // TODO: we can filter file types here
  return fs.readdirSync(folderPath)
}


const selectFolderHandler = async () => {
  console.log("seelcte");
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  console.log(`filepaths: ${filePaths}`)
  if (canceled) {
    return;
  } else {
    console.log(JSON.stringify(filePaths[0]));
    const files = readFiles(filePaths[0]);
    return { dir: filePaths[0], files };
  }
};


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.handle('ping', () => {
    console.log("---> printing pong");
    return 'pong';
  })
  ipcMain.handle("selectFolder", selectFolderHandler);
  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
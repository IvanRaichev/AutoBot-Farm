const localShortcut = require('electron-localshortcut');

let mainWindow;

function registerKeyboardShortcuts(mainWin, ipcMain, mouseEvent, robot) {
  mainWindow = mainWin;

  localShortcut.register(mainWindow, 'F6', () => {
    ipcMain.emit('button-clicked', 'startBot');
  });

  localShortcut.register(mainWindow, 'F5', () => {
    ipcMain.emit('button-clicked-auto', 'startAutoDuel');
  });

  localShortcut.register(mainWindow, 'F1', () => {
    ipcMain.emit('button-clicked-pvp', 'startAutoPvP');
  });

  mainWindow.on('closed', () => {
    localShortcut.unregisterAll(mainWindow);
  });
}

module.exports = {
  registerKeyboardShortcuts,
};

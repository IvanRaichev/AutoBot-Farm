const localShortcut = require('electron-localshortcut');

let mainWindow;
let isScriptRunning = false;

function registerKeyboardShortcuts(mainWin, ipcMain, mouseEvent, robot) {
  mainWindow = mainWin;

  localShortcut.register(mainWindow, 'F6', () => {
    if (isScriptRunning) {
      stopScript();
    } else {
      startScript();
    }
  });

  localShortcut.register(mainWindow, 'F5', () => {
    ipcMain.emit('button-clicked-auto', 'startAutoDuel');
  });

  localShortcut.register(mainWindow, 'F1', () => {
    ipcMain.emit('button-clicked-pvp', 'startAutoPvP');
  });

}

function startScript() {
  isScriptRunning = true;
  ipcMain.emit('button-clicked', 'startBot');
}

function stopScript() {
  isScriptRunning = false;
  // Ваш код для остановки скрипта
}

module.exports = {
  registerKeyboardShortcuts,
};
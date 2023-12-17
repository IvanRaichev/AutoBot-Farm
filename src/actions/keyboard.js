const { globalShortcut } = require("electron");
const localShortcut = require("electron-localshortcut");
const mouseEvent = require('./mouse.js');
let mainWindow;
let functionCallback;
let isScriptRunning = false; 

function registerKeyboardShortcuts(mainWin, ipcMain, robot) {
  mainWindow = mainWin;

  globalShortcut.register("F6", () => {
    console.log("Enter F6");
    if (!isScriptRunning) {
      ipcMain.emit("button-clicked", "startBot");
      isScriptRunning = true;
    } else {
      mouseEvent.stopBot();
    }
  });

  globalShortcut.register("F5", () => {
    console.log("Enter F5");
    if (!isScriptRunning) {
      ipcMain.emit("button-clicked-auto", "startAutoDuel");
      isScriptRunning = true;
    } else {
      ipcMain.emit("button-clicked-auto", "stopAutoDuel");
      isScriptRunning = false;
    }
  });

  globalShortcut.register("F1", () => {
    console.log("Enter F1");
    if (!isScriptRunning) {
      ipcMain.emit("button-clicked-pvp", "startAutoPvP");
      isScriptRunning = true;
    } else {
      ipcMain.emit("button-clicked-pvp", "stopAutoPvP");
      isScriptRunning = false;
    }
  });
}

module.exports = {
  registerKeyboardShortcuts,
};

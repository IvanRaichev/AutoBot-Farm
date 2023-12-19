// keyboard.js

const { globalShortcut } = require('electron');

function registerHotkeyAndFunction(ipcMain, hotkey, callback) {
  const registrationSuccess = globalShortcut.register(hotkey, () => {
    if (ipcMain) {
      callback(ipcMain);
    } else {
      console.error('ipcMain is not defined');
    }
  });

  if (!registrationSuccess) {
    console.error(`Failed to register hotkey: ${hotkey}`);
  } else {
    console.log(`Hotkey registered successfully: ${hotkey}`);
  }
}

function unregisterAllHotkeys() {
  globalShortcut.unregisterAll();
}

module.exports = {
  registerHotkeyAndFunction,
  unregisterAllHotkeys,
};

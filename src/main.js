const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const robot = require("robotjs");
const cv = require('@u4/opencv4nodejs');

function createWindow() {
   const win = new BrowserWindow({
      width: 700,
      height: 500,
      webPreferences: {
         nodeIntegration: true,
         sandbox: false, // Отключение V8 Sandbox
         preload: path.join(__dirname, 'preload.js'),
      }
   });

   win.setMenu(null);
   win.loadFile('html/index.html');

   ipcMain.on('button-clicked', () => {
     
   });
};

function startRender() {

   app.whenReady().then(createWindow);
   app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
         app.quit();
      }
   });

   app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
         createWindow();
      }
   });
}






startRender();

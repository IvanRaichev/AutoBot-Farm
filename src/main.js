const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const mouseEvent = require('./actions/mouse.js');
const keyEvent = require('./actions/keyboard.js');
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
     mouseEvent.findAndClickImage();
     mouseEvent.findImageOnScreen();
     keyEvent.detectAndPressKey();
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

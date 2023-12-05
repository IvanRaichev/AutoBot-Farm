const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const mouseEvent = require('./actions/mouse.js');
const robot = require("robotjs");
function createWindow() {
   const win = new BrowserWindow({
      width: 700,
      height: 500,
      webPreferences: {
         nodeIntegration: true,
         preload: path.join(__dirname, 'preload.js'),
      }
   });

   win.setMenu(null);
   win.loadFile('html/index.html');

   ipcMain.on('button-clicked', () => {
      mouseEvent.startBot(robot);
   });
   ipcMain.on('button-clicked-auto', () => {
      mouseEvent.startAutoDuel(robot);
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

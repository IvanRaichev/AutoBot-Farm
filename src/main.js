const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const robot = require("robotjs");
const keyboard = require('./actions/keyboard.js');
const { fork } = require('child_process');

let backgroundProcess;

function createWindow() {
   const win = new BrowserWindow({
      width: 700,
      height: 500,
      webPreferences: {
         nodeIntegration: true,
         preload: path.join(__dirname, 'preload.js'),
      }
   });

   win.setMenuBarVisibility(false);

   win.loadFile(path.join(__dirname, 'index.html'));

   keyboard.registerKeyboardShortcuts(win, ipcMain, robot);

   ipcMain.on('button-clicked', () => {
      backgroundProcess.send({ command: 'startBot' });
   });

   ipcMain.on('button-clicked-auto', () => {
      backgroundProcess.send({ command: 'startAutoDuel' });
   });

   ipcMain.on('button-clicked-pvp', () => {
      backgroundProcess.send({ command: 'startAutoPvP' });
   });
}

function createBackgroundProcess() {
   backgroundProcess = fork(path.join(__dirname, 'background-process.js'));

   backgroundProcess.on('message', (message) => {
      // Обработка сообщений от дочернего процесса
      console.log('Message from background process:', message);

      if (message.status === 'completed') {
         // Обработка завершения фоновой операции
      }
   });

   backgroundProcess.on('close', (code) => {
      console.log(`Background process exited with code ${code}`);
   });
}

function startRender() {
   app.whenReady().then(() => {
      createWindow();
      createBackgroundProcess();

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
   });
}

startRender();

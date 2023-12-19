const path = require("path");
const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const robot = require("robotjs");
const keyboard = require("./actions/keyboard.js");
const { fork } = require("child_process");

let backgroundProcess;
let isFlagActive = true;

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setMenuBarVisibility(false);

  win.loadFile(path.join(__dirname, "index.html"));

  win.webContents.openDevTools();

//   function registerGlobalShortcut() {
//    // Регистрация горячей клавиши (например, Ctrl+Alt+S)
//    const shortcutRegistered = globalShortcut.register('F2', () => {
//       if (win){
//          win.webContents.send('stop-function', isFlagActive);
//       }
//    });
 
//    if (!shortcutRegistered) {
//      console.error('Failed to register global shortcut.');
//    }
//  }
 
  keyboard.registerHotkeyAndFunction(ipcMain, "F6", (ipcMain) =>
    backgroundProcess.send({ command: "startBot" })
  );
  keyboard.registerHotkeyAndFunction(ipcMain, "F5", (ipcMain) =>
    backgroundProcess.send({ command: "startAutoDuel" })
  );
  keyboard.registerHotkeyAndFunction(ipcMain, "F1", (ipcMain) =>
    backgroundProcess.send({ command: "startAutoPvP" })
  );
  keyboard.registerHotkeyAndFunction(ipcMain, "F2", (ipcMain) =>
    ipcMain.emit("stop-function")
  );

  //   keyboard.registerHotkeyAndFunction("F6", () =>
  //     ipcMain.emit("button-clicked", "startBot")
  //   );
  //   keyboard.registerHotkeyAndFunction("F5", () =>
  //     ipcMain.emit("button-clicked-auto", "startAutoDuel")
  //   );
  //   keyboard.registerHotkeyAndFunction("F1", () =>
  //     ipcMain.emit("button-clicked-pvp", "startAutoPvP")
  //   );
  //   keyboard.registerHotkeyAndFunction("F2", () =>
  //     ipcMain.emit("stop-function")
  //   );

  win.webContents.on("dom-ready", async () => {
    try {
      ipcMain.on("button-clicked", () => {
        backgroundProcess.send({ command: "startBot" });
      });

      ipcMain.on("button-clicked-auto", () => {
        backgroundProcess.send({ command: "startAutoDuel" });
      });

      ipcMain.on("button-clicked-pvp", () => {
        backgroundProcess.send({ command: "startAutoPvP" });
      });

      ipcMain.on("stop-function", (event, data) => {
        // Инвертируем значение
        const invertedValue = !data;
        event.reply("reply", invertedValue);
      });
    } catch (error) {
      console.error("Error getting element value:", error);
    }
  });
}

function createBackgroundProcess() {
  backgroundProcess = fork(path.join(__dirname, "background-process.js"));

  backgroundProcess.on("message", (message) => {
    console.log("Message from background process:", message);

    if (message.status === "completed") {
    }
  });

  backgroundProcess.on("close", (code) => {
    console.log(`Background process exited with code ${code}`);
  });
}

function startRender() {
  app.whenReady().then(() => {
    createWindow();
    createBackgroundProcess();

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });
}

startRender();

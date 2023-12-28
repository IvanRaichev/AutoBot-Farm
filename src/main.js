const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const keyboard = require("./actions/keyboard.js");
const { fork } = require("child_process");
const { spawnProcess } = createBackgroundProcessPool();
const fs = require('fs');

const filePath = path.join(__dirname, '../resources/data/check.txt');

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, 'true');
} else {
  const currentValue = fs.readFileSync(filePath, 'utf8').trim();
  if (currentValue !== 'true') {
    fs.writeFileSync(filePath, 'true');
    console.log('check.txt has been updated with value: true');
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 520,
    resizable: false,
    icon: path.join(__dirname, '../src/static/media/icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setMenuBarVisibility(false);

  win.loadFile(path.join(__dirname, "index.html"));

  win.webContents.openDevTools();

  keyboard.registerHotkeyAndFunction(ipcMain, "F1", () =>
    win.webContents.send("request-info-for-F1")
  );

  keyboard.registerHotkeyAndFunction(ipcMain, "F2", () => {
    win.webContents.send("request-info-for-F2");
  });


  keyboard.registerHotkeyAndFunction(ipcMain, "F3", () => {
    win.webContents.send("request-info-for-F3");
  });

  keyboard.registerHotkeyAndFunction(ipcMain, "F4", () => {
    win.webContents.send("request-info-for-F4");
  });



  ipcMain.on("response-info-for-F1", (event, info) => {
    spawnProcess("startBot", info);
    if (win) {
      win.minimize();
  }
  });

  ipcMain.on("response-info-for-F2", (event, info) => {
    spawnProcess("startAutoDuel", info);
    if (win) {
      win.minimize();
  }
  });


  ipcMain.on("response-info-for-F3", (event, info) => {
    spawnProcess("startAutoPvP", info);
    if (win) {
      win.minimize();
  }
  });

  win.webContents.on("dom-ready", async () => {
    try {
      let sharedFlagValue = "true";
      ipcMain.on("button-clicked", (event, data) => {
        spawnProcess("startBot", data);
        if (win) {
          win.minimize();
      }
      });

      ipcMain.on("button-clicked-auto", (event, data) => {
        spawnProcess("startAutoDuel", data);
        if (win) {
          win.minimize();
      }
      });

      ipcMain.on("button-clicked-pvp", (event, data) => {
        spawnProcess("startAutoPvP", data);
        if (win) {
          win.minimize();
      }
      });

      ipcMain.on('toggle-stop-flag', (event, currentValue) => {
        const newValue = currentValue === 'true' ? 'false' : 'true';
        win.webContents.send('update-stop-flag', newValue);
      });

      ipcMain.on('update-stop-flag-value', (event, flagValue) => {
        sharedFlagValue = flagValue;
        fs.writeFileSync(filePath, sharedFlagValue);
      });

      ipcMain.on("request-stop-flag-value", (event) => {
        event.sender.send("response-stop-flag-value", sharedFlagValue);
      });

    } catch (error) {
      console.error("Error getting element value:", error);
    }
  });
}



const commandQueue = [];
let isProcessRunning = false;
let isFunctionRunning = false;


function createBackgroundProcessPool() {
  function spawnProcess(command, invertedValue = undefined) {
    if (isFunctionRunning && command !== "toggleFlag") {
      console.log(`Function ${command} is already running. Skipping...`);
      return;
    }

    isFunctionRunning = true;
    commandQueue.push({ command, invertedValue });

    if (isProcessRunning) return;
    executeNextCommand();
  }

  function executeNextCommand() {
    if (commandQueue.length === 0) {
      isProcessRunning = false;
      return;
    }

    const { command, invertedValue } = commandQueue.shift();
    isProcessRunning = true;

    const process = fork(path.join(__dirname, "background-process.js"), [], {
      env: { ELECTRON_RUN_AS_NODE: true },
    });

    process.on("message", (message) => {
      console.log("Message from background process:", message);
      if (message.status === "completed" || message.status === "flagToggled") {
        isFunctionRunning = false;
        executeNextCommand();
      }
      if (message.status === "flagToggled") {
      }
    });

    process.send({ command, invertedValue });
  }

  return {
    spawnProcess,
  };
}

function startRender() {
  app.whenReady().then(() => {
    createWindow();

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

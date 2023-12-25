const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const robot = require("robotjs");
const keyboard = require("./actions/keyboard.js");
const { fork } = require("child_process");
const { spawnProcess, spawnProcessFlag } = createBackgroundProcessPool();
const fs = require('fs');

let isFlagActive = true;

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
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setMenuBarVisibility(false);

  win.loadFile(path.join(__dirname, "index.html"));
  // win.loadURL('http://localhost:3000');
  win.webContents.openDevTools();

  keyboard.registerHotkeyAndFunction(ipcMain, "F6", () =>
    spawnProcess("startBot")
  );
  keyboard.registerHotkeyAndFunction(ipcMain, "F5", () =>
    spawnProcess("startAutoDuel")
  );
  keyboard.registerHotkeyAndFunction(ipcMain, "F1", () =>
    spawnProcess("startAutoPvP")
  );

  win.webContents.on("dom-ready", async () => {
    try {

      let sharedFlagValue = "true";
      ipcMain.on("button-clicked", () => {
        spawnProcess("startBot");
      });

      ipcMain.on("button-clicked-auto", () => {
        spawnProcess("startAutoDuel");
      });

      ipcMain.on("button-clicked-pvp", () => {
        spawnProcess("startAutoPvP");
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
  function spawnProcess(command) {
    if (isFunctionRunning && command !== "toggleFlag") {
      console.log(`Function ${command} is already running. Skipping...`);
      return;
    }

    isFunctionRunning = true;
    commandQueue.push({ command, invertedValue: undefined });

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

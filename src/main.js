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
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.setMenuBarVisibility(false);

  win.loadFile(path.join(__dirname, "index.html"));

  win.webContents.openDevTools();

  keyboard.registerHotkeyAndFunction(ipcMain, "F6", () =>
    win.webContents.send("request-info-for-F6")
  );
  
  ipcMain.on("response-info-for-F6", (event, info) => {
    spawnProcess("startBot", info);
  });

  keyboard.registerHotkeyAndFunction(ipcMain, "F5", () => {
    win.webContents.send("request-info-for-F5");
  });

  ipcMain.on("response-info-for-F5", (event, info) => {
    spawnProcess("startAutoDuel", info);
  });

  keyboard.registerHotkeyAndFunction(ipcMain, "F1", () => {
    win.webContents.send("request-info-for-F1");
  });

  ipcMain.on("response-info-for-F1", (event, info) => {
    spawnProcess("startAutoPvP", info);
  });


  win.webContents.on("dom-ready", async () => {
    try {
      let sharedFlagValue = "true";
      ipcMain.on("button-clicked", (event, data) => {
        spawnProcess("startBot", data);
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

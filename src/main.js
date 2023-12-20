const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const robot = require("robotjs");
const keyboard = require("./actions/keyboard.js");
const { fork } = require("child_process");
const { spawnProcess, spawnProcessFlag } = createBackgroundProcessPool();

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

  keyboard.registerHotkeyAndFunction(ipcMain, "F6", () =>
    spawnProcess("startBot")
  );
  keyboard.registerHotkeyAndFunction(ipcMain, "F5", () =>
    spawnProcess("startAutoDuel")
  );
  keyboard.registerHotkeyAndFunction(ipcMain, "F1", () =>
    spawnProcess("startAutoPvP")
  );
  keyboard.registerHotkeyAndFunction(ipcMain, "F2", () => {
    spawnProcessFlag("toggleFlag", );
  });

  win.webContents.on("dom-ready", async () => {
    try {
      ipcMain.on("button-clicked", () => {
        spawnProcess("startBot");
      });

      ipcMain.on("button-clicked-auto", () => {
        spawnProcess("startAutoDuel");
      });

      ipcMain.on("button-clicked-pvp", () => {
        spawnProcess("startAutoPvP");
      });

      ipcMain.on("stop-function", (event, data) => {
        const invertedValue = !data;
        console.log(invertedValue);
        event.sender.send("reply", invertedValue);
      });

      // ipcMain.on("toggle-flag", () => {
      //   spawnProcess("startAutoPvP");
      // });
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

  function spawnProcessFlag(command, invertedValue = undefined) {
    commandQueue.push({ command, invertedValue });
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
    spawnProcessFlag,
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

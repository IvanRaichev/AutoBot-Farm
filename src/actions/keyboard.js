const { globalShortcut, ipcMain } = require("electron");
const mouseEvent = require("./mouse.js");
const backgroundProcess = require("../background-process.js");

let functionCallback;
let botController = { stopBotSignal: false, isBotRunning: true };
let stopBotFlag = false;

function registerHotkeyAndFunction(hotkey, func) {
  globalShortcut.register(hotkey, () => {
    if (functionCallback && functionCallback.hotkey === hotkey) {
      console.log(`Stop ${hotkey}`);
      stopFunction();
    } else {
      console.log(`Enter ${hotkey}`);
      startFunction(hotkey,func);
    }
  });
}

function startFunction(hotkey, func) {
  if (functionCallback) {
    stopFunction();
    
    // Если предыдущая функция была остановлена, то запускаем новую
    if (functionCallback === null) {
      functionCallback = { hotkey, func };
      stopBotFlag = false; // Сбрасываем флаг перед запуском новой функции
      func();
    }
  }else{
    functionCallback = { hotkey, func };
    func();
  }
}

function stopFunction() {
  if (functionCallback) {
    stopBotFlag = true;
    console.log('Function stop: ' + !stopBotFlag);
    functionCallback = null;
  }
}

function toggleStopBotSignal() {
  let res = { stopBotSignal: false, isBotRunning: true };
  res.stopBotSignal = !botController.stopBotSignal;
  res.isBotRunning = !botController.isBotRunning;
  console.log(`Toggle stopBotSignal to ${res.isBotRunning}`);
}

function getBotController() {
  return botController; // Просто возвращаем объект botController
}

module.exports = {
  registerHotkeyAndFunction,
  stopFunction,
  getBotController,
  getStopBotFlag: () => stopBotFlag
};

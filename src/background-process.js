const robot = require("robotjs");
const mouseEvent = require("./actions/mouse.js");
const keyboard = require("./actions/keyboard.js");

let isFunctionRunning = false;

process.on("message", async (message) => {
  if (!isFunctionRunning) {
    isFunctionRunning = true;

    if (message.command === "startBot") {
        await mouseEvent.startBot(robot);
    } else if (message.command === "startAutoDuel") {
      await mouseEvent.startAutoDuel(robot);
    } else if (message.command === "startAutoPvP") {
      await mouseEvent.startAutoPvP(robot);
    } else if (message.command === "stopBot") {
      mouseEvent.stopBot(message.elementValue);
    }

    isFunctionRunning = false;
    process.send({ status: "completed" });
  } else {
    console.log("Function is already running. Ignoring the command.");
  }
});

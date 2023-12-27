const robot = require("robotjs");
const mouseEvent = require("./actions/mouse.js");
const path = require("path");
const fs = require('fs');

const filePath = path.join(__dirname, '../resources/data/check.txt');

process.on("message", async (message) => {

  const { command, invertedValue } = message;
  let updatedValue = "true";

  if (command === "startBot") {

    let startTime = Date.now();
    let target = 1;
    if (invertedValue['check-time']) {
      let input = invertedValue['check-time'];
      const maxDuration = parseInt(input) * 60 * 1000;
      while (Date.now() - startTime < maxDuration && updatedValue === "true") {
        
        await mouseEvent.startBot(robot, invertedValue); 
        const data = fs.readFileSync(filePath, 'utf8');
        updatedValue = data.trim();
      }
    } else {
      while (updatedValue === "true") {
        await mouseEvent.startBot(robot, invertedValue);
        const data = fs.readFileSync(filePath, 'utf8');
        updatedValue = data.trim();
      }
    }

    process.send({ status: "completed" });
    process.exit();
  } else if (command === "startAutoDuel") {
    let target = 1
    while (updatedValue === "true") {

      await mouseEvent.startAutoDuel(robot, target, invertedValue);

      ++target;

      console.log(target);

      if (target > 4) {
        target = 1;
      }

      const data = fs.readFileSync(filePath, 'utf8');
      updatedValue = data.trim();
    }
    process.send({ status: "completed" });
    process.exit();
  } else if (command === "startAutoPvP") {
    while (updatedValue === "true") {
      await mouseEvent.startAutoPvP(robot, invertedValue);
      const data = fs.readFileSync(filePath, 'utf8');
      updatedValue = data.trim();
    }
    process.send({ status: "completed" });
    process.exit();
  }
});

process.on("exit", () => {
  console.log("Background process has exited.");
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception in background process:", error);
  process.exit(1);
});
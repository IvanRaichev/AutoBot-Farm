const robot = require("robotjs");
const mouseEvent = require("./actions/mouse.js");
const path = require("path");
const fs = require('fs');

const filePath = path.join(__dirname, '../resources/data/check.txt');

process.on("message", async (message) => {

  const { command, invertedValue } = message;

   if (command === "startBot") {
    let updatedValue = "true";
    while(updatedValue === "true"){
      await mouseEvent.startBot(robot);
      const data = fs.readFileSync(filePath, 'utf8');
      updatedValue = data.trim();
      console.log(updatedValue);
      console.log(typeof updatedValue);
    }
    process.send({ status: "completed" });
    process.exit();
  } else if (command === "startAutoDuel") {
    await mouseEvent.startAutoDuel(robot);
    process.send({ status: "completed" });
    process.exit();
  } else if (command === "startAutoPvP") {
    await mouseEvent.startAutoPvP(robot);
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
const robot = require("robotjs");
const mouseEvent = require("./actions/mouse.js");

process.on("message", async (message) => {

  const { command, invertedValue } = message;

  if (message.command === "toggleFlag") {
    console.log(invertedValue);
    process.send({ status: "flagToggled"});
    process.exit();
  } else if (message.command === "startBot") {
    await mouseEvent.startBot(robot);
    process.send({ status: "completed" });
    process.exit();
  } else if (message.command === "startAutoDuel") {
    await mouseEvent.startAutoDuel(robot);
    process.send({ status: "completed" });
    process.exit();
  } else if (message.command === "startAutoPvP") {
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
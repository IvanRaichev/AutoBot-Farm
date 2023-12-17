const robot = require("robotjs");
const mouseEvent = require('./actions/mouse.js');

process.on('message', (message) => {
   // Обработка сообщений от основного процесса
   if (message.command === 'startBot') {
      mouseEvent.startBot(robot);
      process.send({ status: 'completed' });
   } else if (message.command === 'startAutoDuel') {
      mouseEvent.startAutoDuel(robot);
      process.send({ status: 'completed' });
   } else if (message.command === 'startAutoPvP') {
      mouseEvent.startAutoPvP(robot);
      process.send({ status: 'completed' });
   }
});

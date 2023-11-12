
function startBot(robot) {

   while (true) {

      msleep(1000);

      let gate = findGate(robot);

      if (gate == false) {
         console.log('Not found Gate');
      }


      robot.moveMouse(gate.x, gate.y);
      robot.mouseClick();

   }
}

function msleep(n) {
   Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function findGate(robot) {
   let captureGate = {
      x: 1080,
      y: 432,
      width: 1110 - 1080,
      height: 450 - 432
   };

   let img = robot.screen.capture(captureGate.x, captureGate.y, captureGate.width, captureGate.height);
   let gateColor = ['54f7f7', '688552', '7f9c5c', '739855'];

   for (let i = 0; i < img.width; i++) {
      for (let j = 0; j < img.height; j++) {
         let sampleColor = img.colorAt(i, j);

         if (gateColor.includes(sampleColor)) {
            let screenX = i + captureArea.x;
            let screenY = j + captureArea.y;

            console.log("Found a gate at: " + screenX + ", " + screenY);
            return { x: screenX, y: screenY };
         }
      }
   }

   return false;
}

function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
   startBot,
}
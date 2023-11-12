
function startBot(robot) {

   while (true) {

      msleep(2000);

      let gate = findElement(robot,
         {
            x: 1080,
            y: 432,
            width: 1110 - 1080,
            height: 450 - 432
         },
         ['54f7f7', '688552', '7f9c5c', '739855']);

      if (gate != false) {
         mouseUse(robot, gate.x, gate.y);
      }

      msleep(5000);

      let duel = findElement(robot,
         {
            x: 925,
            y: 900,
            width: 1000 - 920,
            height: 950 - 900
         },
         ['cbca32', 'eee132', 'dedc36', 'f6f039']);

      if (duel != false) {
         mouseUse(robot, duel.x, duel.y);
      }
   }
}

function msleep(n) {
   Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function mouseUse(robot, x, y) {

   robot.moveMouse(x, y);
   robot.mouseClick();
}

function findElement(robot, capture, colors) {
   let img = robot.screen.capture(capture.x, capture.y, capture.width, capture.height);

   for (let i = 0; i < img.width; i++) {
      for (let j = 0; j < img.height; j++) {
         let sampleColor = img.colorAt(i, j);

         if (colors.includes(sampleColor)) {
            let screenX = i + capture.x;
            let screenY = j + capture.y;

            return { x: screenX, y: screenY };
         }
      }
   }

   return false;
}

module.exports = {
   startBot,
}
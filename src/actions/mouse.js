async function startBot(robot) {
   // while (true) {
   //    let gate = await findElementWithRetry(robot,
   //       {
   //          x: 1080,
   //          y: 432,
   //          width: 1110 - 1080,
   //          height: 450 - 432
   //       },
   //       ['54f7f7', '688552', '7f9c5c', '739855']);


   //    if (gate !== false) {
   //       console.log('Succes')
   //       mouseUse(robot, gate.x, gate.y);
   //    }

   //    let duel = await findElementWithRetry(robot,
   //       {
   //          x: 925,
   //          y: 900,
   //          width: 1000 - 920,
   //          height: 950 - 900
   //       },
   //       ['cbca32', 'eee132', 'dedc36', 'f6f039']);

   //    msleep(4000);

   //    if (duel !== false) {
   //       console.log('Succes')
   //       mouseUse(robot, duel.x, duel.y);
   //    }

   //    msleep(2000);
   //    mouseUse(robot, 560, 0);
   //    mouseUse(robot, 560, 0);


   //    msleep(1000);
   //    if (duel !== false) {
   //       console.log('Succes')
   //       mouseUse(robot, duel.x, duel.y);
   //    }


   // }

   msleep(1000);

   startDuel(robot);
}

function msleep(n) {
   Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function mouseUse(robot, x, y) {

   robot.moveMouse(x, y);
   robot.mouseClick();
}



async function findElementWithRetry(robot, capture, colors) {
   let element;
   do {
      msleep(1000);
      element = findElement(robot, capture, colors);

   } while (element === false);

   return element;
}

function findElement(robot, capture, colors) {
   const img = robot.screen.capture(capture.x, capture.y, capture.width, capture.height);

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

async function startDuel(robot) {

   const capture = {
      x: 1090,
      y: 50,
      width: 1130 - 1090,
      height: 76 - 50
   }

   let player = ['0033bb'];
   let opponents = ['aa0000'];

   while (true) {
      let img = robot.screen.capture(capture.x, capture.y, capture.width, capture.height);

      for (let i = 0; i < img.width; i++) {
         for (let j = 0; j < img.height; j++) {
            let sampleColor = img.colorAt(i, j);

            if (player.includes(sampleColor)) {
               await drawCards(robot);
               let turn = playerTurn(robot);
               mouseUse(robot, turn.x, turn.y);
               return false;
            } else if (opponents.includes(sampleColor)) {
               console.log('Opponents Turn');
            }
         }
      }
   }
}

function playerTurn(robot) {
   const capture = {
      x: 715,
      y: 940,
      width: 800 - 715,
      height: 960 - 935
   }

   let img = robot.screen.capture(capture.x, capture.y, capture.width, capture.height);

   // let cordX = 721;
   // let cordY = 953;

   let cardChouse = ['42455a'];

   for (let i = 0; i < img.width; i++) {
      for (let j = 0; j < img.height; j++) {
         let sampleColor = img.colorAt(i, j);

         if (cardChouse.includes(sampleColor)) {
            let screenX = i + capture.x;
            let screenY = j + capture.y;

            return { x: screenX, y: screenY };
         }
      }
   }
   return false;
}

async function drawCardAsync(robot) {
   mouseUse(robot, 560, 0);
}

async function drawCards(robot) {
   for (let i = 0; i < 4; i++) {
      await msleep(500);
      await drawCardAsync(robot);
   }
}

module.exports = {
   startBot,
}
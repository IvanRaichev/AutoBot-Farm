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

  //    return false;
  // }

  startDuel(robot);
  // chechAttack(robot);
  // attackMonster(robot);
  // checkTurn(robot);
  // clickPhase(robot);
  // startDuel(robot);
}

function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function mouseUse(robot, x, y) {
  robot.moveMouse(x, y);
  robot.mouseClick();
}

async function drawCardAsync(robot) {
  mouseUse(robot, 560, 0);
}

async function drawCards(robot) {
  for (let i = 0; i < 6; i++) {
    await msleep(800);
    await drawCardAsync(robot);
  }
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
  const img = robot.screen.capture(
    capture.x,
    capture.y,
    capture.width,
    capture.height
  );

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
   msleep(1000);
  const capture = {
    x: 1090,
    y: 50,
    width: 1130 - 1090,
    height: 76 - 50,
  };

  let player = ["0033bb"];
  let opponents = ["aa0000"];

  while (true) {
    let img = robot.screen.capture(
      capture.x,
      capture.y,
      capture.width,
      capture.height
    );

    for (let i = 0; i < img.width; i++) {
      for (let j = 0; j < img.height; j++) {
        let sampleColor = img.colorAt(i, j);

        if (player.includes(sampleColor)) {
          console.log("StartDuel");
          await drawCards(robot);
          let turn = playerTurn(robot);
          summonMonster(robot, turn);
          return false;
        } else if (opponents.includes(sampleColor)) {
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
    height: 960 - 935,
  };

  let img = robot.screen.capture(
    capture.x,
    capture.y,
    capture.width,
    capture.height
  );

  // let cordX = 721;
  // let cordY = 953;

  let cardChouse = ["42455a"];

  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let sampleColor = img.colorAt(i, j);

      if (cardChouse.includes(sampleColor)) {
        let screenX = i + capture.x;
        let screenY = j + capture.y;
        console.log("PlayerTurn");
        return { x: screenX, y: screenY };
      }
    }
  }
  return false;
}

function summonMonster(robot, cord) {
  mouseUse(robot, cord.x, cord.y);
  msleep(1000);
  const capture = {
    x: 855,
    y: 800,
    width: 915 - 855,
    height: 810 - 800,
  };

  let monster = ["e28844"];

  let img = robot.screen.capture(
    capture.x,
    capture.y,
    capture.width,
    capture.height
  );

  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let sampleColor = img.colorAt(i, j);

      if (monster.includes(sampleColor)) {
        let screenX = i + capture.x;
        let screenY = j + capture.y;
        console.log("SummonMonster");
        mouseUse(robot, screenX, screenY);
        msleep(2500);
        clickPhase(robot);
        msleep(1500);
        let endPlayer = checkTurn(robot);
        
        if (endPlayer) {
         console.log('End Turn')
          msleep(2000);
          startDuel(robot);
        } else {
         console.log('Battle........................')
          msleep(1500);
          battle();
        }
      }
    }
  }
  return false;
}

function clickPhase(robot) {
  // let cordX = 1295;
  // let cordY = 711;

  // let pixelColor = robot.getPixelColor(cordX, cordY);
  // console.log(pixelColor);

  const capture = {
    x: 1274,
    y: 705,
    width: 1305 - 1274,
    height: 720 - 705,
  };

  let img = robot.screen.capture(
    capture.x,
    capture.y,
    capture.width,
    capture.height
  );

  let colorPhase = ["88eeff"];

  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let sampleColor = img.colorAt(i, j);

      if (colorPhase.includes(sampleColor)) {
        let screenX = i + capture.x;
        let screenY = j + capture.y;

        mouseUse(robot, screenX, screenY);
        console.log("ClickPhase");
        return false;
      }
    }
  }
  return false;
}

function checkTurn(robot) {
  // let cordX = 1293;
  // let cordY = 705;

  // let pixelColor = robot.getPixelColor(cordX, cordY);
  // console.log(pixelColor);

  const capture = {
    x: 1285,
    y: 700,
    width: 1300 - 1285,
    height: 710 - 700,
  };

  let img = robot.screen.capture(
    capture.x,
    capture.y,
    capture.width,
    capture.height
  );

  let endPhase = ["330022"];
  let battlePhase = ["003333"];
  let firstIfMatched = false;
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let sampleColor = img.colorAt(i, j);

      if (battlePhase.includes(sampleColor)) {
        let screenX = i + capture.x;
        let screenY = j + capture.y;

        mouseUse(robot, screenX, screenY);
        console.log("ClickTurn Battle");
        firstIfMatched = true;
        return false;
      } else if (endPhase.includes(sampleColor)) {
        let screenX = i + capture.x;
        let screenY = j + capture.y;
        mouseUse(robot, screenX, screenY);
        let endTurn = true;
        console.log("ClickTurn End");
        return endTurn;
      }
    }
    if (firstIfMatched) {
      break;
    }
  }
  return false;
}

async function chechAttack(robot) {
  return new Promise((resolve) => {
    let cordX = 955;
    let cordY = 773;
    let attackColor = ["fff7bf"];

    let pixelColor = robot.getPixelColor(cordX, cordY);
    if (attackColor.includes(pixelColor)) {
      mouseUse(robot, cordX, cordY);
      msleep(2000);
      console.log("Check Attack");
      resolve();
    } else {
      resolve();
    }
  });
}

async function attackMonster(robot) {
  let cordX = [830, 960, 1080];
  let cordY = 650;

  for (let elem of cordX) {
    await mouseUse(robot, elem, cordY);
    msleep(800);
    await chechAttack(robot);
    console.log("Attack Moster");
  }
  msleep(1500);
  clickPhase(robot);
  msleep(1500);
  checkTurn(robot);
}

async function battle(robot) {
   await attackMonster(robot);
   msleep(1000);
   startDuel(robot);
}

module.exports = {
  startBot,
};

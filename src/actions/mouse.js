let isBotRunning = false; 

async function startBot(robot) {

  // if (botController.stopBotSignal) {
  //   console.log('startBot is already running. Ignoring the command.');
  //   return;
  // }

    msleep(2000);



    await checkAndUseGate(robot);

    let duelCoordinates = {
      x: 925,
      y: 900,
      width: 1000 - 920,
      height: 950 - 900,
    };
    msleep(4000);

    let duel = await findElementWithRetry(robot, duelCoordinates, [
      "cbca32",
      "eee132",
      "dedc36",
      "f6f039",
    ]);

    if (duel !== false) {
      console.log("Success - Found Duel");
      mouseUse(robot, duel.x, duel.y);
    }

    msleep(2000);

    mouseUse(robot, 560, 0);
    mouseUse(robot, 560, 0);
    msleep(200);
    mouseUse(robot, 560, 0);
    msleep(1000);

    if (duel !== false) {
      console.log("Success - Found Duel Again");
      mouseUse(robot, duel.x, duel.y);
    }

    await startDuel(robot, true);


}

async function startAutoDuel(robot) {

  let target = 1;
  while (true) {
    msleep(1000);
    let area = {
      x: 724,
      y: 560,
      width: 1200 - 724,
      height: 803 - 560,
    };

    // let example = {
    //   x: 910,
    //   y: 610,
    //   width: 981 - 910,
    //   height: 680 - 610,
    // };

    let color = [
      "d4f7f8",
      "d6f9fa",
      "fafefe",
      "d7f2f2",
      "d7f3f5",
      "1fc6da",
      // "e4ffff",
      "3fb9c4",
      "c34444",
      "4dbeb8",
      "1bb7d2",
      "7bd7dd",
      "2fc8d5",
      "22b4cd",
      "60c4c5",
      "31c4d6",
      "6accb4",
      "4dadab",
      "1cb9d5",
      "c74444",
      "41ccd3",
      "43d3e0",
      "34bed0",
      "69c5b6",
      "49c0ba",
      "36c9d4",
      "70d2ca",
      "3fc1c1",
      "23bbd6",
      "37c5d4",
      "64d1c8",
    ];

    let auto = await findElementWithRetry(robot, area, color);
    // let cordX = 1067;
    // let cordY = 648;

    // let pixelColor = robot.getPixelColor(cordX, cordY);
    // console.log(pixelColor);
    if (auto !== false) {
      console.log("Success - Found Auto");
      mouseUse(robot, auto.x - 3, auto.y + 5);
      msleep(2000);

      mouseUse(robot, 560, 0);
      mouseUse(robot, 560, 0);
      mouseUse(robot, 560, 0);
      msleep(1000);

      mouseUse(robot, 1153, 943);
      msleep(15000);
      let finishMathc = false;

      while (!finishMathc) {
        finishMathc = await checkWin(robot);
        if (finishMathc) {
          console.log("Match Finish");
          collectReward(robot);
        }
      }
    } else {
      checkTrainers(robot);
      if (target > 4) {
        target = 1;
      }

      switch (target) {
        case 1:
          mouseUse(robot, 890, 1045);
          break;
        case 2:
          mouseUse(robot, 1064, 1045);
          break;
        case 3:
          mouseUse(robot, 1258, 1045);
          break;
        case 4:
          mouseUse(robot, 697, 1045);
      }
      target++;
    }
  }
}

async function startAutoPvP(robot) {
  // msleep(1000);
  // mouseUse(robot, 890, 1040);
  // msleep(500);
  // mouseUse(robot, 890, 1040);
  // msleep(2500);

  // let PvPCoordinates = {
  //   x: 640,
  //   y: 130,
  //   width: 830 - 640,
  //   height: 410 - 130,
  // };

  // let color = ["27ffd4"];

  // let pvp = await findElementWithRetry(robot, PvPCoordinates, color);

  // if (pvp !== false) {
  //   console.log("Success - Found PvP");
  //   mouseUse(robot, pvp.x, pvp.y);
  // }

  let duelCoordinates = {
    x: 926,
    y: 536,
    width: 994 - 926,
    height: 560 - 536,
  };

  while (true) {
    msleep(2000);
    let color = ["cbca32", "eee132", "dedc36", "f6f039", "e2cb2a"];
    let duel = await findElementWithRetry(robot, duelCoordinates, color);

    if (duel !== false) {
      console.log("Success - Found Duel");
      mouseUse(robot, duel.x, duel.y);
    } else {
      msleep(2000);
      mouseUse(robot, 960, 758);
      msleep(1000);
      duel = await findElementWithRetry(robot, duelCoordinates, color);
      mouseUse(robot, duel.x, duel.y);
    }
    msleep(2000);

    await startDuel(robot);
  }
}

function stopBot(value) {
  const flag = value;
  console.log(flag);
}


function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function mouseUse(robot, x, y) {
  robot.moveMouse(x, y);
  robot.mouseClick();
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

function clickPhase(robot) {
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

function collectReward(robot) {
  msleep(1000);
  let cordX = 978;
  let cordY = 996;
  let i = 0;

  while (i < 40) {
    msleep(500);
    mouseUse(robot, cordX, cordY);
    ++i;
  }
}

function collectRewardPvP(robot) {
  msleep(1000);
  let cordX = 958;
  let cordY = 957;
  let i = 0;

  while (i < 30) {
    console.log("Click " + i);
    msleep(500);
    mouseUse(robot, cordX, cordY);
    ++i;
  }
}

async function drawCardAsync(robot) {
  mouseUse(robot, 560, 0);
}

async function drawCards(robot) {
  let index = 0;
  for (index; index < 6; index++) {
    console.log("Draw..... " + index);
    await msleep(800);
    await drawCardAsync(robot);
  }
  console.log("Finish Draw");
  return Promise.resolve();
}

async function findElementWithRetry(robot, capture, colors) {
  let element;
  do {
    msleep(1000);
    element = findElement(robot, capture, colors);

    if (element === false) {
      return false;
    }
  } while (element === false);

  return element;
}

async function checkAndUseGate(robot) {
  let gateCoordinates = {
    x: 1080,
    y: 432,
    width: 1110 - 1080,
    height: 450 - 432,
  };

  let gate = await findElementWithRetry(robot, gateCoordinates, [
    "54f7f7",
    "688552",
    "7f9c5c",
    "739855",
  ]);

  if (gate !== false) {
    console.log("Success - Found Gate");
    mouseUse(robot, gate.x, gate.y);
  }
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
  let finishMathc = await checkWin(robot);
  console.log("Battle End");
  if (finishMathc) {
    console.log("Match Finish");
    collectReward(robot);
    return false;
  } else {
    await startDuel(robot, true);
  }
}

async function checkWin(robot) {
  msleep(500);
  let cordX = 1324;
  let cordY = 33;

  let pixelColor = robot.getPixelColor(cordX, cordY);
  console.log(pixelColor);
  let colorWin = ["ffffff", "808080"];

  if (!colorWin.includes(pixelColor)) {
    return true;
  }
}

async function startDuel(robot, configurate = false) {
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
          await playerTurn(robot);
          msleep(500);
          if (configurate) {
            await summonMonster(robot);
            return false;
          } else {
            msleep(500);
            await autoPvP(robot);
            msleep(1000);
            await discardCard(robot);
            await startDuel(robot);
            return false;
          }
        } else if (opponents.includes(sampleColor)) {
          if (!configurate) {
            await autoClick(robot);
            let finishMathc = await checkWin(robot);
            console.log("Battle End");
            if (finishMathc) {
              console.log("Match Finish");
              collectReward(robot);
              return false;
            } else {
              await startDuel(robot);
            }
            return false;
          }
        }
      }
    }
  }
}

async function playerTurn(robot) {
  const capture = {
    x: 710,
    y: 930,
    width: 860 - 710,
    height: 970 - 930,
  };

  let img = robot.screen.capture(
    capture.x,
    capture.y,
    capture.width,
    capture.height
  );

  let cardChouse = ["42455a","1d2040","52525c"];

  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      let sampleColor = img.colorAt(i, j);

      if (cardChouse.includes(sampleColor)) {
        let screenX = i + capture.x;
        let screenY = j + capture.y;
        console.log("PlayerTurn");
        mouseUse(robot, screenX, screenY);
        return false;
      }
    }
  }
  console.log("Check Turn Enabled");
  return false;
}

async function summonMonster(robot) {
  msleep(1000);
  const capture = {
    x: 850,
    y: 790,
    width: 915 - 850,
    height: 810 - 790,
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
          console.log("End Turn");
          msleep(2000);
          await startDuel(robot, true);
          return false;
        } else {
          console.log("Battle........................");
          msleep(1500);
          await battle(robot);
          return false;
        }
      }
    }
  }
  return false;
}

async function checkTrainers(robot) {
  let cordX = 651;
  let cordY = 70;

  let colorTrainers = ["6666aa"];
  let pixelColor = robot.getPixelColor(cordX, cordY);
  if (colorTrainers.includes(pixelColor)) {
    mouseUse(robot, cordX, cordY);
    msleep(2500);
    mouseUse(robot, 1070, 340);
    msleep(2500);
    mouseUse(robot, 1090, 600);
    msleep(1500);
    mouseUse(robot, 960, 620);
  }
}

async function autoPvP(robot) {
  for (let index = 0; index < 7; index++) {
    msleep(600);
    mouseUse(robot, 1310, 700);
  }
}

async function autoClick(robot) {
  for (let index = 0; index < 16; index++) {
    msleep(300);
    mouseUse(robot, 1330, 450);
  }
}

async function discardCard(robot) {
  let cordX = 953;
  let cordY = 919;
  msleep(600);
  mouseUse(robot, cordX, cordY);


}


module.exports = {
  startBot,
  startAutoDuel,
  startAutoPvP,
  stopBot,
};

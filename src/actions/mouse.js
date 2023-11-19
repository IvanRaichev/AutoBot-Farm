async function startBot(robot) {
  while (true) {
    msleep(1000);
    let gate = await findElementWithRetry(
      robot,
      {
        x: 1080,
        y: 432,
        width: 1110 - 1080,
        height: 450 - 432,
      },
      ["54f7f7", "688552", "7f9c5c", "739855"]
    );
    if (gate !== false) {
      console.log("Succes");
      mouseUse(robot, gate.x, gate.y);
    }
    let duel = await findElementWithRetry(
      robot,
      {
        x: 925,
        y: 900,
        width: 1000 - 920,
        height: 950 - 900,
      },
      ["cbca32", "eee132", "dedc36", "f6f039"]
    );
    msleep(4000);
    if (duel !== false) {
      console.log("Succes");
      mouseUse(robot, duel.x, duel.y);
    }
    msleep(2000);
    mouseUse(robot, 560, 0);
    mouseUse(robot, 560, 0);
    msleep(1000);
    if (duel !== false) {
      console.log("Succes");
      mouseUse(robot, duel.x, duel.y);
    }

    await startDuel(robot);
  }
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
          await playerTurn(robot);
          msleep(500);
          await summonMonster(robot);
          return false;
        } else if (opponents.includes(sampleColor)) {
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
    height: 960 - 930,
  };

  let img = robot.screen.capture(
    capture.x,
    capture.y,
    capture.width,
    capture.height
  );

  let cardChouse = ["42455a"];

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
          console.log("End Turn");
          msleep(2000);
          await startDuel(robot);
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
    await startDuel(robot);
  }
}

async function checkWin(robot) {
  msleep(500);
  let cordX = 1324;
  let cordY = 33;

  let pixelColor = robot.getPixelColor(cordX, cordY);
  let colorWin = ["ffffff"];

  if (!colorWin.includes(pixelColor)) {
    return true;
  }
}

function collectReward(robot) {
  msleep(1000);
  let cordX = 978;
  let cordY = 996;
  let i = 0;

  while (i < 25) {
    console.log("Click " + i);
    msleep(500);
    mouseUse(robot, cordX, cordY);
    ++i;
  }
}

module.exports = {
  startBot,
};

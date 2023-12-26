async function startBot(robot, parametr) {
  console.log('StartBot');
  msleep(1500);

  mouseUse(robot, 1090, 468);
  msleep(3500);

  if (parametr.hasOwnProperty('check-person')) {
    switchPerson(robot, parametr['check-person']);
  }


  let duelCoordinates = {
    x: 925,
    y: 900,
    width: 1000 - 920,
    height: 950 - 900,
  };


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


  if (parametr.hasOwnProperty('check-exp')) {
    let itemCoordinates = {
      x: 1270,
      y: 814,
      width: 1335 - 1270,
      height: 834 - 814,
    };

    let item = await findElementWithRetry(robot, itemCoordinates, [
      "aabbce",
      "829cba",
      "ffffff",
    ]);

    if (item !== false) {
      console.log("Success - Found Item");
      mouseUse(robot, item.x, item.y);
    }

    msleep(1500);

    let expCoordinates = {
      x: 740,
      y: 450,
      width: 787 - 740,
      height: 500 - 450,
    };

    let exp = await findElementWithRetry(robot, expCoordinates, [
      "0231c1",
      "1171f4",
      "0c2f77",
    ]);

    if (exp !== false) {
      console.log("Success - Found Exp");
      mouseUse(robot, exp.x, exp.y);
      msleep(1000);

    }
  }
  if (parametr.hasOwnProperty('check-result')) {
    let resultCoordinates = {
      x: 740,
      y: 286,
      width: 787 - 740,
      height: 320 - 286,
    };

    let result = await findElementWithRetry(robot, resultCoordinates, [
      "222222",
      "292929",
      "121411",
    ]);

    if (result !== false) {
      console.log("Success - Found Result");
      mouseUse(robot, result.x, result.y);
      msleep(1000);
    }
  }

  mouseUse(robot, 960, 921);
  msleep(2000);

  if (duel !== false) {
    console.log("Success - Found Duel Again");
    mouseUse(robot, duel.x, duel.y);
  }

  await startDuel(robot, true);


}

async function startAutoDuel(robot, target, parametr) {

  msleep(1000);
  let area = {
    x: 724,
    y: 560,
    width: 1200 - 724,
    height: 803 - 560,
  };


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

  if (auto !== false) {
    console.log("Success - Found Auto");
    mouseUse(robot, auto.x - 3, auto.y + 5);
    msleep(2000);

    mouseUse(robot, 560, 0);
    mouseUse(robot, 560, 0);
    mouseUse(robot, 560, 0);
    msleep(1000);
    if (auto.color) {
      if (parametr.hasOwnProperty('check-exp-npc')) {
        let itemCoordinates = {
          x: 1270,
          y: 814,
          width: 1335 - 1270,
          height: 834 - 814,
        };

        let item = await findElementWithRetry(robot, itemCoordinates, [
          "aabbce",
          "829cba",
          "ffffff",
        ]);

        if (item !== false) {
          console.log("Success - Found Item");
          mouseUse(robot, item.x, item.y);
        }

        msleep(1500);

        let expCoordinates = {
          x: 740,
          y: 450,
          width: 787 - 740,
          height: 500 - 450,
        };

        let exp = await findElementWithRetry(robot, expCoordinates, [
          "0231c1",
          "1171f4",
          "0c2f77",
        ]);

        if (exp !== false) {
          console.log("Success - Found Exp");
          mouseUse(robot, exp.x, exp.y);
          msleep(1000);

        }
      }
      if (parametr.hasOwnProperty('check-result-npc')) {
        let resultCoordinates = {
          x: 740,
          y: 286,
          width: 787 - 740,
          height: 320 - 286,
        };

        let result = await findElementWithRetry(robot, resultCoordinates, [
          "222222",
          "292929",
          "121411",
        ]);

        if (result !== false) {
          console.log("Success - Found Result");
          mouseUse(robot, result.x, result.y);
          msleep(1000);
        }
      }
      mouseUse(robot, 960, 921);
      msleep(2000);
    }

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
  }
  else {
   let end = await checkTrainers(robot, parametr);
   console.log(end);
   if(!end){
    console.log('End')
    return false;
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
  }

}

async function startAutoPvP(robot, parametr) {
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
  msleep(1500);
  if(Object.keys(parametr).length !== 0){
    if (parametr.hasOwnProperty('check-exp-pvp')) {
      let itemCoordinates = {
        x: 1230,
        y: 576,
        width: 1288 - 1230,
        height: 600 - 576,
      };
  
      let item = await findElementWithRetry(robot, itemCoordinates, [
        "aabbce",
        "829cba",
        "ffffff",
      ]);
  
      if (item !== false) {
        console.log("Success - Found Item");
        mouseUse(robot, item.x, item.y);
      }
  
      msleep(1500);
  
      let expCoordinates = {
        x: 740,
        y: 425,
        width: 787 - 740,
        height: 464 - 425,
      };
  
      let exp = await findElementWithRetry(robot, expCoordinates, [
        "0231c1",
        "1171f4",
        "0c2f77",
      ]);
  
      if (exp !== false) {
        console.log("Success - Found Exp");
        mouseUse(robot, exp.x, exp.y);
        msleep(1000);
  
      }
    }
    if (parametr.hasOwnProperty('check-result-pvp')) {
      let resultCoordinates = {
        x: 740,
        y: 286,
        width: 787 - 740,
        height: 320 - 286,
      };
  
      let result = await findElementWithRetry(robot, resultCoordinates, [
        "222222",
        "292929",
        "121411",
      ]);
  
      if (result !== false) {
        console.log("Success - Found Result");
        mouseUse(robot, result.x, result.y);
        msleep(1000);
      }
    }
    mouseUse(robot, 960, 921);
    msleep(2000);
  }

  let duelCoordinates = {
    x: 926,
    y: 536,
    width: 994 - 926,
    height: 560 - 536,
  };

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
        if (sampleColor === "c34444") {
          return { x: screenX, y: screenY, color: sampleColor };
        } else {
          return { x: screenX, y: screenY };
        }

      }
    }
  }

  return false;
}

function findPerson(robot, capture, colors, key, iteration) {
  console.time("findPerson");

  const img = robot.screen.capture(
    capture.x,
    capture.y,
    capture.width,
    capture.height
  );
  for (let i = 0; i < img.width; i += 2) {

    for (let j = 0; j < img.height; j += 4) {
      let sampleColor = img.colorAt(i, j);

      if (colors.includes(sampleColor)) {
        let screenX = i + capture.x;
        let screenY = j + capture.y;
        console.timeEnd("findPerson");
        return { x: screenX, y: screenY };

      }
    }
  }

  if (key) {
    if (iteration === 1) {
      console.log('Click');
      mouseUse(robot, 1215, 420);
    }
    else if (iteration === 2) {
      mouseUse(robot, 1215, 515);
    }
    else if (iteration === 3) {
      mouseUse(robot, 1215, 650);
    }
    else {
      mouseUse(robot, 1215, 775);
      return false;
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

async function findGatePerson(robot, capture, colors, key = false) {
  let element;
  let iteration = 1;
  do {
    msleep(1000);
    element = findPerson(robot, capture, colors, key, iteration);
    ++iteration;
    console.log(element, iteration);
  } while (element === false);

  return element;
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

  let cardChouse = ["42455a", "1d2040", "52525c"];

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

async function checkTrainers(robot, parametr) {
  let cordX = 651;
  let cordY = 70;

  let colorTrainers = ["6666aa"];
  let pixelColor = robot.getPixelColor(cordX, cordY);
  if (colorTrainers.includes(pixelColor)) {
    if (parametr.hasOwnProperty("check-restart-npc")) {

      mouseUse(robot, cordX, cordY);
      msleep(2500);
      mouseUse(robot, 1070, 340);
      msleep(2500);
      mouseUse(robot, 1090, 600);
      msleep(2000);
      mouseUse(robot, 960, 620);
    }else{
      return false
    }
  }else{
    return true;
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


async function switchPerson(robot, person) {

  mouseUse(robot, 1185, 600);
  msleep(1500);

  switch (person) {
    case "yami":
      let colorYami = ["dd008d", "ad0783", "e70362", "d01777", "b6009f", "b3009d"];

      await searchPerson(robot, colorYami);
      break;
    case "bonz":
      let colorBonz = ["4c5e8b", "3a445e", "4f5d8b", "505a8d", "4a558e"];
      await searchPerson(robot, colorBonz);
      break;
    case "mai":
      let colorMai = ["9e9955", "ddd075", "dddb6f", "a19955", "ddda75", "ddd875"];
      await searchPerson(robot, colorMai);
      break;
    case "tristan":
      let colorTristan = ["504513", "635d34", "594f1b", "504316", "411f1f", "2a1212"] // rework
      await searchPerson(robot, colorTristan);
      break;
  }
}

async function searchPerson(robot, color) {
  let area = {
    x: 730,
    y: 238,
    width: 1184 - 730,
    height: 927 - 238,
  }
  let key = true;
  let search = await findGatePerson(robot, area, color, key);

  if (search !== false) {
    console.log("Success - Found Person");
    mouseUse(robot, search.x, search.y);
  }
}

module.exports = {
  startBot,
  startAutoDuel,
  startAutoPvP,
};

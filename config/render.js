const robot = require('robotjs');
const config = require('./config');

robot.setMouseDelay(config.keyboard.delay);
robot.setMouseAcceleration(config.mouse.acceleration);

function moveMouse(x, y) {
  robot.moveMouseSmooth(x, y, config.mouse.smoothing);
}

function mouseClick(button) {
  robot.mouseClick(button);
}

function pressKey(key) {
  robot.keyTap(key);
}
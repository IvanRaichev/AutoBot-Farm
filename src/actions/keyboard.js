

function waitForKeypress(key) {
  const robot = require('robotjs');
  console.log(`Press ${key} to continue...`);

  const listener = robot.keyTap(key, 'down', () => {
    robot.removeListener('keydown', listener);
    console.log(`You pressed ${key}. Program will continue.`);
  });

  // Ждем завершения программы
  process.stdin.resume();
}

 module.exports = waitForKeypress;
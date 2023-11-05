import * as robot from "robotjs";

// Устанавливаем задержку перед выполнением действия (по желанию)
robot.setMouseDelay(2);

// Задаем координаты, куда нужно выполнить клик
const x = 100;
const y = 100;

// Выполняем клик по указанным координатам
robot.moveMouseSmooth(x, y);
robot.mouseClick();
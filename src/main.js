const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
// const mouseEvent = require('./actions/mouse.js');
const robot = require("robotjs");
const cv = require('@u4/opencv4nodejs');

function createWindow() {
   const win = new BrowserWindow({
      width: 700,
      height: 500,
      webPreferences: {
         nodeIntegration: true,
         sandbox: false, // Отключение V8 Sandbox
         preload: path.join(__dirname, 'preload.js'),
      }
   });

   win.setMenu(null);
   win.loadFile('html/index.html');

   ipcMain.on('button-clicked', () => {
     
   });
};

function startRender() {

   app.whenReady().then(createWindow);
   app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
         app.quit();
      }
   });

   app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
         createWindow();
      }
   });
}


async function findImageOnScreen() {
   // Замените 'путь_к_изображению.png' на путь к изображению, которое вы хотите найти на экране.
   const imagePath = './resources/images/search/find.PNG';

   // Захватываем снимок экрана
   const screenCapture = robot.screen.capture();

   // Загружаем целевое изображение
   const targetImage = PNG.sync.read(fs.readFileSync(imagePath));

   // Создаем PNG изображение на основе снимка экрана
   const screenImage = new PNG({ width: screenCapture.width, height: screenCapture.height });
   screenImage.data = screenCapture.image;

   // Создаем временное изображение для хранения результатов сравнения
   const diffImage = new PNG({ width: screenCapture.width, height: screenCapture.height });

   // Сравниваем изображения с помощью pixelmatch
   const numDiffPixels = pixelmatch(screenImage.data, targetImage.data, diffImage.data, screenCapture.width, screenCapture.height, {
      threshold: 0.1, // Порог сходства
   });

   if (numDiffPixels < 1000) { // Устанавливаем порог для считывания изображения как найденного
      console.log('Изображение найдено на экране.');
      // Вы можете выполнить дополнительные действия при обнаружении изображения.
   } else {
      console.log('Изображение не найдено на экране.');
   }
}

function findAndClickImage(imagePath) {
   const screen = robot.screen.capture();
   const template = cv.imread(imagePath);
 
   const matches = screen.matchTemplate(template, 0.2);
   const bestMatch = matches.minMaxLoc();
 
   if (bestMatch.maxVal > 0.8) {
     const { x, y } = bestMatch.maxLoc;
     const centerX = x + template.cols / 2;
     const centerY = y + template.rows / 2;
 
     robot.moveMouse(centerX, centerY);
     robot.mouseClick();
   }
 }

startRender();

function detectAndPressKey(templateImagePath, searchRegion, scanInterval) {
   const templateImage = cv.imread(templateImagePath);
 
   function scanScreen() {
     const screen = robot.screen.capture(
       searchRegion.x,
       searchRegion.y,
       searchRegion.width,
       searchRegion.height
     );
 
     const result = screen.matchTemplate(templateImage, 5);
     const threshold = 0.8;
     const matchedPoints = result.minMaxLoc().maxLoc;
 
     if (result.confidence >= threshold) {
       robot.keyTap('a'); // Замените 'a' на нужную вам клавишу
       console.log('Изображение обнаружено. Клавиша нажата.');
     } else {
       console.log('Изображение не обнаружено.');
     }
   }
 
   // Запуск функции с заданным интервалом
   setInterval(scanScreen, scanInterval);
 }

 module.exports = detectAndPressKey;
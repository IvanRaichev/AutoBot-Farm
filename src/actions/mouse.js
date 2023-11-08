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

 async function findImageOnScreen() {
   const imagePath = './resources/images/search/find.PNG';

   const screenCapture = robot.screen.capture();

   const targetImage = PNG.sync.read(fs.readFileSync(imagePath));

   const screenImage = new PNG({ width: screenCapture.width, height: screenCapture.height });
   screenImage.data = screenCapture.image;

   
   const diffImage = new PNG({ width: screenCapture.width, height: screenCapture.height });

   const numDiffPixels = pixelmatch(screenImage.data, targetImage.data, diffImage.data, screenCapture.width, screenCapture.height, {
      threshold: 0.1, 
   });

   if (numDiffPixels < 1000) { 
      console.log('Изображение найдено на экране.');
   
   } else {
      console.log('Изображение не найдено на экране.');
   }
}
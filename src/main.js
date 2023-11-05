// Ваш JavaScript код в Tauri-приложении
// const execa = require('execa')
// const fs = require('fs')

// let extension = ''
// if (process.platform === 'win32') {
//   extension = '.exe'
// }

// async function main() {
//   const rustInfo = (await execa('rustc', ['-vV'])).stdout
//   const targetTriple = /host: (\S+)/g.exec(rustInfo)[1]
//   if (!targetTriple) {
//     console.error('Failed to determine platform target triple')
//   }
//   fs.renameSync(
//     `src-tauri/binaries/sidecar${extension}`,
//     `src-tauri/binaries/sidecar-${targetTriple}${extension}`
//   )
// }

// main().catch((e) => {
//   throw e
// })


// const fs = require('fs');

// fs.readFile('file.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(data);
//   }
// });




// const btn = document.querySelector('.start');

// btn.addEventListener('click', () => {
   
//    const newPosition = { x: 100, y: 100 }; // Новые координаты курсора
//    robot.moveMouse(newPosition.x, newPosition.y);
//    console.log(1);
// });

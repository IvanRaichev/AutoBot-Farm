// Ваш рендерерный код
const button = document.querySelector('.btn-test');
const messageElement = document.querySelector('.test');

button.addEventListener('click', () => {
   ipcRenderer.send('button-clicked');
});
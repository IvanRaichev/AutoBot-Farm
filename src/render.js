// Ваш рендерерный код
const button = document.querySelector('.btn-test');

button.addEventListener('click', () => {
   ipcRenderer.send('button-clicked');
});
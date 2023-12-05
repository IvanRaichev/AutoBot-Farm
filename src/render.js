const button = document.querySelector('.btn-test');
const buttonAuto = document.querySelector('.btn-test2');

button.addEventListener('click', () => {
   ipcRenderer.send('button-clicked');
});


buttonAuto.addEventListener('click', () => {
   ipcRenderer.send('button-clicked-auto');
});

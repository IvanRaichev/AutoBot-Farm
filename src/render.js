document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const button = document.querySelector(".btn-test");
    const buttonAuto = document.querySelector(".btn-test2");
    const buttonPvP = document.querySelector(".btn-test3");
    const stopFucntion = document.querySelector(".stop-function")
    
    button.addEventListener("click", () => {
      ipcRenderer.send("button-clicked");
    });

    buttonAuto.addEventListener("click", () => {
      ipcRenderer.send("button-clicked-auto");
    });

    buttonPvP.addEventListener("click", () => {
      ipcRenderer.send("button-clicked-pvp");
    });

    stopFucntion.addEventListener("click",()=>{
      ipcRenderer.send("stop-function");
    })

  }, 1000);
});

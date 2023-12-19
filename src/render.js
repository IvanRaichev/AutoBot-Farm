
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const button = document.querySelector(".btn-test");
    const buttonAuto = document.querySelector(".btn-test2");
    const buttonPvP = document.querySelector(".btn-test3");
    const stopFunction = document.querySelector(".stop-function");
    let isFlagActive = true;

    button.addEventListener("click", () => {
      api.send("button-clicked");
    });

    buttonAuto.addEventListener("click", () => {
      api.send("button-clicked-auto");
    });

    buttonPvP.addEventListener("click", () => {
      api.send("button-clicked-pvp");
    });

    stopFunction.addEventListener("click", () => {
      const info = document.querySelector(".stop-flag");
      console.log(info);
  
      api.send("stop-function", isFlagActive);
  
      api.on("reply", (event, data) => {
        isFlagActive = data;
        info.innerHTML = isFlagActive.toString();
      });
    });
  }, 1000);
});

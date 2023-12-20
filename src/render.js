document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const button = document.querySelector(".btn-test");
    const buttonAuto = document.querySelector(".btn-test2");
    const buttonPvP = document.querySelector(".btn-test3");
    const stopFlagElement = document.querySelector(".stop-flag");
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
    
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "characterData" ||
          mutation.type === "childList"
        ) {
          const currentValue = stopFlagElement.textContent.trim();
          api.send("update-stop-flag-value", currentValue);
        }
      });
    }).observe(stopFlagElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "F2") {
        const currentValue = stopFlagElement.textContent.trim();
        api.send('toggle-stop-flag', currentValue);
      }
    });

    api.on("update-stop-flag", (event, newValue) => {
      stopFlagElement.textContent = newValue;
    });
  }, 1000);
});

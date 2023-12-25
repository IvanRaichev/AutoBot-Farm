document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const stopFlagElement = document.querySelector(".stop-flag");
    let isFlagActive = true;
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
  }, 2000);

  let intervalId;

  function setupHandlers() {
    const button = document.querySelector(".btn-gate");
    const buttonAuto = document.querySelector(".btn-npc");
    const buttonPvP = document.querySelector(".btn-pvp");

    if (button) {
      button.addEventListener("click", () => {
        api.send("button-clicked");
      });
    }

    if (buttonAuto) {
      buttonAuto.addEventListener("click", () => {
        api.send("button-clicked-auto");
      });
    }

    if (buttonPvP) {
      buttonPvP.addEventListener("click", () => {
        api.send("button-clicked-pvp");
      });
    }
  }

  intervalId = setInterval(() => {
    setupHandlers();
    setTimeout(() => {
      const buttons = document.querySelectorAll(".btn-gate, .btn-npc, .btn-pvp");
      buttons.forEach(button => {
        const clonedButton = button.cloneNode(true);
        button.parentNode.replaceChild(clonedButton, button);
      });
    }, 1000)


  }, 2000);
});

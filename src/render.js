document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const stopFlagElement = document.querySelector(".stop-flag");
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

    api.on("request-info-for-F6", () => {
      const info = checkCheckboxState();
      api.send("response-info-for-F6", info);
    });

    api.on("request-info-for-F5", () => {
      const info = checkCheckboxState();

      api.send("response-info-for-F5", info);
    });


    api.on("request-info-for-F1", () => {
      const info = checkCheckboxState();
      api.send("response-info-for-F1", info);
    });


  }, 2000);

  let intervalId;

  function setupHandlers() {
    const button = document.querySelector(".btn-gate");
    const buttonAuto = document.querySelector(".btn-npc");
    const buttonPvP = document.querySelector(".btn-pvp");
    const info = [1, 2, 3]

    if (button) {
      button.addEventListener("click", () => {
        api.send("button-clicked", info);
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

  function checkCheckboxState() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let stateObject = {};

    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
          if (checkbox.id === 'check-person') {
              let slickSlide = document.querySelector('.slick-slide.slick-active.slick-current');
              if (slickSlide) {
                  let img = slickSlide.querySelector('img');
                  if (img && img.alt) {
                      stateObject[checkbox.id] = img.alt; 
                  }
              }
          } else {
              stateObject[checkbox.id] = true; 
          }
      }
  });

    return stateObject; 
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

//backend chapter
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





    api.on("request-info-for-F1", () => {
      const info = checkCheckboxState();
      api.send("response-info-for-F1", info);
    });

    api.on("request-info-for-F2", () => {
      const info = checkCheckboxState();

      api.send("response-info-for-F2", info);
    });


    api.on("request-info-for-F3", () => {
      const info = checkCheckboxState();
      api.send("response-info-for-F3", info);
    });

    api.on("request-info-for-F4", () => {
      const currentValue = stopFlagElement.textContent.trim();
      api.send('toggle-stop-flag', currentValue);
    });
        
    api.on("update-stop-flag", (event, newValue) => {
      stopFlagElement.textContent = newValue;
    });

  }, 2000);

  let intervalId;

  function setupHandlers() {
    const button = document.querySelector(".btn-gate");
    const buttonAuto = document.querySelector(".btn-npc");
    const buttonPvP = document.querySelector(".btn-pvp")
    const info = checkCheckboxState();

    if (button) {
      button.addEventListener("click", () => {
        const info = checkCheckboxState();
        api.send("button-clicked", info);
      });
    }

    if (buttonAuto) {
      buttonAuto.addEventListener("click", () => {
        const info = checkCheckboxState();
        api.send("button-clicked-auto", info);
      });
    }

    if (buttonPvP) {
      buttonPvP.addEventListener("click", () => {
        const info = checkCheckboxState();
        api.send("button-clicked-pvp", info);
      });
    }


  }

  function checkCheckboxState() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let stateObject = {};

    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        if (checkbox.id === 'check-time') {
          let timerContainer = document.querySelector('.timer__container');
          if (timerContainer) {
            let timerInput = timerContainer.querySelector('#numberInput');
            if (timerInput && timerInput.value) {
              stateObject[checkbox.id] = +timerInput.value;
            }
          }
        } else if (checkbox.id === 'check-person') {
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

let userInput = "";
import { renderButton } from "./loading2.js";

function updateTextDisplay(textDisplay) {
  textDisplay.setAttribute(
    "text",
    "value: " +
      (userInput || "Enter your name") +
      "; align: center; color: black",
  );
  textDisplay.setAttribute("position", "0 3 -3");
}

function handleKeyClick(key, textDisplay, keysContainer) {
  if (key === "<-") {
    userInput = userInput.slice(0, -1);
  } else if (key === "OK") {
    renderButton();
    console.log("Nom validé: ", userInput);
    keysContainer.parentNode.removeChild(keysContainer);
    textDisplay.parentNode.removeChild(textDisplay);
    let players = JSON.parse(localStorage.getItem("players") || "[]");
    let existingPlayer = players.find(player => player.player_name === userInput);

    if (existingPlayer) {
      console.log("Données enregistrées: ", existingPlayer);
      updateTextDisplay(textDisplay);
      let startButton = document.getElementById("startButton");
      startButton.setAttribute(
        "text",
        "value: CONTINUE; align: center; color: white; width: 3; font: ./assets/font/Gloria-msdf.json; font-image: ./assets/font/Gloria-msdf.png; negate:false"
      );
      console.log("Existe déjà");
      localStorage.setItem("currentUserInput", JSON.stringify(userInput));
      return userInput;
    } else {
      let newPlayer = {
        player_name: userInput,
        money: 0,
        round: 1,
        id_questions: [],
        id_shop: ["King", "Casual"],
      };
      players.push(newPlayer);
      localStorage.setItem("players", JSON.stringify(players));
      console.log("Données enregistrées: ", newPlayer);
      console.log(" existe pas, on l'a créé", userInput);
      localStorage.setItem("currentUserInput", JSON.stringify(userInput)); 
      return userInput;
    }
  } else {
    userInput += key;
  }
  updateTextDisplay(textDisplay);
  console.log("Nom: ", userInput);
}

function initializeKeyboard(keysContainer, textDisplay) {
  let keys = "AZERTYUIOPQSDFGHJKLMWXCVBN".split("");
  let specialKeys = ["<-", "OK"];
  let keySpacingX = 0.25;
  let keySpacingY = 0.3;
  let rowSize = 10;

  keys.forEach((key, index) => {
    let keyEntity = document.createElement("a-entity");
    keyEntity.setAttribute(
      "geometry",
      "primitive: plane; width: 0.2; height: 0.2"
    );
    keyEntity.setAttribute("material", "color: #222");
    keyEntity.setAttribute(
      "text",
      `value: ${key}; align: center; color: white; width: 4`
    );
    keyEntity.setAttribute(
      "position",
      `${(index % rowSize) * keySpacingX - 1.0} ${
      2 - Math.floor(index / rowSize) * keySpacingY
      } -1`
    );
    keyEntity.setAttribute("class", "key");
    keyEntity.addEventListener("click", () => {
      handleKeyClick(key, textDisplay, keysContainer);
    });
    keysContainer.appendChild(keyEntity);
  });

  specialKeys.forEach((key, index) => {
    let keyEntity = document.createElement("a-entity");
    keyEntity.setAttribute(
      "geometry",
      "primitive: plane; width: 0.5; height: 0.2"
    );
    keyEntity.setAttribute("material", "color: #444");
    keyEntity.setAttribute(
      "text",
      `value: ${key}; align: center; color: white; width: 4`
    );
    keyEntity.setAttribute("position", `${index * 0.6 - 0.3} 1 -1`);
    keyEntity.setAttribute("class", "key");
    keyEntity.addEventListener("click", () => {
      handleKeyClick(key, textDisplay, keysContainer);
    });
    keysContainer.appendChild(keyEntity);
  });

  updateTextDisplay(textDisplay);
}

export { initializeKeyboard, userInput };

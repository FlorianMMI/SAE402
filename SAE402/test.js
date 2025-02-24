
const scene = document.querySelector("a-scene");
const response = await fetch('./question.json');
const temp = await response.json();
console.log(temp);

let  storedUserInput = JSON.parse(localStorage.getItem("currentUserInput"));
if (storedUserInput) {
    console.log("Stored user input:", storedUserInput);
} else {
    console.log("No stored user input found");
}


import { getRequest } from "./api-request.js";
const userData = await getRequest("user?name=" + storedUserInput);

let money = document.querySelector("#money");
money.setAttribute("value", parseInt(userData[0].money));


let rounds = [2,4,6,8,10,12,14,16,18];
let round = parseInt(userData[0].round);
let questionIndex = 0;


const userText = document.createElement("a-text");
userText.setAttribute("position", "2.5 3.5 -9.47");
userText.setAttribute("value", "Name : " + (storedUserInput || "Guest"));
userText.setAttribute("color", "#FFF");
userText.setAttribute("align", "center");
userText.setAttribute("width", "2.5");
userText.setAttribute("font", "./assets/font/Gloria-msdf.json");
userText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
userText.setAttribute("negate", "false");

const roundText = document.createElement("a-text");
roundText.setAttribute("position", "2.5 3.0 -9.47");
roundText.setAttribute("value", "Round: " + (round + 1));
roundText.setAttribute("color", "#FFF");
roundText.setAttribute("align", "center");
roundText.setAttribute("width", "2.5");
roundText.setAttribute("font", "./assets/font/Gloria-msdf.json");
roundText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
roundText.setAttribute("negate", "false");


scene.appendChild(userText);
scene.appendChild(roundText);
;




//mise en place des réponses correctes et questions pour chaque round
let data = [];

for (let i = 0; i < rounds.length; i++) {
    const nb = rounds[i];
    const roundQuestions = [];
    // Create a copy of the questions to sample from for this round
    const availableQuestions = [...temp];
    for (let j = 0; j < nb; j++) {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        roundQuestions.push(availableQuestions.splice(randomIndex, 1)[0]);
    }
    data.push(roundQuestions);
}

console.log(data);

let correctAnswers = [];
data.forEach(roundArr => {
  roundArr.forEach(q => {
    if (q.reponses[0].est_correcte === true) {
        correctAnswers.push(q.reponses[0].texte_reponse);
    }
    if (q.reponses[1].est_correcte === true) {
        correctAnswers.push(q.reponses[1].texte_reponse);
    }
  });
});
console.log(correctAnswers);


let cpt_resp = 0;

async function StartTest() {
    const camera = document.querySelector("#rig");
    camera.setAttribute("position", "1.8 0 2.3");
    camera.setAttribute("movement-controls", "constrainToNavMesh: true; controls: checkpoint;");

    let chair = document.querySelector("#cr-chair");
    chair.removeAttribute("dynamic-body");

    const scene = document.querySelector("a-scene");

    const infoBox = document.createElement("a-box");
    infoBox.setAttribute("id", "infoBox");
    infoBox.setAttribute("position", "1.8 1.5 1.3");
    infoBox.setAttribute("rotation", "-90 0 0");
    infoBox.setAttribute("width", "1.4");
    infoBox.setAttribute("height", "1.2");
    infoBox.setAttribute("depth", "0.01");
    infoBox.setAttribute("material", "color: #fff; opacity: 1");

    const textElement = document.createElement("a-text");
    textElement.setAttribute("value", "Start of the test...");
    textElement.setAttribute("color", "#000");
    textElement.setAttribute("align", "center");
    textElement.setAttribute("width", "1.4");
    textElement.setAttribute("wrapCount", "15");
    textElement.setAttribute("position", "0 0 0.01");

    // Création d'un élément de progress indiquant le round et le nombre de questions restantes
    const progressText = document.createElement("a-text");
    progressText.setAttribute("id", "progress");
    progressText.setAttribute("value", `Round ${round + 1}: ${data[round].length - questionIndex} questions remaining`);
    progressText.setAttribute("color", "#000");
    progressText.setAttribute("align", "center");
    progressText.setAttribute("width", "1.4");
    progressText.setAttribute("position", "0 0.5 0.01");

    infoBox.appendChild(textElement);
    textElement.appendChild(progressText);
    scene.appendChild(infoBox);

    // after a short timeout, load the first question of the current round
    setTimeout(() => {
        // Use data[round][questionIndex]
        const currentQuestion = data[round][questionIndex];
        textElement.setAttribute("value", currentQuestion.texte_question);
        textElement.setAttribute("id", "question");

        const textReponse1 = document.createElement("a-text");
        textReponse1.setAttribute("value", currentQuestion.reponses[0].texte_reponse);
        textReponse1.setAttribute("id", "reponse1");
        textReponse1.setAttribute("color", "#000");
        textReponse1.setAttribute("align", "center");
        textReponse1.setAttribute("wrapCount", "20");
        textReponse1.setAttribute("position", "0 -0.2 0.01");
        textReponse1.setAttribute("scale", "0.4 0.4 0.4");
        infoBox.appendChild(textReponse1);

        const textReponse2 = document.createElement("a-text");
        textReponse2.setAttribute("value", currentQuestion.reponses[1].texte_reponse);
        textReponse2.setAttribute("id", "reponse2");
        textReponse2.setAttribute("color", "#000");
        textReponse2.setAttribute("align", "center");
        textReponse2.setAttribute("wrapCount", "25");
        textReponse2.setAttribute("position", "0 -0.4 0.01");
        textReponse2.setAttribute("scale", "0.4 0.4 0.4");
        infoBox.appendChild(textReponse2);

        const hitBoxRep1 = document.createElement("a-box");
        hitBoxRep1.setAttribute("position", "0 0 -0.01");
        hitBoxRep1.setAttribute("id", "HitBoxRep1");
        hitBoxRep1.setAttribute("width", "2");
        hitBoxRep1.setAttribute("height", "0.2");
        hitBoxRep1.setAttribute("depth", "0.01");
        hitBoxRep1.setAttribute("material", "color: #f00; opacity: 0;");
        hitBoxRep1.addEventListener("click", () => {
            if (isCorrect(currentQuestion.reponses[0].texte_reponse)) {
                let money = document.querySelector("#money");
                let temp = money.getAttribute("value");
                money.setAttribute("value", parseInt(money.getAttribute("value")) + 2);
                
                fetch('https://florian-bounissou.fr/ClassTrouble/api/user', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: storedUserInput,
                        money: parseInt(temp) + 2,
                        round: round,
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => console.log(data))
                .catch(error => console.error('Erreur :', error));
                cpt_resp += 1;
                nextQuestion(questionIndex + 1);
            } else {
                textElement.setAttribute("value", "Wrong !");
                setTimeout(() => {
                    nextQuestion(questionIndex + 1);
                }, 2000);
            }
        });
        textReponse1.appendChild(hitBoxRep1);

        const hitBoxRep2 = document.createElement("a-box");
        hitBoxRep2.setAttribute("position", "0 0 -0.01");
        hitBoxRep2.setAttribute("id", "HitBoxRep2");
        hitBoxRep2.setAttribute("width", "2");
        hitBoxRep2.setAttribute("height", "0.2");
        hitBoxRep2.setAttribute("depth", "0.01");
        hitBoxRep2.setAttribute("material", "opacity: 0;");
        hitBoxRep2.addEventListener("click", () => {
            if (isCorrect(currentQuestion.reponses[1].texte_reponse)) {
                let money = document.querySelector("#money");
                let temp = money.getAttribute("value");
                money.setAttribute("value", parseInt(money.getAttribute("value")) + 2);
                
                fetch('https://florian-bounissou.fr/ClassTrouble/api/user', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: storedUserInput,
                        money: parseInt(temp) + 2,
                        round: round,
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => console.log(data))
                .catch(error => console.error('Erreur :', error));
                cpt_resp += 1;
                nextQuestion(questionIndex + 1);
            } else {
                textElement.setAttribute("value", "Wrong !");
                setTimeout(() => {
                    nextQuestion(questionIndex + 1);
                }, 2000);
            }
        });
        textReponse2.appendChild(hitBoxRep2);
    }, 2000);
}

function nextQuestion(newIndex) {
    questionIndex = newIndex;
    const infoBox = document.querySelector("#infoBox");
    const questionElem = document.querySelector("#question");

    // If current round is finished then increment round
    if (questionIndex >= data[round].length) {
        // If there is a next round, increment round and reset questionIndex.
        if (round < data.length - 1) {
            round++;
            questionIndex = 0;
            questionElem.setAttribute("value", "Round " + (round + 1) + " begins...");

            // Brief pause before next round questions load
            setTimeout(() => {
                updateQuestion(infoBox);
            }, 2000);
        } else {
            // End of the entire test
            questionElem.setAttribute("value", "End of the test, you got " + cpt_resp + "/" + (data.flat().length) +
                " And you got " + cpt_resp * 2 + " shop credits");
            document.querySelector("#reponse1").setAttribute("value", "");
            document.querySelector("#reponse2").setAttribute("value", "");
            
            setTimeout(() => {
                const camera = document.querySelector("#rig");
                camera.setAttribute("position", "1.8 0 2.3");
                camera.setAttribute("movement-controls", "constrainToNavMesh: true; controls: checkpoint, gamepad, trackpad, keyboard, nipple;");
                const chair = document.querySelector("#cr-chair");
                chair.setAttribute("dynamic-body", "");
                const infoBox = document.querySelector("#infoBox");
                if (infoBox) {
                    infoBox.parentNode.removeChild(infoBox);
                }
            }, 5000);
        }
        return;
    }

    updateQuestion(infoBox);
}

function updateQuestion(infoBox) {
    const currentQuestion = data[round][questionIndex];
    const questionElem = document.querySelector("#question");
    questionElem.setAttribute("value", currentQuestion.texte_question);

    // Mise à jour du texte de progression
    let progressText = document.querySelector("#progress");
    if (progressText) {
      progressText.setAttribute("value", `Round ${round + 1}: ${data[round].length - questionIndex} questions remaining`);
    }

    let reponse1 = document.querySelector("#reponse1");
    let reponse2 = document.querySelector("#reponse2");

    // Update response text values
    reponse1.setAttribute("value", currentQuestion.reponses[0].texte_reponse);
    reponse2.setAttribute("value", currentQuestion.reponses[1].texte_reponse);

    // Remove any previous hitBoxes if present
    while (reponse1.firstChild) {
        reponse1.removeChild(reponse1.firstChild);
    }
    while (reponse2.firstChild) {
        reponse2.removeChild(reponse2.firstChild);
    }

    const hitBoxRep1 = document.createElement("a-box");
    hitBoxRep1.setAttribute("position", "0 0 -0.01");
    hitBoxRep1.setAttribute("id", "HitBoxRep1");
    hitBoxRep1.setAttribute("width", "2");
    hitBoxRep1.setAttribute("height", "0.2");
    hitBoxRep1.setAttribute("depth", "0.01");
    hitBoxRep1.setAttribute("material", "color: #f00; opacity: 0;");
    hitBoxRep1.addEventListener("click", () => {
        if (isCorrect(currentQuestion.reponses[0].texte_reponse)) {
            let money = document.querySelector("#money");
                let temp = money.getAttribute("value");
                money.setAttribute("value", parseInt(money.getAttribute("value")) + 2);
                
                fetch('https://florian-bounissou.fr/ClassTrouble/api/user', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: storedUserInput,
                        money: parseInt(temp) + 2,
                        round: round,
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => console.log(data))
                .catch(error => console.error('Erreur :', error));
                cpt_resp += 1;
                nextQuestion(questionIndex + 1);
        } else {
            questionElem.setAttribute("value", "Wrong !");
            characterAnimation();
            setTimeout(() => {
                nextQuestion(questionIndex + 1);
            }, 10000);
        }
    });
    reponse1.appendChild(hitBoxRep1);

    const hitBoxRep2 = document.createElement("a-box");
    hitBoxRep2.setAttribute("position", "0 0 -0.01");
    hitBoxRep2.setAttribute("id", "HitBoxRep2");
    hitBoxRep2.setAttribute("width", "2");
    hitBoxRep2.setAttribute("height", "0.2");
    hitBoxRep2.setAttribute("depth", "0.01");
    hitBoxRep2.setAttribute("material", "opacity: 0;");
    hitBoxRep2.addEventListener("click", () => {
        if (isCorrect(currentQuestion.reponses[1].texte_reponse)) {
            let money = document.querySelector("#money");
                let temp = money.getAttribute("value");
                money.setAttribute("value", parseInt(money.getAttribute("value")) + 2);
                
                fetch('https://florian-bounissou.fr/ClassTrouble/api/user', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: storedUserInput,
                        money: parseInt(temp) + 2,
                        round: round,
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => console.log(data))
                .catch(error => console.error('Erreur :', error));
                cpt_resp += 1;
                nextQuestion(questionIndex + 1);
        } else {
            questionElem.setAttribute("value", "Wrong !");
            characterAnimation();
            setTimeout(() => {
                nextQuestion(questionIndex + 1);
            }, 10000);
        }
    });
    reponse2.appendChild(hitBoxRep2);
}

function isCorrect(value) {
    return correctAnswers.includes(value);
};











// Character animation function
//
// This function initializes the character with a walking animation,
// sets its initial rotation and position, and then transitions to a running sequence.
let characterAnimation = function () {
    // List of possible fight animations.
    let animations = ["Punch_Right", "Punch_Left", "Kick_Right", "Kick_Left"];
    // List of possible emotes.
    let emotes = ["Roll", "Death", "Gun_Shoot"];
    // Get the character element.
    let character = document.getElementById('characters');

    // Initialize with a walk animation, set initial rotation and position.
    character.setAttribute('animation-mixer', 'clip: CharacterArmature|Walk; loop: repeat; timeScale: 1');
    character.setAttribute('rotation', '0 90 0');
    character.setAttribute('animation', 'property: position; to: 0 0 -8; dur: 1000; easing: linear');

    // After 1 second, start the run sequence.
    setTimeout(() => {
        stepRunAnimation(character, animations, emotes);
    }, 1000);
};

// Step 1: Running and subsequent animations.
//
// This function triggers a run-back animation, then performs a random emote,
// transitions to a walking animation, and finally switches to an idle animation.
function stepRunAnimation(character, animations, emotes) {
    // Trigger the run-back animation and move forward.
    character.setAttribute('animation-mixer', 'clip: CharacterArmature|Run_Back; loop: repeat; timeScale: 1');
    character.setAttribute('animation', 'property: position; to: 0 0 -4; dur: 2000; easing: linear');
    character.setAttribute('rotation', '0 0 0');

    // After 1 second, perform a random emote.
    setTimeout(() => {
        let randomEmote = emotes[Math.floor(Math.random() * emotes.length)];
        character.setAttribute('animation-mixer', `clip: CharacterArmature|${randomEmote}; loop: once; timeScale: 1`);
        character.setAttribute('animation', 'property: position; to: 0 0 -8; dur: 2000; easing: linear');
        character.setAttribute('rotation', '0 35 0');

        // After 2 seconds, switch to walk animation and update position.
        setTimeout(() => {
            character.setAttribute('animation-mixer', 'clip: CharacterArmature|Walk; loop: repeat; timeScale: 1');
            character.setAttribute('animation', 'property: position; to: -2 0 -8; dur: 1000; easing: linear');
            character.setAttribute('rotation', '0 -90 0');

            // After 1 second, transition to idle animation.
            setTimeout(() => {
                character.setAttribute('animation-mixer', 'clip: CharacterArmature|Idle; loop: repeat; timeScale: 1');
                character.setAttribute('rotation', '0 0 0');
            }, 1000);
        }, 2000);
    }, 1000);
};

export { StartTest };

const response = await fetch('./question.json');
    const data = await response.json();

    let correctAnswers = []
    data.forEach(elmt => {
        if (elmt.reponses[0].est_correcte == true) {
            correctAnswers.push (elmt.reponses[0].texte_reponse);
        }
        if (elmt.reponses[1].est_correcte == true) {
            correctAnswers.push (elmt.reponses[1].texte_reponse);
        }
    });

    console.log(correctAnswers);


const scene = document.querySelector("a-scene");
let cpt_resp = 0;

async function StartTest() {

    
    const camera = document.querySelector("#rig");
    camera.setAttribute("position", "1.8 0 2.3");
    camera.setAttribute("movement-controls", "constrainToNavMesh: true; controls: checkpoint;");

    let chair = document.querySelector("#cr-chair");
    chair.removeAttribute("dynamic-body");


    const scene = document.querySelector("a-scene");

    const infoBox = document.createElement("a-box");
    infoBox.setAttribute("position", "1.8 2 0.8");
    infoBox.setAttribute("rotation", `-45 ${Math.PI / 2} 0`);
    infoBox.setAttribute("width", "3");
    infoBox.setAttribute("height", "1.5");
    infoBox.setAttribute("depth", "0.01");
    infoBox.setAttribute("material", "color: #fff; opacity: 0.9");
    const textElement = document.createElement("a-text");
    textElement.setAttribute("value", "Start of the test...");
    textElement.setAttribute("color", "#000");
    textElement.setAttribute("align", "center");
    textElement.setAttribute("wrapCount", "25");
    textElement.setAttribute("position", "0 0 0.01");
    textElement.setAttribute("scale", "0.6 0.6 0.6");

    infoBox.appendChild(textElement);

    scene.appendChild(infoBox);

    setTimeout(() => {
        // Remplace le texte par la première question
        const premiereQuestion = data[0].texte_question;
        textElement.setAttribute("value", premiereQuestion);
        textElement.setAttribute("id", "question"); 

        const textReponse1 = document.createElement("a-text");
        textReponse1.setAttribute("value", data[0].reponses[0].texte_reponse);
        console.log("Ceci est sensé s'affiche" ,  data[0].reponses[0].texte_reponse);
        textReponse1.setAttribute("id", "reponse1");
        textReponse1.setAttribute("color", "#000");
        textReponse1.setAttribute("align", "center");
        textReponse1.setAttribute("wrapCount", "25");
        textReponse1.setAttribute("position", "0 -0.2 0.01");
        textReponse1.setAttribute("scale", "0.6 0.6 0.6");

        infoBox.appendChild(textReponse1);

        const textReponse2 = document.createElement("a-text");
        textReponse2.setAttribute("value", data[0].reponses[1].texte_reponse);
        textReponse2.setAttribute("id", "reponse2");
        textReponse2.setAttribute("color", "#000");
        textReponse2.setAttribute("align", "center");
        textReponse2.setAttribute("wrapCount", "25");
        textReponse2.setAttribute("position", "0 -0.4 0.01");
        textReponse2.setAttribute("scale", "0.6 0.6 0.6");
        infoBox.appendChild(textReponse2);

        const hitBoxRep1 = document.createElement("a-box");
        hitBoxRep1.setAttribute("position", "0 0 -0.01");
        hitBoxRep1.setAttribute("id", "HitBoxRep1");
        hitBoxRep1.setAttribute("width", "2");
        hitBoxRep1.setAttribute("height", "0.2");
        hitBoxRep1.setAttribute("depth", "0.01");
        hitBoxRep1.setAttribute("material", "color: #f00; opacity: 0;");
        textReponse1.appendChild(hitBoxRep1);
        hitBoxRep1.addEventListener("click", () => {
            
            if (isCorrect(data[0].reponses[0].texte_reponse)) {


                let money = document.querySelector("#money");
                money.setAttribute("value", parseInt(money.getAttribute("value")) + 2);
                textReponse1.removeChild(hitBoxRep1);
                textReponse2.removeChild(hitBoxRep2);
                cpt_resp += 1;
                nextQuestion(1);
                

            }
            else {
                setTimeout(() => {
                    textElement.setAttribute("value", "Wrong !");
                }, 1000);
                nextQuestion(1);
            }
            
        });
        

        const hitBoxRep2 = document.createElement("a-box");
        hitBoxRep2.setAttribute("position", "0 0 -0.01");
        hitBoxRep2.setAttribute("id", "HitBoxRep2");
        hitBoxRep2.setAttribute("width", "2");
        hitBoxRep2.setAttribute("height", "0.2");
        hitBoxRep2.setAttribute("depth", "0.01");
        hitBoxRep2.setAttribute("material", "opacity: 0");
        hitBoxRep2.addEventListener("click", () => {

            if (isCorrect(data[0].reponses[0].texte_reponse)) {

                let money = document.querySelector("#money");
                money.setAttribute("value", parseInt(money.getAttribute("value")) + 2);
                textReponse1.removeChild(hitBoxRep1);
                textReponse2.removeChild(hitBoxRep2);
                cpt_resp += 1;
                nextQuestion(1);
            }
            else {
                setTimeout(() => {
                    textElement.setAttribute("value", "Wrong !");
                }, 1000);
                nextQuestion(1);
            }
        });
        textReponse2.appendChild(hitBoxRep2);
    }, 2000);

}


function nextQuestion(id) {

    let question = document.querySelector("#question");
    
    console.log(data.length && id);
    if (id > data.length - 1) {
        question.setAttribute("value", "End of the test, you got " + cpt_resp + "/" + data.length + "And you got " + cpt_resp * 2 + " shop credits");
        document.querySelector("#reponse1").setAttribute("value", "");
        document.querySelector("#reponse2").setAttribute("value", "");
        return;
    }

    
    question.setAttribute("value", data[id].texte_question);
    

    

    let reponse1 = document.querySelector("#reponse1");
    let reponse2 = document.querySelector("#reponse2");

    // Update response values
    reponse1.setAttribute("value", data[id].reponses[0].texte_reponse);
    reponse2.setAttribute("value", data[id].reponses[1].texte_reponse);

    const hitBoxRep1 = document.createElement("a-box");
    hitBoxRep1.setAttribute("position", "0 0 -0.01");
    hitBoxRep1.setAttribute("id", "HitBoxRep1");
    hitBoxRep1.setAttribute("width", "2");
    hitBoxRep1.setAttribute("height", "0.2");
    hitBoxRep1.setAttribute("depth", "0.01");
    hitBoxRep1.setAttribute("material", "color: #f00; opacity: 0;");
    hitBoxRep1.addEventListener("click", () => {
        if (isCorrect(data[id].reponses[0].texte_reponse)) {
            let money = document.querySelector("#money");
            money.setAttribute("value", parseInt(money.getAttribute("value")) + 2);
            cpt_resp += 1;
            id += 1;
            nextQuestion(id);
        } else {
            setTimeout(() => {
                textElement.setAttribute("value", "Wrong !");
            }, 1000);
            id += 1;
            nextQuestion(id);
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
        if (isCorrect(data[id].reponses[1].texte_reponse)) {
            console.log(isCorrect(data[id].reponses[1].texte_reponse));
            let money = document.querySelector("#money");
            money.setAttribute("value", parseInt(money.getAttribute("value")) + 2);
            cpt_resp += 1;
            id += 1;
            nextQuestion(id);
        } else {
            setTimeout(() => {
                textElement.setAttribute("value", "Wrong !");
            }, 10000);
            id += 1;
            nextQuestion(id);
        }
    });
    reponse2.appendChild(hitBoxRep2);
    
    

}
    
    

function isCorrect(value) {
  
    if (correctAnswers.includes(value)) {
        return true
    }
    else {
        return false
    }

};




export { StartTest }; 
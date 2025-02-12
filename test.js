// test.js




async function StartTest() {

    const response = await fetch('./question.json');
    const data = await response.json();
    console.log(data);
    const camera = document.querySelector("#rig");
    camera.setAttribute("position", "1.8 1.2 2.3");
    camera.setAttribute("movement-controls", "constrainToNavMesh: true; controls: checkpoint;");

    const scene = document.querySelector("a-scene");

    const infoBox = document.createElement("a-box");
    infoBox.setAttribute("position", "1.8 2 0.8");
    infoBox.setAttribute("rotation", `-45 ${Math.PI / 2} 0`);
    infoBox.setAttribute("width", "3");
    infoBox.setAttribute("height", "0.7");
    infoBox.setAttribute("depth", "0.01");
    infoBox.setAttribute("material", "color: #fff; opacity: 0.9");
    const textElement = document.createElement("a-text");
    textElement.setAttribute("value", "debut du test, trouvez la bonne reponse");
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

        const textReponse1 = document.createElement("a-text");
        textReponse1.setAttribute("value", data[0].reponses[0].texte_reponse);
        textReponse1.setAttribute("color", "#000");
        textReponse1.setAttribute("align", "center");
        textReponse1.setAttribute("wrapCount", "25");
        textReponse1.setAttribute("position", "0 -0.2 0.01");
        textReponse1.setAttribute("scale", "0.6 0.6 0.6");
        textReponse1.addEventListener("click", () => {
            console.log("Réponse 1 cliquée");
        });
        infoBox.appendChild(textReponse1);

        const textReponse2 = document.createElement("a-text");
        textReponse2.setAttribute("value", data[0].reponses[1].texte_reponse);
        textReponse2.setAttribute("color", "#000");
        textReponse2.setAttribute("align", "center");
        textReponse2.setAttribute("wrapCount", "25");
        textReponse2.setAttribute("position", "0 -0.4 0.01");
        textReponse2.setAttribute("scale", "0.6 0.6 0.6");
        textReponse2.setAttribute("cursor-listener", "");
        textReponse2.addEventListener("click", () => {
            textReponse2.setAttribute("color", "#f00");
            console.log("Réponse 2 cliquée");
        });
        infoBox.appendChild(textReponse2);
    }, 5000);

}

export { StartTest }; 
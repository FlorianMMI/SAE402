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

        data[0].reponses.forEach((reponse, index) => {
            const textReponse = document.createElement("a-text");
            textReponse.setAttribute("value", reponse.texte_reponse);
            textReponse.setAttribute("color", "#000");
            textReponse.setAttribute("align", "center");
            textReponse.setAttribute("wrapCount", "25");
            textReponse.setAttribute("position", `0 ${-0.2 * (index + 1)} 0.01`);
            textReponse.setAttribute("scale", "0.6 0.6 0.6");

            textReponse.setAttribute("class", "clickable");
            textReponse.addEventListener("click", () => {
                console.log("Réponse sélectionnée :", reponse.texte_reponse);
            });

            infoBox.appendChild(textReponse);
        });
    }, 5000);

}

export { StartTest }; 
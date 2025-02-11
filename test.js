// test.js




async function StartTest() {

    const response = await fetch('./question.json');
    const data = await response.json();
    console.log(data);
    const camera = document.querySelector("#rig");
    camera.setAttribute("position", "1.8 1.5 2.3");
    camera.setAttribute("movement-controls", "constrainToNavMesh: true; controls: checkpoint;");

    const scene = document.querySelector("a-scene");

    const infoBox = document.createElement("a-box");
    infoBox.setAttribute("position", "1.8 1.8 1.5");
    infoBox.setAttribute("rotation", `-45 ${Math.PI / 2} 0`);
    infoBox.setAttribute("width", "0.5");
    infoBox.setAttribute("height", "0.7");
    infoBox.setAttribute("depth", "0.01");
    infoBox.setAttribute("material", "color: #fff; opacity: 0.9");
    infoBox.setAttribute("text", { value: "debut du test, trouvez la bonne reponse", color: "#000", align: "center", wrapCount: 25 });

    scene.appendChild(infoBox);

    setTimeout(() => {
        // Remplace le texte par la première question
        const premiereQuestion = data.questions && data.questions.length > 0 ? data.questions[0] : "Pas de question disponible";
        infoBox.setAttribute("text", `value: ${premiereQuestion}; color: #000; align: center; wrapCount: 25`);
    }, 2000);

}

export { StartTest }; 
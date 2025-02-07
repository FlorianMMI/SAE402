let data = [
  { car : [
    {
    "Wheel": "Roues",
    "Engine": "Moteur",
    "Body": "Carrosserie",
    "Headlight": "Phare",
    "Windshield": "Pare-brise",
    "Door": "Porte",
    "Seat": "Siège",
    "Steering Wheel": "Volant",
    "Pedal": "Pedale",
    "Rearview Mirror": "Rétroviseur"
  }
  ],
  bookdata : [
   {
    "Page": "Page",
    "Cover": "Couverture",
    "Title": "Titre",
    "Author": "Auteur",
    "Chapter": "Chapitre",
    "Paragraph": "Paragraphe",
    "Word": "Mot",
    "Sentence": "Phrase",
    "Punctuation": "Ponctuation",
    "Period": "Point"
  }


  ],
  computerdata : [
    {
    "Screen": "Ecran",
    "Keyboard": "Clavier",
    "Mouse": "Souris",
    "Webcam": "Webcam",
    "Microphone": "Microphone",
    "Speaker": "Haut-parleur",
    "Headphone": "Écouteur",
    "USB": "USB",
    "Port": "Port",
    "Cable": "Câble"
  }
],
}
]
// import { data } from "./data.js";

var scene = document.querySelector("a-scene");


// Création de la lumière
var light = document.createElement("a-light");
light.setAttribute("type", "point");
light.setAttribute("color", "#FFFFFF");
light.setAttribute("intensity", "1"); // Ajuste l'intensité pour éviter une trop forte luminosité
light.setAttribute("distance", "3");
light.setAttribute("position", "0 1 -2"); // Ajuste la position pour l'effet visuel


var computer = document.getElementById("computer-");

computer.addEventListener("mouseenter", function () {
  computer.setAttribute("animation", {
    property: "scale",
    to: "0.07 0.07 0.07",
    dur: 200
  });
  var compIcon = document.createElement("a-entity");
  compIcon.setAttribute("obj-model", "obj: #loupe-obj; mtl: #loupe-materiaux");
  compIcon.id = "computer-icon";
  compIcon.setAttribute("scale", "10 10 10");
  compIcon.setAttribute("position", "0 4 0");

  var camera = document.querySelector("[camera]");
  var cameraPosition = camera.getAttribute("position");
  var compPosition = computer.getAttribute("position");

  var dx = cameraPosition.x - compPosition.x;
  var dz = cameraPosition.z - compPosition.z;
  var rotationY = Math.atan2(dx, dz) * (180 / Math.PI) + 45;

  compIcon.setAttribute("rotation", `45 ${rotationY} 0`);
  computer.appendChild(compIcon);
});

computer.addEventListener("mouseleave", function () {
  var compIcon = document.getElementById("computer-icon");
  if (compIcon) {
    computer.removeChild(compIcon);
  }
  computer.setAttribute("animation", {
    property: "scale",
    to: "0.05 0.05 0.05",
    dur: 200
  });
});

computer.addEventListener("click", function () {
  const existingText = document.querySelector("#vocab-comp");
  if (existingText) {
    scene.removeChild(existingText);
    
  }


  const aText = document.createElement("a-text");
  

  let computerObj = data[0].computerdata[0];
  let lines = [];
  for (let key in computerObj) {
    lines.push(key + " --> " + computerObj[key]);
  }
  aText.setAttribute("id", "vocab-comp");
  aText.setAttribute("value", lines.join("\n"));
  aText.setAttribute("scale", "0.5 0.5 0.5");
  aText.setAttribute("position", `2 2.3 -9.47`);
  aText.setAttribute("align", "center");
  aText.setAttribute("color", "#FFF");
  

  

  scene.appendChild(aText);
  
});

// Création de l'entité livre (book)
var book = document.createElement("a-entity");
book = document.getElementById("book");
book.setAttribute("position", "2.2 1.443 -3");
drawer1 = document.getElementById("drawer1");
scene.appendChild(book);

book.addEventListener("mouseenter", function () {
  book.setAttribute("animation", {
    property: "scale",
    to: "0.6 0.6 0.6",
    dur: 200
  });
  var eyeIcon = document.createElement("a-entity");
  eyeIcon.setAttribute("obj-model", "obj: #loupe-obj; mtl: #loupe-materiaux");
  eyeIcon.id = "eye-icon";
  eyeIcon.setAttribute("position", "0 0.5 0");
  
  var camera = document.querySelector("[camera]");
  var cameraPosition = camera.getAttribute("position");
  var bookPosition = book.getAttribute("position");

  var dx = cameraPosition.x - bookPosition.x;
  var dz = cameraPosition.z - bookPosition.z;

  var rotationY = Math.atan2(dx, dz) * (180 / Math.PI) + 45;

  eyeIcon.setAttribute("rotation", `45 ${rotationY} 0`);
  book.appendChild(eyeIcon);
});

book.addEventListener("mouseleave", function () {
  var eyeIcon = document.getElementById("eye-icon");
  if (eyeIcon) {
    book.removeChild(eyeIcon);
  }
});

book.addEventListener("mouseleave", function () {
  book.setAttribute("animation", {
    property: "scale",
    to: "0.5 0.5 0.5",
    dur: 200
  });
});



book.addEventListener("click", function () { 

  const existingText = document.querySelector("#vocab");
  
  if (existingText) {
    scene.removeChild(existingText);
    
  }

 
  
  const aText = document.createElement("a-text");

  let bookObj = data[0].bookdata[0];
  let lines = [];
  for (let key in bookObj) {
    lines.push(key + " --> " + bookObj[key]);
  }
  aText.setAttribute("id", "vocab");
  aText.setAttribute("value", lines.join("\n"));
  aText.setAttribute("scale", "0.5 0.5 0.5");
  aText.setAttribute("position", `0 2.3 -9.47`);
  aText.setAttribute("align", "center");
  aText.setAttribute("color", "#FFF");
  aText.setAttribute("rotation", `0 0 0`);
  scene.appendChild(aText);
  
});


car = document.getElementById("car-");

console.log(car);

car.addEventListener("mouseenter", function () {
  car.setAttribute("animation", {
    property: "scale",
    to: "0.6 0.6 0.6",
    dur: 200
  });
  var carIcon = document.createElement("a-entity");
  carIcon.setAttribute("obj-model", "obj: #loupe-obj; mtl: #loupe-materiaux");
  carIcon.id = "car-icon";
  carIcon.setAttribute("position", "0 0.8 0");

  var camera = document.querySelector("[camera]");
  var cameraPosition = camera.getAttribute("position");
  var carPosition = car.getAttribute("position");

  var dx = cameraPosition.x - carPosition.x;
  var dz = cameraPosition.z - carPosition.z;

  var rotationY = Math.atan2(dx, dz) * (180 / Math.PI) + 45;

  carIcon.setAttribute("rotation", `45 ${rotationY} 0`);
  car.appendChild(carIcon);
});

car.addEventListener("mouseleave", function () {
  var carIcon = document.getElementById("car-icon");
  if (carIcon) {
    car.removeChild(carIcon);
  }
});

car.addEventListener("mouseleave", function () {
  car.setAttribute("animation", {
    property: "scale",
    to: "0.5 0.5 0.5",
    dur: 200
  });
});

car.addEventListener("click", function () {

  const existingText = document.querySelector("#vocab");
  
  if (existingText) {
    scene.removeChild(existingText);
    
  }

  const cameraEl = document.querySelector("[camera]");
  const camWorldPos = new THREE.Vector3();
  cameraEl.object3D.getWorldPosition(camWorldPos);
  const forwardDir = new THREE.Vector3();
  cameraEl.object3D.getWorldDirection(forwardDir);

  const offset = 1;
  const textPosition = camWorldPos.clone().add(forwardDir.multiplyScalar(offset));

  var camPosition = cameraEl.getAttribute("position");
  var camRotation = cameraEl.getAttribute("rotation");
  let dist = 2;
  let rad = camRotation.y * (Math.PI / 180);
  let newX = camPosition.x - dist * Math.sin(rad);
  let newZ = camPosition.z - dist * Math.cos(rad);
  let newY = camPosition.y; 

  const aText = document.createElement("a-text");
  const textTitle = document.createElement("a-text");
  textTitle.id = "a-text-title";
  textTitle.setAttribute("value", "vocabulary");
  textTitle.setAttribute("align", "center");
  textTitle.setAttribute("color", "#FFD700");
  textTitle.setAttribute("position", `${newX} ${newY + 0.7} ${newZ}`);
  textTitle.setAttribute("rotation", `0 ${camRotation.y} 0`);
  textTitle.setAttribute("scale", "0.7 0.7 0.7");
  scene.appendChild(textTitle);

  let carObj = data[0].car[0];
  let lines = [];
  for (let key in carObj) {
    lines.push(key + " --> " + carObj[key]);
  }
  aText.setAttribute("id", "vocab"); 
  aText.setAttribute("value", lines.join("\n"));
  aText.setAttribute("scale", "0.5 0.5 0.5");
  aText.setAttribute("position", `${newX} ${newY - 0.2} ${newZ}`);
  aText.setAttribute("align", "center");
  aText.setAttribute("color", "#000");
  aText.setAttribute("rotation", `0 ${camRotation.y} 0`);

  const aBox = document.createElement("a-box");
  aBox.setAttribute("scale", "0.7 0.7 0.7");
  aBox.setAttribute("color", "#FFF");
  aBox.setAttribute("width", "3");
  aBox.setAttribute("height", "3");
  aBox.setAttribute("depth", "0.001");
  aBox.setAttribute("rotation", `0 ${camRotation.y} 0`);
  const boxOffset = 0.1;
  const boxX = newX - boxOffset * Math.sin(rad);
  const boxZ = newZ - boxOffset * Math.cos(rad);
  aBox.setAttribute("position", `${boxX} ${newY} ${boxZ}`);
  
  scene.appendChild(aText);
  scene.appendChild(aBox);
});

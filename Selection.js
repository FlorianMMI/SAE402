let data = [
  { voiture : [
      "Wheel", "Engine", "Body", "Headlight", "Windshield", "Door", "Seat", "Steering Wheel", "Pedal", "Rearview Mirror"
  ],
  bookdata : [
    "Page", "Cover", "Title", "Author", "Chapter", "Paragraph", "Word", "Sentence", "Punctuation", "Period"
  ]
}
]
// import { data } from "./data.js";

var scene = document.querySelector("a-scene");

var cylinder = document.getElementById("cylindre");

// Création de la lumière
var light = document.createElement("a-light");
light.setAttribute("type", "point");
light.setAttribute("color", "#FFFFFF");
light.setAttribute("intensity", "1"); // Ajuste l'intensité pour éviter une trop forte luminosité
light.setAttribute("distance", "3");
light.setAttribute("position", "0 1 -2"); // Ajuste la position pour l'effet visuel
cylinder.appendChild(light);

scene.appendChild(cylinder);

// Gestion du hover sur le cylindre
cylinder.addEventListener("mouseenter", function () {
  cylinder.setAttribute("material", {
    emissive: "#FFFFFF",
    emissiveIntensity: 0.3,
  });
  cylinder.setAttribute("animation", {
    property: "scale",
    to: "1.1 1.1 1.1",
    dur: 200
  });
});

cylinder.addEventListener("click", function () {
  // Affiche un menu
  var menu = document.createElement("div");
  menu.id = "menu";
  menu.style.width = "200px";
  menu.style.textAlign = "left";
  menu.style.position = "absolute";
  menu.style.top = "50%";
  menu.style.right = "1%";
  menu.style.transform = "translate(-50%, -50%)";
  menu.style.padding = "10px";
  menu.style.backgroundColor = "#FFF";
  menu.style.border = "1px solid #000";

  // Ajoute les données de data.js au menu
  var content = "<p class='titre'>Vocabulary</p><ul>";
  data[0].voiture.forEach(function (item) {
    content += "<li>" + item + "</li>";
  });
  content += "</ul>";
 
  
  content += "<button class = 'btn' onclick='closeMenu()'>I learn !</button>";
  


  var style = document.createElement("style");
  style.innerHTML = `
    .titre {
      display : flex;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
      color: #000;
      margin-bottom: 10px;
    }

    .btn {
      display: block;
      width: 100%;
      padding: 10px;
      background-color: #000;
      color: #FFF;
      border: none;
      cursor: pointer;
    }
  `;

  document.head.appendChild(style);
  menu.innerHTML = content;
  document.body.appendChild(menu);
});

function closeMenu() {
  var menu = document.getElementById("menu");
  if (menu) {
    document.body.removeChild(menu);
  }
}

cylinder.addEventListener("mouseleave", function () {
  cylinder.setAttribute("material", {
    emissive: "#000000", // Désactive la luisance
    emissiveIntensity: 0
  });
  cylinder.setAttribute("animation", {
    property: "scale",
    to: "1 1 1",
    dur: 200
  });
});

var book = document.createElement("a-entity");
var book = document.getElementById("book");
book.setAttribute("position", "1 0 -4");
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

  eyeIcon.setAttribute("rotation", `45 ${rotationY} 0`); // Oriente l'icône vers la caméra
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

  var existingGui = scene.querySelector("a-gui-flex-container");
  if (existingGui) {
    existingGui.parentNode.removeChild(existingGui);
  }



  // Affiche un menu
  var guiContainer = document.createElement("a-gui-flex-container");
  guiContainer.setAttribute("layout", "type: box; margin: 0.05;");
  guiContainer.setAttribute("flex-direction", "column");
  guiContainer.setAttribute("justify-content", "center");
  guiContainer.setAttribute("align-items", "center");
  guiContainer.setAttribute("width", "1.5");
  guiContainer.setAttribute("height", "auto");
  guiContainer.setAttribute("position", "0 1.5 -2");

  
  var camera = document.querySelector("[camera]");
  if (camera) {
    var camPosition = camera.getAttribute("position");
    var camRotation = camera.getAttribute("rotation");
    var distance = 2; // distance from the camera
    var rad = camRotation.y * Math.PI / 180;
    var newX = camPosition.x - distance * Math.sin(rad);
    var newZ = camPosition.z - distance * Math.cos(rad);
    var newY = camPosition.y; // same vertical level as the camera
    
    guiContainer.setAttribute("position", `${newX} ${newY} ${newZ}`);
    guiContainer.setAttribute("rotation", `0 ${camRotation.y} 0`);
  }

  var title = document.createElement("a-gui-label");
  title.setAttribute("value", "Vocabulary");
  title.setAttribute("width", "1.5");
  title.setAttribute("height", "0.3");
  guiContainer.appendChild(title);

  data[0].bookdata.forEach(function(item) {
    var button = document.createElement("a-gui-button");
    button.setAttribute("value", item);
    button.setAttribute("width", "1.5");
    button.setAttribute("height", "0.2");
    guiContainer.appendChild(button);
  });

  scene.appendChild(guiContainer);

});




// book.addEventListener("click", function () {
//   // Affiche un menu
//   var menu = document.createElement("div");
//   menu.id = "menu";
//   menu.style.width = "200px";
//   menu.style.textAlign = "left";
//   menu.style.position = "absolute";
//   menu.style.top = "50%";
//   menu.style.right = "1%";
//   menu.style.transform = "translate(-50%, -50%)";
//   menu.style.padding = "10px";
//   menu.style.backgroundColor = "#FFF";
//   menu.style.border = "1px solid #000";

//   // Ajoute les données de data.js au menu
//   var content = "<p class='titre'>Vocabulary</p><ul>";
//   data[0].book.forEach(function (item) {
//     content += "<li>" + item + "</li>";
//   });
//   content += "</ul>";
 
  
//   content += "<button class = 'btn' onclick='closeMenu()'>I learn !</button>";
  


//   var style = document.createElement("style");
//   style.innerHTML = `
//     .titre {
//       display : flex;
//       justify-content: center;
//       font-weight: bold;
//       font-size: 18px;
//       color: #000;
//       margin-bottom: 10px;
//     }

//     .btn {
//       display: block;
//       width: 100%;
//       padding: 10px;
//       background-color: #000;
//       color: #FFF;
//       border: none;
//       cursor: pointer;
//     }

//     .btn:hover {
//       background-color: #555;
//     }
//   `;

//   document.head.appendChild(style);
//   menu.innerHTML = content;
//   document.body.appendChild(menu);
// });
// Ajoute un bouton pour fermer le menu en VR

// Removed VR closeButton code to prevent errors as "menu" is created within click events.

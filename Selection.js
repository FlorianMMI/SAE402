let data = [
  { voiture : [
      "Wheel", "Engine", "Body", "Headlight", "Windshield", "Door", "Seat", "Steering Wheel", "Pedal", "Rearview Mirror"
  ],
  book : [
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
  eyeIcon.setAttribute("obj-model", "/Model/Loupe/Loupe.obj");
  eyeIcon.id = "eye-icon";
  eyeIcon.setAttribute("material", "src: url(/Model/Loupe/loupe.mtl)");
  eyeIcon.setAttribute("position", "0 0.3 0");
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
  data[0].book.forEach(function (item) {
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

    .btn:hover {
      background-color: #555;
    }
  `;

  document.head.appendChild(style);zd
  menu.innerHTML = content;
  document.body.appendChild(menu);
});
// Ajoute un bouton pour fermer le menu en VR
var closeButton = document.createElement("a-box");
closeButton.setAttribute("position", "0 0.1 0");
closeButton.setAttribute("depth", "0.05");
closeButton.setAttribute("height", "0.1");
closeButton.setAttribute("width", "0.2");
closeButton.setAttribute("color", "#FF0000");
closeButton.setAttribute("class", "clickable");
closeButton.setAttribute("text", "value: Close; color: #FFF; align: center;");

closeButton.addEventListener("click", function () {
  var menu = document.getElementById("menu");
  if (menu) {
    scene.removeChild(menu);
  }
});

menu.appendChild(closeButton);
scene.appendChild(menu);

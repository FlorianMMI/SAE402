let data = [
  { voiture : [
      "Wheel", "Engine", "Body", "Headlight", "Windshield", "Door", "Seat", "Steering Wheel", "Pedal", "Rearview Mirror"
  ]}
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
  `;
  document.head.appendChild(style);
  content += "<button onclick='closeMenu()'>I learn !</button>";
  menu.innerHTML = content;



  document.body.appendChild(menu);
});

function closeMenu() {
  var menu = document.querySelector("div");
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

// Si tu veux aussi que l'effet fonctionne sur un livre
var book = document.createElement("a-entity");
book.setAttribute("gltf-model", "#Book2");
book.setAttribute("position", "1 1.6 -4");
scene.appendChild(book);

book.addEventListener("mouseenter", function () {
  book.setAttribute("animation", {
    property: "scale",
    to: "1.1 1.1 1.1",
    dur: 200
  });
});

book.addEventListener("mouseleave", function () {
  book.setAttribute("animation", {
    property: "scale",
    to: "1 1 1",
    dur: 200
  });
});

// Imported dependencies and helper functions
import { StartTest } from "./test.js";
import { getRequest } from "./api-request.js";

// Retrieve saved user input from localStorage
let storedUserInput = JSON.parse(localStorage.getItem("currentUserInput"));
if (storedUserInput) {
  console.log("Stored user input:", storedUserInput);
} else {
  console.log("No stored user input found");
}

// Fetch user data from API using the stored input
const userData = await getRequest("user?name=" + storedUserInput);

// Fetch local JSON data containing vocabulary info
const response = await fetch("./data.json");
const data = await response.json();

// Get the A-Frame scene element from the DOM
var scene = document.querySelector("a-scene");

// Initialize counter for collected vocabulary objects
let cpt_obj = 0;

// If the user round is greater than 0, display all vocabulary texts and the test prompt
if (userData[0].round > 0) {
  // Extract vocabulary objects from the JSON data
  cpt_obj = 4;
  const computerObj = data[0].computerdata[0];
  const bookObj = data[0].bookdata[0];
  const paintObj = data[0].paintData[0];
  const carObj = data[0].car[0];

  // Create and append Computer vocabulary text
  const compText = document.createElement("a-text");
  let compLines = [];
  for (let key in computerObj) {
    compLines.push(key + " --> " + computerObj[key]);
  }
  compText.setAttribute("id", "vocab-comp");
  compText.setAttribute("value", compLines.join("\n"));
  compText.setAttribute("scale", "0.5 0.5 0.5");
  compText.setAttribute("position", "-1.2 2.1 -9.47");
  compText.setAttribute("align", "left");
  compText.setAttribute("font", "./assets/font/Gloria-msdf.json");
  compText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  compText.setAttribute("negate", "false");
  compText.setAttribute("color", "#FFF");
  scene.appendChild(compText);

  // Create and append Book vocabulary text
  const bookText = document.createElement("a-text");
  let bookLines = [];
  for (let key in bookObj) {
    bookLines.push(key + " --> " + bookObj[key]);
  }
  bookText.setAttribute("id", "vocab-book");
  bookText.setAttribute("value", bookLines.join("\n"));
  bookText.setAttribute("scale", "0.5 0.5 0.5");
  bookText.setAttribute("position", "-1.2 3 -9.47");
  bookText.setAttribute("align", "left");
  bookText.setAttribute("font", "./assets/font/Gloria-msdf.json");
  bookText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  bookText.setAttribute("negate", "false");
  bookText.setAttribute("color", "#FFF");
  scene.appendChild(bookText);

  // Create and append Paint vocabulary text
  const paintText = document.createElement("a-text");
  let paintLines = [];
  for (let key in paintObj) {
    paintLines.push(key + " --> " + paintObj[key]);
  }
  paintText.setAttribute("id", "vocab-paint");
  paintText.setAttribute("value", paintLines.join("\n"));
  paintText.setAttribute("scale", "0.5 0.5 0.5");
  paintText.setAttribute("position", "-2.5 2.1 -9.47");
  paintText.setAttribute("align", "left");
  paintText.setAttribute("font", "./assets/font/Gloria-msdf.json");
  paintText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  paintText.setAttribute("negate", "false");
  paintText.setAttribute("color", "#FFF");
  scene.appendChild(paintText);

  // Create and append Car vocabulary text
  const carText = document.createElement("a-text");
  let carLines = [];
  for (let key in carObj) {
    carLines.push(key + " --> " + carObj[key]);
  }
  carText.setAttribute("id", "vocab-car");
  carText.setAttribute("value", carLines.join("\n"));
  carText.setAttribute("scale", "0.5 0.5 0.5");
  carText.setAttribute("position", "-2.5 3 -9.47");
  carText.setAttribute("align", "left");
  carText.setAttribute("font", "./assets/font/Gloria-msdf.json");
  carText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  carText.setAttribute("negate", "false");
  carText.setAttribute("color", "#FFF");
  scene.appendChild(carText);

  // Create the test prompt text and a hidden test button
  const foundText = document.createElement("a-text");
  foundText.setAttribute("id", "found-text");
  foundText.setAttribute("value", "Proceed to the test");
  foundText.setAttribute("position", "1.2 2.5 -9.47");
  foundText.setAttribute("scale", "0.5 0.5 0.5");
  foundText.setAttribute("font", "./assets/font/Gloria-msdf.json");
  foundText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  foundText.setAttribute("negate", "false");
  foundText.setAttribute("class", "clickable");

  const testBox = document.createElement("a-box");
  testBox.setAttribute("id", "test-button");
  testBox.setAttribute("visible", "false");
  testBox.setAttribute("position", "1.2 2.5 -9.47");
  testBox.setAttribute("width", "2");
  testBox.setAttribute("height", "0.5");

  // Add click event to testBox to remove vocabulary texts and start the test
  testBox.addEventListener("click", function () {
    [
      "vocab-comp",
      "vocab-book",
      "vocab-paint",
      "vocab-car",
      "vocab-all",
    ].forEach(function (id) {
      let el = document.getElementById(id);
      if (el) {
        scene.removeChild(el);
      }
    });
    StartTest();
  });

  scene.appendChild(testBox);
  scene.appendChild(foundText);
}

// Create and append counter text (displays how many objects have been found)
const counterText = document.createElement("a-text");
counterText.setAttribute("id", "counter-text");
counterText.setAttribute("value", "Object " + cpt_obj + "/4");
counterText.setAttribute("align", "center");
counterText.setAttribute("position", "2.5 3.3 -9.47");
counterText.setAttribute("font", "./assets/font/Gloria-msdf.json");
counterText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
counterText.setAttribute("negate", "false");
counterText.setAttribute("scale", "0.5 0.5 0.5");
scene.appendChild(counterText);

/* --------------------------
   Computer Object Events
--------------------------- */
var computer = document.getElementById("computer-");

// Mouse enter event for the computer
computer.addEventListener("mouseenter", function () {
  computer.setAttribute("animation", {
    property: "scale",
    to: "0.07 0.07 0.07",
    dur: 200,
  });
  var compIcon = document.createElement("a-entity");
  compIcon.setAttribute("obj-model", "obj: #loupe-obj; mtl: #loupe-materiaux");
  compIcon.id = "computer-icon";
  compIcon.setAttribute("scale", "10 10 10");
  compIcon.setAttribute("position", "0 4 0");

  // Calculate rotation based on the camera position relative to the computer
  var camera = document.querySelector("[camera]");
  var cameraPosition = camera.getAttribute("position");
  var compPosition = computer.getAttribute("position");
  var dx = cameraPosition.x - compPosition.x;
  var dz = cameraPosition.z - compPosition.z;
  var rotationY = Math.atan2(dx, dz) * (180 / Math.PI) + 45;
  compIcon.setAttribute("rotation", `45 ${rotationY} 0`);
  computer.appendChild(compIcon);
});

// Mouse leave event for the computer
computer.addEventListener("mouseleave", function () {
  var compIcon = document.getElementById("computer-icon");
  if (compIcon) {
    computer.removeChild(compIcon);
  }
  computer.setAttribute("animation", {
    property: "scale",
    to: "0.05 0.05 0.05",
    dur: 200,
  });
});

// Click event for the computer
computer.addEventListener("click", function () {
  // Remove text if it already exists to avoid duplicates
  const existingText = document.querySelector("#vocab-comp");
  if (existingText) {
    scene.removeChild(existingText);
    cpt_obj--;
  }
  cpt_obj++;
  isFound();
  counterText.setAttribute("value", "Objet " + cpt_obj + "/4");

  // Create the vocabulary text for computer
  const aText = document.createElement("a-text");
  let computerObj = data[0].computerdata[0];
  let lines = [];
  for (let key in computerObj) {
    lines.push(key + " --> " + computerObj[key]);
  }
  aText.setAttribute("id", "vocab-comp");
  aText.setAttribute("value", lines.join("\n"));
  aText.setAttribute("scale", "0.5 0.5 0.5");
  aText.setAttribute("position", "-1.2 2.1 -9.47");
  aText.setAttribute("font", "./assets/font/Gloria-msdf.json");
  aText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  aText.setAttribute("negate", "false");
  aText.setAttribute("align", "left");
  aText.setAttribute("color", "#FFF");

  scene.appendChild(aText);
});

/* --------------------------
   Book Object Events
--------------------------- */
var book = document.getElementById("book");
book.setAttribute("position", "5.950 2.00 0.650");

// Mouse enter event for the book
book.addEventListener("mouseenter", function () {
  book.setAttribute("animation", {
    property: "scale",
    to: "0.4 0.4 0.4",
    dur: 200,
  });
  var eyeIcon = document.createElement("a-entity");
  eyeIcon.setAttribute("obj-model", "obj: #loupe-obj; mtl: #loupe-materiaux");
  eyeIcon.id = "eye-icon";
  eyeIcon.setAttribute("position", "0 0.5 0");

  // Calculate rotation based on the camera position relative to the book
  var camera = document.querySelector("[camera]");
  var cameraPosition = camera.getAttribute("position");
  var bookPosition = book.getAttribute("position");
  var dx = cameraPosition.x - bookPosition.x;
  var dz = cameraPosition.z - bookPosition.z;
  var rotationY = Math.atan2(dx, dz) * (180 / Math.PI) + 45;
  eyeIcon.setAttribute("rotation", `45 ${rotationY} 0`);
  book.appendChild(eyeIcon);
});

// Mouse leave events for the book (remove icon and reset scale)
book.addEventListener("mouseleave", function () {
  var eyeIcon = document.getElementById("eye-icon");
  if (eyeIcon) {
    book.removeChild(eyeIcon);
  }
  book.setAttribute("animation", {
    property: "scale",
    to: "0.3 0.3 0.3",
    dur: 200,
  });
});

// Click event for the book
book.addEventListener("click", function () {
  const existingText = document.querySelector("#vocab-book");
  if (existingText) {
    scene.removeChild(existingText);
    cpt_obj--;
  }
  cpt_obj++;
  isFound();
  counterText.setAttribute("value", "Objet " + cpt_obj + "/4");

  // Create the vocabulary text for book
  const aText = document.createElement("a-text");
  let bookObj = data[0].bookdata[0];
  let lines = [];
  for (let key in bookObj) {
    lines.push(key + " --> " + bookObj[key]);
  }
  aText.setAttribute("id", "vocab-book");
  aText.setAttribute("value", lines.join("\n"));
  aText.setAttribute("scale", "0.5 0.5 0.5");
  aText.setAttribute("position", "-1.2 3 -9.47");
  aText.setAttribute("align", "left");
  aText.setAttribute("font", "./assets/font/Gloria-msdf.json");
  aText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  aText.setAttribute("negate", "false");
  aText.setAttribute("color", "#FFF");
  aText.setAttribute("rotation", "0 0 0");
  scene.appendChild(aText);
});

/* --------------------------
   Paint Object Events
--------------------------- */
var paint = document.getElementById("paint-");

// Mouse enter event for the paint object
paint.addEventListener("mouseenter", function () {
  paint.setAttribute("animation", {
    property: "scale",
    to: "0.11 0.11 0.11",
    dur: 200,
  });
  var brushIcon = document.createElement("a-entity");
  brushIcon.setAttribute("obj-model", "obj: #loupe-obj; mtl: #loupe-materiaux");
  brushIcon.id = "brush-icon";
  brushIcon.setAttribute("position", "0 5 -5");
  brushIcon.setAttribute("scale", "5 5 5");

  // Calculate rotation based on the camera position relative to the paint object
  var camera = document.querySelector("[camera]");
  var cameraPosition = camera.getAttribute("position");
  var paintPosition = paint.getAttribute("position");
  var dx = cameraPosition.x - paintPosition.x;
  var dz = cameraPosition.z - paintPosition.z;
  var rotationY = Math.atan2(dx, dz) * (180 / Math.PI) + 45;
  brushIcon.setAttribute("rotation", `45 ${rotationY} 0`);
  paint.appendChild(brushIcon);
});

// Mouse leave event for the paint object
paint.addEventListener("mouseleave", function () {
  var brushIcon = document.getElementById("brush-icon");
  if (brushIcon) {
    paint.removeChild(brushIcon);
  }
  paint.setAttribute("animation", {
    property: "scale",
    to: "0.1 0.1 0.1",
    dur: 200,
  });
});

// Click event for the paint object
paint.addEventListener("click", function () {
  const existingText = document.querySelector("#vocab-paint");
  if (existingText) {
    scene.removeChild(existingText);
    cpt_obj--;
  }
  cpt_obj++;
  isFound();
  counterText.setAttribute("value", "Objet " + cpt_obj + "/4");

  // Create the vocabulary text for paint
  const aText = document.createElement("a-text");
  let paintObj = data[0].paintData[0];
  let lines = [];
  for (let key in paintObj) {
    lines.push(key + " --> " + paintObj[key]);
  }
  aText.setAttribute("id", "vocab-paint");
  aText.setAttribute("value", lines.join("\n"));
  aText.setAttribute("scale", "0.5 0.5 0.5");
  aText.setAttribute("position", "-2.5 2.1 -9.47");
  aText.setAttribute("align", "left");
  aText.setAttribute("font", "./assets/font/Gloria-msdf.json");
  aText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  aText.setAttribute("negate", "false");
  aText.setAttribute("color", "#FFF");
  aText.setAttribute("rotation", "0 0 0");
  scene.appendChild(aText);
});

/* --------------------------
   Car Object Events
--------------------------- */
let car = document.getElementById("car-");
console.log(car);

// Mouse enter event for the car
car.addEventListener("mouseenter", function () {
  car.setAttribute("animation", {
    property: "scale",
    to: "0.6 0.6 0.6",
    dur: 200,
  });
  var carIcon = document.createElement("a-entity");
  carIcon.setAttribute("obj-model", "obj: #loupe-obj; mtl: #loupe-materiaux");
  carIcon.id = "car-icon";
  carIcon.setAttribute("position", "0 0.8 0");

  // Calculate rotation based on the camera position relative to the car
  var camera = document.querySelector("[camera]");
  var cameraPosition = camera.getAttribute("position");
  var carPosition = car.getAttribute("position");
  var dx = cameraPosition.x - carPosition.x;
  var dz = cameraPosition.z - carPosition.z;
  var rotationY = Math.atan2(dx, dz) * (180 / Math.PI) + 45;
  carIcon.setAttribute("rotation", `45 ${rotationY} 0`);
  car.appendChild(carIcon);
});

// Mouse leave events for the car (remove icon and reset scale)
car.addEventListener("mouseleave", function () {
  var carIcon = document.getElementById("car-icon");
  if (carIcon) {
    car.removeChild(carIcon);
  }
  car.setAttribute("animation", {
    property: "scale",
    to: "0.5 0.5 0.5",
    dur: 200,
  });
});

// Click event for the car
car.addEventListener("click", function () {
  const existingText = document.querySelector("#vocab-car");
  if (existingText) {
    scene.removeChild(existingText);
    cpt_obj--;
  }
  cpt_obj++;
  isFound();
  counterText.setAttribute("value", "Objet " + cpt_obj + "/4");

  // Create the vocabulary text for car
  const aText = document.createElement("a-text");
  let carObj = data[0].car[0];
  let lines = [];
  for (let key in carObj) {
    lines.push(key + " --> " + carObj[key]);
  }
  aText.setAttribute("id", "vocab-car");
  aText.setAttribute("value", lines.join("\n"));
  aText.setAttribute("scale", "0.5 0.5 0.5");
  aText.setAttribute("position", "-2.5 3 -9.47");
  aText.setAttribute("align", "left");
  aText.setAttribute("font", "./assets/font/Gloria-msdf.json");
  aText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
  aText.setAttribute("negate", "false");
  aText.setAttribute("color", "#FFF");
  aText.setAttribute("rotation", "0 0 0");
  scene.appendChild(aText);
});

/* --------------------------
   Helper Function: isFound()
   --------------------------
   Checks if all vocabulary objects have been found.
   If counter equals 4, display the test prompt and bind the event to start a test.
--------------------------- */
function isFound() {
  if (cpt_obj === 4) {
    const foundText = document.createElement("a-text");
    foundText.setAttribute("id", "found-text");
    foundText.setAttribute("value", "Proceed to the test");
    foundText.setAttribute("position", "1.2 2.5 -9.47");
    foundText.setAttribute("scale", "0.5 0.5 0.5");
    foundText.setAttribute("font", "./assets/font/Gloria-msdf.json");
    foundText.setAttribute("font-image", "./assets/font/Gloria-msdf.png");
    foundText.setAttribute("negate", "false");

    const testBox = document.createElement("a-box");
    testBox.setAttribute("id", "test-button");
    testBox.setAttribute("visible", "false");
    testBox.setAttribute("position", "1.2 2.5 -9.47");
    testBox.setAttribute("width", "2");
    testBox.setAttribute("height", "0.5");

    foundText.setAttribute("class", "clickable");
    testBox.addEventListener("click", function () {
      console.log("found");
      ["vocab-comp", "vocab-book", "vocab-paint", "vocab-car"].forEach(
        function (id) {
          var el = document.getElementById(id);
          if (el) {
            scene.removeChild(el);
          }
        }
      );
      StartTest();
    });

    scene.appendChild(testBox);
    scene.appendChild(foundText);
  }
}

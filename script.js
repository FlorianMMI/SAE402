var drawer1 = document.querySelector("#drawer1");

function render() {
  drawer1.addEventListener("click", function () {
    drawer1.setAttribute(
      "position",
      "#" + Math.floor(Math.random() * 16777215).toString(16)
    );
  });

  drawer1.addEventListener("triggerdown", function () {
    drawer1.setAttribute("position", "-2.6 0 -4.5");
  });
}
// function checkCollision() {
//   var camera = document.querySelector("[camera]");
//   var cameraPosition = camera.getAttribute("position");
//   var cylinderPosition = cylinder.getAttribute("position");

//   var dx = cameraPosition.x - cylinderPosition.x;
//   var dy = cameraPosition.y - cylinderPosition.y;
//   var dz = cameraPosition.z - cylinderPosition.z;

//   var distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

//   if (distance < 1.5) {
//     cylinder.setAttribute(
//       "color",
//       "#" + Math.floor(Math.random() * 16777215).toString(16)
//     );
//   }
// }

// setInterval(checkCollision, 100);
// render();

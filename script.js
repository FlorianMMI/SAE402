AFRAME.registerComponent("thumbstick-move", {
  init: function () {
    let rig = document.getElementById("rig");
    let camera = document.getElementById("camera");

    this.el.addEventListener("thumbstickmoved", function (evt) {
      let x = evt.detail.x; // Gauche/Droite
      let y = evt.detail.y; // Avant/Arrière

      if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) return; // Évite les petits mouvements parasites

      let speed = 0.1; // Vitesse de déplacement augmentée

      // Récupère la direction de la caméra
      let direction = new THREE.Vector3();
      camera.object3D.getWorldDirection(direction);
      direction.y = 0; // Ignore la hauteur pour éviter le mouvement vertical
      direction.normalize();

      // Calcul du mouvement
      let strafe = new THREE.Vector3()
        .crossVectors(new THREE.Vector3(0, 1, 0), direction)
        .multiplyScalar(x);
      let move = direction.multiplyScalar(y); // On garde y sans inverser cette fois

      let finalMove = new THREE.Vector3()
        .addVectors(strafe, move)
        .multiplyScalar(speed);

      // Appliquer le mouvement
      rig.object3D.position.add(finalMove);
    });
  },
});

function moveToPosition(object, targetPosition) {
  var currentPosition = object.getAttribute("position");
  var step = 0.01;

  function animate() {
    var dx = targetPosition.x - currentPosition.x;
    var dy = targetPosition.y - currentPosition.y;
    var dz = targetPosition.z - currentPosition.z;

    var distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (distance < step) {
      object.setAttribute("position", targetPosition);
      return;
    }

    currentPosition.x += (dx * step) / distance;
    currentPosition.y += (dy * step) / distance;
    currentPosition.z += (dz * step) / distance;

    object.setAttribute("position", currentPosition);

    requestAnimationFrame(animate);
  }

  animate();
}

document.querySelector("#drawer1").addEventListener("click", function () {
  var drawer1 = document.querySelector("#drawer1");
  if (
    drawer1.getAttribute("position").x == -2.6 &&
    drawer1.getAttribute("position").y == 0 &&
    drawer1.getAttribute("position").z == -5
  ) {
    moveToPosition(drawer1, { x: -2.6, y: 0, z: -4.35 });
  } else {
    moveToPosition(drawer1, { x: -2.6, y: 0, z: -5 });
  }

  var car = document.querySelector("#car-");;
  if (
    car.getAttribute("position").x == -1.9 &&
    car.getAttribute("position").y == 0.26 &&
    car.getAttribute("position").z == -7.5
  ) {
    moveToPosition(car, { x: -1.9, y: 0.26, z: -6.85 });
  } else {
    moveToPosition(car, { x: -1.9, y: 0.26, z: -7.5 });  
  }
});

document.querySelector("#drawer2").addEventListener("click", function () {
  var drawer2 = document.querySelector("#drawer2");
  if (
    drawer2.getAttribute("position").x == -2.6 &&
    drawer2.getAttribute("position").y == 0.5 &&
    drawer2.getAttribute("position").z == -5
  ) {
    moveToPosition(drawer2, { x: -2.6, y: 0.5, z: -4.35 });
  } else {
    moveToPosition(drawer2, { x: -2.6, y: 0.5, z: -5 });
  }
});

document.querySelector("#drawer3").addEventListener("click", function () {
  var drawer3 = document.querySelector("#drawer3");
  if (
    drawer3.getAttribute("position").x == -2.6 &&
    drawer3.getAttribute("position").y == 1 &&
    drawer3.getAttribute("position").z == -5
  ) {
    moveToPosition(drawer3, { x: -2.6, y: 1, z: -4.35 });
  } else {
    moveToPosition(drawer3, { x: -2.6, y: 1, z: -5 });
  }
});

let renderCharacter = function (){
  let ascene = document.querySelector('a-scene');
  let acharacter = document.createElement('a-entity');
  // let character = document.getElementById('character');
  acharacter.setAttribute('gltf-model', '#character');
  acharacter.setAttribute('scale', '1.75 1.75 1.75');
  acharacter.setAttribute('position', '-2 0 -8');
  acharacter.setAttribute('id', 'characters');
  acharacter.setAttribute('animation-mixer', 'clip: CharacterArmature|Wave; loop: repeat; timeScale: 1');
  ascene.appendChild(acharacter);

  acharacter.addEventListener("click", function () {
      console.log("click");
      let anim = acharacter.getAttribute('animation-mixer');
      console.log(anim);
      acharacter.setAttribute('animation-mixer', 'clip: CharacterArmature|Death; loop: repeat; timeScale: 1');
    });
};
renderCharacter ();
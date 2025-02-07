AFRAME.registerComponent("thumbstick-move", {
  init: function () {
    let rig = document.getElementById("rig");
    let camera = document.getElementById("camera");

    if (!rig || !camera) {
      console.error("Rig or Camera element not found");
      return;
    }

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

let renderCharacter = function () {
  let animations = ["Punch_Right", "Punch_Left", "Kick_Right", "Kick_Left"];
  let emote=["Roll", "Death","Gun_Shoot"]

  let ascene = document.querySelector('a-scene');
  let acharacter = document.createElement('a-entity');
  acharacter.setAttribute('gltf-model', '#character');
  acharacter.setAttribute('scale', '1.75 1.75 1.75');
  acharacter.setAttribute('position', '-2 0 -8');
  acharacter.setAttribute('id', 'characters');
  acharacter.setAttribute('animation-mixer', 'clip: CharacterArmature|Idle; loop: repeat; timeScale: 1');
  ascene.appendChild(acharacter);

  acharacter.addEventListener("click", function () {
    console.log("click");
    acharacter.setAttribute('animation-mixer', 'clip: CharacterArmature|Walk; loop: repeat; timeScale: 1');
    acharacter.setAttribute('rotation', '0 90 0');
    acharacter.setAttribute('animation', 'property: position; to: 0 0 -8; dur: 1000; easing: linear');

    setTimeout(function () {
      acharacter.setAttribute('animation-mixer', 'clip: CharacterArmature|Run; loop: repeat; timeScale: 1');
      acharacter.setAttribute('rotation', '0 0 0');
      acharacter.setAttribute('animation', 'property: position; to: 0 0 1; dur: 2000; easing: linear');

      setTimeout(function () {
        acharacter.setAttribute('rotation', '0 90 0');
        let randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        acharacter.setAttribute('animation-mixer', `clip: CharacterArmature|${randomAnimation}; loop: once; timeScale: 1`);

        setTimeout(function () {
          acharacter.setAttribute('animation-mixer', 'clip: CharacterArmature|Run_Back; loop: repeat; timeScale: 1');
          acharacter.setAttribute('animation', 'property: position; to: 0 0 -4; dur: 2000; easing: linear');
          acharacter.setAttribute('rotation', '0 0 0');

          setTimeout(function () {
            let randomEmote = emote[Math.floor(Math.random() * emote.length)];
            acharacter.setAttribute('animation-mixer', `clip: CharacterArmature|${randomEmote}; loop: once; timeScale: 1`); 
            
            acharacter.setAttribute('animation', 'property: position; to: 0 0 -8; dur: 2000; easing: linear');
            acharacter.setAttribute('rotation', '0 35 0');

            setTimeout(function () {
              acharacter.setAttribute('animation-mixer', 'clip: CharacterArmature|Walk; loop: repeat; timeScale: 1');
              acharacter.setAttribute('animation', 'property: position; to: -2 0 -8; dur: 1000; easing: linear');
              acharacter.setAttribute('rotation', '0 -90 0');

              setTimeout(function () {
                acharacter.setAttribute('animation-mixer', 'clip: CharacterArmature|Idle; loop: repeat; timeScale: 1');
                acharacter.setAttribute('rotation', '0 0 0');
              }, 1000);
            }, 2000);
          }, 1000);
        }, 1000);
      }, 2000);
    }, 1000);
  });
};
let characters = [
  {
      url: "models/teacher/Astronaut.glb",
      name: "Astronaut",
      price: "10",
      description: "Space traveler",
  },
  {
      url: "models/teacher/Beach Character.glb",
      name: "Beach Character",
      price: "0",
      description: "Chill guy",
  },
  {
      url: "models/teacher/Business Man.glb",
      name: "Business Man",
      price: "8",
      description: "Rich guy",
  },
  {
      url: "models/teacher/Casual Character.glb",
      name: "Casual",
      price: "3",
      description: "Casual Character",
  },
  {
      url: "models/teacher/King.glb",
      name: "King",
      price: "1",
      description: "King",
  },
  {
      url: "models/teacher/Punk.glb",
      name: "Punk",
      price: "2",
      description: "Punk",
  },
  {
      url: "models/teacher/Swat.glb",
      name: "Swat",
      price: "4",
      description: "Swat",
  },
  {
      url: "models/teacher/Worker.glb",
      name: "Worker",
      price: "5",
      description: "Worker",
  },
];

let colors = [
  { normal: "#FF0000", dark: "#8B0000" }, // Red
  { normal: "#00FF00", dark: "#006400" }, // Green
  { normal: "#0000FF", dark: "#00008B" }, // Blue
  { normal: "#FFFF00", dark: "#CCCC00" }, // Yellow
  { normal: "#FFA500", dark: "#FF8C00" }, // Orange
  { normal: "#800080", dark: "#4B0082" }, // Purple
  { normal: "#00FFFF", dark: "#008B8B" }, // Cyan
  { normal: "#FFC0CB", dark: "#FF69B4" }, // Pink
  { normal: "#A52A2A", dark: "#8B0000" }, // Brown
  { normal: "#808080", dark: "#696969" }  // Gray
];
let renderMarket = function () {
  let ascene = document.querySelector('a-scene');
  let amarket = document.createElement('a-entity');
  amarket.setAttribute('gltf-model', '#Snorlax');
  amarket.setAttribute('scale', '3 3 1.5');
  amarket.setAttribute('position', '5.5 .8 8.5');
  amarket.setAttribute('rotation', '0 35 0');
  amarket.setAttribute('id', 'Snorlax');
  ascene.appendChild(amarket);

    let atable = document.createElement('a-entity');
  atable.setAttribute('gltf-model', '#table-shop');
  atable.setAttribute('scale', '.5 .5 .5');
  atable.setAttribute('position', '5.5 1 8');
  atable.setAttribute('rotation', '0 35 0');
  atable.setAttribute('id', 'Table-shop');
  ascene.appendChild(atable);

  atable.addEventListener("click", function () {
    console.log("click");
    let otherboxes = document.querySelectorAll("#character-list");
    if (otherboxes) {
      otherboxes.forEach((box) => {
        box.parentNode.removeChild(box);
      });
    }
    colors.forEach((color, index) => {
      const aBox = document.createElement("a-box");
      aBox.setAttribute("color", color.normal);
      aBox.setAttribute("width", ".5");
      aBox.setAttribute("height", ".5");
      aBox.setAttribute("depth", ".5");
      aBox.setAttribute("rotation", `0 0 0`);
      aBox.setAttribute("id", `box-color`);
      aBox.setAttribute("position", `${3 - (index % 5) * .5} ${3.1 - Math.floor(index / 5) * 1.5} 9`);
      ascene.appendChild(aBox);
      aBox.addEventListener("click", function () {
        console.log(`Clicked on ${color.normal}`);
        let tabletops = document.querySelectorAll("#table-top");
        tabletops.forEach((tabletop) => {
          tabletop.setAttribute("color", color.normal);
        });
        let tablebottoms = document.querySelectorAll("#table-bot");
        tablebottoms.forEach((tablebottom) => {
          tablebottom.setAttribute("color", color.dark);
        });
      });

    });
  });


  amarket.addEventListener("click", function () {
    console.log("click");
    let otherboxes = document.querySelectorAll("#box-color");
    if (otherboxes) {
      otherboxes.forEach((box) => {
        box.parentNode.removeChild(box);
      });
    }
    characters.forEach((character, index) => {
      const characterEntity = document.createElement("a-entity");
      characterEntity.setAttribute("gltf-model", character.url);
      characterEntity.setAttribute("scale", "0.5 0.5 0.5");
      characterEntity.setAttribute("position", `${3 - (index % 5) * .5} ${2.85 - Math.floor(index / 5) * 1.5} 9`);
      characterEntity.setAttribute("rotation", "0 180 0");
      characterEntity.setAttribute("id", `character-list`);
      ascene.appendChild(characterEntity);
      characterEntity.addEventListener("click", function () {
      console.log(`Clicked on ${character.name}`);
      let characters = document.getElementById("characters");
      characters.setAttribute("gltf-model", character.url);
      });
    });
  });
}
renderMarket();
renderCharacter ();
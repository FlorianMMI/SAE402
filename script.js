// Joystick
AFRAME.registerComponent("thumbstick-move", {
  init: function () {
    let rig = document.getElementById("rig");
    let camera = document.getElementById("camera");

    this.el.addEventListener("thumbstickmoved", function (evt) {
      let x = evt.detail.x;
      let y = evt.detail.y;

      if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) return;

      let speed = 0.06;

      let direction = new THREE.Vector3();
      camera.object3D.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();

      let strafe = new THREE.Vector3()
        .crossVectors(new THREE.Vector3(0, 1, 0), direction)
        .multiplyScalar(x);
      let move = direction.multiplyScalar(y);

      let finalMove = new THREE.Vector3()
        .addVectors(strafe, move)
        .multiplyScalar(speed);

      rig.object3D.position.add(finalMove);
    });
  },
});

// Grab

AFRAME.registerComponent("click-grab", {
  init: function () {
    let el = this.el;
    let scene = el.sceneEl;
    let camera = document.querySelector("#camera");
    let isGrabbed = false;

    function updatePosition(event) {
      if (isGrabbed) {
        let cameraPos = new THREE.Vector3();
        let cameraQuat = new THREE.Quaternion();

        camera.object3D.getWorldPosition(cameraPos);
        camera.object3D.getWorldQuaternion(cameraQuat);

        let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        let offset = new THREE.Vector3(mouseX * 0.5, mouseY * 0.5, -1);
        offset.applyQuaternion(cameraQuat);

        let newPosition = cameraPos.clone().add(offset);
        el.object3D.position.copy(newPosition);
      }
    }

    el.oncontextmenu = function () {
      return false;
    };

    let launcher = document.querySelector("#launcher");

    el.addEventListener("mousedown", function () {
      updatePosition;
      launcher.setAttribute("static-body", "");
      isGrabbed = true;
      el.setAttribute("dynamic-body", "mass: 0");
      window.addEventListener("mousemove", updatePosition);
    });

    scene.addEventListener("mouseup", function (event) {
      if ((event.button == 0) & isGrabbed) {
        isGrabbed = false;
        launcher.removeAttribute("static-body");
        el.setAttribute("dynamic-body", "mass: 1");
      }
      if ((event.button == 2) & isGrabbed) {
        isGrabbed = false;
        el.setAttribute("dynamic-body", "mass: 1");
        setTimeout(() => {
          launcher.removeAttribute("static-body");
        }, 100);
      }
    });

    let rightController = document.querySelector("#rightController");
    if (rightController) {
      rightController.addEventListener("triggerdown", function () {
        isGrabbed = true;
        el.setAttribute("dynamic-body", "mass: 0");
        window.addEventListener("mousemove", updatePosition);
        launcher.setAttribute("static-body", "");
      });

      rightController.addEventListener("triggerup", function () {
        if (isGrabbed) {
          isGrabbed = false;
          el.setAttribute("dynamic-body", "mass: 1");
          window.removeEventListener("mousemove", updatePosition);
          setTimeout(() => {
            launcher.removeAttribute("static-body");
          }, 100);
        }
      });
    }
    let leftController = document.querySelector("#leftController");
    if (leftController) {
      leftController.addEventListener("triggerdown", function () {
        isGrabbed = true;
        el.setAttribute("dynamic-body", "mass: 0");
        window.addEventListener("mousemove", updatePosition);
      });

      leftController.addEventListener("triggerup", function () {
        if (isGrabbed) {
          isGrabbed = false;
          el.setAttribute("dynamic-body", "mass: 1");
          window.removeEventListener("mousemove", updatePosition);
        }
      });
    }
  },
});

// DRAWER

document.querySelector("#drawer1").addEventListener("click", function () {
  var drawer1 = document.querySelector("#drawer1");
  if (
    drawer1.getAttribute("position").x == -2.6 &&
    drawer1.getAttribute("position").y == 0 &&
    drawer1.getAttribute("position").z == -5
  ) {
    drawer1.setAttribute(
      "animation",
      "property: position; to: -2.6 0 -4.35; dur: 1000; easing: linear"
    );
  } else {
    drawer1.setAttribute(
      "animation",
      "property: position; to: -2.6 0 -5; dur: 1000; easing: linear"
    );
  }
});

document.querySelector("#drawer2").addEventListener("click", function () {
  var drawer2 = document.querySelector("#drawer2");
  if (
    drawer2.getAttribute("position").x == -2.6 &&
    drawer2.getAttribute("position").y == 0.5 &&
    drawer2.getAttribute("position").z == -5
  ) {
    drawer2.setAttribute(
      "animation",
      "property: position; to: -2.6 0.5 -4.35; dur: 1000; easing: linear"
    );
  } else {
    drawer2.setAttribute(
      "animation",
      "property: position; to: -2.6 0.5 -5; dur: 1000; easing: linear"
    );
  }
});

document.querySelector("#drawer3").addEventListener("click", function () {
  var drawer3 = document.querySelector("#drawer3");
  if (
    drawer3.getAttribute("position").x == -2.6 &&
    drawer3.getAttribute("position").y == 1 &&
    drawer3.getAttribute("position").z == -5
  ) {
    drawer3.setAttribute(
      "animation",
      "property: position; to: -2.6 1 -4.35; dur: 1000; easing: linear"
    );
  } else {
    drawer3.setAttribute(
      "animation",
      "property: position; to: -2.6 1 -5; dur: 1000; easing: linear"
    );
  }
});

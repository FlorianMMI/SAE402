// document.querySelector("#myBox").addEventListener("click", function () {
//   var box = document.querySelector("#myBox");
//   box.setAttribute(
//     "color",
//     "#" + Math.floor(Math.random() * 16777215).toString(16)
//   );
// });

// document
//   .querySelector("#rightController")
//   .addEventListener("triggerdown", function () {
//     var s = document.querySelector("#mySphere");
//     s.setAttribute(
//       "color",
//       "#" + Math.floor(Math.random() * 16777215).toString(16)
//     );
//   });

var scene = document.querySelector("a-scene");
var cylinder = document.createElement("a-cylinder");
var book = document.createElement('a-entity');
book.setAttribute('gltf-model', '#Book2');
book.setAttribute('color', '#FF9500');
book.setAttribute('position', '1 4 1');
scene.appendChild(book);
cylinder.setAttribute("color", "#FF9500");
cylinder.setAttribute("scale", "1 1 1");  
cylinder.setAttribute("height", "2");
cylinder.setAttribute("radius", "0.75");
cylinder.setAttribute("position", "3 1 0");

var light = document.createElement("a-light");
light.setAttribute("type", "point");
light.setAttribute("color", "#FFFFFF");
light.setAttribute("intensity", "1000");
light.setAttribute("distance", "3");
light.setAttribute("position", "0 0 0");
cylinder.appendChild(light);



scene.appendChild(cylinder);

var t = 0;
function render() {
  t += 0.01;
  requestAnimationFrame(render);
  // cylinder.setAttribute("position", "3 " + (Math.sin(t * 2) + 3) + " 0");

  cylinder.addEventListener("click", function () {
    cylinder.setAttribute(
      "color",
      "#" + Math.floor(Math.random() * 16777215).toString(16)
    );
  });

  cylinder.addEventListener("mouseenter", function () {
    cylinder.setAttribute('material', {
      emissive: '#FFFFFF',
      emissiveIntensity: 0.05,
    });
    cylinder.setAttribute("animation", {
      property: "scale",
      to: "1.1 1.1 1.1",
      dur: 200
    });
  });

  cylinder.addEventListener("mouseleave", function () {
    cylinder.setAttribute('material', {
      emissive: 'none',
      emissiveIntensity: 0
    });
    cylinder.setAttribute("animation", {
      property: "scale",
      to: "1 1 1",
      dur: 200
    });
  });

  book.addEventListener("mouseenter", function () {
    book.setAttribute('material', {
      emissive: '#FFFFFF',
      emissiveIntensity: 1,
    });
    book.setAttribute("animation", {
      property: "scale",
      to: "1.1 1.1 1.1",
      dur: 200
    });
  });

  book.addEventListener("mouseleave", function () {
    book.setAttribute('material', {
      emissive: 'none',
      emissiveIntensity: 0
    });
    book.setAttribute("animation", {
      property: "scale",
      to: "1 1 1",
      dur: 200
    });
  });
  
  document.querySelector("a-box").addEventListener("triggerdown", function () {
    cylinder.setAttribute(
      "color",
      "#" + Math.floor(Math.random() * 16777215).toString(16)
    );
  });
}

render();

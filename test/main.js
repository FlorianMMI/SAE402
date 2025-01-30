import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function main() {
    const canvas = document.querySelector('.webgl');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000); // Fond noir
    window.addEventListener('resize', onWindowResize, false);

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 5); // Position the camera at ground level

    const scene = new THREE.Scene();

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    window.addEventListener("resize", onWindowResize);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Add axes helper
    scene.add(new THREE.AxesHelper(10));

    const loop = () => {
        controls.update(); // Update controls
        renderer.render(scene, camera);
        window.requestAnimationFrame(loop);
    };

    loop();
}

main();
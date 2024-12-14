import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Load the model
const loader = new GLTFLoader();
let headBone, Left_Arm, Left_Shoulder , rightHandBone ;

loader.load("../public/assets/models/human-model.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Find the head and hand bones
    const skeleton = model.getObjectByProperty("type", "Bone");
    headBone = skeleton.getObjectByName("mixamorigHead_06"); // Head bone

    Left_Shoulder = skeleton.getObjectByName("mixamorigLeftShoulder_08");

    Left_Arm = skeleton.getObjectByName("mixamorigLeftArm_09"); // Left hand bone
    rightHandBone = skeleton.getObjectByName("mixamorigRightHand"); // Right hand bone

    // Position hands for the desired pose
    if (leftHandBone) { Left_Arm.rotation.set(-0.7, 0.9, -0.3); 
      Left_Shoulder.rotation.set(0.5, 0.9, -0.3);
    } 
    if (rightHandBone) { rightHandBone.rotation.set(0.5, -0.2, 0.3); } // Adjust for your model
});

// Track mouse movement for head rotation
const mouse = { x: 0, y: 0 };
document.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);

    // Rotate the head based on mouse movement
    if (headBone) {
        headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, mouse.x * -0.5, 0.1); // Left/Right
        headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, mouse.y * 0.5, 0.1); // Up/Down
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();

// Handle resizing
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

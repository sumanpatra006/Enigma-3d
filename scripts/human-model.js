
const container = document.getElementById('model-container-human');

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0.7, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true ,alpha: true});
// renderer.setClearColor(0xffffff, 1);
renderer.setSize(window.innerWidth , window.innerHeight);
container.appendChild(renderer.domElement);

// Lighting
// const light1 = new THREE.DirectionalLight(0xA4A59E, 1.3);
// light1.position.set(5, 5, 5);
// scene.add(light1);

// const light2 = new THREE.DirectionalLight(0xD3D6BD, 1.3);
// light2.position.set(0, 0, 5);
// scene.add(light2);

// const light3 = new THREE.DirectionalLight(0xffffff, 1.3);
// light3.position.set(0, 0, -5);
// scene.add(light3);

// const light4 = new THREE.DirectionalLight(0xA4A59E, 1.3);
// light4.position.set(0, 7, 0);
// scene.add(light4);

// Set up ambient light for general illumination
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Light color and intensity
scene.add(ambientLight);

// Set up directional light for main light source
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light and intensity
directionalLight.position.set(0, -5, 3).normalize(); // Adjust position
scene.add(directionalLight);

// Add a spotlight for a focused light effect
const spotlight = new THREE.SpotLight(0xffffff, );  // Increase intensity for better visibility
spotlight.position.set(0, 10, 5);  // Position the spotlight above the model
spotlight.target.position.set(0, -4, 0);  // Focus on the pants area
scene.add(spotlight);
scene.add(spotlight.target);

ambientLight.intensity = 0.5; // Reduce ambient light intensity
// directionalLight.intensity = 0.8; // Reduce directional light intensity
// spotlight.intensity = 1; // Reduce spotlight intensity

// Set shadow properties
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows

// Adjust light and shadow properties
directionalLight.castShadow = true;
spotlight.castShadow = true;

// Set shadow bias to reduce artifacts
directionalLight.shadow.bias = 0.001;
spotlight.shadow.bias = 0.001;


// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;    // Disable zoom in/out
controls.enableRotate = false;  // Disable rotation
controls.enablePan = false;     // Disable panning
controls.update();  

// Load the model
const loader = new GLTFLoader();
let headBone, leftHand, rightHand, leftForearm, rightForearm, leftArm, rightArm , rightSoulder , leftSoulder;
let leftThumb1, rightThumb1;

loader.load("../public/assets/models/human-model.glb", (gltf) => {
    const model = gltf.scene;
    scene.add(model);
    model.scale.set(1.8, 1.8, 1.8);
    /* The line `model.position.set(0, -3, 0);` is setting the position of the loaded 3D model within
    the scene. */
    model.position.set(0, -1, 0);

    // console.log(model)

    // Reference bones in the model
    headBone = model.getObjectByName("mixamorigHead_06");
    leftSoulder = model.getObjectByName("mixamorigLeftShoulder_08");
    rightSoulder = model.getObjectByName("mixamorigRightShoulder_032");
    leftHand = model.getObjectByName("mixamorigLeftHand_011");
    rightHand = model.getObjectByName("mixamorigRightHand_035");
    leftForearm = model.getObjectByName("mixamorigLeftForeArm_010");
    rightForearm = model.getObjectByName("mixamorigRightForeArm_034");
    leftArm = model.getObjectByName("mixamorigLeftArm_09");
    rightArm = model.getObjectByName("mixamorigRightArm_033");

    // Reference fingers (optional)
    leftThumb1 = model.getObjectByName("mixamorigLeftHandThumb1_012");
    rightThumb1 = model.getObjectByName("mixamorigRightHandThumb1_036");

    // // Adjust posture
    if (leftSoulder) { leftSoulder.rotation.set(0.4, -0.4 , -2.3); }
    if (rightSoulder) { rightSoulder.rotation.set(-0.6, -0.3 , 2.5); }
    // if (leftHand) { leftHand.rotation.set(0.2, 0.1, -0.1); } // Slight rotation for natural pose
    if (rightHand) { rightHand.rotation.set(-0.4 , -1.7 , -0.3); }

    if (leftForearm) { leftForearm.rotation.set(1.5, 0.8, -1.1); } // Slight bend in forearm
    if (rightForearm) { rightForearm.rotation.set(1.9 , 0 , 0); }

    // if (leftArm) { leftArm.rotation.set(0.4, 0.2, 0); } // Natural position for arm
    // if (rightArm) { rightArm.rotation.set(0.4, -0.2, 0); }

    // // Optional: Adjust fingers (slightly curled)
    // if (leftThumb1) { leftThumb1.rotation.set(0.1, 0, 0); }
    // if (rightThumb1) { rightThumb1.rotation.set(0.1, 0, 0); }
});

// Track mouse movement for dynamic head rotation
const mouse = { x: 0, y: 0 };
document.addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);

    // Smoothly rotate the head based on mouse movement
    if (headBone) {
        headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, mouse.x * 0.5, 0.1); // Left/Right
        headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, mouse.y * -0.3, 0.1); // Up/Down
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

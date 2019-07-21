import {
    Color,
    DirectionalLight, Fog,
    PerspectiveCamera,
    PointLight,
    Scene,
    WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import Loader from './loader/Loader';
import Tower from "./objects/tower/Tower";
import Floor from "./objects/floor/Floor";

// 初始化渲染器
let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x3d3b33);
document.body.appendChild(renderer.domElement);

// 初始化镜头
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 40000);
camera.position.x = 50;
camera.position.y = 50;
camera.position.z = 50;

// 初始化轨道控制
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.15;

// 初始化场景
let scene = new Scene();
scene.background = new Color(0xffffff);
scene.fog = new Fog(0xffffff, 0, 750);
// 添加平行光源
let light = new DirectionalLight(0xffffff, 1.0);
light.position.set(100, 100, 100);
scene.add(light);
// 添加点光源
const frontLight = new PointLight(0xFFFFFF, 1);
scene.add(frontLight);
frontLight.position.set(100, 100, 100);
// 场景中添加立方体
camera.lookAt(scene.position);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

Loader.done(() => {
    scene.add(new Floor());
    scene.add(new Tower());
    requestAnimationFrame(animate);
});


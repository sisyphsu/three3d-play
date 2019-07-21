import {
    BoxGeometry,
    DirectionalLight,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import Loader from './loader/Loader';
import Tower from "./objects/tower/Tower";

// 初始化渲染器
let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x3d3b33);
document.body.appendChild(renderer.domElement);

// 初始化镜头
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

// 初始化轨道控制
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.15;

// 初始化场景
let scene = new Scene();
// 添加平行光源
let light = new DirectionalLight(0xffffff, 1.0);
light.position.set(100, 100, 100);
scene.add(light);
// 添加点光源
const frontLight = new PointLight(0xFFFFFF, 1);
scene.add(frontLight);
frontLight.position.set(100, 100, 100);
// 场景中添加立方体
let box = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({
    color: 0xaaaaaa,
    wireframe: true
}));
box.position.x = 0.5;
box.rotation.y = 0.5;
scene.add(box);

camera.lookAt(scene.position);

function animate() {
    requestAnimationFrame(animate);
    let timer = 0.002 * Date.now();
    box.position.y = 0.5 + 0.5 * Math.sin(timer);
    box.rotation.x += 0.1;
    renderer.render(scene, camera);
}

Loader.done(() => {
    scene.add(new Tower());
    requestAnimationFrame(animate);
});


import {
    Clock,
    Color,
    Fog, OrthographicCamera,
    PointLight,
    Scene,
    WebGLRenderer
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Loader from './loader/Loader';

import Floor from "./objects/floor/Floor";
import Tower from "./objects/tower/Tower";
import Robot from "./objects/robot/Robot";
// import Soldier from "./objects/soldier/Soldier";

// 初始化渲染器
let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x3d3b33);
document.body.appendChild(renderer.domElement);

// 初始化场景
let scene = new Scene();
scene.background = new Color(0xffffff);
scene.fog = new Fog(0xffffff, 0, 750);

// 初始化镜头
// let camera = new OrthographicCamera(-100, 100, -100, 100, 100, 10000);
// camera.position.x = 5;
// camera.position.z = 15;
// camera.position.y = 15;
let camera = createOrthographicCamera();
camera.position.set(200, 500, 200);
// camera.lookAt(scene.position);

// 初始化轨道控制
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.minZoom = 10;
controls.maxZoom = 1000;
// 添加对称的点光源
const frontLight = new PointLight(0xFFFFFF, 1.4);
scene.add(frontLight);
frontLight.position.set(50, 40, 50);
const backLight = new PointLight(0xFFFFFF, 1.3);
scene.add(backLight);
backLight.position.set(-50, -40, -50);

// 场景中添加立方体
camera.lookAt(scene.position);

let clock = new Clock();
// let soldier: Soldier;
let robot: Robot;
let floor: Floor;

function createOrthographicCamera(): OrthographicCamera {
    let width = window.innerWidth;// 窗口宽度
    let height = window.innerHeight;// 窗口高度
    let k = width / height;// 窗口宽高比
    let s = 40;// 三维场景缩放系数
    return new OrthographicCamera(-s * k, s * k, s, -s, 100, 100000);
}

function animate() {
    requestAnimationFrame(animate);
    let delta = clock.getDelta();

    // soldier.update(delta);
    robot.update(delta);
    // 地板改为动画也解决不了穿模的bug
    renderer.render(scene, camera);
}

Loader.done(() => {
    floor = new Floor();
    scene.add(floor);

    // soldier = new Soldier();
    // scene.add(soldier);

    robot = new Robot();
    scene.add(robot);

    scene.add(new Tower());
    requestAnimationFrame(animate);
});


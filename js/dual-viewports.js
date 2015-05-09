/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./typings/All.d.ts"/>

var container, scene, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var chaseCamera, topCamera;
var snake;

init();
animate();

function _initCamera(scene) {
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    topCamera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(topCamera);
    topCamera.position.set(0, 200 + 50, 550 + 200);
    topCamera.lookAt(scene.position);
    chaseCamera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(chaseCamera);
}

function _initStats(container) {
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild(stats.domElement);
}

function init() {
    scene = new THREE.Scene();
    _initCamera(scene);

    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.body;
    container.appendChild(renderer.domElement);

    _initStats(container);

    var light = new THREE.PointLight(0xffffff);
    light.position.set(0, 250, 0);
    scene.add(light);

    // var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
    // floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    // floorTexture.repeat.set(10, 10);
    // var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    // var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    // var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    // floor.position.y = -0.5;
    // floor.rotation.x = Math.PI / 2;
    // scene.add(floor);

    var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x9999ff, side: THREE.BackSide });
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);

    var ambientlight = new THREE.AmbientLight(0x111111);
    scene.add(ambientlight);

    // sphere
    var sphere_geo = new THREE.SphereGeometry(1, 32, 32);
    var material = new THREE.MeshBasicMaterial( {color: 0x000000 });
    var sphere = new THREE.Mesh(sphere_geo, material);
    scene.add(sphere);

    var geometricSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1);

    // our snake
    var headPos = new THREE.Vector3(1, 0, 0);
    var dir = new THREE.Vector3(0, 1, 0);
    snake = new Snake(headPos, dir, geometricSphere, scene);

    // add snake to scene

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
}

function animate() {
    requestAnimationFrame(animate);
    render();
    update();
}

function updateCameraPositions() {
    var snakeHead = snake.headPosition;
    chaseCamera.position.x = snakeHead.x * 5;
    chaseCamera.position.y = snakeHead.y * 5;
    chaseCamera.position.z = snakeHead.z * 5;
    chaseCamera.lookAt(new THREE.Vector3(0, 0, 0));
}

function updateStats() {
    stats.update();
}

function update() {
    // rotate first
    // snake.turn("A");

    // always move forward
    // snake.moveForward();

    // updateCameraPositions
    updateCameraPositions();

    // update stats
    updateStats();

}

function render() {
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    chaseCamera.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
    topCamera.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
    chaseCamera.updateProjectionMatrix();
    topCamera.updateProjectionMatrix();
    renderer.setViewport(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.clear();
    renderer.setViewport(1, 1, 0.5 * SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2);
    renderer.render(scene, chaseCamera);
    renderer.setViewport(0.5 * SCREEN_WIDTH + 1, 1, 0.5 * SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2);
    renderer.render(scene, topCamera);
}

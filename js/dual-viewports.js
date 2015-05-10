/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./typings/All.d.ts"/>

var container, scene, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var chaseCamera, topCamera;
var snake;
var foodCollection;
var updater;

init();
animate();

function _initCamera(scene) {
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    topCamera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(topCamera);
    // topCamera.position.set(0, 200 + 50, 550 + 200);
    // topCamera.lookAt(scene.position);
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

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 10, 0);
    scene.add(directionalLight);

    // Skybox with dawnmountain scene
    var imagePrefix = "images/sky-";
    var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
    var imageSuffix = ".jpg";
    var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );

    var materialArray = [];
    for (var i = 0; i < 6; i++)
        materialArray.push( new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
            side: THREE.BackSide
        }));
    var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    scene.add( skyBox );

    // Plain skybox
    // var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    // var skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x9999ff, side: THREE.BackSide });
    // var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    // scene.add(skyBox);

    // var ambientlight = new THREE.AmbientLight(0x111111);
    // scene.add(ambientlight);

    // Translucent red color
    // var redMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true, opacity: 0.5 } );
    // var sphere = new THREE.Mesh( sphere_geo, redMaterial );
    // sphere.position.set(0,0,0);
    // scene.add( sphere );

    // Translucent with image texture
    var moonTexture = THREE.ImageUtils.loadTexture( 'images/moon.png' );
    var moonMaterial = new THREE.MeshLambertMaterial( { map: moonTexture, transparent: true, opacity: 0.75 } );
    var sphere_geo = new THREE.SphereGeometry(1, 32, 32);
    var moon = new THREE.Mesh( sphere_geo, moonMaterial );
    moon.position.set(0, 0, 0);
    scene.add( moon );

    // our snake
    var geometricSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1);

    var headPos = new THREE.Vector3(1, 0, 0);
    var dir = new THREE.Vector3(0, 1, 0);
    var headPos2 = new THREE.Vector3(-1, 0, 0);
    var dir2 = new THREE.Vector3(0, 1, 0);

    snake = new Snake(headPos, dir, geometricSphere, scene);
    snake2 = new Snake(headPos2, dir2, geometricSphere, scene);

    updater = new Updater(snake, snake2, chaseCamera, topCamera);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;

    // initialize camera position
    updater.updateCameraPositions();

    // add Food
    // foodCollection = new Food(geometricSphere, scene);
    // foodCollection.addFood();
}

function animate() {
    requestAnimationFrame(animate);
    render();
    updater.update();
}

function updateCameraPositions() {
    var snakeHead = snake.headPosition;
    chaseCamera.position.x = snakeHead.x * 3.5;
    chaseCamera.position.y = snakeHead.y * 3.5;
    chaseCamera.position.z = snakeHead.z * 3.5;
    chaseCamera.lookAt(new THREE.Vector3(0, 0, 0));
    chaseCamera.up = snake.direction;

    var snake2Head = snake2.headPosition;
    topCamera.position.x = snake2Head.x * 3.5;
    topCamera.position.y = snake2Head.y * 3.5;
    topCamera.position.z = snake2Head.z * 3.5;
    topCamera.lookAt(new THREE.Vector3(0, 0, 0));
    topCamera.up = snake2.direction;
}

function updateStats() {
    stats.update();
}

function update() {
    // rotate first
    if (keyboard.pressed("A")) {
        snake.turn("A");
    } else if (keyboard.pressed("D")) {
        snake.turn("D");
    }

    if (keyboard.pressed("left")) {
        snake2.turn("A");
    } else if (keyboard.pressed("right")) {
        snake2.turn("D");
    }
    // always move forward
    snake.moveForward();
    snake2.moveForward();

    // updateCameraPositions
    updateCameraPositions();

    // update stats
    updateStats();

    // Spawn food
    // spawnFood();

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

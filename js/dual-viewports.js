var container, scene, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var leftCamera, rightCamera;
var neutralItems;
var updater;
var clock;

window.onload = function () {
    init();
    animate();
}

function _initCamera() {
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    leftCamera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(leftCamera);

    rightCamera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(rightCamera);
}

function _initStats() {
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild(stats.domElement);
}

function _initUpdater() {
    // our snakes!
    var geometricSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1);
    var headPos = new THREE.Vector3(1, 0, 0);
    var dir = new THREE.Vector3(0, 1, 0);
    var headPos2 = new THREE.Vector3(-1, 0, 0);
    var dir2 = new THREE.Vector3(0, -1, 0);

    var snake = new Snake(headPos, dir, geometricSphere, scene, new THREE.Color(0, 0, 1));
    var snake2 = new Snake(headPos2, dir2, geometricSphere, scene, new THREE.Color(1, 0, 0));

    updater = new Updater(scene, snake, snake2, leftCamera, rightCamera, neutralItems);
}

function _initScene() {
    scene = new THREE.Scene();

    var light = new THREE.PointLight(0xffffff);
    light.position.set(0, 250, 0);
    scene.add(light);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 10, 0);
    scene.add(directionalLight);

    // // Skybox with dawnmountain scene
    var imagePrefix = "images/sky-";
    var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
    var imageSuffix = ".jpg";
    var skyGeometry = new THREE.BoxGeometry( 5000, 5000, 5000 );

    var materialArray = [];
    for (var i = 0; i < 6; i++)
        materialArray.push( new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
            side: THREE.BackSide
        }));

    var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    scene.add( skyBox );

    // Skybox with stars
    // var skyGeometry = new THREE.BoxGeometry( 5000, 5000, 5000 );
    //
    // var materialArray = [];
    // for (var i = 0; i < 6; i++)
    //     materialArray.push( new THREE.MeshBasicMaterial({
    //         map: THREE.ImageUtils.loadTexture( "images/stars.jpg" ),
    //         side: THREE.BackSide
    //     }));
    //
    // var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    // var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    // scene.add( skyBox );

    // Translucent with image texture
    var moonTexture = THREE.ImageUtils.loadTexture( 'images/moon.png' );
    var moonMaterial = new THREE.MeshLambertMaterial( { map: moonTexture, transparent: true, opacity: 0.75 } );
    var sphere_geo = new THREE.SphereGeometry(1, 32, 32);
    var moon = new THREE.Mesh( sphere_geo, moonMaterial );
    moon.position.set(0, 0, 0);
    scene.add( moon );
}

function _initRenderer() {
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.body;
    container.appendChild(renderer.domElement);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
}

function _initNeutralItems() {
    neutralItems = new NeutralItemCollection(scene);
    neutralItems.spawnFood();
    neutralItems.spawnFood();
    neutralItems.spawnFood();
}

function _initClock() {
    var display = $('#game-timer');
    clock = new Clock(5, display, function () {
        console.log('hey');
    });
}

function init() {
    _initScene();
    _initCamera();
    _initRenderer();
    _initStats();
    _initNeutralItems();
    _initUpdater();
    _initClock();
}

function animate() {
    requestAnimationFrame(animate);
    render();
    updater.update();
}

function render() {
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    leftCamera.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
    rightCamera.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
    leftCamera.updateProjectionMatrix();
    rightCamera.updateProjectionMatrix();
    renderer.setViewport(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.clear();
    renderer.setViewport(1, 1, 0.5 * SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2);
    renderer.render(scene, leftCamera);
    renderer.setViewport(0.5 * SCREEN_WIDTH + 1, 1, 0.5 * SCREEN_WIDTH - 2, SCREEN_HEIGHT - 2);
    renderer.render(scene, rightCamera);
}

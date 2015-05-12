var container, scene, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var leftCamera, rightCamera;
var neutralItems;
var updater;
var clock;
var animationFrameId;

var GAME_TIME = 30;

window.onload = function () {
    init();
    // animate();

    $('#myModal').modal('show');

    $('#myModal').on('hidden.bs.modal', function () {
        // init();
        _initClock();
        animate();
    });

    var restartButton = $('#restart-button');
    restartButton.click(restart);
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

    SCREEN_WIDTH = window.innerWidth;
    stats.domElement.style.left = Math.floor((SCREEN_WIDTH - 100) / 2) + 'px';
    //stats.domElement.style.width = '10vw';
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

    var crimson = new THREE.Color(0xdc143c);
    var snake = new Snake(headPos, dir, geometricSphere, scene, crimson);
    var snake2 = new Snake(headPos2, dir2, geometricSphere, scene, new THREE.Color(0x32cd32));

    updater = new Updater(scene, snake, snake2, leftCamera, rightCamera, neutralItems);
}

function _initScene() {
    scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(0, -1, 0);
    scene.add(directionalLight2);

    // // Skybox with dawnmountain scene
    // var imagePrefix = "images/sky-";
    // var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
    // var imageSuffix = ".jpg";
    // var skyGeometry = new THREE.BoxGeometry( 5000, 5000, 5000 );
    //
    // var materialArray = [];
    // for (var i = 0; i < 6; i++)
    //     materialArray.push( new THREE.MeshBasicMaterial({
    //         map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
    //         side: THREE.BackSide
    //     }));
    //
    // var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    // var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    // scene.add( skyBox );

    // Skybox with stars
    var skyGeometry = new THREE.BoxGeometry( 5000, 5000, 5000 );

    var materialArray = [];
    for (var i = 0; i < 6; i++)
        materialArray.push( new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture( "images/stars2.png" ),
            side: THREE.BackSide
        }));

    var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
    var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
    scene.add( skyBox );

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
    clock = new Clock(GAME_TIME, display, stopGame);
}

function init() {
    _initScene();
    _initCamera();
    _initRenderer();
    _initStats();
    _initNeutralItems();
    _initUpdater();
}

function animate() {
    animationFrameId = requestAnimationFrame(animate);

    render();
    updater.update();
}

function stopGame() {
    stopAnimation();

    var leftEndMessage = $('#left-end-message');
    var rightEndMessage = $('#right-end-message');
    var restartButton = $('#restart-button');
    // var endStatsMessage = $('#end-stats');

    updater.gameStats.printLeftStats(leftEndMessage);
    updater.gameStats.printRightStats(rightEndMessage);

    // var winner = updater.getWinner();
    // if (winner == Updater.SNAKE_A) {
    //     leftEndMessage.text("You win!");
    //     rightEndMessage.text("You lose :(");
    // } else if (winner == Updater.TIE) {
    //     leftEndMessage.text("Tie");
    //     rightEndMessage.text("Tie");
    // } else {
    //     leftEndMessage.text("You lose :(");
    //     rightEndMessage.text("You win!");
    // }


    leftEndMessage.show();
    rightEndMessage.show();
    restartButton.show();
}

function stopAnimation() {
    cancelAnimationFrame(animationFrameId);
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

function restart() {
    // clear everything first
    var leftEndMessage = $('#left-end-message');
    var rightEndMessage = $('#right-end-message');
    var restartButton = $('#restart-button');
    leftEndMessage.hide();
    rightEndMessage.hide();
    restartButton.hide();

    // reset things
    var oldCanvas = $('canvas');
    oldCanvas.remove();
    var oldStats = $('#stats');
    oldStats.remove();

    init();
    _initClock();
    animate();
}

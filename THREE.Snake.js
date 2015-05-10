var FoodParticle = (function () {
    function FoodParticle(pos) {
        this.position = pos;
        var sphereGeo = new THREE.SphereGeometry(0.05, 4, 4);
        var standardMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.sphere = new THREE.Mesh(sphereGeo, standardMaterial);
        this.sphere.position.x = pos.x;
        this.sphere.position.y = pos.y;
        this.sphere.position.z = pos.z;
    }
    return FoodParticle;
})();

var Particle = (function () {
    function Particle(pos) {
        this.position = pos;
        var sphereGeo = new THREE.SphereGeometry(0.05, 4, 4);
        var standardMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        this.sphere = new THREE.Mesh(sphereGeo, standardMaterial);
        this.sphere.position.x = pos.x;
        this.sphere.position.y = pos.y;
        this.sphere.position.z = pos.z;
    }
    return Particle;
})();

/*

Queue.js

A function to represent a queue

Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */
function Queue() {

  // initialise the queue and offset
  var queue  = [];
  var offset = 0;

  // Returns the length of the queue.
  this.getLength = function(){
    return (queue.length - offset);
  }

  // Returns true if the queue is empty, and false otherwise.
  this.isEmpty = function(){
    return (queue.length == 0);
  }

  /* Enqueues the specified item. The parameter is:
   *
   * item - the item to enqueue
   */
  this.enqueue = function(item){
    queue.push(item);
  }

  /* Dequeues an item and returns it. If the queue is empty, the value
   * 'undefined' is returned.
   */
  this.dequeue = function(){

    // if the queue is empty, return immediately
    if (queue.length == 0) return undefined;

    // store the item at the front of the queue
    var item = queue[offset];

    // increment the offset and remove the free space if necessary
    if (++ offset * 2 >= queue.length){
      queue  = queue.slice(offset);
      offset = 0;
    }

    // return the dequeued item
    return item;

  }

  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  this.peek = function(){
    return (queue.length > 0 ? queue[offset] : undefined);
  }

}

var Snake = (function () {
    function Snake(headPos, dir, sphere, scene) {
        this.direction = dir;
        this.headPosition = headPos;
        this.particles = new Queue();
        this.surface = sphere;
        this.scene = scene;
        for (var i = 0; i < Snake.INIT_LENGTH; i++) {
            this.growHead();
        }
    }
    Snake.prototype.getLength = function () {
        return this.particles.getLength();
    };
    Snake.prototype.growHead = function () {
        var head;
        var deltaT = 1 / 100.0;
        this.headPosition
            .add(this.direction.clone().multiplyScalar(deltaT))
            .setLength(this.surface.radius);
        head = new Particle(this.headPosition);
        this.particles.enqueue(head);
        var normal = this.headPosition.clone().normalize();
        var normDir = normal.clone().multiplyScalar(this.direction.dot(normal));
        this.direction.sub(normDir).normalize();
        this.scene.add(head.sphere);
    };
    Snake.prototype.chopTail = function () {
        var tailParticle = this.particles.dequeue();
        this.scene.remove(tailParticle.sphere);
    };
    Snake.prototype.turn = function (leftOrRight) {
        var rotationAngle = Math.PI / 60;
        this.direction = this.direction.applyAxisAngle(this.headPosition.clone().normalize(), leftOrRight * rotationAngle);
    };
    Snake.prototype.moveForward = function () {
        this.chopTail();
        this.growHead();
    };
    Snake.prototype._checkInvariants = function () {
    };
    Snake.INIT_LENGTH = 30;
    Snake.LEFT = 1;
    Snake.RIGHT = -1;
    return Snake;
})();

var Updater = (function () {
    function Updater(scene, snakeA, snakeB, cameraA, cameraB) {
        this.scene = scene;
        this.snakeA = snakeA;
        this.snakeB = snakeB;
        this.cameraA = cameraA;
        this.cameraB = cameraB;
    }
    Updater.prototype.updateCameraPositions = function () {
        var snakeHead = this.snakeA.headPosition;
        this.cameraA.position.x = snakeHead.x * 3.5;
        this.cameraA.position.y = snakeHead.y * 3.5;
        this.cameraA.position.z = snakeHead.z * 3.5;
        this.cameraA.lookAt(new THREE.Vector3(0, 0, 0));
        this.cameraA.up = this.snakeA.direction;
        var snake2Head = this.snakeB.headPosition;
        this.cameraB.position.x = snake2Head.x * 3.5;
        this.cameraB.position.y = snake2Head.y * 3.5;
        this.cameraB.position.z = snake2Head.z * 3.5;
        this.cameraB.lookAt(new THREE.Vector3(0, 0, 0));
        this.cameraB.up = this.snakeB.direction;
    };
    Updater.prototype.updateStats = function () {
        stats.update();
    };
    Updater.randomPointOnSphere = function (r) {
        var u = Math.random();
        var v = Math.random();
        var theta = 2 * Math.PI * u;
        var phi = Math.acos(2 * v - 1);
        var x = r * Math.sin(phi) * Math.cos(theta);
        var y = r * Math.sin(phi) * Math.sin(theta);
        var z = r * Math.cos(phi);
        return new THREE.Vector3(x, y, z);
    };
    Updater.prototype.spawnFood = function () {
        var spawnLocation = Updater.randomPointOnSphere(1);
        var food = new FoodParticle(spawnLocation);
        this.scene.add(food.sphere);
    };
    Updater.prototype.update = function () {
        if (keyboard.pressed("A")) {
            this.snakeA.turn(Snake.LEFT);
        }
        else if (keyboard.pressed("D")) {
            this.snakeA.turn(Snake.RIGHT);
        }
        if (keyboard.pressed("left")) {
            this.snakeB.turn(Snake.LEFT);
        }
        else if (keyboard.pressed("right")) {
            this.snakeB.turn(Snake.RIGHT);
        }
        this.snakeA.moveForward();
        this.snakeB.moveForward();
        this.updateCameraPositions();
        this.updateStats();
        this.spawnFood();
    };
    return Updater;
})();

/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./typings/All.d.ts"/>

var container, scene, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var leftCamera, rightCamera;
var updater;

init();
animate();

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
    var dir2 = new THREE.Vector3(0, 1, 0);

    var snake = new Snake(headPos, dir, geometricSphere, scene);
    var snake2 = new Snake(headPos2, dir2, geometricSphere, scene);

    updater = new Updater(scene, snake, snake2, leftCamera, rightCamera);
}

function _initScene() {
    scene = new THREE.Scene();

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

function init() {
    _initScene();
    _initCamera();
    _initRenderer();
    _initStats();
    _initUpdater();
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

// TODO
// Explore pools and what they bring into the picture
// Add better interface for customization
// Explore pools
// optimize?

var ParticleEngine = ParticleEngine || {
    _particles     : undefined,
    _particleCloud : undefined,
    _material      : undefined,
}

ParticleEngine.create = function () {
    this._particles      = new THREE.BufferGeometry();// initFunction( count, this._pool );
    var sprite = THREE.ImageUtils.loadTexture( "images/spark.png" );
    this._material       = new THREE.PointCloudMaterial( { size: 15.0,
        map: sprite,
        // alphaTest : 0.5,
        blending: THREE.NormalBlending, //THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        vertexColors: THREE.VertexColors } );
    this._particleCloud  = new THREE.PointCloud( this._particles, this._material );
};

ParticleEngine.initParticle = function ( i, positions, velocities, colors, sizes, lifetimes ) {
    // positions
    positions[ 3 * i + 0 ] = 0;
    positions[ 3 * i + 1 ] = 50;
    positions[ 3 * i + 2 ] = 0;

    // velocities
    velocities[ 3 * i + 0 ] = -10 + Math.random() * 20;
    velocities[ 3 * i + 1 ] = 10 + Math.random() * 40;
    velocities[ 3 * i + 2 ] =  -10 + Math.random() * 20;

    // colors
    var color = new THREE.Color( 0xabcdef );

    colors[ 3 * i + 0 ] = color.r;
    colors[ 3 * i + 1 ] = color.g;
    colors[ 3 * i + 2 ] = color.b;

    //lifetime
    lifetimes[ i ] = 10.0 + Math.random() * 10;

    //size
    sizes[ i ] = 1.0 + Math.random() * 5.0;
}


ParticleEngine.cubeEmitter = function ( count ) {

    var particles = this._particles;

    var positions  = new Float32Array( count * 3 );
    var velocities = new Float32Array( count * 3 );
    var sizes      = new Float32Array( count ); // needs custom shader
    var lifetimes  = new Float32Array( count );
    var colors     = new Float32Array( count * 3 );

    for( var i = 0; i < count; i++ ) {
        this.initParticle( i, positions, velocities, colors, sizes, lifetimes );
    }

    particles.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    particles.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
    particles.addAttribute( 'velocity', new THREE.BufferAttribute( velocities, 3 ) );
    particles.addAttribute( 'lifetime', new THREE.BufferAttribute( lifetimes, 1 ) );
    particles.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
};

ParticleEngine.update = function () {

    var positions  = this._particles.getAttribute('position').array;
    var velocities = this._particles.getAttribute('velocity').array;
    var colors     = this._particles.getAttribute('color').array;
    var lifetimes  = this._particles.getAttribute('lifetime').array;
    var sizes      = this._particles.getAttribute('size').array;

    var count = positions.length / 3;
    var timestep = 0.1;
    var gravity = new THREE.Vector3( 0, 0, 0 );

    var start_color = new THREE.Color ( 1.0, 0.0, 0.0 );
    var end_color   = new THREE.Color ( 0.0, 0.0, 1.0 );

    for ( var i = 0 ; i < count ; i++ ) {
        var base_idx = 3 * i;

        var pos = new THREE.Vector3( positions[ base_idx ], positions[ base_idx + 1 ], positions[base_idx + 2]);
        var vel = new THREE.Vector3( velocities[ base_idx ], velocities[ base_idx + 1 ], velocities[base_idx + 2]);
        var col = new THREE.Vector3( colors[ base_idx ], colors[ base_idx + 1], colors[base_idx + 2]);
        var size  = sizes [ i ];
        var lifetime = lifetimes[ i ];

        lifetimes[ i ] = lifetime - timestep;

        if ( lifetimes[ i ] < 0 ) {
            this.initParticle ( i, positions, velocities, colors, sizes, lifetimes );
            continue;
        }

        var vel_change = vel.clone().multiplyScalar( timestep );
        pos.add( vel_change );

        vel.add( gravity.clone().multiplyScalar( timestep ) );
        var factor = lifetime / 30;
        col = start_color.clone().multiplyScalar( factor ).add ( end_color.clone().multiplyScalar(1-factor) );


        colors[ base_idx    ] = col.r;
        colors[ base_idx + 1] = col.g;
        colors[ base_idx + 2] = col.b;

        if ( pos.y <= - 10.0 ) {
            positions[base_idx + 1]  = -10.0;
            continue;
        }

        positions[ base_idx    ] = pos.x;
        positions[ base_idx + 1] = pos.y ;
        positions[ base_idx + 2] = pos.z;

        velocities[ base_idx    ] = vel.x;
        velocities[ base_idx + 1] = vel.y;
        velocities[ base_idx + 2] = vel.z;

    }

    this._particles.attributes.position.needsUpdate = true;
    this._particles.attributes.velocity.needsUpdate = true;
    this._particles.attributes.size.needsUpdate = true;
    this._particles.attributes.color.needsUpdate = true;
    this._particles.attributes.lifetime.needsUpdate = true;
}


ParticleEngine.getParticles = function () {
    return this._particleCloud;
};

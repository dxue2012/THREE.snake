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
        var aIntoB = Collision.snakeWithSnake(this.snakeA, this.snakeB);
        var bIntoA = Collision.snakeWithSnake(this.snakeB, this.snakeA);
        if (aIntoB && bIntoA) {
            console.log("both");
        }
        else if (aIntoB) {
            console.log("a into b");
        }
        else if (bIntoA) {
            console.log("b into a");
        }
        this.updateCameraPositions();
        this.updateStats();
    };
    return Updater;
})();

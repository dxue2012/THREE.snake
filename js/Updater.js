var Updater = (function () {
    function Updater() {
    }
    Updater.prototype.turn = function (direction) {
        var LEFT = "A";
        var RIGHT = "D";
        var rotationAngle = Math.PI / 6;
        if (keyboard.pressed(LEFT)) {
            var newDirection = snake.direction.applyAxisAngle(snake.headPosition.clone().normalize(), rotationAngle);
            snake.direction = newDirection;
        }
        else if (keyboard.pressed(RIGHT)) {
            var newDirection = snake.direction.applyAxisAngle(snake.headPosition.clone().normalize(), -rotationAngle);
            snake.direction = newDirection;
        }
    };
    Updater.prototype.moveForward = function () {
    };
    Updater.prototype.updateCameraPositions = function () {
        var relativeCameraOffset = new THREE.Vector3(0, 50, 200 + 100);
        var cameraOffset = relativeCameraOffset.applyMatrix4(MovingCube.matrixWorld);
        chaseCamera.position.x = cameraOffset.x;
        chaseCamera.position.y = cameraOffset.y;
        chaseCamera.position.z = cameraOffset.z;
        chaseCamera.lookAt(MovingCube.position);
    };
    Updater.prototype.updateStats = function () {
        stats.update();
    };
    Updater.prototype.update = function () {
        snake.turn("A");
        this.moveForward();
        this.updateCameraPositions();
        this.updateStats();
    };
    return Updater;
})();

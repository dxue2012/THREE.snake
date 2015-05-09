declare var stats;
declare var keyboard;
declare var chaseCamera;
declare var MovingCube;
declare var snake: ISnake;

class Updater {

    public turn(direction) {
        var LEFT = "A";
        var RIGHT = "D";
        var rotationAngle = Math.PI / 6;

        if (keyboard.pressed(LEFT)) {
            var newDirection: THREE.Vector3 = snake.direction.applyAxisAngle(
                snake.headPosition.clone().normalize(), rotationAngle);
            snake.direction = newDirection;
        } else if (keyboard.pressed(RIGHT)) {
            var newDirection: THREE.Vector3 = snake.direction.applyAxisAngle(
                snake.headPosition.clone().normalize(), -rotationAngle);
            snake.direction = newDirection;
        }
    }

    public moveForward() {
    }

    public updateCameraPositions() {
        var relativeCameraOffset = new THREE.Vector3(0, 50, 200 + 100);
        var cameraOffset = relativeCameraOffset.applyMatrix4(MovingCube.matrixWorld);
        chaseCamera.position.x = cameraOffset.x;
        chaseCamera.position.y = cameraOffset.y;
        chaseCamera.position.z = cameraOffset.z;
        chaseCamera.lookAt(MovingCube.position);
    }

    public updateStats() {
        stats.update();
    }

    public update() {
        // rotate first
        snake.turn("A");

        // always move forward
        this.moveForward();

        // updateCameraPositions
        this.updateCameraPositions();

        // update stats
        this.updateStats();
    }

}

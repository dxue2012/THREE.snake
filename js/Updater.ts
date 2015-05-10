declare var stats;
declare var keyboard;

class Updater {
    private foodCollection: any;

    constructor(
        private scene: THREE.Scene,
        private snakeA: ISnake,
        private snakeB: ISnake,
        private cameraA: THREE.PerspectiveCamera,
        private cameraB: THREE.PerspectiveCamera
    ) {
    }

    public updateCameraPositions() {
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
    }

    public updateStats() {
        stats.update();
    }

    // TODO: move this function to Utils
    private static randomPointOnSphere(r: number) {
        // using the method described here:
        // http://mathworld.wolfram.com/SpherePointPicking.html
        var u = Math.random();
        var v = Math.random();
        var theta = 2 * Math.PI * u;
        var phi = Math.acos(2 * v - 1);

        var x = r * Math.sin(phi) * Math.cos(theta);
        var y = r * Math.sin(phi) * Math.sin(theta);
        var z = r * Math.cos(phi);

        return new THREE.Vector3(x, y, z);
    }

    // make food disappear after a while
    public spawnFood() {
        // TODO: assume map is a unit sphere
        var spawnLocation = Updater.randomPointOnSphere(1);
        var food = new FoodParticle(spawnLocation);
        this.scene.add(food.sphere);
    }

    public update() {
        // rotate first
        if (keyboard.pressed("A")) {
            this.snakeA.turn(Snake.LEFT);
        } else if (keyboard.pressed("D")) {
            this.snakeA.turn(Snake.RIGHT);
        }

        if (keyboard.pressed("left")) {
            this.snakeB.turn(Snake.LEFT);
        } else if (keyboard.pressed("right")) {
            this.snakeB.turn(Snake.RIGHT);
        }

        // always move forward
        this.snakeA.moveForward();
        this.snakeB.moveForward();

        var aIntoB = Collision.snakeWithSnake(this.snakeA, this.snakeB);
        var bIntoA = Collision.snakeWithSnake(this.snakeB, this.snakeA);

        if (aIntoB && bIntoA) {
            console.log("both");
        } else if (aIntoB) {
            console.log("a into b");
        } else if (bIntoA) {
            console.log("b into a");
        }

        // updateCameraPositions
        this.updateCameraPositions();

        // update stats
        this.updateStats();

        // Spawn food
        // this.spawnFood();
    }
}

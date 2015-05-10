declare var stats;
declare var keyboard;

class Updater {
    private static InvulnerableTime = 500;

    constructor(
        private scene: THREE.Scene,
        private snakeA: ISnake,
        private snakeB: ISnake,
        private cameraA: THREE.PerspectiveCamera,
        private cameraB: THREE.PerspectiveCamera,
        private neutralItemCollection: NeutralItemCollection
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

        var aIntoA = Collision.snakeWithSnake(this.snakeA, this.snakeA);
        var bIntoB = Collision.snakeWithSnake(this.snakeB, this.snakeB);

        if (aIntoB && bIntoA) {
            this.snakeA.shorten(this.snakeA.getLength() * 0.5);
            this.snakeB.shorten(this.snakeB.getLength() * 0.5);
            this.snakeA.makeInvulnerable(Updater.InvulnerableTime);
            this.snakeB.makeInvulnerable(Updater.InvulnerableTime);
        } else if (aIntoB) {
            this.snakeA.shorten(this.snakeA.getLength() * 0.5);
            this.snakeA.makeInvulnerable(Updater.InvulnerableTime);
        } else if (bIntoA) {
            this.snakeB.shorten(this.snakeB.getLength() * 0.5);
            this.snakeB.makeInvulnerable(Updater.InvulnerableTime);
        }

        var foodCollection = this.neutralItemCollection.getFoodCollection();
        for (let i = foodCollection.length - 1; i >= 0; i--) {
            if (Collision.snakeWithFood(this.snakeA, foodCollection[i])) {
                // kill food particle
                // spawn new food particle
                this.neutralItemCollection.respawnFood(foodCollection[i]);
                // grow snake
            }
        }

        // updateCameraPositions
        this.updateCameraPositions();

        // update stats
        this.updateStats();

        // Spawn food
        // this.spawnFood();
    }
}

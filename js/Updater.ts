declare var stats;
declare var keyboard;

class Updater {
    private static InvulnerableTime = 200;
    private static SpeedupTime = 200;
    public static SNAKE_A: number = 1;
    public static TIE: number = 0;
    public static SNAKE_B: number = -1;

    public gameStats: GameStats;

    constructor(
        private scene: THREE.Scene,
        private snakeA: ISnake,
        private snakeB: ISnake,
        private cameraA: THREE.PerspectiveCamera,
        private cameraB: THREE.PerspectiveCamera,
        private neutralItemCollection: NeutralItemCollection
    ) {
        this.gameStats = new GameStats(snakeA, snakeB);
    }

    public getWinner(): number {
        var snakeALength = this.snakeA.getLength();
        var snakeBLength = this.snakeB.getLength();
        if (snakeALength > snakeBLength) {
            return Updater.SNAKE_A;
        } else if (snakeALength === snakeBLength) {
            return Updater.TIE;
        } else {
            return Updater.SNAKE_B;
        }
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

    // rotate and update ui
    private _updateKeys() {
        $('#left-left').removeClass('key-pressed');
        $('#left-right').removeClass('key-pressed');
        if (keyboard.pressed("A")) {
            $('#left-left').addClass('key-pressed');
        } else if (keyboard.pressed("D")) {
            $('#left-right').addClass('key-pressed');
        }

        $('#right-left').removeClass('key-pressed');
        $('#right-right').removeClass('key-pressed');

        if (keyboard.pressed("left")) {
            $('#right-left').addClass('key-pressed');
        } else if (keyboard.pressed("right")) {
            $('#right-right').addClass('key-pressed');
        }
    }

    private _updateTurn() {
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
    }

    private _updateSnakeCollision() {
        var aIntoB = Collision.snakeWithSnake(this.snakeA, this.snakeB);
        var bIntoA = Collision.snakeWithSnake(this.snakeB, this.snakeA);
        var aIntoA = Collision.snakeWithSnake(this.snakeA, this.snakeA);
        var bIntoB = Collision.snakeWithSnake(this.snakeB, this.snakeB);

        if (aIntoB && bIntoA) {
            this.snakeA.shorten(this.snakeA.getLength() * 0.5);
            this.snakeB.shorten(this.snakeB.getLength() * 0.5);
            this.snakeA.makeInvulnerable(Updater.InvulnerableTime);
            this.snakeB.makeInvulnerable(Updater.InvulnerableTime);
            this.gameStats.snakeAKilled++;
            this.gameStats.snakeBKilled++;

        } else if (aIntoB) {
            this.snakeA.shorten(this.snakeA.getLength() * 0.5);
            this.snakeA.makeInvulnerable(Updater.InvulnerableTime);
            this.gameStats.snakeAKilled++;

        } else if (bIntoA) {
            this.snakeB.shorten(this.snakeB.getLength() * 0.5);
            this.snakeB.makeInvulnerable(Updater.InvulnerableTime);
            this.gameStats.snakeBKilled++;

        } else if (aIntoA) {
            this.snakeA.shorten(this.snakeA.getLength() * 0.5);
            this.snakeA.makeInvulnerable(Updater.InvulnerableTime);
            this.gameStats.snakeASuicides++;

        } else if (bIntoB) {
            this.snakeB.shorten(this.snakeB.getLength() * 0.5);
            this.snakeB.makeInvulnerable(Updater.InvulnerableTime);
            this.gameStats.snakeBSuicides++;
        }
    }

    private _updateFoodCollision() {
        var foodCollection = this.neutralItemCollection.getFoodCollection();
        for (let i = foodCollection.length - 1; i >= 0; i--) {
            if (Collision.snakeWithFood(this.snakeA, foodCollection[i])) {
                // grow snake
                this.snakeA.growLength(foodCollection[i].value);
                this.gameStats.addSnakeAFood();

                // Food with value 15 makes the snake invincible
                if (foodCollection[i].value === FoodParticle.INVINCIBLE_VALUE) {
                    this.snakeA.invulnerableTime += Updater.InvulnerableTime;
                    Sound.powerup();
                }

                if (foodCollection[i].value === FoodParticle.BOOST_VALUE) {
                    this.snakeA.speed = Snake.BOOSTED_SPEED;
                    this.snakeA.speedupTime = Updater.SpeedupTime;
                }

                // kill food particle, spawn new food particle
                this.neutralItemCollection.respawnFood(foodCollection[i]);
            }

            if (Collision.snakeWithFood(this.snakeB, foodCollection[i])) {
                // grow snake
                this.snakeB.growLength(foodCollection[i].value);
                this.gameStats.addSnakeBFood();
                console.log(this.gameStats.snakeBFood)

                // Food with value 15 makes the snake invincible
                if (foodCollection[i].value === FoodParticle.INVINCIBLE_VALUE) {
                    this.snakeB.invulnerableTime += Updater.InvulnerableTime;
                    Sound.powerup();
                }

                if (foodCollection[i].value === FoodParticle.BOOST_VALUE) {
                    this.snakeB.speed = Snake.BOOSTED_SPEED;
                    this.snakeB.speedupTime = Updater.SpeedupTime;
                }

                this.neutralItemCollection.respawnFood(foodCollection[i]);
            }
        }
    }

    public update() {
        this._updateKeys();
        this._updateTurn();

        // always move forward
        this.snakeA.moveForward();
        this.snakeB.moveForward();

        this._updateSnakeCollision();
        this._updateFoodCollision();

        // updateCameraPositions
        this.updateCameraPositions();

        // update stats
        this.updateStats();
    }
}

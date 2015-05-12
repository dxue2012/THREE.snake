declare var stats;
declare var keyboard;

class Updater {
    public static InvulnerableTime = 200;
    public static SpeedupTime = 200;
    public static SNAKE_A: number = 1;
    public static TIE: number = 0;
    public static SNAKE_B: number = -1;

    public gameStats: GameStats;

    private $leftLeft: JQuery;
    private $leftRight: JQuery;
    private $rightLeft: JQuery;
    private $rightRight: JQuery;

    constructor(
        private scene: THREE.Scene,
        private snakeA: ISnake,
        private snakeB: ISnake,
        private cameraA: THREE.PerspectiveCamera,
        private cameraB: THREE.PerspectiveCamera,
        private neutralItemCollection: NeutralItemCollection
    ) {
        this.gameStats = new GameStats(snakeA, snakeB);

        this.$leftLeft = $('#left-left');
        this.$leftRight = $('#left-right');
        this.$rightLeft = $('#right-left');
        this.$rightRight = $('#right-right');
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

    private _updateCameraPositions() {
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

    private _updateStats() {
        stats.update();
    }

    // rotate and update ui
    private _updateKeys() {
        this.$leftLeft.removeClass('key-pressed');
        this.$leftRight.removeClass('key-pressed');
        if (keyboard.pressed("A")) {
            this.$leftLeft.addClass('key-pressed');
        } else if (keyboard.pressed("D")) {
            this.$leftRight.addClass('key-pressed');
        }

        this.$rightLeft.removeClass('key-pressed');
        this.$rightRight.removeClass('key-pressed');

        if (keyboard.pressed("left")) {
            this.$rightLeft.addClass('key-pressed');
        } else if (keyboard.pressed("right")) {
            this.$rightRight.addClass('key-pressed');
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
            // this.redLight();

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
                    this.snakeA.makeInvulnerable(Updater.InvulnerableTime);
                    Sound.powerup();
                }

                if (foodCollection[i].value === FoodParticle.BOOST_VALUE) {
                    this.snakeA.boost(Updater.SpeedupTime);
                    Sound.powerup();
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
                    this.snakeB.makeInvulnerable(Updater.InvulnerableTime);
                    Sound.powerup();
                }

                if (foodCollection[i].value === FoodParticle.BOOST_VALUE) {
                    this.snakeB.boost(Updater.SpeedupTime);
                    Sound.powerup();
                }

                this.neutralItemCollection.respawnFood(foodCollection[i]);
            }
        }
    }

    private redLight() {
        var redLight = new THREE.AmbientLight(0xff0000);
        this.scene.add(redLight);
        var hex = redLight.color.getHex();
        for (var i = 0; hex != 0x000000; i++) {
          hex--;
          redLight.color.setHex(hex);
        }

        // this.scene.remove(redLight);
    }

    public update() {
        this._updateKeys();
        this._updateTurn();

        // always move forward
        this.snakeA.moveForward();
        this.snakeB.moveForward();

        this._updateSnakeCollision();
        this._updateFoodCollision();

        // camera positions
        this._updateCameraPositions();

        // update stats
        this._updateStats();
    }
}

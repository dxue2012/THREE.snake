var Updater = (function () {
    function Updater(scene, snakeA, snakeB, cameraA, cameraB, neutralItemCollection) {
        this.scene = scene;
        this.snakeA = snakeA;
        this.snakeB = snakeB;
        this.cameraA = cameraA;
        this.cameraB = cameraB;
        this.neutralItemCollection = neutralItemCollection;
        this.gameStats = new GameStats(snakeA, snakeB);
        this.$leftLeft = $('#left-left');
        this.$leftRight = $('#left-right');
        this.$rightLeft = $('#right-left');
        this.$rightRight = $('#right-right');
    }
    Updater.prototype.getWinner = function () {
        var snakeALength = this.snakeA.getLength();
        var snakeBLength = this.snakeB.getLength();
        if (snakeALength > snakeBLength) {
            return Updater.SNAKE_A;
        }
        else if (snakeALength === snakeBLength) {
            return Updater.TIE;
        }
        else {
            return Updater.SNAKE_B;
        }
    };
    Updater.prototype._updateCameraPositions = function () {
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
    Updater.prototype._updateStats = function () {
        stats.update();
    };
    Updater.prototype._updateKeys = function () {
        this.$leftLeft.removeClass('key-pressed');
        this.$leftRight.removeClass('key-pressed');
        if (keyboard.pressed("A")) {
            this.$leftLeft.addClass('key-pressed');
        }
        else if (keyboard.pressed("D")) {
            this.$leftRight.addClass('key-pressed');
        }
        this.$rightLeft.removeClass('key-pressed');
        this.$rightRight.removeClass('key-pressed');
        if (keyboard.pressed("left")) {
            this.$rightLeft.addClass('key-pressed');
        }
        else if (keyboard.pressed("right")) {
            this.$rightRight.addClass('key-pressed');
        }
    };
    Updater.prototype._updateTurn = function () {
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
    };
    Updater.prototype._updateSnakeCollision = function () {
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
        }
        else if (aIntoB) {
            this.snakeA.shorten(this.snakeA.getLength() * 0.5);
            this.snakeA.makeInvulnerable(Updater.InvulnerableTime);
            this.gameStats.snakeAKilled++;
        }
        else if (bIntoA) {
            this.snakeB.shorten(this.snakeB.getLength() * 0.5);
            this.snakeB.makeInvulnerable(Updater.InvulnerableTime);
            this.gameStats.snakeBKilled++;
        }
        else if (aIntoA) {
            this.snakeA.shorten(this.snakeA.getLength() * 0.5);
            this.snakeA.makeInvulnerable(Updater.InvulnerableTime);
            this.gameStats.snakeASuicides++;
        }
        else if (bIntoB) {
            this.snakeB.shorten(this.snakeB.getLength() * 0.5);
            this.snakeB.makeInvulnerable(Updater.InvulnerableTime);
            this.gameStats.snakeBSuicides++;
        }
    };
    Updater.prototype._updateFoodCollision = function () {
        var foodCollection = this.neutralItemCollection.getFoodCollection();
        for (var i = foodCollection.length - 1; i >= 0; i--) {
            if (Collision.snakeWithFood(this.snakeA, foodCollection[i])) {
                this.snakeA.growLength(foodCollection[i].value);
                this.gameStats.addSnakeAFood();
                if (foodCollection[i].value === FoodParticle.INVINCIBLE_VALUE) {
                    this.snakeA.makeInvulnerable(Updater.InvulnerableTime);
                    Sound.powerup();
                }
                if (foodCollection[i].value === FoodParticle.BOOST_VALUE) {
                    this.snakeA.boost(Updater.SpeedupTime);
                    Sound.powerup();
                }
                this.neutralItemCollection.respawnFood(foodCollection[i]);
            }
            if (Collision.snakeWithFood(this.snakeB, foodCollection[i])) {
                this.snakeB.growLength(foodCollection[i].value);
                this.gameStats.addSnakeBFood();
                console.log(this.gameStats.snakeBFood);
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
    };
    Updater.prototype.redLight = function () {
        var redLight = new THREE.AmbientLight(0xff0000);
        this.scene.add(redLight);
        var hex = redLight.color.getHex();
        for (var i = 0; hex != 0x000000; i++) {
            hex--;
            redLight.color.setHex(hex);
        }
    };
    Updater.prototype.update = function () {
        this._updateKeys();
        this._updateTurn();
        this.snakeA.moveForward();
        this.snakeB.moveForward();
        this._updateSnakeCollision();
        this._updateFoodCollision();
        this._updateCameraPositions();
        this._updateStats();
    };
    Updater.InvulnerableTime = 200;
    Updater.SpeedupTime = 200;
    Updater.SNAKE_A = 1;
    Updater.TIE = 0;
    Updater.SNAKE_B = -1;
    return Updater;
})();

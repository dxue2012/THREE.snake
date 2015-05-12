var Updater = (function () {
    function Updater(scene, snakeA, snakeB, cameraA, cameraB, neutralItemCollection) {
        this.scene = scene;
        this.snakeA = snakeA;
        this.snakeB = snakeB;
        this.cameraA = cameraA;
        this.cameraB = cameraB;
        this.neutralItemCollection = neutralItemCollection;
        this.gameStats = new GameStats(snakeA, snakeB);
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
    Updater.prototype._updateKeys = function () {
        $('#left-left').removeClass('key-pressed');
        $('#left-right').removeClass('key-pressed');
        if (keyboard.pressed("A")) {
            $('#left-left').addClass('key-pressed');
        }
        else if (keyboard.pressed("D")) {
            $('#left-right').addClass('key-pressed');
        }
        $('#right-left').removeClass('key-pressed');
        $('#right-right').removeClass('key-pressed');
        if (keyboard.pressed("left")) {
            $('#right-left').addClass('key-pressed');
        }
        else if (keyboard.pressed("right")) {
            $('#right-right').addClass('key-pressed');
        }
    };
    Updater.prototype.update = function () {
        this._updateKeys();
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
        var foodCollection = this.neutralItemCollection.getFoodCollection();
        for (var i_1 = foodCollection.length - 1; i_1 >= 0; i_1--) {
            if (Collision.snakeWithFood(this.snakeA, foodCollection[i_1])) {
                this.snakeA.growLength(foodCollection[i_1].value);
                this.gameStats.addSnakeAFood();
                if (foodCollection[i_1].value === Updater.ENHANCE_VALUE) {
                    this.snakeA.invulnerableTime += Updater.InvulnerableTime;
                }
                this.neutralItemCollection.respawnFood(foodCollection[i_1]);
            }
            if (Collision.snakeWithFood(this.snakeB, foodCollection[i_1])) {
                this.snakeB.growLength(foodCollection[i_1].value);
                this.gameStats.addSnakeBFood();
                console.log(this.gameStats.snakeBFood);
                if (foodCollection[i_1].value === Updater.ENHANCE_VALUE) {
                    this.snakeB.invulnerableTime += Updater.InvulnerableTime;
                }
                this.neutralItemCollection.respawnFood(foodCollection[i_1]);
            }
        }
        this.updateCameraPositions();
        this.updateStats();
    };
    Updater.InvulnerableTime = 200;
    Updater.ENHANCE_VALUE = 15;
    Updater.SNAKE_A = 1;
    Updater.TIE = 0;
    Updater.SNAKE_B = -1;
    return Updater;
})();

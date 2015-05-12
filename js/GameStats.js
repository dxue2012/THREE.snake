var GameStats = (function () {
    function GameStats(snakeA, snakeB) {
        this.snakeA = snakeA;
        this.snakeB = snakeB;
        this.snakeAFood = 0;
        this.snakeBFood = 0;
        this.snakeASuicides = 0;
        this.snakeBSuicides = 0;
        this.snakeAKilled = 0;
        this.snakeBKilled = 0;
    }
    GameStats.prototype.addSnakeAFood = function () {
        this.snakeAFood++;
    };
    GameStats.prototype.addSnakeBFood = function () {
        this.snakeBFood++;
    };
    GameStats.prototype.getSnakeALength = function () {
        return this.snakeA.getLength();
    };
    GameStats.prototype.getSnakeBLength = function () {
        return this.snakeB.getLength();
    };
    GameStats.prototype.printLeftStats = function (display) {
        if (this.snakeA.getLength() > this.snakeB.getLength()) {
            display.html("You win!");
        }
        else if (this.snakeA.getLength() == this.snakeB.getLength()) {
            display.html("Tie");
        }
        else {
            display.html("You lose");
        }
        display.append("<br> Snake Length: " + this.snakeA.getLength());
        display.append("<br> Bumped into Enemy: " + this.snakeAKilled);
        display.append("<br> Bumped into Yourself: " + this.snakeASuicides);
    };
    GameStats.prototype.printRightStats = function (display) {
        if (this.snakeA.getLength() > this.snakeB.getLength()) {
            display.html("You lose!");
        }
        else if (this.snakeA.getLength() == this.snakeB.getLength()) {
            display.html("Tie");
        }
        else {
            display.html("You win");
        }
        display.append("<br> Snake Length: " + this.snakeB.getLength());
        display.append("<br> Bumped into Enemy: " + this.snakeBKilled);
        display.append("<br> Bumped into Yourself: " + this.snakeBSuicides);
    };
    return GameStats;
})();

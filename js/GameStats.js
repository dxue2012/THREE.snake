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
    GameStats.prototype.printStats = function (display) {
        display.html("<b>" + this.snakeA.getLength() + "   Snake Length   " + this.snakeB.getLength() + "</b><p>"
            + this.snakeAFood + "   Food Eaten  " + this.snakeBFood + "<p>"
            + this.snakeAKilled + "   Bumped into enemy   " + this.snakeBKilled + "<p>"
            + this.snakeASuicides + "   Bumped into yourself   " + this.snakeBSuicides);
    };
    return GameStats;
})();

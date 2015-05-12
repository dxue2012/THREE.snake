var Stats = (function () {
    function Stats(snakeA, snakeB) {
        this.snakeA = snakeA;
        this.snakeB = snakeB;
        this.snakeAFood = 0;
        this.snakeBFood = 0;
        this.snakeASuicides = 0;
        this.snakeBSuicides = 0;
        this.snakeAKilled = 0;
        this.snakeBKilled = 0;
    }
    Stats.prototype.addSnakeAFood = function () {
        this.snakeAFood++;
    };
    Stats.prototype.addSnakeBFood = function () {
        this.snakeBFood++;
    };
    Stats.prototype.addSnakeASuicide = function () {
        this.snakeASuicides++;
    };
    return Stats;
})();

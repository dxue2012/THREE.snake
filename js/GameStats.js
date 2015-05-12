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
            display.find('.panel-heading').find('.panel-title').text('You win!');
        }
        else if (this.snakeA.getLength() == this.snakeB.getLength()) {
            display.find('.panel-heading').find('.panel-title').text('Tie');
        }
        else {
            display.find('.panel-heading').find('.panel-title').text('You lose ):');
        }
        display.find('.panel-body').html("Snake Length:          " + this.snakeA.getLength() + "<br>" +
            "Food Eaten:             " + this.snakeAFood + "<br>" +
            "Bumped into Enemy:     " + this.snakeAKilled + "<br>" +
            "Bumped into Yourself:  " + this.snakeASuicides);
    };
    GameStats.prototype.printRightStats = function (display) {
        if (this.snakeA.getLength() > this.snakeB.getLength()) {
            display.find('.panel-heading').find('.panel-title').text('You lose ):');
        }
        else if (this.snakeA.getLength() == this.snakeB.getLength()) {
            display.find('.panel-heading').find('.panel-title').text('Tie');
        }
        else {
            display.find('.panel-heading').find('.panel-title').text('You win!');
        }
        display.find('.panel-body').html("Snake Length:          " + this.snakeB.getLength() + "<br>" +
            "Food Eaten:            " + this.snakeBFood + "<br>" +
            "Bumped into Enemy:     " + this.snakeBKilled + "<br>" +
            "Bumped into Yourself:  " + this.snakeBSuicides);
    };
    return GameStats;
})();

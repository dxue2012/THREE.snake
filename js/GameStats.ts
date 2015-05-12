class GameStats  {

    public snakeA: ISnake;
    public snakeB: ISnake;
    public snakeAFood: number; // number of food eaten
    public snakeBFood: number;
    public snakeASuicides: number; // number of time it hits itself
    public snakeBSuicides: number;
    public snakeAKilled: number; // number of time it hits the other snake
    public snakeBKilled: number;

    constructor(snakeA: ISnake, snakeB: ISnake) {
        this.snakeA = snakeA;
        this.snakeB = snakeB;

        this.snakeAFood = 0;
        this.snakeBFood = 0;
        this.snakeASuicides = 0;
        this.snakeBSuicides = 0;
        this.snakeAKilled = 0;
        this.snakeBKilled = 0;
    }

    public addSnakeAFood() {
        this.snakeAFood++;
    }

    public addSnakeBFood() {
        this.snakeBFood++;
    }

    public getSnakeALength(): number {
      return this.snakeA.getLength()
    }

    public getSnakeBLength(): number {
      return this.snakeB.getLength()
    }

    public printLeftStats(display) {
        if (this.snakeA.getLength() > this.snakeB.getLength()) {
          display.find('.panel-heading').find('.panel-title').text('You win!');
        } else if (this.snakeA.getLength() == this.snakeB.getLength()){
            display.find('.panel-heading').find('.panel-title').text('Tie');
        } else {
          display.find('.panel-heading').find('.panel-title').text('You lose ):');
        }

        display.find('.panel-body').html("Snake Length:          " + this.snakeA.getLength() + "<br>" +
                                         "Bumped into Enemy:     " + this.snakeAKilled + "<br>" +
                                         "Bumped into Yourself:  " + this.snakeASuicides)
    }

    public printRightStats(display) {
        if (this.snakeA.getLength() > this.snakeB.getLength()) {
          display.find('.panel-heading').find('.panel-title').text('You lose ):');
        } else if (this.snakeA.getLength() == this.snakeB.getLength()){
            display.find('.panel-heading').find('.panel-title').text('Tie');
        } else {
          display.find('.panel-heading').find('.panel-title').text('You win!');
        }

        display.find('.panel-body').html("Snake Length:          " + this.snakeB.getLength() + "<br>" +
                                         "Bumped into Enemy:     " + this.snakeBKilled + "<br>" +
                                         "Bumped into Yourself:  " + this.snakeBSuicides)
    }



}

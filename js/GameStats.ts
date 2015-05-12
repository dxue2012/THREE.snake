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
            display.html("You win!");
        } else if (this.snakeA.getLength() == this.snakeB.getLength()){
            display.html("Tie");
        } else {
            display.html("You lose");
        }

        display.append("<br> Snake Length: " + this.snakeA.getLength());
        display.append("<br> Bumped into Enemy: " + this.snakeAKilled);
        display.append("<br> Bumped into Yourself: " + this.snakeASuicides);
    }

    public printRightStats(display) {
        if (this.snakeA.getLength() > this.snakeB.getLength()) {
            display.html("You lose!");
        } else if (this.snakeA.getLength() == this.snakeB.getLength()){
            display.html("Tie");
        } else {
            display.html("You win");
        }

        display.append("<br> Snake Length: " + this.snakeB.getLength());
        display.append("<br> Bumped into Enemy: " + this.snakeBKilled);
        display.append("<br> Bumped into Yourself: " + this.snakeBSuicides);
    }



}

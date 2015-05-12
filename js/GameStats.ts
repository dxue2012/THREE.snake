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

    public printStats(display) {
        display.html("<b>" + this.snakeA.getLength() + "   Snake Length   " + this.snakeB.getLength() + "</b><p>"
        + this.snakeAFood + "   Food Eaten  " + this.snakeBFood + "<p>"
        + this.snakeAKilled + "   Bumped into enemy   " + this.snakeBKilled + "<p>"
        + this.snakeASuicides + "   Bumped into yourself   " + this.snakeBSuicides)
    }



}

class Stats  {
    snakeA: ISnake;
    snakeB: ISnake;
    snakeAFood: number; // number of food eaten
    snakeBFood: number;
    snakeASuicides: number; // number of time it hits itself
    snakeBSuicides: number;
    snakeAKilled: number; // number of time it hits the other snake
    snakeBKilled: number;

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

    public addSnakeAFood () {
        this.snakeAFood++;
    }

    public addSnakeBFood () {
        this.snakeBFood++;
    }

    public addSnakeASuicide() {
        this.snakeASuicides++;
    }





}

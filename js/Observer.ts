class Observer {
    constructor(private snake: ISnake, private progressBar: JQuery) {
        this.listenToStatus();
    }

    public registerListener(listener) {

    }

    public listenToStatus() {
        if (this.snake.isInvulnerable()) {
            this.progressBar.show();
        } else {
            this.progressBar.hide();
        }
    }
}

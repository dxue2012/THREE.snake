var Observer = (function () {
    function Observer(snake, progressBar) {
        this.snake = snake;
        this.progressBar = progressBar;
        this.listenToStatus();
    }
    Observer.prototype.registerListener = function (listener) {
    };
    Observer.prototype.listenToStatus = function () {
        if (this.snake.isInvulnerable()) {
            this.progressBar.show();
        }
        else {
            this.progressBar.hide();
        }
    };
    return Observer;
})();

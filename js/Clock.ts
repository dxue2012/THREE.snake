class Clock {
    private refreshInterval: number;

    constructor(
        private duration: number,
        private display: any,
        stopCallback: () => any
    ) {
        this.startTimer(duration, display, stopCallback);
    }

    public startTimer(duration: number, display, stopCallback) {
        var timer = duration;
        var minutes, seconds;
        this.refreshInterval = setInterval(() => {
            minutes = parseInt((timer / 60).toString(), 10);
            seconds = parseInt((timer % 60).toString(), 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.text(minutes + ":" + seconds);

            if (--timer < 0) {
                this.stopTimer();
                stopCallback();
            }
        }, 1000);
    }

    public stopTimer() {
        clearInterval(this.refreshInterval);
    }
}

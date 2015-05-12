class Clock {
    private refreshInterval: number;

    constructor(
        private duration: number,
        private display: any,
        private stopCallback: () => any
    ) {
    }

    public startTimer() {
        var timer = this.duration;
        var minutes, seconds;
        this.refreshInterval = setInterval(() => {

            // update timer
            minutes = parseInt((timer / 60).toString(), 10);
            seconds = parseInt((timer % 60).toString(), 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            this.display.text(minutes + ":" + seconds);

            // update live stats


            if (--timer < 0) {
                this.stopTimer();
                this.stopCallback();
            }
        }, 1000);
    }

    public stopTimer() {
        clearInterval(this.refreshInterval);
    }
}

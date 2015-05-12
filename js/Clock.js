var Clock = (function () {
    function Clock(duration, display, stopCallback) {
        this.duration = duration;
        this.display = display;
        this.stopCallback = stopCallback;
    }
    Clock.prototype.startTimer = function () {
        var _this = this;
        var timer = this.duration;
        var minutes, seconds;
        this.refreshInterval = setInterval(function () {
            minutes = parseInt((timer / 60).toString(), 10);
            seconds = parseInt((timer % 60).toString(), 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            _this.display.text(minutes + ":" + seconds);
            if (timer == 11)
                Sound.countdown();
            if (--timer < 0) {
                _this.stopTimer();
                _this.stopCallback();
            }
        }, 1000);
    };
    Clock.prototype.stopTimer = function () {
        clearInterval(this.refreshInterval);
    };
    return Clock;
})();

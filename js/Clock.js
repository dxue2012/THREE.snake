var Clock = (function () {
    function Clock(duration, display, stopCallback) {
        this.duration = duration;
        this.display = display;
        this.startTimer(duration, display, stopCallback);
    }
    Clock.prototype.startTimer = function (duration, display, stopCallback) {
        var _this = this;
        var timer = duration;
        var minutes, seconds;
        this.refreshInterval = setInterval(function () {
            minutes = parseInt((timer / 60).toString(), 10);
            seconds = parseInt((timer % 60).toString(), 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.text(minutes + ":" + seconds);
            if (--timer < 0) {
                _this.stopTimer();
                stopCallback();
            }
        }, 1000);
    };
    Clock.prototype.stopTimer = function () {
        clearInterval(this.refreshInterval);
    };
    return Clock;
})();

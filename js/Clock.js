var Clock = (function () {
    function Clock(duration, display) {
        this.duration = duration;
        this.display = display;
        this.startTimer(duration, display);
    }
    Clock.prototype.startTimer = function (duration, display) {
        var timer = duration;
        var minutes, seconds;
        setInterval(function () {
            minutes = parseInt((timer / 60).toString(), 10);
            seconds = parseInt((timer % 60).toString(), 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.text(minutes + ":" + seconds);
            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    };
    return Clock;
})();

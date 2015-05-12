var Sound = (function () {
    function Sound() {
    }
    Sound.background = function () {
        var audio = document.createElement('audio');
        var source = document.createElement('source');
        source.src = '/sounds/background.mp3';
        audio.appendChild(source);
        audio.play();
        audio.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
    };
    Sound.collision = function () {
        var audio = document.createElement('audio');
        var source = document.createElement('source');
        source.src = '/sounds/collision.wav';
        audio.appendChild(source);
        audio.play();
    };
    Sound.powerup = function () {
        var audio = document.createElement('audio');
        var source = document.createElement('source');
        source.src = '/sounds/powerup.wav';
        audio.appendChild(source);
        audio.play();
    };
    Sound.gameover = function () {
        var audio = document.createElement('audio');
        var source = document.createElement('source');
        source.src = '/sounds/gameover.wav';
        audio.appendChild(source);
        audio.play();
    };
    return Sound;
})();

var Sound = (function () {
    function Sound() {
    }
    Sound.background = function () {
        var audio = document.createElement('audio');
        var source = document.createElement('source');
        source.src = 'https://s3-us-west-2.amazonaws.com/three.snake/background.mp3';
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
        source.src = 'https://s3-us-west-2.amazonaws.com/three.snake/collision.wav';
        audio.appendChild(source);
        audio.play();
    };
    Sound.powerup = function () {
        var audio = document.createElement('audio');
        var source = document.createElement('source');
        source.src = 'https://s3-us-west-2.amazonaws.com/three.snake/powerup.wav';
        audio.appendChild(source);
        audio.play();
    };
    Sound.countdown = function () {
        var audio = document.createElement('audio');
        var source = document.createElement('source');
        source.src = 'https://s3-us-west-2.amazonaws.com/three.snake/countdown.mp3';
        audio.appendChild(source);
        audio.play();
    };
    Sound.gameover = function () {
        var audio = document.createElement('audio');
        var source = document.createElement('source');
        source.src = 'https://s3-us-west-2.amazonaws.com/three.snake/gameover.wav';
        audio.appendChild(source);
        audio.play();
    };
    return Sound;
})();

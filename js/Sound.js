var Sound = (function () {
    function Sound() {
    }
    Sound.background = function () {
        var audio = document.createElement('audio');
        var source = document.createElement('source');
        source.src = '/sounds/background.mp3';
        audio.appendChild(source);
        audio.play();
    };
    Sound.collision = function () {
        var audio = document.createElement('audio');
        var source = document.createElement('source');
        source.src = '/sounds/collision.wav';
        audio.appendChild(source);
        audio.play();
    };
    return Sound;
})();

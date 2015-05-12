class Sound {

    public static background(): void {
      var audio = document.createElement('audio');
      var source = document.createElement('source');
      source.src = '/sounds/background.mp3';
      audio.appendChild(source);
      audio.play();
      audio.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
          }, false);
    }

    public static collision(): void {
      var audio = document.createElement('audio');
      var source = document.createElement('source');
      source.src = '/sounds/collision.wav';
      audio.appendChild(source);
      audio.play();
    }

    public static powerup(): void {
      var audio = document.createElement('audio');
      var source = document.createElement('source');
      source.src = '/sounds/powerup.wav';
      audio.appendChild(source);
      audio.play();
    }

    public static gameover(): void {
      var audio = document.createElement('audio');
      var source = document.createElement('source');
      source.src = '/sounds/gameover.wav';
      audio.appendChild(source);
      audio.play();
    }

}

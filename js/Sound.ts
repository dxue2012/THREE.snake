class Sound {

    public static background(): void {
      var audio = document.createElement('audio');
      var source = document.createElement('source');
      source.src = 'https://s3-us-west-2.amazonaws.com/three.snake/background.mp3';
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
      source.src = 'https://s3-us-west-2.amazonaws.com/three.snake/collision.wav';
      audio.appendChild(source);
      audio.play();
    }

    public static powerup(): void {
      var audio = document.createElement('audio');
      var source = document.createElement('source');
      source.src = 'https://s3-us-west-2.amazonaws.com/three.snake/powerup.wav';
      audio.appendChild(source);
      audio.play();
    }

    public static countdown(): void {
      var audio = document.createElement('audio');
      var source = document.createElement('source');
      source.src = 'https://s3-us-west-2.amazonaws.com/three.snake/countdown.mp3';
      audio.appendChild(source);
      audio.play();
    }

    public static gameover(): void {
      var audio = document.createElement('audio');
      var source = document.createElement('source');
      source.src = 'https://s3-us-west-2.amazonaws.com/three.snake/gameover.wav';
      audio.appendChild(source);
      audio.play();
    }

}

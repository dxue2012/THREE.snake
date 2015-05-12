class Sound {

    public static background(): void {
      var audio = document.createElement('audio');
      var source = document.createElement('source');
      source.src = '/sounds/background.mp3';
      audio.appendChild(source);
      audio.play();
    }

    public static collision(): void {
      var audio = document.createElement('audio');
      var source = document.createElement('source');
      source.src = '/sounds/collision.wav';
      audio.appendChild(source);
      audio.play();
    }
}

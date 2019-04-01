function loadAudio(path) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(path);
    audio.addEventListener('loadeddata', () => {
      resolve(audio);
    });
    audio.addEventListener('error', () => {
      reject(new Error('Failed to load alarm audio'));
    });
  });
}

export default class Alarm {
  constructor(soundFile) {
    this.soundFilePath = soundFile;
  }

  notify() {
    this.playAlarm();
  }

  playAlarm() {
    const audioPlayer = loadAudio(this.soundFilePath);
    audioPlayer.then((audio) => {
      audio.play();
      setTimeout(() => {
        audio.pause();
      }, 4000);
    });
  }
}

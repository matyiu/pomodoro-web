// Alarma debe de contar con un método notify
// Habrá dos tipos de notificaciones:
//   sonido
//   notificación
// En las notificaciones de solo sonido
// Cogeremos el archivo del sonido
// Crearemos un audio
// Diremos al navegador que cargue un archivo de audio
// Cuando haya cargado
// Reproducir el sonido hasta que hayan pasado 2 segundos como máximo

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

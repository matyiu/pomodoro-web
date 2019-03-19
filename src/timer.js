export default class Timer {
  constructor(focusTime, restTime, alarm) {
    this.focusTime = focusTime;
    this.focus = true;
    this.restTime = restTime;
    this.currentTimer = focusTime;
    this.intervalTimer = null;
    this.alarm = alarm;
  }

  start() {
    this.intervalTimer = setInterval(() => {
      this.currentTimer -= 1000;

      if (this.currentTimer === 0) {
        if (this.focus) {
          this.currentTimer = this.restTime;
        } else {
          clearInterval(this.intervalTimer);
        }

        this.focus = !this.focus;
        this.alarm.notify(this.focus);
      }
    }, 1000);
  }

  pause() {
    clearInterval(this.intervalTimer);
  }

  stop() {
    clearInterval(this.intervalTimer);
    this.currentTime = this.focusTime;
  }
}

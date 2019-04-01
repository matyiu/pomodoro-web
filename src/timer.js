export default class Timer {
  constructor({
    focusTime, restTime, alarm,
  }) {
    this.focusTime = focusTime * 60 * 1000;
    this.focus = true;
    this.restTime = restTime * 60 * 1000;
    this.currentTimer = this.focusTime;
    this.intervalTimer = null;
    this.alarm = alarm;
  }

  start(ui) {
    ui.setCounter(this.currentTimer);
    this.intervalTimer = setInterval(() => {
      const repeatCycle = this.checkHourLimit();
      if (!repeatCycle && this.auto) {
        this.stop();
        ui.setCounter(0);
        this.alarm.notify(this.focus);
        return;
      }

      this.currentTimer -= 1000;
      ui.setCounter(this.currentTimer);

      if (this.currentTimer === 0) {
        if (this.focus) {
          this.currentTimer = this.restTime;
        } else if (repeatCycle && this.auto) {
          this.currentTimer = this.focusTime;
        } else {
          clearInterval(this.intervalTimer);
        }

        this.focus = !this.focus;
        this.alarm.notify(this.focus);
      }
    }, 1000);
  }

  pause() {
    this.intervalTimer = clearInterval(this.intervalTimer);
  }

  stop() {
    this.intervalTimer = clearInterval(this.intervalTimer);
    this.currentTime = this.focusTime;
  }

  changeTime(focusTime, restTime) {
    this.focusTime = focusTime * 60 * 1000;
    this.restTime = restTime * 60 * 1000;
    this.currentTimer = this.focusTime;
  }

  checkHourLimit() {
    const now = Date.now();

    return (now < this.hourLimit);
  }

  setHourLimit(hourLimit, auto) {
    this.auto = auto;
    this.hourLimit = hourLimit;
  }
}

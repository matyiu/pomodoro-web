function avoidTypingNaN(e) {
  if (isNaN(e.key) && e.key !== 'Backspace') {
    e.preventDefault();
  }
}

function startTimer(timer) {
  const focusTime = document.getElementById('focus-time').value;
  const restTime = document.getElementById('rest-time').value;
  timer.changeTime(focusTime, restTime);
  timer.start(timerScreen);
}

export const timerConfigurationScreen = {
  template: `
  <div class="wrapper">
    <section id="timer-configuration">
      <div class="cycle">
        <div id="focus">
          <p>Focus: <input type="text" pattern="\\d+" id="focus-time" value=50></p>
        </div>
        <div id="rest">
          <p>Rest: <input type="text" pattern="\\d+" id="rest-time" value=10></p>
        </div>
      </div>
    </section>
    <div class="buttons">
      <button type="button" id="start" class="primary-button">Start</button>
    </div>
  </div>
  `,
  handlers: [
    {
      id: 'focus-time',
      event: 'keydown',
      fn: avoidTypingNaN,
    },
    {
      id: 'rest-time',
      event: 'keydown',
      fn: avoidTypingNaN,
    },
    {
      id: 'start',
      event: 'click',
      changeScreen: true,
      nextScreen: 'timerScreen',
      fn: startTimer,
    },
  ],
};

function formatMs(ms) {
  const toSeconds = ms / 1000;
  const minutes = Math.floor(toSeconds / 60);
  const seconds = toSeconds - (minutes * 60);

  return `${minutes}:${seconds}`;
}

function stopTimer(timer) {
  timer.stop();
}

export const timerScreen = {
  counter: null,
  get template() {
    return (`
      <section id="timer">
        <div id="counter">${this.counter}</div>
        <div class="buttons">
          <button type="button" id="start" class="primary-button">Pause</button>
          <button type="button" id="stop" class="secondary-button">Stop</button>
        </div>
      </section>
    `);
  },
  handlers: [
    {
      id: 'stop',
      event: 'click',
      changeScreen: true,
      nextScreen: 'timerConfiguration',
      fn: stopTimer,
    },
  ],
  setCounter(currentTimer) {
    this.counter = formatMs(currentTimer);
    this.update();
  },
  update() {
    try {
      const counterElm = document.getElementById('counter');
      counterElm.innerText = this.counter;
    } catch (e) {
      if (e instanceof TypeError) {
        return;
      }

      console.log(e.msg);
    }
  },
};

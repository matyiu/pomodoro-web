function avoidTypingNaN(e) {
  if (isNaN(e.key) && e.key !== 'Backspace') {
    e.preventDefault();
  }
}

function startTimer(e, timer) {
  const focusTime = document.getElementById('focus-time').value;
  const restTime = document.getElementById('rest-time').value;
  timer.changeTime(focusTime, restTime);
  timer.start(timerScreen);
}

function addHourLimitInput(e) {
  const timerConfigurationUI = document.getElementById('timer-configuration');
  const hourLimitInput = document.getElementById('limit');
  const modeButton = document.getElementById('mode');
  if (hourLimitInput) {
    const hourLimitRow = hourLimitInput.parentElement;
    hourLimitRow.remove();
    modeButton.textContent = 'Automatic Cycle';
  } else {
    timerConfigurationUI.innerHTML += timerConfigurationScreen.hourLimitTemplate;
    modeButton.textContent = 'Normal Mode';
  }
}

export const timerConfigurationScreen = {
  template: `
  <div class="wrapper">
    <section id="timer-configuration">
      <div class="row">
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
      <button type="button" id="mode" class="secondary-button">Automatic Cycle</button>
    </div>
  </div>
  `,
  hourLimitTemplate: `
    <div class="row">
      <div id="limit">
        <p>Time Limit: <input type="text" id="hour-limit" col=5></p>
      </div>
      <div class="border"></div>
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
    {
      id: 'mode',
      event: 'click',
      fn: addHourLimitInput
    },
  ],
};

function addTrailingZeros(str, newLength) {
  const strLength = str.length;
  const repeatCharsCounter = newLength - strLength;
  const trailingZeros = '0'.repeat(repeatCharsCounter);

  return trailingZeros + str;
}

function formatMs(ms) {
  const toSeconds = ms / 1000;
  const minutes = String(Math.floor(toSeconds / 60));
  const seconds = String(toSeconds - (minutes * 60));

  return `${addTrailingZeros(minutes, 2)}:${addTrailingZeros(seconds, 2)}`;
}

function stopTimer(e, timer) {
  timer.stop();
}

function pauseTimer(e, timer) {
  if (timer.intervalTimer) {
    timer.pause();
  } else {
    timer.start(timerScreen);
  }
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
      nextScreen: 'timerConfigurationScreen',
      fn: stopTimer,
    },
    {
      id: 'start',
      event: 'click',
      fn: pauseTimer,
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

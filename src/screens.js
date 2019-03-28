function onlyNumber(e) {
  if (isNaN(e.key) && e.key !== 'Backspace') {
    e.preventDefault();
  }
}

export const timerConfiguration = {
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
      fn: onlyNumber,
    },
    {
      id: 'rest-time',
      event: 'keydown',
      fn: onlyNumber,
    },
    {
      id: 'start',
      event: 'click',
      changeScreen: true,
      nextScreen: 'timer',
    },
  ],
};

export const timer = {
  template: `
    <section id="timer">
      <div id="counter">43:32</div>
      <div class="buttons">
        <button type="button" id="start" class="primary-button">Pause</button>
        <button type="button" id="stop" class="secondary-button">Stop</button>
      </div>
    </section>
  `,
  handlers: [
    {
      id: 'stop',
      event: 'click',
      changeScreen: true,
      nextScreen: 'timerConfiguration',
    },
  ],
};

import * as screens from './screens.js';

export default class Screen {
  constructor(screen, timer) {
    this.activeScreen = screen;
    this.timer = timer;
  }

  render() {
    const body = document.body;
    body.innerHTML = this.activeScreen.template;
    this.setHandlers();
  }

  setHandlers() {
    this.activeScreen.handlers.forEach((handler) => {
      const element = document.getElementById(handler.id);

      element.addEventListener(handler.event, (e) => {
        handler.fn(e, this.timer);
        if (handler.changeScreen) {
          const nextScreen = screens[handler.nextScreen];
          this.changeScreen(nextScreen);
        }
      });
    });
  }

  changeScreen(screen) {
    this.activeScreen = screen;
    this.render();
  }
}

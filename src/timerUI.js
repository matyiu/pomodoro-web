import * as screens from './screens.js';

export default class Screen {
  constructor(screen) {
    this.activeScreen = screen;
  }

  render() {
    const body = document.body;
    body.innerHTML = this.activeScreen.template;
    this.setHandlers();
  }

  setHandlers() {
    this.activeScreen.handlers.forEach((handler) => {
      const element = document.getElementById(handler.id);
      let handlerFn = handler.fn;

      if (handler.changeScreen) {
        const nextScreen = screens[handler.nextScreen];
        handlerFn = () => {
          this.changeScreen(nextScreen);
        };
      }

      element.addEventListener(handler.event, handlerFn);
    });
  }

  changeScreen(screen) {
    this.activeScreen = screen;
    this.render();
  }
}

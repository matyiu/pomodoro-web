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
      element.addEventListener(handler.event, handler.fn);
    });
  }

  changeScreen(screen) {
    this.activeScreen = screen;
    this.render();
  }
}

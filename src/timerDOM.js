class ScreenHandler {
  constructor(screens) {
    this.screens = screens;
    this.activeScreen = screens.find(screen => screen.main);
    this.activeScreen.render();
  }

  changeScreen(name) {
    this.activeScreen = this.screens.find(screen => screen.name === name);
    this.activeScreen.render();
  }
}

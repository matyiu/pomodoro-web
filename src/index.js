import Timer from './timer.js';
import Screen from './timerUI.js';
import { timerConfigurationScreen } from './screens.js';

const timer = new Timer(50, 10, { notify: () => { console.log('Notified'); } });
const screen = new Screen(timerConfigurationScreen, timer);

screen.render();

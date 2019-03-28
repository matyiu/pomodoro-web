import Timer from './timer.js';
import Screen from './timerUI.js';
import { timerConfigurationScreen } from './screens.js';
import Alarm from './alarm.js';

const alarm = new Alarm('sound/bell.mp3');
const timer = new Timer(50, 10, alarm);
const screen = new Screen(timerConfigurationScreen, timer);

screen.render();

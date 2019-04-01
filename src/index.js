import Timer from './timer.js';
import Screen from './timerUI.js';
import { timerConfigurationScreen } from './screens.js';
import Alarm from './alarm.js';

const alarm = new Alarm('sound/bell.mp3');
const hourLimit = new Date();
hourLimit.setHours(10);
hourLimit.setMinutes(45);

const timerConfiguration = {
  focusTime: 50,
  restTime: 10,
  alarm,
};

const timer = new Timer(timerConfiguration);
const screen = new Screen(timerConfigurationScreen, timer);

screen.render();

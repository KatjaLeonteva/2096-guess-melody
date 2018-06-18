import {GAME_SETTINGS} from "../data/game-data";
import getRadius from '../game/get-radius';
import {msToMinutesAndSeconds} from "../util";

const timer = (timeLeft) => {
  const timeRatio = timeLeft / GAME_SETTINGS.totalTime;
  const radius = 370;
  const timeLeftInMinSec = msToMinutesAndSeconds(timeLeft);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        stroke-dasharray="${getRadius(timeRatio, radius).stroke}"
        stroke-dashoffset="${getRadius(timeRatio, radius).offset}"
        style="filter: url(../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${timeLeftInMinSec.minutes.toString().padStart(2, `0`)}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${timeLeftInMinSec.seconds.toString().padStart(2, `0`)}</span>
      </div>
    </svg>
  `;
};

export default timer;

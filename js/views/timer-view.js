import AbstractView from "./abstract-view";
import {msToMinutesAndSeconds} from "../util";
import getRadius from "../game/get-radius";

const RADIUS = 370;

export default class TimerView extends AbstractView {
  constructor(timeLeft, totalTime) {
    super();
    this.timeLeft = timeLeft;
    this.totalTime = totalTime;
  }

  get template() {
    const timerRadius = getRadius(this.timeLeft / this.totalTime, RADIUS);
    const timeLeftInMinSec = msToMinutesAndSeconds(this.timeLeft);

    return `<div>
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          stroke-dasharray="${timerRadius.stroke}"
          stroke-dashoffset="${timerRadius.offset}"
          style="filter: url(../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
  
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${timeLeftInMinSec.minutes.toString().padStart(2, `0`)}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${timeLeftInMinSec.seconds.toString().padStart(2, `0`)}</span>
        </div>
      </svg>
    </div>`;
  }

}

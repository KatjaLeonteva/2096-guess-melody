var timerView = (function () {
  'use strict';

  /**
   * Создает DOM-элемент по шаблону.
   * @param {string} markup Разметка элемента.
   * @return {Node} Новый элемент.
   */
  const render = (markup = ``) => {
    const template = document.createElement(`template`);
    template.innerHTML = markup.trim();
    return template.content.firstChild;
  };

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error(`Can't instantiate AbstractView, only concrete one`);
      }
    }

    get template() {
      throw new Error(`Template is required`);
    }

    get element() {
      if (this._element) {
        return this._element;
      }
      this._element = this.render();
      this.bind(this._element);
      return this._element;
    }

    render() {
      return render(this.template);
    }

    bind() {
      // bind handlers if required
    }

  }

  // Варианты склонения для 1 шт, 2-4 шт, 0 и 5-20 шт

  const TimeInMs = {
    ONE_MINUTE: 60000,
    ONE_SECOND: 1000
  };

  /**
   * Переводит миллисекунды в минуты и секунды
   * @param {number} ms Миллисекунды.
   * @return {object} Время в минутах и секундах
   */
  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / TimeInMs.ONE_MINUTE);
    const seconds = ((ms % TimeInMs.ONE_MINUTE) / TimeInMs.ONE_SECOND).toFixed(0);
    return {minutes, seconds};
  };

  const getRadius = (timeRatio, radius) => {
    const stroke = (2 * Math.PI * radius).toFixed(); // Circumference of a circle is 2 * Pi * r
    const offset = ((1 - timeRatio) * stroke).toFixed();

    return {stroke, offset};
  };

  const RADIUS = 370;
  const ALARM = 30000; // Когда осталось менее 30 секунд таймер должен начать мигать красным цветом

  class TimerView extends AbstractView {
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
      </svg>
      <div class="timer-value ${this.timeLeft < ALARM ? `timer-value--finished` : ``}" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${timeLeftInMinSec.minutes.toString().padStart(2, `0`)}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${timeLeftInMinSec.seconds.toString().padStart(2, `0`)}</span>
      </div>
    </div>`;
    }

  }

  return TimerView;

}());

//# sourceMappingURL=timer-view.js.map

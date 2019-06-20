var mistakesView = (function () {
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

  class TimerView extends AbstractView {
    constructor(mistakes) {
      super();
      this.mistakes = mistakes;
    }

    get template() {
      return `
    <div class="main-mistakes">
      ${Array(this.mistakes)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
    </div>`;
    }

  }

  return TimerView;

}());

//# sourceMappingURL=mistakes-view.js.map

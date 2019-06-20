var resultView = (function () {
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

  class ResultView extends AbstractView {
    constructor(result) {
      super();
      this.result = result;
    }

    get template() {
      return `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
    <h2 class="title">${this.result.title}</h2>
    <div class="main-stat">${this.result.description}</div>
  </section>`;
    }

    onStatsLoad(comparison) {
      this.element.insertAdjacentHTML(`beforeend`, `<span class="main-comparison">${comparison}</span>`);
    }

  }

  return ResultView;

}());

//# sourceMappingURL=result-view.js.map

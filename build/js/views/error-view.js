var errorView = (function () {
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

  const MODAL_TIMEOUT = 5000; // 5 sec

  class ErrorView extends AbstractView {
    constructor(text = ``) {
      super();
      this.text = text;
    }

    get template() {
      return `<section class="modal-error modal-error__wrap">
      <div class="modal-error__inner">
        <h2 class="modal-error__title">Произошла ошибка!</h2>
        <p class="modal-error__text">${this.text}</p>
      </div>
    </section>`;
    }

    bind() {
      const onModalClick = () => {
        this.element.removeEventListener(`click`, onModalClick);
        this.element.remove();
      };

      // Сообщение удаляется по клику
      this.element.addEventListener(`click`, onModalClick);

      // Сообщение удаляется через 5 секунд
      setTimeout(onModalClick, MODAL_TIMEOUT);
    }

  }

  return ErrorView;

}());

//# sourceMappingURL=error-view.js.map

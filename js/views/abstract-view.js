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

export default class AbstractView {
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

  bind(element) {
    // bind handlers if required
  }
}

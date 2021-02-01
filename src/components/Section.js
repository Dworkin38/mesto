export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialData = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer; 
    this._setItem = {
      append: (element) => this._container.append(element),
      prepend: (element) => this._container.prepend(element)
    };
  }

  rendererItems() {
    this._initialData.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element, mode) {
    this._setItem[mode](element);
  }
}
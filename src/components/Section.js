export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialData = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer; 
  }

  rendererItems() {
    this._initialData.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
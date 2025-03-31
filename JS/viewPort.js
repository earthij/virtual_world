class ViewPort {
  constructor(canvas) {
    this.canvas = canvas;

    this.ctx = canvas.getContext("2d");
    this.zoom = 1;
    this.offset = new Point(0, 0);

    this.#addEventListeners();
  }

  getMouse(event) {
    return new Point(event.offsetX * this.zoom, event.offsetY * this.zoom);
  }

  #addEventListeners() {
    this.canvas.addEventListener("wheel", this.#handleMouseWheel.bind(this));
  }

  #handleMouseWheel(event) {
    const direction = Math.sign(event.deltaY);
    const step = 0.1;
    this.zoom += direction * step;
    this.zoom = Math.min(5, Math.max(1, this.zoom));
    console.log(this.zoom);
  }
}
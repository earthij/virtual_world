class ViewPort {
  constructor(canvas) {
    this.canvas = canvas;

    this.ctx = canvas.getContext("2d");
    this.zoom = 1;
    this.offset = new Point(0, 0);
    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false
    };

    this.#addEventListeners();
  }

  getMouse(event) {
    return new Point(event.offsetX * this.zoom, event.offsetY * this.zoom);
  }

  getOffset() {
    return add(this.offset, this.drag.offset);
  }

  #addEventListeners() {
    this.canvas.addEventListener("wheel", this.#handleMouseWheel.bind(this));
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
  }

  #handleMouseDown(event) {
    if (event.button == 1) {
      this.drag.active = true;
      this.drag.start = this.getMouse(event);
    }
  }
  #handleMouseMove(event) {
    if (this.drag.active == true) {
      this.drag.end = this.getMouse(event);
      this.drag.offset = subtract(this.drag.end, this.drag.start);
    }
  }
  #handleMouseUp(event) {
    if (this.drag.active) {
      this.offset = this.getOffset();
      this.drag = {
        start: new Point(0, 0),
        end: new Point(0, 0),
        offset: new Point(0, 0),
        active: false
      };
    }
  }
  #handleMouseWheel(event) {
    const direction = Math.sign(event.deltaY);
    const step = 0.1;
    this.zoom += direction * step;
    this.zoom = Math.min(5, Math.max(1, this.zoom));
  }
}
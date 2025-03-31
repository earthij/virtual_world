class GraphEditor {
  constructor(viewport, graph) {
    this.viewport = viewport;
    this.canvas = viewport.canvas;
    this.graph = graph;
    this.ctx = this.canvas.getContext("2d");

    this.selected = null;
    this.hovered = null;
    this.dragging = false;
    this.mouse = null;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("contextmenu", evt => evt.preventDefault());
    this.canvas.addEventListener("mouseup", () => this.dragging = false);
  }

  display() {
    // Draw points and segments of graph.
    this.graph.draw(this.ctx);

    // Draw editor helper.
    if (this.selected) {
      this.selected.draw(this.ctx, { dotColor: "red" });
      // Dashes predicted line snaps to hovered point.
      const intent = this.hovered ? this.hovered : this.mouse;
      new Segment(this.selected, intent).draw(this.ctx, { width: 1, color: "gray", dash: [10, 5] });
    }
    if (this.hovered) { this.hovered.draw(this.ctx, { dotColor: "brown" }); }
  }

  #select(point) {
    // If already selected one and now selecting another, make a segment with them first, then select the last.
    if (this.selected) { this.graph.tryAddSegment(new Segment(this.selected, point)); }
    this.selected = point;
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    // If deleted the selected or hovered, they shold not exist anymore.
    if (this.selected && this.selected.equals(point)) {
      // But it is possible that selected and hovered are not the same point. Hence, this condition.
      this.selected = null;
    }
    this.hovered = null;
  }

  #handleMouseDown(event) {
    this.hovered = getNearestPoint(this.mouse, this.graph.points, 15 * viewPort.zoom);

    // Left click
    // Hovered gets selected. Or,
    // Add and select new point.
    if (event.button == 0) {
      // Permission to move a point.
      this.dragging = true;
      if (this.hovered) { this.#select(this.hovered); }
      else {
        this.graph.addPoint(this.mouse);
        this.#select(this.mouse);
        this.hovered = this.mouse;
      }
    }
    // Right click
    // If selected a point, unselect first.
    // Then if hovering a point, delete.
    else if (event.button == 2) {
      if (this.selected) { this.selected = null; }
      else if (this.hovered) { this.#removePoint(this.hovered); }
    }
  }

  #handleMouseMove(event) {
    // Update mouse position.
    // If has permission to move selected point, follow mouse.
    this.mouse = this.viewport.getMouse(event);
    this.hovered = getNearestPoint(this.mouse, this.graph.points, 15 * viewPort.zoom);
    if (this.dragging) {
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
    }
  }
}
class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  draw(ctx) {
    // Draw points and segments.
    for (const segment of this.segments) segment.draw(ctx);
    for (const point of this.points) point.draw(ctx);
  }

  // Read graph
  containsPoint(point) { return this.points.find(p => point.equals(p)); }
  containsSegment(segment) { return this.segments.find(s => segment.equals(s)); }
  getRelatedSegments(point) {
    // If a point is deleted, related segments can't be floating.
    const relations = [];
    for (const segment of this.segments) if (segment.includes(point)) relations.push(segment);
    return relations;
  }

  // Append
  addPoint(point) { this.points.push(point); }
  addSegment(segment) { this.segments.push(segment); }
  tryAddPoint(point) { if (!this.containsPoint(point)) this.addPoint(point); }
  tryAddSegment(segment) { if (!this.containsSegment(segment)) this.addSegment(segment); }

  // Delete
  removeSegment(segment) {
    if (this.containsSegment(segment)) {
      const index = this.segments.findIndex(s => segment.equals(s));
      this.segments.splice(index, 1);
    }
  }

  removePoint(point) {
    // Remove point and it's connection segments.
    if (this.containsPoint(point)) {
      const index = this.points.findIndex(p => point.equals(p));
      const relations = this.getRelatedSegments(point);
      for (const relation of relations) { this.removeSegment(relation); }
      this.points.splice(index, 1);
    }
  }

  clear() {
    this.points.length = 0;
    this.segments.length = 0;
    this.selected = null;
    this.hovered = null;
  }
}
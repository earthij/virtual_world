class Point {
  constructor(x, y) {
    this.x = Math.round(x);
    this.y = Math.round(y);
  }

  draw(ctx, { size = 15, color = "white", dotColor = color } = {}) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, size / 2, 0, Math.PI * 2);
    ctx.fill();
    if (dotColor) {
      ctx.beginPath();
      ctx.fillStyle = dotColor;
      ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  equals(point) {
    return this.x == point.x && this.y == point.y;
  }
}
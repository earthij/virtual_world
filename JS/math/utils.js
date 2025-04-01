function getNearestPoint(point, points, searchArea = Number.MAX_SAFE_INTEGER) {
  let nearestDist = Number.MAX_SAFE_INTEGER;
  let nearestPoint = null;
  for (const p of points) {
    const dist = distance(point, p);
    if (dist < nearestDist && dist < searchArea) {
      nearestDist = dist;
      nearestPoint = p;
    }
  }
  return nearestPoint;
}

function distance(p1, p2) {
  return Math.hypot((p1.x-p2.x), (p1.y-p2.y));
}

function add(p1, p2) {
  return new Point(p1.x+p2.x, p1.y+p2.y);
}

function subtract(p1, p2) {
  return new Point(p1.x-p2.x, p1.y-p2.y);
}
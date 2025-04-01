const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");

myCanvas.setAttribute("width", window.innerWidth);
myCanvas.setAttribute("height", window.innerHeight);

window.addEventListener("resize", () => {
  myCanvas.setAttribute("width", window.innerWidth);
  myCanvas.setAttribute("height", window.innerHeight);
});


const p1 = new Point(100, 100);
const p2 = new Point(400, 200);
const p3 = new Point(300, 600);
const s1 = new Segment(p1, p2);
const s2 = new Segment(p3, p2);

const graph = new Graph([p1, p2, p3], [s1, s2]);
const viewPort = new ViewPort(myCanvas);
const graphEditor = new GraphEditor(viewPort, graph);

animate();

function animate() {
  ctx.clearRect(0, 0, myCanvas.getAttribute("width"), myCanvas.getAttribute("height"));
  ctx.save();
  ctx.scale(1 / viewPort.zoom, 1 / viewPort.zoom);
  const offset = viewPort.getOffset();
  ctx.translate(offset.x, offset.y);
  graphEditor.display();
  ctx.restore();
  requestAnimationFrame(animate);
}
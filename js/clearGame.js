const canvas_cl = document.getElementById('canvas_cl');

canvas_cl.width = window.innerWidth;
canvas_cl.height = window.innerHeight;

const context_cl = canvas_cl.getContext('2d');
const img = document.getElementById("stroke");
context_cl.drawImage(img, 0, 0, 1920, 1080);

const erase = () => context_cl.globalCompositeOperation = 'destination-out';

context_cl.lineWidth = 10;

let isDrawing = false;

const startDrawing = (event) => {
  isDrawing = true;
  context_cl.beginPath();

  var bounds = canvas_cl.getBoundingClientRect();

  let x = event.pageX - bounds.left - scrollX;
  let y = event.pageY - bounds.top - scrollY;
  context_cl.moveTo(x, y);
}
const stopDrawing = () => {
  isDrawing = false;
}
const draw = (event) => {
  if (!isDrawing) return;

  var bounds = canvas_cl.getBoundingClientRect();

  let x = event.pageX - bounds.left - scrollX;
  let y = event.pageY - bounds.top - scrollY;

  context_cl.lineTo(x, y);
  context_cl.stroke();
}
const enterCanvas = (event) => {
  context_cl.beginPath();
  erase();
}

canvas_cl.addEventListener("touchstart", function (e) {
  isDrawing = true;
  var touch = e.touches[0];
  context_cl.beginPath();

  var bounds = canvas_cl.getBoundingClientRect();

  let x = touch.pageX - bounds.left - scrollX;
  let y = touch.pageY - bounds.top - scrollY;
  context_cl.moveTo(x, y);
}, false);

canvas_cl.addEventListener("touchend", function (e) {
    isDrawing = false;
}, false);

canvas_cl.addEventListener("touchmove", function (e) {
  
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas_cl.dispatchEvent(mouseEvent);
}, false);

enterCanvas();

window.addEventListener("mousedown", startDrawing);
window.addEventListener("mouseup", stopDrawing);
canvas_cl.addEventListener("mousemove", draw);
canvas_cl.addEventListener("mouseover", enterCanvas);
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); /* we will work with 2d */
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

/* we need to give canvas-size in js again! 
it is actual (window)pixel modifier size of canvas */
canvas.width = 700;
canvas.height = 720;

/* default line color and width */
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function start_paiting() {
  painting = true;
}

function stop_painting() {
  painting = false;
}

function on_mouse_move(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  /* console.log(x, y); */
  if (!painting) {
    /* just moving the path */ /* it happens every time you move the mouse */
    ctx.beginPath();
    //ctx.moveTo(x, y); /* maybe we dont need this */
  } else {
    /* it happens every time you move the mouse */
    ctx.lineTo(x, y); /* make line from previous point to current point */
    ctx.stroke(); /* it create visible line following the line */
  }
}

function on_mouse_down(event) {
  start_paiting();
}

function on_mouse_up(event) {
  stop_painting();
}

/*
function on_mouse_up(event) {
  painting = false;
}

function on_mouse_leave(event) {
    painting = false;
}
*/

if (canvas) {
  canvas.addEventListener("mousemove", on_mouse_move);
  canvas.addEventListener("mousedown", on_mouse_down);
  canvas.addEventListener("mouseup", on_mouse_up);
  canvas.addEventListener("mouseleave", stop_painting);
}

/* If you click the colors, strokeStyle will be changed*/
function handle_color_click(event) {
  //console.log(event.target.style);
  const bg_color = event.target.style.backgroundColor;
  //console.log(bg_color);
  ctx.strokeStyle = bg_color;
}
/* Array from create an array from object */
Array.from(colors).forEach((elem_color) =>
  elem_color.addEventListener("click", handle_color_click)
);

/* if you change the input, linewidth will be changed*/
function handle_range_change(event) {
  //console.log(event);
  const stroke_size = event.target.value;
  ctx.lineWidth = stroke_size;
}

/* check if we successfully receive range */
if (range) {
  range.addEventListener("input", handle_range_change);
}

/* it will change Fill <=> Paint mode */
function handle_mode_click(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Paint";
  } else {
    filling = true;
    mode.innerText = "Fill";
  }
}

if (mode) {
  mode.addEventListener("click", handle_mode_click);
}

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); /* we will work with 2d */
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
/* we need to give canvas-size in js again! 
it is actual (window)pixel modifier size of canvas */
canvas.width = 700;
canvas.height = 720;

/* default initialize */
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
/* default line color and width */
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

/*
ctx.fillStyle = "green";
ctx.fillRect(50, 20, 100, 40);
*/
let painting = false;
let filling = true;

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
  canvas.addEventListener("click", handle_canvas_click);
  canvas.addEventListener("contextmenu", handle_CM);
}

/* If you click the colors, strokeStyle will be changed*/
function handle_color_click(event) {
  //console.log(event.target.style);
  const bg_color = event.target.style.backgroundColor;
  //console.log(bg_color);
  ctx.strokeStyle = bg_color;
  ctx.fillStyle = ctx.strokeStyle; /* it is for fill */
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

/* check if we successfully receive range, so 'if(range)' */
if (range) {
  range.addEventListener("input", handle_range_change);
}

/* it will change Fill <=> Paint mode */
function handle_mode_click(event) {
  if (filling !== true) {
    filling = true;
    mode.innerText = "FILL";
  } else {
    filling = false;
    mode.innerText = "PAINT";
  }
}

if (mode) {
  mode.addEventListener("click", handle_mode_click);
}

/* it fills rectangle */
function handle_canvas_click() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
  }
}

/* it contols right click */
function handle_CM(event) {
  event.preventDefault();
}

if (save) {
  save.addEventListener("click", handle_save_click);
}

function handle_save_click(event) {
  const image = canvas.toDataURL("image/png");
  //console.log(image);
  const link = document.createElement("a");
  link.href = image; /* href needs real image download URL */
  link.download = "PaintJS_image"; /* it is the name of the file */
  //console.log(link);
  link.click();
}

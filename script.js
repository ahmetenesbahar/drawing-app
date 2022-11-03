const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");

//Core Drawing Functionality (with some research)

const ctx = canvas.getContext("2d");

let size = 10;
let isPressed = false;
let color = "black";
let x;
let y;
let fakeSize = 1;

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);

  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function updateSizeOnScreen() {
  sizeEl.innerHTML = fakeSize;
}

increaseBtn.addEventListener("click", () => {
  size += 5;
  fakeSize++;
  if (fakeSize > 10) {
    fakeSize = 10;
  }

  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
  size -= 5;
  fakeSize--;
  if (fakeSize < 1) {
    fakeSize = 1;
  }

  if (size < 5) {
    size = 5;
  }

  updateSizeOnScreen();
});

colorEl.addEventListener("change", (e) => {
  color = e.target.value;
});

clearEl.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

//Eraser and Pencil Actions (my own algorithm)

const eraser = document.getElementById("eraser");
const pencil = document.getElementById("pencil");

eraser.addEventListener("click", () => {
  localStorage.setItem("colorEl", JSON.stringify(color));
  color = "#f5f5f5";
  colorEl.disabled = true;
  canvas.classList.add("eraseractive");
  eraser.classList.add("eraseractive");
  colorEl.classList.add("eraseractive");
  canvas.classList.remove("pencilactive");
  eraser.classList.remove("pencilactive");
  colorEl.classList.remove("pencilactive");
});

pencil.addEventListener("click", () => {
  JSON.parse(localStorage.getItem("colorEl"));
  color = colorEl.value;
  colorEl.disabled = false;
  canvas.classList.remove("eraseractive");
  eraser.classList.remove("eraseractive");
  colorEl.classList.remove("eraseractive");
  canvas.classList.add("pencilactive");
  eraser.classList.add("pencilactive");
  colorEl.classList.add("pencilactive");
});

// Dark/Light Mode

const darkMode = document.getElementById("darkMode");
const lightMode = document.getElementById("lightMode");

darkMode.addEventListener("click", () => {
  darkMode.classList.add("mode-active");
  lightMode.classList.remove("mode-active");
  lightMode.classList.add("rotate");
});

lightMode.addEventListener("click", () => {
  lightMode.classList.add("mode-active");
  darkMode.classList.remove("mode-active");
  darkMode.classList.add("rotate");
});

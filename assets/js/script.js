const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");

//Core Drawing Functionality (with some research)

const ctx = canvas.getContext("2d");

let size = 5;
let isPressed = false;
let color = "black";
let x = 0;
let y = 0;
let fakeSize = 1;

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX * (canvas.width / ctx.canvas.getBoundingClientRect().width);
  y = e.offsetY * (canvas.height / ctx.canvas.getBoundingClientRect().height);
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 =
      e.offsetX * (canvas.width / ctx.canvas.getBoundingClientRect().width);
    const y2 =
      e.offsetY * (canvas.height / ctx.canvas.getBoundingClientRect().height);

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
  color = "#fff";
  colorEl.disabled = true;
  canvas.classList.add("eraseractive");
  eraser.classList.add("eraseractive");
  colorEl.classList.add("eraseractive");
  canvas.classList.remove("pencilactive");
  eraser.classList.remove("pencilactive");
  colorEl.classList.remove("pencilactive");
});

pencil.addEventListener("click", () => {
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
const toolbox = document.getElementById("toolbox");

darkMode.addEventListener("click", () => {
  darkMode.classList.add("mode-active");
  lightMode.classList.remove("mode-active");
  lightMode.classList.add("rotate");
  darkMode.classList.remove("rotate");
  toolbox.style.backgroundColor = "#293462";
  document.body.style.backgroundImage =
    "url('/assets/images/darkModeBackground.svg')";

  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundAttachment = "fixed"
  canvas.style.borderColor = "#293462";
  toolbox.style.borderColor = "#293462";
  darkMode.value = 0;
  localStorage.setItem("pageMode", JSON.stringify(darkMode));
});

lightMode.addEventListener("click", () => {
  lightMode.classList.add("mode-active");
  darkMode.classList.remove("mode-active");
  darkMode.classList.add("rotate");
  lightMode.classList.remove("rotate");
  toolbox.style.backgroundColor = "#293462";
  document.body.style.backgroundImage =
    "url('/assets/images/lightModeBackground.svg')";

  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundAttachment = "fixed"
  canvas.style.borderColor = "#293462";
  toolbox.style.borderColor = "#293462";
  lightMode.value = 1;
  localStorage.setItem("pageMode", JSON.stringify(lightMode));
});

window.onload = function () {
  let theme = JSON.parse(localStorage.getItem("pageMode"));
  if (theme == null) {
    lightMode.value = 1;
    localStorage.setItem("pageMode", JSON.stringify(lightMode));
  }
  theme = JSON.parse(localStorage.getItem("pageMode"));
  if (theme.value == 0) {
    darkMode.classList.add("mode-active");
    lightMode.classList.remove("mode-active");
    lightMode.classList.add("rotate");
    darkMode.classList.remove("rotate");
    toolbox.style.backgroundColor = "#293462";
    document.body.style.backgroundImage =
      "url('/assets/images/darkModeBackground.svg')";

    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed"
    canvas.style.borderColor = "#293462";
    toolbox.style.borderColor = "#293462";
    darkMode.value = 0;
    localStorage.setItem("pageMode", JSON.stringify(darkMode));
  } else if (theme.value == 1) {
    lightMode.classList.add("mode-active");
    darkMode.classList.remove("mode-active");
    darkMode.classList.add("rotate");
    lightMode.classList.remove("rotate");
    toolbox.style.backgroundColor = "#293462";
    document.body.style.backgroundImage =
      "url('/assets/images/lightModeBackground.svg')";

    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed"
    canvas.style.borderColor = "#293462";
    toolbox.style.borderColor = "#293462";
    lightMode.value = 1;
    localStorage.setItem("pageMode", JSON.stringify(lightMode));
  }
};
